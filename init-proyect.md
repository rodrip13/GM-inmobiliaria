Actúa como un Senior Fullstack Developer experto en Astro 4, Supabase y Tailwind CSS. 

### CONTEXTO
Necesito construir el MVP de una web inmobiliaria para "Graciela Martínez Negocios Inmobiliarios". La estética debe ser minimalista, limpia, enfocada en imágenes grandes y tipografía clara (estilo Airbnb). La web debe ser SSR con una estrategia de caché Stale-While-Revalidate.

### REQUISITOS TÉCNICOS
1. **Frontend:** Astro con Tailwind CSS.
2. **Backend/Base de Datos:** Supabase (Auth, PostgreSQL y Storage).
3. **Imágenes:** Implementar una API Route en Astro que use la librería 'Sharp' para procesar imágenes subidas: redimensionar a 1200px, calidad 80% y formato WebP antes de subirlas a Supabase Storage.
4. **Mapas:** Integrar Leaflet.js. 
   - En la Home: Mapa con pines de todas las propiedades.
   - En Admin: Un mapa donde el empleado haga click para capturar lat/lng.
5. **Funcionalidades:** - Filtros por etiquetas (Venta, Alquiler, Piscina, etc.).
   - Selector de moneda ($ / US$).
   - Botón de WhatsApp dinámico: "Hola, me interesa la propiedad [Nombre] que vi en la web".
   - Galería en detalle: Slider/Carrusel optimizado para móviles.

### TAREAS A REALIZAR
1. Genera el esquema SQL para Supabase (tabla 'propiedades' con estados: disponible, reservado, vendido; tabla 'tags'; y tabla 'perfiles' para empleados).
2. Crea la estructura de carpetas de Astro siguiendo las mejores prácticas.
3. Genera el componente `PropertyCard.astro` y la página dinámica `[id].astro` con SEO optimizado (meta tags dinámicos para título y descripción).
4. Escribe la lógica del formulario de subida en `/admin/nueva` que procese la imagen con Sharp.

### ESTILO VISUAL
Usa una paleta de colores neutros (blancos, grises suaves y un color de acento elegante). Mucho espacio en blanco, bordes redondeados (rounded-2xl) y sombras muy sutiles.