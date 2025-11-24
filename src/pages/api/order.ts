import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
    const debugLogs: string[] = [];
    const log = (msg: string) => {
        console.log(msg);
        debugLogs.push(msg);
    };

    try {
        const body = await request.json() as any;
        const { phone, name, items, total } = body;

        log(`[Order API] Received order request for: ${name} (${phone})`);

        // Access environment variables from locals.runtime.env
        const env = locals.runtime.env;

        if (!env.STORE_DB) {
            log("[CRITICAL] D1 binding 'STORE_DB' is MISSING in locals.runtime.env");
            throw new Error("Database binding missing");
        } else {
            log("[Order API] D1 binding found");
        }

        if (!phone || !name || !items || items.length === 0) {
            log("[Order API] Missing required fields");
            return new Response(JSON.stringify({ error: "Missing required fields", debugLogs }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const db = env.STORE_DB;

        // 0. Rate Limiting (Spam Protection)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

        // Get customer ID first
        log(`[Order API] Checking customer for phone: ${phone}`);
        const existingCustomer = await db.prepare(
            "SELECT id FROM customers WHERE phone = ?"
        ).bind(phone).first<{ id: string }>();

        log(`[Order API] Existing customer ID: ${existingCustomer?.id || 'None'}`);

        if (existingCustomer) {
            const recentOrder = await db.prepare(
                "SELECT id FROM orders WHERE customer_id = ? AND created_at > ?"
            ).bind(existingCustomer.id, fiveMinutesAgo).first();

            if (recentOrder) {
                log("[Order API] Rate limit hit");
                return new Response(JSON.stringify({ error: "Por favor espera unos minutos antes de realizar otro pedido.", debugLogs }), {
                    status: 429,
                    headers: { "Content-Type": "application/json" },
                });
            }
        }

        // 1. Create/Update Customer
        let customerId = existingCustomer?.id;
        const now = new Date().toISOString();

        if (customerId) {
            log(`[Order API] Updating customer ${customerId}`);
            await db.prepare(
                "UPDATE customers SET name = ?, last_order_at = ? WHERE id = ?"
            ).bind(name, now, customerId).run();
        } else {
            customerId = crypto.randomUUID();
            log(`[Order API] Creating new customer ${customerId}`);
            await db.prepare(
                "INSERT INTO customers (id, phone, name, last_order_at, created_at) VALUES (?, ?, ?, ?, ?)"
            ).bind(customerId, phone, name, now, now).run();
        }

        // 2. Create Order with Unique Code
        const orderCode = generateOrderCode();
        const orderId = crypto.randomUUID();

        log(`[Order API] Creating order ${orderCode} (${orderId})`);
        const result = await db.prepare(
            "INSERT INTO orders (id, order_code, customer_id, items, total, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).bind(
            orderId,
            orderCode,
            customerId,
            JSON.stringify(items), // Store JSON as text
            total,
            "pending",
            now
        ).run();

        log(`[Order API] Order creation result: ${JSON.stringify(result)}`);
        log("[Order API] Order created successfully");

        // 3. Send WhatsApp via Evolution API
        if (!env.EVOLUTION_API_URL || !env.EVOLUTION_API_TOKEN || !env.EVOLUTION_INSTANCE_NAME) {
            log("[Order API] Evolution API not configured");
            return new Response(JSON.stringify({
                success: false,
                orderId: orderCode,
                code: 'SERVICE_ERROR',
                debugLogs
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const message = `Hola ${name}! 👋\n\nHemos recibido tu pedido *#${orderCode}* en Omega Salud.\n\nTotal: S/ ${total.toFixed(2)}\nItems:\n${items.map((i: any) => `- ${i.quantity}x ${i.name}`).join("\n")}\n\nPronto nos pondremos en contacto contigo para coordinar la entrega y el pago.`;
        const formattedPhone = phone.replace(/\D/g, "");

        try {
            log("[Order API] Attempting to send WhatsApp...");
            const response = await fetch(`${env.EVOLUTION_API_URL}/message/sendText/${env.EVOLUTION_INSTANCE_NAME}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": env.EVOLUTION_API_TOKEN,
                },
                body: JSON.stringify({
                    number: formattedPhone,
                    options: {
                        delay: 1200,
                        presence: "composing",
                        linkPreview: false
                    },
                    textMessage: {
                        text: message
                    }
                }),
            });

            if (!response.ok) {
                log(`[ERROR] Evolution API returned ${response.status}`);
                return new Response(JSON.stringify({
                    success: false,
                    orderId: orderCode,
                    code: 'SERVICE_ERROR',
                    debugLogs
                }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                });
            }

            const data = await response.json() as any;
            log(`[Order API] Evolution API response: ${JSON.stringify(data)}`);

            // Check for specific API errors if possible (Evolution API structure varies)
            // Assuming success if we got here for now, unless response body indicates error

            log("[Order API] WhatsApp message sent successfully.");

            return new Response(JSON.stringify({ success: true, orderId: orderCode, debugLogs }), {
                headers: { "Content-Type": "application/json" },
            });

        } catch (e: any) {
            log(`[ERROR] Failed to send WhatsApp: ${e.message}`);
            return new Response(JSON.stringify({
                success: false,
                orderId: orderCode,
                code: 'SERVICE_ERROR',
                debugLogs
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (err: any) {
        log(`[ERROR] Exception: ${err.message}`);
        return new Response(JSON.stringify({ error: err.message, debugLogs }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};

function generateOrderCode(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `ORD-${result}`;
}
