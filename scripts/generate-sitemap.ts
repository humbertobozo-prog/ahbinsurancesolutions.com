import fs from 'fs';
import path from 'path';
import { BLOG_POSTS } from '../constants/blogPosts';
import { FLORIDA_CITIES } from '../data/cityGuidesData';
import { getRoutePairs } from '../utils/routePairs';

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
  const corePaths = [
    '/',
    '/medicare-florida',
    '/final-expense',
    '/iul-retirement',
    '/annuities-florida',
    '/dental-vision-florida',
    '/blog',
    '/city-guides',
    '/locations/gainesville-fl',
    '/final-expense-miami',
    '/burial-insurance-tampa',
    '/iul-retirement-tampa',
    '/orlando-spanish-insurance',
    '/faq',
    '/about-andres-bozo',
    '/contact',
    '/terms',
    '/privacy',
    '/blog-generator'
  ];

  const routes: SitemapRouteEntry[] = corePaths.map(p => {
    const pairs = getRoutePairs(p);
    let priority = 0.8;
    let changefreq: SitemapRouteEntry['changefreq'] = 'weekly';

    if (p === '/') {
      priority = 1.0;
    } else if (['/medicare-florida', '/final-expense', '/iul-retirement', '/annuities-florida'].includes(p)) {
      priority = 0.95;
    } else if (p === '/blog') {
      priority = 0.85;
      changefreq = 'daily';
    }

    return {
      enPath: pairs.en,
      esPath: pairs.es,
      changefreq,
      priority
    };
  });

  // 5. Dynamic City Guides from FLORIDA_CITIES
  for (const city of FLORIDA_CITIES) {
    const pairs = getRoutePairs(`/cities/${city.slug}`);
    routes.push({
      enPath: pairs.en,
      esPath: pairs.es,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // 6. Dynamic Blog Posts from BLOG_POSTS
  for (const post of BLOG_POSTS) {
    const pairs = getRoutePairs(`/blog/${post.slug.en}`);
    routes.push({
      enPath: pairs.en,
      esPath: pairs.es,
      lastmod: post.date,
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
  const seenLocs = new Set<string>();

  for (const entry of routes) {
    const enFullUrl = `${BASE_URL}${entry.enPath === '/' ? '/' : entry.enPath}`;
    const esFullUrl = `${BASE_URL}${entry.esPath}`;
    const lastmodTag = entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : '';

    if (entry.enPath === entry.esPath) {
      // Single language or combined URL
      if (!seenLocs.has(enFullUrl)) {
        seenLocs.add(enFullUrl);
        urlBlocks.push(`  <url>
    <loc>${enFullUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="${enFullUrl}" />
    <xhtml:link rel="alternate" hreflang="es-US" href="${esFullUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enFullUrl}" />
${lastmodTag}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`);
      }
    } else {
      // English URL block
      if (!seenLocs.has(enFullUrl)) {
        seenLocs.add(enFullUrl);
        urlBlocks.push(`  <url>
    <loc>${enFullUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="${enFullUrl}" />
    <xhtml:link rel="alternate" hreflang="es-US" href="${esFullUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enFullUrl}" />
${lastmodTag}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`);
      }

      // Spanish URL block
      if (!seenLocs.has(esFullUrl)) {
        seenLocs.add(esFullUrl);
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
