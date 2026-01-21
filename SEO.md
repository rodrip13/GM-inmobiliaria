# Guía de SEO Inmobiliaria GM

## Configuración Técnica Actual

### 1. Sitemap Dinámico (`/sitemap.xml`)
El archivo se genera automáticamente en `src/pages/sitemap.xml.ts`.
- **Qué hace:** Consulta a Supabase todas las propiedades con estado "disponible" y genera las URLs.
- **Cómo editar:** Modifica el archivo `.ts` si agregas nuevas rutas estáticas (como `/contacto`, `/nosotros`).

### 2. Robots.txt (`/robots.txt`)
Ubicado en `public/robots.txt`.
- **Configuración actual:** Permite el rastreo de todo el sitio.
- **Cambios futuros:** Si deseas bloquear admin, agrega:
  ```text
  User-agent: *
  Disallow: /admin/
  ```

### 3. Metadatos (Open Graph y Twitter Cards)
Cada página propiedad (`src/pages/propiedad/[id].astro`) y el `Layout.astro` principal configuran:
- `title`: Título de la pestaña.
- `description`: Resumen para Google.
- `og:image`: Imagen que aparece al compartir en WhatsApp/Facebook.

### 4. Datos Estructurados (JSON-LD)
Hemos implementado el esquema `RealEstateListing` de Google en las páginas de detalle. Esto ayuda a que Google entienda precio, ubicación y fotos para mostrarlos en resultados ricos.

## Checklist para Creación de Contenido (SEO On-Page)

Para que las propiedades posicionen mejor:
1.  **Títulos Descriptivos:** Usar "Casa de 3 dormitorios en Centro" en lugar de "Oportunidad única".
2.  **Descripciones:** Primer párrafo debe contener ciudad y características principales.
3.  **Imágenes:** El sistema ya las optimiza a WebP, pero intenta subir fotos con buena iluminación.

## Performance
- **Tip:** Mantén el "Lazy Loading" en las imágenes (ya configurado) para que la web cargue rápido en móviles.
