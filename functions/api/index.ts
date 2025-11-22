export interface Env {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    EVOLUTION_API_URL: string;
    EVOLUTION_API_TOKEN: string;
    SENDER_PHONE_NUMBER: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    return new Response(JSON.stringify({ message: "Hello from Omega Salud API" }), {
        headers: { "Content-Type": "application/json" },
    });
};
