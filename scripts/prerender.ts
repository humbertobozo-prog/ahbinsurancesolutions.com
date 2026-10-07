import fs from 'fs';
import path from 'path';
import { getSeoMetadata, rewriteHtmlForSeo } from '../server-seo';
import { getAllSitemapRoutes, writeSitemapFiles } from './generate-sitemap';

// Dynamically generate all indexable routes from sitemap entries
const sitemapRoutes = getAllSitemapRoutes();
const routeSet = new Set<string>();

for (const entry of sitemapRoutes) {
  routeSet.add(entry.enPath);
  routeSet.add(entry.esPath);
}

// Add canonical location aliases
routeSet.add('/es/localidades/gainesville-fl');
routeSet.add('/gainesville-fl-insurance');
routeSet.add('/es/seguros-gainesville-fl');

export const ALL_ROUTES: string[] = Array.from(routeSet);

export function prerenderAllPages(): void {
  const distDir = path.join(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.warn(`[SSG] Template not found at ${templatePath}. Skipping static page pre-rendering.`);
    return;
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  console.log(`[SSG] Pre-rendering ${ALL_ROUTES.length} static HTML pages for SEO & Vercel deployment...`);

  let count = 0;
  for (const route of ALL_ROUTES) {
    const metadata = getSeoMetadata(route);
    const renderedHtml = rewriteHtmlForSeo(baseHtml, metadata, true);

    if (route === '/' || route === '') {
      // Home page
      fs.writeFileSync(path.join(distDir, 'index.html'), renderedHtml, 'utf-8');
      count++;
    } else {
      // Sub-route: e.g. /es/medicare-florida -> dist/es/medicare-florida/index.html
      const cleanPath = route.startsWith('/') ? route.slice(1) : route;
      const targetDir = path.join(distDir, cleanPath);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, renderedHtml, 'utf-8');
      count++;
    }
  }

  // Generate a dedicated 404.html with noindex to prevent soft-404 in search engines
  const notFoundMetadata = getSeoMetadata('/404');
  const notFoundHtml = rewriteHtmlForSeo(baseHtml, notFoundMetadata, true);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  // Generate and write dynamic sitemap.xml to dist/ and public/
  writeSitemapFiles();

  console.log(`[SSG] Successfully pre-rendered ${count} pages + 404.html + sitemap.xml in dist/!`);
}

// Run SSG generator
prerenderAllPages();
