import { BLOG_POSTS } from "./constants/blogPosts";
import { faqsEs, faqsEn } from "./constants/faqData";

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
    "/iul-retirement-tampa": { en: "/iul-retirement-tampa", es: "/es/iul-jubilacion" },
    "/annuities-florida": { en: "/annuities-florida", es: "/es/anualidades-florida" },
    "/es/anualidades-florida": { en: "/annuities-florida", es: "/es/anualidades-florida" },
    "/dental-vision-florida": { en: "/dental-vision-florida", es: "/es/dental-vision-florida" },
    "/es/dental-vision-florida": { en: "/dental-vision-florida", es: "/es/dental-vision-florida" },
    "/spanish-insurance-orlando": { en: "/spanish-insurance-orlando", es: "/spanish-insurance-orlando" },
    "/locations/gainesville-fl": { en: "/locations/gainesville-fl", es: "/es/locations/gainesville-fl" },
    "/es/locations/gainesville-fl": { en: "/locations/gainesville-fl", es: "/es/locations/gainesville-fl" },
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
          <p>Bienvenido a AHB Insurance Solutions, su agencia independiente de corretaje de seguros en Florida. Bajo el liderazgo del corredor licenciado Andrés Bozo (NPN: 21228432), nos dedicamos a proteger el patrimonio familiar, la salud y la tranquilidad de los adultos mayores y familias hispanas en todo el estado de Florida. Comparamos las opciones disponibles según sus necesidades, elegibilidad, presupuesto y objetivos de cobertura entre aseguradoras de primer nivel nacional (Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters y Corebridge), con asesoría 100% bilingüe y sin cargos por servicio.</p>
        </header>
        <section>
          <h2>Nuestras Soluciones de Seguros Especializadas en Florida</h2>
          <article>
            <h3>1. Planes Suplementarios de Medicare (Medigap) en Florida</h3>
            <p>El Medicare Original (Partes A y B) cubre hospitalización y servicios médicos esenciales, pero deja vacíos de costos significativos como el deducible de hospital de la Parte A y el coseguro del 20% sin límite de la Parte B. Un plan Suplementario de Medicare (Medigap), como el Plan G o el Plan N, cubre estos gastos de su bolsillo. Con una póliza Medigap en Florida, usted disfruta de libertad total de elección médica: puede consultar a cualquier médico, especialista u hospital en Florida y en todo Estados Unidos que acepte Medicare Original, sin requerir redes restrictivas HMO ni autorizaciones previas de referidos.</p>
          </article>
          <article>
            <h3>2. Seguro de Gastos Finales y Entierro para Adultos Mayores</h3>
            <p>Los costos promedio de funeral, cremación o servicio conmemorativo en Florida oscilan entre $7,000 y $12,000, representando un impacto financiero repentino para los seres queridos. El pago único por fallecimiento del Seguro Social federal es de tan solo $255. Nuestras pólizas de gastos finales ofrecen protección de vida entera con beneficios en efectivo de $5,000 a $35,000 y tarifas congeladas. Muchas pólizas de emisión simplificada no requieren un examen médico tradicional, aunque los requisitos de suscripción varían según la compañía aseguradora y el solicitante. Los beneficios por fallecimiento se pagan generalmente a los beneficiarios según los términos de la póliza y pueden recibir un tratamiento fiscal federal favorable; las disposiciones de la póliza y las circunstancias de los beneficiarios pueden incidir en el resultado.</p>
          </article>
          <article>
            <h3>3. Seguro de Vida Universal Indexado (IUL) y Estrategias con Ventajas Fiscales</h3>
            <p>La Vida Universal Indexada (IUL) combina protección permanente de seguro de vida con un componente de valor en efectivo. El componente de acreditación indexada cuenta con un piso contractual del 0%, lo que significa que a la estrategia de índice seleccionada no se le acredita un rendimiento negativo ante caídas del mercado. Sin embargo, los costos del seguro y cargos contractuales afectan el valor en efectivo total. Bajo el Código IRS 7702, los préstamos de póliza pueden brindar acceso a capital con tratamiento fiscal potencialmente favorable si la póliza se estructura adecuadamente, no es un MEC y se mantiene en vigor (consulte a un profesional tributario calificado).</p>
          </article>
          <article>
            <h3>4. Anualidades Fijas y Pólizas Dentales, de Visión y Audición</h3>
            <p>Proteja sus ahorros de jubilación frente a la volatilidad económica con anualidades de tasa fija garantizada, y añada protección integral para gastos dentales, oftálmicos y aparatos auditivos diseñados especialmente para beneficiarios de Medicare en Florida.</p>
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
          <p>Welcome to AHB Insurance Solutions. We are an independent, client-first insurance brokerage proudly serving seniors, families, and individuals throughout Florida. Guided by licensed broker Andres Bozo (NPN: 21228432), we work with top-rated and state-licensed national insurance carriers (including Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters, and Corebridge). We provide independent guidance, personalized rate comparisons, and lifelong local support with zero broker fees.</p>
        </header>
        <section>
          <h2>Our Specialized Florida Insurance Solutions</h2>
          <article>
            <h3>1. Florida Medicare Supplement Plans (Medigap)</h3>
            <p>Original Medicare (Parts A and B) provides essential healthcare protection but leaves substantial out-of-pocket gaps, such as the Part A hospital deductible and the uncapped 20% Part B outpatient coinsurance. A Medicare Supplement (Medigap) policy, such as Plan G or Plan N, pays these remaining balances on your behalf. With a Florida Medigap plan, you maintain complete freedom of healthcare providers: you can see any doctor, specialist, or healthcare facility across Florida and nationwide that accepts Original Medicare, with zero network constraints, prior authorization hurdles, or specialist referral requirements.</p>
          </article>
          <article>
            <h3>2. Final Expense & Burial Life Insurance for Florida Seniors</h3>
            <p>The cost of a typical funeral, cremation, or memorial service in Florida ranges between $7,000 and $12,000, creating an unexpected financial hardship for grieving family members. The standard federal Social Security death benefit is only $255 for eligible surviving spouses. Our final expense life insurance policies offer permanent whole life protection from $5,000 to $35,000 with locked rates. Many simplified-issue policies do not require a traditional medical exam, although underwriting requirements vary by carrier and applicant. Death benefits are generally paid to beneficiaries according to the policy terms and may receive favorable federal tax treatment; policy provisions and the beneficiary's circumstances can affect the outcome.</p>
          </article>
          <article>
            <h3>3. Indexed Universal Life (IUL) for Tax-Advantaged Wealth & Retirement Planning</h3>
            <p>Indexed Universal Life (IUL) insurance combines permanent death benefit protection with an index-linked cash value component. The index-crediting component of an IUL may have a contractual 0% floor, meaning the selected index strategy is not credited with a negative index return. However, policy charges, cost of insurance, loans, withdrawals and other contract provisions can affect overall cash value. Under Internal Revenue Code Section 7702, policy loans may provide access to cash value with potentially favorable federal tax treatment when the policy is structured properly, is not a Modified Endowment Contract (MEC), remains in force, and applicable tax requirements are satisfied (consult a qualified tax professional).</p>
          </article>
          <article>
            <h3>4. Fixed Guaranteed Annuities & Senior Dental, Vision and Hearing</h3>
            <p>Shield your accumulated savings from stock market volatility with multi-year fixed indexed annuities offering reliable lifetime income options, and supplement your Medicare coverage with affordable dental, vision, and hearing plans designed specifically for Florida seniors.</p>
          </article>
        </section>
        <section>
          <h2>Why Choose AHB Insurance Solutions?</h2>
          <ul>
            <li><strong>True Independent Representation:</strong> Unlike captive agents restricted to one brand, we compare available options based on your needs, eligibility, budget and coverage goals across top-rated and state-licensed national insurance carriers.</li>
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
          <p>Las pólizas Medigap ayudan a pagar ciertos costos de desembolso cubiertos por Medicare, según el plan estandarizado que seleccione (como el Plan G o el Plan N). Medigap generalmente le permite atenderse con cualquier proveedor a nivel nacional que acepte la asignación de Medicare, sujeto a las reglas de Medicare y Medigap.</p>
          <p>Por otro lado, los planes Medicare Advantage (Parte C), ofrecidos por aseguradoras privadas, cuentan con estructuras de redes específicas (como HMO o PPO), términos de costos compartidos y reglas de autorización previa que varían según el plan y el condado.</p>
        </section>
        <section>
          <h2>Período de Inscripción Abierta de Medigap en Florida</h2>
          <p>Su período clave dura 6 meses y comienza el mes en que cumple 65 años y se inscribe en la Parte B de Medicare. Durante este tiempo tiene Derechos de Emisión Garantizada sin underwriting de salud.</p>
        </section>
        <section>
          <h2>Preguntas Frecuentes de Medicare Suplementario</h2>
          <h3>¿Cuánto cuestan las primas de Medigap en Florida en 2026?</h3>
          <p>“Rangos de primas únicamente ilustrativos. Las primas reales varían por código postal, edad, aseguradora, método de tarificación y elegibilidad. Solicite una comparación personalizada.” (Actualizado: Septiembre 2026). Como ejemplo de muestra referencial para una persona de 65 años no fumadora en códigos postales seleccionados de Florida Central antes de descuentos de hogar, un Plan G suele oscilar entre $140 y $185 mensuales y un Plan N entre $100 y $145 mensuales. No obstante, las primas reales dependen de su código postal (ZIP), edad, aseguradora (carrier), método de tarificación actuarial (Attained-Age vs. Issue-Age), descuentos de convivencia en el hogar, evaluación médica (underwriting) y área geográfica.</p>
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
          <p>Medigap policies help pay certain Medicare-covered out-of-pocket costs, depending on the standardized plan you select. Medigap generally allows you to see any provider nationwide who accepts Medicare assignment, subject to Medicare and Medigap rules.</p>
          <p>In contrast, Medicare Advantage plans (Part C), offered by private insurers, feature specific network structures (such as HMO or PPO), cost-sharing terms, and pre-authorization rules that vary by plan and county.</p>
        </section>
        <section>
          <h2>Medigap Open Enrollment Period (MOEP) in Florida</h2>
          <p>The best time to buy a Medigap policy is during your 6-month Medigap Open Enrollment window. It starts the month you turn 65 and enroll in Medicare Part B. During this window, you have Guaranteed Issue Rights meaning carriers cannot reject you or charge higher premiums for pre-existing health conditions.</p>
        </section>
        <section>
          <h2>Florida Medigap Plan G vs Plan N Costs 2026</h2>
          <p>“Illustrative premium ranges only. Actual premiums vary by ZIP code, age, carrier, rating method and eligibility. Request a personalized comparison.” (Updated: September 2026). As a sample illustrative example for a 65-year-old non-smoker in select Central Florida ZIP codes prior to household discounts, monthly premiums typically range between $140 and $185 for Plan G, and $100 to $145 for Plan N. However, actual premiums depend on your specific ZIP code, age, carrier, rating method (such as Attained-Age vs. Issue-Age), underwriting, household discounts, and geographic area.</p>
        </section>
      `;
    }
  }

  // 3. Final Expense Service Page
  else if (cleanPath === "/final-expense" || cleanPath === "/es/gastos-finales") {
    title = isEs 
      ? "Seguro de Gastos Finales y Funeral en Florida 2026 | AHB Insurance" 
      : "Final Expense & Burial Insurance in Florida 2026 | AHB Insurance";
    description = isEs 
      ? "Proteja a su familia con cobertura de $5,000 a $35,000 en Florida. Tarifas fijas de por vida. Muchas pólizas de emisión simplificada no requieren examen médico tradicional." 
      : "Secure $5,000 to $35,000 in Florida burial protection. Locked lifetime rates. Many simplified-issue policies do not require a traditional medical exam.";

    if (isEs) {
      bodyOutline = `
        <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <span>Seguro de Gastos Finales y Funeral</span></p></nav>
        <header>
          <h1>Seguro de Gastos Finales y Funeral en Florida</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>¿Qué es el Seguro de Gastos Finales?</h2>
          <p>Es una póliza de seguro de vida entera (Whole Life) permanente diseñada para cubrir gastos de entierro, cremación, servicios funerarios, deudas médicas pendientes o compromisos financieros tras el fallecimiento. Los beneficios en efectivo oscilan entre $5,000 y $35,000.</p>
        </section>
        <section>
          <h2>¿Quién Necesita este Seguro?</h2>
          <p>Adultos de 50 a 85 años que desean evitar traspasar una deuda funeraria de $8,000 a $14,000 a sus hijos o familiares, personas sin seguro de vida activo o con pólizas de término que están por vencer.</p>
        </section>
        <section>
          <h2>Montos de Cobertura y Desglose de Gastos en Florida</h2>
          <p>Planes desde $5,000 para cremación y gastos administrativos, hasta $35,000 para funeral tradicional con parcela de cementerio, ataúd y fondo de emergencia familiar. El beneficio único del Seguro Social de EE.UU. es de solo $255 para cónyuges sobrevivientes.</p>
        </section>
        <section>
          <h2>Criterios de Elegibilidad y Suscripción Médica</h2>
          <p>Disponible para residentes de Florida entre 50 y 85 años. Muchas pólizas de emisión simplificada no requieren un examen médico tradicional, aunque los requisitos de suscripción varían según la aseguradora y el solicitante. Las compañías evalúan la elegibilidad a través de preguntas de salud, historial de medicamentos recetados, registros del MIB y, en determinados casos, entrevistas telefónicas o informes médicos (APS).</p>
        </section>
        <section>
          <h2>Emisión Simplificada vs. Emisión Garantizada</h2>
          <p>La emisión simplificada ofrece cobertura inmediata desde el primer día (Level Benefit) para solicitantes con condiciones controladas. La emisión garantizada (Guaranteed Issue) no realiza preguntas médicas y aprueba al 100% de solicitantes con enfermedades graves, con un período de espera graduado de 2 años.</p>
        </section>
        <section>
          <h2>Períodos de Espera y Pago de Beneficios</h2>
          <p>Explicación transparente de cobertura inmediata desde el Día 1 frente a pólizas con beneficios graduados para perfiles de alto riesgo médico.</p>
        </section>
        <section>
          <h2>Primas Mensuales Congeladas de por Vida</h2>
          <p>Las tarifas nunca aumentan con la edad ni por cambios de salud. La póliza nunca vence mientras las cuotas se mantengan al día.</p>
        </section>
        <section>
          <h2>Beneficiarios y Pago de Beneficios</h2>
          <p>Los beneficios por fallecimiento se pagan generalmente a los beneficiarios según los términos de la póliza y pueden recibir un tratamiento fiscal federal favorable; las disposiciones de la póliza y las circunstancias de los beneficiarios pueden incidir en el resultado. A diferencia de los contratos prepagados de funerarias, su familia tiene libertad para elegir cualquier funeraria en Florida o en todo EE.UU.</p>
        </section>
        <section>
          <h2>Comparativa: Gastos Finales vs. Seguro a Término vs. Funeraria Prepagada</h2>
          <p>Tabla comparativa exhaustiva que detalla flexibilidad, permanencia, congelación de precios y libertad de proveedores.</p>
        </section>
        <section>
          <h2>Proceso de Solicitud con Andrés Bozo (NPN 21228432)</h2>
          <p>Paso a paso: consulta gratuita, evaluación de historial médico para ubicar la mejor tarifa en más de 15 aseguradoras, firma electrónica o telefónica y emisión rápida.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>Final Expense & Burial Insurance in Florida</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>What is Final Expense Insurance?</h2>
          <p>Final Expense is a permanent whole life policy designed to cover funeral services, cremation, burial costs, leftover medical bills, and personal debts. Cash benefits range from $5,000 to $35,000 for adults aged 50 to 85.</p>
        </section>
        <section>
          <h2>Who Needs Final Expense Coverage?</h2>
          <p>Florida seniors, retirees, and individuals wanting to shield their children from $9,000 to $14,000 in unexpected funeral debt, or anyone who has outlived their term life insurance policies.</p>
        </section>
        <section>
          <h2>Coverage Amounts & Real Florida Funeral Costs</h2>
          <p>Options from $5,000 to $35,000. Social Security only pays a $255 one-time lump sum to eligible surviving spouses, leaving thousands of dollars in uncovered funeral and cemetery expenses.</p>
        </section>
        <section>
          <h2>Eligibility & Underwriting Context</h2>
          <p>Available for Florida residents typically aged 50 to 85. Many simplified-issue policies do not require a traditional medical exam, although underwriting requirements vary by carrier and applicant. Insurers verify eligibility through health questionnaire responses, electronic prescription drug history (Rx check), MIB records, and occasionally telephone interviews or attending physician statements (APS).</p>
        </section>
        <section>
          <h2>Simplified Issue vs. Guaranteed Issue</h2>
          <p>Simplified issue plans provide Day-One Level Benefits for applicants with managed health histories. Guaranteed-issue policies generally do not require traditional medical underwriting or health questions, but eligibility, benefit limitations and waiting periods vary by carrier and product.</p>
        </section>
        <section>
          <h2>Waiting Periods Explained</h2>
          <p>Honest breakdown between immediate day-one payout policies and modified two-year graded periods for high-risk individuals.</p>
        </section>
        <section>
          <h2>Level Premiums & Permanent Coverage</h2>
          <p>Many participating whole life policies offer level premiums and permanent coverage, subject to the policy’s terms, conditions and continued payment of required premiums.</p>
        </section>
        <section>
          <h2>Beneficiaries & Benefit Payouts</h2>
          <p>Death benefits are generally paid to beneficiaries according to the policy terms and may receive favorable federal tax treatment; policy provisions and the beneficiary's circumstances can affect the outcome. Unlike restrictive pre-need funeral contracts, your family has freedom to choose any provider nationwide.</p>
        </section>
        <section>
          <h2>Comparison: Final Expense vs. Term Life vs. Pre-Need Funeral Plans</h2>
          <p>Detailed evaluation highlighting permanent guarantees, price locking, and freedom of choice.</p>
        </section>
        <section>
          <h2>Application Process with Andres Bozo, Independent Broker (NPN 21228432)</h2>
          <p>Streamlined four-step guidance: comparison across 15+ top burial insurers, telephone or electronic sign-up, and rapid approval.</p>
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
      ? "Aprenda cómo el IUL ofrece crecimiento indexado con piso contractual del 0% y estrategias de préstamos con ventajas fiscales bajo el Código IRS 7702 en Florida." 
      : "Discover how Indexed Universal Life (IUL) provides index-linked crediting with a contractual 0% floor and tax-advantaged retirement policy loans under IRS Section 7702 in Florida.";

    if (isEs) {
      bodyOutline = `
        <nav aria-label="Navegación"><p><a href="/es">Inicio Seguros Florida</a> &gt; <span>Vida Universal Indexada (IUL)</span></p></nav>
        <header>
          <h1>Seguro de Vida Universal Indexada (IUL) y Jubilación en Florida</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Piso Contractual del 0% en Acreditación Indexada (No Garantía Total de Cash Value)</h2>
          <p>El piso del 0% aplica exclusivamente a la acreditación de la estrategia indexada (index-crediting floor), lo que significa que el índice no recibe rendimientos negativos ante caídas del mercado. Sin embargo, esto no garantiza el valor en efectivo total ni lo exime de la deducción continua de cargos administrativos y el Costo del Seguro (COI).</p>
        </section>
        <section>
          <h2>Impacto de Préstamos y Retiros (Policy Loans & Withdrawals)</h2>
          <p>Los préstamos y retiros sobre la póliza reducen el valor en efectivo y el beneficio por fallecimiento, acumulando intereses. Si la póliza caduca con préstamos pendientes que superan las primas netas pagadas (cost basis), el exceso se convierte inmediatamente en ingreso ordinario gravable.</p>
        </section>
        <section>
          <h2>Tratamiento Fiscal bajo IRS Sección 7702 y Reglas MEC</h2>
          <p>El tratamiento fiscal favorable (préstamos exentos de impuesto a la renta) depende estrictamente de que la póliza esté debidamente estructurada, no sea un Contrato de Dotación Modificada (MEC) bajo la prueba de 7 pagos del IRS, y se mantenga activa y en vigor durante toda la vida del asegurado. Consulte siempre a un CPA o asesor tributario certificado.</p>
        </section>
      `;
    } else {
      bodyOutline = `
        <header>
          <h1>Indexed Universal Life (IUL) Insurance Guide</h1>
          <p>${description}</p>
        </header>
        <section>
          <h2>Understanding the Index-Crediting Mechanism and 0% Floor</h2>
          <p>The index-crediting component of an IUL may have a contractual 0% floor, meaning the selected index strategy is not credited with a negative index return. However, policy charges, cost of insurance, loans, withdrawals and other contract provisions can affect overall cash value.</p>
        </section>
        <section>
          <h2>Tax Considerations and Policy Loans under IRS Section 7702</h2>
          <p>Policy loans may provide access to cash value with potentially favorable federal tax treatment when the policy is structured properly, is not a Modified Endowment Contract (MEC), remains in force, and applicable tax requirements are satisfied. If a policy lapses with outstanding loans or is classified as a MEC, tax consequences may occur. Consult a qualified tax professional regarding your individual circumstances.</p>
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

    bodyOutline = `
      <header>
        <h1>${isEs ? "Gainesville, FL Insurance Broker | Broker de Seguros en Gainesville" : "Gainesville, FL Insurance Broker"}</h1>
        <p>${description}</p>
        <div class="broker-contact-badge">
          <p><strong>Broker Licenciado:</strong> Andres Bozo (NPN: 21228432)</p>
          <p><strong>Dirección:</strong> 5500 SW Archer Road, Apt H103, Gainesville, FL 32607</p>
          <p><strong>Teléfono:</strong> <a href="tel:+13522258389">+1 (352) 225-8389</a></p>
        </div>
      </header>

      <section>
        <h2>Medicare Gainesville: Cobertura y Suplementos Medigap en el Condado de Alachua</h2>
        <p>Gainesville es el epicentro médico del norte de Florida gracias al reconocido sistema hospitalario UF Health Shands Hospital y al HCA Florida North Florida Hospital. Los residentes del Condado de Alachua que dependen de Medicare Original a menudo necesitan protección frente a deducibles y al coseguro del 20% sin límite de la Parte B. Con un Suplemento de Medicare (Medigap Plan G o Plan N), usted obtiene acceso directo y sin restricciones a UF Health Shands, HCA Florida y al Malcom Randall VA Medical Center, sin requerir redes restrictivas HMO ni referidos de médicos primarios.</p>
        <ul>
          <li>Libertad total para elegir médicos y especialistas en UF Health Shands.</li>
          <li>Sin demoras de autorizaciones previas para tratamientos o cirugías.</li>
          <li>Garantía de cobertura médica válida en cualquier hospital de Florida y de todo Estados Unidos.</li>
        </ul>
      </section>

      <section>
        <h2>Final Expense Gainesville: Seguro de Gastos Finales y Entierro</h2>
        <p>Los costos promedio de funerales y cremaciones en Gainesville, Archer, Newberry y High Springs oscilan entre $7,200 y $9,800. Dado que el beneficio único por fallecimiento del Seguro Social federal es de solo $255, una póliza de gastos finales de vida entera garantiza entre $5,000 y $35,000 en efectivo inmediato a sus beneficiarios, con primas congeladas de por vida y sin necesidad de examen médico tradicional. Sus seres queridos tienen total libertad para coordinar servicios con funerarias y cementerios locales de Alachua County, tales como Forest Meadows Funeral Home & Cemetery, Williams-Thomas Funeral Homes, Milam Funeral and Cremation Services, Chestnut Funeral Home y Prairie Creek Conservation Cemetery.</p>
      </section>

      <section>
        <h2>IUL Gainesville: Seguro de Vida Universal Indexada con Ventajas Fiscales</h2>
        <p>Para la comunidad académica de la University of Florida (UF), el personal médico de UF Health, veteranos y trabajadores del VA Medical Center, y dueños de empresas locales en Gainesville y Alachua, el IUL (Indexed Universal Life) ofrece una estrategia eficiente para complementar planes 403(b), 401(k) o el Florida Retirement System (FRS). Con un piso contractual del 0% frente a caídas del mercado de valores y acceso a préstamos de póliza con ventajas fiscales bajo la Sección 7702 del IRS, el IUL protege a su familia mientras acumula valor en efectivo.</p>
      </section>

      <section>
        <h2>Annuities Gainesville: Anualidades Fijas y Pensión Vitalicia Garantizada</h2>
        <p>Para los jubilados en Gainesville, incluyendo residentes de comunidades como Oak Hammock at UF, The Village y Haile Plantation, las Anualidades Fijas de Garantía Multianual (MYGA) y las Anualidades Fijas Indexadas (FIA) proporcionan protección contractual del capital principal contra la volatilidad bursátil. Disfrute de crecimiento con impuestos diferidos y cláusulas de ingresos vitalicios garantizados que proporcionan un sueldo predecible de por vida que jamás podrá sobrevivir.</p>
      </section>

      <section>
        <h2>Andres Bozo: Su Corredor Independiente de Confianza en Alachua County</h2>
        <p>Andrés Bozo (NPN: 21228432) es un corredor de seguros independiente con licencia activa ante el Departamento de Servicios Financieros de Florida (DFS). Al ser una agencia independiente, AHB Insurance Solutions compara objetivamente opciones entre más de 80 compañías aseguradoras nacionales líderes, garantizando una recomendación honesta, personalizada y 100% gratuita, sin costo adicional ni comisiones cobradas al asegurado.</p>
      </section>

      <section>
        <h2>Dirección, Teléfono y Mapa de Ubicación en Gainesville</h2>
        <p><strong>Dirección de la Oficina:</strong> 5500 SW Archer Road, Apt H103, Gainesville, FL 32607 (Condado de Alachua, cerca de Celebration Pointe y Butler Plaza, salida 384 de la I-75).</p>
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
        <h3>¿Puedo utilizar un Suplemento de Medicare (Medigap) en UF Health Shands Hospital?</h3>
        <p>Sí, absolutamente. Con un plan Medigap (como Plan G o Plan N), usted puede atenderse con cualquier médico o especialista que acepte Medicare en UF Health Shands, HCA Florida y en cualquier hospital del país, sin restricciones de red ni necesidad de referidos.</p>

        <h3>¿Dónde está ubicada la oficina de AHB Insurance Solutions en Gainesville?</h3>
        <p>Nuestra sede física se encuentra en 5500 SW Archer Road, Apt H103, Gainesville, FL 32607. Atendemos a clientes de todo el Condado de Alachua con cita previa, por teléfono al (352) 225-8389 o por videoconferencia.</p>

        <h3>¿Cobran honorarios por comparar planes o cotizar seguros?</h3>
        <p>No. Nuestros servicios de consultoría, comparación entre más de 80 aseguradoras y tramitación de pólizas son 100% gratuitos para el consumidor. Las aseguradoras nos compensan directamente bajo tarifas reguladas por el estado de Florida.</p>

        <h3>¿Ofrecen atención bilingüe en español en Gainesville?</h3>
        <p>Sí. El corredor Andrés Bozo es completamente bilingüe (español e inglés), facilitando que la comunidad hispana de Gainesville y Alachua County comprenda cada detalle de su póliza con claridad.</p>
      </section>

      <section>
        <h2>Solicite una Consulta Gratuita con Andres Bozo en Gainesville (CTA)</h2>
        <p>Comuníquese hoy mismo al <a href="tel:+13522258389">(352) 225-8389</a> o complete nuestro formulario web para recibir un análisis comparativo personalizado sin costo ni compromiso para Medicare, Gastos Finales, IUL o Anualidades en Gainesville, FL.</p>
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
          ? "Consiga el mejor seguro Medicare en Florida. Comparamos planes Suplementarios de Medicare (Medigap) Partes G y N de aseguradoras líderes. Asesoría gratuita en español." 
          : "Compare Florida Medicare Supplement (Medigap) Plans. Find top Plan G and Plan N rates from top-rated carriers. Guaranteed coverage & no network restrictions in FL.";
        
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
          ? "Seguro de Gastos Finales en Florida 2026 | Entierro y Cobertura Simplificada" 
          : "Burial & Final Expense Insurance Florida | Simplified Issue Coverage";
        description = isEs 
          ? "Pólizas de seguro de gastos finales de entierro en Florida de $5,000 a $35,000. En pólizas estándar, las tarifas se fijan a la edad de emisión. Muchas pólizas de emisión simplificada generalmente no requieren examen médico tradicional." 
          : "Burial Insurance & Funeral Expense Coverage in Florida. $5,000 to $35,000 cash benefits for seniors. Standard level-premium policies lock rates at issue age. Many simplified-issue policies generally do not require a traditional medical exam.";
        
        bodyOutline = `
          <header>
            <h1>${title}</h1>
            <p>${description}</p>
          </header>
          <section>
            <h2>Funeral & Burial Planning Solutions</h2>
            <p>Ensure burial and funeral cost safety for your loved ones with permanent cash benefit plans from $5,000 to $35,000 in Florida. Many simplified-issue and guaranteed-issue policies generally do not require a traditional medical exam, although underwriting requirements, eligibility guidelines, and graded waiting periods vary by carrier and product.</p>
          </section>
        `;
      } else if (cleanPath.includes("annuities") || cleanPath.includes("anualidades")) {
        title = isEs
          ? "Florida Fixed Annuities: MYGA, FIA & Retirement Income Options | AHB Insurance"
          : "Florida Fixed Annuities: MYGA, FIA & Retirement Income Options | AHB Insurance";
        description = isEs
          ? "Guía pilar completa sobre anualidades fijas en Florida: tradicionales, MYGA, FIA y SPIA. Tasas garantizadas, acreditación, liquidez, comparativa con CD e ingresos de jubilación con el broker Andrés H. Bozo."
          : "Comprehensive Florida pillar guide to fixed annuities, MYGAs, Fixed Indexed Annuities (FIA), and SPIAs. Learn interest crediting, liquidity, surrender charges, CD comparison, and lifetime income options with licensed broker Andres H. Bozo.";
        bodyOutline = `
          <header>
            <h1>Florida Fixed Annuities: MYGA, FIA & Retirement Income Options</h1>
            <p>${description}</p>
          </header>
          <main>
            <section>
              <h2>What Is a Fixed Annuity?</h2>
              <p>A fixed annuity is a legally binding contract between an individual and a state-licensed life insurance company. Its primary purpose is to safeguard hard-earned principal, compound interest 100% tax-deferred, and provide contractual mechanisms to convert accumulated savings into a guaranteed, predictable stream of retirement income. Unlike stock market investments, your principal is backed by the insurer's general account statutory reserves and conservative investment-grade bond portfolio.</p>
              <ul>
                <li><strong>Accumulation Phase:</strong> Your principal earns contractually guaranteed interest or index-linked growth without annual 1099 tax erosion.</li>
                <li><strong>Distribution Phase:</strong> You choose how to access your assets: via annual penalty-free withdrawals, a full payout at maturity, or a guaranteed lifetime income stream that you cannot outlive.</li>
              </ul>
            </section>

            <section>
              <h2>Fixed Annuities</h2>
              <p>Traditional fixed annuities declare an annual interest rate credited to your contract value. Key structural elements include:</p>
              <ul>
                <li><strong>Declared Rate:</strong> The insurer announces a competitive interest rate for an initial term (e.g., 1 to 3 years).</li>
                <li><strong>Guaranteed Minimum Floor:</strong> State insurance regulations and the contract mandate a minimum lifetime rate (typically 1.0% to 3.0%) below which the declared yield cannot fall.</li>
                <li><strong>Principal Preservation:</strong> Your initial deposit and all previously credited interest are 100% protected against market declines.</li>
              </ul>
            </section>

            <section>
              <h2>MYGA</h2>
              <p>A Multi-Year Guarantee Annuity (MYGA) is the insurance equivalent of a bank CD, but with tax deferral. You commit your deposit for a fixed period (such as 3, 5, 7, or 10 years), and the insurer contractually guarantees the exact same annual interest rate for every year of that term.</p>
              <ul>
                <li><strong>Zero Rate Volatility:</strong> The crediting rate never fluctuates during your chosen commitment window.</li>
                <li><strong>Flexible Maturity Options:</strong> At term end, you can withdraw your funds in full, renew at current market rates, or perform an IRS Section 1035 tax-free rollover into a new contract.</li>
                <li><strong>Compounding Power:</strong> Earnings remain in the contract and compound without annual tax drag.</li>
              </ul>
            </section>

            <section>
              <h2>Fixed Indexed Annuities</h2>
              <p>A Fixed Indexed Annuity (FIA) offers interest potential linked to the positive performance of an external financial benchmark (such as the S&P 500), while contractually guaranteeing zero loss of principal when the index declines.</p>
              <ul>
                <li><strong>Contractual 0% Floor:</strong> If the underlying market index loses value over the crediting period, your credited interest is simply 0%. You never lose principal or locked gains.</li>
                <li><strong>Annual Reset Feature:</strong> At each contract anniversary, gains are locked in and become your new guaranteed principal baseline for future periods.</li>
                <li><strong>Growth Levers:</strong> Returns are governed by contractual crediting formulas such as cap rates, participation rates, or spreads.</li>
              </ul>
            </section>

            <section>
              <h2>SPIA</h2>
              <p>A Single Premium Immediate Annuity (SPIA) is designed for individuals requiring immediate guaranteed cash flow. You deposit a single lump sum, and the insurer begins paying guaranteed monthly or annual checks immediately (typically within 30 days to 12 months).</p>
              <ul>
                <li><strong>Immediate Cash Flow:</strong> Ideal for retirees facing an immediate retirement income shortfall.</li>
                <li><strong>Exclusion Ratio Advantage:</strong> A portion of each payout represents a tax-free return of principal, lowering your immediate tax bill compared to standard distributions.</li>
                <li><strong>Irrevocable Conversion:</strong> In exchange for guaranteed lifetime payments, the lump sum is annuitized and cannot typically be surrendered.</li>
              </ul>
            </section>

            <section>
              <h2>Lifetime Income</h2>
              <p>Longevity risk—outliving one's savings—is the single greatest financial hazard in modern retirement. Fixed annuities solve this through two distinct lifetime income structures:</p>
              <ul>
                <li><strong>Guaranteed Lifetime Withdrawal Benefit (GLWB):</strong> An optional living benefit rider that calculates a separate 'Income Base'. It pays a guaranteed annual withdrawal percentage for life, even if your account value drops to zero due to longevity, while allowing you to retain control of the underlying cash value.</li>
                <li><strong>Traditional Annuitization:</strong> Irrevocably converting contract balance into a guaranteed income stream based on life expectancy (Single Life, Joint & Survivor, or Period Certain).</li>
              </ul>
            </section>

            <section>
              <h2>Interest Crediting</h2>
              <p>Understanding how insurers credit interest is essential for selecting the right contract:</p>
              <ul>
                <li><strong>Fixed Declared Rate:</strong> A clear, unchanging percentage credited daily or monthly.</li>
                <li><strong>Cap Rate:</strong> The maximum percentage gain credited over a measurement period (e.g., a 9% cap means if the S&P 500 rises 15%, you receive 9%).</li>
                <li><strong>Participation Rate:</strong> The percentage of index gains credited (e.g., an 80% participation rate on a 10% index gain credits 8%).</li>
                <li><strong>Annual Reset:</strong> Locks in index gains at each anniversary, ensuring negative index years never erase previous credits.</li>
              </ul>
            </section>

            <section>
              <h2>Liquidity</h2>
              <p>Modern Florida fixed annuities provide reasonable liquidity for unexpected life events:</p>
              <ul>
                <li><strong>10% Annual Penalty-Free Withdrawals:</strong> Most contracts permit withdrawing up to 10% of accumulated contract value each year after year one without carrier surrender charges.</li>
                <li><strong>Cumulative Interest Access:</strong> Many contracts allow immediate penalty-free withdrawal of earned interest from month one.</li>
                <li><strong>RMD Waivers:</strong> Required Minimum Distributions (RMDs) from qualified IRAs are exempt from surrender charges.</li>
                <li><strong>Confinement & Terminal Illness Waivers:</strong> Grants up to 100% penalty-free access if the owner is confined to a skilled nursing facility or diagnosed with a terminal condition.</li>
              </ul>
            </section>

            <section>
              <h2>Surrender Charges</h2>
              <p>Annuities are designed as medium- to long-term wealth preservation contracts. Withdrawing funds beyond penalty-free limits during the surrender period triggers specific charges:</p>
              <ul>
                <li><strong>Declining Surrender Schedule:</strong> Typically starts between 7% and 10% in Year 1 and decreases by 1% each year until reaching 0%.</li>
                <li><strong>Market Value Adjustment (MVA):</strong> An adjustment reflecting interest rate movements since contract inception, applied only to early excess withdrawals.</li>
                <li><strong>IRS 10% Premature Distribution Penalty:</strong> The IRS assesses a 10% excise tax on taxable earnings withdrawn before age 59½, similar to traditional IRAs.</li>
              </ul>
            </section>

            <section>
              <h2>Tax Considerations</h2>
              <p>Fixed annuities offer substantial tax advantages over taxable bank accounts and CDs:</p>
              <ul>
                <li><strong>100% Tax Deferral:</strong> No annual Form 1099-INT is issued while funds remain inside the contract, enabling triple compounding (interest on principal, interest on interest, and interest on tax savings).</li>
                <li><strong>LIFO Tax Treatment:</strong> Non-qualified withdrawals are taxed on a Last-In, First-Out basis (accumulated earnings withdraw and are taxed first as ordinary income).</li>
                <li><strong>IRS Section 1035 Exchanges:</strong> Allows you to roll over funds from an existing annuity or life insurance policy into a new annuity without triggering a taxable event.</li>
              </ul>
            </section>

            <section>
              <h2>Annuity vs CD</h2>
              <p>Comparing Fixed Annuities (MYGAs) and Bank Certificates of Deposit:</p>
              <ul>
                <li><strong>Tax Treatment:</strong> Bank CD interest is taxed annually as ordinary income (Form 1099-INT). MYGAs compound 100% tax-deferred until withdrawn.</li>
                <li><strong>Backing & Guarantees:</strong> Bank CDs are backed by the FDIC up to $250,000 per institution. Annuities are backed by insurer general account reserves and state guaranty associations (FLAHIGA in Florida).</li>
                <li><strong>Annual Liquidity:</strong> Bank CDs generally charge 3 to 6 months of interest penalties for early withdrawal of any principal. Modern annuities allow 10% penalty-free withdrawals annually.</li>
                <li><strong>Income Conversion:</strong> CDs cannot guarantee income for life; annuities offer guaranteed lifetime income riders.</li>
              </ul>
            </section>

            <section>
              <h2>Who May Consider an Annuity?</h2>
              <p>Fixed annuities are especially well-suited for:</p>
              <ul>
                <li><strong>Pre-Retirees (Ages 50-65):</strong> Seeking to protect their nest egg from market volatility as they near retirement.</li>
                <li><strong>Conservative CD Savers:</strong> Looking for higher yields and relief from annual income taxes on interest.</li>
                <li><strong>Retirees Without Corporate Pensions:</strong> Wanting to create a personal, guaranteed monthly pension paycheck for life.</li>
                <li><strong>401(k) / IRA Rollover Candidates:</strong> Moving employer plan balances into safe, principal-protected vehicles.</li>
              </ul>
            </section>

            <section>
              <h2>Important Considerations</h2>
              <p>Before purchasing an annuity, carefully review these suitability factors:</p>
              <ul>
                <li><strong>Time Horizon:</strong> Commit only funds you do not require for short-term emergency expenses.</li>
                <li><strong>Insurer Financial Strength:</strong> Select carriers rated A- or higher by independent rating agencies like A.M. Best.</li>
                <li><strong>Rider Fees:</strong> Optional income riders (GLWB) typically carry an annual fee (e.g., 0.95% to 1.25%) deducted from contract value.</li>
              </ul>
            </section>

            <section>
              <h2>FAQ</h2>
              <h3>What is the minimum deposit required to open a Florida fixed annuity?</h3>
              <p>Most fixed and indexed annuities require a minimum initial deposit between $10,000 and $25,000, depending on the carrier and product.</p>

              <h3>Can I fund an annuity with an existing traditional IRA or 401(k)?</h3>
              <p>Yes. You can complete a direct, tax-free trustee-to-trustee rollover from an employer 401(k), 403(b), or traditional IRA into a qualified fixed annuity without taxes or penalties.</p>

              <h3>What happens to my annuity balance when I pass away?</h3>
              <p>Annuities feature a designated beneficiary designation that bypasses probate. Your named beneficiaries receive the remaining contract value directly without court delays.</p>
            </section>

            <section>
              <h2>CTA</h2>
              <p>Speak directly with independent licensed broker Andres Bozo (NPN: 21228432) at <a href="tel:+13522258389">(352) 225-8389</a> or request a personalized Florida annuity comparison with zero fees.</p>
            </section>
          </main>
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
            <p>Compare precios de aseguradoras de primer nivel para planes de Medicare Suplementario y Gastos Finales con el broker Andrés Bozo en Orlando.</p>
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
    "identifier": {
      "@type": "PropertyValue",
      "name": "NPN",
      "value": "21228432"
    },
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
  } else if (cleanPath === "/iul-retirement" || cleanPath === "/es/iul-jubilacion") {
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
