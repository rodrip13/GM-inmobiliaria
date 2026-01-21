# Plan de Ejecución: Inmobiliaria Astro MVP (Netlify + Supabase + PWA)

## 📌 Resumen de Progreso
| Fase | Tarea Principal | Estado |
| :--- | :--- | :---: |
| 1 | Configuración, PWA & Design System | ✅ |
| 2 | Setup Base de Datos | ✅ |
| 3 | Autenticación | ✅ |
| 4 | Backend & Storage | ✅ |
| 5 | Dashboard Admin | ✅ |
| 6 | Frontend Mobile-First | ✅ |

*(Estados: ⬜ Pendiente, 🚧 En Progreso, ✅ Completado)*

---

## 🎨 Design System (Extraído de HTML)
*   **Enfoque:** Mobile First (Diseño optimizado para pulgares y pantallas verticales).
*   **Fuente:** 'Work Sans' (Google Fonts).
*   **Colores:**
    *   `primary`: #ecb613 (Dorado/Amarillo)
    *   `background-light`: #f8f8f6
    *   `background-dark`: #221d10
    *   `charcoal`: #181611
*   **Iconos:** Material Symbols Outlined.
*   **PWA:** 
    *   `primary`: #ecb613 (Dorado/Amarillo)
    *   `background-light`: #f8f8f6
    *   `background-dark`: #221d10
    *   `charcoal`: #181611s

---

## 🚀 Pasos Detallados

### 1. Configuración & Design System
- [x] Inicializar proyecto Astro + Tailwind CSS.
- [x] Instalar adaptador Netlify (`npx astro add netlify`).
- [x] **PWA Setup (App Instalable):**
    - [x] Instalar `@vite-pwa/astro`.
    - [x] Configurar `manifest.webmanifest`:
        - [x] Nombre: "GM Inmobiliaria".
        - [x] `display: standalone` (Pantalla completa sin barra URL).
        - [x] Colores de sistema y background.
    - [x] Configurar Service Worker (Estrategia `NetworkFirst` para contenido SSR).
- [x] **Config Tailwind (`tailwind.config.mjs`):**
    - [x] Importar fuente 'Work Sans'.
    - [x] Paleta de colores.
    - [x] Configurar `container-queries` y `forms` plugin.
- [x] Configurar `<head>` global con Meta Viewport optimizado para móviles.

### 2. Setup Base de Datos (Supabase)
- [x] Crear proyecto en Supabase.
- [x] Ejecutar Script SQL:
    - [x] `properties`: Incluir campos para `bathrooms`, `bedrooms`, `sq_meters`.
    - [x] `tags`, `public_profiles`.
- [x] Configurar Storage Bucket `propiedades-img`.
- [x] Habilitar RLS (Seguridad).

### 3. Autenticación (Persistente)
- [x] Setup `@supabase/ssr` con Cookies (30 días de persistencia).
- [x] Página `/login` minimalista.
- [x] Middleware de protección para rutas `/admin`.

### 4. Backend de Imágenes
- [x] API Route `/api/upload` con `sharp`.
- [x] Implementar streaming upload a Supabase.
- [x] Optimización: Resize 1200px + WebP (Calidad 80%).
- [x] *Nota:* Configurar función de Netlify para permitir timeout extendido (si es posible en plan Free) o optimizar proceso.

### 5. Dashboard Admin (`/admin`)
- [x] Layout Mobile-Friendly (Menú accesible) y con acceso rápido a "Nueva Propiedad".
- [x] **Formulario de Carga (`/admin/nueva`):**
    - [x] Selector de ubicación (Leaflet Map Click).
    - [x] Input de imágenes múltiple.
- [x] Dashboard de gestión de estados (Vendido/Reservado).

### 6. Frontend Mobile-First
- [x] **Estructura App Shell:**
    - [x] `BottomNav.astro` / `Header.astro`.
- [x] **Componentes Home:**
    - [x] `PropertyCard.astro`: Diseño vertical con imagen grande.
- [x] **Páginas:**
    - [x] Home (`/`): Listados.
    - [x] Detalle (`/propiedad/[id]`): Galería swipeable + Botón WhatsApp Sticky.
- [x] Integración Mapas: Leaflet en modo `client:only`.

## 🚀 Fase 2: Profesionalización y Funcionalidades Avanzadas

### 7. Buscador y Filtros Avanzados
- [x] Implementar estado en URL (Query Params) para compartir búsquedas.
- [x] Componente `SearchFilters.astro` en Home:
    - [x] Tipo de Operación (Venta/Alquiler).
    - [x] Ciudad/Ubicación.
    - [x] Rango de Precios (Min - Max).
- [x] Lógica de filtrado en Supabase (`query.eq`, `query.gte`, `query.lte`).

### 8. Mejoras UX (Experiencia de Usuario)
- [x] **Lightbox:** Vista de pantalla completa para galería de imágenes.
- [x] **Botón Compartir:** Web Share API para móviles.
- [ ] **Mapa Interactivo:** Vista de mapa general en Home.

### 9. SEO Técnico & Performance
- [x] `sitemap.xml` dinámico.
- [x] `robots.txt`.
- [x] Schema.org (JSON-LD).
- [x] Optimización de carga (Lazy Loading).
- [x] ViewTransitions (Navegación SPA).
- [x] Página 404 personalizada.

### 10. Deploy a Producción
- [ ] Conectar repositorio con Netlify.
- [ ] Variables de Entorno en Netlify.
- [ ] Configuración DNS.


---

## ⚠️ Notas Técnicas
*   **Mobile UX:** Usar `overflow-y-auto` y `overscroll-behavior-y: none` para sensación nativa.
*   **Despliegue:** Netlify (Serverless Functions para API).
*   **Performance:** Uso de `Stale-While-Revalidate` en cabeceras HTTP.