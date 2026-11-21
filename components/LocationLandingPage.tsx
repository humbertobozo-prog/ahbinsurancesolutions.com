import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Language, TranslationContent } from '../types';
import { translations } from '../constants/translations';
import { TAMPA_IUL_METADATA } from '../data/cityGuidesData';
import { SEOHead } from './SEOHead';
import { BackToTopButton } from './BackToTopButton';
import Footer from './Footer';
import { TapToCallButton } from './TapToCallButton';
import { WhatsAppButton } from './WhatsAppButton';

interface LocationLandingPageProps {
    path: string;
    language: Language;
    setLanguage: (lang: Language) => void;
    renderContactForm: () => React.ReactNode;
    onOpenLegalModal?: (tab: 'terms' | 'privacy') => void;
}

export const LocationLandingPage: React.FC<LocationLandingPageProps> = ({
    path,
    language,
    setLanguage,
    renderContactForm,
    onOpenLegalModal
}) => {
    // If it's the Orlando Spanish page, auto-select Spanish content
    const activeLang = path === '/spanish-insurance-orlando' ? 'es' : language;
    const content: TranslationContent = translations[activeLang];

    // Page-specific SEO configurations
    const getPageDetails = () => {
        switch (path) {
            case '/medicare-florida':
            case '/medicare-supplement-florida':
            case '/es/suplemento-medicare-florida':
            case '/es/seguro-medicare-florida':
                return {
                    title: activeLang === 'es' 
                        ? "Planes Suplementarios Medicare Florida | AHB Insurance" 
                        : "Florida Medicare Supplement Plans 2026–2027 | AHB",
                    description: activeLang === 'es' 
                        ? "Compare planes Suplementarios de Medicare (Medigap) Plan G y N en Florida con tarifas competitivas. Asesoría gratuita en español (NPN 21228432)." 
                        : "Compare Florida Medigap Plan G and Plan N rates side-by-side with nationwide Medicare provider access. Free guidance from Andres Bozo (NPN 21228432).",
                    heading: activeLang === 'es' ? "Seguro Medicare en Florida 2026–2027" : "Medicare Supplement Insurance in Florida",
                    subheading: activeLang === 'es' 
                        ? "Asesoría especializada 100% en español para la comunidad hispana de Florida. Comparamos opciones de Suplementos de Medicare (Medigap Plan G y N) para cobertura 2026 y la transición AEP 2027." 
                        : "Florida Seniors: Compare monthly rates for Medicare Supplement (Medigap) Plan G & Plan N with nationwide provider flexibility.",
                    highlights: activeLang === 'es' ? [
                        { title: "Planes Medigap Plan G y Plan N", desc: "Compare coberturas y primas sin sorpresas ni costos ocultos en Florida." },
                        { title: "Flexibilidad de Proveedores", desc: "Atiéndase con cualquier proveedor a nivel nacional que acepte la asignación de Medicare, sujeto a reglas de Medigap." },
                        { title: "Atención Bilingüe Personalizada", desc: "Hable directamente en español con Andrés Bozo (Broker Licenciado NPN 21228432)." }
                    ] : [
                        { title: "Medigap Plan G & N Comparison", desc: "Compare Plan G and Plan N premiums side-by-side across top Florida carriers." },
                        { title: "Nationwide Provider Flexibility", desc: "See any provider nationwide who accepts Medicare assignment, subject to Medicare and Medigap rules." },
                        { title: "CMS 2026–2027 Clarity", desc: "Compare 2026 vs. 2027 Part B ($283/$292) & Part D ($2,100/$2,400) rules before Dec 7, 2026." }
                    ]
                };
            case '/final-expense-miami':
            case '/es/seguro-gastos-finales-miami':
                return {
                    title: activeLang === 'es' 
                        ? "Gastos Finales y Entierro en Miami | AHB Insurance" 
                        : "Final Expense Insurance Miami, FL | AHB Insurance",
                    description: activeLang === 'es' 
                        ? "Seguro de entierro y gastos finales en Miami-Dade ($5K–$35K). Emisión simplificada con el broker licenciado Andrés Bozo (NPN 21228432)." 
                        : "Miami-Dade burial & final expense life insurance ($5K–$35K). Simplified issue options with licensed broker Andres Bozo (NPN 21228432).",
                    heading: activeLang === 'es' ? "Seguro de Gastos Finales en Miami-Dade" : "Final Expense & Burial Insurance in Miami, FL",
                    subheading: activeLang === 'es' 
                        ? "Ayude a proteger a su familia en Miami, Hialeah y Doral frente a costos de funeral y cremación ($8,500–$12,500+). Pólizas de vida entera con primas niveladas según su edad de emisión." 
                        : "Help protect your Miami-Dade family from $8,500–$12,500+ funeral and cremation bills. Permanent whole life coverage with locked issue-age premiums.",
                    highlights: activeLang === 'es' ? [
                        { title: "Emisión Simplificada en Miami", desc: "Muchas pólizas de emisión simplificada no requieren examen médico tradicional, sujetas a suscripción médica de la aseguradora." },
                        { title: "Primas Niveladas de Por Vida", desc: "Sus primas quedan fijadas según su edad de emisión y no aumentan mientras mantenga sus pagos al día." },
                        { title: "Asesoría Directa en Español", desc: "Revise opciones en Miami-Dade y Broward directamente con el broker Andrés H. Bozo (NPN 21228432)." }
                    ] : [
                        { title: "Simplified Issue Options", desc: "Many simplified-issue policies do not require a traditional medical exam, subject to carrier underwriting." },
                        { title: "Direct Beneficiary Payout", desc: "Death benefit funds go directly to beneficiaries per policy terms (generally favorable tax treatment under IRC §101(a))." },
                        { title: "Locked Issue-Age Rates", desc: "Your monthly rate locks at your issue age and will not increase as long as required premiums are paid." }
                    ]
                };
            case '/burial-insurance-tampa':
            case '/es/seguro-gastos-finales-tampa':
            case '/es/seguro-gastos-finales-florida':
                return {
                    title: activeLang === 'es' 
                        ? "Gastos Finales y Entierro Tampa Bay | AHB Insurance" 
                        : "Burial Insurance Tampa Bay, FL | AHB Insurance",
                    description: activeLang === 'es' 
                        ? "Seguro de entierro y gastos finales en Tampa Bay y Florida ($5K–$35K). Cobertura de vida entera con el broker Andrés Bozo (NPN 21228432)." 
                        : "Tampa Bay & Hillsborough County burial insurance ($5K–$35K). Level-premium whole life options with licensed broker Andres Bozo (NPN 21228432).",
                    heading: activeLang === 'es' ? "Seguro de Gastos Finales y Entierro en Tampa Bay" : "Burial & Final Expense Insurance in Tampa Bay, FL",
                    subheading: activeLang === 'es' 
                        ? "Cobertura de vida entera permanente para familias en Tampa, St. Petersburg y Clearwater frente a costos funerarios ($7,500–$11,500+), con primas niveladas mientras se paguen las cuotas requeridas." 
                        : "Permanent whole life protection for Tampa, St. Petersburg & Clearwater seniors facing $7,500–$11,500+ funeral costs, with locked issue-age rates.",
                    highlights: activeLang === 'es' ? [
                        { title: "Emisión Simplificada", desc: "Muchas pólizas de emisión simplificada no requieren examen médico tradicional; la elegibilidad depende de la aseguradora." },
                        { title: "Primas Niveladas de Por Vida", desc: "Sus primas quedan fijadas según su edad de emisión y no aumentan mientras la póliza se mantenga activa." },
                        { title: "Beneficio por Fallecimiento Directo", desc: "Sus beneficiarios reciben el beneficio según los términos de la póliza para cubrir funeral o deudas (IRC §101(a))." }
                    ] : [
                        { title: "Simplified Issue Options", desc: "Many simplified-issue policies do not require a traditional medical exam, subject to carrier underwriting requirements." },
                        { title: "Direct Death Benefit Payout", desc: "Beneficiaries receive death benefit funds per policy provisions to handle burial, cremation, or debts (IRC §101(a))." },
                        { title: "Locked Issue-Age Rates", desc: "Your premium is locked at your issue age and will not increase as long as required premiums are paid." }
                    ]
                };
            case '/annuities-florida':
            case '/es/anualidades-florida':
                return {
                    title: activeLang === 'es'
                        ? "Anualidades Fijas e Indexadas FL | AHB Insurance"
                        : "Florida Fixed & Indexed Annuities | AHB Insurance",
                    description: activeLang === 'es'
                        ? "Compare anualidades fijas, MYGA y FIA en Florida. Términos contractuales de protección del capital con el broker licenciado Andrés H. Bozo."
                        : "Compare Florida fixed annuities, MYGAs & Fixed Indexed Annuities (FIA). Contractual principal protection terms with licensed broker Andres H. Bozo.",
                    heading: activeLang === 'es' ? "Anualidades Fijas e Indexadas en Florida" : "Fixed & Indexed Annuities in Florida",
                    subheading: activeLang === 'es'
                        ? "Las anualidades fijas pueden brindar términos de interés contractualmente garantizados, sujetos a la solidez financiera de la aseguradora emisora."
                        : "Fixed annuities can provide contractually guaranteed interest terms, subject to the financial strength of the issuing insurer and the specific contract.",
                    highlights: activeLang === 'es' ? [
                        { title: "Protección del Principal", desc: "Su capital principal acumulado está protegido frente a caídas de la bolsa según el contrato emitido." },
                        { title: "Términos Contractuales Claros", desc: "Rendimientos respaldados por la solidez y solvencia de la aseguradora emisora." },
                        { title: "Ingresos de Retiro Predecibles", desc: "Opción de convertir su saldo en flujo mensual de ingresos sujeto a los términos del contrato." }
                    ] : [
                        { title: "Principal Protection", desc: "Your accumulated principal balance is contractually shielded from direct stock market index losses." },
                        { title: "Contractual Interest Terms", desc: "Fixed annuities can provide contractually guaranteed interest terms, subject to insurer financial strength." },
                        { title: "Lifetime Income Options", desc: "Optional income riders convert savings into predictable retirement payouts per contract terms." }
                    ]
                };
            case '/dental-vision-florida':
            case '/es/dental-vision-florida':
                return {
                    title: activeLang === 'es'
                        ? "Planes Dentales y Visión Florida | AHB Insurance"
                        : "Florida Senior Dental & Vision Plans | AHB Insurance",
                    description: activeLang === 'es'
                        ? "Seguros dentales, visión y audición en Florida para mayores de 65. Compare planes para limpiezas, coronas y lentes con Andrés Bozo."
                        : "Dental, vision & hearing insurance for Florida seniors. Compare preventive care, crowns, dentures & eyewear plans with Andres Bozo (NPN 21228432).",
                    heading: activeLang === 'es'
                        ? "Seguros Dentales, de Visión y Audición en Florida"
                        : "Senior Dental, Vision & Hearing Insurance in Florida",
                    subheading: activeLang === 'es'
                        ? "Complemente Medicare Original o Medigap con cobertura accesible para limpiezas dentales, coronas, prótesis, lentes graduados y exámenes de audición en Florida."
                        : "Complement Original Medicare or Medigap with affordable coverage for dental cleanings, crowns, dentures, prescription eyewear, and hearing exams across Florida.",
                    highlights: activeLang === 'es' ? [
                        { title: "Cobertura Preventiva Inmediata", desc: "Planes disponibles sin períodos de espera para limpiezas de rutina, radiografías y exámenes orales." },
                        { title: "Coronas, Prótesis e Implantes", desc: "Beneficios anuales crecientes para procedimientos mayores tras los períodos de espera aplicables." },
                        { title: "Amplia Red Dental y Óptica FL", desc: "Elija entre dentistas y optometristas participantes en todo el estado de Florida." }
                    ] : [
                        { title: "Preventive Care Access", desc: "Plans available with zero waiting periods for routine dental cleanings, X-rays, and oral exams." },
                        { title: "Crowns, Dentures & Implants", desc: "Increasing annual maximums helping lower out-of-pocket costs for major dental services." },
                        { title: "Wide Florida Provider Network", desc: "Choose from thousands of participating Florida dentists, optometrists, and hearing specialists." }
                    ]
                };
            case '/iul-retirement-tampa':
            case '/es/iul-jubilacion-tampa':
                return {
                    title: activeLang === 'es' ? TAMPA_IUL_METADATA.titleEs : TAMPA_IUL_METADATA.titleEn,
                    description: activeLang === 'es' ? TAMPA_IUL_METADATA.descriptionEs : TAMPA_IUL_METADATA.descriptionEn,
                    heading: activeLang === 'es' ? TAMPA_IUL_METADATA.headingEs : TAMPA_IUL_METADATA.headingEn,
                    subheading: activeLang === 'es' ? TAMPA_IUL_METADATA.subheadingEs : TAMPA_IUL_METADATA.subheadingEn,
                    highlights: activeLang === 'es' ? TAMPA_IUL_METADATA.highlightsEs : TAMPA_IUL_METADATA.highlightsEn
                };
            case '/orlando-spanish-insurance':
            case '/es/seguros-orlando':
            case '/spanish-insurance-orlando':
            default:
                return {
                    title: activeLang === 'es' 
                        ? "Seguros de Vida y Medicare Orlando | AHB Insurance" 
                        : "Orlando Bilingual Insurance Broker | AHB Insurance",
                    description: activeLang === 'es' 
                        ? "Broker bilingüe de Medicare, Gastos Finales e IUL en Orlando y Kissimmee. Asesoría gratuita en español con Andrés Bozo (NPN 21228432)." 
                        : "Bilingual Medicare, Final Expense & IUL insurance broker serving Orlando, Kissimmee & Orange County. Free guidance: Andres Bozo NPN 21228432.",
                    heading: activeLang === 'es' ? "Seguros de Vida y Medicare en Orlando" : "Medicare & Life Insurance in Orlando, FL",
                    subheading: activeLang === 'es' 
                        ? "Asesoría profesional en español para familias de Florida Central. Comparamos objetivamente pólizas de aseguradoras nacionales calificadas sin costos de corretaje." 
                        : "Independent bilingual brokerage comparing top-rated carriers for Central Florida families in English and Spanish with zero broker fees.",
                    highlights: activeLang === 'es' ? [
                        { title: "Planes de Medicare 2026–2027", desc: "Partes A, B, C y D simplificadas para hispanohablantes en Orlando y Kissimmee." },
                        { title: "Gastos Finales de Entierro", desc: "Pólizas permanentes de vida entera diseñadas para ayudar a su familia a cubrir costos funerarios." },
                        { title: "Atención 100% en Español", desc: "Hable directamente con Andrés Bozo (NPN 21228432) en su idioma sin intermediarios." }
                    ] : [
                        { title: "2026–2027 Medicare Plans", desc: "Parts A, B, C & D comparison for Central Florida retirees and seniors." },
                        { title: "Final Expense Burial Plans", desc: "Level-premium whole life funeral coverage protecting family finances." },
                        { title: "100% Bilingual Brokerage", desc: "Direct consultations in English & Spanish with licensed broker Andres Bozo." }
                    ]
                };
        }
    };

    const details = getPageDetails();
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${path}`;

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "InsuranceAgency",
        "@id": `${baseUrl}/#organization`,
        "name": "AHB Insurance Solutions",
        "url": canonical,
        "telephone": "+1-352-225-8389",
        "email": "andreshbozo@ahbinsurancesolutions.com",
        "description": details.description,
        "publicAccess": false,
        "areaServed": {
            "@type": "State",
            "name": "Florida"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gainesville",
            "addressRegion": "FL",
            "postalCode": "32607",
            "addressCountry": "US"
        },
        "identifier": {
            "@type": "PropertyValue",
            "name": "NPN",
            "value": "21228432"
        },
        "sameAs": [
            "https://www.facebook.com/ahbinsurancesolutions",
            "https://www.instagram.com/ahbinsurancesolutions",
            "https://www.linkedin.com/in/andres-bozo-npn-21228432",
            "https://licenseesearch.fldfs.com/",
            "https://nipr.com/licensing-center/look-up-a-national-producer-number"
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": activeLang === 'es' ? "Inicio" : "Home",
                "item": `${baseUrl}${activeLang === 'es' ? '/es' : '/'}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": details.heading,
                "item": canonical
            }
        ]
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [path, activeLang]);

    const getExtendedGuide = () => {
        if (path.includes('dental') || path.includes('vision')) {
            return activeLang === 'es' ? {
                heading: 'Cómo Elegir un Plan Dental, de Visión y Audición (DVH) en Florida',
                paragraphs: [
                    'Medicare Original (Partes A y B) y las pólizas suplementarias Medigap no cubren limpiezas dentales de rutina, empastes, coronas, prótesis totales, implantes, lentes graduados ni audífonos medicados. Contar con una póliza combinada Dental, Visión y Audición (DVH) evita pagar facturas odontológicas completas de su propio bolsillo.',
                    'Al comparar planes DVH en Florida conviene revisar tres factores clave: 1) si su dentista actual en Miami, Tampa, Orlando, Jacksonville o Gainesville participa en la red PPO; 2) los períodos de espera iniciales (muchos contratos cubren prevención desde el día 1 y aplican de 6 a 12 meses para coronas o prótesis, aunque cobertura previa elegible a veces reduce esperas); y 3) el máximo anual creciente de beneficios ($1,500 a $3,000+).'
                ],
                faqs: [
                    { q: '¿Cubre Medigap Plan G o Plan N limpiezas dentales o lentes?', a: 'No. Los planes Medigap estandarizados únicamente cubren costos compartidos médicos bajo Medicare Original; para dentista, optometría y audífonos requiere un plan DVH independiente o beneficios incluidos en ciertos planes Advantage.' },
                    { q: '¿Puedo mantener a mi dentista en Florida con un plan DVH?', a: 'Muchos planes PPO permiten elegir libremente cualquier dentista licenciado dentro o fuera de la red, logrando mayores descuentos dentro de la red contratada.' }
                ]
            } : {
                heading: 'How to Evaluate Senior Dental, Vision & Hearing (DVH) Coverage in Florida',
                paragraphs: [
                    'Original Medicare (Parts A and B) and standardized Medigap plans do not pay for routine dental cleanings, fillings, crowns, root canals, dentures, dental implants, routine eye exams for eyeglasses, or prescription hearing aids. Pairing Original Medicare or Medigap with an affordable standalone DVH policy helps retirees budget predictable care.',
                    'When comparing Florida DVH plans side by side, check three essential details: 1) whether your current dentist or oral surgeon in Miami, Tampa, Orlando, Jacksonville, or Gainesville participates in the PPO network; 2) initial waiting periods (most policies cover 100% preventive care from Day 1 while applying 6–12 month waits on major crowns, bridges, or dentures unless prior creditable dental coverage applies); and 3) annual maximum payouts ranging from $1,500 to $3,000+.'
                ],
                faqs: [
                    { q: 'Does Medigap Plan G or Plan N cover routine dental cleanings or eyeglasses?', a: 'No. Standardized Medigap policies cover Medicare Part A and Part B hospital/medical gaps only; standalone Dental, Vision & Hearing insurance fills the oral, optical, and hearing care gap.' },
                    { q: 'Are dental waiting periods ever waived for Florida seniors?', a: 'Some national carriers waive 6- or 12-month major restorative waiting periods if you provide proof of continuous prior creditable dental coverage within the last 60 to 90 days.' }
                ]
            };
        }
        if (path.includes('miami')) {
            return activeLang === 'es' ? {
                heading: 'Costos Funerarios Reales y Suscripción en Miami-Dade County',
                paragraphs: [
                    'En Miami, Hialeah, Doral, Kendall, Coral Gables y Homestead, un funeral tradicional completo con servicio en capilla, ataúd y lote en cementerio suele oscilar entre $8,500 y $12,500+. Considerando que el beneficio único por fallecimiento del Seguro Social federal es de apenas $255 para sobrevivientes elegibles, contar con $5,000 a $35,000 de protección permanente de vida entera protege los ahorros de su cónyuge e hijos.',
                    'Sus beneficiarios mantienen libertad total para utilizar el pago en cualquier funeraria local de Miami-Dade —incluyendo Caballero Rivero, Maspons, Van Orsdel o Memorial Plan— sin quedar atados a planes prepagados rígidos, y las primas se fijan según su edad de emisión mientras se mantengan los pagos requeridos.'
                ],
                faqs: [
                    { q: '¿Qué diferencia hay entre emisión simplificada y emisión garantizada en Miami?', a: 'La emisión simplificada ofrece cobertura inmediata desde el primer día si responde favorablemente las preguntas médicas (sin examen físico tradicional). La emisión garantizada acepta condiciones crónicas severas con un período gradual inicial (generalmente 2 años).' },
                    { q: '¿El pago de gastos finales llega directamente a mi familia?', a: 'Sí, el beneficio se abona directamente al beneficiario designado conforme a los términos del contrato (generalmente con tratamiento fiscal favorable bajo la Sección 101(a) del IRC).' }
                ]
            } : {
                heading: 'Miami-Dade Funeral Cost Realities & Underwriting Options',
                paragraphs: [
                    'Across Miami, Hialeah, Doral, Kendall, Coral Gables, and Homestead, average traditional funeral, chapel service, casket, and burial costs commonly range from $8,500 to $12,500+. Because Social Security provides only a single $255 lump-sum death payment to eligible survivors, permanent whole life final expense plans offering $5,000 to $35,000 protect family savings from sudden financial strain.',
                    'Beneficiaries keep complete flexibility to coordinate arrangements with any Miami-Dade funeral home or cremation provider rather than locking funds into an inflexible pre-need contract, while locked issue-age monthly premiums stay predictable as long as required premiums remain paid.'
                ],
                faqs: [
                    { q: 'How does simplified issue compare with guaranteed issue burial coverage in Miami?', a: 'Simplified-issue plans offer Day-1 level coverage without a traditional medical exam when health and prescription history meet carrier underwriting rules; guaranteed-issue plans approve applicants regardless of health history but include an initial graded waiting period.' },
                    { q: 'Do premiums ever go up as I get older in Miami?', a: 'No. Whole life final expense monthly rates lock at your issue age and remain level for life provided required premiums stay current.' }
                ]
            };
        }
        if (path.includes('burial') || path.includes('gastos-finales-tampa') || path.includes('gastos-finales-florida')) {
            return activeLang === 'es' ? {
                heading: 'Planificación Funeraria en Tampa, St. Petersburg y Clearwater',
                paragraphs: [
                    'En el área metropolitana de Tampa Bay —abarcando Hillsborough y Pinellas County— los servicios funerarios promedio y cremaciones conmemorativas oscilan entre $7,500 y $11,500+. Una póliza permanente de gastos finales ($5,000 a $35,000) entrega liquidez directa a su familia para cubrir funeraria, saldos médicos pendientes u otros gastos finales sin vender propiedades ni vaciar cuentas de retiro.',
                    'Sus seres queridos pueden elegir cualquier funeraria local en Tampa, Brandon, Carrollwood, Riverview, St. Petersburg o Clearwater (como Blount & Curry, Gonzalez Funeral Home o Sylvan Abbey) y muchas opciones de emisión simplificada no exigen análisis médicos tradicionales, sujetas a suscripción.'
                ],
                faqs: [
                    { q: '¿Califico en Tampa si tengo diabetes o hipertensión controlada?', a: 'Sí. Muchas aseguradoras nacionales aprueban solicitantes con diabetes tipo 2 o presión arterial controlada mediante emisión simplificada con cobertura nivelada, sujeto a revisión de recetas y cuestionario de salud.' },
                    { q: '¿Cuánto tardan en pagar los beneficios tras el fallecimiento?', a: 'La mayoría de las aseguradoras procesan reclamaciones completas de gastos finales en pocos días hábiles una vez recibido el certificado de defunción y formulario de reclamo.' }
                ]
            } : {
                heading: 'Tampa Bay Burial Planning Across Hillsborough & Pinellas Counties',
                paragraphs: [
                    'Throughout Tampa, Brandon, Riverview, St. Petersburg, and Clearwater, average funeral and memorial cremation bills range between $7,500 and $11,500+. Permanent whole life burial policies offering $5,000 to $35,000 give surviving spouses or adult children direct funds to pay funeral directors, final medical balances, and memorial costs without depleting retirement accounts.',
                    'Families retain full choice of any funeral provider across Tampa Bay—without pre-need contract restrictions—and many simplified-issue contracts skip blood draws or physical nurse visits, subject to standard carrier underwriting questions and prescription checks.'
                ],
                faqs: [
                    { q: 'Can Tampa seniors with well-managed diabetes or hypertension qualify for Day-1 coverage?', a: 'Yes. Many top-rated insurers offer immediate level coverage under simplified underwriting for applicants with controlled chronic conditions, depending on prescription history and carrier criteria.' },
                    { q: 'How long do locked issue-age rates stay level?', a: 'Rates lock at your issue age and remain level for life provided required monthly premiums continue to be paid.' }
                ]
            };
        }
        if (path.includes('iul')) {
            return activeLang === 'es' ? {
                heading: 'Cómo Funciona el Piso del 0% y el Código IRS 7702 en Tampa Bay',
                paragraphs: [
                    'Profesionales de la salud en Westshore, dueños de empresas en Tampa y familias en St. Petersburg emplean seguros de Vida Universal Indexada (IUL) para combinar protección permanente por fallecimiento con potencial acumulación de valor en efectivo ligada al S&P 500, sujeta a topes y tasas de participación.',
                    'Es fundamental entender cómo opera la estructura contractual: el componente de acreditación indexada puede contar con un piso contractual del 0% frente a años negativos del índice bursátil; sin embargo, los cargos internos del seguro (COI), costos administrativos y tarifas de cláusulas adicionales continúan deduciéndose del valor en efectivo. Cuando se estructura adecuadamente sin convertirse en un MEC y permanece vigente, los préstamos sobre póliza pueden acceder al efectivo con tratamiento fiscal potencialmente favorable (consulte a su asesor tributario).'
                ],
                faqs: [
                    { q: '¿Qué diferencia a un IUL de un plan 401(k) o Roth IRA para residentes de Tampa?', a: 'A diferencia del 401(k) o Roth IRA, un IUL no tiene límites federales de ingresos para contribuir, ofrece beneficio por fallecimiento y acceso a préstamos antes de los 59½ años cuando la póliza está bien financiada, además de protecciones legales estatutarias en Florida (FS 222.14).' },
                    { q: '¿El valor en efectivo de un IUL puede bajar aunque el índice tenga piso del 0%?', a: 'Sí. El piso del 0% evita que se acredite un interés negativo por caída del índice, pero el costo mensual del seguro (COI), gastos de póliza y cargos adicionales siguen descontándose del valor acumulado.' }
                ]
            } : {
                heading: 'Understanding Contractual 0% Index Floors & IRS Section 7702 in Tampa',
                paragraphs: [
                    'Physicians near Tampa General, Westshore executives, and St. Petersburg business owners use Indexed Universal Life (IUL) policies to pair permanent death benefit protection with supplemental cash value accumulation potential linked to external indices like the S&P 500, subject to contractual cap and participation rates.',
                    'Clear contract transparency matters: while the index-crediting component may include a contractual 0% floor so negative index years do not trigger negative index crediting, internal Cost of Insurance (COI) deductions, administrative fees, and rider charges still apply to policy cash value. Properly funded non-MEC policies kept in force may access accumulated cash value via policy loans under IRS Section 7702 (consult a qualified tax professional).'
                ],
                faqs: [
                    { q: 'Can an IUL cash value still decline during a 0% index crediting year?', a: 'Yes. The contractual 0% floor applies strictly to the index crediting rate itself; ongoing Cost of Insurance (COI), policy fees, and optional rider deductions still reduce cash value if crediting equals 0%.' },
                    { q: 'Does Florida law offer creditor protection on life insurance cash value?', a: 'Under Florida Statute 222.14, cash surrender value and proceeds of life insurance policies payable to qualifying beneficiaries receive statutory creditor protections subject to legal review.' }
                ]
            };
        }
        return activeLang === 'es' ? {
            heading: 'Asesoría Bilingüe en Florida Central (2026–2027) y Comparativa de Redes',
            paragraphs: [
                'En Orlando, Kissimmee, Lake Nona y Winter Park, elegir correctamente entre sistemas como AdventHealth Orlando y Orlando Health depende de revisar redes médicas, deducibles vigentes y formularios de medicamentos antes del 7 de diciembre de 2026. Para 2026, Medicare contempla un deducible de Parte B de $283, prima estándar de $202.90/mes, deducible hospitalario Parte A de $1,736, tope Parte D de $2,100 y tope máximo federal Advantage en red de $9,250; para cobertura 2027, CMS estableció un deducible Parte B de $292, prima estándar Parte B de $209.40/mes, deducible Parte A de $1,776, tope Parte D de $2,400 y tope máximo federal Advantage en red de $9,850 (cada plan puede fijar un límite menor).',
                'Para quienes buscan protección familiar y planificación de retiro, comparamos pólizas permanentes de Gastos Finales ($5,000–$35,000), Dental y Visión, Anualidades Fijas e IUL con explicaciones transparentes de cargos contractuales y sin honorarios de corretaje. Aviso CMS: No ofrecemos todos los planes disponibles en su área; visite Medicare.gov o llame al 1-800-MEDICARE para conocer todas sus opciones.'
            ],
            faqs: [
                { q: '¿Cuál es la fecha límite clave del periodo AEP de Medicare?', a: 'El Periodo Anual de Inscripción (AEP) culmina el 7 de diciembre de 2026 (y cada año del 15 de octubre al 7 de diciembre) para cambios efectivos el 1 de enero de 2027.' },
                { q: '¿Tiene algún costo hablar en español con Andrés Bozo en Orlando o Kissimmee?', a: 'Ninguno. Nuestra asesoría y comparativa independiente entre aseguradoras licenciadas en Florida es 100% gratuita para usted.' }
            ]
        } : {
            heading: 'Central Florida Bilingual Medicare & Life Planning (2026–2027 Guide)',
            paragraphs: [
                'Across Orlando, Kissimmee, Lake Nona, and Winter Park, coordinating coverage around AdventHealth Orlando and Orlando Health begins with verifying hospital acceptance, prescription formularies, and out-of-pocket caps before December 7, 2026. For 2026, CMS sets the Part B deductible at $283 ($202.90/mo standard premium), Part A deductible at $1,736, Part D Rx cap at $2,100, and mandatory Advantage in-network MOOP ceiling at $9,250; for 2027 coverage, CMS finalized a $292 Part B deductible, $209.40/mo Part B standard premium, $1,776 Part A deductible, $2,400 Part D cap, and $9,850 federal Advantage MOOP ceiling (individual plans may set lower limits).',
                'Beyond Medicare, bilingual consultations cover permanent Final Expense policies ($5,000–$35,000), Senior Dental & Vision plans, Fixed Annuities, and IUL policies with transparent explanations of policy charges and zero broker fees. CMS Notice: We do not offer every plan available in your area; please contact Medicare.gov or 1-800-MEDICARE for information on all your options.'
            ],
            faqs: [
                { q: 'When does the Medicare Annual Enrollment Period (AEP) end?', a: 'AEP runs from October 15 through December 7, 2026 for 2027 coverage changes taking effect on January 1, 2027.' },
                { q: 'Do I pay higher premiums when working with bilingual broker Andres Bozo?', a: 'No. Florida insurance rates are regulated and identical whether you enroll directly or through our agency at zero service fee.' }
            ]
        };
    };

    const extendedGuide = getExtendedGuide();

    return (
        <div className="bg-white text-dark-gray font-sans flex flex-col min-h-screen pb-20 md:pb-0">
            <SEOHead 
                title={details.title}
                description={details.description}
                pathname={path}
                language={activeLang}
                ogImage={
                    path.includes('miami') || path.includes('burial') || path.includes('gastos-finales')
                        ? "https://www.ahbinsurancesolutions.com/og/final-expense-og.jpg"
                        : path.includes('iul')
                        ? "https://www.ahbinsurancesolutions.com/og/iul-og.jpg"
                        : path.includes('medicare')
                        ? "https://www.ahbinsurancesolutions.com/og/medicare-og.jpg"
                        : path.includes('annuit') || path.includes('anualidad')
                        ? "https://www.ahbinsurancesolutions.com/og/annuities-og.jpg"
                        : path.includes('dental')
                        ? "https://www.ahbinsurancesolutions.com/og/dental-vision-og.jpg"
                        : path.includes('orlando')
                        ? "https://www.ahbinsurancesolutions.com/og/andres-bozo-og.jpg"
                        : "https://www.ahbinsurancesolutions.com/og-image.png"
                }
                ogImageAlt={details.title}
                datePublished="2024-01-15"
                dateModified="2026-11-18"
                schema={[localBusinessSchema, breadcrumbSchema]}
            />
            {/* Header / Sub Nav */}
            <header className="sticky top-0 bg-primary z-50 text-white border-b border-white/5 shadow-md">
                <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <a href={activeLang === 'es' ? '/es' : '/'} className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-accent">
                        <div className="bg-accent text-primary p-2.5 rounded-xl font-black text-xl tracking-tight shadow-lg hover:scale-105 active:scale-95 transition-all">
                            AHB
                        </div>
                        <div className="flex flex-col">
                            <span className="font-sans font-black text-sm tracking-widest uppercase text-white leading-none">
                                AHB INSURANCE
                            </span>
                            <span className="font-mono text-[9px] text-accent/80 tracking-widest leading-none mt-1 uppercase font-bold">
                                Solutions
                            </span>
                        </div>
                    </a>

                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#services" className="text-sm font-black uppercase tracking-wider text-gray-300 hover:text-white transition-colors">{content.header.nav.services}</a>
                        <a href="#services" className="text-sm font-black uppercase tracking-wider text-gray-300 hover:text-white transition-colors">{content.header.nav.about}</a>
                        <a href="#contact" className="bg-accent text-primary px-5 py-2 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-[#FFB81C] transition-all shadow-md">
                            {content.header.nav.contact}
                        </a>
                    </nav>

                    {/* Simple Language toggle */}
                    <div className="flex items-center gap-1.5 bg-white/10 rounded-full p-1 border border-white/10">
                        <button 
                            onClick={() => setLanguage('en')} 
                            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all ${activeLang === 'en' ? 'bg-accent text-primary shadow-sm' : 'text-gray-300 hover:text-white'}`}
                        >
                            EN
                        </button>
                        <button 
                            onClick={() => setLanguage('es')} 
                            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all ${activeLang === 'es' ? 'bg-accent text-primary shadow-sm' : 'text-gray-300 hover:text-white'}`}
                        >
                            ES
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {/* Specific Location Hero */}
                <section className="relative bg-[#022A3A] min-h-[40vh] md:min-h-[50vh] flex items-center py-8 md:py-14 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-1.5 bg-accent/25 text-accent text-xs md:text-sm font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-accent/20 mb-4 animate-pulse">
                                Florida Licensed Field Underwriter
                            </span>
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight text-white font-sans">
                                {details.heading}
                            </h1>
                            <p className="text-base md:text-xl text-gray-200 leading-relaxed font-semibold mb-6 max-w-2xl">
                                {details.subheading}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a 
                                    href="#contact" 
                                    className="inline-flex justify-center items-center bg-accent text-primary text-lg font-black px-8 py-5 rounded-xl uppercase tracking-widest hover:bg-[#FFB81C] hover:scale-105 active:scale-95 transition-all shadow-xl group"
                                >
                                    <span>{activeLang === 'es' ? 'Hablar con Andrés' : 'Talk With Andres'}</span>
                                    <ArrowRight className="w-5 h-5 ml-2.5 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </a>
                                <a 
                                    href="tel:+13522258389" 
                                    className="inline-flex justify-center items-center bg-transparent border-2 border-white text-white text-lg font-black px-8 py-5 rounded-xl uppercase tracking-widest hover:bg-white/10 transition-all shadow-md"
                                >
                                    Call +1 (352) 225-8389
                                </a>
                            </div>
                            <p className="text-xs text-gray-300 mt-4 font-mono">
                                {activeLang === 'es'
                                    ? 'Andrés H. Bozo · Broker Licenciado Florida (NPN: 21228432) · Actualizado: 18 Nov 2026'
                                    : 'Andres H. Bozo · Licensed Florida Broker (NPN: 21228432) · Updated: Nov 18, 2026'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* City highlights and benefits */}
                <section id="services" className="py-16 md:py-24 bg-gray-50 border-b border-gray-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight mb-4 text-primary">
                                {activeLang === 'es' ? '¿Por qué elegirnos?' : 'Why Families Choose Us'}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 font-bold leading-relaxed">
                                {activeLang === 'es' 
                                    ? 'Comparamos beneficios del mercado en segundos sin tarifas ocultas ni compromisos.' 
                                    : 'We compare independent options across the state to lock in premium security benefits for less.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {details.highlights.map((item, index) => (
                                <div key={index} className="bg-white p-8 md:p-10 rounded-[1.5rem] shadow-md border border-gray-100 flex flex-col justify-between hover:scale-[1.02] transition-transform">
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-primary mb-3 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-base text-gray-600 font-semibold leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="mt-8 pt-4 border-t border-gray-100">
                                        <a href="#contact" className="text-xs font-black uppercase text-accent tracking-widest hover:text-[#FFB81C]">
                                            {activeLang === 'es' ? 'Verificar Cobertura ➔' : 'Verify Coverage ➔'}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Route-Specific Educational Guide & Local FAQs */}
                <section className="py-12 bg-white border-b border-gray-100">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6 text-sm md:text-base text-gray-700 leading-relaxed">
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                                {extendedGuide.heading}
                            </h2>
                            {extendedGuide.paragraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                        <div className="bg-light-gray rounded-2xl p-6 border border-gray-200 space-y-4">
                            <h3 className="text-lg font-black font-heading text-primary">
                                {activeLang === 'es' ? 'Preguntas Frecuentes Clave' : 'Frequently Asked Questions'}
                            </h3>
                            <dl className="space-y-3">
                                {extendedGuide.faqs.map((faq, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200">
                                        <dt className="font-bold text-primary text-sm mb-1">{faq.q}</dt>
                                        <dd className="text-xs md:text-sm text-gray-700 leading-relaxed">{faq.a}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="pt-4 border-t border-gray-100 space-y-3">
                            <h2 className="text-xl font-black font-heading text-primary">
                                {activeLang === 'es'
                                    ? 'Orientación Independiente y Regulada en Florida'
                                    : 'Independent Florida Guidance With Consumer Transparency'}
                            </h2>
                            <p className="text-sm text-gray-700">
                                {activeLang === 'es'
                                    ? 'Al comparar pólizas en Florida —ya sea Suplemento de Medicare (Medigap Plan G y Plan N), Seguro de Gastos Finales de Entierro, Seguro Dental y Visión o Vida Universal Indexada (IUL)— la estructura contractual exacta depende de su condado, código postal, edad y elegibilidad médica.'
                                    : 'When evaluating coverage across Florida—whether Medicare Supplement (Medigap Plan G and Plan N), Final Expense whole life, Senior Dental and Vision, Fixed Annuities, or Indexed Universal Life (IUL)—contract terms, pricing, and underwriting vary by county, ZIP code, issue age, and health history.'}
                            </p>
                            <p className="text-sm text-gray-700">
                                {activeLang === 'es'
                                    ? 'Andrés H. Bozo (Licencia Florida DFS / NPN 21228432) brinda asesoría bilingüe de forma remota por teléfono y videollamada en Miami, Tampa Bay, Orlando, Jacksonville y todo Florida sin honorarios de corretaje (dirección postal y administrativa en Gainesville: 5500 SW Archer Road, Ste H103, Gainesville, FL 32607; sin atención presencial al público en dicha dirección). La inscripción en planes de Medicare, vida o anualidades no es obligatoria y ninguna cobertura entra en vigor sin solicitud formal y aprobación de la aseguradora.'
                                    : 'Andres H. Bozo (Florida DFS License / NPN 21228432) provides remote bilingual phone and video consultations across Miami-Dade, Hillsborough, Orange, Duval, Broward, and all Florida counties with zero broker fees (mailing/administrative address: 5500 SW Archer Road, Ste H103, Gainesville, FL 32607; no walk-in public office). Coverage is always subject to carrier underwriting and policy terms.'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Embedded Contact form with progress indicators */}
                {renderContactForm()}
            </main>

            {/* Structured Local NAP Footer */}
            <Footer content={content.footer} common={content.common} language={activeLang} onOpenLegalModal={onOpenLegalModal} />
            <WhatsAppButton ariaLabel={content.whatsappButton.ariaLabel} />
            <BackToTopButton />
            <TapToCallButton label={content.tapToCallButton.label} phone={content.tapToCallButton.phone} />
        </div>
    );
};

export default LocationLandingPage;
