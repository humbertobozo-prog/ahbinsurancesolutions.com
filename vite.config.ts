
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
        // Exclude webVitals, emailjs, and icon bundles from critical path modulepreload
        return !viteModule.includes('webVitals') && 
               !viteModule.includes('vendor-emailjs') && 
               !viteModule.includes('vendor-icons');
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Put React and core libraries in vendor-react
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // Put large UI components and other libs in vendor-utils
            return 'vendor-utils';
          }
        }
      }
    }
  }
});


