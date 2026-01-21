import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../lib/supabase";
import sharp from "sharp";


export const POST: APIRoute = async (context) => {
  const { request } = context;
  const supabase = createSupabaseServerClient(context);

  // 1. Verificar autenticación
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  // 2. Obtener archivo del request
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response(JSON.stringify({ error: "No se encontró el archivo" }), {
      status: 400,
    });
  }

  try {
    // 3. Convertir a buffer y procesar con Sharp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const processedImageBuffer = await sharp(buffer)
      .resize(1200, null, { // Max width 1200, altura automática
        withoutEnlargement: true, // No agrandar si es más chica
        fit: 'inside' 
      })
      .webp({ quality: 80 })
      .toBuffer();

    // 4. Generar nombre único
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;

    // 5. Subir a Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from("propiedades-img")
      .upload(fileName, processedImageBuffer, {
        contentType: "image/webp",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error subiendo a Supabase:", uploadError);
      return new Response(JSON.stringify({ error: "Error al subir imagen" }), {
        status: 500,
      });
    }

    // 6. Retornar URL pública (o path)
    const { data: publicUrlData } = supabase.storage
      .from("propiedades-img")
      .getPublicUrl(fileName);

    return new Response(
      JSON.stringify({
        url: publicUrlData.publicUrl,
        path: fileName,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error procesando imagen:", err);
    return new Response(JSON.stringify({ error: "Error en el procesamiento de imagen" }), {
      status: 500,
    });
  }
};
