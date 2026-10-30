import { BLOG_POSTS } from '../constants/blogPosts';
import { FLORIDA_CITIES } from '../data/cityGuidesData';

export interface RoutePair {
  en: string;
  es: string;
}

const STATIC_ROUTE_PAIRS: Record<string, RoutePair> = {
  "": { en: "/", es: "/es" },
  "/": { en: "/", es: "/es" },
  "/es": { en: "/", es: "/es" },
  "/medicare": { en: "/medicare-florida", es: "/es/seguro-medicare-florida" },
  "/es/medicare": { en: "/medicare-florida", es: "/es/seguro-medicare-florida" },
  "/final-expense": { en: "/final-expense", es: "/es/gastos-finales" },
  "/es/gastos-finales": { en: "/final-expense", es: "/es/gastos-finales" },
  "/iul-retirement": { en: "/iul-retirement", es: "/es/iul-jubilacion" },
  "/es/iul-jubilacion": { en: "/iul-retirement", es: "/es/iul-jubilacion" },
  "/iul": { en: "/iul-retirement", es: "/es/iul-jubilacion" },
  "/es/iul": { en: "/iul-retirement", es: "/es/iul-jubilacion" },
  "/iul-florida": { en: "/iul-retirement", es: "/es/iul-jubilacion" },
  "/es/iul-florida": { en: "/iul-retirement", es: "/es/iul-jubilacion" },
  "/iul-jubilacion": { en: "/iul-retirement", es: "/es/iul-jubilacion" },
  "/blog": { en: "/blog", es: "/es/blog" },
  "/es/blog": { en: "/blog", es: "/es/blog" },
  "/faq": { en: "/faq", es: "/es/preguntas-frecuentes" },
  "/es/preguntas-frecuentes": { en: "/faq", es: "/es/preguntas-frecuentes" },
  "/about-us": { en: "/about-andres-bozo", es: "/es/sobre-andres-bozo" },
  "/es/nosotros": { en: "/about-andres-bozo", es: "/es/sobre-andres-bozo" },
  "/about-andres-bozo": { en: "/about-andres-bozo", es: "/es/sobre-andres-bozo" },
  "/es/sobre-andres-bozo": { en: "/about-andres-bozo", es: "/es/sobre-andres-bozo" },
  "/contact": { en: "/contact", es: "/es/contacto" },
  "/es/contacto": { en: "/contact", es: "/es/contacto" },
  "/terms": { en: "/terms", es: "/es/terminos" },
  "/es/terminos": { en: "/terms", es: "/es/terminos" },
  "/privacy": { en: "/privacy", es: "/es/privacidad" },
  "/es/privacidad": { en: "/privacy", es: "/es/privacidad" },
  "/city-guides": { en: "/city-guides", es: "/es/guias-ciudades" },
  "/es/guias-ciudades": { en: "/city-guides", es: "/es/guias-ciudades" },
  "/medicare-florida": { en: "/medicare-florida", es: "/es/seguro-medicare-florida" },
  "/es/seguro-medicare-florida": { en: "/medicare-florida", es: "/es/seguro-medicare-florida" },
  "/medicare-supplement-florida": { en: "/medicare-supplement-florida", es: "/es/suplemento-medicare-florida" },
  "/es/suplemento-medicare-florida": { en: "/medicare-supplement-florida", es: "/es/suplemento-medicare-florida" },
  "/final-expense-miami": { en: "/final-expense-miami", es: "/es/seguro-gastos-finales-florida" },
  "/es/seguro-gastos-finales-florida": { en: "/final-expense-miami", es: "/es/seguro-gastos-finales-florida" },
  "/burial-insurance-tampa": { en: "/burial-insurance-tampa", es: "/es/seguro-gastos-finales-tampa" },
  "/es/seguro-gastos-finales-tampa": { en: "/burial-insurance-tampa", es: "/es/seguro-gastos-finales-tampa" },
  "/iul-retirement-tampa": { en: "/iul-retirement-tampa", es: "/es/iul-jubilacion-tampa" },
  "/es/iul-jubilacion-tampa": { en: "/iul-retirement-tampa", es: "/es/iul-jubilacion-tampa" },
  "/annuities-florida": { en: "/annuities-florida", es: "/es/anualidades-florida" },
  "/es/anualidades-florida": { en: "/annuities-florida", es: "/es/anualidades-florida" },
  "/dental-vision-florida": { en: "/dental-vision-florida", es: "/es/dental-vision-florida" },
  "/es/dental-vision-florida": { en: "/dental-vision-florida", es: "/es/dental-vision-florida" },
  "/orlando-spanish-insurance": { en: "/orlando-spanish-insurance", es: "/spanish-insurance-orlando" },
  "/spanish-insurance-orlando": { en: "/orlando-spanish-insurance", es: "/spanish-insurance-orlando" },
  "/locations/gainesville-fl": { en: "/locations/gainesville-fl", es: "/es/locations/gainesville-fl" },
  "/es/locations/gainesville-fl": { en: "/locations/gainesville-fl", es: "/es/locations/gainesville-fl" },
  "/es/localidades/gainesville-fl": { en: "/locations/gainesville-fl", es: "/es/locations/gainesville-fl" },
  "/gainesville-fl-insurance": { en: "/locations/gainesville-fl", es: "/es/locations/gainesville-fl" },
  "/es/seguros-gainesville-fl": { en: "/locations/gainesville-fl", es: "/es/locations/gainesville-fl" },
  "/editorial-policy": { en: "/editorial-policy", es: "/es/politica-editorial" },
  "/es/politica-editorial": { en: "/editorial-policy", es: "/es/politica-editorial" }
};

export function getRoutePairs(pathname: string): RoutePair {
  const cleanPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  // 1. Static Routes
  if (STATIC_ROUTE_PAIRS[cleanPath]) {
    return STATIC_ROUTE_PAIRS[cleanPath];
  }

  // 2. Dynamic Blog Posts
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const post = BLOG_POSTS.find(p => p.slug.en === slug || p.slug.es === slug);
    if (post) {
      return { en: `/blog/${post.slug.en}`, es: `/es/blog/${post.slug.es}` };
    }
  }
  if (cleanPath.startsWith('/es/blog/')) {
    const slug = cleanPath.replace('/es/blog/', '');
    const post = BLOG_POSTS.find(p => p.slug.en === slug || p.slug.es === slug);
    if (post) {
      return { en: `/blog/${post.slug.en}`, es: `/es/blog/${post.slug.es}` };
    }
  }

  // 3. Dynamic City Guides
  if (cleanPath.startsWith('/cities/')) {
    const slug = cleanPath.replace('/cities/', '');
    const city = FLORIDA_CITIES.find(c => c.slug === slug);
    if (city) {
      return { en: `/cities/${city.slug}`, es: `/es/ciudades/${city.slug}` };
    }
  }
  if (cleanPath.startsWith('/es/ciudades/')) {
    const slug = cleanPath.replace('/es/ciudades/', '');
    const city = FLORIDA_CITIES.find(c => c.slug === slug);
    if (city) {
      return { en: `/cities/${city.slug}`, es: `/es/ciudades/${city.slug}` };
    }
  }

  // 4. Default Fallback (Language Prefixing)
  if (cleanPath.startsWith('/es')) {
    const enSub = cleanPath.replace(/^\/es/, '');
    return { en: enSub === '' ? '/' : enSub, es: cleanPath };
  } else {
    const esSub = cleanPath === '/' ? '' : cleanPath;
    return { en: cleanPath === '' ? '/' : cleanPath, es: `/es${esSub}` };
  }
}
