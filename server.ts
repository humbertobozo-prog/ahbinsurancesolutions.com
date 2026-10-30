import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import { getSeoMetadata, rewriteHtmlForSeo } from './server-seo';

const app = express();
const PORT = 3000;
const ALT_PORT = process.env.PORT && process.env.PORT !== '3000' ? Number(process.env.PORT) : null;

app.use(compression());
app.use(express.json());


const ROOT_PATH = process.cwd();
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const INDEX_HTML_PATH = path.resolve(DIST_PATH, 'index.html');

const isProd = process.env.NODE_ENV === 'production' || (fs.existsSync(INDEX_HTML_PATH) && process.env.npm_lifecycle_event !== 'dev');

// 1. API Endpoints
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'AHB Insurance Solutions API',
    broker: 'Andres H. Bozo (NPN 21228432)',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/contact', (req: Request, res: Response) => {
  console.log('Lead submission received:', req.body?.name, req.body?.phone);
  res.status(200).json({ success: true, message: 'Lead received successfully' });
});

async function startServer() {
  if (!isProd) {
    // DEVELOPMENT: Mount Vite middleware for live development & HMR
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use(async (req: Request, res: Response, next: NextFunction) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();

      if (/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff2|json|txt|xml|webmanifest)$/i.test(req.path)) {
        return next();
      }

      try {
        const templatePath = path.resolve(ROOT_PATH, 'index.html');
        if (!fs.existsSync(templatePath)) {
          return next();
        }
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);

        const metadata = getSeoMetadata(req.path);
        const rendered = rewriteHtmlForSeo(template, metadata, false);
        const status = metadata.is404 ? 404 : 200;
        res.status(status).set({ 'Content-Type': 'text/html' }).end(rendered);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // PRODUCTION: Serve pre-rendered static assets and dynamic fallback
    app.use(express.static(DIST_PATH, { 
      index: 'index.html',
      maxAge: '1y'
    }));

    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();

      // Return 404 immediately for missing physical assets
      if (/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff2|json|txt|xml|webmanifest)$/i.test(req.path)) {
        return res.status(404).send('Resource Not Found');
      }

      if (!fs.existsSync(INDEX_HTML_PATH)) {
        return res.status(500).send('Error de compilación: index.html no encontrado en dist. Ejecuta npm run build.');
      }

      try {
        const cleanPath = req.path.endsWith('/') && req.path.length > 1 ? req.path.slice(0, -1) : req.path;
        
        // If a pre-rendered static page exists for this route, serve it
        const prerenderedPath = path.join(DIST_PATH, cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath, 'index.html');
        if (cleanPath !== '' && cleanPath !== '/' && fs.existsSync(prerenderedPath)) {
          const prerenderedHtml = fs.readFileSync(prerenderedPath, 'utf8');
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(prerenderedHtml);
        }

        const html = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
        const metadata = getSeoMetadata(req.path);
        const rendered = rewriteHtmlForSeo(html, metadata, true);
        const status = metadata.is404 ? 404 : 200;
        res.status(status).set({ 'Content-Type': 'text/html' }).end(rendered);
      } catch (error) {
        console.error('Error serving route:', error);
        res.status(500).send('Internal Server Error');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AHB Insurance Server running on http://0.0.0.0:${PORT} [${isProd ? 'PRODUCTION' : 'DEVELOPMENT'}]`);
  });

  if (ALT_PORT && ALT_PORT !== PORT) {
    app.listen(ALT_PORT, '0.0.0.0', () => {
      console.log(`🚀 AHB Insurance Server also running on http://0.0.0.0:${ALT_PORT}`);
    });
  }
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
