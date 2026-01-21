import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Validar que las variables existan para evitar crash, pero permitiendo iniciar si no estan (para debug)
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("⚠️ FALTAN VARIABLES DE ENTORNO DE SUPABASE EN .env");
}

// Fallback seguro para evitar error "supabaseUrl is required" al iniciar
export const supabase = createClient(
    supabaseUrl || "https://placeholder-url.supabase.co", 
    supabaseAnonKey || "placeholder-key"
);

export function createSupabaseServerClient(context: any) {
  return createServerClient(supabaseUrl || "https://placeholder-url.supabase.co", supabaseAnonKey || "placeholder-key", {
    cookies: {
      getAll() {
        return parseCookieHeader(context.request.headers.get('Cookie') ?? '');
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          context.cookies.set(name, value, options);
        });
      },
    },
  });
}

