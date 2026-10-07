import fs from 'fs';
import path from 'path';
import { BLOG_POSTS } from '../constants/blogPosts';
import { FLORIDA_CITIES } from '../data/cityGuidesData';

const BASE_URL = 'https://www.ahbinsurancesolutions.com';

export interface SitemapRouteEntry {
  enPath: string;
  esPath: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Returns all active, canonical, indexable routes paired by language.
 * Legacy redirected routes (like /medicare) are intentionally excluded
 * to ensure 100% crawl efficiency and 0 redirect errors in Google Search Console.
 */
export function getAllSitemapRoutes(): SitemapRouteEntry[] {
  const today = new Date().toISOString().split('T')[0];

  const routes: SitemapRouteEntry[] = [
    // 1. Core Pillar & Primary Service Pages
    {
      enPath: '/',
      esPath: '/es',
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      enPath: '/medicare-florida',
      esPath: '/es/seguro-medicare-florida',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.95,
    },
    {
      enPath: '/final-expense',
      esPath: '/es/gastos-finales',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      enPath: '/iul-retirement',
      esPath: '/es/iul-jubilacion',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      enPath: '/annuities-florida',
      esPath: '/es/anualidades-florida',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      enPath: '/dental-vision-florida',
      esPath: '/es/dental-vision-florida',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
    },

    // 2. Hub Pages
    {
      enPath: '/blog',
      esPath: '/es/blog',
      lastmod: today,
      changefreq: 'daily',
      priority: 0.85,
    },
    {
      enPath: '/city-guides',
      esPath: '/es/guias-ciudades',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
    },

    // 3. Location-Specific Landing Pages
    {
      enPath: '/locations/gainesville-fl',
      esPath: '/es/locations/gainesville-fl',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
    },
    {
      enPath: '/final-expense-miami',
      esPath: '/es/seguro-gastos-finales-florida',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
    },
    {
      enPath: '/burial-insurance-tampa',
      esPath: '/es/seguro-gastos-finales-tampa',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
    },
    {
      enPath: '/iul-retirement-tampa',
      esPath: '/es/iul-jubilacion',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
    },
    {
      enPath: '/spanish-insurance-orlando',
      esPath: '/spanish-insurance-orlando',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
    },

    // 4. Informational & Contact Pages
    {
      enPath: '/faq',
      esPath: '/es/preguntas-frecuentes',
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      enPath: '/about-andres-bozo',
      esPath: '/es/sobre-andres-bozo',
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      enPath: '/contact',
      esPath: '/es/contacto',
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    },

    // 5. Legal & Compliance Pages
    {
      enPath: '/terms',
      esPath: '/es/terminos',
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.5,
    },
    {
      enPath: '/privacy',
      esPath: '/es/privacidad',
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.5,
    },
  ];

  // 6. Dynamic City Guides from FLORIDA_CITIES
  for (const city of FLORIDA_CITIES) {
    routes.push({
      enPath: `/cities/${city.slug}`,
      esPath: `/es/ciudades/${city.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // 7. Dynamic Blog Posts from BLOG_POSTS
  for (const post of BLOG_POSTS) {
    routes.push({
      enPath: `/blog/${post.slug.en}`,
      esPath: `/es/blog/${post.slug.es}`,
      lastmod: post.date || today,
      changefreq: 'monthly',
      priority: 0.75,
    });
  }

  return routes;
}

/**
 * Generates standards-compliant XML sitemap string with bidirectional hreflang links.
 */
export function generateSitemapXml(): string {
  const routes = getAllSitemapRoutes();
  const urlBlocks: string[] = [];

  for (const entry of routes) {
    const enFullUrl = `${BASE_URL}${entry.enPath === '/' ? '/' : entry.enPath}`;
    const esFullUrl = `${BASE_URL}${entry.esPath}`;
    const lastmodTag = entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : '';

    if (entry.enPath === entry.esPath) {
      // Single language or combined URL
      urlBlocks.push(`  <url>
    <loc>${enFullUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="${enFullUrl}" />
    <xhtml:link rel="alternate" hreflang="es-US" href="${esFullUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enFullUrl}" />
${lastmodTag}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`);
    } else {
      // English URL block
      urlBlocks.push(`  <url>
    <loc>${enFullUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="${enFullUrl}" />
    <xhtml:link rel="alternate" hreflang="es-US" href="${esFullUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enFullUrl}" />
${lastmodTag}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`);

      // Spanish URL block
      urlBlocks.push(`  <url>
    <loc>${esFullUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="${enFullUrl}" />
    <xhtml:link rel="alternate" hreflang="es-US" href="${esFullUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enFullUrl}" />
${lastmodTag}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlBlocks.join('\n')}
</urlset>
`;
}

/**
 * Writes sitemap.xml to public/ and dist/ directories.
 */
export function writeSitemapFiles(): void {
  const xml = generateSitemapXml();
  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const distPath = path.join(process.cwd(), 'dist', 'sitemap.xml');

  // Write to public/
  fs.writeFileSync(publicPath, xml, 'utf-8');
  console.log(`[SITEMAP] Generated dynamic sitemap.xml written to ${publicPath}`);

  // Write to dist/ if it exists
  const distDir = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(distPath, xml, 'utf-8');
    console.log(`[SITEMAP] Generated dynamic sitemap.xml written to ${distPath}`);
  }
}

// Run directly if executed as standalone script
if (process.argv[1] && (process.argv[1].endsWith('generate-sitemap.ts') || process.argv[1].endsWith('generate-sitemap.js'))) {
  writeSitemapFiles();
}
