import { BLOG_POSTS } from "./constants/blogPosts";

interface SeoMetaData {
  title: string;
  description: string;
  htmlLang: string;
  canonicalUrl: string;
  enUrl: string;
  esUrl: string;
  ogType: string;
  bodyOutline: string;
}

const baseUrl = "https://www.ahbinsurancesolutions.com";

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

  // Default Fallbacks (Home English)
  let title = "Medicare, Final Expense & IUL in Florida | AHB Solutions";
  let description = "Expert FL insurance guidance: Medicare Supplement, Final Expense & IUL. Secure your family's future today. Licensed Broker NPN: 21228432. Get your free quote!";
  const canonicalUrl = `${baseUrl}${cleanPath === "" || cleanPath === "/" ? "/" : cleanPath}`;

  // Complete Hreflang Canonical Route Pairs to prevent 308 redirects and trailing slashes
  const ROUTE_PAIRS: Record<string, { en: string; es: string }> = {
    "": { en: "/", es: "/es" },
    "/": { en: "/", es: "/es" },
    "/es": { en: "/", es: "/es" },
    "/medicare": { en: "/medicare", es: "/es/medicare" },
    "/es/medicare": { en: "/medicare", es: "/es/medicare" },
    "/final-expense": { en: "/final-expense", es: "/es/gastos-finales" },
    "/es/gastos-finales": { en: "/final-expense", es: "/es/gastos-finales" },
    "/iul-retirement": { en: "/iul-retirement", es: "/es/iul-jubilacion" },
    "/es/iul-jubilacion": { en: "/iul-retirement", es: "/es/iul-jubilacion" },
    "/blog": { en: "/blog", es: "/es/blog" },
    "/es/blog": { en: "/blog", es: "/es/blog" },
    "/faq": { en: "/faq", es: "/es/preguntas-frecuentes" },
    "/es/preguntas-frecuentes": { en: "/faq", es: "/es/preguntas-frecuentes" },
    "/about-us": { en: "/about-us", es: "/es/nosotros" },
    "/es/nosotros": { en: "/about-us", es: "/es/nosotros" },
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
    "/iul-retirement-tampa": { en: "/iul-retirement-tampa", es: "/es/iul-jubilacion" },
    "/annuities-florida": { en: "/annuities-florida", es: "/es/anualidades-florida" },
    "/es/anualidades-florida": { en: "/annuities-florida", es: "/es/anualidades-florida" },
    "/dental-vision-florida": { en: "/dental-vision-florida", es: "/es/dental-vision-florida" },
    "/es/dental-vision-florida": { en: "/dental-vision-florida", es: "/es/dental-vision-florida" },
    "/spanish-insurance-orlando": { en: "/spanish-insurance-orlando", es: "/spanish-insurance-orlando" },
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

  let ogType = "website";
  let bodyOutline = "";

  // 1. Home English / Spanish
  if (cleanPath === "" || cleanPath === "/" || cleanPath === "/es") {
    if (isEs) {
      title = "Medicare, Gastos Finales e IUL en Florida | AHB Solutions";
      description = "Asegure el futuro de su familia en Florida con asesoría en Suplementos de Medicare (Medigap), Seguro de Gastos Finales y Vida Universal Indexada (IUL). Broker Andrés Bozo NPN: 21228432.";
      bodyOutline = `
        <header>
          <h1>Medicare, Gastos Finales y Seguro de Vida Universal Indexada (IUL) en Florida</h1>
          <p>Bienvenido a AHB Insurance Solutions, su agencia independiente de corretaje de seguros en Florida. Bajo el liderazgo del corredor licenciado Andrés Bozo (NPN: 21228432), nos dedicamos a proteger el patrimonio familiar, la salud y la tranquilidad de los adultos mayores y familias hispanas en todo el estado de Florida. Comparamos los planes de más de 80 de las aseguradoras más sólidas y prestigiosas del país (Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters y Corebridge) para garantizarle la máxima cobertura al precio más bajo, con asesoría 100% bilingüe y sin cargos por servicio.</p>
        </header>
        <section>
          <h2>Nuestras Soluciones de Seguros Especializadas en Florida</h2>
          <article>
            <h3>1. Planes Suplementarios de Medicare (Medigap) en Florida</h3>
            <p>El Medicare Original (Partes A y B) cubre hospitalización y servicios médicos esenciales, pero deja vacíos de costos significativos como el deducible de hospital de la Parte A y el coseguro del 20% sin límite de la Parte B. Un plan Suplementario de Medicare (Medigap), como el Plan G o el Plan N, cubre estos gastos de su bolsillo. Con una póliza Medigap en Florida, usted disfruta de libertad total de elección médica: puede consultar a cualquier médico, especialista u hospital en Florida y en todo Estados Unidos que acepte Medicare Original, sin requerir redes restrictivas HMO ni autorizaciones previas de referidos.</p>
          </article>
          <article>
            <h3>2. Seguro de Gastos Finales y Entierro para Adultos Mayores</h3>
            <p>Los costos promedio de funeral, cremación o servicio conmemorativo en Florida oscilan entre $7,000 y $12,000, representando un impacto financiero repentino para los seres queridos. El pago único por fallecimiento del Seguro Social federal es de tan solo $255. Nuestras pólizas de gastos finales ofrecen protección de vida entera con beneficios en efectivo de $5,000 a $35,000. Cuentan con tarifas congeladas que nunca aumentan con la edad, el beneficio por muerte nunca disminuye y no requieren exámenes médicos invasivos ni agujas. Los fondos se entregan a sus beneficiarios libres de impuestos sobre la renta en cuestión de días tras el reclamo.</p>
          </article>
          <article>
            <h3>3. Seguro de Vida Universal Indexado (IUL) y Jubilación Libre de Impuestos</h3>
            <p>La Vida Universal Indexada (IUL) es una estrategia de seguro de vida permanente que protege a su familia y al mismo tiempo construye un sólido valor en efectivo para el retiro. El crecimiento financiero está vinculado al desempeño de índices de mercado como el S&P 500, con un piso contractual garantizado del 0% contra caídas del mercado de valores. Conforme a la Sección 7702 del Código del IRS, puede solicitar préstamos de la póliza para generar ingresos de jubilación libres de impuestos, sin las penalidades de edad ni los límites obligatorios de retiro que aplican a las cuentas 401(k) o IRA tradicionales.</p>
          </article>
          <article>
            <h3>4. Anualidades Fijas y Pólizas Dentales, de Visión y Audición</h3>
            <p>Proteja sus ahorros de jubilación frente a la volatilidad económica con anualidades de tasa fija garantizada, y añada protección integral para gastos dentales, oftálmicos y aparatos auditivos diseñados especialmente para beneficiarios de Medicare en Florida.</p>
          </article>
        </section>
        <section>
          <h2>¿Por Qué Elegir a AHB Insurance Solutions?</h2>
          <ul>
            <li><strong>Enfoque Independiente y Ético:</strong> Como corredores independientes, trabajamos para usted y no para una aseguradora en particular. Evaluamos más de 80 compañías para encontrar la alternativa más conveniente según su edad, presupuesto y salud.</li>
            <li><strong>Cobertura en Todo el Estado de Florida:</strong> Brindamos servicio a clientes en Miami-Dade, Broward, Palm Beach, Orlando (Orange), Tampa (Hillsborough), Jacksonville (Duval), San Petersburgo, Fort Myers y todas las zonas de Florida.</li>
            <li><strong>Atención Personalizada en su Idioma:</strong> Explicaciones claras, honestas y sin tecnicismos difíciles, con el compromiso de acompañarle año tras año para verificar que continúe pagando la tarifa más baja.</li>
          </ul>
        </section>
        <section>
          <h2>Preguntas Frecuentes sobre Seguros en Florida</h2>
          <h3>¿Cuándo es el mejor momento para contratar un seguro suplementario Medigap en Florida?</h3>
          <p>El momento más favorable es durante su Período de Inscripción Abierta de Medigap de 6 meses, que inicia el primer día del mes en que cumple 65 años y se inscribe en la Parte B de Medicare. Durante esta ventana tiene Derechos de Emisión Garantizada, lo que impide que las aseguradoras rechacen su cobertura o aumenten su precio por antecedentes de salud.</p>
          <h3>¿Puedo calificar para seguro de entierro si tengo enfermedades previas?</h3>
          <p>Sí. La mayoría de las pólizas de gastos finales cuentan con emisión simplificada sin chequeos médicos ni muestras de sangre. Incluso adultos mayores con historial de presión alta, diabetes u otros padecimientos crónicos pueden calificar para cobertura inmediata o con beneficios graduados.</p>
          <h3>¿Cómo protege una póliza IUL mi dinero de las crisis bursátiles?</h3>
          <p>Las pólizas IUL poseen una cláusula de piso del 0%. En los años en que la bolsa de valores registra pérdidas, su rendimiento no baja de cero, lo que significa que su capital acumulado y las ganancias logradas en períodos previos quedan 100% blindados.</p>
        </section>
        <section>
          <h2>Servicios en Español y Enlaces Principales</h2>
          <nav aria-label="Enlaces en Español">
            <ul>
              <li><a href="/es">Inicio: Seguros en Florida</a></li>
              <li><a href="/es/medicare">Planes de Suplemento de Medicare (Medigap)</a></li>
              <li><a href="/es/gastos-finales">Seguro de Gastos Finales y Funeral</a></li>
              <li><a href="/es/iul-jubilacion">Vida Universal Indexada (IUL)</a></li>
              <li><a href="/es/anualidades-florida">Anualidades y Retiro Seguro en Florida</a></li>
              <li><a href="/es/dental-vision-florida">Seguro Dental, Visión y Audición Senior</a></li>
              <li><a href="/es/preguntas-frecuentes">Preguntas Frecuentes sobre Seguros</a></li>
              <li><a href="/es/nosotros">Conozca al Broker Andrés Bozo</a></li>
              <li><a href="/es/contacto">Cotización Gratuita sin Compromiso</a></li>
            </ul>
          </nav>
          <p class="mt-4"><strong>Looking for guidance in English?</strong> Visit our main <a href="/">English Florida Insurance Portal</a> or read our guides on <a href="/medicare">Medicare Supplement Plans</a>, <a href="/final-expense">Final Expense Insurance</a>, and <a href="/iul-retirement">IUL Retirement Plans</a>.</p>
          <p>Comuníquese hoy mismo con el broker licenciado Andrés Bozo al <a href="tel:+13522258389">+1 (352) 225-8389</a> para recibir su comparativa y cotización sin ningún compromiso.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>Medicare, Final Expense & Indexed Universal Life (IUL) Insurance in Florida</h1>
          <p>Welcome to AHB Insurance Solutions. We are an independent, client-first insurance brokerage proudly serving seniors, families, and individuals throughout Florida. Guided by licensed broker Andres Bozo (NPN: 21228432), we represent over 80 of the nation's premier A-rated insurance carriers (including Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters, and Corebridge). We provide unbiased advice, personalized rate comparisons, and lifelong local support with zero broker fees.</p>
        </header>
        <section>
          <h2>Our Specialized Florida Insurance Solutions</h2>
          <article>
            <h3>1. Florida Medicare Supplement Plans (Medigap)</h3>
            <p>Original Medicare (Parts A and B) provides essential healthcare protection but leaves substantial out-of-pocket gaps, such as the Part A hospital deductible and the uncapped 20% Part B outpatient coinsurance. A Medicare Supplement (Medigap) policy, such as Plan G or Plan N, pays these remaining balances on your behalf. With a Florida Medigap plan, you maintain complete freedom of healthcare providers: you can see any doctor, specialist, or healthcare facility across Florida and nationwide that accepts Original Medicare, with zero network constraints, prior authorization hurdles, or specialist referral requirements.</p>
          </article>
          <article>
            <h3>2. Final Expense & Burial Life Insurance for Florida Seniors</h3>
            <p>The cost of a typical funeral, cremation, or memorial service in Florida ranges between $7,000 and $12,000, creating an unexpected financial hardship for grieving family members. The standard federal Social Security death benefit is only $255 for eligible surviving spouses. Our final expense life insurance policies offer permanent whole life protection from $5,000 to $35,000. These plans feature level premiums that remain locked for life, death benefits that never decrease, and simplified underwriting with no medical exams or bodily fluid tests. Benefit checks are paid directly to your chosen beneficiaries completely free of federal income tax within days of approval.</p>
          </article>
          <article>
            <h3>3. Indexed Universal Life (IUL) for Tax-Advantaged Wealth & Retirement</h3>
            <p>Indexed Universal Life (IUL) insurance combines permanent death benefit protection with an efficient cash value growth component. Cash value growth is tied to the upward trajectory of major stock indexes like the S&P 500, protected by a guaranteed contractual 0% floor against market drops. Under Internal Revenue Code Section 7702, you can take policy loans to generate a tax-free retirement income stream, bypassing the mandatory minimum distribution rules and early withdrawal penalties found in traditional 401(k) and IRA retirement accounts.</p>
          </article>
          <article>
            <h3>4. Fixed Guaranteed Annuities & Senior Dental, Vision and Hearing</h3>
            <p>Shield your accumulated savings from stock market volatility with multi-year fixed indexed annuities offering reliable lifetime income options, and supplement your Medicare coverage with affordable dental, vision, and hearing plans designed specifically for Florida seniors.</p>
          </article>
        </section>
        <section>
          <h2>Why Choose AHB Insurance Solutions?</h2>
          <ul>
            <li><strong>True Independent Representation:</strong> Unlike captive agents restricted to one brand, we shop over 80 A-rated insurance carriers to identify the highest quality policy at the lowest available rate for your individual age and medical profile.</li>
            <li><strong>Statewide Florida Service:</strong> Assisting seniors and working families in Miami-Dade, Broward, Palm Beach, Orange (Orlando), Hillsborough (Tampa), Duval (Jacksonville), Pinellas, Lee, and across all 67 Florida counties.</li>
            <li><strong>Bilingual Fiduciary Guidance:</strong> Transparent, ethical, and pressure-free advice from a Florida-licensed insurance professional fluent in English and Spanish.</li>
          </ul>
        </section>
        <section>
          <h2>Frequently Asked Questions</h2>
          <h3>What is the best time to purchase a Medigap plan in Florida?</h3>
          <p>The premier time is during your 6-month Medigap Open Enrollment window, which starts the first day of the month you turn 65 and are enrolled in Medicare Part B. During this period, you have federal Guaranteed Issue rights, meaning insurance companies cannot deny you coverage or increase your premiums based on pre-existing medical conditions.</p>
          <h3>Can seniors with health challenges qualify for burial insurance?</h3>
          <p>Yes. Final expense life insurance policies are built with simplified underwriting or guaranteed acceptance options that do not require physical examinations or blood work. Seniors managing diabetes, high blood pressure, or past heart conditions can obtain immediate or graded whole life protection.</p>
          <h3>How does an IUL shield my retirement cash value from market losses?</h3>
          <p>Every IUL contract includes an annual 0% minimum interest floor. When market indexes suffer severe corrections or downturns, your account is credited with 0% interest rather than negative returns, permanently securing your principal and all earlier credited gains.</p>
        </section>
        <section>
          <h2>Explore Coverage Options & Bilingual Assistance</h2>
          <nav aria-label="Insurance Solutions">
            <ul>
              <li><a href="/medicare">Medicare Supplement Plans (Medigap)</a></li>
              <li><a href="/final-expense">Final Expense & Burial Life Insurance</a></li>
              <li><a href="/iul-retirement">Indexed Universal Life (IUL) for Retirement</a></li>
              <li><a href="/annuities-florida">Florida Fixed Indexed Annuities</a></li>
              <li><a href="/dental-vision-florida">Senior Dental, Vision & Hearing Coverage</a></li>
              <li><a href="/faq">Frequently Asked Questions</a></li>
              <li><a href="/about-us">About Broker Andres Bozo</a></li>
              <li><a href="/contact">Free Insurance Quote</a></li>
            </ul>
          </nav>
          <p class="mt-4"><strong>¿Prefiere recibir atención especializada en español?</strong> Visite nuestro <a href="/es">Portal de Seguros en Español en Florida</a> o explore nuestras páginas dedicadas a <a href="/es/medicare">Medicare Suplementario</a>, <a href="/es/gastos-finales">Seguro de Gastos Finales</a> e <a href="/es/iul-jubilacion">IUL y Jubilación</a>.</p>
          <p>Speak directly with Florida licensed broker Andres Bozo today at <a href="tel:+13522258389">+1 (352) 225-8389</a> to receive your free, zero-obligation insurance analysis.</p>
        </section>
      `;
    }
  }

  // 2. Medicare Service Page
  else if (cleanPath === "/medicare" || cleanPath === "/es/medicare") {
    title = isEs 
      ? "Guía Completa de Medicare en Florida 2026: Medigap Plan G, N y Advantage" 
      : "Florida Medicare & Medigap Complete Guide 2026: Plan G, N & Advantage";
    description = isEs 
      ? "Guía autorizada sobre Medicare en Florida 2026. Compare precios de Medigap Plan G y N, Medicare Advantage y Parte D. Asesoría independiente sin costo con Andrés Bozo (NPN 21228432)." 
      : "Authoritative guide to Florida Medicare 2026. Compare Medigap Plan G & N rates, Medicare Advantage, and Part D coverage. Free broker guidance from Andres Bozo (NPN 21228432).";
    
    if (isEs) {
      bodyOutline = `
        <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <span>Medicare Suplementario Medigap</span></p></nav>
        <header>
          <h1>Planes de Medicare y Suplementos (Medigap) en Florida</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Diferencia entre Medicare Suplementario (Medigap) y Medicare Advantage</h2>
          <p>Medigap (como el Plan G o el Plan N) funciona como seguro secundario al Medicare Original (Partes A y B). Cubre el 20% de copagos y coseguros sin restricciones de red ni requerimientos de referidos en ningún hospital o clínica de EE.UU.</p>
          <p>Por otro lado, Medicare Advantage (Parte C) reemplaza al Medicare Original mediante redes administradas privadas (HMO o PPO) con copagos por visita y requerimientos de pre-autorización médica.</p>
        </section>
        <section>
          <h2>Período de Inscripción Abierta de Medigap en Florida</h2>
          <p>Su período clave dura 6 meses y comienza el mes en que cumple 65 años y se inscribe en la Parte B de Medicare. Durante este tiempo tiene Derechos de Emisión Garantizada sin underwriting de salud.</p>
        </section>
        <section>
          <h2>Preguntas Frecuentes de Medicare Suplementario</h2>
          <h3>¿Cuánto cuestan las primas de Medigap en Florida en 2026?</h3>
          <p>Un Plan G oscila típicamente entre $140 y $185 mensuales para un no fumador de 65 años, mientras que un Plan N oscila entre $100 y $145 mensuales.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>Florida Medicare & Supplement Insurance Plans (Medigap)</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Understanding Original Medicare Gaps & Supplement Solutions</h2>
          <p>Medigap (such as Plan G or Plan N) acts as secondary insurance to Original Medicare (Parts A & B), paying the 20% coinsurance gaps with zero doctor network restrictions or referral mandates anywhere in the U.S.</p>
          <p>In contrast, Medicare Advantage (Part C) replaces Original Medicare with a private managed-care network (HMO or PPO) requiring copays, prior authorizations, and county-restricted networks in Florida.</p>
        </section>
        <section>
          <h2>Medigap Open Enrollment Period (MOEP) in Florida</h2>
          <p>The best time to buy a Medigap policy is during your 6-month Medigap Open Enrollment window. It starts the month you turn 65 and enroll in Medicare Part B. During this window, you have Guaranteed Issue Rights meaning carriers cannot reject you or charge higher premiums for pre-existing health conditions.</p>
        </section>
        <section>
          <h2>Florida Medigap Plan G vs Plan N Costs 2026</h2>
          <p>Average monthly premiums for a 65-year-old non-smoker in Florida range between $140 and $185 per month for Plan G, and $100 to $145 per month for Plan N depending on county zip codes.</p>
        </section>
      `;
    }
  }

  // 3. Final Expense Service Page
  else if (cleanPath === "/final-expense" || cleanPath === "/es/gastos-finales") {
    title = isEs 
      ? "Guía Completa de Seguro de Gastos Finales y Funeral en Florida 2026 | AHB Insurance" 
      : "Final Expense & Burial Insurance Complete Florida Guide 2026 | AHB Insurance";
    description = isEs 
      ? "Asegure entre $5,000 y $35,000 para costos funerales en Florida. Tarifas congeladas de por vida, sin exámenes médicos y desembolso libre de impuestos para su familia." 
      : "Secure $5,000 to $35,000 for Florida funeral costs. Permanent whole life coverage with locked rates, no medical exams, and immediate tax-free cash payout.";

    if (isEs) {
      bodyOutline = `
        <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <span>Seguro de Gastos Finales y Funeral</span></p></nav>
        <header>
          <h1>Seguro de Gastos Finales y Gastos Funerarios en Florida</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>¿Qué es el seguro de gastos finales?</h2>
          <p>Es una póliza de seguro de vida entera simplificada diseñada para cubrir gastos de entierro, servicios de funeraria, deudas médicas o saldos pendientes. Ofrece beneficios en efectivo desde $5,000 hasta $35,000 para personas de 50 a 85 años.</p>
          <p>Los pagos mensuales quedan totalmente congelados para siempre y el capital garantizado se entrega libre de impuestos federales a sus beneficiarios designados en pocos días.</p>
        </section>
        <section>
          <h2>¿El Seguro Social paga los gastos de funeral en Florida?</h2>
          <p>La ayuda única por fallecimiento del Seguro Social de EE.UU. es de solo $255, una cifra extremadamente baja comparada con los costos reales de un funeral promedio en Florida, que superan fácilmente los $8,000 o $10,000.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>Final Expense & Burial Life Insurance in Florida</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>What is Final Expense Insurance?</h2>
          <p>Final Expense is a simplified issue whole life policy designed to cover funeral services, cremation, burial costs, medical bills, or credit card debt. Cash benefits range from $5,000 to $35,000 for seniors aged 50 to 85.</p>
          <p>Premiums are locked and guaranteed to never increase, coverage will never expire as long as premiums are paid, and the cash benefit is paid out completely tax-free to your beneficiaries within days.</p>
        </section>
        <section>
          <h2>The $255 Social Security Death Benefit Pitfall</h2>
          <p>The federal Social Security Administration only provides a one-time lump-sum death payment of $255 to surviving eligible spouses or children. This doesn't come close to covering typical Florida burial expenses, which average between $7,000 and $11,000.</p>
        </section>
      `;
    }
  }

  // 4. IUL Service Page
  else if (cleanPath === "/iul-retirement" || cleanPath === "/es/iul-jubilacion") {
    title = isEs 
      ? "Guía Completa de Vida Universal Indexada (IUL) en Florida 2026 | AHB Insurance" 
      : "Indexed Universal Life (IUL) Insurance Master Guide Florida 2026 | AHB Insurance";
    description = isEs 
      ? "Aprenda cómo el IUL protege sus ahorros con piso del 0% contra caídas del mercado y permite ingresos de jubilación 100% libres de impuestos según Código IRS 7702 en Florida." 
      : "Discover how Indexed Universal Life (IUL) protects wealth with a 0% market downside floor and tax-free retirement loans under IRS Section 7702 in Florida.";

    if (isEs) {
      bodyOutline = `
        <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <span>Vida Universal Indexada (IUL)</span></p></nav>
        <header>
          <h1>Seguro de Vida Universal Indexada (IUL) en Florida</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>¿Cómo funciona el crecimiento con piso del 0% en un IUL?</h2>
          <p>El seguro IUL asocia sus rendimientos a índices del mercado (como el S&P 500) pero incluye una garantía contractual de piso del 0%. Si el mercado de acciones se desploma, sus fondos de valor en efectivo se congelan de forma segura en lugar de perder valor, lo que le permite mantener todas sus ganancias previas.</p>
        </section>
        <section>
          <h2>Retiro Libre de Impuestos de Jubilación (Sección IRS 7702)</h2>
          <p>Mediante retiros estructurados y préstamos de póliza colaterales, usted puede acceder a sus ahorros acumulados para su retiro sin pagar impuestos sobre la renta, a diferencia de los planes 401(k) o cuentas IRA tradicionales.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>Indexed Universal Life (IUL) Insurance Guide</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Understanding the Power of Indexed Universal Life (IUL)</h2>
          <p>An IUL policy is permanent life insurance that links its cash value growth to market indexes (like the S&P 500) but shields it contractually with a 0% interest floor. If the stock market crashes, your cash value is locked safely—meaning you participate in market gains but skip all market losses.</p>
        </section>
        <section>
          <h2>Tax-Free Retirement Planning under IRS Section 7702</h2>
          <p>By utilizing policy loans as collateralized tax-free cash distributions, you can withdraw and take out cash value from your IUL policy completely tax-free to fund your golden years, with no mandatory distribution limits or age restriction penalties unlike a traditional 401k or Traditional IRA.</p>
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
      ? "Preguntas Frecuentes sobre Medicare y Seguros en Florida | AHB Insurance" 
      : "Medicare & Insurance FAQ Florida | AHB Insurance Solutions";
    description = isEs 
      ? "Respuestas claras a sus dudas sobre Medicare Suplementario, Gastos Finales, IUL y seguro de vida en Florida. Corredor independiente Andrés H. Bozo." 
      : "Clear answers to your questions about Medicare Supplement, Final Expense, IUL, and life insurance in Florida. Independent broker Andres H. Bozo.";

    if (isEs) {
      bodyOutline = `
        <header>
          <h1>${title}</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Preguntas Frecuentes Respondidas</h2>
          <dl>
            <dt>¿Qué es un plan Suplementario de Medicare (Medigap)?</dt>
            <dd>Es una póliza vendida por compañías privadas para cubrir los "vacíos" de costos del Medicare Original, como coseguros del 20% y copagos de hospital.</dd>
            <dt>¿Cuál es el costo de una póliza de gastos finales?</dt>
            <dd>El costo depende de la edad, sexo y salud general del solicitante. Generalmente es muy accesible, con planes desde $30 a $80 al mes.</dd>
          </dl>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>${title}</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Frequently Asked Questions & Answers</h2>
          <dl>
            <dt>What is a Medicare Supplement Plan (Medigap)?</dt>
            <dd>Medigap is extra private health insurance that helps pay standard gaps in Original Medicare, like the 20% outpatient coinsurance and hospital deductibles.</dd>
            <dt>How much does Final Expense life insurance cost?</dt>
            <dd>Rates depend on age, gender, and tobacco usage. Highly affordable rates average $30 to $80 a month for $10,000 to $15,000 of locked coverage.</dd>
          </dl>
        </section>
      `;
    }
  }

  // 7. About Us Page
  else if (cleanPath === "/about-us" || cleanPath === "/es/nosotros") {
    title = isEs 
      ? "Sobre Nosotros y Broker Andrés H. Bozo | AHB Insurance Solutions" 
      : "About Us & Licensed Broker Andres H. Bozo | AHB Insurance Solutions";
    description = isEs 
      ? "Conozca a Andrés H. Bozo (NPN 21228432), corredor independiente especializado en Medicare y Seguros de Vida en Florida. Más de 80 aseguradoras." 
      : "Meet Andres H. Bozo (NPN 21228432), independent insurance broker specializing in Florida Medicare and Life Insurance. 80+ top carriers.";

    if (isEs) {
      bodyOutline = `
        <header>
          <h1>${title}</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Nuestra Misión y Ética Profesional</h2>
          <p>En AHB Insurance Solutions, representamos a los clientes y no a las compañías aseguradoras. Andrés H. Bozo es un broker independiente de seguros en Florida, con NPN de Licencia 21228432. Nos especializamos en Medicare y seguros de vida entera.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>${title}</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Our Independent Commitment</h2>
          <p>At AHB Insurance Solutions, we are committed to serving you first, not the insurance companies. Andres H. Bozo is a licensed independent Florida insurance broker (NPN: 21228432) with a decade of health and financial experience.</p>
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

  // 9. Localized Landing Pages (medicare-florida, final-expense-miami, annuities-florida, dental-vision-florida, etc.)
  else {
    // Check if path is a recognized landing path
    const landingPaths = [
      "/medicare-florida",
      "/medicare-supplement-florida",
      "/es/suplemento-medicare-florida",
      "/es/seguro-medicare-florida",
      "/final-expense-miami",
      "/burial-insurance-tampa",
      "/es/seguro-gastos-finales-tampa",
      "/es/seguro-gastos-finales-florida",
      "/iul-retirement-tampa",
      "/spanish-insurance-orlando",
      "/annuities-florida",
      "/es/anualidades-florida",
      "/annuities",
      "/es/anualidades",
      "/dental-vision-florida",
      "/es/dental-vision-florida"
    ];

    if (landingPaths.includes(cleanPath)) {
      if (cleanPath.includes("medicare") || cleanPath.includes("suplemento")) {
        title = isEs 
          ? "Seguro Medicare Florida 2026 | Asesoría y Planes Suplementarios en Español" 
          : "Best Florida Medicare Supplement Plans 2026 | Medigap Plan G & N";
        description = isEs 
          ? "Consiga el mejor seguro Medicare en Florida. Comparamos planes Suplementarios de Medicare (Medigap) Partes G y N de más de 80 aseguradoras. Asesoría gratuita en español." 
          : "Compare Florida Medicare Supplement (Medigap) Plans. Find top Plan G and Plan N rates from 80+ insurers. Guaranteed coverage & no network restrictions in FL.";
        
        bodyOutline = `
          <header>
            <h1>${title}</h1>
            <p>${description}</p>
          </header>
          <section>
            <h2>Medicare Supplement (Medigap) Solutions</h2>
            <p>Compare Medigap Plan G and Plan N rates. Get 100% doctor choice freedom with Andres Bozo, licensed broker (NPN 21228432).</p>
          </section>
        `;
      } else if (cleanPath.includes("final") || cleanPath.includes("burial") || cleanPath.includes("gastos")) {
        title = isEs 
          ? "Seguro de Gastos Finales en Florida 2026 | Entierro y Funeral Sin Examen Médico" 
          : "Burial & Final Expense Insurance Florida | No Medical Exam Coverage";
        description = isEs 
          ? "Pólizas de seguro de gastos finales de entierro en Florida de $5,000 a $35,000. Tarifas fijas congeladas para siempre, sin exámenes médicos y aprobación garantizada. Asesoría en español." 
          : "Burial Insurance & Funeral Expense Coverage in Florida. $5,000 to $35,000 cash benefits for seniors with no medical exam. Free quote.";
        
        bodyOutline = `
          <header>
            <h1>${title}</h1>
            <p>${description}</p>
          </header>
          <section>
            <h2>Funeral & Burial Planning Solutions</h2>
            <p>Ensure burial and funeral cost safety for your loved ones with guaranteed cash benefit plans from $5,000 to $35,000 in Florida. No medical exam required.</p>
          </section>
        `;
      } else if (cleanPath.includes("annuities") || cleanPath.includes("anualidades")) {
        title = "Florida Fixed Annuities 2026 | Guaranteed Retirement Income Florida";
        description = "Protect your retirement savings with Florida Fixed & MYGA Annuities. Earn guaranteed interest rates with 0% stock market risk. Free rate quote.";
        bodyOutline = `
          <header>
            <h1>${title}</h1>
            <p>${description}</p>
          </header>
          <section>
            <h2>Guaranteed High Yield Fixed Annuities</h2>
            <p>Protect your hard earned savings from index drops or stock market crashes with 0% market risk MYGA products in Florida.</p>
          </section>
        `;
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
      } else if (cleanPath === "/spanish-insurance-orlando") {
        title = "Seguros de Vida y Medicare en Orlando | Broker de Seguros Florida";
        description = "Especialista en Seguros de Medicare y Gastos Finales de Entierro en Orlando. Obtenga asesoría profesional bilingüe gratuita con Andres Bozo NPN 21228432.";
        bodyOutline = `
          <header>
            <h1>Seguros de Vida y Medicare en Orlando</h1>
            <p>${description}</p>
          </header>
          <section>
            <h2>Asesoría Profesional de Seguros en Español en Orlando</h2>
            <p>Compare precios de más de 80 aseguradoras para planes de Medicare Suplementario y Gastos Finales con el broker Andrés Bozo en Orlando.</p>
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
    "description": "Licensed insurance agency specializing in Medicare Supplements, Advantage Plans, Final Expense Life Insurance, and Indexed Universal Life (IUL).",
    "telephone": "+1-352-225-8389",
    "email": "andreshbozo@ahbinsurancesolutions.com",
    "priceRange": "Free Consultation",
    "identifier": {
      "@type": "PropertyValue",
      "name": "NPN",
      "value": "21228432"
    },
    "taxID": "21228432",
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
      "latitude": "29.6015",
      "longitude": "-82.4013"
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
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    },
    "sameAs": [
      "https://www.facebook.com/ahbinsurancesolutions",
      "https://www.instagram.com/ahbinsurancesolutions"
    ],
    "founder": {
      "@id": "https://www.ahbinsurancesolutions.com/#person"
    }
  };

  const personSchema = {
    "@type": "Person",
    "@id": "https://www.ahbinsurancesolutions.com/#person",
    "name": "Andres H. Bozo",
    "alternateName": "Andres Bozo",
    "jobTitle": "Licensed Insurance Broker",
    "worksFor": {
      "@id": "https://www.ahbinsurancesolutions.com/#organization"
    },
    "telephone": "+1-352-225-8389",
    "email": "andreshbozo@ahbinsurancesolutions.com",
    "image": "https://www.ahbinsurancesolutions.com/andresbozoofi.webp",
    "knowsAbout": ["Medicare", "Final Expense Insurance", "Life Insurance", "Indexed Universal Life (IUL)", "Burial Insurance"],
    "identifier": {
      "@type": "PropertyValue",
      "name": "NPN",
      "value": "21228432"
    }
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
  } else if (cleanPath === "/iul-retirement" || cleanPath === "/es/iul-jubilacion") {
    graph.push({
      "@type": "Service",
      "name": isEs ? "Seguro de Vida Universal Indexada (IUL) para Jubilación" : "Indexed Universal Life (IUL) Insurance",
      "serviceType": "Permanent Life Insurance & Retirement Planning",
      "provider": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
      "areaServed": { "@type": "State", "name": "Florida" },
      "description": metadata.description
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
