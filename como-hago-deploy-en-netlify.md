# Guía de Despliegue en Netlify (GM Inmobiliaria)

Esta guía te llevará paso a paso para publicar tu sitio web en internet utilizando Netlify. Al ser un proyecto desarrollado con Astro (SSR) y Supabase, Netlify es la plataforma ideal y más sencilla.

## 1. Requisitos Previos
*   Tener tu proyecto subido a **GitHub**.
*   Tener una cuenta en [Netlify](https://app.netlify.com/signup) (puedes iniciar sesión con tu GitHub).

## 2. Conectar Repositorio
1.  Inicia sesión en tu cuenta de Netlify.
2.  Haz clic en el botón **"Add new site"** (Agregar nuevo sitio) > **"Import an existing project"**.
3.  Selecciona el proveedor **GitHub**.
4.  Busca y selecciona el repositorio `GMInmobiliaria-website` (o el nombre que le hayas puesto).

## 3. Configuración del Build (Automático)
Netlify detectará automáticamente que es un proyecto de Astro. Deberías ver una configuración similar a esta (déjala tal cual):
*   **Base directory:** (Vacío)
*   **Build command:** `npm run build`
*   **Publish directory:** `dist`

## 4. Configuración de Variables de Entorno (¡CRUCIAL!)
Antes de darle al botón final de deploy, necesitas configurar las credenciales de Supabase para que la base de datos funcione.

1.  En la misma pantalla de configuración, busca la sección **"Environment variables"** (o ve luego a Site configuration > Environment variables).
2.  Agrega las siguientes variables (copia los valores de tu archivo `.env` local):

| Key | Value |
| :--- | :--- |
| `PUBLIC_SUPABASE_URL` | *Tu URL de Supabase (ej: https://...supabase.co)* |
| `PUBLIC_SUPABASE_ANON_KEY` | *Tu clave Anon Key de Supabase* |

> ⚠️ **Nota:** No es necesaria la `SERVICE_ROLE_KEY` a menos que usemos funcionalidad de administración externa muy específica, ya que la autenticación se maneja vía Cookies seguras con la Anon Key.

## 5. Desplegar
1.  Haz clic en **"Deploy site"**.
2.  Netlify comenzará a construir tu sitio. Esto puede tardar 1-2 minutos la primera vez.
3.  Una vez finalizado, verás un enlace en verde (ej: `https://gminmobiliaria-random.netlify.app`).

## 6. Pasos Post-Despliegue (Recomendados)
1.  **Dominio Personalizado:** Ve a "Domain management" para agregar tu dominio `.com` o `.com.uy` (ej: `www.gminmobiliaria.com`). Netlify te dará instrucciones de DNS.
2.  **Configurar URL en Supabase:**
    *   Ve a tu panel de Supabase > Authentication > URL Configuration.
    *   En **Site URL**, pon la URL final de tu sitio en Netlify (ej: `https://tu-sitio.netlify.app`).
    *   Esto es fundamental para que los *Redirects* de login funcionen correctamente.
3.  **Verificar Subida de Imágenes:**
    *   Al usar `sharp` para procesar imágenes en el servidor, Netlify Functions se encarga de ejecutar ese código. Verifica subiendo una propiedad de prueba para asegurar que el procesamiento de imagen funciona en la nube (a veces los límites de memoria de la cuenta gratuita pueden ser estrictos con imágenes muy grandes).

---

## Solución de Problemas Comunes

*   **Error "Image transformation failed":** Si al subir imágenes grandes fallara, podría ser por timeout de la función Serverless ("Function execution took long"). En ese caso, intenta subir imágenes más livianas o contacta soporte para aumentar el timeout (aunque para MVP suele sobrar).
*   **Cookies/Login no funciona:** Asegúrate de haber configurado la URL del sitio en Supabase (Paso 6.2).
