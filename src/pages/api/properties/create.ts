import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async (context) => {
  const { request } = context;
  const supabase = createSupabaseServerClient(context);

  // 1. Verificar sesión
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  try {
    // 2. Obtener datos
    const body = await request.json();
    
    // 3. Agregar el ID del agente (usuario actual)
    const propertyData = {
        ...body,
        agent_id: user.id
    };

    // 4. Insertar en Base de Datos
    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single();

    if (error) {
      console.error("Error insertando propiedad:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Propiedad creada con éxito", data }),
      { status: 200 }
    );

  } catch (err) {
    console.error("Error procesando solicitud:", err);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
    });
  }
};
