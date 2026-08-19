
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 600,
    modulePreload: {
      filter(viteModule) {
        // Exclude webVitals and non-critical assets from initial modulepreload critical path
        return !viteModule.includes('webVitals') && !viteModule.includes('vendor-emailjs');
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@emailjs')) {
              return 'vendor-emailjs';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor-utils';
          }
        }
      }
    }
  }
});


