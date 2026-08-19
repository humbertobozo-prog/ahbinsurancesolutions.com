import React, { useState } from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { RelatedServices } from './RelatedServices';

interface MedicarePageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const MedicarePage: React.FC<MedicarePageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/medicare' : '/medicare'}`;
    const enUrl = `${baseUrl}/medicare`;
    const esUrl = `${baseUrl}/es/medicare`;

    const title = isEs 
        ? 'Guía Completa de Medicare en Florida 2026: Medigap Plan G, N y Advantage' 
        : 'Florida Medicare & Medigap Complete Guide 2026: Plan G, N & Advantage';

    const description = isEs 
        ? 'Guía autorizada sobre Medicare en Florida 2026. Compare precios de Medigap Plan G y N, Medicare Advantage y Parte D. Asesoría independiente sin costo con Andrés Bozo (NPN 21228432).' 
        : 'Authoritative guide to Florida Medicare 2026. Compare Medigap Plan G & N rates, Medicare Advantage, and Part D coverage. Free broker guidance from Andres Bozo (NPN 21228432).';

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = isEs ? [
        {
            q: "¿Cuál es la diferencia entre Medicare Suplementario (Medigap) y Medicare Advantage en Florida?",
            a: "Medigap (como el Plan G o Plan N) actúa como un seguro secundario al Medicare Original (Partes A y B) y cubre el 20% de coseguros sin restringir su red de médicos ni requerir referidos en ningún hospital o clínica de EE.UU. Por el contrario, Medicare Advantage (Parte C) reemplaza al Medicare Original mediante una red privada (HMO o PPO) con copagos por servicio, requerimientos de autorización previa y limitaciones territoriales dentro de condados específicos de Florida."
        },
        {
            q: "¿Cuándo es el mejor momento para inscribirse en un plan Medigap en Florida?",
            a: "El período ideal es su Período de Inscripción Abierta de Medigap (MOEP), el cual dura 6 meses e inicia el primer día del mes en que cumple 65 años y se inscribe en la Parte B de Medicare. Durante este lapso tiene 'Derecho de Emisión Garantizada', lo que significa que las aseguradoras están obligadas por ley a aceptarlo sin evaluaciones de salud, exámenes médicos ni recargos por condiciones preexistentes."
        },
        {
            q: "¿Puedo cambiarme de Medicare Advantage a un plan Medigap en Florida?",
            a: "Sí, pero en la mayoría de los casos deberá pasar por un proceso de suscripción médica (underwriting), respondiendo cuestionarios de salud, a menos que califique para un Período de Inscripción Especial o derechos de prueba ('trial rights') dentro de sus primeros 12 meses en Medicare Advantage."
        },
        {
            q: "¿Qué son los Cargos en Exceso de la Parte B y cómo me afectan en Florida?",
            a: "Si un médico o especialista no acepta la asignación de Medicare, la ley le permite cobrar hasta un 15% adicional sobre la tarifa aprobada por Medicare. El Medigap Plan G cubre el 100% de estos cargos en exceso, mientras que el Plan N no los cubre, aunque muchos médicos en Florida aceptan la asignación estándar."
        },
        {
            q: "¿Cuánto cuestan las primas de Medigap en Florida en 2026?",
            a: "Las tarifas varían según la edad, género, uso de tabaco y código postal en Florida. En promedio, un Plan G para una persona de 65 años oscila entre $140 y $185 al mes, mientras que un Plan N oscila entre $100 y $145 al mes. Florida utiliza la estructura de precios por edad alcanzada (Attained-Age) para la mayoría de las pólizas."
        }
    ] : [
        {
            q: "What is the difference between Medicare Supplement (Medigap) and Medicare Advantage in Florida?",
            a: "Medigap (such as Plan G or Plan N) acts as secondary insurance to Original Medicare (Parts A & B), paying the 20% coinsurance gaps with zero doctor network restrictions or referral mandates anywhere in the U.S. Conversely, Medicare Advantage (Part C) replaces Original Medicare with a private managed-care network (HMO or PPO) requiring copays, prior authorizations, and county-restricted networks in Florida."
        },
        {
            q: "When is the best time to buy a Medigap policy in Florida?",
            a: "Your 6-month Medigap Open Enrollment Period (MOEP) begins the month you turn 65 and are enrolled in Medicare Part B. During this window, you have Guaranteed Issue Rights, meaning insurance carriers cannot deny coverage, apply pre-existing condition waiting periods, or charge higher premiums due to your health history."
        },
        {
            q: "Can I switch from a Medicare Advantage plan back to Medigap in Florida?",
            a: "Yes, but outside of specific Trial Rights (such as trying Advantage for the first time for under 12 months), you will generally need to pass medical underwriting questions. As an independent broker, we review your health history to identify carriers most likely to approve your Medigap application."
        },
        {
            q: "What are Part B Excess Charges and does Plan G cover them?",
            a: "Part B excess charges occur when a doctor does not accept Medicare's baseline assignment rate and charges up to an additional 15%. Medigap Plan G covers 100% of Part B excess charges, whereas Plan N does not cover them."
        },
        {
            q: "How much does a Medigap Plan G cost in Florida for 2026?",
            a: "Average monthly premiums for a 65-year-old non-smoker in Florida range between $140 and $185 per month for Plan G, and $100 to $145 per month for Plan N. Rates depend on county zip codes, gender, tobacco status, and available household discounts."
        }
    ];

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": ["Service", "FinancialProduct"],
        "name": isEs ? "Planes y Suplementos de Medicare en Florida" : "Medicare Plans & Supplements in Florida",
        "serviceType": "Medicare Insurance Brokerage",
        "category": "HealthInsurance",
        "description": description,
        "provider": {
            "@type": ["InsuranceAgency", "Organization", "LocalBusiness"],
            "name": "AHB Insurance Solutions",
            "url": "https://www.ahbinsurancesolutions.com/",
            "telephone": "+1-352-225-8389",
            "email": "andreshbozo@ahbinsurancesolutions.com",
            "priceRange": "Free Consultation",
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
            }
        },
        "broker": {
            "@type": "Person",
            "name": "Andres H. Bozo",
            "jobTitle": "Licensed Medicare & Life Insurance Broker",
            "identifier": {
                "@type": "PropertyValue",
                "name": "NPN",
                "value": "21228432"
            }
        },
        "areaServed": {
            "@type": "State",
            "name": "Florida"
        },
        "audience": {
            "@type": "Audience",
            "audienceType": isEs ? "Adultos mayores de 65 años o beneficiarios de Medicare en Florida" : "Seniors 65+ and Medicare beneficiaries in Florida"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": isEs ? "Comparación y asesoría de Medicare sin costo para el cliente" : "Free Medicare plan comparison and unbiased broker guidance",
            "availability": "https://schema.org/InStock"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Medicare Solutions Catalog",
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
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEs ? "Inicio" : "Home",
                "item": `${baseUrl}${isEs ? '/es' : '/'}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEs ? "Medicare en Florida" : "Medicare in Florida",
                "item": canonical
            }
        ]
    };

    return (
        <div className="bg-white min-h-screen text-dark-gray font-sans">
            <SEOHead 
                title={title}
                description={description}
                canonicalUrl={canonical}
                enUrl={enUrl}
                esUrl={esUrl}
                language={language}
                schema={[serviceSchema, faqSchema, breadcrumbSchema]}
            />

            {/* Breadcrumb */}
            <div className="bg-light-gray border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Medicare en Florida' : 'Medicare in Florida'}</span>
                </div>
            </div>

            {/* Page Hero */}
            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                            {isEs ? 'Guía de Autoridad 2026 | Asesoría Licenciada en Florida' : '2026 Master Guide | Licensed Florida Broker'}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black font-heading mb-6 leading-tight">
                            {isEs 
                                ? 'Planes de Medicare y Suplementos (Medigap) en Florida' 
                                : 'Florida Medicare & Supplement Insurance Plans'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Proteja su jubilación contra facturas médicas ilimitadas del 20%. Comparamos objetivamente más de 80 aseguradoras en Florida para asegurar la máxima libertad médica al mejor costo.'
                                : 'Shield your retirement from uncapped 20% medical co-pays. We objectively analyze 80+ top carriers to secure complete doctor freedom at the lowest rate in Florida.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onOpenQuote}
                                className="bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                            >
                                {isEs ? 'Cotizar Medigap Gratis ➔' : 'Get Free Medigap Quote ➔'}
                            </button>
                            <a
                                href="tel:+13522258389"
                                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl border border-white/20 transition-all text-center flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                                {isEs ? 'Hablar con Andrés Bozo (+1 352-225-8389)' : 'Speak with Broker (+1 352-225-8389)'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* In-Depth Educational Section */}
            <section className="py-12 md:py-16 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    
                    {/* Introduction & The Core Medicare Problem */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-4">
                            {isEs ? 'La Realidad de Medicare Original (Partes A y B) en Florida' : 'The Reality of Original Medicare (Parts A & B) in Florida'}
                        </h2>
                        <p className="text-gray-700 text-base leading-relaxed mb-4">
                            {isEs 
                                ? 'Muchos residentes de Florida asumen que inscribirse en Medicare Original al cumplir 65 años cubrirá la totalidad de sus gastos médicos. Sin embargo, Medicare Original deja vacíos financieros significativos que pueden poner en riesgo los ahorros acumulados durante toda una vida de trabajo:'
                                : 'Many Florida seniors assume enrolling in Original Medicare at age 65 provides 100% medical coverage. However, Original Medicare leaves major financial gaps that can expose your retirement savings to unexpected medical liabilities:'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl">
                                <h3 className="font-bold text-amber-900 mb-1 text-sm">{isEs ? 'Sin Límite Anual de Gastos (No MOOP)' : 'No Annual Maximum Out-of-Pocket'}</h3>
                                <p className="text-xs text-amber-800 leading-relaxed">
                                    {isEs 
                                        ? 'No existe un límite máximo de desembolso de bolsillo. Usted es responsable del 20% de todos los servicios ambulatorios, cirugías, tratamientos de cáncer y diálisis, sin tope alguno en dólares.' 
                                        : 'Original Medicare has no cap on your 20% coinsurance liability for outpatient care, surgeries, chemotherapy, specialty treatments, and imaging.'}
                                </p>
                            </div>
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl">
                                <h3 className="font-bold text-amber-900 mb-1 text-sm">{isEs ? 'Deducibles de Hospital Elevados' : 'High Hospital Deductibles'}</h3>
                                <p className="text-xs text-amber-800 leading-relaxed">
                                    {isEs 
                                        ? 'En 2026, el deducible de hospitalización de la Parte A supera los $1,600 por cada período de beneficio de 60 días, no por año lectivo.' 
                                        : 'The Part A inpatient hospital deductible exceeds $1,600 per benefit period, which can occur multiple times in a single calendar year.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step by Step Enrollment Roadmap */}
                    <div className="bg-blue-50/70 p-6 md:p-8 rounded-2xl border border-blue-100 shadow-sm">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-4">
                            {isEs ? 'Paso a Paso para Inscribirse en Medicare en Florida al Cumplir 65 Años' : 'Step-by-Step Medicare Enrollment Roadmap in Florida'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                            {isEs 
                                ? 'Navegar la transición hacia Medicare requiere sincronización precisa. Un descuido en los plazos legales de la Administración del Seguro Social (SSA) puede generar penalidades de por vida o la pérdida de sus derechos de emisión garantizada en seguros suplementarios.'
                                : 'Navigating Medicare requires precise timing. Missing federal Social Security Administration (SSA) deadlines can result in lifelong premium penalties or the loss of guaranteed-issue rights for Medigap supplements.'}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-blue-200">
                                <span className="bg-primary text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                                <div>
                                    <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Paso 1: Identificar su Período Inicial de Inscripción (IEP)' : 'Step 1: Identify Your Initial Enrollment Period (IEP)'}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {isEs 
                                            ? 'Su IEP dura 7 meses: inicia 3 meses antes de cumplir 65 años, incluye el mes de su cumpleaños y finaliza 3 meses después. Es la ventana para solicitar las Partes A y B en SSA.gov.'
                                            : 'Your IEP spans 7 months: starts 3 months before your 65th birthday month, includes your birthday month, and ends 3 months after. Use SSA.gov to apply.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-blue-200">
                                <span className="bg-primary text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                                <div>
                                    <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Paso 2: Activar la Ventana Protegida de Medigap (MOEP)' : 'Step 2: Activate Your Medigap Open Enrollment Window (MOEP)'}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {isEs 
                                            ? 'Al activar la Parte B, arranca su ventana de 6 meses de Medigap. Las aseguradoras no pueden evaluar sus historial médico ni negar cobertura por condiciones preexistentes.'
                                            : 'Activating Part B triggers your 6-month Medigap window. Insurance carriers cannot review medical history or deny coverage for pre-existing conditions.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-blue-200">
                                <span className="bg-primary text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                                <div>
                                    <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Paso 3: Seleccionar un Plan de Medicamentos Recetados (Parte D)' : 'Step 3: Select a Part D Prescription Drug Plan'}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {isEs 
                                            ? 'Aun si no consume medicamentos hoy, debe contratar un plan Parte D básico. De lo contrario, se acumulará una penalidad permanente del 1% mensual por cada mes sin cobertura acreditable.'
                                            : 'Even if you take zero prescriptions today, enrolling in a standalone Part D plan prevents a permanent 1% per month Part D late enrollment penalty (LEP).'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown of Medicare Parts */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? 'Estructura Detallada de las 4 Partes de Medicare' : 'Detailed Breakdown of the 4 Parts of Medicare'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <span className="bg-primary text-white text-xs font-black px-3 py-1 rounded-full mb-3 inline-block">Parte A</span>
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {isEs ? 'Seguro Hospitalario' : 'Hospital Insurance'}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                                    {isEs 
                                        ? 'Cubre hospitalizaciones, centros de enfermería especializada, cuidados paliativos y atención domiciliaria. Por lo general no requiere prima mensual si trabajó 10 años (40 créditos) en EE.UU.' 
                                        : 'Covers inpatient hospital care, skilled nursing facilities, hospice, and home health. Premium-free if you worked 10+ years (40 credits) in the U.S.'}
                                </p>
                                <span className="text-[11px] font-bold text-gray-500 block">{isEs ? 'Deducible 2026: ~$1,632 por período de beneficio' : '2026 Deductible: ~$1,632 per benefit period'}</span>
                            </div>

                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <span className="bg-primary text-white text-xs font-black px-3 py-1 rounded-full mb-3 inline-block">Parte B</span>
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {isEs ? 'Seguro Médico Ambulatorio' : 'Medical Insurance'}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                                    {isEs 
                                        ? 'Cubre consultas médicas, exámenes de laboratorio, estudios de imagen, cirugías ambulatorias y equipo médico duradero. Medicare paga el 80% y usted el 20% restante.' 
                                        : 'Covers physician visits, lab tests, imaging, outpatient surgeries, and durable medical equipment. Medicare pays 80%; you pay 20%.'}
                                </p>
                                <span className="text-[11px] font-bold text-gray-500 block">{isEs ? 'Prima Estándar 2026: ~$185/mes | Deducible: ~$257/año' : '2026 Standard Premium: ~$185/mo | Deductible: ~$257/yr'}</span>
                            </div>

                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <span className="bg-primary text-white text-xs font-black px-3 py-1 rounded-full mb-3 inline-block">Parte C</span>
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {isEs ? 'Medicare Advantage (HMO / PPO)' : 'Medicare Advantage (HMO / PPO)'}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                                    {isEs 
                                        ? 'Planes administrados por aseguradoras privadas que reemplazan al Medicare Original. Ofrecen primas bajas pero restringen los médicos a redes de condados locales en Florida.' 
                                        : 'Private managed-care plans replacing Original Medicare. Often feature low monthly premiums but restrict care to local Florida county networks with prior authorizations.'}
                                </p>
                                <span className="text-[11px] font-bold text-gray-500 block">{isEs ? 'Requiere mantener activa la Parte B' : 'Requires active Part B enrollment'}</span>
                            </div>

                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <span className="bg-primary text-white text-xs font-black px-3 py-1 rounded-full mb-3 inline-block">Parte D</span>
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {isEs ? 'Medicamentos Recetados (IRA 2026)' : 'Prescription Drugs (2026 IRA Cap)'}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                                    {isEs 
                                        ? 'Planes independientes para farmacia. Bajo la Ley de Reducción de la Inflación, en 2026 sus desembolsos anuales de bolsillo en medicinas están topados a un máximo legal de $2,000.' 
                                        : 'Standalone pharmacy coverage. Under the Inflation Reduction Act, total annual out-of-pocket prescription costs are capped at $2,000 in 2026.'}
                                </p>
                                <span className="text-[11px] font-bold text-gray-500 block">{isEs ? 'Tope Anual de Farmacia: $2,000 máximo' : 'Annual Rx OOP Cap: $2,000 maximum'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Medigap Plan G vs Plan N Deep Dive */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-4">
                            {isEs ? 'Análisis Profundo: Medigap Plan G vs. Plan N en Florida' : 'Deep Dive: Medigap Plan G vs. Plan N in Florida'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                            {isEs 
                                ? 'En Florida, más del 90% de los beneficiarios que eligen un Seguro Suplementario de Medicare seleccionan el Plan G o el Plan N. Ambos ofrecen cobertura nacional sin red de médicos, pero difieren en estructura de costos:'
                                : 'In Florida, over 90% of seniors choosing a Medicare Supplement select either Plan G or Plan N. Both grant complete national doctor freedom without network hurdles, but feature distinct cost structures:'}
                        </p>

                        <div className="overflow-x-auto my-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                            <table className="w-full text-left border-collapse text-xs md:text-sm">
                                <thead>
                                    <tr className="bg-primary text-white font-bold">
                                        <th className="p-4">{isEs ? 'Beneficio / Cobertura' : 'Benefit / Feature'}</th>
                                        <th className="p-4">{isEs ? 'Medigap Plan G' : 'Medigap Plan G'}</th>
                                        <th className="p-4">{isEs ? 'Medigap Plan N' : 'Medigap Plan N'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-4 font-bold text-primary">{isEs ? 'Deducible de Hospital Parte A' : 'Part A Hospital Deductible'}</td>
                                        <td className="p-4 text-emerald-700 font-bold">{isEs ? 'Cubierto 100%' : '100% Covered'}</td>
                                        <td className="p-4 text-emerald-700 font-bold">{isEs ? 'Cubierto 100%' : '100% Covered'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-4 font-bold text-primary">{isEs ? 'Coseguro del 20% Parte B' : 'Part B 20% Coinsurance'}</td>
                                        <td className="p-4 text-emerald-700 font-bold">{isEs ? 'Cubierto 100%' : '100% Covered'}</td>
                                        <td className="p-4 text-amber-700 font-medium">{isEs ? 'Copago hasta $20 por consulta / $50 en ER' : 'Up to $20 copay / $50 ER copay'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-4 font-bold text-primary">{isEs ? 'Deducible Anual Parte B (~$257)' : 'Part B Annual Deductible (~$257)'}</td>
                                        <td className="p-4 text-rose-700 font-medium">{isEs ? 'No cubierto (Por Ley)' : 'Not Covered (By Law)'}</td>
                                        <td className="p-4 text-rose-700 font-medium">{isEs ? 'No cubierto (Por Ley)' : 'Not Covered (By Law)'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-4 font-bold text-primary">{isEs ? 'Cargos en Exceso de la Parte B' : 'Part B Excess Charges'}</td>
                                        <td className="p-4 text-emerald-700 font-bold">{isEs ? 'Cubierto 100%' : '100% Covered'}</td>
                                        <td className="p-4 text-rose-700 font-medium">{isEs ? 'No cubierto (Hasta 15% extra)' : 'Not Covered (Up to 15% extra)'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-4 font-bold text-primary">{isEs ? 'Prima Mensual Promedio en Florida' : 'Avg. Monthly Premium in FL'}</td>
                                        <td className="p-4 text-gray-700 font-medium">$140 – $185 / mes</td>
                                        <td className="p-4 text-emerald-800 font-bold">$100 – $145 / mes ({isEs ? 'Ahorro ~$30-50/mes' : 'Saves ~$30-50/mo'})</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Special Protections & Trial Rights */}
                    <div className="bg-emerald-50/80 p-6 md:p-8 rounded-2xl border border-emerald-200">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-emerald-950 mb-3">
                            {isEs ? 'Derechos de Prueba (Trial Rights) y Cambio de Plan en Florida' : 'Medicare Advantage Trial Rights & Medigap Switch Protections'}
                        </h2>
                        <p className="text-emerald-900 text-xs md:text-sm leading-relaxed mb-4">
                            {isEs 
                                ? 'Muchos residentes de Florida prueban un plan Medicare Advantage y luego descubren retrasos en autorizaciones previas o denegaciones de especialistas. La ley federal otorga "Derechos de Prueba" especiales:'
                                : 'Many Florida seniors try Medicare Advantage only to experience prior authorization delays or network exclusions. Federal law provides specific "Trial Rights" to protect you:'}
                        </p>
                        <ul className="space-y-2 text-xs md:text-sm text-emerald-900 list-disc pl-5">
                            <li>
                                <strong>{isEs ? 'Prueba por primera vez (Primeros 12 meses):' : 'First-time Trial Right (First 12 months):'}</strong> {isEs ? 'Si se inscribe en Medicare Advantage al cumplir 65 años y decide cambiarse dentro de los primeros 12 meses, tiene derecho garantizado de volver a Medigap sin preguntas médicas.' : 'If you join Medicare Advantage when first eligible at 65, you can drop it within 12 months and switch to Medigap with guaranteed issue.'}
                            </li>
                            <li>
                                <strong>{isEs ? 'Pérdida de cobertura de red o mudanza:' : 'Network Changes or Relocation:'}</strong> {isEs ? 'Si su plan Advantage abandona su condado en Florida o usted se muda fuera del área de servicio, califica para un Período Especial para comprar Medigap.' : 'If your Advantage plan leaves your Florida county or you relocate out of state, you trigger a Special Enrollment Period for Medigap.'}
                            </li>
                        </ul>
                    </div>

                    {/* Side-by-Side Comparison: Medigap Plan G vs Plan N vs Medicare Advantage */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-2xl font-black font-heading text-primary mb-2">
                            {isEs ? 'Comparación Exhaustiva: Medigap Plan G vs Plan N vs Advantage' : 'Detailed Comparison: Medigap Plan G vs Plan N vs Medicare Advantage'}
                        </h2>
                        <p className="text-xs text-gray-600 mb-6">
                            {isEs ? 'Analice las diferencias operativas y financieras antes de tomar su decisión de inscripción en Florida.' : 'Examine the key coverage and cost differences before finalizing your Florida Medicare choice.'}
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs md:text-sm text-gray-700">
                                <thead className="bg-primary text-white text-xs uppercase font-bold">
                                    <tr>
                                        <th className="p-3.5 rounded-tl-xl">{isEs ? 'Característica' : 'Feature'}</th>
                                        <th className="p-3.5 bg-primary text-accent font-black">Medigap Plan G</th>
                                        <th className="p-3.5">Medigap Plan N</th>
                                        <th className="p-3.5 rounded-tr-xl bg-gray-800">Advantage (Parte C)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 font-medium">
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Red de Médicos' : 'Doctor Network'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">100% EE.UU. Sin Red</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">100% EE.UU. Sin Red</td>
                                        <td className="p-3.5 text-amber-700 font-bold">Red Local (HMO/PPO)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Referidos para Especialistas' : 'Specialist Referrals'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Nunca requeridos</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Nunca requeridos</td>
                                        <td className="p-3.5 text-gray-600">Frecuente en HMOs</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Deducible de Hospital Parte A' : 'Part A Hospital Deductible'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">$0 (100% Cubierto)</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">$0 (100% Cubierto)</td>
                                        <td className="p-3.5 text-gray-600">Copagos por día</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Copago por Visita Médica' : 'Doctor Office Copays'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">$0 (Tras deducible B)</td>
                                        <td className="p-3.5 text-amber-700 font-bold">Hasta $20 por consulta</td>
                                        <td className="p-3.5 text-gray-600">$0 a $45+ por visita</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Cargos en Exceso Parte B' : 'Part B Excess Charges'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">100% Cubierto</td>
                                        <td className="p-3.5 text-gray-400">No Cubierto</td>
                                        <td className="p-3.5 text-gray-400">N/A (Sujeto a red)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Predecibilidad Financiera' : 'Financial Predictability'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Máxima (Sin sorpresas)</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Muy Alta</td>
                                        <td className="p-3.5 text-amber-700 font-bold">Variable según uso</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Timeline & Important Enrollment Dates in Florida */}
                    <div className="bg-light-gray p-6 md:p-8 rounded-2xl border border-gray-200 space-y-6">
                        <h2 className="text-2xl font-black font-heading text-primary">
                            {isEs ? 'Fechas Clave de Inscripción de Medicare en Florida' : 'Key Florida Medicare Enrollment Windows'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-5 rounded-xl border border-gray-200">
                                <span className="text-accent font-black text-xs uppercase tracking-wider block mb-1">IEP</span>
                                <h3 className="font-bold text-primary mb-2 text-sm">{isEs ? 'Período Inicial (7 Meses)' : 'Initial Enrollment (7 Months)'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Comienza 3 meses antes de cumplir 65 años, incluye el mes de su cumpleaños y termina 3 meses después. Es el momento perfecto para solicitar Partes A y B.' 
                                        : 'Begins 3 months before your 65th birthday month, includes your birthday month, and extends 3 months after.'}
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-gray-200">
                                <span className="text-secondary font-black text-xs uppercase tracking-wider block mb-1">MOEP</span>
                                <h3 className="font-bold text-primary mb-2 text-sm">{isEs ? 'Ventana Abierta de Medigap' : 'Medigap Open Enrollment'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? '6 meses dorados desde la fecha de inicio de su Parte B. Inmunidad total contra cuestionarios médicos de salud. Emisión 100% garantizada.' 
                                        : '6-month golden window starting on your Part B effective date. Guaranteed acceptance with zero medical underwriting.'}
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-gray-200">
                                <span className="text-primary font-black text-xs uppercase tracking-wider block mb-1">AEP</span>
                                <h3 className="font-bold text-primary mb-2 text-sm">{isEs ? 'Inscripción Anual (Oct 15 - Dic 7)' : 'Annual Enrollment (Oct 15 - Dec 7)'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Período anual para modificar planes de medicamentos Parte D o evaluar opciones de Medicare Advantage para el año siguiente.' 
                                        : 'Annual period to join, drop, or switch Medicare Advantage and Part D drug plans for the upcoming coverage year.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive FAQ Section with Schema */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? 'Preguntas Frecuentes sobre Medicare en Florida' : 'Frequently Asked Questions About Florida Medicare'}
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div 
                                        key={index} 
                                        className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-white shadow-sm"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : index)}
                                            className="w-full text-left p-5 md:p-6 font-bold text-primary hover:text-secondary flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                                        >
                                            <span className="text-base md:text-lg">{faq.q}</span>
                                            <span className="text-2xl font-black text-accent shrink-0">
                                                {isOpen ? '−' : '+'}
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="p-5 md:p-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-light-gray/50">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Broker Callout */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="text-xl font-black font-heading text-primary">
                                {isEs ? '¿Necesita ayuda para analizar sus medicamentos y médicos en Florida?' : 'Need personalized carrier comparison for your Florida zipcode?'}
                            </h3>
                            <p className="text-sm text-gray-700">
                                {isEs 
                                    ? 'Como corredor independiente licenciado en Florida (NPN 21228432), le guío de forma gratuita y sin presiones comerciales.' 
                                    : 'As a licensed independent broker in Florida (NPN 21228432), I provide unbiased carrier analysis at zero cost to you.'}
                            </p>
                        </div>
                        <button
                            onClick={onOpenQuote}
                            className="bg-primary text-white hover:bg-secondary text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all whitespace-nowrap shadow cursor-pointer"
                        >
                            {isEs ? 'Consultar con Andrés Bozo' : 'Consult with Andres Bozo'}
                        </button>
                    </div>

                </div>
            </section>

            {/* Internal Cross-Linking to Other Services */}
            <RelatedServices currentService="medicare" language={language} />
        </div>
    );
};

