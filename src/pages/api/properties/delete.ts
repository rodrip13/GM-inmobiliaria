import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async (context) => {
  const { request } = context;
  const supabase = createSupabaseServerClient(context);

  // Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return new Response("Unauthorized", { status: 401 });

  const { id } = await request.json();

  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) return new Response(error.message, { status: 500 });

  return new Response("OK", { status: 200 });
};
