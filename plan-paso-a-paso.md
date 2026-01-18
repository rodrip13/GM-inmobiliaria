# Plan de Ejecución: Inmobiliaria Astro MVP (Netlify + Supabase + PWA)

## 📌 Resumen de Progreso
| Fase | Tarea Principal | Estado |
| :--- | :--- | :---: |
| 1 | Configuración, PWA & Design System | ⬜ |
| 2 | Setup Base de Datos | ⬜ |
| 3 | Autenticación | ⬜ |
| 4 | Backend & Storage | ⬜ |
| 5 | Dashboard Admin | ⬜ |
| 6 | Frontend Mobile-First | ⬜ |

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
- [ ] Inicializar proyecto Astro + Tailwind CSS.
- [ ] Instalar adaptador Netlify (`npx astro add netlify`).
- [ ] **PWA Setup (App Instalable):**
    - [ ] Instalar `@vite-pwa/astro`.
    - [ ] Configurar `manifest.webmanifest`:
        - [ ] Nombre: "GM Inmobiliaria".
        - [ ] `display: standalone` (Pantalla completa sin barra URL).
        - [ ] Colores de sistema y background.
    - [ ] Configurar Service Worker (Estrategia `NetworkFirst` para contenido SSR).
- [ ] **Config Tailwind (`tailwind.config.mjs`):**
    - [ ] Importar fuente 'Work Sans'.
    - [ ] Paleta de colores.
    - [ ] Configurar `container-queries` y `forms` plugin.
- [ ] Configurar `<head>` global con Meta Viewport optimizado para móviles.

### 2. Setup Base de Datos (Supabase)
- [ ] Crear proyecto en Supabase.
- [ ] Ejecutar Script SQL:
    - [ ] `properties`: Incluir campos para `bathrooms`, `bedrooms`, `sq_meters`.
    - [ ] `tags`, `public_profiles`.
- [ ] Configurar Storage Bucket `propiedades-img`.
- [ ] Habilitar RLS (Seguridad).

### 3. Autenticación (Persistente)
- [ ] Setup `@supabase/ssr` con Cookies (30 días de persistencia).
- [ ] Página `/login` minimalista.
- [ ] Middleware de protección para rutas `/admin`.

### 4. Backend de Imágenes
- [ ] API Route `/api/upload` con `sharp`.
- [ ] Implementar streaming upload a Supabase.
- [ ] Optimización: Resize 1200px + WebP (Calidad 80%).
- [ ] *Nota:* Configurar función de Netlify para permitir timeout extendido (si es posible en plan Free) o optimizar proceso.

### 5. Dashboard Admin (`/admin`)
- [ ] Layout Mobile-Friendly (Menú accesible) y con acceso rápido a "Nueva Propiedad".
- [ ] **Formulario de Carga (`/admin/nueva`):**
    - [ ] Selector de ubicación (Leaflet Map Click).
    - [ ] Input de imágenes múltiple.
- [ ] Dashboard de gestión de estados (Vendido/Reservado).

### 6. Frontend Mobile-First
- [ ] **Estructura App Shell:**
    - [ ] `BottomNav.astro`: Navegación fija inferior (iOS style).
    - [ ] `Header.astro`: Sticky + Backdrop Blur.
- [ ] **Componentes Home:**
    - [ ] `HeroCarousel.astro`: Scroll Snap horizontal + Gradientes sobre imagen.
    - [ ] `PropertyCard.astro`: Diseño vertical con imagen grande y badges de estado.
- [ ] **Páginas:**
    - [ ] Home (`/`): Listados + Filtros URL.
    - [ ] Detalle (`/propiedad/[id]`): Galería swipeable + Botón WhatsApp Sticky.
- [ ] Integración Mapas: Leaflet en modo `client:only` para evitar bloqueos SSR.

---

## ⚠️ Notas Técnicas
*   **Mobile UX:** Usar `overflow-y-auto` y `overscroll-behavior-y: none` para sensación nativa.
*   **Despliegue:** Netlify (Serverless Functions para API).
*   **Performance:** Uso de `Stale-While-Revalidate` en cabeceras HTTP.