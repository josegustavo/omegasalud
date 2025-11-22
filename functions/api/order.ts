import { createClient } from "@supabase/supabase-js";

export interface Env {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    EVOLUTION_API_URL: string;
    EVOLUTION_API_TOKEN: string;
    SENDER_PHONE_NUMBER: string;
}

interface OrderRequest {
    phone: string;
    name: string;
    items: any[];
    total: number;
}

function generateOrderCode(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `ORD-${result}`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body = await context.request.json() as OrderRequest;
        const { phone, name, items, total } = body;

        if (!phone || !name || !items || items.length === 0) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const supabase = createClient(
            context.env.SUPABASE_URL,
            context.env.SUPABASE_ANON_KEY
        );

        // 0. Rate Limiting (Spam Protection)
        // Check for orders from this phone in the last 5 minutes
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const { data: recentOrders } = await supabase
            .from("orders")
            .select("id")
            .eq("customer_id", (await supabase.from("customers").select("id").eq("phone", phone).single()).data?.id) // Nested query might be slow, better to get ID first
            .gt("created_at", fiveMinutesAgo);

        // Optimization: Get customer ID first
        const { data: existingCustomer } = await supabase
            .from("customers")
            .select("id")
            .eq("phone", phone)
            .single();

        if (existingCustomer) {
            const { count } = await supabase
                .from("orders")
                .select("id", { count: 'exact', head: true })
                .eq("customer_id", existingCustomer.id)
                .gt("created_at", fiveMinutesAgo);

            if (count && count > 0) {
                return new Response(JSON.stringify({ error: "Por favor espera unos minutos antes de realizar otro pedido." }), {
                    status: 429,
                    headers: { "Content-Type": "application/json" },
                });
            }
        }

        // 1. Create/Update Customer
        let customerId = existingCustomer?.id;

        if (customerId) {
            await supabase
                .from("customers")
                .update({ name, last_order_at: new Date().toISOString() })
                .eq("id", customerId);
        } else {
            const { data: newCustomer, error: createError } = await supabase
                .from("customers")
                .insert({ phone, name, last_order_at: new Date().toISOString() })
                .select("id")
                .single();

            if (createError) throw new Error(createError.message);
            customerId = newCustomer.id;
        }

        // 2. Create Order with Unique Code
        const orderCode = generateOrderCode();
        const { error: orderError } = await supabase
            .from("orders")
            .insert({
                order_code: orderCode,
                customer_id: customerId,
                items,
                total,
                status: "pending",
            });

        if (orderError) throw new Error(orderError.message);

        // 3. Send WhatsApp via Evolution API
        if (context.env.EVOLUTION_API_URL && context.env.EVOLUTION_API_TOKEN) {
            const message = `Hola ${name}! 👋\n\nHemos recibido tu pedido *#${orderCode}* en Omega Salud.\n\nTotal: S/ ${total.toFixed(2)}\nItems:\n${items.map((i: any) => `- ${i.quantity}x ${i.name}`).join("\n")}\n\nPronto nos pondremos en contacto contigo para coordinar la entrega y el pago.`;

            const formattedPhone = phone.replace(/\D/g, "");

            try {
                await fetch(`${context.env.EVOLUTION_API_URL}/message/sendText/${context.env.SENDER_PHONE_NUMBER}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": context.env.EVOLUTION_API_TOKEN,
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
            } catch (e) {
                console.error("Failed to send WhatsApp:", e);
            }
        }

        return new Response(JSON.stringify({ success: true, orderId: orderCode }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
