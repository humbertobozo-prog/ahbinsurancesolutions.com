import fs from 'fs';
import path from 'path';
import { getSeoMetadata, rewriteHtmlForSeo } from '../server-seo';

// All valid public routes in the website
export const ALL_ROUTES: string[] = [
  '/',
  '/es',
  '/medicare',
  '/es/medicare',
  '/final-expense',
  '/es/gastos-finales',
  '/iul-retirement',
  '/es/iul-jubilacion',
  '/blog',
  '/es/blog',
  '/blog/medicare-open-enrollment-florida-2026',
  '/es/blog/medicare-inscripcion-abierta-florida-2026',
  '/blog/final-expense-burial-costs-florida',
  '/es/blog/costos-funerales-gastos-finales-florida',
  '/blog/iul-vs-401k-tax-free-retirement',
  '/es/blog/iul-vs-401k-jubilacion-libre-de-impuestos',
  '/faq',
  '/es/preguntas-frecuentes',
  '/about-us',
  '/es/nosotros',
  '/contact',
  '/es/contacto',
  '/terms',
  '/es/terminos',
  '/privacy',
  '/es/privacidad',
  '/medicare-florida',
  '/medicare-supplement-florida',
  '/es/suplemento-medicare-florida',
  '/es/seguro-medicare-florida',
  '/es/seguro-gastos-finales-florida',
  '/final-expense-miami',
  '/burial-insurance-tampa',
  '/es/seguro-gastos-finales-tampa',
  '/iul-retirement-tampa',
  '/annuities-florida',
  '/es/anualidades-florida',
  '/dental-vision-florida',
  '/es/dental-vision-florida',
  '/spanish-insurance-orlando'
];

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
      // Sub-route: e.g. /es/medicare -> dist/es/medicare/index.html
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
  const notFoundMetadata = {
    title: '404 - Page Not Found | AHB Insurance Solutions',
    description: 'The page you requested could not be found on AHB Insurance Solutions. Please visit our homepage to explore Medicare, Final Expense, and IUL options in Florida.',
    htmlLang: 'en-US',
    canonicalUrl: 'https://www.ahbinsurancesolutions.com/404',
    enUrl: 'https://www.ahbinsurancesolutions.com/404',
    esUrl: 'https://www.ahbinsurancesolutions.com/404',
    ogType: 'website',
    bodyOutline: `
      <main class="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 class="text-6xl font-black text-primary mb-4">404</h1>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Page Not Found / Página no encontrada</h2>
        <p class="text-gray-600 mb-6 max-w-md">The link you followed may be broken or the page may have been moved.</p>
        <a href="/" class="bg-primary text-white font-bold px-6 py-3 rounded-xl uppercase tracking-wider">Return to Homepage / Volver al Inicio</a>
      </main>
    `
  };

  let notFoundHtml = rewriteHtmlForSeo(baseHtml, notFoundMetadata, true);
  // Inject noindex meta tag into 404.html
  notFoundHtml = notFoundHtml.replace(
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow">'
  );
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  console.log(`[SSG] Successfully pre-rendered ${count} pages + 404.html in dist/!`);
}

// Run SSG generator
prerenderAllPages();
