
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        id: '/',
        name: 'AHB Insurance Solutions',
        short_name: 'AHB Insurance',
        description: 'Florida Medicare, Final Expense & IUL Insurance Specialists.',
        theme_color: '#002855',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    port: 3000,
  },
  esbuild: {
    drop: ['console', 'debugger'],
    target: 'es2022',
  },
  build: {
    outDir: 'dist',
    target: 'es2022',
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    minify: 'esbuild',
    modulePreload: {
      filter(viteModule) {
        // Exclude non-critical and heavy third-party bundles from initial critical modulepreload
        return !viteModule.includes('webVitals') && 
               !viteModule.includes('vendor-emailjs') && 
               !viteModule.includes('vendor-genai') && 
               !viteModule.includes('vendor-icons');
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. External form/contact services (only loaded on form usage)
            if (id.includes('@emailjs')) {
              return 'vendor-emailjs';
            }
            // 2. Heavy AI/LLM SDK (only loaded for AI features/blog generation)
            if (id.includes('@google/genai')) {
              return 'vendor-genai';
            }
            // 3. Icons: isolated from React core to avoid bundling icon definitions into React chunk
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // 4. React core & scheduler (pure React runtime)
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/') ||
              id.includes('react-router')
            ) {
              return 'vendor-react';
            }
            // 5. CSS/Class utilities
            if (id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'vendor-utils';
            }
            // 6. Remaining 3rd party vendor libraries
            return 'vendor-core';
          }
        }
      }
    }
  }
});


