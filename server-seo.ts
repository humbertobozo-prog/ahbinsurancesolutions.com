import { BLOG_POSTS } from "./constants/blogPosts";
import { faqsEs, faqsEn } from "./constants/faqData";
import { FLORIDA_CITIES } from "./data/cityGuidesData";

export interface SeoMetaData {
  title: string;
  description: string;
  htmlLang: string;
  canonicalUrl: string;
  enUrl: string;
  esUrl: string;
  ogType: string;
  bodyOutline: string;
  is404?: boolean;
  robots?: string;
}

const baseUrl = "https://www.ahbinsurancesolutions.com";

export const KNOWN_STATIC_ROUTES = new Set([
  "",
  "/",
  "/es",
  "/medicare-florida",
  "/es/seguro-medicare-florida",
  "/medicare",
  "/es/medicare",
  "/medicare-supplement-florida",
  "/es/suplemento-medicare-florida",
  "/final-expense",
  "/es/gastos-finales",
  "/iul-retirement",
  "/es/iul-jubilacion",
  "/iul",
  "/es/iul",
  "/iul-florida",
  "/es/iul-florida",
  "/iul-jubilacion",
  "/annuities-florida",
  "/es/anualidades-florida",
  "/annuities",
  "/es/anualidades",
  "/dental-vision-florida",
  "/es/dental-vision-florida",
  "/blog",
  "/es/blog",
  "/faq",
  "/es/preguntas-frecuentes",
  "/about-andres-bozo",
  "/es/sobre-andres-bozo",
  "/about-us",
  "/es/nosotros",
  "/contact",
  "/es/contacto",
  "/terms",
  "/es/terminos",
  "/privacy",
  "/es/privacidad",
  "/terminos",
  "/privacidad",
  "/city-guides",
  "/es/guias-ciudades",
  "/final-expense-miami",
  "/burial-insurance-tampa",
  "/es/seguro-gastos-finales-tampa",
  "/es/seguro-gastos-finales-florida",
  "/iul-retirement-tampa",
  "/es/iul-jubilacion-tampa",
  "/orlando-spanish-insurance",
  "/spanish-insurance-orlando",
  "/locations/gainesville-fl",
  "/es/locations/gainesville-fl",
  "/es/localidades/gainesville-fl",
  "/gainesville-fl-insurance",
  "/es/seguros-gainesville-fl",
  "/blog-generator",
  "/es/generador-blog"
]);

export function isKnownRoute(requestPath: string): boolean {
  const cleanPath = requestPath.endsWith("/") && requestPath.length > 1 ? requestPath.slice(0, -1) : requestPath;

  if (KNOWN_STATIC_ROUTES.has(cleanPath)) {
    return true;
  }

  // Dynamic Blog Posts (/blog/:slug or /es/blog/:slug)
  if (cleanPath.startsWith("/blog/")) {
    const slug = cleanPath.replace("/blog/", "");
    return BLOG_POSTS.some(p => p.slug.en === slug || p.slug.es === slug);
  }
  if (cleanPath.startsWith("/es/blog/")) {
    const slug = cleanPath.replace("/es/blog/", "");
    return BLOG_POSTS.some(p => p.slug.en === slug || p.slug.es === slug);
  }

  // Dynamic City Guides (/cities/:slug or /es/ciudades/:slug)
  if (cleanPath.startsWith("/cities/")) {
    const citySlug = cleanPath.replace("/cities/", "");
    return FLORIDA_CITIES.some(c => c.slug === citySlug);
  }
  if (cleanPath.startsWith("/es/ciudades/")) {
    const citySlug = cleanPath.replace("/es/ciudades/", "");
    return FLORIDA_CITIES.some(c => c.slug === citySlug);
  }

  return false;
}

// Helper to sanitize HTML tags if needed
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getSeoMetadata(requestPath: string): SeoMetaData {
  const cleanPath = requestPath.endsWith("/") && requestPath.length > 1 ? requestPath.slice(0, -1) : requestPath;
  const isEs = cleanPath.startsWith("/es") || 
               cleanPath === "/spanish-insurance-orlando" || 
               cleanPath === "/terminos" || 
               cleanPath === "/privacidad";
  const htmlLang = isEs ? "es-US" : "en-US";

  // Check if the requested route is known or an explicit 404
  const isKnown = isKnownRoute(cleanPath);
  const isExplicit404 = cleanPath === "/404" || cleanPath === "/es/404";

  if (!isKnown || isExplicit404) {
    return {
      title: isEs ? "404 - Página no encontrada | AHB Insurance Solutions" : "404 - Page Not Found | AHB Insurance Solutions",
      description: isEs
        ? "La página solicitada no existe o ha sido movida. Regrese a la página principal de AHB Insurance Solutions para explorar opciones de Medicare, Gastos Finales e IUL en Florida."
        : "The page you requested could not be found on AHB Insurance Solutions. Return to our homepage to explore Medicare, Final Expense, and IUL options in Florida.",
      htmlLang,
      canonicalUrl: `${baseUrl}/404`,
      enUrl: `${baseUrl}/404`,
      esUrl: `${baseUrl}/404`,
      ogType: "website",
      is404: true,
      robots: "noindex, nofollow",
      bodyOutline: isEs ? `
        <header>
          <h1>Error 404: Página no encontrada</h1>
          <p>Lo sentimos, el enlace que intentó abrir no existe o ha sido reubicado.</p>
        </header>
        <section>
          <h2>Enlaces Principales de Navegación</h2>
          <ul>
            <li><a href="/es">Inicio: Seguros en Florida</a></li>
            <li><a href="/es/seguro-medicare-florida">Planes Suplementarios de Medicare (Medigap)</a></li>
            <li><a href="/es/gastos-finales">Seguro de Gastos Finales y Funeral</a></li>
            <li><a href="/es/iul-jubilacion">Vida Universal Indexada (IUL)</a></li>
            <li><a href="/es/contacto">Contacto y Cotización Gratuita</a></li>
          </ul>
        </section>
      ` : `
        <header>
          <h1>404: Page Not Found</h1>
          <p>Sorry, the page you requested could not be found or has been moved.</p>
        </header>
        <section>
          <h2>Helpful Resources & Navigation</h2>
          <ul>
            <li><a href="/">Home: Florida Insurance Solutions</a></li>
            <li><a href="/medicare-florida">Medicare Supplement Plans (Medigap)</a></li>
            <li><a href="/final-expense">Final Expense & Burial Life Insurance</a></li>
            <li><a href="/iul-retirement">Indexed Universal Life (IUL) for Retirement</a></li>
            <li><a href="/contact">Get a Free Insurance Consultation</a></li>
          </ul>
        </section>
      `
    };
  }

  // Default Fallbacks (Home English)
  let title = "Medicare, Final Expense & IUL in Florida | AHB Solutions";
  let description = "Expert FL insurance guidance: Medicare Supplement, Final Expense & IUL. Secure your family's future today. Licensed Broker NPN: 21228432. Get your free quote!";

  // Complete Hreflang Canonical Route Pairs to prevent 308 redirects and trailing slashes
  const ROUTE_PAIRS: Record<string, { en: string; es: string }> = {
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
    "/medicare-supplement-florida": { en: "/medicare-florida", es: "/es/seguro-medicare-florida" },
    "/es/suplemento-medicare-florida": { en: "/medicare-florida", es: "/es/seguro-medicare-florida" },
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
    "/blog/medicare-open-enrollment-florida-2026": {
      en: "/blog/medicare-open-enrollment-florida-2026",
      es: "/es/blog/medicare-inscripcion-abierta-florida-2026"
    },
    "/es/blog/medicare-inscripcion-abierta-florida-2026": {
      en: "/blog/medicare-open-enrollment-florida-2026",
      es: "/es/blog/medicare-inscripcion-abierta-florida-2026"
    },
    "/blog/final-expense-burial-costs-florida": {
      en: "/blog/final-expense-burial-costs-florida",
      es: "/es/blog/costos-funerales-gastos-finales-florida"
    },
    "/blog/burial-insurance-funeral-costs-florida": {
      en: "/blog/burial-insurance-funeral-costs-florida",
      es: "/es/blog/costos-funerales-gastos-finales-florida"
    },
    "/es/blog/costos-funerales-gastos-finales-florida": {
      en: "/blog/final-expense-burial-costs-florida",
      es: "/es/blog/costos-funerales-gastos-finales-florida"
    },
    "/blog/iul-vs-401k-tax-free-retirement": {
      en: "/blog/iul-vs-401k-tax-free-retirement",
      es: "/es/blog/iul-vs-401k-jubilacion-libre-de-impuestos"
    },
    "/es/blog/iul-vs-401k-jubilacion-libre-de-impuestos": {
      en: "/blog/iul-vs-401k-tax-free-retirement",
      es: "/es/blog/iul-vs-401k-jubilacion-libre-de-impuestos"
    }
  };

  let enUrl: string;
  let esUrl: string;

  if (ROUTE_PAIRS[cleanPath]) {
    enUrl = `${baseUrl}${ROUTE_PAIRS[cleanPath].en === "/" ? "/" : ROUTE_PAIRS[cleanPath].en}`;
    esUrl = `${baseUrl}${ROUTE_PAIRS[cleanPath].es}`;
  } else if (cleanPath.startsWith("/es")) {
    esUrl = `${baseUrl}${cleanPath}`;
    const enSub = cleanPath.replace(/^\/es/, "");
    enUrl = `${baseUrl}${enSub === "" ? "/" : enSub}`;
  } else {
    enUrl = `${baseUrl}${cleanPath === "" ? "/" : cleanPath}`;
    const esSub = cleanPath === "/" ? "" : cleanPath;
    esUrl = `${baseUrl}/es${esSub}`;
  }

  const canonicalUrl = ROUTE_PAIRS[cleanPath] 
    ? (isEs ? esUrl : enUrl) 
    : `${baseUrl}${cleanPath === "" || cleanPath === "/" ? "/" : cleanPath}`;

  let ogType = "website";
  let bodyOutline = "";

  // 1. Home English / Spanish
  if (cleanPath === "" || cleanPath === "/" || cleanPath === "/es") {
    if (isEs) {
      title = "Medicare, Gastos Finales e IUL en Florida | AHB Solutions";
      description = "Asesoría experta en Florida: Suplementos de Medicare, Gastos Finales y seguro IUL. Andrés Bozo (NPN 21228432) compara las mejores opciones. ¡Cotice gratis!";
      bodyOutline = `
        <header>
          <h1>Medicare, Gastos Finales y Seguro de Vida Universal Indexada (IUL) en Florida</h1>
          <p>Bienvenido a AHB Insurance Solutions, su agencia independiente de corretaje de seguros en Florida. Bajo el liderazgo del corredor licenciado Andrés Bozo (NPN: 21228432), nos dedicamos a proteger el patrimonio familiar, la salud y la tranquilidad de los adultos mayores y familias en todo el estado de Florida. Comparamos las opciones disponibles según sus necesidades, elegibilidad, presupuesto y objetivos de cobertura entre aseguradoras de sólida trayectoria y debidamente licenciadas por el estado de Florida (Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters y Corebridge), con asesoría bilingüe y sin cargos por servicio de corretaje.</p>
        </header>
        <section>
          <h2>Nuestras Soluciones de Seguros Especializadas en Florida</h2>
          <article>
            <h3>1. Planes Suplementarios de Medicare (Medigap) en Florida</h3>
            <p>El Medicare Original (Partes A y B) cubre hospitalización y servicios médicos esenciales, pero deja vacíos de costos significativos como el deducible de hospital de la Parte A y el coseguro del 20% sin límite de la Parte B. Un plan Suplementario de Medicare (Medigap), como el Plan G o el Plan N, cubre estos gastos de su bolsillo. Un plan de Suplemento de Medicare (Medigap) en Florida generalmente le permite consultar a cualquier médico, especialista o centro de salud en Florida y a nivel nacional que acepte la asignación de Medicare, sin restricciones de redes de proveedores ni requisitos de referidos de especialistas, sujeto a las normas de Medicare y Medigap.</p>
          </article>
          <article>
            <h3>2. Seguro de Gastos Finales y Entierro para Adultos Mayores</h3>
            <p>El seguro de gastos finales ofrece protección de vida entera permanente, comúnmente de $5,000 a $35,000, diseñada para ayudar a las familias a costear servicios funerarios, cremación y gastos médicos finales sin endeudamiento inesperado. En pólizas estándar, las primas se mantienen niveladas y generalmente no aumentan con la edad, sujeto a los términos del contrato. Muchas pólizas de emisión simplificada no requieren examen médico tradicional, aunque los requisitos de suscripción y elegibilidad varían por compañía aseguradora y solicitante. Los beneficios por fallecimiento se pagan a los beneficiarios designados según las estipulaciones de la póliza.</p>
          </article>
          <article>
            <h3>3. Seguro de Vida Universal Indexado (IUL) y Estrategias con Ventajas Fiscales</h3>
            <p>La Vida Universal Indexada (IUL) combina protección permanente de seguro de vida con un componente de valor en efectivo. El componente de acreditación indexada cuenta con un piso contractual del 0%, lo que significa que a la estrategia de índice seleccionada no se le acredita un rendimiento negativo ante caídas del mercado. Sin embargo, los costos del seguro y cargos contractuales afectan el valor en efectivo total. Bajo el Código IRS 7702, los préstamos de póliza pueden brindar acceso a capital con tratamiento fiscal potencialmente favorable si la póliza se estructura adecuadamente, no es un MEC y se mantiene en vigor (consulte a un profesional tributario calificado).</p>
          </article>
          <article>
            <h3>4. Anualidades Fijas y Pólizas Dentales, de Visión y Audición</h3>
            <p>Proteja sus ahorros de jubilación con anualidades fijas e indexadas que ofrecen preservación de capital frente a caídas del mercado, crecimiento con impuestos diferidos mientras los fondos permanezcan en la anualidad y opciones de ingresos de por vida respaldadas por la solvencia financiera de aseguradoras autorizadas, además de seguros dentales, de visión y audición.</p>
          </article>
        </section>
        <section>
          <h2>¿Por Qué Elegir a AHB Insurance Solutions?</h2>
          <ul>
            <li><strong>Enfoque Independiente y Ético:</strong> Como corredores independientes, trabajamos para usted y no para una aseguradora en particular. Evaluamos aseguradoras de primer nivel para encontrar la alternativa más conveniente según su edad, presupuesto y salud.</li>
            <li><strong>Cobertura en Todo el Estado de Florida:</strong> Brindamos servicio a clientes en Miami-Dade, Broward, Palm Beach, Orlando (Orange), Tampa (Hillsborough), Jacksonville (Duval), San Petersburgo, Fort Myers y todas las zonas de Florida.</li>
            <li><strong>Atención Personalizada en su Idioma:</strong> Explicaciones claras, honestas y sin tecnicismos difíciles, con el compromiso de acompañarle año tras año para evaluar que su cobertura se mantenga alineada con sus metas y presupuesto.</li>
          </ul>
        </section>
        <section>
          <h2>Preguntas Frecuentes sobre Seguros en Florida</h2>
          <h3>¿Cuándo es el mejor momento para contratar un seguro suplementario Medigap en Florida?</h3>
          <p>El momento más favorable es durante su Período de Inscripción Abierta de Medigap de 6 meses, que inicia el primer día del mes en que cumple 65 años y se inscribe en la Parte B de Medicare. Durante esta ventana tiene Derechos de Emisión Garantizada, lo que impide que las aseguradoras rechacen su cobertura o aumenten su precio por antecedentes de salud.</p>
          <h3>¿Puedo calificar para seguro de entierro si tengo enfermedades previas?</h3>
          <p>Sí. Muchas pólizas de emisión simplificada no requieren un examen médico tradicional, aunque los requisitos de suscripción varían según la compañía aseguradora y el solicitante. Incluso adultos mayores con historial de condiciones preexistentes pueden calificar para cobertura de nivel inmediato o con beneficios graduados.</p>
          <h3>¿Cómo protege una póliza IUL mi dinero de las crisis bursátiles?</h3>
          <p>Las pólizas IUL poseen una cláusula de piso del 0%. En los períodos en que el índice bursátil de referencia registra pérdidas, su rendimiento indexado no baja de cero (el valor en efectivo no está invertido directamente en la bolsa y está sujeto a los costos administrativos de la póliza y a la solidez financiera de la aseguradora emisora).</p>
        </section>
        <section>
          <h2>Servicios en Español y Enlaces Principales</h2>
          <nav aria-label="Enlaces en Español">
            <ul>
              <li><a href="/es">Inicio: Seguros en Florida</a></li>
              <li><a href="/es/seguro-medicare-florida">Planes de Suplemento de Medicare (Medigap)</a></li>
              <li><a href="/es/gastos-finales">Seguro de Gastos Finales y Funeral</a></li>
              <li><a href="/es/iul-jubilacion">Vida Universal Indexada (IUL)</a></li>
              <li><a href="/es/anualidades-florida">Anualidades y Retiro Seguro en Florida</a></li>
              <li><a href="/es/dental-vision-florida">Seguro Dental, Visión y Audición Senior</a></li>
              <li><a href="/es/preguntas-frecuentes">Preguntas Frecuentes sobre Seguros</a></li>
              <li><a href="/es/sobre-andres-bozo">Conozca al Broker Andrés Bozo</a></li>
              <li><a href="/es/contacto">Cotización Gratuita sin Compromiso</a></li>
            </ul>
          </nav>
          <p class="mt-4"><strong>Looking for guidance in English?</strong> Visit our main <a href="/">English Florida Insurance Portal</a> or read our guides on <a href="/medicare-florida">Medicare Supplement Plans</a>, <a href="/final-expense">Final Expense Insurance</a>, and <a href="/iul-retirement">IUL Retirement Plans</a>.</p>
          <p>Comuníquese hoy mismo con el broker licenciado Andrés Bozo al <a href="tel:+13522258389">+1 (352) 225-8389</a> para recibir su comparativa y cotización sin ningún compromiso.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>Medicare, Final Expense & Indexed Universal Life (IUL) Insurance in Florida</h1>
          <p>Welcome to AHB Insurance Solutions. We are an independent, client-first insurance brokerage proudly serving seniors, families, and individuals throughout Florida. Guided by licensed broker Andres Bozo (NPN: 21228432), we work with well-established, state-licensed national insurance carriers (including Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters, and Corebridge). We provide independent guidance, personalized rate comparisons, and lifelong local support with zero broker fees.</p>
        </header>
        <section>
          <h2>Our Specialized Florida Insurance Solutions</h2>
          <article>
            <h3>1. Florida Medicare Supplement Plans (Medigap)</h3>
            <p>Original Medicare (Parts A and B) provides essential healthcare protection but leaves substantial out-of-pocket gaps, such as the Part A hospital deductible and the uncapped 20% Part B outpatient coinsurance. A Medicare Supplement (Medigap) policy, such as Plan G or Plan N, pays these remaining balances on your behalf. A Florida Medicare Supplement (Medigap) plan generally allows you to see any provider nationwide that accepts Medicare assignment, without network constraints or specialist referral requirements, subject to Medicare and Medigap rules.</p>
          </article>
          <article>
            <h3>2. Final Expense & Burial Life Insurance for Florida Seniors</h3>
            <p>Final expense life insurance policies offer permanent whole life protection, commonly from $5,000 to $35,000, designed to help families cover burial, cremation, and final medical expenses without unexpected debt. Standard policies feature level premiums that do not increase with age, subject to contract terms. Many simplified-issue policies do not require a traditional medical exam, although underwriting and eligibility requirements vary by carrier and applicant. Death benefits are paid to designated beneficiaries according to policy terms.</p>
          </article>
          <article>
            <h3>3. Indexed Universal Life (IUL) for Tax-Advantaged Wealth & Retirement Planning</h3>
            <p>Indexed Universal Life (IUL) insurance combines permanent death benefit protection with an index-linked cash value component. The index-crediting component of an IUL may have a contractual 0% floor, meaning the selected index strategy is not credited with a negative index return. However, policy charges, cost of insurance, loans, withdrawals and other contract provisions can affect overall cash value. Under Internal Revenue Code Section 7702, policy loans may provide access to cash value with potentially favorable federal tax treatment when the policy is structured properly, is not a Modified Endowment Contract (MEC), remains in force, and applicable tax requirements are satisfied (consult a qualified tax professional).</p>
          </article>
          <article>
            <h3>4. Fixed Guaranteed Annuities & Senior Dental, Vision and Hearing</h3>
            <p>Preserve retirement savings with fixed and fixed indexed annuities offering contractual principal protection against index downturns, tax-deferred growth while funds remain in the contract, and lifetime income options backed by the claims-paying ability of issuing insurers, alongside senior dental, vision, and hearing plans.</p>
          </article>
        </section>
        <section>
          <h2>Why Choose AHB Insurance Solutions?</h2>
          <ul>
            <li><strong>True Independent Representation:</strong> Unlike captive agents restricted to one brand, we compare available options based on your needs, eligibility, budget and coverage goals across well-established, state-licensed national insurance carriers.</li>
            <li><strong>Statewide Florida Service:</strong> Assisting seniors and working families in Miami-Dade, Broward, Palm Beach, Orange (Orlando), Hillsborough (Tampa), Duval (Jacksonville), Pinellas, Lee, and across all 67 Florida counties.</li>
            <li><strong>Bilingual, Client-Focused Guidance:</strong> Transparent, ethical, and pressure-free advice from a Florida-licensed insurance broker fluent in English and Spanish.</li>
          </ul>
        </section>
        <section>
          <h2>Frequently Asked Questions</h2>
          <h3>What is the best time to purchase a Medigap plan in Florida?</h3>
          <p>The premier time is during your 6-month Medigap Open Enrollment window, which starts the first day of the month you turn 65 and are enrolled in Medicare Part B. During this period, you have federal Guaranteed Issue rights, meaning insurance companies cannot deny you coverage or increase your premiums based on pre-existing medical conditions.</p>
          <h3>Can seniors with health challenges qualify for burial insurance?</h3>
          <p>Yes. Many simplified-issue policies do not require a traditional medical exam, although underwriting requirements vary by carrier and applicant. Guaranteed issue options are also available for applicants managing serious chronic health conditions.</p>
          <h3>How does the 0% index crediting floor work in an IUL?</h3>
          <p>The index-crediting component of an IUL may have a contractual 0% floor, meaning the selected index strategy is not credited with a negative index return when markets drop. However, policy charges, cost of insurance, loans, withdrawals and other contract provisions can affect overall cash value.</p>
        </section>
        <section>
          <h2>Explore Coverage Options & Bilingual Assistance</h2>
          <nav aria-label="Insurance Solutions">
            <ul>
              <li><a href="/medicare-florida">Medicare Supplement Plans (Medigap)</a></li>
              <li><a href="/final-expense">Final Expense & Burial Life Insurance</a></li>
              <li><a href="/iul-retirement">Indexed Universal Life (IUL) for Retirement</a></li>
              <li><a href="/annuities-florida">Florida Fixed Indexed Annuities</a></li>
              <li><a href="/dental-vision-florida">Senior Dental, Vision & Hearing Coverage</a></li>
              <li><a href="/faq">Frequently Asked Questions</a></li>
              <li><a href="/about-andres-bozo">About Broker Andres Bozo</a></li>
              <li><a href="/contact">Free Insurance Quote</a></li>
            </ul>
          </nav>
          <p class="mt-4"><strong>¿Prefiere recibir atención especializada en español?</strong> Visite nuestro <a href="/es">Portal de Seguros en Español en Florida</a> o explore nuestras páginas dedicadas a <a href="/es/seguro-medicare-florida">Medicare Suplementario</a>, <a href="/es/gastos-finales">Seguro de Gastos Finales</a> e <a href="/es/iul-jubilacion">IUL y Jubilación</a>.</p>
          <p>Speak directly with Florida licensed broker Andres Bozo today at <a href="tel:+13522258389">+1 (352) 225-8389</a> to receive your free, zero-obligation insurance analysis.</p>
        </section>
      `;
    }
  }

  // 2. Medicare Service Page
  else if (
    cleanPath === "/medicare-florida" || 
    cleanPath === "/es/seguro-medicare-florida" ||
    cleanPath === "/medicare" || 
    cleanPath === "/es/medicare" ||
    cleanPath === "/medicare-supplement-florida" ||
    cleanPath === "/es/suplemento-medicare-florida"
  ) {
    title = isEs 
      ? "Medicare Suplementario (Medigap) Florida | AHB Insurance" 
      : "Medicare Supplement (Medigap) Florida | AHB Insurance";
    description = isEs 
      ? "Guía de Medicare en Florida 2026. Compare Medigap Plan G y N, Advantage y Parte D. Asesoría independiente sin costo con el broker Andrés Bozo (NPN 21228432)." 
      : "Compare Florida Medicare Supplement Plan G & N rates, Advantage, and Part D. Expert independent broker guidance from Andres Bozo (NPN 21228432). Free quote!";
    
    if (isEs) {
      bodyOutline = `
        <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <span>Medicare Suplementario Medigap</span></p></nav>
        <header>
          <h1>Planes de Medicare Suplementario (Medigap) en Florida 2026–2027</h1>
          <p>Si está explorando opciones de Medicare en Florida, probablemente sepa que Medicare Original (Partes A y B) deja vacíos de cobertura significativos, incluyendo un coseguro del 20% sin límite. Como corredor independiente licenciado en Florida (Andrés Bozo, NPN: 21228432), le ayudo a comparar planes Medigap Plan G, Plan N y Plan F de más de 80 aseguradoras líderes para proteger los ahorros de su jubilación. Obtenga asesoría gratuita y personalizada hoy.</p>
        </header>

        <section>
          <h2>La Realidad de Medicare Original (Partes A y B) en Florida</h2>
          <p>Muchos residentes de Florida asumen que inscribirse en Medicare Original al cumplir 65 años cubrirá la totalidad de sus gastos médicos. Sin embargo, Medicare Original deja vacíos financieros significativos que pueden poner en riesgo los ahorros acumulados durante toda una vida de trabajo:</p>
          <ul>
            <li><strong>Sin Límite Anual de Gastos (No MOOP):</strong> En Medicare Original no existe un límite máximo de desembolso de bolsillo. Usted es responsable del 20% de todos los servicios ambulatorios, cirugías, tratamientos de quimioterapia y diálisis, sin tope alguno en dólares.</li>
            <li><strong>Deducibles de Hospital Elevados:</strong> En 2026, el deducible de hospitalización de la Parte A supera los $1,600 por cada período de beneficio de 60 días, no por año calendario, pudiendo repetirse varias veces en un mismo año.</li>
          </ul>
        </section>

        <section>
          <h2>Paso a Paso para Inscribirse en Medicare en Florida al Cumplir 65 Años</h2>
          <p>Navegar la transición hacia Medicare requiere sincronización precisa. Un descuido en los plazos legales de la Administración del Seguro Social (SSA) puede generar penalidades de por vida o la pérdida de sus derechos de emisión garantizada en seguros suplementarios:</p>
          <ol>
            <li><strong>Paso 1: Identificar su Período Inicial de Inscripción (IEP):</strong> Su IEP dura 7 meses: inicia 3 meses antes de cumplir 65 años, incluye el mes de su cumpleaños y finaliza 3 meses después. Es la ventana para solicitar las Partes A y B en SSA.gov.</li>
            <li><strong>Paso 2: Activar la Ventana Protegida de Medigap (MOEP):</strong> Al activar la Parte B, arranca su ventana de 6 meses de Medigap. Durante este período, las aseguradoras no pueden evaluar su historial médico ni negar cobertura por condiciones preexistentes.</li>
            <li><strong>Paso 3: Seleccionar un Plan de Medicamentos Recetados (Parte D):</strong> Aun si no consume medicamentos hoy, debe contratar un plan Parte D básico. De lo contrario, se acumulará una penalidad permanente del 1% mensual por cada mes sin cobertura acreditable.</li>
          </ol>
        </section>

        <section>
          <h2>Análisis Detallado de Planes Medigap en Florida: Plan G vs Plan N vs Plan F</h2>
          <article>
            <h3>Medigap Plan G: La Opción Más Completa</h3>
            <p>El Plan G es actualmente la póliza Medigap más popular y recomendada para nuevos beneficiarios de Medicare. Cubre todos los costos de desembolso de bolsillo de Medicare Original, excepto el deducible anual de la Parte B (~$257 en 2026). Cubre el 100% del deducible de la Parte A, el coseguro del 20% y el 100% de los Cargos en Exceso de la Parte B.</p>
          </article>
          <article>
            <h3>Medigap Plan N: El Equilibrio entre Costo y Cobertura</h3>
            <p>El Plan N ofrece primas mensuales significativamente más bajas que el Plan G a cambio de copagos estructurados: hasta $20 por consulta médica y hasta $50 en visitas a salas de urgencias que no resulten en admisión hospitalaria. El Plan N no cubre los cargos en exceso de la Parte B, pero en Florida la gran mayoría de los médicos aceptan la tarifa asignada por Medicare.</p>
          </article>
          <article>
            <h3>Medigap Plan F: Disponibilidad Limitada</h3>
            <p>El Plan F ya no está disponible para personas que se inscribieron en Medicare por primera vez el 1 de enero de 2020 o después. Si usted ya era elegible antes de esa fecha, aún puede contratarlo, aunque usualmente el Plan G ofrece una mejor relación costo-beneficio debido a que las primas del Plan F tienden a aumentar más rápidamente.</p>
          </article>
        </section>

        <section>
          <h2>Comparativa Exhaustiva: Medigap Plan G vs Plan N vs Medicare Advantage (Parte C)</h2>
          <table>
            <thead>
              <tr>
                <th>Beneficio / Característica</th>
                <th>Medigap Plan G</th>
                <th>Medigap Plan N</th>
                <th>Medicare Advantage (Parte C)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Red de Médicos y Hospitales</td>
                <td>Cualquier proveedor nacional que acepte Medicare</td>
                <td>Cualquier proveedor nacional que acepte Medicare</td>
                <td>Red restringida del Plan (HMO o PPO local)</td>
              </tr>
              <tr>
                <td>Referidos para Especialistas</td>
                <td>Nunca requeridos</td>
                <td>Nunca requeridos</td>
                <td>Frecuente en redes HMO</td>
              </tr>
              <tr>
                <td>Deducible de Hospital Parte A</td>
                <td>$0 (100% Cubierto)</td>
                <td>$0 (100% Cubierto)</td>
                <td>Copagos diarios ($300-$400/día días 1-5)</td>
              </tr>
              <tr>
                <td>Copagos por Visitas Médicas</td>
                <td>$0 (Tras deducible de Parte B)</td>
                <td>Hasta $20 por consulta</td>
                <td>Copagos de $0 a $45+ por visita</td>
              </tr>
              <tr>
                <td>Cargos en Exceso Parte B</td>
                <td>100% Cubierto</td>
                <td>No Cubierto (hasta 15% extra)</td>
                <td>N/A (Sujeto a tarifas de red)</td>
              </tr>
              <tr>
                <td>Predecibilidad Financiera</td>
                <td>Máxima (Sin facturas sorpresa)</td>
                <td>Muy Alta (Copagos menores)</td>
                <td>Variable según uso médico (MOOP hasta $8,850+)</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Rangos de Primas Mensuales y Factores de Tarificación en Florida 2026</h2>
          <p>“Rangos de primas únicamente ilustrativos. Las primas reales varían por código postal, edad, aseguradora, método de tarificación y elegibilidad. Solicite una comparación personalizada.” (Actualizado: Septiembre 2026).</p>
          <p>Como ejemplo de muestra referencial para una persona de 65 años no fumadora en códigos postales seleccionados de Florida Central antes de descuentos de hogar:</p>
          <ul>
            <li><strong>Medigap Plan G:</strong> Suele oscilar entre $140 y $185 mensuales.</li>
            <li><strong>Medigap Plan N:</strong> Suele oscilar entre $100 y $145 mensuales (ahorro ilustrativo de ~$30-50/mes frente al Plan G).</li>
          </ul>
          <p>Las primas de Medicare Suplementario no constituyen una tarifa general ni uniforme para el estado de Florida. El costo real depende de su código postal (ZIP), edad, método de tarificación actuarial (Attained-Age vs. Issue-Age), compañía aseguradora (carrier), descuentos por convivencia en el hogar (household discounts), evaluación médica (underwriting) y área geográfica.</p>
        </section>

        <section>
          <h2>Derechos de Prueba (Trial Rights) y Cambio de Plan en Florida</h2>
          <p>Muchos residentes de Florida prueban un plan Medicare Advantage y luego descubren retrasos en autorizaciones previas o denegaciones de especialistas. La ley federal otorga "Derechos de Prueba" especiales:</p>
          <ul>
            <li><strong>Prueba por primera vez (Primeros 12 meses):</strong> Si se inscribe en Medicare Advantage al cumplir 65 años y decide cambiarse dentro de los primeros 12 meses, tiene derecho garantizado de volver a Medigap sin preguntas médicas ni evaluación de salud.</li>
            <li><strong>Pérdida de cobertura de red o mudanza:</strong> Si su plan Advantage abandona su condado en Florida o usted se muda fuera del área de servicio, califica para un Período Especial para comprar Medigap.</li>
          </ul>
        </section>

        <section>
          <h2>Fechas Clave de Inscripción de Medicare en Florida</h2>
          <ul>
            <li><strong>IEP (Período Inicial de Inscripción):</strong> Ventana de 7 meses (3 meses antes del mes de cumpleaños 65, el mes del cumpleaños y 3 meses después). Momento para activar Partes A y B.</li>
            <li><strong>MOEP (Ventana Abierta de Medigap):</strong> 6 meses continuos desde la fecha de inicio de su Parte B. Inmunidad total contra cuestionarios médicos de salud. Emisión 100% garantizada por ley federal.</li>
            <li><strong>AEP (Inscripción Anual - Octubre 15 a Diciembre 7):</strong> Ventana anual para modificar planes de medicamentos Parte D o cambiar coberturas Advantage para el siguiente año calendario.</li>
          </ul>
        </section>

        <section>
          <h2>Preguntas Frecuentes sobre Medicare Suplementario en Florida</h2>
          <dl>
            <dt><strong>¿Cuál es la diferencia entre Medicare Suplementario (Medigap) y Medicare Advantage en Florida?</strong></dt>
            <dd>Las pólizas Medigap ayudan a pagar ciertos costos de desembolso cubiertos por Medicare, según el plan estandarizado que seleccione (como el Plan G o el Plan N). Medigap generalmente le permite atenderse con cualquier proveedor a nivel nacional que acepte la asignación de Medicare, sujeto a las reglas de Medicare y Medigap. Por el contrario, los planes Medicare Advantage (Parte C), ofrecidos por aseguradoras privadas, cuentan con estructuras de redes específicas (como HMO o PPO), términos de costos compartidos y reglas de autorización previa que varían según el plan y el condado.</dd>
            
            <dt><strong>¿Cuándo es el mejor momento para inscribirse en un plan Medigap en Florida?</strong></dt>
            <dd>El período ideal es su Período de Inscripción Abierta de Medigap (MOEP), el cual dura 6 meses e inicia el primer día del mes en que cumple 65 años y se inscribe en la Parte B de Medicare. Durante este lapso tiene 'Derecho de Emisión Garantizada', lo que significa que las aseguradoras están obligadas por ley a aceptarlo sin evaluaciones de salud, exámenes médicos ni recargos por condiciones preexistentes.</dd>
            
            <dt><strong>¿Puedo cambiarme de Medicare Advantage a un plan Medigap en Florida?</strong></dt>
            <dd>Sí, pero en la mayoría de los casos deberá pasar por un proceso de suscripción médica (underwriting), respondiendo cuestionarios de salud, a menos que califique para un Período de Inscripción Especial o derechos de prueba ('trial rights') dentro de sus primeros 12 meses en Medicare Advantage.</dd>
            
            <dt><strong>¿Qué son los Cargos en Exceso de la Parte B y cómo me afectan en Florida?</strong></dt>
            <dd>Si un médico o especialista no acepta la asignación de Medicare, la ley le permite cobrar hasta un 15% adicional sobre la tarifa aprobada por Medicare. El Medigap Plan G cubre el 100% de estos cargos en exceso, mientras que el Plan N no los cubre, aunque muchos médicos en Florida aceptan la asignación estándar.</dd>
            
            <dt><strong>¿Cuánto cuestan las primas de Medigap en Florida en 2026?</strong></dt>
            <dd>“Rangos de primas únicamente ilustrativos. Las primas reales varían por código postal, edad, aseguradora, método de tarificación y elegibilidad. Solicite una comparación personalizada.” (Actualizado: Septiembre 2026). Como ejemplo de muestra referencial para una persona de 65 años no fumadora en códigos postales seleccionados de Florida Central antes de descuentos de hogar, un Plan G suele oscilar entre $140 y $185 mensuales y un Plan N entre $100 y $145 mensuales. No obstante, las primas reales dependen de su código postal (ZIP), edad, aseguradora (carrier), método de tarificación actuarial (Attained-Age vs. Issue-Age), descuentos de convivencia en el hogar, evaluación médica (underwriting) y área geográfica.</dd>
          </dl>
        </section>

        <section>
          <h2>Asesoría Licenciada y Aviso Legal de Cumplimiento CMS</h2>
          <p>Comuníquese hoy mismo con el corredor independiente licenciado Andrés Bozo (NPN: 21228432) al <a href="tel:+13522258389">+1 (352) 225-8389</a> para recibir una comparativa imparcial y personalizada sin costo.</p>
          <p><small>Aviso Legal de Cumplimiento CMS Medicare: No ofrecemos todos los planes disponibles en su área. Actualmente representamos a múltiples organizaciones que ofrecen productos en su zona. Comuníquese con Medicare.gov, al 1-800-MEDICARE o con su Programa Estatal de Asistencia sobre Seguros de Salud (SHIP) local para obtener información sobre todas sus opciones. AHB Insurance Solutions y el corredor Andrés H. Bozo son independientes y no están afiliados ni respaldados por el gobierno de los EE. UU. o el programa federal de Medicare.</small></p>
        </section>
      `;
    } else {
      bodyOutline = `
        <nav aria-label="Breadcrumb"><p><a href="/">Florida Insurance Portal</a> &gt; <span>Medicare Supplement (Medigap) Plans</span></p></nav>
        <header>
          <h1>Medicare Supplement (Medigap) Plans in Florida 2026–2027</h1>
          <p>If you are navigating Medicare in Florida, you likely know that Original Medicare (Part A & Part B) leaves significant gaps in coverage, including an uncapped 20% coinsurance liability for medical services. As an independent, Florida-licensed insurance broker, Andres Bozo (NPN: 21228432) helps Florida seniors compare Medigap Plan G, Plan N, and Plan F from 80+ top carriers to shield your retirement savings. Get expert, zero-cost broker guidance today.</p>
        </header>

        <section>
          <h2>The Reality of Original Medicare (Parts A & B) in Florida</h2>
          <p>Many Florida seniors assume enrolling in Original Medicare at age 65 provides 100% medical coverage. However, Original Medicare leaves major financial gaps that can expose your retirement savings to unexpected medical liabilities:</p>
          <ul>
            <li><strong>No Annual Maximum Out-of-Pocket (No MOOP):</strong> Original Medicare has no cap on your 20% coinsurance liability for outpatient care, surgeries, chemotherapy, specialty treatments, and imaging.</li>
            <li><strong>High Hospital Deductibles:</strong> In 2026, the Part A inpatient hospital deductible exceeds $1,600 per benefit period, which can occur multiple times in a single calendar year.</li>
          </ul>
        </section>

        <section>
          <h2>Step-by-Step Medicare Enrollment Roadmap in Florida</h2>
          <p>Navigating Medicare requires precise timing. Missing federal Social Security Administration (SSA) deadlines can result in lifelong premium penalties or the loss of guaranteed-issue rights for Medigap supplements:</p>
          <ol>
            <li><strong>Step 1: Identify Your Initial Enrollment Period (IEP):</strong> Your IEP spans 7 months: starts 3 months before your 65th birthday month, includes your birthday month, and ends 3 months after. Use SSA.gov to apply for Parts A and B.</li>
            <li><strong>Step 2: Activate Your Medigap Open Enrollment Window (MOEP):</strong> Activating Part B triggers your 6-month Medigap window. During this window, insurance carriers cannot review medical history or deny coverage for pre-existing conditions.</li>
            <li><strong>Step 3: Select a Part D Prescription Drug Plan:</strong> Even if you take zero prescriptions today, enrolling in a standalone Part D plan prevents a permanent 1% per month Part D late enrollment penalty (LEP) while taking advantage of the federal $2,000 out-of-pocket cap.</li>
          </ol>
        </section>

        <section>
          <h2>Detailed Analysis of Florida Medigap Plans: Plan G vs Plan N vs Plan F</h2>
          <article>
            <h3>Medicare Supplement Plan G: Most Comprehensive Coverage</h3>
            <p>Plan G is currently the most popular Medigap policy for new Medicare beneficiaries. It covers all Original Medicare out-of-pocket costs, excluding only the annual Part B deductible (~$257 in 2026). It covers 100% of the Part A hospital deductible, the 20% Part B coinsurance, skilled nursing facility coinsurance, and 100% of Part B excess charges.</p>
          </article>
          <article>
            <h3>Medicare Supplement Plan N: Balancing Cost and Coverage</h3>
            <p>Plan N offers significantly lower monthly premiums than Plan G in exchange for structured copays: up to $20 for doctor visits and up to $50 for emergency room visits that do not lead to inpatient admission. Plan N does not cover Part B excess charges, but the vast majority of Florida physicians accept Medicare assignment rates.</p>
          </article>
          <article>
            <h3>Medicare Supplement Plan F: Limited Availability</h3>
            <p>Plan F is no longer available to individuals who first enrolled in Medicare on or after January 1, 2020. If you were eligible before that date, you may still purchase it, although Plan G typically offers a better cost-benefit ratio as Plan F premiums tend to increase more rapidly over time.</p>
          </article>
        </section>

        <section>
          <h2>Comprehensive Comparison: Medigap Plan G vs Plan N vs Medicare Advantage (Part C)</h2>
          <table>
            <thead>
              <tr>
                <th>Benefit / Feature</th>
                <th>Medigap Plan G</th>
                <th>Medigap Plan N</th>
                <th>Medicare Advantage (Part C)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Doctor & Hospital Network</td>
                <td>Any provider nationwide accepting Medicare</td>
                <td>Any provider nationwide accepting Medicare</td>
                <td>Plan restricted network (local HMO / PPO)</td>
              </tr>
              <tr>
                <td>Specialist Referrals</td>
                <td>Never required</td>
                <td>Never required</td>
                <td>Frequently required in HMOs</td>
              </tr>
              <tr>
                <td>Part A Hospital Deductible</td>
                <td>$0 (100% Covered)</td>
                <td>$0 (100% Covered)</td>
                <td>Daily copays ($300-$400/day days 1-5)</td>
              </tr>
              <tr>
                <td>Doctor Office Copays</td>
                <td>$0 (After Part B deductible)</td>
                <td>Up to $20 per visit</td>
                <td>$0 to $45+ copays per visit</td>
              </tr>
              <tr>
                <td>Part B Excess Charges</td>
                <td>100% Covered</td>
                <td>Not Covered (Up to 15% extra)</td>
                <td>N/A (Subject to plan network terms)</td>
              </tr>
              <tr>
                <td>Financial Predictability</td>
                <td>Maximum (No surprise bills)</td>
                <td>Very High (Small copays only)</td>
                <td>Variable based on utilization (MOOP up to $8,850+)</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Florida Medigap Plan G & Plan N Pricing Factors 2026</h2>
          <p>“Illustrative premium ranges only. Actual premiums vary by ZIP code, age, carrier, rating method and eligibility. Request a personalized comparison.” (Updated: September 2026).</p>
          <p>As a sample illustrative example for a 65-year-old non-smoker in select Central Florida ZIP codes prior to household discounts:</p>
          <ul>
            <li><strong>Medigap Plan G:</strong> Typically ranges between $140 and $185 per month.</li>
            <li><strong>Medigap Plan N:</strong> Typically ranges between $100 and $145 per month (illustrative savings of ~$30-50/month compared to Plan G).</li>
          </ul>
          <p>Medicare Supplement (Medigap) premiums do not represent a uniform or statewide general rate across Florida. Actual policy costs vary based on: ZIP code, age, rating method (such as Attained-Age vs. Issue-Age), insurance carrier, household discounts, health underwriting, and geographic area.</p>
        </section>

        <section>
          <h2>Medicare Advantage Trial Rights & Switching Protections in Florida</h2>
          <p>Many Florida seniors try Medicare Advantage only to experience prior authorization delays or network exclusions. Federal law provides specific "Trial Rights" to protect you:</p>
          <ul>
            <li><strong>First-time Trial Right (First 12 months):</strong> If you join Medicare Advantage when first eligible at 65, you can drop it within 12 months and switch to Medigap with guaranteed issue rights and zero medical questions.</li>
            <li><strong>Network Changes or Relocation:</strong> If your Advantage plan leaves your Florida county or you relocate out of state, you trigger a Special Enrollment Period to purchase a Medigap plan.</li>
          </ul>
        </section>

        <section>
          <h2>Key Florida Medicare Enrollment Windows</h2>
          <ul>
            <li><strong>IEP (Initial Enrollment Period):</strong> 7-month window spanning 3 months before your 65th birthday month, your birthday month, and 3 months after.</li>
            <li><strong>MOEP (Medigap Open Enrollment Period):</strong> 6-month golden window starting on your Part B effective date with guaranteed acceptance and zero medical underwriting.</li>
            <li><strong>AEP (Annual Enrollment Period - Oct 15 to Dec 7):</strong> Annual period to join, drop, or switch Medicare Advantage and Part D prescription drug plans for the upcoming coverage year.</li>
          </ul>
        </section>

        <section>
          <h2>Frequently Asked Questions About Florida Medicare</h2>
          <dl>
            <dt><strong>What is the difference between Medicare Supplement (Medigap) and Medicare Advantage in Florida?</strong></dt>
            <dd>Medigap policies help pay certain Medicare-covered out-of-pocket costs, depending on the standardized plan you select. Medigap generally allows you to see any provider nationwide who accepts Medicare assignment, subject to Medicare and Medigap rules. Conversely, Medicare Advantage plans (Part C), offered by private insurers, feature specific network structures (such as HMO or PPO), cost-sharing terms, and pre-authorization rules that vary by plan and county.</dd>

            <dt><strong>What is the importance of the Medigap Open Enrollment Period in Florida?</strong></dt>
            <dd>Your 6-month Medigap Open Enrollment Period (MOEP) is an important opportunity to buy a Medigap policy. It begins the month you turn 65 and are enrolled in Medicare Part B. During this window, you have Guaranteed Issue Rights, meaning insurance carriers cannot deny coverage, apply pre-existing condition waiting periods, or charge higher premiums due to your health history.</dd>

            <dt><strong>Can I switch from a Medicare Advantage plan back to Medigap in Florida?</strong></dt>
            <dd>Yes, but outside of specific Trial Rights (such as trying Advantage for the first time for under 12 months), you will generally need to pass medical underwriting questions. As an independent broker, we review your health history to identify carriers most likely to approve your Medigap application.</dd>

            <dt><strong>What are Part B Excess Charges and does Plan G cover them?</strong></dt>
            <dd>Part B excess charges occur when a doctor does not accept Medicare's baseline assignment rate and charges up to an additional 15%. Medigap Plan G covers 100% of Part B excess charges, whereas Plan N does not cover them.</dd>

            <dt><strong>How much does a Medigap Plan G cost in Florida for 2026?</strong></dt>
            <dd>“Illustrative premium ranges only. Actual premiums vary by ZIP code, age, carrier, rating method and eligibility. Request a personalized comparison.” (Updated: September 2026). As a sample illustrative example for a 65-year-old non-smoker in select Central Florida ZIP codes prior to household discounts, monthly premiums typically range between $140 and $185 for Plan G, and $100 to $145 for Plan N. However, actual premiums depend on your specific ZIP code, age, carrier, rating method (such as Attained-Age vs. Issue-Age), household discounts, underwriting, and geographic area.</dd>
          </dl>
        </section>

        <section>
          <h2>Independent Broker Advisory & CMS Compliance Disclaimer</h2>
          <p>Contact Florida-licensed independent insurance broker Andres Bozo (NPN: 21228432) at <a href="tel:+13522258389">+1 (352) 225-8389</a> for an unbiased Medicare review with zero broker fees.</p>
          <p><small>Official CMS Medicare Compliance Disclaimer: We do not offer every plan available in your area. Currently we represent multiple organizations which offer products in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program (SHIP) to get information on all of your options. AHB Insurance Solutions and broker Andres H. Bozo are independent and not connected with or endorsed by the U.S. government or the federal Medicare program.</small></p>
        </section>
      `;
    }
  }

  // 3. Final Expense Service Page
  else if (cleanPath === "/final-expense" || cleanPath === "/es/gastos-finales") {
    title = isEs 
      ? "Seguro de Gastos Finales y Funeral Florida 2026 | AHB" 
      : "Final Expense & Burial Insurance Florida 2026 | AHB";
    description = isEs 
      ? "Proteja a su familia con cobertura de $5,000 a $35,000 en Florida. Tarifas fijas de por vida. Emisión simplificada sin examen médico. ¡Cotice hoy sin costo!" 
      : "Secure $5,000 to $35,000 in Florida burial protection. Locked lifetime rates. Simplified-issue whole life policies without medical exam. Get a free quote!";

    if (isEs) {
      bodyOutline = `
        <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <span>Seguro de Gastos Finales y Funeral</span></p></nav>
        <header>
          <h1>Seguro de Gastos Finales y Funeral en Florida 2026</h1>
          <p>Evite que sus hijos o cónyuge enfrenten deudas repentinas por costos funerarios. Pólizas de vida entera permanentes de $5,000 a $35,000 con primas niveladas sujetas a los términos del contrato. Como corredor de seguros independiente en Florida, Andrés Bozo (NPN: 21228432) compara las tarifas más competitivas entre más de 15 aseguradoras especializadas para proteger a su familia con opciones de emisión simplificada sin examen médico tradicional.</p>
        </header>

        <section>
          <h2>¿Qué es el Seguro de Gastos Finales?</h2>
          <p>El Seguro de Gastos Finales (comúnmente denominado seguro de entierro o seguro funerario) es una póliza de seguro de Vida Entera (Whole Life) permanente. Está específicamente estructurada para cubrir costos de entierro o cremación, servicios funerarios, ataúd, parcela de cementerio, facturas médicas pendientes del hospital y deudas no saldadas tras el fallecimiento.</p>
          <p>A diferencia de los seguros a término que expiran cuando usted cumple 70 u 80 años, el seguro de gastos finales permanece activo durante toda su vida siempre que mantenga sus cuotas al día. Acumula valor en efectivo garantizado y garantiza que su familia disponga de liquidez inmediata en sus momentos más vulnerables.</p>
        </section>

        <section>
          <h2>¿Quién Necesita Cobertura de Gastos Finales en Florida?</h2>
          <ul>
            <li><strong>Adultos Mayores de 50 a 85 años:</strong> Personas que no desean traspasar una factura funeraria de $10,000+ a sus hijos o cónyuge en momentos de duelo.</li>
            <li><strong>Personas que Han Superado Pólizas a Término:</strong> Retirados cuyas pólizas de término expiraron o cuyas cuotas de renovación se volvieron inasequibles al envejecer.</li>
            <li><strong>Personas con Historial Médico Moderado:</strong> Quienes manejan hipertensión, diabetes, sobrepeso o afecciones crónicas y buscan cobertura accesible sin exámenes médicos exhaustivos.</li>
            <li><strong>Familias que Buscan Dinero en Efectivo Directo:</strong> Familias que prefieren efectivo líquido para sus beneficiarios en lugar de contratos prepagados atados a una sola funeraria.</li>
          </ul>
        </section>

        <section>
          <h2>Opciones de Cobertura y Costos Funerarios Reales en Florida</h2>
          <p>Usted elige la cantidad de beneficio según sus deseos (cremación o sepelio tradicional) y su presupuesto. En Florida, los costos funerarios promedio incluyen:</p>
          <ul>
            <li><strong>Funeral Tradicional con Sepelio ($9,500 – $14,000+):</strong> Incluye servicios profesionales del director funerario, embalsamamiento, preparación estética, velación, coche fúnebre, ataúd de metal o madera, parcela en cementerio, bóveda (outer burial container) y lápida conmemorativa.</li>
            <li><strong>Cremación con Servicio Memorial ($4,000 – $7,500):</strong> Incluye cremación profesional, urna conmemorativa, servicio memorial o religioso en capilla y disposición de cenizas.</li>
            <li><strong>Cremación Directa Simple ($1,500 – $3,000):</strong> El servicio más elemental sin velación ni ceremonia previa.</li>
          </ul>
          <p><strong>El Pago del Seguro Social Federal:</strong> La Administración del Seguro Social federal otorga únicamente un pago único por fallecimiento de $255 a cónyuges sobrevivientes o dependientes calificados. Deja miles de dólares en gastos al descubierto que recaen directamente sobre los familiares.</p>
        </section>

        <section>
          <h2>Tipos de Pólizas: Emisión Simplificada vs. Emisión Garantizada</h2>
          <article>
            <h3>Emisión Simplificada (Simplified Issue): Cobertura Inmediata Día 1</h3>
            <p>Muchas pólizas de emisión simplificada no requieren un examen médico tradicional (sin agujas, análisis de sangre ni visitas de enfermeros a domicilio). La aprobación se basa en responder un cuestionario de salud básico y en una verificación digital de su historial de recetas médicas (Rx database check). Si califica, obtiene el beneficio nivelado completo (Level Benefit) desde el primer día con las primas más económicas.</p>
          </article>
          <article>
            <h3>Emisión Garantizada (Guaranteed Issue): Sin Preguntas Médicas</h3>
            <p>Diseñada para solicitantes que manejan enfermedades graves (como diálisis, cáncer activo, demencia o fallo cardíaco congestivo). La aseguradora no hace preguntas de salud ni revisa historial médico. Estas pólizas suelen incluir un período de espera de 2 años (Graded Benefit): si el asegurado fallece por causas naturales durante los primeros 24 meses, los beneficiarios reciben la devolución total de las primas pagadas más un 10% de interés.</p>
          </article>
        </section>

        <section>
          <h2>Comparativa: Gastos Finales vs. Seguro a Término vs. Plan Funerario Prepagado</h2>
          <table>
            <thead>
              <tr>
                <th>Característica</th>
                <th>Seguro de Gastos Finales</th>
                <th>Seguro de Vida a Término</th>
                <th>Plan Funerario Prepagado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Duración de Cobertura</td>
                <td>Toda la vida (Permanente)</td>
                <td>10, 20 o 30 años (Expira)</td>
                <td>Atado al contrato de la funeraria</td>
              </tr>
              <tr>
                <td>Primas Mensuales</td>
                <td>Fijas y niveladas para siempre</td>
                <td>Suben drásticamente al vencer</td>
                <td>Pagos fijos o suma global</td>
              </tr>
              <tr>
                <td>Flexibilidad de Fondos</td>
                <td>100% Efectivo libre para familia</td>
                <td>Efectivo libre (si fallece a tiempo)</td>
                <td>Solo servicios fúnebres contratados</td>
              </tr>
              <tr>
                <td>Libertad de Proveedores</td>
                <td>Cualquier funeraria en todo EE.UU.</td>
                <td>Cualquier funeraria</td>
                <td>Solo la empresa funeraria local</td>
              </tr>
              <tr>
                <td>Tratamiento Fiscal</td>
                <td>Libre de impuestos federales (IRC 101a)</td>
                <td>Libre de impuestos federales</td>
                <td>Sujeto a normas contractuales</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Preguntas Frecuentes sobre Seguro de Gastos Finales en Florida</h2>
          <dl>
            <dt><strong>¿El Seguro Social paga los gastos de funeral en Florida?</strong></dt>
            <dd>El Seguro Social federal solo otorga un pago único por fallecimiento de $255 a cónyuges sobrevivientes o hijos dependientes elegibles. Dado que los funerales tradicionales promedio en Florida superan los $9,500 y las cremaciones con servicios conmemorativos oscilan entre $4,000 y $7,500, un seguro de gastos finales es indispensable para evitar que su familia enfrente deudas repentinas.</dd>

            <dt><strong>¿Aumentarán mis primas mensuales a medida que cumpla más años?</strong></dt>
            <dd>No. Muchas pólizas de vida entera participantes ofrecen primas niveladas y cobertura permanente, sujetas a los términos, condiciones y al pago continuo de las primas requeridas. Sus cuotas quedan congeladas desde la fecha de emisión.</dd>

            <dt><strong>¿Cómo funciona la suscripción médica simplificada?</strong></dt>
            <dd>Muchas pólizas de emisión simplificada no requieren un examen médico tradicional (como pruebas de sangre, orina o visitas de enfermeros), aunque los requisitos de suscripción varían según la aseguradora y el solicitante. En lugar de exámenes físicos invasivos, la aseguradora evalúa la solicitud mediante preguntas de salud, revisión electrónica del historial de recetas médicas (Rx check) y bases de datos del MIB. Esto permite emitir la póliza en cuestión de días u horas.</dd>

            <dt><strong>¿Cuál es la diferencia entre Emisión Simplificada y Emisión Garantizada?</strong></dt>
            <dd>La Emisión Simplificada incluye preguntas de salud y verificación de recetas; si califica, otorga cobertura completa inmediata desde el Día 1 (Level Benefit) con las primas más competitivas. Las pólizas de emisión garantizada generalmente no requieren suscripción médica tradicional ni preguntas de salud, pero la elegibilidad, las limitaciones de beneficios y los períodos de espera varían según el asegurador y el producto.</dd>

            <dt><strong>¿Cuál es la diferencia entre un Seguro de Gastos Finales y un Contrato Funerario Prepagado (Pre-Need)?</strong></dt>
            <dd>Un contrato prepagado lo ata exclusivamente a una funeraria específica. Si esa empresa quiebra, cambia de administración o usted se muda de ciudad o estado, transferir o recuperar los fondos puede ser muy complejo o penalizado. Los beneficios por fallecimiento de un seguro de gastos finales se pagan generalmente a los beneficiarios según los términos de la póliza y pueden recibir un tratamiento fiscal federal favorable; las disposiciones de la póliza y las circunstancias de los beneficiarios pueden incidir en el resultado, dándoles libertad para contratar cualquier funeraria o servicio en Florida o en todo el país.</dd>

            <dt><strong>¿Puedo calificar si tengo condiciones preexistentes como Diabetes o Hipertensión?</strong></dt>
            <dd>Sí. Gran parte de nuestros clientes adultos mayores en Florida manejan condiciones de salud crónicas. Como corredores independientes, revisamos su historial de salud y medicamentos para identificar las aseguradoras con pautas de suscripción más favorables, buscando alternativas con cobertura inmediata de beneficio nivelado desde el primer día cuando el solicitante califique según las reglas de la compañía.</dd>
          </dl>
        </section>

        <section>
          <h2>Proceso de Solicitud y Cotización Gratuita en Florida</h2>
          <p>El corredor licenciado Andrés Bozo (NPN: 21228432) le acompaña en cada paso para elegir la póliza que mejor cuide su presupuesto y a sus seres queridos. Llame hoy al <a href="tel:+13522258389">+1 (352) 225-8389</a> para una cotización inmediata y personalizada sin compromiso.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <nav aria-label="Breadcrumb"><p><a href="/">Florida Insurance Portal</a> &gt; <span>Final Expense & Burial Insurance</span></p></nav>
        <header>
          <h1>Final Expense & Burial Insurance in Florida 2026</h1>
          <p>Protect your children and spouse from taking on sudden funeral debt. Permanent whole life coverage with level premiums, subject to policy terms and continued payment of premiums. Many simplified-issue policies do not require a traditional medical exam, although underwriting requirements vary by carrier and applicant. Independent broker Andres Bozo (NPN: 21228432) compares rates across top carriers to secure the best policy for your family.</p>
        </header>

        <section>
          <h2>What is Final Expense Insurance?</h2>
          <p>Final Expense Insurance (often called burial or funeral insurance) is a permanent Whole Life insurance policy. It is specifically structured to cover burial or cremation expenses, funeral home services, caskets, cemetery plots, outstanding hospital bills, and unpaid debts upon your passing.</p>
          <p>Unlike term life insurance policies that expire when you reach age 70 or 80, final expense coverage stays active for your entire life as long as premiums are paid. It builds guaranteed cash value and delivers immediate liquidity to your loved ones when they need it most.</p>
        </section>

        <section>
          <h2>Who Needs Final Expense Coverage in Florida?</h2>
          <ul>
            <li><strong>Seniors Aged 50 to 85:</strong> Individuals who want to ensure their children and spouse are not left with a sudden $10,000+ funeral bill during their time of grief.</li>
            <li><strong>Outlived Term Life Insurance:</strong> Retirees whose 20 or 30-year term policies expired or whose term renewal rates became unaffordable as they aged.</li>
            <li><strong>Applicants with Health Conditions:</strong> Those managing hypertension, diabetes, or other chronic conditions who need accessible whole life coverage without undergoing invasive medical exams.</li>
            <li><strong>Families Wanting Direct Cash Freedom:</strong> Families who prefer unrestricted cash payouts for their beneficiaries instead of restrictive funeral home pre-need packages.</li>
          </ul>
        </section>

        <section>
          <h2>Coverage Options & Real Florida Funeral Costs</h2>
          <p>You choose the exact face amount based on your preferred arrangement and monthly budget. In Florida, typical funeral and memorial expenses include:</p>
          <ul>
            <li><strong>Traditional Funeral with Burial ($9,500 – $14,000+):</strong> Basic services fee of funeral director, embalming, cosmetology, viewing/visitation, hearse transport, metal or wood casket, cemetery plot, outer burial container (vault), and opening/closing costs.</li>
            <li><strong>Cremation with Memorial Service ($4,000 – $7,500):</strong> Professional cremation, memorial service at chapel or church, urn, and disposition arrangements.</li>
            <li><strong>Direct Cremation ($1,500 – $3,000):</strong> Basic cremation without prior viewing or ceremonial service.</li>
          </ul>
          <p><strong>Federal Social Security Death Benefit:</strong> The federal Social Security Administration pays only a single, one-time lump-sum death benefit of $255 to eligible surviving spouses, leaving thousands of dollars in uncovered funeral expenses for your loved ones.</p>
        </section>

        <section>
          <h2>Policy Types: Simplified Issue vs. Guaranteed Issue</h2>
          <article>
            <h3>Simplified Issue: Day-One Immediate Level Coverage</h3>
            <p>Many simplified-issue policies do not require a traditional medical exam (no needles, blood draws, or home nurse visits). Approval is based on answering basic health questionnaire questions and an electronic prescription drug database check (Rx check). Qualifying applicants receive full Day-One Level Benefit protection at the lowest monthly rates.</p>
          </article>
          <article>
            <h3>Guaranteed Issue: No Medical Questions</h3>
            <p>Designed for applicants managing severe health challenges (such as active cancer, dialysis, dementia, or congestive heart failure). The insurer does not ask health questions or review medical records. These policies typically feature a 2-year graded waiting period: if death occurs from natural causes in the first 24 months, beneficiaries receive a full return of all paid premiums plus 10% interest.</p>
          </article>
        </section>

        <section>
          <h2>Comparison: Final Expense vs. Term Life vs. Pre-Need Funeral Plans</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Final Expense Whole Life</th>
                <th>Term Life Insurance</th>
                <th>Pre-Need Funeral Contract</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Coverage Duration</td>
                <td>Lifelong (Permanent)</td>
                <td>10, 20, or 30 Years (Expires)</td>
                <td>Locked to specific funeral home</td>
              </tr>
              <tr>
                <td>Premium Rates</td>
                <td>Fixed and level for life</td>
                <td>Skyrockets upon expiration</td>
                <td>Fixed payments or lump sum</td>
              </tr>
              <tr>
                <td>Benefit Flexibility</td>
                <td>100% Tax-free cash for family</td>
                <td>Cash benefit (if death occurs in term)</td>
                <td>Limited strictly to funeral package</td>
              </tr>
              <tr>
                <td>Provider Freedom</td>
                <td>Any funeral home nationwide</td>
                <td>Any funeral home</td>
                <td>Only the contracted funeral home</td>
              </tr>
              <tr>
                <td>Federal Tax Treatment</td>
                <td>Income-tax-free death benefit (IRC 101a)</td>
                <td>Income-tax-free death benefit</td>
                <td>Subject to contract and state laws</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Frequently Asked Questions About Florida Final Expense Insurance</h2>
          <dl>
            <dt><strong>Does Social Security cover funeral costs in Florida?</strong></dt>
            <dd>The federal Social Security Administration pays only a single, one-time lump-sum death benefit of $255 to eligible surviving spouses or dependent children. Given that traditional Florida funerals average over $9,500 and memorial cremations range from $4,000 to $7,500, final expense insurance is essential to protect loved ones from unexpected debt.</dd>

            <dt><strong>Will my monthly premiums increase as I grow older?</strong></dt>
            <dd>Many participating whole life policies offer level premiums and permanent coverage, subject to the policy’s terms, conditions and continued payment of required premiums. Your rates are locked in on day one.</dd>

            <dt><strong>What does 'no traditional medical exam' mean?</strong></dt>
            <dd>Many simplified-issue policies do not require a traditional medical exam (such as blood draws, urine tests, or nurse physicals), although underwriting requirements vary by carrier and applicant. Instead of invasive physical exams, insurers review health application questions, electronic prescription drug histories (Rx checks), and MIB databases, allowing policies to be approved in days or hours.</dd>

            <dt><strong>What is the difference between Simplified Issue and Guaranteed Issue?</strong></dt>
            <dd>Simplified Issue policies require answering health questions and an Rx database check; qualifying applicants receive immediate Day-One Level Benefit protection with more competitive rates than guaranteed issue options. Guaranteed-issue policies generally do not require traditional medical underwriting or health questions, but eligibility, benefit limitations and waiting periods vary by carrier and product.</dd>

            <dt><strong>What is the difference between Final Expense Insurance and a Pre-Need Funeral Plan?</strong></dt>
            <dd>Pre-need plans lock your funds with one specific local funeral home. If that funeral home changes ownership, closes, or if you relocate out of state, transferring funds can be difficult or costly. Death benefits from a final expense policy are generally paid to beneficiaries according to the policy terms and may receive favorable federal tax treatment; policy provisions and the beneficiary's circumstances can affect the outcome, giving them total freedom to choose any provider nationwide.</dd>

            <dt><strong>Can I qualify with pre-existing conditions like diabetes or high blood pressure?</strong></dt>
            <dd>Yes. Many of our Florida senior clients manage common chronic health conditions. As independent brokers working with multiple specialized final expense insurers, we compare your health and prescription history against carrier underwriting guidelines to locate available options, including immediate Day-One coverage where qualifying criteria are met.</dd>
          </dl>
        </section>

        <section>
          <h2>Application Process with Andres Bozo, Independent Broker (NPN: 21228432)</h2>
          <p>Streamlined guidance: we compare available Final Expense options from multiple state-licensed insurance carriers, assist with telephone or electronic applications, and walk you through carrier underwriting. Call today at <a href="tel:+13522258389">+1 (352) 225-8389</a> for a free, pressure-free quote.</p>
        </section>
      `;
    }
  }

  // 4. IUL Service Page
  else if (
    cleanPath === "/iul-retirement" || 
    cleanPath === "/es/iul-jubilacion" ||
    cleanPath === "/iul" ||
    cleanPath === "/es/iul" ||
    cleanPath === "/iul-florida" ||
    cleanPath === "/es/iul-florida" ||
    cleanPath === "/iul-jubilacion"
  ) {
    title = isEs 
      ? "Guía Completa de Vida Universal Indexada (IUL) en Florida 2026 | AHB Insurance" 
      : "Indexed Universal Life (IUL) Insurance Master Guide Florida 2026 | AHB Insurance";
    description = isEs 
      ? "Aprenda cómo el IUL ofrece crecimiento indexado con piso contractual del 0% y estrategias de préstamos con ventajas fiscales bajo el Código IRS 7702 en Florida." 
      : "Discover how Indexed Universal Life (IUL) provides index-linked crediting with a contractual 0% floor and tax-advantaged retirement policy loans under IRS Section 7702 in Florida.";

    if (isEs) {
      bodyOutline = `
        <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <span>Vida Universal Indexada (IUL)</span></p></nav>
        <header>
          <h1>Seguro de Vida Universal Indexada (IUL) y Estrategias de Retiro en Florida 2026</h1>
          <p>Descubra cómo el seguro de Vida Universal Indexada (IUL) combina protección permanente para su familia con acumulación de valor en efectivo indexado a índices bursátiles como el S&P 500, un piso contractual del 0% en la acreditación indexada y estrategias de préstamos sobre póliza con ventajas fiscales potenciales bajo el Código IRS 7702. Asesoría experta y transparente con el broker independiente licenciado en Florida Andrés Bozo (NPN: 21228432).</p>
        </header>

        <section>
          <h2>¿Cómo Funciona el Mecanismo de Acreditación de un IUL?</h2>
          <p>En una póliza de Vida Universal Indexada, el valor en efectivo no está invertido directamente en acciones o fondos del mercado bursátil. El interés se acredita según el rendimiento del índice de referencia elegido (como el S&P 500) sujeto a reglas contractuales claras:</p>
          <ol>
            <li><strong>Piso Contractual del 0%:</strong> El componente de acreditación indexada cuenta con un piso contractual del 0%, lo que significa que a la estrategia no se le acredita un rendimiento negativo ante caídas del mercado. Sin embargo, los cargos administrativos de la póliza y los costos internos del seguro (COI) continúan deduciéndose.</li>
            <li><strong>Participación en Mercados Alcistas:</strong> Cuando los índices suben, usted recibe rendimientos hasta un tope de tasa ("Cap Rate"), típicamente entre el 8% y el 12%, o según tasas de participación definidas contractualmente.</li>
            <li><strong>Crecimiento con Impuestos Diferidos:</strong> El valor en efectivo acumula intereses con diferimiento de impuestos bajo la Sección 7702 del Código de Rentas Internas (IRC), permitiendo que su dinero capitalice año tras año sin erosión tributaria por plusvalías anuales.</li>
          </ol>
        </section>

        <section>
          <h2>Comparación Estratégica: IUL vs 401(k) / IRA Tradicional vs Roth IRA</h2>
          <table>
            <thead>
              <tr>
                <th>Criterio Financiero</th>
                <th>IUL (Código IRS 7702)</th>
                <th>401(k) / IRA Tradicional</th>
                <th>Roth IRA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tratamiento de Retiros y Préstamos</td>
                <td>Préstamos y retiros hasta la base libres de impuestos (no-MEC en vigor)</td>
                <td>Tributa 100% como Ingreso Ordinario</td>
                <td>100% Libre de Impuestos (tras 5 años y 59½)</td>
              </tr>
              <tr>
                <td>Protección ante Caídas Bursátiles</td>
                <td>Piso Contractual del 0% (Sin acreditación negativa)</td>
                <td>Sin Protección (Riesgo total de pérdida)</td>
                <td>Sin Protección (Riesgo total de pérdida)</td>
              </tr>
              <tr>
                <td>Límites Anuales de Contribución</td>
                <td>Sin Límite Estatutario IRS (Sujeto al diseño de la póliza)</td>
                <td>Tope de $23,500/año (2026)</td>
                <td>Tope estricto de $7,000/año (2026)</td>
              </tr>
              <tr>
                <td>Límite de Ingresos para Aportar</td>
                <td>Sin Límite de Ingresos</td>
                <td>Sin Límite de Ingresos</td>
                <td>Eliminado para personas con altos ingresos</td>
              </tr>
              <tr>
                <td>Acceso a Fondos Antes de 59½ Años</td>
                <td>Sin penalidad del 10% del IRS en pólizas no-MEC</td>
                <td>Penalidad del 10% del IRS (salvo excepciones)</td>
                <td>Aportes sin penalidad; ganancias penalizadas</td>
              </tr>
              <tr>
                <td>Distribuciones Mínimas Requeridas (RMD)</td>
                <td>Sin RMDs obligatorias a ninguna edad</td>
                <td>RMDs obligatorias a los 73/75 años</td>
                <td>Sin RMDs durante la vida del titular</td>
              </tr>
              <tr>
                <td>Protección por Fallecimiento</td>
                <td>Beneficio por Fallecimiento exento de impuesto sobre la renta</td>
                <td>No incluye seguro de vida</td>
                <td>No incluye seguro de vida</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Educación Financiera: Préstamos de Póliza (Policy Loans) y Mitigación de Riesgos</h2>
          <p>Aunque los préstamos sobre la póliza son una estrategia legal bajo el Código IRS 7702, NO representan dinero regalado ni garantizado. Para conservar el tratamiento favorable de exención impositiva, es fundamental considerar:</p>
          <ul>
            <li><strong>Riesgo de Caducidad (Lapse Risk) y Consecuencia Fiscal:</strong> Si una póliza con préstamos pendientes caduca o se cancela en vida del asegurado, cualquier monto adeudado que supere las primas pagadas (cost basis) se convierte de inmediato en INGRESO ORDINARIO GRAVABLE. Por ello, el IUL requiere un monitoreo continuo.</li>
            <li><strong>Intereses del Préstamo y Costo del Seguro (COI):</strong> Los préstamos acumulan intereses contractuales. Conforme el asegurado envejece, el Costo del Seguro (COI) aumenta naturalmente; la póliza debe mantener fondos suficientes para soportar tanto los intereses como el COI sin descapitalizarse.</li>
            <li><strong>Estatus de Contrato de Dotación Modificada (MEC):</strong> Si se deposita dinero por encima de los límites de la prueba de 7 pagos ("7-pay test") del IRS, la póliza se clasifica como MEC, perdiendo ventajas fiscales en retiros y préstamos. Diseñamos pólizas con el beneficio por fallecimiento mínimo legal para maximizar la acumulación protegiendo el estatus no-MEC.</li>
          </ul>
        </section>

        <section>
          <h2>Beneficios en Vida (Living Benefits) Incluidos en el IUL</h2>
          <p>Un IUL moderno no solo protege a sus beneficiarios en caso de fallecimiento, sino que también protege sus finanzas mientras está vivo a través de Cláusulas de Aceleración de Beneficios:</p>
          <ul>
            <li><strong>Enfermedades Terminales:</strong> Adelanto de hasta el 90% del beneficio por muerte si recibe un diagnóstico con expectativa de vida menor a 12 o 24 meses.</li>
            <li><strong>Enfermedades Crónicas:</strong> Fondos mensuales si no puede realizar 2 de las 6 Actividades de la Vida Diaria (bañarse, vestirse, comer, transferirse, continencia o aseo) o sufre deterioro cognitivo severo.</li>
            <li><strong>Enfermedades Críticas:</strong> Acceso a capital libre de impuestos ante eventos graves como infarto de miocardio, accidente cerebrovascular (ACV), cáncer invasivo o trasplante de órganos.</li>
          </ul>
        </section>

        <section>
          <h2>Preguntas Frecuentes sobre Vida Universal Indexada en Florida</h2>
          <dl>
            <dt><strong>¿Cómo funciona la garantía de piso del 0% en un seguro IUL?</strong></dt>
            <dd>El componente de acreditación indexada de un IUL cuenta con un piso contractual del 0%, lo que significa que a la estrategia de índice seleccionada no se le acredita un rendimiento negativo ante caídas del mercado. Sin embargo, los costos del seguro (COI), cargos administrativos de la póliza, préstamos, retiros y otras disposiciones contractuales pueden afectar el valor en efectivo total.</dd>

            <dt><strong>¿Los préstamos para el retiro de una póliza IUL son dinero libre de impuestos garantizado?</strong></dt>
            <dd>Los préstamos sobre la póliza pueden brindar acceso al valor en efectivo con un tratamiento fiscal federal potencialmente favorable cuando la póliza está estructurada adecuadamente, no es un Contrato de Dotación Modificada (MEC), se mantiene en vigor y se cumplen los requisitos fiscales aplicables. Si la póliza caduca (lapse), se entrega o se cancela con un préstamo pendiente superior a la base de primas pagadas, el monto adeudado en exceso se convierte de inmediato en ingreso ordinario gravable. Por ello, una estrategia de IUL requiere monitoreo periódico, un diseño prudente y la consulta con un asesor tributario calificado.</dd>

            <dt><strong>¿Qué son los Beneficios en Vida (Living Benefits) incluidos en una póliza IUL?</strong></dt>
            <dd>Los Beneficios en Vida le permiten adelantar un porcentaje sustancial (hasta un 80% o 90%) del beneficio por fallecimiento mientras está vivo si se le diagnostica una enfermedad grave, crónica (incapacidad para realizar 2 de 6 actividades diarias) o terminal (Cáncer, Infarto, ACV, ALS), sin restricciones en cómo gasta el dinero.</dd>

            <dt><strong>¿En qué se diferencia un IUL de una cuenta 401(k) o IRA Tradicional respecto a impuestos y penalidades?</strong></dt>
            <dd>En un 401(k) o IRA Tradicional, las contribuciones son antes de impuestos, pero el 100% de los retiros futuros tributa como ingreso ordinario, además de sufrir una penalidad del 10% del IRS si se retira antes de los 59 años y medio (salvo excepciones) y Distribuciones Mínimas Requeridas (RMDs) obligatorias a los 73/75 años. En un IUL no-MEC, los préstamos sobre la póliza no tienen penalidad por edad del 10% y no existen RMDs obligatorias. No obstante, a diferencia de un 401(k), los préstamos de un IUL acumulan intereses y reducen el valor neto; si no se administran para cubrir los costos internos crecientes del seguro, la póliza puede caducar y generar consecuencias fiscales.</dd>

            <dt><strong>¿Qué es un Contrato de Dotación Modificada (MEC) y cómo se evita?</strong></dt>
            <dd>Un MEC ocurre si deposita demasiado dinero en efectivo en la póliza demasiado rápido en relación con el beneficio por fallecimiento, violando la prueba de 7 pagos ('7-pay test') del IRS. En un contrato MEC, los retiros y préstamos pierden su ventaja fiscal, tributando primero sobre ganancias como ingreso ordinario y con penalidad del 10% antes de los 59½ años. Estructuramos profesionalmente su IUL para maximizar la acumulación de efectivo manteniendo la póliza estrictamente no-MEC.</dd>
          </dl>
        </section>

        <section>
          <h2>Solicite su Ilustración Personalizada de IUL en Florida</h2>
          <p>Obtenga un análisis financiero personalizado adaptado a su edad, objetivos de retiro y capacidad de ahorro. Contacte al broker independiente Andrés Bozo (NPN: 21228432) al <a href="tel:+13522258389">+1 (352) 225-8389</a>.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <nav aria-label="Breadcrumb"><p><a href="/">Florida Insurance Portal</a> &gt; <span>Indexed Universal Life (IUL)</span></p></nav>
        <header>
          <h1>Indexed Universal Life (IUL) Insurance Master Guide Florida 2026</h1>
          <p>Discover how Indexed Universal Life (IUL) insurance combines permanent death benefit protection for your family with index-linked cash value growth (such as the S&P 500), a contractual 0% floor against market declines, and tax-advantaged policy loan strategies under IRS Code Section 7702. Independent Florida broker Andres Bozo (NPN: 21228432) provides unbiased illustrations and personalized structuring.</p>
        </header>

        <section>
          <h2>How the Index-Crediting Mechanism Works in an IUL Policy</h2>
          <p>In an Indexed Universal Life insurance policy, your cash value is never directly invested in equity markets or volatile mutual funds. Instead, interest crediting is linked to an underlying financial benchmark (such as the S&P 500) based on clear contractual mechanisms:</p>
          <ol>
            <li><strong>Contractual 0% Crediting Floor:</strong> The index-crediting component has a contractual 0% floor, meaning your cash value is never credited with negative returns during market downturns. However, internal policy charges, administrative fees, and monthly Cost of Insurance (COI) deductions still apply.</li>
            <li><strong>Market Upside Participation:</strong> When financial indexes perform well, your account receives interest up to an annual Cap Rate (typically 8% to 12%) or according to contractual Participation Rates.</li>
            <li><strong>Tax-Deferred Compound Growth:</strong> Under IRS Code Section 7702, credited cash value accumulates on a tax-deferred basis, enabling your funds to compound year over year without annual 1099 capital gains erosion.</li>
          </ol>
        </section>

        <section>
          <h2>Strategic Comparison: IUL vs 401(k) / Traditional IRA vs Roth IRA</h2>
          <table>
            <thead>
              <tr>
                <th>Financial Metric</th>
                <th>IUL (IRS Code 7702)</th>
                <th>Traditional 401(k) / IRA</th>
                <th>Roth IRA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Withdrawals & Loans Taxation</td>
                <td>Withdrawals to basis tax-free; loans income-tax-free while policy remains in force (non-MEC)</td>
                <td>100% Taxed as Ordinary Income</td>
                <td>100% Tax-Free (After 5 years & age 59½)</td>
              </tr>
              <tr>
                <td>Downside Market Protection</td>
                <td>Contractual 0% Floor (No negative index crediting)</td>
                <td>No Protection (Full market downside risk)</td>
                <td>No Protection (Full market downside risk)</td>
              </tr>
              <tr>
                <td>Annual Contribution Limits</td>
                <td>No Statutory IRS Cap (Subject to policy death benefit)</td>
                <td>Capped at $23,500/yr (2026)</td>
                <td>Strict Cap of $7,000/yr (2026)</td>
              </tr>
              <tr>
                <td>Income Eligibility Restrictions</td>
                <td>No Income Limits</td>
                <td>No Income Limits</td>
                <td>Phased out for higher-income earners</td>
              </tr>
              <tr>
                <td>Access Prior to Age 59½</td>
                <td>No 10% IRS penalty on non-MEC policy loans</td>
                <td>10% IRS early withdrawal penalty (unless exempt)</td>
                <td>Contributions penalty-free; earnings penalized</td>
              </tr>
              <tr>
                <td>Required Minimum Distributions (RMD)</td>
                <td>No Mandatory RMDs at any age</td>
                <td>Mandatory RMDs starting at age 73/75</td>
                <td>No RMDs during owner's lifetime</td>
              </tr>
              <tr>
                <td>Family Death Benefit Protection</td>
                <td>Income-Tax-Free Death Benefit for beneficiaries</td>
                <td>No Life Insurance Protection</td>
                <td>No Life Insurance Protection</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Financial Education: Policy Loans ≠ Guaranteed Free Money</h2>
          <p>In the insurance marketplace, IUL is frequently marketed with claims of unconditional "tax-free retirement income." While policy loans represent a legitimate statutory mechanism under IRS Code Section 7702, a policy loan is NOT guaranteed free money. Responsible financial planning requires understanding the conditions and potential tax liabilities:</p>
          <ul>
            <li><strong>Lapse Risk and Phantom Tax Consequences:</strong> If an IUL policy lapses or is surrendered during the insured's lifetime with an outstanding loan exceeding total premiums paid (cost basis), that excess loan balance becomes immediately TAXABLE AS ORDINARY INCOME. This can trigger a substantial tax bill with zero liquid cash available to pay it.</li>
            <li><strong>Loan Interest Accrual & Rising COI Charges:</strong> Policy loans accrue interest. Unpaid interest is capitalized into the loan balance, reducing net cash value and net death benefit. Meanwhile, internal monthly Cost of Insurance (COI) charges increase with age. If remaining cash value cannot support both loan interest and COI charges, the policy risks lapse.</li>
            <li><strong>Modified Endowment Contract (MEC) Rules:</strong> Paying premiums beyond the IRS 7-pay test reclassifies the contract as a MEC. In a MEC, all loans and withdrawals lose tax advantages, are taxed on a LIFO basis (earnings first as ordinary income), and trigger a 10% early withdrawal penalty if taken prior to age 59½. We engineer custom maximum-funded, minimum-death-benefit IUL designs to prevent MEC status.</li>
          </ul>
        </section>

        <section>
          <h2>Living Benefits (Accelerated Death Benefit Riders) in Florida IULs</h2>
          <p>Modern Indexed Universal Life policies feature Accelerated Death Benefit Riders that allow you to access your death benefit while still living if diagnosed with severe health conditions:</p>
          <ul>
            <li><strong>Terminal Illness:</strong> Accelerate up to 90% of your policy's death benefit if diagnosed with a certified life expectancy of 12 to 24 months or less.</li>
            <li><strong>Chronic Illness:</strong> Access periodic payouts if you become unable to perform at least 2 of 6 Activities of Daily Living (eating, bathing, dressing, transferring, toileting, continence) or suffer severe cognitive impairment.</li>
            <li><strong>Critical Illness:</strong> Receive lump-sum distributions upon qualifying diagnoses of heart attack, stroke, invasive cancer, major organ transplant, or ALS.</li>
          </ul>
        </section>

        <section>
          <h2>Frequently Asked Questions About Florida IUL Insurance</h2>
          <dl>
            <dt><strong>How does the 0% index crediting floor work in an IUL policy?</strong></dt>
            <dd>The index-crediting component of an IUL may have a contractual 0% floor, meaning the selected index strategy is not credited with a negative index return. However, policy charges, cost of insurance (COI), loans, withdrawals and other contract provisions can affect overall cash value.</dd>

            <dt><strong>Are retirement policy loans from an IUL guaranteed tax-free money?</strong></dt>
            <dd>Policy loans may provide access to cash value with potentially favorable federal tax treatment when the policy remains in force, is structured properly, is not a Modified Endowment Contract (MEC), and applicable tax requirements are satisfied. If the policy lapses, is surrendered, or terminates before death with an outstanding loan balance exceeding the total premiums paid, that unpaid loan balance becomes immediately taxable as ordinary income. Maintaining tax advantages requires disciplined policy management and consulting a qualified tax professional.</dd>

            <dt><strong>What are Living Benefits (Accelerated Death Benefit Riders) in an IUL?</strong></dt>
            <dd>Living Benefits allow you to accelerate up to 80%-90% of your policy's death benefit while living if diagnosed with a qualifying critical illness (heart attack, stroke, invasive cancer) or chronic condition (inability to perform 2 of 6 Activities of Daily Living). Funds can pay for experimental medical treatments, mortgage, or long-term care.</dd>

            <dt><strong>How does an IUL compare to a Traditional 401(k) or Traditional IRA regarding taxes and penalties?</strong></dt>
            <dd>A Traditional 401(k) or IRA defers taxes on contributions, but 100% of future withdrawals are taxed as ordinary income, alongside a 10% IRS early withdrawal penalty prior to age 59½ and mandatory Required Minimum Distributions (RMDs) at age 73/75. In a properly structured non-MEC IUL, policy loans are not subject to the statutory 10% early withdrawal age penalty, and there are no mandatory RMDs. However, unlike a 401(k), policy loans accrue interest and represent debt against your policy. If not actively managed against rising Cost of Insurance charges, an overleveraged loan can cause policy lapse and trigger severe income tax consequences.</dd>

            <dt><strong>What is a Modified Endowment Contract (MEC) and how do you prevent it?</strong></dt>
            <dd>A policy becomes a MEC if funded with excessive cash relative to the death benefit under the IRS 7-pay test, causing distributions to lose tax-advantaged status and subjecting loans to ordinary income tax plus a 10% penalty before age 59½. We engineer custom maximum-funded, minimum-death-benefit IUL designs to prevent MEC status and optimize cash growth.</dd>
          </dl>
        </section>

        <section>
          <h2>Request a Free Custom Florida IUL Illustration</h2>
          <p>Receive a clear, personalized IUL policy illustration showing index performance modeling, cash value accumulation, and loan distributions. Call licensed independent broker Andres Bozo (NPN: 21228432) at <a href="tel:+13522258389">+1 (352) 225-8389</a>.</p>
        </section>
      `;
    }
  }

  // 5. Blog Hub & Individual Post Views
  else if (cleanPath === "/blog" || cleanPath === "/es/blog" || cleanPath.startsWith("/blog/") || cleanPath.startsWith("/es/blog/")) {
    const isSingleArticle = cleanPath.startsWith("/blog/") || cleanPath.startsWith("/es/blog/");
    
    if (isSingleArticle) {
      const slugValue = cleanPath.startsWith("/blog/") ? cleanPath.replace("/blog/", "") : cleanPath.replace("/es/blog/", "");
      const post = BLOG_POSTS.find(p => p.slug.en === slugValue || p.slug.es === slugValue);
      
      if (post) {
        title = isEs ? `${post.title.es} | AHB Insurance` : `${post.title.en} | AHB Insurance`;
        description = isEs ? post.excerpt.es : post.excerpt.en;
        ogType = "article";
        
        const authorName = post.author.name;
        const authorTitle = post.author.title;
        const publishDate = post.date;
        const articleContent = isEs ? post.content.es : post.content.en;

        bodyOutline = `
          <article>
            <header>
              <h1>${escapeHtml(isEs ? post.title.es : post.title.en)}</h1>
              <p><em>${escapeHtml(isEs ? post.excerpt.es : post.excerpt.en)}</em></p>
              <p>Published on: ${publishDate} | Category: ${post.category} | Author: ${authorName} (${authorTitle})</p>
            </header>
            <main>
              <div class="article-body">
                ${articleContent.split("\n\n").map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}
              </div>
            </main>
          </article>
        `;
      }
    } else {
      title = isEs 
        ? "Centro de Conocimiento sobre Medicare y Seguros en Florida | AHB Insurance" 
        : "Florida Medicare & Insurance Knowledge Hub | AHB Insurance";
      description = isEs 
        ? "Artículos educativos, guías de inscripción abierta de Medicare, seguros de gastos finales e IUL por el broker licenciado Andrés H. Bozo." 
        : "Educational guides on Florida Medicare enrollment, burial insurance, and tax-free IUL retirement by licensed broker Andres H. Bozo.";

      const postsList = BLOG_POSTS.map(post => {
        const pTitle = isEs ? post.title.es : post.title.en;
        const pExcerpt = isEs ? post.excerpt.es : post.excerpt.en;
        const pSlug = isEs ? post.slug.es : post.slug.en;
        const pLink = isEs ? `/es/blog/${pSlug}` : `/blog/${pSlug}`;
        return `
          <li>
            <h3><a href="${pLink}">${escapeHtml(pTitle)}</a></h3>
            <p>${escapeHtml(pExcerpt)}</p>
          </li>
        `;
      }).join("\n");

      bodyOutline = `
        <header>
          <h1>${title}</h1>
          <p>${description}</p>
        </header>
        <main>
          <h2>Recent Educational Articles</h2>
          <ul>
            ${postsList}
          </ul>
        </main>
      `;
    }
  }

  // 6. FAQ Page
  else if (cleanPath === "/faq" || cleanPath === "/es/preguntas-frecuentes") {
    title = isEs 
      ? "Preguntas Frecuentes sobre Medicare, Gastos Finales, Seguro de Vida, IUL y Anualidades | AHB" 
      : "Medicare, Final Expense, Life Insurance, IUL & Annuities FAQ | AHB Solutions";
    description = isEs 
      ? "Respuestas completas a más de 30 dudas clave sobre Medicare Suplementario Plan G y N, Gastos Finales, Seguro de Vida, IUL y Anualidades en Florida con el broker Andrés H. Bozo." 
      : "Comprehensive answers to 30+ essential questions regarding Florida Medicare Supplement Plan G & N, Final Expense, Life Insurance, IUL, and Annuities with licensed broker Andres H. Bozo.";

    const activeFaqs = isEs ? faqsEs : faqsEn;
    const categoryTitles: Record<string, { en: string; es: string }> = {
      'medicare': { en: 'Medicare & Medigap Questions', es: 'Preguntas sobre Medicare y Medigap' },
      'final-expense': { en: 'Final Expense & Burial Insurance', es: 'Gastos Finales y Seguro de Entierro' },
      'life-insurance': { en: 'Term & Whole Life Insurance', es: 'Seguro de Vida a Término y Entera' },
      'iul': { en: 'Indexed Universal Life (IUL) & Retirement', es: 'Vida Universal Indexada (IUL) y Jubilación' },
      'annuities': { en: 'Fixed & Indexed Annuities', es: 'Anualidades Fijas e Indexadas' },
      'general': { en: 'General Broker & Consultation Process', es: 'Proceso de Consulta y Broker Independiente' }
    };

    const categories = ['medicare', 'final-expense', 'life-insurance', 'iul', 'annuities', 'general'] as const;

    const faqSectionsHtml = categories.map(cat => {
      const catFaqs = activeFaqs.filter(f => f.category === cat);
      const catTitle = isEs ? categoryTitles[cat].es : categoryTitles[cat].en;
      return `
        <section class="faq-category-section" style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">${escapeHtml(catTitle)}</h2>
          <dl>
            ${catFaqs.map(item => `
              <div class="faq-item" style="margin-bottom: 1.25rem;">
                <dt style="font-weight: 700; font-size: 1.05rem; color: #1e293b; margin-bottom: 0.35rem;">${escapeHtml(item.q)}</dt>
                <dd style="color: #475569; line-height: 1.6; margin-left: 0;">${escapeHtml(item.a)}</dd>
              </div>
            `).join('')}
          </dl>
        </section>
      `;
    }).join('\n');

    bodyOutline = `
      <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 900; color: #0f172a; margin-bottom: 0.75rem;">${escapeHtml(title)}</h1>
        <p style="font-size: 1.1rem; color: #475569; line-height: 1.6;">${escapeHtml(description)}</p>
      </header>
      <main>
        ${faqSectionsHtml}
      </main>
    `;
  }

  // 7. About Us & Broker Andres Bozo Page
  else if (cleanPath === "/about-us" || cleanPath === "/es/nosotros" || cleanPath === "/about-andres-bozo" || cleanPath === "/es/sobre-andres-bozo") {
    title = isEs 
      ? "Sobre Andrés H. Bozo | Broker de Seguros Licenciado en Florida (NPN 21228432)" 
      : "About Andres H. Bozo | Licensed Florida Insurance Broker (NPN 21228432)";
    description = isEs 
      ? "Conozca a Andrés H. Bozo (NPN 21228432), broker independiente de seguros en Florida. Asesoría experta y bilingüe en Medicare, Gastos Finales, IUL y Anualidades con aseguradoras de primer nivel." 
      : "Meet Andres H. Bozo (NPN 21228432), independent Florida insurance broker. Expert bilingual guidance across Medicare, Final Expense, IUL, and Annuities representing top national carriers.";

    if (isEs) {
      bodyOutline = `
        <header>
          <h1>${title}</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Broker Independiente Andrés H. Bozo — NPN 21228432</h2>
          <p>Andrés H. Bozo es corredor de seguros independiente certificado por el Departamento de Servicios Financieros del Estado de Florida (DFS) y fundador de AHB Insurance Solutions. Brinda asesoría bilingüe de seguros para personas mayores y familias en todo el estado de Florida, con contratos directos con aseguradoras de primer nivel nacional.</p>
          <h3>Áreas de Especialización en Florida</h3>
          <ul>
            <li><strong>Medicare Suplementario (Medigap Plan G y N) y Medicare Advantage (Parte C)</strong></li>
            <li><strong>Seguro de Gastos Finales y Protección Funeraria para Mayores</strong></li>
            <li><strong>Vida Universal Indexada (IUL) y Estrategias de Retiro (IRC 7702)</strong></li>
            <li><strong>Anualidades Fijas Indexadas (FIA) con Ingresos de por Vida</strong></li>
            <li><strong>Planes Dentales, Visión y Audición para Adultos Mayores</strong></li>
          </ul>
        </section>
        <section>
          <h2>Metodología de Asesoría en 4 Pasos</h2>
          <ol>
            <li>Diagnóstico exhaustivo de salud, recetas y objetivos financieros.</li>
            <li>Comparación objetiva de tarifas reguladas entre aseguradoras líderes.</li>
            <li>Asesoría bilingüe y transparente sin presión comercial (100% gratuita).</li>
            <li>Acompañamiento en reclamos y revisiones anuales de formularios de medicamentos.</li>
          </ol>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>${title}</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Independent Broker Andres H. Bozo — NPN 21228432</h2>
          <p>Andres H. Bozo is a licensed independent insurance broker authorized by the Florida Department of Financial Services (DFS) and principal of AHB Insurance Solutions. Delivering client-focused, bilingual advisory across all 67 Florida counties with direct appointments at top-rated national carriers.</p>
          <h3>Core Practice Areas</h3>
          <ul>
            <li><strong>Florida Medicare Supplement (Medigap Plan G & N) & Medicare Advantage (Part C)</strong></li>
            <li><strong>Final Expense & Senior Burial Whole Life Insurance</strong></li>
            <li><strong>Indexed Universal Life (IUL) & Tax-Advantaged Retirement Strategies (IRC 7702)</strong></li>
            <li><strong>Fixed Indexed Annuities (FIA) for Principal Protection & Lifetime Income</strong></li>
            <li><strong>Senior Dental, Vision & Hearing Coverage</strong></li>
          </ul>
        </section>
        <section>
          <h2>Our 4-Step Client-First Methodology</h2>
          <ol>
            <li>Comprehensive Health Background & Rx Needs Discovery.</li>
            <li>Market-Wide Rate Comparison Across Top-Rated Carriers.</li>
            <li>Transparent, Bilingual Guidance with Zero Sales Pressure (100% Free).</li>
            <li>Lifetime Client Advocacy & Annual Medicare Prescription Formularies Reviews.</li>
          </ol>
        </section>
      `;
    }
  }

  // 8. Contact Page
  else if (cleanPath === "/contact" || cleanPath === "/es/contacto") {
    title = isEs 
      ? "Contacto y Cotización Gratis | AHB Insurance Solutions Florida" 
      : "Contact Us & Free Quote | AHB Insurance Solutions Florida";
    description = isEs 
      ? "Solicite su cotización gratuita de Medicare, Gastos Finales e IUL. Hable directamente con el corredor Andrés H. Bozo al (352) 225-8389." 
      : "Request your free quote for Medicare, Final Expense, or IUL. Speak directly with broker Andres Bozo at (352) 225-8389.";

    bodyOutline = `
      <header>
        <h1>${title}</h1>
        <p>${description}</p>
      </header>
      <section>
        <h2>Get in Touch Directly</h2>
        <p><strong>Phone Call / WhatsApp:</strong> <a href="tel:+13522258389">+1 (352) 225-8389</a></p>
        <p><strong>Email:</strong> andreshbozo@ahbinsurancesolutions.com</p>
        <p><strong>Address:</strong> 5500 SW Archer Road, Apt H103, Gainesville, FL 32607</p>
      </section>
    `;
  }

  // 8.5 Gainesville Local Landing Page
  else if (
    cleanPath === "/locations/gainesville-fl" || 
    cleanPath === "/es/locations/gainesville-fl" ||
    cleanPath === "/gainesville-fl-insurance" ||
    cleanPath === "/es/seguros-gainesville-fl"
  ) {
    title = isEs
      ? "Gainesville, FL Insurance Broker | Broker de Seguros en Gainesville | AHB Insurance Solutions"
      : "Gainesville, FL Insurance Broker | Medicare, Life & Annuities | AHB Insurance Solutions";
    description = isEs
      ? "Gainesville, FL Insurance Broker: Andrés Bozo (NPN: 21228432). Asesoría independiente en Medicare Medigap (UF Health Shands), Gastos Finales, IUL y Anualidades en el Condado de Alachua (5500 SW Archer Rd). Cotización gratuita: (352) 225-8389."
      : "Gainesville, FL Insurance Broker: Andres Bozo (NPN: 21228432). Independent Medicare Medigap (UF Health Shands), Final Expense, IUL & Annuity advisory across Alachua County (5500 SW Archer Rd). Free quote: (352) 225-8389.";

    if (isEs) {
      bodyOutline = `
        <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <a href="/es/guias-ciudades">Florida</a> &gt; <span>Gainesville FL</span></p></nav>
        <header>
          <h1>Broker de Seguros en Gainesville, FL | Medicare, Gastos Finales y Jubilación</h1>
          <p>${description}</p>
          <div class="broker-contact-badge">
            <p><strong>Broker Licenciado:</strong> Andrés Bozo (NPN: 21228432)</p>
            <p><strong>Dirección:</strong> 5500 SW Archer Road, Apt H103, Gainesville, FL 32607</p>
            <p><strong>Teléfono Directo:</strong> <a href="tel:+13522258389">+1 (352) 225-8389</a></p>
          </div>
        </header>

        <section>
          <h2>Medicare Gainesville: Cobertura y Suplementos Medigap en el Condado de Alachua</h2>
          <p>Gainesville es el epicentro médico del norte de Florida gracias al reconocido sistema hospitalario UF Health Shands Hospital y al HCA Florida North Florida Hospital. Los residentes del Condado de Alachua que dependen de Medicare Original a menudo necesitan protección frente a deducibles y al coseguro del 20% sin límite de la Parte B. Con un Suplemento de Medicare (Medigap Plan G o Plan N), usted obtiene acceso a médicos y especialistas que aceptan Medicare en UF Health Shands, HCA Florida y al Malcom Randall VA Medical Center, sin requerir redes restrictivas HMO ni referidos de médicos primarios.</p>
          <ul>
            <li><strong>Libertad Total de Especialistas:</strong> Consulte a cualquier médico o especialista que acepte Medicare en UF Health Shands y sus centros ambulatorios sin restricciones de red.</li>
            <li><strong>Sin Autorizaciones Previas:</strong> A diferencia de los planes Medicare Advantage locales, Medicare Original y Medigap no imponen barreras de autorización previa para tratamientos médicos aprobados.</li>
            <li><strong>Validez Nacional:</strong> Cobertura válida ante cualquier proveedor que acepte Medicare en Florida y en cualquier estado del país, ideal para quienes viajan con frecuencia.</li>
          </ul>
        </section>

        <section>
          <h2>Final Expense Gainesville: Seguro de Gastos Finales y Entierro</h2>
          <p>Los costos promedio de funerales y cremaciones en Gainesville, Archer, Newberry y High Springs oscilan entre $7,200 y $9,800. Dado que el beneficio único por fallecimiento del Seguro Social federal es de solo $255, una póliza de gastos finales de vida entera ofrece beneficios por fallecimiento de entre $5,000 y $35,000 para sus beneficiarios, con primas niveladas (sujetas a los términos de la póliza) y opciones de emisión simplificada sin examen médico tradicional según la aseguradora.</p>
          <p>Sus seres queridos tienen la potestad de coordinar servicios con funerarias y cementerios locales de Alachua County, tales como Forest Meadows Funeral Home & Cemetery, Williams-Thomas Funeral Homes, Milam Funeral and Cremation Services, Chestnut Funeral Home y Prairie Creek Conservation Cemetery.</p>
        </section>

        <section>
          <h2>IUL Gainesville: Seguro de Vida Universal Indexada para Profesionales y Familias</h2>
          <p>Para la comunidad académica de la University of Florida (UF), el personal médico de UF Health, veteranos y trabajadores del Malcom Randall VA Medical Center, y dueños de empresas locales en Gainesville y Alachua, el IUL (Indexed Universal Life) ofrece una estrategia eficiente para complementar planes 403(b), 401(k) o el Florida Retirement System (FRS).</p>
          <p>Con un piso contractual del 0% en acreditación frente a caídas del índice bursátil de referencia (los costos de póliza continúan deduciéndose) y acceso a préstamos de póliza con ventajas fiscales bajo la Sección 7702 del IRS mientras la póliza permanezca en vigor, el IUL brinda protección por fallecimiento a su familia y potencial de acumulación de valor en efectivo sin penalidades del 10% por edad.</p>
        </section>

        <section>
          <h2>Annuities Gainesville: Anualidades Fijas y Pensión Vitalicia Garantizada</h2>
          <p>Para los jubilados en Gainesville, incluyendo residentes de comunidades como Oak Hammock at UF, The Village y Haile Plantation, las Anualidades Fijas de Garantía Multianual (MYGA) y las Anualidades Fijas Indexadas (FIA) proporcionan protección contractual del capital principal contra la volatilidad bursátil, respaldadas por la solvencia financiera de la compañía aseguradora emisora y la Asociación de Garantía FLAHIGA. Disfrute de crecimiento con impuestos diferidos y opciones de cláusulas de ingresos vitalicios según los términos del contrato.</p>
        </section>

        <section>
          <h2>Andrés Bozo: Su Corredor Independiente de Confianza en Alachua County</h2>
          <p>Andrés Bozo (NPN: 21228432) es un corredor de seguros independiente con licencia activa ante el Departamento de Servicios Financieros de Florida (DFS). Como correduría independiente, AHB Insurance Solutions compara de forma objetiva entre múltiples compañías aseguradoras líderes y solventes a nivel nacional, ofreciendo una orientación personalizada, transparente y 100% gratuita, sin costo adicional ni comisiones cobradas al asegurado.</p>
        </section>

        <section>
          <h2>Dirección, Teléfono y Ubicación de Nuestra Oficina en Gainesville</h2>
          <p><strong>Dirección de la Oficina:</strong> 5500 SW Archer Road, Apt H103, Gainesville, FL 32607 (Condado de Alachua, cerca de Celebration Pointe y Butler Plaza, salida 384 de la autopista I-75).</p>
          <p><strong>Teléfono Directo:</strong> <a href="tel:+13522258389">(352) 225-8389</a></p>
          <p><strong>Correo Electrónico:</strong> andreshbozo@ahbinsurancesolutions.com</p>
          <p><strong>Mapa en Google Maps:</strong> <a href="https://www.google.com/maps/search/?api=1&query=5500+SW+Archer+Road+Apt+H103+Gainesville+FL+32607+USA" target="_blank" rel="noopener noreferrer">Ver mapa e indicaciones de cómo llegar</a></p>
        </section>

        <section>
          <h2>Áreas de Servicio en el Condado de Alachua (Alachua County Service Areas)</h2>
          <p>Atendemos presencialmente con cita previa en nuestra oficina de Archer Road o a domicilio, así como mediante consultas telefónicas y remotas en las siguientes comunidades:</p>
          <ul>
            <li><strong>Gainesville:</strong> Haile Plantation, Tioga, Duckpond, Downtown, Suburban Heights, Millhopper (ZIPs 32601, 32605, 32607, 32608, 32653).</li>
            <li><strong>Archer:</strong> ZIP 32618 (a minutos directos por SW Archer Road).</li>
            <li><strong>Newberry:</strong> ZIP 32669 (familias y jubilados en el oeste de Alachua).</li>
            <li><strong>High Springs:</strong> ZIP 32643 (cobertura integral para el norte del condado).</li>
            <li><strong>Alachua:</strong> ZIP 32615.</li>
            <li><strong>Hawthorne (32640), Micanopy (32667) y Waldo (32694).</strong></li>
          </ul>
        </section>

        <section>
          <h2>Preguntas Frecuentes sobre Seguros en Gainesville, FL (FAQ)</h2>
          <dl>
            <dt><strong>¿Puedo utilizar un Suplemento de Medicare (Medigap) en UF Health Shands Hospital?</strong></dt>
            <dd>Sí, absolutamente. Con un plan Medigap (como Plan G o Plan N), usted puede atenderse con cualquier médico o especialista que acepte Medicare en UF Health Shands, HCA Florida y en cualquier hospital del país, sin restricciones de red ni necesidad de referidos.</dd>

            <dt><strong>¿Dónde está ubicada la oficina de AHB Insurance Solutions en Gainesville?</strong></dt>
            <dd>Nuestra sede física se encuentra en 5500 SW Archer Road, Apt H103, Gainesville, FL 32607. Atendemos a clientes de todo el Condado de Alachua con cita previa, por teléfono al (352) 225-8389 o por videoconferencia.</dd>

            <dt><strong>¿Cobran honorarios por comparar planes o cotizar seguros?</strong></dt>
            <dd>No. Nuestros servicios de consultoría, comparación entre múltiples aseguradoras líderes y tramitación de pólizas son 100% gratuitos para el consumidor. Las aseguradoras nos compensan directamente bajo tarifas reguladas por el estado de Florida.</dd>

            <dt><strong>¿Ofrecen atención bilingüe en español en Gainesville?</strong></dt>
            <dd>Sí. El corredor Andrés Bozo es completamente bilingüe (español e inglés), facilitando que la comunidad hispana de Gainesville y Alachua County comprenda cada detalle de su póliza con claridad.</dd>
          </dl>
        </section>

        <section>
          <h2>Solicite una Consulta Gratuita con Andrés Bozo en Gainesville</h2>
          <p>Comuníquese hoy mismo al <a href="tel:+13522258389">(352) 225-8389</a> para recibir un análisis comparativo personalizado sin costo ni compromiso para Medicare, Gastos Finales, IUL o Anualidades en Gainesville, FL.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <nav aria-label="Breadcrumb"><p><a href="/">Home</a> &gt; <a href="/city-guides">Florida</a> &gt; <span>Gainesville FL</span></p></nav>
        <header>
          <h1>Gainesville, FL Insurance Broker | Medicare, Life & Annuities</h1>
          <p>${description}</p>
          <div class="broker-contact-badge">
            <p><strong>Licensed Broker:</strong> Andres Bozo (NPN: 21228432)</p>
            <p><strong>Office Address:</strong> 5500 SW Archer Road, Apt H103, Gainesville, FL 32607</p>
            <p><strong>Direct Phone:</strong> <a href="tel:+13522258389">+1 (352) 225-8389</a></p>
          </div>
        </header>

        <section>
          <h2>Medicare Gainesville: Coverage & Medigap Supplements in Alachua County</h2>
          <p>Gainesville is North Central Florida's premier medical hub, anchored by the nationally renowned UF Health Shands Hospital system, HCA Florida North Florida Hospital, and the Malcom Randall VA Medical Center. Alachua County seniors on Original Medicare frequently face substantial out-of-pocket liabilities, including the inpatient Part A deductible and the uncapped 20% Part B coinsurance. With a standardized Medicare Supplement (Medigap Plan G or Plan N), you preserve direct access to participating physicians at UF Health Shands and HCA Florida without restrictive HMO provider networks or primary care referral mandates.</p>
          <ul>
            <li><strong>Freedom of Specialists:</strong> See any provider nationwide who accepts Medicare, including world-class specialists at UF Health Shands, without network gating.</li>
            <li><strong>Zero Prior Authorization Hurdles:</strong> Unlike local Medicare Advantage HMOs, Medigap policies eliminate pre-authorization delays for Medicare-covered treatments.</li>
            <li><strong>Nationwide Portability:</strong> Coverage travels with you anywhere in Florida and throughout the entire United States.</li>
          </ul>
        </section>

        <section>
          <h2>Final Expense Gainesville: Burial & Funeral Insurance</h2>
          <p>Traditional funeral and cremation costs across Gainesville, Archer, Newberry, and High Springs typically range between $7,200 and $9,800. Because federal Social Security pays only a $255 one-time lump sum to qualifying surviving spouses, a permanent whole life final expense policy guarantees $5,000 to $35,000 in immediate cash death benefits for your loved ones, with locked lifetime rates and simplified-issue underwriting that requires no traditional medical exams.</p>
          <p>Your beneficiaries maintain complete freedom to coordinate arrangements with respected local Alachua County funeral homes and cemeteries, including Forest Meadows Funeral Home & Cemetery, Williams-Thomas Funeral Homes, Milam Funeral and Cremation Services, Chestnut Funeral Home, and Prairie Creek Conservation Cemetery.</p>
        </section>

        <section>
          <h2>IUL Gainesville: Indexed Universal Life for University & Healthcare Professionals</h2>
          <p>For faculty and staff at the University of Florida (UF), clinical personnel at UF Health Shands, healthcare workers at the VA Medical Center, and local business owners across Gainesville, an Indexed Universal Life (IUL) policy serves as an efficient vehicle to complement existing 403(b), 401(k), or Florida Retirement System (FRS) pensions.</p>
          <p>With a contractual 0% floor against market index declines and tax-advantaged policy loan access under IRS Section 7702 while the policy remains active, an IUL protects your family with income-tax-free death benefits while building cash accumulation potential without early withdrawal age penalties.</p>
        </section>

        <section>
          <h2>Annuities Gainesville: Fixed & Indexed Guaranteed Retirement Income</h2>
          <p>For retirees residing in Gainesville's active retirement communities, such as Oak Hammock at UF, The Village, and Haile Plantation, Multi-Year Guarantee Annuities (MYGA) and Fixed Indexed Annuities (FIA) deliver principal preservation backed by insurer statutory reserves and the Florida Life and Health Insurance Guaranty Association (FLAHIGA). Enjoy triple-compounding tax deferral and optional guaranteed lifetime income riders that ensure you cannot outlive your retirement nest egg.</p>
        </section>

        <section>
          <h2>Andres Bozo: Your Local Independent Insurance Broker in Alachua County</h2>
          <p>Andres Bozo (NPN: 21228432) is a licensed independent insurance broker regulated by the Florida Department of Financial Services (DFS). As an independent agency, AHB Insurance Solutions objectively compares products across 80+ top-rated carriers, providing unbiased guidance and zero broker fees to clients.</p>
        </section>

        <section>
          <h2>Gainesville Office Location, Hours & Contact Details</h2>
          <p><strong>Office Location:</strong> 5500 SW Archer Road, Apt H103, Gainesville, FL 32607 (Alachua County, near Celebration Pointe & Butler Plaza, off I-75 Exit 384).</p>
          <p><strong>Direct Phone:</strong> <a href="tel:+13522258389">(352) 225-8389</a></p>
          <p><strong>Email:</strong> andreshbozo@ahbinsurancesolutions.com</p>
          <p><strong>Google Maps:</strong> <a href="https://www.google.com/maps/search/?api=1&query=5500+SW+Archer+Road+Apt+H103+Gainesville+FL+32607+USA" target="_blank" rel="noopener noreferrer">View Map & Driving Directions</a></p>
        </section>

        <section>
          <h2>Service Communities Across Alachua County</h2>
          <p>We consult in person by appointment at our SW Archer Road office, make home visits, and offer virtual consultations across all Alachua County communities:</p>
          <ul>
            <li><strong>Gainesville:</strong> Haile Plantation, Tioga, Duckpond, Downtown, Suburban Heights, Millhopper (ZIP codes 32601, 32605, 32607, 32608, 32653).</li>
            <li><strong>Archer:</strong> ZIP 32618 (minutes away along SW Archer Road).</li>
            <li><strong>Newberry:</strong> ZIP 32669 (families and retirees in western Alachua County).</li>
            <li><strong>High Springs:</strong> ZIP 32643 (northern Alachua County).</li>
            <li><strong>Alachua:</strong> ZIP 32615.</li>
            <li><strong>Hawthorne (32640), Micanopy (32667), and Waldo (32694).</strong></li>
          </ul>
        </section>

        <section>
          <h2>Frequently Asked Questions About Gainesville Insurance Services</h2>
          <dl>
            <dt><strong>Can I be treated at UF Health Shands Hospital with a Medicare Supplement (Medigap) plan?</strong></dt>
            <dd>Yes. UF Health Shands Hospital and outpatient facilities accept Original Medicare and standardized Medigap policies (such as Plan G and Plan N), subject to Medicare and Medigap rules, with no network restrictions or referral requirements.</dd>

            <dt><strong>Where is the AHB Insurance Solutions office located in Gainesville?</strong></dt>
            <dd>Our office is located at 5500 SW Archer Road, Apt H103, Gainesville, FL 32607 (Alachua County, near Celebration Pointe and Butler Plaza). We consult in person by appointment or by phone at (352) 225-8389.</dd>

            <dt><strong>Do you charge any consultation or broker fees in Gainesville?</strong></dt>
            <dd>No, never. Our independent brokerage consultations, carrier rate comparisons, and enrollment assistance are 100% free with zero fees to you.</dd>

            <dt><strong>Does broker Andres Bozo provide bilingual consultations in Spanish?</strong></dt>
            <dd>Yes. Andres Bozo (NPN: 21228432) is a licensed Florida insurance broker who is fluent in both English and Spanish, ensuring clear and transparent policy reviews for Gainesville's Hispanic community.</dd>
          </dl>
        </section>

        <section>
          <h2>Request a Free Consultation with Andres Bozo in Gainesville</h2>
          <p>Call <a href="tel:+13522258389">(352) 225-8389</a> or submit our online form for a personalized, zero-obligation comparison of Medicare, Final Expense, IUL, or Annuity solutions in Gainesville, FL.</p>
        </section>
      `;
    }
  }

  // 8.6 Legal & Compliance Pages
  else if (
    cleanPath === "/terms" || 
    cleanPath === "/es/terminos" || 
    cleanPath === "/terminos" ||
    cleanPath === "/privacy" || 
    cleanPath === "/es/privacidad" || 
    cleanPath === "/privacidad"
  ) {
    const isTerms = cleanPath.includes("term");
    if (isTerms) {
      title = isEs ? "Términos de Servicio | AHB Insurance Solutions" : "Terms of Service | AHB Insurance Solutions";
      description = isEs 
        ? "Términos y condiciones de uso del portal de AHB Insurance Solutions. Información legal sobre servicios de corretaje de seguros en Florida."
        : "Terms of service and legal conditions for using AHB Insurance Solutions online portal in Florida.";
    } else {
      title = isEs ? "Política de Privacidad | AHB Insurance Solutions" : "Privacy Policy | AHB Insurance Solutions";
      description = isEs 
        ? "Política de privacidad y protección de datos personales de AHB Insurance Solutions. Compromiso con la confidencialidad de nuestros clientes en Florida."
        : "Privacy policy and client data protection commitments for AHB Insurance Solutions in Florida.";
    }

    bodyOutline = `
      <header>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(description)}</p>
      </header>
      <section>
        <h2>AHB Insurance Solutions Legal Notices</h2>
        <p>AHB Insurance Solutions LLC is an independent insurance brokerage licensed by the Florida Department of Financial Services (DFS). Principal Broker Andres H. Bozo (NPN: 21228432).</p>
      </section>
    `;
  }

  // 8.7 City Guides Hub Page
  else if (cleanPath === "/city-guides" || cleanPath === "/es/guias-ciudades") {
    title = isEs 
      ? "Guías de Seguros y Medicare por Ciudad en Florida | AHB" 
      : "Florida City Medicare & Insurance Guides | AHB";
    description = isEs 
      ? "Directorio de guías locales de Medicare, Gastos Finales e IUL en Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale y Gainesville con Andrés Bozo." 
      : "Local insurance & healthcare guide directory across Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale, West Palm Beach & Gainesville with Andres Bozo.";

    const cityListHtml = FLORIDA_CITIES.map(c => {
      const cTitle = isEs ? c.taglineEs : c.taglineEn;
      const cDesc = isEs ? c.medicareOverviewEs : c.medicareOverviewEn;
      const cLink = isEs ? `/es/ciudades/${c.slug}` : `/cities/${c.slug}`;
      return `
        <article style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem;">
          <h2><a href="${cLink}">${escapeHtml(c.cityName)}, FL Insurance Guide</a></h2>
          <p><strong>${escapeHtml(cTitle)}</strong></p>
          <p>${escapeHtml(cDesc)}</p>
          <p><em>Hospitals served: ${escapeHtml(c.hospitals.join(", "))}</em></p>
        </article>
      `;
    }).join("\n");

    bodyOutline = `
      <header>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(description)}</p>
      </header>
      <main>
        <section>
          <h2>Explore Florida City Guides</h2>
          ${cityListHtml}
        </section>
      </main>
    `;
  }

  // 8.8 Individual Dynamic City Guides (/cities/:slug or /es/ciudades/:slug)
  else if (cleanPath.startsWith("/cities/") || cleanPath.startsWith("/es/ciudades/")) {
    const citySlug = cleanPath.startsWith("/cities/") ? cleanPath.replace("/cities/", "") : cleanPath.replace("/es/ciudades/", "");
    const city = FLORIDA_CITIES.find(c => c.slug === citySlug);

    if (city) {
      title = isEs 
        ? `Guía de Seguros y Medicare en ${city.cityName}, FL | AHB` 
        : `${city.cityName}, FL Medicare & Life Insurance Guide | AHB`;
      description = isEs 
        ? `Guía local de Suplementos de Medicare, Gastos Finales y seguro IUL en ${city.cityName} y ${city.county}. Compare precios gratis con el broker Andrés Bozo NPN 21228432.` 
        : `Local Medicare Supplement, Final Expense burial insurance & IUL guide for ${city.cityName} and ${city.county}. Compare top rates with Andres Bozo NPN 21228432.`;

      const activeFaqs = isEs ? city.faqsEs : city.faqsEn;
      const faqHtml = activeFaqs.map(f => `
        <div style="margin-bottom: 1rem;">
          <dt style="font-weight: 700; color: #0f172a;">${escapeHtml(f.question)}</dt>
          <dd style="color: #334155; margin-left: 0;">${escapeHtml(f.answer)}</dd>
        </div>
      `).join("\n");

      bodyOutline = `
        <header>
          <h1>${isEs ? `Guía de Seguros de Medicare, Gastos Finales e IUL en ${city.cityName}, FL` : `${city.cityName}, FL Medicare, Final Expense & IUL Insurance Guide`}</h1>
          <p><strong>${escapeHtml(isEs ? city.taglineEs : city.taglineEn)}</strong></p>
          <p>${escapeHtml(description)}</p>
        </header>

        <section>
          <h2>${isEs ? `Coordinación de Medicare y Medigap en ${city.cityName} (${city.county})` : `Medicare & Medigap Coordination in ${city.cityName} (${city.county})`}</h2>
          <p>${escapeHtml(isEs ? city.medicareOverviewEs : city.medicareOverviewEn)}</p>
          <p><strong>${isEs ? "Hospitales y Centros Médicos Locales:" : "Key Hospitals & Healthcare Networks:"}</strong> ${escapeHtml(city.hospitals.join(", "))}</p>
        </section>

        <section>
          <h2>${isEs ? `Seguro de Gastos Finales y Entierro en ${city.cityName}` : `Final Expense & Burial Life Insurance in ${city.cityName}`}</h2>
          <p>${escapeHtml(isEs ? city.finalExpenseOverviewEs : city.finalExpenseOverviewEn)}</p>
          <p><em>${isEs ? "Costo promedio de funeral en la zona:" : "Average local funeral & cremation cost:"} ${escapeHtml(city.avgFuneralCost)}</em></p>
        </section>

        <section>
          <h2>${isEs ? `Seguro de Vida Universal Indexada (IUL) en ${city.cityName}` : `Indexed Universal Life (IUL) Retirement Planning in ${city.cityName}`}</h2>
          <p>${escapeHtml(isEs ? city.iulOverviewEs : city.iulOverviewEn)}</p>
        </section>

        <section>
          <h2>${isEs ? `Comunidades y Vecindarios Atendidos en ${city.cityName}` : `Senior Demographics & Neighborhoods Served in ${city.cityName}`}</h2>
          <p><strong>${isEs ? "Población de Adultos Mayores:" : "Senior Population:"}</strong> ${escapeHtml(city.populationSeniors)}</p>
          <p><strong>${isEs ? "Vecindarios:" : "Local Neighborhoods:"}</strong> ${escapeHtml(city.neighborhoods.join(", "))}</p>
        </section>

        <section>
          <h2>${isEs ? `Preguntas Frecuentes sobre Seguros en ${city.cityName}` : `Frequently Asked Questions in ${city.cityName}`}</h2>
          <dl>
            ${faqHtml}
          </dl>
        </section>

        <section>
          <h2>${isEs ? `Asesoría Gratuita con el Broker Andrés Bozo en ${city.cityName}` : `Free Insurance Consultation in ${city.cityName} with Andres Bozo`}</h2>
          <p>${isEs ? "Comuníquese directamente con el broker licenciado Andrés Bozo (NPN 21228432) al (352) 225-8389 para recibir su análisis comparativo sin costo." : "Call licensed independent broker Andres Bozo (NPN 21228432) directly at +1 (352) 225-8389 for a free rate comparison across top-rated carriers."}</p>
        </section>
      `;
    }
  }

  // 9. Localized Landing Pages (final-expense-miami, burial-insurance-tampa, iul-retirement-tampa, etc.)
  else {
    const landingPaths = [
      "/final-expense-miami",
      "/burial-insurance-tampa",
      "/es/seguro-gastos-finales-tampa",
      "/es/seguro-gastos-finales-florida",
      "/iul-retirement-tampa",
      "/es/iul-jubilacion-tampa",
      "/orlando-spanish-insurance",
      "/spanish-insurance-orlando",
      "/annuities-florida",
      "/es/anualidades-florida",
      "/annuities",
      "/es/anualidades",
      "/dental-vision-florida",
      "/es/dental-vision-florida"
    ];

    if (landingPaths.includes(cleanPath)) {
      if (cleanPath === "/final-expense-miami" || cleanPath === "/es/seguro-gastos-finales-florida") {
        title = isEs 
          ? "Seguro de Gastos Finales y Entierro en Miami, FL | AHB" 
          : "Miami, FL Final Expense & Burial Insurance | AHB";
        description = isEs 
          ? "Seguro de vida entera para gastos finales y entierro en Miami y Miami-Dade. Cobertura de $5,000 a $35,000 con tarifas fijas. Cotización gratis." 
          : "Permanent whole life burial insurance in Miami & Miami-Dade County. $5,000 to $35,000 cash benefits & locked rates. Free broker quote: (352) 225-8389.";
        
        bodyOutline = `
          <header>
            <h1>${escapeHtml(title)}</h1>
            <p>${escapeHtml(description)}</p>
          </header>
          <section>
            <h2>Miami Burial & Final Expense Solutions</h2>
            <p>Ensure funeral and burial cost protection for your loved ones with whole life cash benefit plans from $5,000 to $35,000 in Miami, Hialeah, Kendall, and Miami-Dade County. Many simplified-issue policies require no traditional medical exam, with level premiums locked for life.</p>
          </section>
        `;
      } else if (cleanPath === "/burial-insurance-tampa" || cleanPath === "/es/seguro-gastos-finales-tampa") {
        title = isEs 
          ? "Seguro de Entierro y Gastos Finales en Tampa, FL | AHB" 
          : "Tampa, FL Burial & Final Expense Insurance | AHB";
        description = isEs 
          ? "Seguro de entierro y funeral en Tampa y Condado de Hillsborough. Cobertura de $5,000 a $35,000 para adultos mayores. Compare precios con Andrés Bozo." 
          : "Burial & funeral expense insurance in Tampa & Hillsborough County. $5,000 to $35,000 level benefits for seniors. Compare top rates with Andres Bozo.";

        bodyOutline = `
          <header>
            <h1>${escapeHtml(title)}</h1>
            <p>${escapeHtml(description)}</p>
          </header>
          <section>
            <h2>Tampa Senior Burial Insurance Planning</h2>
            <p>Shield your family in Tampa, St. Petersburg, and Hillsborough County from unexpected funeral costs. Permanent whole life policies with locked rates and $5,000 to $35,000 cash payouts directly to your beneficiaries.</p>
          </section>
        `;
      } else if (cleanPath === "/iul-retirement-tampa" || cleanPath === "/es/iul-jubilacion-tampa") {
        title = isEs 
          ? "Guía de Seguro IUL y Jubilación en Tampa, FL | AHB" 
          : "Tampa, FL IUL & Retirement Insurance Guide | AHB";
        description = isEs 
          ? "Descubra el seguro de Vida Universal Indexada (IUL) en Tampa y el Condado de Hillsborough. Piso del 0% y préstamos exentos de impuestos. Consulta gratis." 
          : "Discover Indexed Universal Life (IUL) insurance in Tampa & Hillsborough County. 0% market floor & tax-free policy loans. Free broker quote: (352) 225-8389.";

        bodyOutline = `
          <header>
            <h1>${escapeHtml(title)}</h1>
            <p>${escapeHtml(description)}</p>
          </header>
          <section>
            <h2>Tampa Tax-Advantaged Retirement & Life Insurance</h2>
            <p>Learn how Indexed Universal Life (IUL) insurance helps professionals and business owners in Tampa accumulation cash value with a contractual 0% floor against market index drops and tax-free policy loan options under IRS Section 7702.</p>
          </section>
        `;
      } else if (cleanPath === "/orlando-spanish-insurance" || cleanPath === "/spanish-insurance-orlando") {
        title = isEs 
          ? "Seguros de Vida y Medicare en Orlando, FL | AHB" 
          : "Orlando Spanish Insurance Services | AHB Solutions";
        description = isEs 
          ? "Asesoría bilingüe de seguros en Orlando y Condado de Orange. Medicare Suplementario, Gastos Finales e IUL con el broker Andrés Bozo (NPN 21228432)." 
          : "Bilingual insurance brokerage services in Orlando & Orange County. Medicare Supplement, Final Expense, and IUL guidance from Andres Bozo NPN 21228432.";

        bodyOutline = `
          <header>
            <h1>${escapeHtml(title)}</h1>
            <p>${escapeHtml(description)}</p>
          </header>
          <section>
            <h2>Bilingual Insurance Advisory in Orlando, FL</h2>
            <p>Independent insurance brokerage for Medicare, Final Expense burial coverage, and IUL retirement plans in Orlando, Kissimmee, and Orange County with licensed broker Andres Bozo.</p>
          </section>
        `;
      } else if (cleanPath.includes("annuities") || cleanPath.includes("anualidades")) {
        title = isEs
          ? "Anualidades Fijas en Florida: MYGA, FIA y Opciones de Ingresos | AHB Insurance"
          : "Florida Fixed Annuities: MYGA, FIA & Retirement Income Options | AHB Insurance";
        description = isEs
          ? "Guía completa sobre anualidades fijas en Florida: tradicionales, MYGA, indexadas (FIA) y SPIA. Tasas garantizadas, acreditación, liquidez, comparativa con CD e ingresos de jubilación con el broker Andrés H. Bozo."
          : "Comprehensive Florida guide to fixed annuities, MYGAs, Fixed Indexed Annuities (FIA), and SPIAs. Learn interest crediting, liquidity, surrender charges, CD comparison, and lifetime income options with licensed broker Andres H. Bozo.";

        if (isEs) {
          bodyOutline = `
            <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <span>Anualidades y Retiro Seguro en Florida</span></p></nav>
            <header>
              <h1>Anualidades Fijas en Florida: MYGA, FIA y Opciones de Ingresos de Jubilación</h1>
              <p>${description}</p>
              <div class="broker-contact-badge">
                <p><strong>Broker Licenciado:</strong> Andrés Bozo (NPN: 21228432)</p>
                <p><strong>Teléfono Directo:</strong> <a href="tel:+13522258389">+1 (352) 225-8389</a></p>
              </div>
            </header>
            <main>
              <section>
                <h2>¿Qué es una Anualidad Fija?</h2>
                <p>Una anualidad fija es un contrato legalmente vinculante emitido por una compañía de seguros de vida con licencia en Florida. Su propósito primordial es la preservación del capital, el crecimiento con impuestos diferidos mientras los fondos permanezcan dentro del contrato y la provisión de mecanismos contractuales para transformar el patrimonio acumulado en un flujo de ingresos predecible e inagotable durante la jubilación. El capital y los intereses acreditados están respaldados por las reservas estatutarias de la cuenta general de la aseguradora y por la Asociación de Garantía de Seguros de Vida y Salud de Florida (FLAHIGA).</p>
                <ul>
                  <li><strong>Fase de Acumulación:</strong> Su dinero crece protegido de la volatilidad del mercado bursátil y devenga intereses compuestos sin sufrir la deducción anual de impuestos sobre ganancias (sin formularios 1099 anuales mientras no retire).</li>
                  <li><strong>Fase de Distribución:</strong> Usted determina cómo acceder a su capital: retiros parciales libres de penalización (según contrato), cobro íntegro al vencimiento o una pensión vitalicia mensual garantizada de por vida.</li>
                </ul>
              </section>

              <section>
                <h2>Modalidades de Anualidades en Florida: Tradicionales, MYGA, FIA y SPIA</h2>
                <article>
                  <h3>1. Anualidades Fijas Tradicionales</h3>
                  <p>Declaran una tasa de interés periódica revisable anualmente con un piso mínimo garantizado por ley estatal (generalmente 1% a 3%) por debajo del cual el rendimiento nunca puede caer.</p>
                </article>
                <article>
                  <h3>2. Anualidades de Garantía Multianual (MYGA)</h3>
                  <p>Bloquean una tasa de interés fija exacta durante un período multianual pactado (3, 5, 7 o 10 años). Funcionan de manera similar a un certificado bancario pero con crecimiento con impuestos diferidos y respaldo de aseguradora.</p>
                </article>
                <article>
                  <h3>3. Anualidades Fijas Indexadas (FIA)</h3>
                  <p>Vinculan su potencial de crecimiento al desempeño de un índice financiero externo (como el S&P 500) a través de topes (Cap Rates) o tasas de participación, con un piso contractual estricto del 0% que blinda su capital contra cualquier caída bursátil.</p>
                </article>
                <article>
                  <h3>4. Anualidades Inmediatas de Prima Única (SPIA)</h3>
                  <p>Diseñadas para personas que necesitan un flujo de ingresos inmediato. Se aporta un pago único y la aseguradora comienza a desembolsar pagos mensuales garantizados de por vida a los 30 días.</p>
                </article>
              </section>

              <section>
                <h2>Ingresos Vitalicios Garantizados: Cláusula GLWB vs. Anuitización</h2>
                <p>El riesgo de longevidad (sobrevivir a sus propios ahorros) es la mayor preocupación de los jubilados modernos en Florida. Las anualidades resuelven este desafío mediante dos estructuras:</p>
                <ul>
                  <li><strong>Cláusula de Retiro Vitalicio Garantizado (GLWB / Income Rider):</strong> Calcula una Base de Ingresos contractual que crece anualmente a una tasa de roll-up garantizada. Al activarla, garantiza cheques mensuales de por vida sin perder el control de su saldo en efectivo.</li>
                  <li><strong>Anuitización Tradicional:</strong> Conversión irrevocable del saldo en un flujo mensual garantizado calculado actuarialmente (Vida Única o Mancomunada con Cónyuge).</li>
                </ul>
              </section>

              <section>
                <h2>Mecánica de Liquidez y Retiros Libres de Penalización</h2>
                <p>Las anualidades modernas en Florida no son contratos rígidos. Incluyen provisiones de liquidez estructuradas:</p>
                <ul>
                  <li><strong>Retiros Libres de Penalización:</strong> La mayoría de los contratos permiten retirar hasta un 10% del saldo acumulado cada año a partir del segundo año sin ningún cargo por rescate.</li>
                  <li><strong>Acceso a Intereses Devengados:</strong> Múltiples productos permiten retirar mensualmente los intereses ganados para complementar el ingreso corriente.</li>
                  <li><strong>Exenciones por Convalecencia o Enfermedad Terminal:</strong> Cláusulas que liberan hasta el 100% del capital sin penalizaciones si el titular es ingresado en un centro de enfermería especializada o diagnosticado con una condición terminal.</li>
                </ul>
              </section>

              <section>
                <h2>Comparativa: Anualidad MYGA vs. Certificado de Depósito Bancario (CD)</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Factor</th>
                      <th>Anualidad MYGA</th>
                      <th>Certificado de Depósito (CD) Bancario</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tratamiento Fiscal</td>
                      <td>Impuestos diferidos (Sin 1099 anual)</td>
                      <td>Tributa anualmente como ingreso ordinario (1099-INT)</td>
                    </tr>
                    <tr>
                      <td>Mecanismo de Respaldo</td>
                      <td>Reservas estatutarias de aseguradora y FLAHIGA</td>
                      <td>Asegurado por la FDIC hasta $250,000 por banco</td>
                    </tr>
                    <tr>
                      <td>Liquidez Anual</td>
                      <td>Hasta 10% anual libre de penalización (según contrato)</td>
                      <td>Penalidad severa de intereses por retiro anticipado</td>
                    </tr>
                    <tr>
                      <td>Conversión a Pensión</td>
                      <td>Opción de cheques garantizados de por vida</td>
                      <td>No ofrece opciones de ingresos vitalicios</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section>
                <h2>Ventajas Fiscales e Intercambios Calificados bajo Sección 1035 del IRS</h2>
                <p>El Código IRS Sección 1035 permite transferir fondos directamente de una anualidad antigua (o valor en efectivo de un seguro de vida) hacia una nueva anualidad sin desencadenar un evento fiscal inmediato. Esto le permite modernizar pólizas antiguas con tasas deprimidas hacia contratos contemporáneos con rendimientos sustancialmente superiores.</p>
              </section>

              <section>
                <h2>Preguntas Frecuentes sobre Anualidades en Florida</h2>
                <dl>
                  <dt><strong>¿Qué es una anualidad fija y cómo protege el capital en Florida?</strong></dt>
                  <dd>Una anualidad fija es un contrato legalmente vinculante emitido por una compañía de seguros de vida con licencia en Florida. A diferencia de las inversiones en bolsa, el capital está respaldado por las reservas estatutarias y la cartera de bonos de grado de inversión de la aseguradora. El contrato ofrece un crecimiento de intereses compuesto con diferimiento fiscal y un piso contractual que protege su saldo contra pérdidas directas del mercado.</dd>

                  <dt><strong>¿Cuál es la diferencia exacta entre una anualidad tradicional, una MYGA y una FIA?</strong></dt>
                  <dd>Una anualidad fija tradicional declara una tasa periódica revisable anualmente con una tasa mínima garantizada. Una MYGA (Multi-Year Guarantee Annuity) bloquea una tasa de interés fija exacta durante un período multianual pactado (por ejemplo, 3, 5, 7 o 10 años). Una Anualidad Indexada Fija (FIA) ofrece un rendimiento vinculado al desempeño de un índice bursátil externo (como el S&P 500) manteniendo siempre un piso garantizado del 0% para evitar pérdidas de capital.</dd>

                  <dt><strong>¿Cómo funciona el diferimiento fiscal (Tax Deferral) en las anualidades?</strong></dt>
                  <dd>En una anualidad, usted no recibe formularios 1099-INT anuales sobre los intereses ganados mientras los fondos permanezcan dentro del contrato. El dinero que habría pagado en impuestos cada año permanece dentro de la cuenta devengando intereses sobre intereses (interés compuesto triple). Los impuestos sobre las ganancias solo se pagan cuando se realizan retiros.</dd>

                  <dt><strong>¿Qué liquidez tengo disponible si necesito dinero de emergencia?</strong></dt>
                  <dd>La gran mayoría de los contratos modernos de anualidades en Florida incluyen una provisión de liquidez anual libre de penalización (penalty-free withdrawal), que suele permitir retirar hasta un 10% del saldo acumulado cada año tras el primer aniversario de la póliza. Asimismo, muchos contratos incluyen cláusulas de exención por internamiento en hogares de ancianos o enfermedades terminales que liberan hasta el 100% del capital sin cargos por rescate.</dd>

                  <dt><strong>¿Qué sucede al vencer el plazo de una anualidad MYGA?</strong></dt>
                  <dd>Al término del plazo contractual, se abre una ventana de gracia de 30 días con tres alternativas: 1) Retirar la totalidad de su capital y ganancias en un pago único; 2) Realizar un intercambio calificado bajo la Sección 1035 del IRS hacia una nueva anualidad con mejores tasas; o 3) Permitir que la póliza se renueve bajo la tasa vigente de la aseguradora.</dd>

                  <dt><strong>¿Cómo se comparan las anualidades con los Certificados de Depósito (CD) bancarios?</strong></dt>
                  <dd>Los CD bancarios están respaldados por la FDIC y generan impuestos anuales ordinarios (Formulario 1099-INT). Las anualidades MYGA ofrecen diferimiento fiscal, están respaldadas por las reservas de la aseguradora y por FLAHIGA, permiten retiros parciales anuales y pueden convertirse en ingresos vitalicios garantizados que no se agotan.</dd>

                  <dt><strong>¿Qué es un intercambio calificado según la Sección 1035 del IRS?</strong></dt>
                  <dd>La Sección 1035 del Código de Rentas Internas permite transferir fondos directamente de una anualidad existente a una nueva anualidad como un intercambio libre de impuestos, preservando su base de costo sin tributar en ese momento.</dd>

                  <dt><strong>¿Cómo garantiza una anualidad un flujo de ingresos de por vida (Lifetime Income)?</strong></dt>
                  <dd>Mediante una Cláusula de Retiro Vitalicio Garantizado (GLWB / Income Rider). La aseguradora le paga un porcentaje anual garantizado por el resto de su vida, incluso si el valor de la cuenta en efectivo llega a cero debido a una larga longevidad.</dd>
                </dl>
              </section>

              <section>
                <h2>Solicite una Comparación de Tasas de Anualidades en Florida</h2>
                <p>Hable con el corredor independiente Andrés Bozo (NPN: 21228432) al <a href="tel:+13522258389">(352) 225-8389</a> para comparar las tasas de anualidades fijas más altas disponibles hoy en Florida sin comisiones ni cargos de intermediación.</p>
              </section>
            </main>
          `;
        } else {
          bodyOutline = `
            <nav aria-label="Breadcrumb"><p><a href="/">Florida Insurance Portal</a> &gt; <span>Florida Fixed Annuities</span></p></nav>
            <header>
              <h1>Florida Fixed Annuities: MYGA, FIA & Retirement Income Options</h1>
              <p>${description}</p>
              <div class="broker-contact-badge">
                <p><strong>Licensed Broker:</strong> Andres Bozo (NPN: 21228432)</p>
                <p><strong>Direct Phone:</strong> <a href="tel:+13522258389">+1 (352) 225-8389</a></p>
              </div>
            </header>
            <main>
              <section>
                <h2>What Is a Fixed Annuity?</h2>
                <p>A fixed annuity is a legally binding contract between an individual and a state-licensed life insurance company. Its primary purpose is to provide principal preservation, tax-deferred growth while funds remain in the annuity (subject to applicable tax rules), and contractual mechanisms to convert accumulated savings into predictable retirement income options, backed by the claims-paying ability of the issuing insurer. Principal and credited interest are supported by the insurer's general account statutory reserves and conservative investment portfolio, alongside state guaranty protections from the Florida Life and Health Insurance Guaranty Association (FLAHIGA).</p>
                <ul>
                  <li><strong>Accumulation Phase:</strong> Your principal earns contractually guaranteed interest or index-linked growth without annual 1099 tax erosion while funds remain in the contract.</li>
                  <li><strong>Distribution Phase:</strong> You choose how to access your assets: via penalty-free withdrawals (where permitted by contract), a lump-sum payout at maturity, or a guaranteed lifetime income stream backed by the insurer.</li>
                </ul>
              </section>

              <section>
                <h2>Core Florida Annuity Categories: Traditional, MYGA, FIA & SPIA</h2>
                <article>
                  <h3>1. Traditional Fixed Annuities</h3>
                  <p>Traditional fixed annuities declare an annual interest rate credited to your contract value. Key structural elements include an initial declared rate for 1 to 3 years and a contractual minimum lifetime floor (typically 1.0% to 3.0%) mandated by state regulation below which the yield cannot fall.</p>
                </article>
                <article>
                  <h3>2. Multi-Year Guarantee Annuities (MYGA)</h3>
                  <p>A Multi-Year Guarantee Annuity (MYGA) locks in a fixed, guaranteed annual interest rate for a dedicated term (such as 3, 5, 7, or 10 years). The insurer contractually guarantees that fixed yield for the duration of the guarantee period, delivering certainty and triple compounding without market exposure.</p>
                </article>
                <article>
                  <h3>3. Fixed Indexed Annuities (FIA)</h3>
                  <p>A Fixed Indexed Annuity (FIA) offers interest crediting potential linked to an external financial benchmark (such as the S&P 500), combined with protection against index declines. With a strict contractual 0% floor, market index downturns never reduce your credited principal.</p>
                </article>
                <article>
                  <h3>4. Single Premium Immediate Annuities (SPIA)</h3>
                  <p>Designed for individuals requiring immediate guaranteed cash flow. You deposit a single lump sum, and the insurer begins paying guaranteed monthly checks immediately (typically within 30 days).</p>
                </article>
              </section>

              <section>
                <h2>Guaranteed Lifetime Retirement Income: GLWB vs. Annuitization</h2>
                <p>Longevity risk—outliving one's accumulated assets—is a premier concern for Florida retirees. Fixed annuities address this through two distinct structures:</p>
                <ul>
                  <li><strong>Guaranteed Lifetime Withdrawal Benefit (GLWB):</strong> An optional living benefit rider that tracks a contractual Income Base compounding at a guaranteed roll-up rate. When activated, the insurer disburses a lifetime payout percentage every year, even if cash surrender value reaches zero.</li>
                  <li><strong>Traditional Annuitization:</strong> Irrevocably converting contract balance into a guaranteed income stream based on life expectancy (Single Life or Joint & Survivor).</li>
                </ul>
              </section>

              <section>
                <h2>Liquidity Provisions & Penalty-Free Withdrawals</h2>
                <p>Modern Florida fixed annuities provide structured liquidity provisions, subject to contract terms:</p>
                <ul>
                  <li><strong>Penalty-Free Withdrawal Provisions:</strong> Most contracts permit withdrawals of up to 10% of accumulated contract value each year starting after Year 1 without surrender charges.</li>
                  <li><strong>Earned Interest Access:</strong> Many contracts allow systematic monthly withdrawal of credited interest to generate current cash flow.</li>
                  <li><strong>Confinement & Terminal Illness Waiver Riders:</strong> Surrender charges are typically waived if you require skilled nursing home care or receive a terminal diagnosis.</li>
                </ul>
              </section>

              <section>
                <h2>Comparing Fixed Annuities (MYGAs) and Bank Certificates of Deposit (CDs)</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Factor</th>
                      <th>Fixed Annuity (MYGA)</th>
                      <th>Bank Certificate of Deposit (CD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tax Treatment</td>
                      <td>Tax-deferred growth (No annual 1099-INT)</td>
                      <td>Taxed annually as ordinary income (Form 1099-INT)</td>
                    </tr>
                    <tr>
                      <td>Backing & Guarantees</td>
                      <td>Insurer statutory reserves & FLAHIGA</td>
                      <td>FDIC insured up to $250,000 per depositor</td>
                    </tr>
                    <tr>
                      <td>Annual Liquidity</td>
                      <td>Up to 10% penalty-free withdrawals (per contract)</td>
                      <td>Severe interest penalties on early withdrawal</td>
                    </tr>
                    <tr>
                      <td>Lifetime Income Conversion</td>
                      <td>Can convert into guaranteed lifetime pension</td>
                      <td>No lifetime income options available</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section>
                <h2>Tax Advantages & IRS Section 1035 Exchanges</h2>
                <p>Section 1035 of the Internal Revenue Code permits direct, tax-free rollover of funds from an existing annuity (or cash value life policy) into a new annuity. This enables Florida savers to upgrade older, low-yielding contracts into modern annuities offering higher yields and superior lifetime benefits without triggering current income taxes.</p>
              </section>

              <section>
                <h2>Frequently Asked Questions About Florida Fixed Annuities</h2>
                <dl>
                  <dt><strong>What is a fixed annuity and how does it protect retirement principal in Florida?</strong></dt>
                  <dd>A fixed annuity is a legally binding contract issued by a state-licensed life insurance company. Unlike stock market investments, your principal is backed by the insurer's general account statutory reserves and conservative investment-grade bond portfolio. The contract provides tax-deferred compound interest growth and a contractual guarantee that protects your balance against direct market downturns.</dd>

                  <dt><strong>What is the exact difference between a traditional fixed annuity, a MYGA, and an FIA?</strong></dt>
                  <dd>A traditional fixed annuity declares an annual interest rate with a contractual minimum floor. A Multi-Year Guarantee Annuity (MYGA) locks in an exact, guaranteed fixed yield for a committed term (such as 3, 5, 7, or 10 years). A Fixed Indexed Annuity (FIA) links growth potential to an external market benchmark (like the S&P 500) via caps or participation rates, while maintaining a strict 0% contractual floor to ensure you never lose principal during market downturns.</dd>

                  <dt><strong>How does tax deferral work in fixed annuities?</strong></dt>
                  <dd>With an annuity, tax is deferred while funds remain within the contract, subject to applicable tax rules. Money that would otherwise go toward annual income taxes stays in your account, generating triple compounding (interest on principal, interest on interest, and interest on tax savings). Income taxes are only paid when distributions are withdrawn.</dd>

                  <dt><strong>What liquidity options are available if I face an unexpected financial emergency?</strong></dt>
                  <dd>Most modern Florida annuity contracts feature an annual penalty-free withdrawal provision, typically permitting withdrawals of up to 10% of your accumulated account value each year after year one. Furthermore, many contracts include waiver riders for nursing home confinement or terminal illness that provide complete surrender-charge waivers under qualifying conditions.</dd>

                  <dt><strong>What happens when a MYGA contract term matures?</strong></dt>
                  <dd>When your contractual term ends, a 30-day window opens. You have three primary choices: 1) Take a full lump-sum distribution of your principal and earnings; 2) Execute a qualifying IRS Section 1035 exchange into a new annuity offering top market rates at that time; or 3) Allow the contract to automatically renew under the carrier's prevailing renewal rate.</dd>

                  <dt><strong>How do fixed annuities compare to bank Certificates of Deposit (CDs)?</strong></dt>
                  <dd>Bank CDs are FDIC-insured up to $250,000 per depositor and generate taxable income annually reported on Form 1099-INT. Annuities grow tax-deferred subject to applicable tax rules, are backed by insurer statutory reserves and the Florida Life and Health Insurance Guaranty Association (FLAHIGA), typically offer 10% penalty-free withdrawal provisions, and provide the option to convert funds into guaranteed lifetime retirement income that you cannot outlive.</dd>

                  <dt><strong>What is a qualifying IRS Section 1035 exchange?</strong></dt>
                  <dd>Section 1035 of the Internal Revenue Code allows you to roll over funds directly from an existing annuity contract (or the cash value of a permanent life policy) into a new annuity as a qualifying tax-free exchange, subject to tax rules.</dd>

                  <dt><strong>How does an annuity establish guaranteed lifetime income?</strong></dt>
                  <dd>Through a Guaranteed Lifetime Withdrawal Benefit (GLWB) income rider. A GLWB tracks a contractual 'Income Base' that compounds at a contractual roll-up rate. When activated, the insurer disburses a guaranteed payout percentage every year for life, even if your underlying cash surrender value reaches zero.</dd>
                </dl>
              </section>

              <section>
                <h2>Compare Top Florida Annuity Rates with Broker Andres Bozo</h2>
                <p>Speak directly with independent licensed broker Andres Bozo (NPN: 21228432) at <a href="tel:+13522258389">(352) 225-8389</a> to receive a multi-carrier comparison of the highest guaranteed fixed annuity yields in Florida with zero broker fees.</p>
              </section>
            </main>
          `;
        }
      } else if (cleanPath.includes("dental") || cleanPath.includes("vision")) {
        title = "Florida Senior Dental & Vision Insurance | Affordable Plans 2026";
        description = "Complete Dental and Vision insurance for Florida seniors and families. Cover cleanings, implants, dentures & eyewear with no waiting periods.";
        bodyOutline = `
          <header>
            <h1>${title}</h1>
            <p>${description}</p>
          </header>
          <section>
            <h2>Senior Dental and Optical Insurance Plans</h2>
            <p>Immediate dental checkups, implants, eyeglasses, and dentures coverage across elite health networks in Florida.</p>
          </section>
        `;
      }
    } else {
      // Default Generic Outline
      bodyOutline = `
        <header>
          <h1>AHB Insurance Solutions Florida</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Florida Senior Insurance Solutions</h2>
          <p>Medicare Supplement (Medigap Plan G/N), burial expenses, whole life, and wealth builder Indexed Universal Life plans by licensed broker Andres Bozo NPN 21228432.</p>
        </section>
      `;
    }
  }

  return {
    title,
    description,
    htmlLang,
    canonicalUrl,
    enUrl,
    esUrl,
    ogType,
    bodyOutline,
  };
}

export function generateJsonLd(metadata: SeoMetaData): object {
  const isEs = metadata.htmlLang.startsWith("es");
  const canonical = metadata.canonicalUrl;
  const cleanPath = canonical.replace("https://www.ahbinsurancesolutions.com", "") || "/";

  const websiteSchema = {
    "@type": "WebSite",
    "@id": "https://www.ahbinsurancesolutions.com/#website",
    "url": "https://www.ahbinsurancesolutions.com/",
    "name": "AHB Insurance Solutions",
    "description": "Licensed Medicare and Life Insurance Brokerage",
    "publisher": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
    "inLanguage": ["en-US", "es-US"]
  };

  const webpageSchema = {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    "url": canonical,
    "name": metadata.title,
    "description": metadata.description,
    "isPartOf": { "@id": "https://www.ahbinsurancesolutions.com/#website" },
    "about": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
    "inLanguage": metadata.htmlLang
  };

  const organizationSchema = {
    "@type": ["Organization", "InsuranceAgency", "LocalBusiness"],
    "@id": "https://www.ahbinsurancesolutions.com/#organization",
    "name": "AHB Insurance Solutions",
    "legalName": "AHB Insurance Solutions LLC",
    "url": "https://www.ahbinsurancesolutions.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.ahbinsurancesolutions.com/andresbozoofi.webp"
    },
    "image": "https://www.ahbinsurancesolutions.com/andresbozoofi.webp",
    "description": isEs 
      ? "Agencia de seguros independiente en Florida licenciada y especializada en Suplementos de Medicare (Medigap), Gastos Finales, Seguro de Vida Universal Indexada (IUL) y Anualidades."
      : "Independent licensed insurance brokerage in Florida specializing in Medicare Supplement Plans (Medigap), Final Expense Life Insurance, Indexed Universal Life (IUL), and Annuities.",
    "telephone": "+1-352-225-8389",
    "email": "andreshbozo@ahbinsurancesolutions.com",
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, Direct Debit",
    "identifier": {
      "@type": "PropertyValue",
      "name": "National Producer Number (NPN)",
      "value": "21228432",
      "url": "https://nipr.com/"
    },
    "taxID": "NPN-21228432",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "Florida Resident Insurance Agent License - Life, Health, and Variable Annuity",
      "credentialCategory": "State Insurance License",
      "recognizedBy": {
        "@type": "GovernmentOrganization",
        "name": "Florida Department of Financial Services (DFS)"
      }
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-352-225-8389",
        "contactType": "customer service",
        "email": "andreshbozo@ahbinsurancesolutions.com",
        "areaServed": "US-FL",
        "availableLanguage": ["English", "Spanish"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5500 SW Archer Road, Apt H103",
      "addressLocality": "Gainesville",
      "addressRegion": "FL",
      "postalCode": "32607",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.6015,
      "longitude": -82.4013
    },
    "hasMap": "https://www.google.com/maps/search/?api=1&query=5500+SW+Archer+Road+Apt+H103+Gainesville+FL+32607+USA",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "areaServed": [
      { "@type": "State", "name": "Florida" },
      { "@type": "AdministrativeArea", "name": "Alachua County, Florida" },
      { "@type": "AdministrativeArea", "name": "Miami-Dade County, Florida" },
      { "@type": "AdministrativeArea", "name": "Orange County, Florida" },
      { "@type": "AdministrativeArea", "name": "Hillsborough County, Florida" },
      { "@type": "AdministrativeArea", "name": "Duval County, Florida" },
      { "@type": "AdministrativeArea", "name": "Broward County, Florida" },
      { "@type": "AdministrativeArea", "name": "Palm Beach County, Florida" },
      { "@type": "AdministrativeArea", "name": "Pinellas County, Florida" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": isEs ? "Catálogo de Seguros de Florida" : "Florida Insurance Products & Brokerage",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isEs ? "Planes Suplementarios de Medicare (Medigap Plan G y N)" : "Medicare Supplement Insurance (Medigap Plan G & N)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isEs ? "Seguro de Gastos Finales y Entierro" : "Final Expense & Senior Burial Whole Life Insurance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isEs ? "Seguro de Vida Universal Indexada (IUL) para Retiro" : "Indexed Universal Life (IUL) Retirement Strategies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isEs ? "Anualidades Fijas e Indexadas de Retiro" : "Fixed & Fixed Indexed Annuities (FIA)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isEs ? "Seguro Dental, Visión y Audición Senior" : "Senior Dental, Vision & Hearing Coverage"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/ahbinsurancesolutions",
      "https://www.instagram.com/ahbinsurancesolutions",
      "https://licenseesearch.fldfs.com/",
      "https://nipr.com/"
    ],
    "founder": {
      "@id": "https://www.ahbinsurancesolutions.com/#person"
    }
  };

  const personSchema = {
    "@type": "Person",
    "@id": "https://www.ahbinsurancesolutions.com/#person",
    "name": "Andres H. Bozo",
    "alternateName": ["Andres Bozo", "Andrés Bozo", "Andres H Bozo"],
    "jobTitle": isEs ? "Broker de Seguros Licenciado en Florida" : "Licensed Florida Insurance Broker",
    "description": isEs 
      ? "Broker independiente de seguros en Florida especializado en Medicare, Seguro de Gastos Finales, Vida Universal Indexada (IUL) y Anualidades. NPN: 21228432."
      : "Independent Florida insurance broker specializing in Medicare, Final Expense Burial Insurance, Indexed Universal Life (IUL), and Annuities. NPN: 21228432.",
    "worksFor": {
      "@id": "https://www.ahbinsurancesolutions.com/#organization"
    },
    "telephone": "+1-352-225-8389",
    "email": "andreshbozo@ahbinsurancesolutions.com",
    "image": "https://www.ahbinsurancesolutions.com/andresbozoofi.webp",
    "url": isEs ? "https://www.ahbinsurancesolutions.com/es/sobre-andres-bozo" : "https://www.ahbinsurancesolutions.com/about-andres-bozo",
    "knowsLanguage": ["English", "Spanish"],
    "knowsAbout": [
      "Medicare Supplement (Medigap Plan G & Plan N)",
      "Medicare Advantage (Part C)",
      "Medicare Part D Prescription Drug Coverage",
      "Final Expense & Senior Burial Whole Life Insurance",
      "Indexed Universal Life (IUL)",
      "Fixed Indexed Annuities (FIA)",
      "Senior Healthcare Planning"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "State Insurance License",
        "name": "Florida Resident Insurance Agent License - Life, Health, and Variable Annuity",
        "recognizedBy": {
          "@type": "GovernmentOrganization",
          "name": "Florida Department of Financial Services (DFS)"
        }
      }
    ],
    "identifier": {
      "@type": "PropertyValue",
      "name": "NPN",
      "value": "21228432"
    },
    "sameAs": [
      "https://licenseesearch.fldfs.com/",
      "https://nipr.com/"
    ]
  };

  const graph: Record<string, unknown>[] = [websiteSchema, webpageSchema, organizationSchema, personSchema];

  // Route-specific schemas:
  // 1. Breadcrumbs for subpages:
  if (cleanPath !== "/" && cleanPath !== "/es") {
    const breadcrumbTitle = metadata.title.split("|")[0].trim();
    graph.push({
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": isEs ? "Inicio" : "Home",
          "item": `https://www.ahbinsurancesolutions.com${isEs ? '/es' : '/'}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": breadcrumbTitle,
          "item": canonical
        }
      ]
    });
  }

  // 2. Service schemas for Medicare / Final Expense / IUL
  if (cleanPath === "/medicare" || cleanPath === "/es/medicare") {
    graph.push({
      "@type": "Service",
      "name": isEs ? "Planes Suplementarios y de Ventaja de Medicare en Florida" : "Florida Medicare Supplement & Advantage Plans",
      "serviceType": "Health Insurance Brokerage",
      "provider": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
      "areaServed": { "@type": "State", "name": "Florida" },
      "description": metadata.description,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": isEs ? "Servicios de Medicare" : "Medicare Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": isEs ? "Medicare Suplementario (Medigap Plan G y N)" : "Medicare Supplement Insurance (Medigap Plan G & N)"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": isEs ? "Medicare Advantage (Parte C)" : "Medicare Advantage Plans (Part C)"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": isEs ? "Planes de Medicamentos Recetados (Parte D)" : "Part D Prescription Drug Coverage"
            }
          }
        ]
      }
    });
  } else if (cleanPath === "/final-expense" || cleanPath === "/es/gastos-finales") {
    graph.push({
      "@type": "Service",
      "name": isEs ? "Seguro de Gastos Finales y Entierro en Florida" : "Florida Final Expense & Burial Life Insurance",
      "serviceType": "Whole Life Insurance",
      "provider": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
      "areaServed": { "@type": "State", "name": "Florida" },
      "description": metadata.description
    });
  } else if (
    cleanPath === "/iul-retirement" || 
    cleanPath === "/es/iul-jubilacion" ||
    cleanPath === "/iul" ||
    cleanPath === "/es/iul" ||
    cleanPath === "/iul-florida" ||
    cleanPath === "/es/iul-florida" ||
    cleanPath === "/iul-jubilacion"
  ) {
    graph.push({
      "@type": "Service",
      "name": isEs ? "Seguro de Vida Universal Indexada (IUL) para Jubilación" : "Indexed Universal Life (IUL) Insurance",
      "serviceType": "Permanent Life Insurance & Retirement Planning",
      "provider": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
      "areaServed": { "@type": "State", "name": "Florida" },
      "description": metadata.description
    });
  } else if (
    cleanPath === "/locations/gainesville-fl" || 
    cleanPath === "/es/locations/gainesville-fl" ||
    cleanPath === "/gainesville-fl-insurance" ||
    cleanPath === "/es/seguros-gainesville-fl"
  ) {
    graph.push({
      "@type": "Service",
      "name": isEs ? "Gainesville, FL Insurance Broker" : "Gainesville, FL Insurance Broker",
      "serviceType": "Independent Insurance Brokerage",
      "provider": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
      "areaServed": [
        { "@type": "City", "name": "Gainesville" },
        { "@type": "AdministrativeArea", "name": "Alachua County" },
        { "@type": "City", "name": "Archer" },
        { "@type": "City", "name": "Newberry" },
        { "@type": "City", "name": "High Springs" }
      ],
      "description": metadata.description
    });
  } else if (
    cleanPath === "/annuities-florida" || 
    cleanPath === "/es/anualidades-florida" ||
    cleanPath === "/annuities" ||
    cleanPath === "/es/anualidades"
  ) {
    graph.push({
      "@type": ["Service", "FinancialProduct"],
      "name": isEs ? "Anualidades Fijas e Indexadas en Florida (FIA & MYGA)" : "Florida Fixed & Indexed Annuities (FIA & MYGA)",
      "serviceType": "Retirement Annuity Planning & Wealth Preservation",
      "provider": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
      "areaServed": { "@type": "State", "name": "Florida" },
      "description": metadata.description
    });
  } else if (cleanPath === "/faq" || cleanPath === "/es/preguntas-frecuentes") {
    const activeFaqs = isEs ? faqsEs : faqsEn;
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      "mainEntity": activeFaqs.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    });
  }

  // 3. BlogPosting for blog articles
  if (cleanPath.startsWith("/blog/") || cleanPath.startsWith("/es/blog/")) {
    const slugValue = cleanPath.startsWith("/blog/") ? cleanPath.replace("/blog/", "") : cleanPath.replace("/es/blog/", "");
    const post = BLOG_POSTS.find(p => p.slug.en === slugValue || p.slug.es === slugValue);
    if (post) {
      graph.push({
        "@type": "BlogPosting",
        "headline": isEs ? post.title.es : post.title.en,
        "description": isEs ? post.excerpt.es : post.excerpt.en,
        "image": post.image,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@type": "Person",
          "name": post.author.name,
          "jobTitle": post.author.title,
          "url": "https://www.ahbinsurancesolutions.com/#person"
        },
        "publisher": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonical
        }
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

export function rewriteHtmlForSeo(indexHtml: string, metadata: SeoMetaData, includeBodyOutline: boolean = true): string {
  let rewritten = indexHtml;

  // 1. Replace <html lang="en"> with the specific language
  rewritten = rewritten.replace(/<html lang="[^"]*">/, `<html lang="${metadata.htmlLang}">`);

  // 2. Replace <title>...</title>
  rewritten = rewritten.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`);

  // 3. Replace Meta description
  const descRegex = /<meta name="description" content="[^"]*"\s*\/?>/;
  if (descRegex.test(rewritten)) {
    rewritten = rewritten.replace(descRegex, `<meta name="description" content="${escapeHtml(metadata.description)}">`);
  } else {
    // Add inside <head>
    rewritten = rewritten.replace("</head>", `    <meta name="description" content="${escapeHtml(metadata.description)}">\n</head>`);
  }

  // 3b. Replace or Insert Meta Robots
  const robotsContent = metadata.robots || "index, follow, max-image-preview:large";
  const robotsRegex = /<meta name="robots" content="[^"]*"\s*\/?>/;
  if (robotsRegex.test(rewritten)) {
    rewritten = rewritten.replace(robotsRegex, `<meta name="robots" content="${robotsContent}">`);
  } else {
    rewritten = rewritten.replace("</head>", `    <meta name="robots" content="${robotsContent}">\n</head>`);
  }

  // 4. Replace Canonical URL link tag
  const canonicalRegex = /<link rel="canonical" id="canonical-link" href="[^"]*"\s*\/?>/;
  if (canonicalRegex.test(rewritten)) {
    rewritten = rewritten.replace(canonicalRegex, `<link rel="canonical" id="canonical-link" href="${metadata.canonicalUrl}">`);
  } else {
    rewritten = rewritten.replace("</head>", `    <link rel="canonical" id="canonical-link" href="${metadata.canonicalUrl}">\n</head>`);
  }

  // 5. Update language alternates
  rewritten = rewritten.replace(/<link rel="alternate" hreflang="en-US" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en-US" href="${metadata.enUrl}">`);
  rewritten = rewritten.replace(/<link rel="alternate" hreflang="es-US" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="es-US" href="${metadata.esUrl}">`);
  rewritten = rewritten.replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="x-default" href="${metadata.enUrl}">`);

  // 6. Update Open Graph fields
  rewritten = rewritten.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${metadata.canonicalUrl}">`);
  rewritten = rewritten.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(metadata.title)}">`);
  rewritten = rewritten.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(metadata.description)}">`);
  rewritten = rewritten.replace(/<meta property="og:locale" content="[^"]*"\s*\/?>/, `<meta property="og:locale" content="${metadata.htmlLang.replace("-", "_")}">`);

  // 6b. Update Twitter Card fields
  rewritten = rewritten.replace(/<meta property="twitter:url" content="[^"]*"\s*\/?>/, `<meta property="twitter:url" content="${metadata.canonicalUrl}">`);
  rewritten = rewritten.replace(/<meta property="twitter:title" content="[^"]*"\s*\/?>/, `<meta property="twitter:title" content="${escapeHtml(metadata.title)}">`);
  rewritten = rewritten.replace(/<meta property="twitter:description" content="[^"]*"\s*\/?>/, `<meta property="twitter:description" content="${escapeHtml(metadata.description)}">`);

  // 7. Inject Route-Accurate JSON-LD Schema
  const jsonLdData = generateJsonLd(metadata);
  const jsonLdString = JSON.stringify(jsonLdData, null, 2);
  const jsonLdScriptTag = `<script type="application/ld+json" id="app-ld-json">\n${jsonLdString}\n    </script>`;

  const ldJsonRegex = /<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/;
  if (ldJsonRegex.test(rewritten)) {
    rewritten = rewritten.replace(ldJsonRegex, jsonLdScriptTag);
  } else {
    rewritten = rewritten.replace("</head>", `    ${jsonLdScriptTag}\n</head>`);
  }

  // 8. Inject crawler-friendly body outline inside `<noscript>` ONLY to prevent unstyled text flashing on load
  if (includeBodyOutline) {
    const rootDiv = '<div id="root">';
    if (rewritten.includes(rootDiv)) {
      const replacement = `<noscript>\n      <div class="noscript-content">\n        ${metadata.bodyOutline}\n      </div>\n    </noscript>\n    <div id="root">`;
      rewritten = rewritten.replace(rootDiv, replacement);
    }
  }

  return rewritten;
}
