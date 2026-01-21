import { defineMiddleware } from "astro:middleware";
import { createSupabaseServerClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, locals, redirect, cookies } = context;

  // Solo aplicar lógica de auth en rutas /admin
  if (url.pathname.startsWith("/admin")) {
    const supabase = createSupabaseServerClient(context);

    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;

    if (!accessToken || !refreshToken) {
      return redirect("/login");
    }

    // Intentar recuperar sesión con los tokens
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const user = data.session?.user;

    if (error || !user) {
        // Limpiar tokens invalidos si existen
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
        return redirect("/login");
    }

    // Si hubo refresco de token, actualizar cookies (opcional, pero recomendado)
    if (data.session && data.session.access_token !== accessToken) {
       cookies.set("sb-access-token", data.session.access_token, {
          path: "/",
          secure: import.meta.env.PROD,
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
       });
       if (data.session.refresh_token) {
        cookies.set("sb-refresh-token", data.session.refresh_token, {
            path: "/",
            secure: import.meta.env.PROD,
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
         });
       }
    }
    
    // Inyectar usuario en locals para uso en componentes
    locals.user = user;
  }

  return next();
});
