import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Correo y contraseña obligatorios", { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 401 });
  }

  const { access_token, refresh_token } = data.session;
  
  cookies.set("sb-access-token", access_token, {
    path: "/",
    secure: import.meta.env.PROD,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
    secure: import.meta.env.PROD,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return redirect("/admin");
};
