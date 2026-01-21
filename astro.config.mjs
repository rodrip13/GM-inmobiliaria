import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import AstroPWA from "@vite-pwa/astro";

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [
    tailwind(),
    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'GM Inmobiliaria',
        short_name: 'GM Inmobiliaria',
        start_url: '/',
        display: 'standalone',
        background_color: '#f8f8f6',
        theme_color: '#ecb613',
        description: 'Graciela Martínez Negocios Inmobiliarios',
        icons: [
          // Icons should be added to public folder later
        ],
      },
      workbox: {
        navigateFallback: '/404',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        runtimeCaching: [
            {
                urlPattern: ({ request }) => request.mode === 'navigate',
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'pages-cache',
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                }
            }
        ]
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
      },
    }),
  ],
});
