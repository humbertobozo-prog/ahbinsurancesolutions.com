import fs from 'fs';
import path from 'path';
import { getSeoMetadata, rewriteHtmlForSeo } from '../server-seo';
import { generatePageMarkdown } from '../markdown-agent';
import { getAllSitemapRoutes, writeSitemapFiles } from './generate-sitemap';

// Dynamically generate all indexable routes from sitemap entries
const sitemapRoutes = getAllSitemapRoutes();
const routeSet = new Set<string>();

for (const entry of sitemapRoutes) {
  routeSet.add(entry.enPath);
  routeSet.add(entry.esPath);
}

// Add non-sitemap legal & utility pages (excluding redirected routes so 301 status takes effect)
routeSet.add('/terms');
routeSet.add('/privacy');
routeSet.add('/es/terminos');
routeSet.add('/es/privacidad');

export const ALL_ROUTES: string[] = Array.from(routeSet);

export function prerenderAllPages(): void {
  const distDir = path.join(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.warn(`[SSG] Template not found at ${templatePath}. Skipping static page pre-rendering.`);
    return;
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  console.log(`[SSG] Pre-rendering ${ALL_ROUTES.length} static HTML & Markdown pages for SEO & Agent discovery...`);

  let count = 0;
  for (const route of ALL_ROUTES) {
    const metadata = getSeoMetadata(route);
    const renderedHtml = rewriteHtmlForSeo(baseHtml, metadata, true);
    const markdownContent = generatePageMarkdown(route, metadata);

    if (route === '/' || route === '') {
      // Home page
      fs.writeFileSync(path.join(distDir, 'index.html'), renderedHtml, 'utf-8');
      fs.writeFileSync(path.join(distDir, 'index.md'), markdownContent, 'utf-8');
      count++;
    } else {
      // Sub-route: e.g. /es/medicare-florida -> dist/es/medicare-florida/index.html & index.md
      const cleanPath = route.startsWith('/') ? route.slice(1) : route;
      const targetDir = path.join(distDir, cleanPath);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, renderedHtml, 'utf-8');
      const targetMdFile = path.join(targetDir, 'index.md');
      fs.writeFileSync(targetMdFile, markdownContent, 'utf-8');
      count++;
    }
  }

  // Generate dedicated 404.html and 404.md with noindex to prevent soft-404 in search engines & agent crawlers
  const notFoundMetadata = getSeoMetadata('/404');
  const notFoundHtml = rewriteHtmlForSeo(baseHtml, notFoundMetadata, true);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');
  const notFoundMarkdown = generatePageMarkdown('/404', notFoundMetadata);
  fs.writeFileSync(path.join(distDir, '404.md'), notFoundMarkdown, 'utf-8');

  // Generate and write dynamic sitemap.xml to dist/ and public/
  writeSitemapFiles();

  // Ensure robots.txt is copied to dist/ to maintain consistency even if build cache is cleared
  const robotsSrc = path.join(process.cwd(), 'public', 'robots.txt');
  const robotsDest = path.join(distDir, 'robots.txt');
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, robotsDest);
  }

  console.log(`[SSG] Successfully pre-rendered ${count} pages + 404.html + sitemap.xml + robots.txt in dist/!`);
}

// Run SSG generator
prerenderAllPages();
