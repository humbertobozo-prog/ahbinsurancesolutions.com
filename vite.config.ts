
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { transformSync } from 'esbuild';

/**
 * Custom Vite Plugin: Critical CSS Extract & Minify
 * Extracts critical above-the-fold CSS rules from the generated stylesheet bundle,
 * minifies them, and inlines them into <head> to eliminate render-blocking CSS
 * and accelerate Largest Contentful Paint (LCP).
 */
function criticalCssPlugin(): Plugin {
  return {
    name: 'vite-plugin-critical-css',
    enforce: 'post',
    generateBundle(_options, bundle) {
      // Find CSS assets in the build bundle
      let cssContent = '';
      let cssFileName = '';

      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type === 'asset' && fileName.endsWith('.css')) {
          cssContent += typeof file.source === 'string' ? file.source : new TextDecoder().decode(file.source);
          cssFileName = fileName;
        }
      }

      if (!cssContent) return;

      // Extract critical CSS rules for above-the-fold rendering
      const criticalSelectors = [
        ':root', '*', '::before', '::after', 'html', 'body', 'h1', 'h2', 'p', 'a', 'span', 'button', 'img', 'svg',
        '.hero-img-container', '.glass-card', '.skip-link', '.container', '.flex', '.grid', '.hidden', '.block',
        '.relative', '.absolute', '.fixed', '.sticky', '.inset-0', '.top-0', '.z-50', '.w-full', '.h-full',
        '.min-h-screen', '.items-center', '.justify-between', '.justify-center', '.bg-white', '.text-primary',
        'header', 'nav', 'picture'
      ];

      const rules = cssContent.match(/([^{}]+)\{([^{}]+)\}/g) || [];
      const criticalRules: string[] = [];

      for (const rule of rules) {
        const selectorPart = rule.split('{')[0].trim();
        const isCritical = criticalSelectors.some(sel => {
          if (sel.startsWith('.')) {
            return selectorPart.includes(sel);
          }
          return selectorPart.split(',').some(part => part.trim() === sel || part.trim().startsWith(sel + ':') || part.trim().startsWith(sel + '.'));
        });

        if (isCritical) {
          criticalRules.push(rule);
        }
      }

      let extractedCss = criticalRules.join('\n');
      if (extractedCss.length < 500) {
        extractedCss = cssContent.slice(0, 12000);
      }

      // Minify critical CSS using esbuild
      let minifiedCritical = extractedCss;
      try {
        const minified = transformSync(extractedCss, { loader: 'css', minify: true });
        minifiedCritical = minified.code;
      } catch (e) {
        console.warn('Critical CSS minification fallback:', e);
      }

      // Find HTML entry asset and inline critical styles
      for (const [fileName, file] of Object.entries(bundle)) {
        if (fileName.endsWith('.html') && file.type === 'asset' && typeof file.source === 'string') {
          let html = file.source;

          const criticalStyleTag = `<style id="critical-css">${minifiedCritical}</style>`;
          html = html.replace('</head>', `${criticalStyleTag}</head>`);

          if (cssFileName) {
            const cssRegex = new RegExp(`<link([^>]+)href="[^"]*${cssFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"([^>]*)>`, 'g');
            html = html.replace(cssRegex, (_match) => {
              const hrefMatch = _match.match(/href="([^"]+)"/);
              const href = hrefMatch ? hrefMatch[1] : '';
              return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"></noscript>`;
            });
          }

          file.source = html;
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), criticalCssPlugin()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        }
      }
    }
  }
});


