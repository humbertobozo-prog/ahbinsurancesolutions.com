import express from "express";
import type { SeoMetaData } from "./server-seo";
import { BLOG_POSTS } from "./constants/blogPosts";
import { FLORIDA_CITIES, CityData } from "./data/cityGuidesData";

/**
 * Checks whether an incoming HTTP request prefers or accepts Markdown.
 * Detects 'Accept: text/markdown' or 'text/x-markdown'.
 */
export function isMarkdownRequest(req: express.Request): boolean {
  const accept = req.headers["accept"] || "";
  // If text/markdown is explicitly requested (even if part of a list)
  return /text\/(markdown|x-markdown)/i.test(accept);
}

/**
 * Decodes standard HTML entities.
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&bull;/g, "•")
    .replace(/&copy;/g, "©")
    .replace(/&reg;/g, "®");
}

/**
 * Converts semantic HTML from bodyOutline into clean, human- and LLM-readable Markdown.
 */
export function htmlToMarkdown(html: string): string {
  if (!html) return "";

  let md = html;

  // Normalize line endings
  md = md.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, c) => `\n# ${c.trim()}\n\n`);
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, c) => `\n## ${c.trim()}\n\n`);
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, c) => `\n### ${c.trim()}\n\n`);
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, c) => `\n#### ${c.trim()}\n\n`);
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, (_, c) => `\n##### ${c.trim()}\n\n`);
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, (_, c) => `\n###### ${c.trim()}\n\n`);

  // Definition lists (used in FAQ sections)
  md = md.replace(/<dt[^>]*>([\s\S]*?)<\/dt>/gi, (_, c) => `\n#### ${c.trim()}\n`);
  md = md.replace(/<dd[^>]*>([\s\S]*?)<\/dd>/gi, (_, c) => `${c.trim()}\n\n`);

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, c) => {
    const lines = c.trim().split("\n");
    return "\n" + lines.map((l: string) => `> ${l.trim()}`).join("\n") + "\n\n";
  });

  // Unordered list items
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `- ${c.trim()}\n`);

  // Bold & Italic
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, c) => `**${c.trim()}**`);
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, c) => `*${c.trim()}*`);

  // Links: <a href="url">text</a> -> [text](url)
  md = md.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const cleanText = text.replace(/<[^>]+>/g, "").trim();
    return `[${cleanText || href}](${href})`;
  });

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, c) => `${c.trim()}\n\n`);

  // Line breaks & Horizontal rules
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n\n");

  // Remove structural container tags
  md = md.replace(/<\/?(header|footer|section|article|main|nav|div|dl|ul|ol|span)[^>]*>/gi, "\n");

  // Strip any remaining unknown HTML tags
  md = md.replace(/<[^>]+>/g, "");

  // Decode entities
  md = decodeHtmlEntities(md);

  // Clean up excess whitespace and blank lines
  md = md
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return md;
}

/**
 * Estimates the token count of a given markdown string.
 * Standard heuristic: ~4 characters per token for English & Spanish text.
 */
export function estimateMarkdownTokens(markdown: string): number {
  if (!markdown) return 0;
  return Math.max(1, Math.ceil(markdown.length / 4));
}

/**
 * Builds standard agency contact & licensing markdown footer.
 */
function getAgencyFooter(isEs: boolean): string {
  if (isEs) {
    return `
---

### Contacto y Credenciales Profesionales
- **Agencia:** AHB Insurance Solutions
- **Corredor Licenciado:** Andrés H. Bozo (NPN: 21228432)
- **Licencia Estatal:** Departamento de Servicios Financieros de Florida (DFS)
- **Teléfono Directo:** [+1 (352) 225-8389](tel:+13522258389)
- **WhatsApp:** [+1 (352) 225-8389](https://wa.me/13522258389)
- **Correo Electrónico:** andreshbozo@ahbinsurancesolutions.com
- **Dirección de Oficina:** 5500 SW Archer Road, Apt H103, Gainesville, FL 32607
- **Área de Cobertura:** Todo el estado de Florida (Miami-Dade, Broward, Palm Beach, Orange, Hillsborough, Duval, Alachua y los 67 condados)
- **Aseguradoras Representadas:** Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters, Corebridge y más de 80 compañías de primer nivel.
- **Manifiesto de Agentes de IA:** [/llms.txt](https://www.ahbinsurancesolutions.com/llms.txt) | [/llms-full.txt](https://www.ahbinsurancesolutions.com/llms-full.txt)
`;
  }

  return `
---

### Contact & Professional Credentials
- **Agency:** AHB Insurance Solutions
- **Licensed Independent Broker:** Andres H. Bozo (NPN: 21228432)
- **State Licensing:** Florida Department of Financial Services (DFS)
- **Direct Phone:** [+1 (352) 225-8389](tel:+13522258389)
- **WhatsApp:** [+1 (352) 225-8389](https://wa.me/13522258389)
- **Email:** andreshbozo@ahbinsurancesolutions.com
- **Office Address:** 5500 SW Archer Road, Apt H103, Gainesville, FL 32607
- **Service Area:** Statewide across Florida (Miami-Dade, Broward, Palm Beach, Orange, Hillsborough, Duval, Alachua, and all 67 counties)
- **Carriers Represented:** Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters, Corebridge, and 80+ top-rated insurers.
- **LLM / AI Agent Manifest:** [/llms.txt](https://www.ahbinsurancesolutions.com/llms.txt) | [/llms-full.txt](https://www.ahbinsurancesolutions.com/llms-full.txt)
`;
}

/**
 * Builds rich markdown for an individual Florida City Guide.
 */
function buildCityGuideMarkdown(city: CityData, isEs: boolean, metadata: SeoMetaData): string {
  const faqs = isEs ? city.faqsEs : city.faqsEn;
  const faqSection = faqs
    .map((f) => `### ${f.question}\n\n${f.answer}`)
    .join("\n\n");

  if (isEs) {
    return `# ${metadata.title}

> **Descripción:** ${metadata.description}  
> **URL Canónica:** ${metadata.canonicalUrl}  
> **Idioma:** es-US | **Área:** ${city.cityName}, ${city.county}, Florida

## Información General y Cobertura Local
- **Ciudad:** ${city.cityName}, FL
- **Condado:** ${city.county} (${city.regionName})
- **Población Senior (65+):** ${city.populationSeniors}
- **Vecindarios Atendidos:** ${city.neighborhoods.join(", ")}
- **Redes Hospitalarias Clave:** ${city.hospitals.join(", ")}
- **Costo Promedio de Funeral / Entierro:** ${city.avgFuneralCost}

## Suplementos de Medicare (Medigap) en ${city.cityName}
${city.medicareOverviewEs}

## Seguro de Gastos Finales y Funeral en ${city.cityName}
${city.finalExpenseOverviewEs}

## Seguro de Vida Universal Indexada (IUL) y Jubilación en ${city.cityName}
${city.iulOverviewEs}

## Preguntas Frecuentes en ${city.cityName}
${faqSection}

${getAgencyFooter(true)}`;
  }

  return `# ${metadata.title}

> **Description:** ${metadata.description}  
> **Canonical URL:** ${metadata.canonicalUrl}  
> **Language:** en-US | **Region:** ${city.cityName}, ${city.county}, Florida

## Overview & Local Demographics
- **City:** ${city.cityName}, FL
- **County:** ${city.county} (${city.regionName})
- **Senior Population (65+):** ${city.populationSeniors}
- **Neighborhoods & Communities Served:** ${city.neighborhoods.join(", ")}
- **Key Hospital Networks:** ${city.hospitals.join(", ")}
- **Average Local Funeral & Cremation Cost:** ${city.avgFuneralCost}

## Medicare Supplement (Medigap) Guidance in ${city.cityName}
${city.medicareOverviewEn}

## Final Expense & Burial Insurance in ${city.cityName}
${city.finalExpenseOverviewEn}

## Indexed Universal Life (IUL) Retirement Planning in ${city.cityName}
${city.iulOverviewEn}

## Frequently Asked Questions in ${city.cityName}
${faqSection}

${getAgencyFooter(false)}`;
}

/**
 * Builds rich markdown for an individual Blog Article.
 */
function buildBlogArticleMarkdown(
  slug: string,
  isEs: boolean,
  metadata: SeoMetaData
): string | null {
  const post = BLOG_POSTS.find((p) => p.slug.en === slug || p.slug.es === slug);
  if (!post) return null;

  const title = isEs ? post.title.es : post.title.en;
  const excerpt = isEs ? post.excerpt.es : post.excerpt.en;
  const rawContent = isEs ? post.content.es : post.content.en;

  // If the content is in HTML, convert it; if it is already Markdown, keep it clean
  const content = rawContent.includes("<") && rawContent.includes(">")
    ? htmlToMarkdown(rawContent)
    : rawContent.trim();

  return `# ${title}

> **Excerpt:** ${excerpt}  
> **Published:** ${post.date} | **Read Time:** ${post.readTime} | **Category:** ${post.category}  
> **Author:** ${post.author.name} (${post.author.title}, NPN: ${post.author.npn})  
> **Canonical URL:** ${metadata.canonicalUrl}

${content}

${getAgencyFooter(isEs)}`;
}

/**
 * Generates the full Markdown representation for any given route.
 */
export function generatePageMarkdown(
  requestPath: string,
  metadata: SeoMetaData
): string {
  const cleanPath =
    requestPath.endsWith("/") && requestPath.length > 1
      ? requestPath.slice(0, -1)
      : requestPath;
  const isEs =
    cleanPath.startsWith("/es") || cleanPath === "/spanish-insurance-orlando";

  // 1. Explicit 404
  if (metadata.is404) {
    if (isEs) {
      return `# 404 - Página no encontrada | AHB Insurance Solutions

> **Error:** La página solicitada (\`${requestPath}\`) no existe o ha sido reubicada.

### Enlaces Principales
- [Inicio: Seguros en Florida](https://www.ahbinsurancesolutions.com/es)
- [Planes de Suplemento de Medicare (Medigap)](https://www.ahbinsurancesolutions.com/es/seguro-medicare-florida)
- [Seguro de Gastos Finales y Funeral](https://www.ahbinsurancesolutions.com/es/gastos-finales)
- [Vida Universal Indexada (IUL)](https://www.ahbinsurancesolutions.com/es/iul-jubilacion)
- [Contacto y Cotización Gratuita](https://www.ahbinsurancesolutions.com/es/contacto)

${getAgencyFooter(true)}`;
    }

    return `# 404 - Page Not Found | AHB Insurance Solutions

> **Error:** The requested page (\`${requestPath}\`) does not exist or has been moved.

### Helpful Resources & Navigation
- [Home: Florida Insurance Solutions](https://www.ahbinsurancesolutions.com/)
- [Medicare Supplement Plans (Medigap)](https://www.ahbinsurancesolutions.com/medicare-florida)
- [Final Expense & Burial Insurance](https://www.ahbinsurancesolutions.com/final-expense)
- [Indexed Universal Life (IUL) for Retirement](https://www.ahbinsurancesolutions.com/iul-retirement)
- [Contact & Free Consultation](https://www.ahbinsurancesolutions.com/contact)

${getAgencyFooter(false)}`;
  }

  // 2. Individual Blog Article
  if (cleanPath.startsWith("/blog/") || cleanPath.startsWith("/es/blog/")) {
    const slug = cleanPath.startsWith("/blog/")
      ? cleanPath.replace("/blog/", "")
      : cleanPath.replace("/es/blog/", "");
    const articleMd = buildBlogArticleMarkdown(slug, isEs, metadata);
    if (articleMd) return articleMd;
  }

  // 3. Individual Dynamic City Guide
  if (cleanPath.startsWith("/cities/") || cleanPath.startsWith("/es/ciudades/")) {
    const citySlug = cleanPath.startsWith("/cities/")
      ? cleanPath.replace("/cities/", "")
      : cleanPath.replace("/es/ciudades/", "");
    const city = FLORIDA_CITIES.find((c) => c.slug === citySlug);
    if (city) {
      return buildCityGuideMarkdown(city, isEs, metadata);
    }
  }

  // 4. General / Service / Home / FAQ pages: Convert bodyOutline to Markdown
  const parsedOutline = htmlToMarkdown(metadata.bodyOutline);

  const headerBlock = `# ${metadata.title}

> **Description:** ${metadata.description}  
> **Canonical URL:** ${metadata.canonicalUrl}  
> **Language:** ${metadata.htmlLang}  
> **Published:** ${metadata.datePublished || "2024-01-15"} | **Updated:** ${metadata.dateModified || "2026-10-10"}
`;

  return `${headerBlock}\n\n${parsedOutline}\n\n${getAgencyFooter(isEs)}`;
}
