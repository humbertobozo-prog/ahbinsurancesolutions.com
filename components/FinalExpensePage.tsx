import React, { useState } from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { RelatedServices } from './RelatedServices';

interface FinalExpensePageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const FinalExpensePage: React.FC<FinalExpensePageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/gastos-finales' : '/final-expense'}`;
    const enUrl = `${baseUrl}/final-expense`;
    const esUrl = `${baseUrl}/es/gastos-finales`;

    const title = isEs 
        ? 'Seguro de Gastos Finales y Funeral en Florida 2026 | AHB Insurance' 
        : 'Final Expense & Burial Insurance in Florida 2026 | AHB Insurance';

    const description = isEs 
        ? 'Guía completa de seguro de gastos finales en Florida. Coberturas de $5,000 a $35,000, tarifas fijas de por vida y opciones de emisión simplificada. Asesoría con Andrés Bozo (NPN 21228432).' 
        : 'Complete Florida guide to Final Expense & Burial Insurance. $5,000 to $35,000 permanent coverage, locked rates, and simplified issue options with broker Andres Bozo (NPN 21228432).';

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = isEs ? [
        {
            q: "¿El Seguro Social paga los gastos de funeral en Florida?",
            a: "El Seguro Social federal solo otorga un pago único por fallecimiento de $255 a cónyuges sobrevivientes o hijos dependientes elegibles. Dado que los funerales tradicionales promedio en Florida superan los $9,500 y las cremaciones con servicios conmemorativos oscilan entre $4,000 y $7,500, un seguro de gastos finales es indispensable para evitar que su familia enfrente deudas repentinas."
        },
        {
            q: "¿Aumentarán mis primas mensuales a medida que cumpla más años?",
            a: "Muchas pólizas de vida entera participantes ofrecen primas niveladas y cobertura permanente, sujetas a los términos, condiciones y al pago continuo de las primas requeridas."
        },
        {
            q: "¿Qué significa que la póliza sea sin examen médico tradicional?",
            a: "Muchas pólizas de emisión simplificada no requieren un examen médico tradicional (como pruebas de sangre, orina o visitas de enfermeros), aunque los requisitos de suscripción varían según la aseguradora y el solicitante. En lugar de exámenes físicos invasivos, la aseguradora evalúa la solicitud mediante preguntas de salud, revisión electrónica del historial de recetas médicas (Rx check) y bases de datos del MIB. Esto permite emitir la póliza en cuestión de días u horas."
        },
        {
            q: "¿Cuál es la diferencia entre Emisión Simplificada y Emisión Garantizada?",
            a: "La Emisión Simplificada incluye preguntas de salud y verificación de recetas; si califica, otorga cobertura completa inmediata desde el Día 1 (Level Benefit) con las primas más competitivas. Las pólizas de emisión garantizada generalmente no requieren suscripción médica tradicional ni preguntas de salud, pero la elegibilidad, las limitaciones de beneficios y los períodos de espera varían según el asegurador y el producto."
        },
        {
            q: "¿Cuál es la diferencia entre un Seguro de Gastos Finales y un Contrato Funerario Prepagado (Pre-Need)?",
            a: "Un contrato prepagado lo ata exclusivamente a una funeraria específica. Si esa empresa quiebra, cambia de administración o usted se muda de ciudad o estado, transferir o recuperar los fondos puede ser muy complejo o penalizado. Los beneficios por fallecimiento de un seguro de gastos finales se pagan generalmente a los beneficiarios según los términos de la póliza y pueden recibir un tratamiento fiscal federal favorable; las disposiciones de la póliza y las circunstancias de los beneficiarios pueden incidir en el resultado, dándoles libertad para contratar cualquier funeraria o servicio en Florida o en todo el país."
        },
        {
            q: "¿Puedo calificar si tengo condiciones preexistentes como Diabetes o Hipertensión?",
            a: "Sí. Más del 90% de nuestros clientes adultos mayores en Florida tienen condiciones preexistentes diagnosticadas. Como corredores independientes, revisamos qué medicamentos toma para ubicarlo en la aseguradora que apruebe su condición específica con cobertura inmediata desde el primer día."
        }
    ] : [
        {
            q: "Does Social Security cover funeral costs in Florida?",
            a: "The federal Social Security Administration pays only a single, one-time lump-sum death benefit of $255 to eligible surviving spouses or dependent children. Given that traditional Florida funerals average over $9,500 and memorial cremations range from $4,000 to $7,500, final expense insurance is essential to protect loved ones from unexpected debt."
        },
        {
            q: "Will my monthly premiums increase as I grow older?",
            a: "Many participating whole life policies offer level premiums and permanent coverage, subject to the policy’s terms, conditions and continued payment of required premiums."
        },
        {
            q: "What does 'no traditional medical exam' mean?",
            a: "Many simplified-issue policies do not require a traditional medical exam (such as blood draws, urine tests, or nurse physicals), although underwriting requirements vary by carrier and applicant. Instead of invasive physical exams, insurers review health application questions, electronic prescription drug histories (Rx checks), and MIB databases, allowing policies to be approved in days or hours."
        },
        {
            q: "What is the difference between Simplified Issue and Guaranteed Issue?",
            a: "Simplified Issue policies require answering health questions and an Rx database check; qualifying applicants receive immediate Day-One Level Benefit protection with more competitive rates than guaranteed issue options. Guaranteed-issue policies generally do not require traditional medical underwriting or health questions, but eligibility, benefit limitations and waiting periods vary by carrier and product."
        },
        {
            q: "What is the difference between Final Expense Insurance and a Pre-Need Funeral Plan?",
            a: "Pre-need plans lock your funds with one specific local funeral home. If that funeral home changes ownership, closes, or if you relocate out of state, transferring funds can be difficult or costly. Death benefits from a final expense policy are generally paid to beneficiaries according to the policy terms and may receive favorable federal tax treatment; policy provisions and the beneficiary's circumstances can affect the outcome, giving them total freedom to choose any provider nationwide."
        },
        {
            q: "Can I qualify with pre-existing conditions like diabetes or high blood pressure?",
            a: "Yes. The vast majority of our Florida clients manage chronic health conditions. As independent brokers representing over 15 specialized burial insurers, we match your exact prescription history with the carrier most favorable to your profile to secure immediate Day-One coverage."
        }
    ];

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": ["Service", "FinancialProduct"],
        "name": isEs ? "Seguro de Gastos Finales y Funeral en Florida" : "Final Expense & Burial Life Insurance in Florida",
        "serviceType": "Final Expense Whole Life Insurance",
        "category": "LifeInsurance",
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
            "jobTitle": "Licensed Life & Medicare Insurance Broker",
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
            "audienceType": isEs ? "Adultos y adultos mayores de 50 a 85 años en Florida" : "Seniors and adults aged 50-85 in Florida"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": isEs ? "Cotización personalizada y comparación de tarifas en Florida" : "Free customized quote and multi-carrier rate comparison in Florida",
            "availability": "https://schema.org/InStock"
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
                "name": isEs ? "Seguro de Gastos Finales en Florida" : "Final Expense & Burial Insurance",
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

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="bg-light-gray border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">
                        {isEs ? 'Seguro de Gastos Finales en Florida' : 'Final Expense & Burial Insurance'}
                    </span>
                </div>
            </nav>

            {/* 1. HERO SECTION */}
            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
                            {isEs ? 'Protección Familiar Permanente | Vida Entera en Florida' : 'Permanent Family Protection | Whole Life Insurance in Florida'}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black font-heading mb-5 leading-tight">
                            {isEs 
                                ? 'Seguro de Gastos Finales y Funeral en Florida' 
                                : 'Final Expense & Burial Insurance in Florida'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Evite que sus hijos o cónyuge enfrenten deudas repentinas de $10,000+ por costos funerarios. Pólizas de vida entera permanentes con primas fijas garantizadas. Muchas pólizas de emisión simplificada no requieren un examen médico tradicional, aunque los requisitos de suscripción varían según la compañía aseguradora y el solicitante.'
                                : 'Protect your children and spouse from taking on $10,000+ in sudden funeral debt. Permanent whole life coverage with contractually locked rates. Many simplified-issue policies do not require a traditional medical exam, although underwriting requirements vary by carrier and applicant.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onOpenQuote}
                                className="bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                            >
                                {isEs ? 'Obtener cotización ➔' : 'Get Final Expense Quote ➔'}
                            </button>
                            <a
                                href="tel:+13522258389"
                                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl border border-white/20 transition-all text-center flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                                {isEs ? 'Hablar con Andrés (+1 352-225-8389)' : 'Talk With Andres (+1 352-225-8389)'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT CONTAINER */}
            <div className="py-12 md:py-16 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* 2. WHAT IS FINAL EXPENSE? */}
                    <section id="what-is-final-expense">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-4">
                            {isEs ? '¿Qué es el Seguro de Gastos Finales?' : 'What is Final Expense Insurance?'}
                        </h2>
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                            {isEs 
                                ? 'El Seguro de Gastos Finales (comúnmente denominado seguro de entierro o seguro funerario) es una póliza de seguro de Vida Entera (Whole Life) permanente. Está específicamente estructurada para cubrir costos de entierro o cremación, servicios funerarios, ataúd, parcela de cementerio, facturas médicas pendientes del hospital y deudas no saldadas tras el fallecimiento.'
                                : 'Final Expense Insurance (often called burial or funeral insurance) is a permanent Whole Life insurance policy. It is specifically structured to cover burial or cremation expenses, funeral home services, caskets, cemetery plots, outstanding hospital bills, and unpaid debts upon your passing.'}
                        </p>
                        <p className="text-gray-700 text-base leading-relaxed">
                            {isEs
                                ? 'A diferencia de los seguros a término que expiran cuando usted cumple 70 u 80 años, el seguro de gastos finales permanece activo durante toda su vida siempre que mantenga sus pagos. Acumula valor en efectivo garantizado y garantiza que su familia disponga de liquidez inmediata en sus momentos más vulnerables.'
                                : 'Unlike term life insurance policies that expire when you reach age 70 or 80, final expense coverage stays active for your entire life as long as premiums are paid. It builds guaranteed cash value and delivers immediate liquidity to your loved ones when they need it most.'}
                        </p>
                    </section>

                    {/* 3. WHO NEEDS IT? */}
                    <section id="who-needs-it" className="bg-light-gray p-6 md:p-8 rounded-2xl border border-gray-200">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-4">
                            {isEs ? '¿Quién Necesita Cobertura de Gastos Finales?' : 'Who Needs Final Expense Coverage?'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                            {isEs 
                                ? 'Esta protección está pensada para adultos y personas mayores en Florida que desean dejar un legado de tranquilidad y evitar que sus familiares tengan que organizar colectas o endeudarse:'
                                : 'This coverage is designed for Florida adults and seniors who want to leave a legacy of peace of mind rather than an emergency financial burden:'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                                <h3 className="font-bold text-primary text-base mb-2">
                                    {isEs ? 'Adultos Mayores de 50 a 85 años' : 'Seniors Aged 50 to 85'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Personas que no desean traspasar una factura funeraria de $10,000+ a sus hijos o cónyuge en momentos de duelo.' 
                                        : 'Individuals who want to ensure their children and spouse are not left with a sudden $10,000+ funeral bill.'}
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                                <h3 className="font-bold text-primary text-base mb-2">
                                    {isEs ? 'Personas que Han Superado Pólizas a Término' : 'Outlived Term Life Insurance'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Retirados cuyas pólizas de término expiraron o cuyas cuotas de renovación se volvieron inasequibles al envejecer.' 
                                        : 'Retirees whose 20 or 30-year term policies expired or whose term renewal rates became unaffordable.'}
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                                <h3 className="font-bold text-primary text-base mb-2">
                                    {isEs ? 'Personas con Historial Médico Moderado' : 'Applicants with Health Conditions'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Quienes manejan hipertensión, diabetes, sobrepeso o afecciones crónicas y buscan cobertura accesible sin exámenes exhaustivos.' 
                                        : 'Those managing hypertension, diabetes, or other chronic conditions who need accessible whole life coverage.'}
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                                <h3 className="font-bold text-primary text-base mb-2">
                                    {isEs ? 'Familias que Buscan Dinero en Efectivo Directo' : 'Families Wanting Direct Cash'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Familias que prefieren efectivo líquido para sus beneficiarios en lugar de contratos prepagados atados a una sola funeraria.' 
                                        : 'Families who prefer unrestricted cash for their beneficiaries instead of restrictive funeral home pre-need packages.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 4. COVERAGE AMOUNTS & FLORIDA FUNERAL COSTS */}
                    <section id="coverage-amounts" className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-6">
                        <div>
                            <span className="text-accent font-bold text-xs uppercase tracking-wider">
                                {isEs ? 'Montos de Cobertura Disponibles' : 'Available Coverage Amounts'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black font-heading text-white mt-1 mb-2">
                                {isEs ? 'Opciones de $5,000 a $35,000 y Costos Funerarios Reales en Florida' : 'Options from $5,000 to $35,000 & Real Florida Funeral Costs'}
                            </h2>
                            <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                                {isEs 
                                    ? 'Usted elige la cantidad exacta de beneficio según sus deseos (cremación o sepelio tradicional) y su presupuesto mensual:' 
                                    : 'Choose the exact face amount based on your preferred arrangement and monthly budget:'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2">
                                <h3 className="text-accent font-bold text-sm uppercase tracking-wide">
                                    {isEs ? 'Funeral Tradicional con Sepelio' : 'Traditional Funeral & Burial'}
                                </h3>
                                <p className="text-3xl font-black text-white">$9,500 – $14,000</p>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    {isEs 
                                        ? 'Recomendamos una cobertura de $15,000 a $25,000 para cubrir ataúd, bóveda, honorarios funerarios, parcela de cementerio, lástima y gastos médicos.' 
                                        : 'We recommend $15,000 to $25,000 to comfortably cover professional director fees, casket, vault, cemetery plot, viewing, and medical debts.'}
                                </p>
                            </div>
                            <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2">
                                <h3 className="text-accent font-bold text-sm uppercase tracking-wide">
                                    {isEs ? 'Cremación con Ceremonia Memorial' : 'Cremation & Memorial Service'}
                                </h3>
                                <p className="text-3xl font-black text-white">$4,000 – $7,500</p>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    {isEs 
                                        ? 'Recomendamos una póliza de $5,000 a $10,000 para cubrir la cremación, urna, permisos del condado, misa o reunión familiar y pequeñas deudas.' 
                                        : 'We recommend a $5,000 to $10,000 policy to cover cremation fees, urn, county permits, memorial chapel ceremony, and personal expenses.'}
                                </p>
                            </div>
                        </div>

                        {/* Social Security 255 callout */}
                        <div className="bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-gray-200">
                            <p className="font-bold text-accent mb-1">
                                {isEs ? '⚠️ La Limitación del Pago Único del Seguro Social ($255):' : '⚠️ The Social Security $255 Death Benefit Limitation:'}
                            </p>
                            <p className="leading-relaxed">
                                {isEs 
                                    ? 'La Administración del Seguro Social de EE.UU. otorga únicamente un pago único de $255 por fallecimiento a cónyuges sobrevivientes que califiquen. Esta cifra federal no ha cambiado en décadas y no cubre ni una fracción de los costos funerarios en Florida.' 
                                    : 'The federal Social Security Administration provides only a one-time lump-sum death payment of $255 to eligible surviving spouses. This amount has remained unchanged for decades and covers only a tiny fraction of real Florida burial costs.'}
                            </p>
                        </div>
                    </section>

                    {/* 5. ELIGIBILITY & UNDERWRITING CONTEXT (ITEM 8 FIX) */}
                    <section id="eligibility-underwriting" className="border-2 border-primary/20 bg-amber-50/40 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Precisión Técnica y Regulatoria' : 'Underwriting Clarity & Compliance'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-3">
                            {isEs 
                                ? 'Elegibilidad y Suscripción Médica: Qué Esperar' 
                                : 'Eligibility & Underwriting Context: What to Expect'}
                        </h2>
                        <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-4 mb-5 text-xs md:text-sm text-amber-950 font-semibold">
                            {isEs ? (
                                <p>
                                    “Muchas pólizas de emisión simplificada no requieren un examen médico tradicional, aunque los requisitos de suscripción varían según la compañía aseguradora y el solicitante.”
                                </p>
                            ) : (
                                <p>
                                    “Many simplified-issue policies do not require a traditional medical exam, although underwriting requirements vary by carrier and applicant.”
                                </p>
                            )}
                        </div>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                            {isEs 
                                ? 'Es fundamental comprender que la ausencia de un examen físico tradicional (como extracciones de sangre, análisis de orina o visitas de enfermeros a domicilio) no significa que no exista una evaluación de suscripción. Las aseguradoras utilizan herramientas modernas y bases de datos electrónicas para evaluar el riesgo de manera rápida y sin molestias:' 
                                : 'It is vital to understand that the absence of a traditional physical exam (such as needle blood draws, urine samples, or home nurse visits) does not mean there is zero underwriting. Insurers utilize modern electronic databases and structured health questions to evaluate risk efficiently without invasive tests:'}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-gray-700 pt-2">
                            <div className="p-3.5 bg-white rounded-lg border border-gray-200">
                                <span className="font-bold text-primary block mb-1">1. {isEs ? 'Cuestionario de Solicitud' : 'Application Questions'}</span>
                                {isEs ? 'Preguntas claras sobre hospitalizaciones, tratamientos activos y condiciones graves diagnosticadas.' : 'Straightforward questions about hospitalizations, treatments, and diagnosed conditions.'}
                            </div>
                            <div className="p-3.5 bg-white rounded-lg border border-gray-200">
                                <span className="font-bold text-primary block mb-1">2. {isEs ? 'Historial de Medicamentos (Rx Check)' : 'Prescription History (Rx Check)'}</span>
                                {isEs ? 'Verificación electrónica de medicamentos prescritos para confirmar la estabilidad de sus condiciones de salud.' : 'Electronic verification of filled medications to verify the stability of ongoing health conditions.'}
                            </div>
                            <div className="p-3.5 bg-white rounded-lg border border-gray-200">
                                <span className="font-bold text-primary block mb-1">3. {isEs ? 'Base de Datos MIB' : 'MIB Records'}</span>
                                {isEs ? 'Comprobación confidencial en la base de datos de información médica de aseguradoras (Medical Information Bureau).' : 'Confidential verification with the Medical Information Bureau for prior underwriting consistency.'}
                            </div>
                            <div className="p-3.5 bg-white rounded-lg border border-gray-200">
                                <span className="font-bold text-primary block mb-1">4. {isEs ? 'Entrevista Telefónica / APS' : 'Telephone Interview / APS'}</span>
                                {isEs ? 'En determinados casos, una breve llamada telefónica de verificación o un reporte médico del médico tratante (APS).' : 'In certain profiles, a brief verification phone call or an attending physician statement (APS).'}
                            </div>
                        </div>
                    </section>

                    {/* 6. SIMPLIFIED ISSUE VS GUARANTEED ISSUE */}
                    <section id="simplified-vs-guaranteed" className="space-y-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-2">
                                {isEs ? 'Emisión Simplificada vs. Emisión Garantizada' : 'Simplified Issue vs. Guaranteed Issue'}
                            </h2>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                {isEs 
                                    ? 'Dependiendo de su perfil médico y sus respuestas en la solicitud, existen dos vías principales de contratación:' 
                                    : 'Depending on your health history and application responses, there are two primary coverage routes:'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Simplified Issue Card */}
                            <div className="p-6 bg-emerald-50/80 border border-emerald-300 rounded-2xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black text-emerald-950 text-lg">
                                        {isEs ? 'Póliza de Emisión Simplificada' : 'Simplified Issue Policy'}
                                    </h3>
                                    <span className="bg-emerald-700 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">
                                        {isEs ? 'Recomendada' : 'Preferred'}
                                    </span>
                                </div>
                                <p className="text-xs md:text-sm text-emerald-900 leading-relaxed">
                                    {isEs 
                                        ? 'Requiere responder preguntas de salud y revisión de recetas médicas. Si califica, obtiene cobertura de Beneficio Inmediato (Level Benefit) desde el primer día con la cuota mensual más baja.' 
                                        : 'Requires answering health questions and passing an Rx check. Qualifying applicants receive immediate Day-One Level Coverage at the lowest possible monthly premium.'}
                                </p>
                                <ul className="text-xs text-emerald-900 space-y-1.5 pt-2">
                                    <li>✓ {isEs ? 'Cobertura 100% desde el Día 1' : '100% Day-One full death benefit payout'}</li>
                                    <li>✓ {isEs ? 'Primas mensuales más económicas' : 'Most affordable monthly premiums'}</li>
                                    <li>✓ {isEs ? 'Sin pruebas de sangre ni exámenes físicos' : 'No blood draws or physical examinations'}</li>
                                    <li>✓ {isEs ? 'Aprobación en 24 a 48 horas' : 'Approval decisions within 24 to 48 hours'}</li>
                                </ul>
                            </div>

                            {/* Guaranteed Issue Card */}
                            <div className="p-6 bg-blue-50/80 border border-blue-300 rounded-2xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black text-blue-950 text-lg">
                                        {isEs ? 'Póliza de Emisión Garantizada' : 'Guaranteed Issue Policy'}
                                    </h3>
                                    <span className="bg-blue-700 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">
                                        {isEs ? '100% Aceptación' : 'Generally No Questions'}
                                    </span>
                                </div>
                                <p className="text-xs md:text-sm text-blue-900 leading-relaxed">
                                    {isEs 
                                        ? 'Diseñada para adultos de 50 a 85 años con problemas de salud graves (cáncer activo, diálisis, insuficiencia cardíaca). Generalmente no requiere preguntas de salud ni revisión médica, aunque la disponibilidad del producto, las pautas de suscripción del asegurador y los períodos de espera por beneficios graduados pueden variar.' 
                                        : 'Designed for adults aged 50 to 85 with critical medical challenges (active cancer treatment, dialysis, CHF). Generally requires no medical questions or history checks, though product availability, carrier underwriting rules, and graded benefit waiting periods vary.'}
                                </p>
                                <ul className="text-xs text-blue-900 space-y-1.5 pt-2">
                                    <li>✓ {isEs ? 'Generalmente sin preguntas de salud' : 'Generally no health questions required'}</li>
                                    <li>✓ {isEs ? 'Aprobación garantizada 100% (según elegibilidad)' : '100% guaranteed acceptance (subject to eligibility)'}</li>
                                    <li>✓ {isEs ? 'Sujeta a período de espera de 2 años' : 'Subject to a 2-year graded waiting period'}</li>
                                    <li>✓ {isEs ? 'Primas estructuradas por la aseguradora' : 'Carrier-defined premium structure'}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 7. WAITING PERIODS EXPLAINED */}
                    <section id="waiting-periods" className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-3">
                            {isEs ? 'Períodos de Espera y Pago de Beneficios' : 'Waiting Periods & Benefit Payouts Explained'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                            {isEs 
                                ? 'Es indispensable que conozca con total transparencia cómo operan los períodos de espera antes de solicitar su póliza:' 
                                : 'Complete transparency is our hallmark. Here is how benefit payouts and waiting periods function:'}
                        </p>
                        <div className="space-y-3 text-xs md:text-sm">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary mb-1">
                                    {isEs ? '1. Cobertura Inmediata (Level Benefit - Día 1):' : '1. Immediate Day-One Payout (Level Benefit):'}
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Si califica para emisión simplificada con salud controlada, su familia está protegida por el 100% de la suma asegurada desde el primer día en que entra en vigor la póliza, ya sea por causas naturales o accidentes.' 
                                        : 'If you qualify for simplified issue with managed health, your family is 100% protected for the full face amount from day one, whether death occurs from natural causes or an accident.'}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary mb-1">
                                    {isEs ? '2. Período Graduado de 2 Años (Solo en Emisión Garantizada o Riesgo Alto):' : '2. Two-Year Graded Waiting Period (Guaranteed Issue Only):'}
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'En pólizas de emisión garantizada sin preguntas de salud, si el asegurado fallece por enfermedad o causa natural durante los primeros 24 meses, la aseguradora reembolsa el 100% de las primas pagadas más un interés adicional (usualmente entre 10% y 20%). A partir del mes 25, se paga el 100% del capital asegurado. Las muertes accidentales siempre están cubiertas al 100% desde el Día 1.' 
                                        : 'On zero-question guaranteed issue policies, if death occurs from illness during the first 24 months, the insurer refunds 100% of all premiums paid plus an additional interest percentage (typically 10% to 20%). After month 24, 100% of the full face amount is paid. Accidental death is covered at 100% immediately from Day 1.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 8. PREMIUMS & PRICE LOCK GUARANTEE */}
                    <section id="premiums" className="bg-light-gray p-6 md:p-8 rounded-2xl border border-gray-200">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-3">
                            {isEs ? 'Primas Mensuales Congeladas de por Vida' : 'Premiums Locked for Life: Cost Predictability'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                            {isEs 
                                ? 'La mayor ventaja de una póliza de Vida Entera (Whole Life) para gastos finales frente a seguros temporales o asociaciones de ayuda mutua es la certeza absoluta en su presupuesto:' 
                                : 'The defining advantage of a permanent Whole Life final expense policy over term plans or fraternal associations is complete budget certainty:'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 bg-white rounded-xl border border-gray-200">
                                <span className="text-xl font-black text-primary block mb-1">0%</span>
                                <h4 className="font-bold text-gray-900 text-sm mb-1">{isEs ? 'Aumentos por Edad' : 'Age Increases'}</h4>
                                <p className="text-xs text-gray-600">{isEs ? 'En pólizas estándar de prima nivelada, las cuotas mensuales se fijan en su edad de emisión y generalmente no aumentan con la edad, sujetas a los términos del contrato.' : 'In standard level-premium policies, monthly rates are locked at issue age and generally do not increase as you age, subject to policy terms.'}</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-200">
                                <span className="text-xl font-black text-primary block mb-1">0%</span>
                                <h4 className="font-bold text-gray-900 text-sm mb-1">{isEs ? 'Cambios por Salud' : 'Health Deterioration'}</h4>
                                <p className="text-xs text-gray-600">{isEs ? 'Una vez aprobada la póliza, cambios posteriores en su salud no alterarán su tarifa ni cancelarán su plan.' : 'New diagnoses after approval cannot alter your rate or cancel your plan.'}</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-200">
                                <span className="text-xl font-black text-primary block mb-1">100%</span>
                                <h4 className="font-bold text-gray-900 text-sm mb-1">{isEs ? 'Permanencia' : 'Lifetime Permanence'}</h4>
                                <p className="text-xs text-gray-600">{isEs ? 'Cobertura de vida entera estructurada para ser permanente durante toda su vida, siempre y cuando se mantengan los pagos requeridos de primas y sujeta a las disposiciones del contrato.' : 'Whole life coverage is structured to remain in force throughout your lifetime, provided required premiums are paid and subject to policy contract provisions.'}</p>
                            </div>
                        </div>
                    </section>

                    {/* 9. BENEFICIARIES & FINANCIAL CONTROL */}
                    <section id="beneficiaries" className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Beneficiarios: Pago de Beneficios y Tratamiento Fiscal' : 'Beneficiaries & Benefit Payout Structure'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Al contratar un seguro de gastos finales, usted designa libremente a sus beneficiarios (cónyuge, hijos o persona de confianza). Los beneficios por fallecimiento se pagan generalmente a los beneficiarios según los términos de la póliza y pueden recibir un tratamiento fiscal federal favorable; las disposiciones de la póliza y las circunstancias de los beneficiarios pueden incidir en el resultado.' 
                                : 'When setting up your final expense policy, you designate your beneficiaries (spouse, adult children, or trusted loved ones). Death benefits are generally paid to beneficiaries according to the policy terms and may receive favorable federal tax treatment; policy provisions and the beneficiary\'s circumstances can affect the outcome.'}
                        </p>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'A diferencia de los contratos prepagados funerarios (Pre-Need Plans) donde los fondos quedan atados a una empresa específica, sus beneficiarios reciben los fondos según las condiciones de la póliza y tienen libertad para contratar cualquier funeraria en Florida o en cualquier estado del país, comparar costos y destinar los fondos remanentes según sus necesidades.' 
                                : 'Unlike pre-need funeral contracts where funds are frozen with a single funeral home company, your beneficiaries receive funds according to policy terms. They have freedom to select any provider nationwide, evaluate service options, and utilize any remaining funds according to their needs.'}
                        </p>
                    </section>

                    {/* 10. COMPARISON TABLE */}
                    <section id="comparison" className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Comparativa: Gastos Finales vs. Seguro a Término vs. Funeraria Prepagada' : 'Comparison: Final Expense vs. Term Life vs. Pre-Need Funeral Plans'}
                        </h2>
                        <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-xs">
                            <table className="w-full text-left text-xs md:text-sm">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="p-3.5 md:p-4 font-bold">{isEs ? 'Característica' : 'Feature'}</th>
                                        <th className="p-3.5 md:p-4 font-bold bg-secondary">{isEs ? 'Seguro Gastos Finales' : 'Final Expense Whole Life'}</th>
                                        <th className="p-3.5 md:p-4 font-bold">{isEs ? 'Seguro a Término' : 'Term Life Insurance'}</th>
                                        <th className="p-3.5 md:p-4 font-bold">{isEs ? 'Funeraria Prepagada' : 'Pre-Need Funeral Plan'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? '¿Vence la Póliza?' : 'Does Coverage Expire?'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Nunca (De por vida)' : 'Never (Lifelong)'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Sí (A los 10, 20 o 30 años)' : 'Yes (After 10, 20, or 30 yrs)'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'No vence pero es inflexible' : 'Does not expire, but rigid'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Primas Mensuales' : 'Monthly Premiums'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Congeladas para siempre' : 'Locked for life'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Se disparan al renovar' : 'Skyrocket at renewal'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Pagos fijados en contrato' : 'Contract installments'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Examen Médico Tradicional' : 'Traditional Medical Exam'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'No requerido en emisión simplificada' : 'Not required (Simplified)'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Frecuentemente obligatorio' : 'Frequently required'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Sin examen' : 'No medical exam'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Libertad de Proveedores' : 'Provider Freedom'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? '100% Libertad en todo EE.UU.' : '100% Freedom Nationwide'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? '100% Libertad' : '100% Freedom'}</td>
                                        <td className="p-3.5 md:p-4 text-rose-700 font-medium">{isEs ? 'Atado a 1 sola funeraria' : 'Locked to 1 funeral home'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Uso del Dinero Restante' : 'Use of Excess Cash'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Beneficiarios lo conservan' : 'Beneficiaries keep balance'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Beneficiarios lo conservan' : 'Beneficiaries keep balance'}</td>
                                        <td className="p-3.5 md:p-4 text-rose-700 font-medium">{isEs ? 'Retenido por la funeraria' : 'Retained by funeral home'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 11. APPLICATION PROCESS */}
                    <section id="application-process" className="bg-light-gray p-6 md:p-8 rounded-2xl border border-gray-200">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? 'Proceso de Solicitud Paso a Paso' : 'The Application Process Step-by-Step'}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-white rounded-xl border border-gray-200">
                                <span className="w-8 h-8 rounded-lg bg-accent text-primary font-black flex items-center justify-center text-sm mb-3">1</span>
                                <h4 className="font-bold text-primary text-sm mb-1">{isEs ? 'Consulta Confidencial' : 'Free Consultation'}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Revisión sin costo de sus medicamentos y edad.' : 'Confidential review of your age and prescription history.'}</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-200">
                                <span className="w-8 h-8 rounded-lg bg-accent text-primary font-black flex items-center justify-center text-sm mb-3">2</span>
                                <h4 className="font-bold text-primary text-sm mb-1">{isEs ? 'Comparación de 15+ Aseguradoras' : 'Multi-Carrier Quote'}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Comparamos Mutual of Omaha, Aetna, Foresters y más.' : 'We shop 15+ top A-rated insurers based on your budget and goals.'}</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-200">
                                <span className="w-8 h-8 rounded-lg bg-accent text-primary font-black flex items-center justify-center text-sm mb-3">3</span>
                                <h4 className="font-bold text-primary text-sm mb-1">{isEs ? 'Firma Electrónica o de Voz' : 'Voice or E-Sign'}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Solicitud sencilla por teléfono o internet sin salir de casa.' : 'Effortless approval via phone signature or secure email link.'}</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-200">
                                <span className="w-8 h-8 rounded-lg bg-accent text-primary font-black flex items-center justify-center text-sm mb-3">4</span>
                                <h4 className="font-bold text-primary text-sm mb-1">{isEs ? 'Emisión de Póliza' : 'Policy Delivered'}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Aprobación rápida y entrega física de su póliza oficial.' : 'Fast approval decision and physical policy delivery.'}</p>
                            </div>
                        </div>
                    </section>

                    {/* 12. ANDRES BOZO CREDIBILITY */}
                    <section id="andres-bozo" className="bg-white border-2 border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 md:w-32 md:md:h-32 rounded-full bg-primary/10 border-4 border-accent flex items-center justify-center text-3xl font-black text-primary shrink-0">
                            AB
                        </div>
                        <div className="space-y-2 text-center md:text-left">
                            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                                {isEs ? 'Su Corredor de Seguros Independiente en Florida' : 'Your Independent Florida Insurance Broker'}
                            </span>
                            <h3 className="text-xl md:text-2xl font-black font-heading text-primary">
                                Andrés H. Bozo (NPN: 21228432)
                            </h3>
                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                {isEs 
                                    ? 'Como corredor independiente con licencia del Estado de Florida, no trabajo para una compañía de seguros; trabajo exclusivamente para usted y su familia. Mi compromiso es comparar las mejores opciones del mercado para encontrarle la cobertura más alta al costo mensual más bajo, con atención humana, transparente y 100% en español.' 
                                    : 'As a state-licensed independent Florida insurance broker, I represent you, not an insurance conglomerate. My objective is to shop the entire marketplace to identify the highest coverage at the lowest locked-in rate, backed by lifelong personal support and independent expertise.'}
                            </p>
                            <p className="text-xs font-semibold text-primary pt-1">
                                {isEs ? '📍 Residencia y Agencia: Gainesville, Florida | Servicio a todo el estado' : '📍 Based in Gainesville, Florida | Serving families statewide'}
                            </p>
                        </div>
                    </section>

                    {/* 13. REVIEWS & TESTIMONIALS */}
                    <section id="reviews" className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Opiniones y Testimonios de Familias en Florida' : 'Client Reviews & Community Testimonials'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-5 bg-light-gray rounded-xl border border-gray-200">
                                <div className="text-amber-500 font-bold text-sm mb-2">★★★★★</div>
                                <p className="text-xs text-gray-700 italic leading-relaxed mb-3">
                                    {isEs 
                                        ? '“Tengo diabetes y me preocupaba que me rechazaran. Andrés comparó varias opciones y me consiguió una póliza de $15,000 con Mutual of Omaha que me cubrió desde el primer día.”' 
                                        : '“I have diabetes and was worried I would be rejected. Andres checked several carriers and found me a $15,000 policy with immediate Day-One coverage. Wonderful service!”'}
                                </p>
                                <span className="text-xs font-bold text-primary block">— Carmen M., Orlando, FL</span>
                            </div>
                            <div className="p-5 bg-light-gray rounded-xl border border-gray-200">
                                <div className="text-amber-500 font-bold text-sm mb-2">★★★★★</div>
                                <p className="text-xs text-gray-700 italic leading-relaxed mb-3">
                                    {isEs 
                                        ? '“Queríamos evitar que nuestros hijos tuvieran que pagar de su bolsillo cuando faltáramos. El proceso fue por teléfono en 20 minutos, muy respetuoso y claro.”' 
                                        : '“We wanted to ensure our children would never face funeral debt. The application took 20 minutes over the phone. Clear, respectful, and truly honest advice.”'}
                                </p>
                                <span className="text-xs font-bold text-primary block">— Roberto & Elena S., Miami, FL</span>
                            </div>
                            <div className="p-5 bg-light-gray rounded-xl border border-gray-200">
                                <div className="text-amber-500 font-bold text-sm mb-2">★★★★★</div>
                                <p className="text-xs text-gray-700 italic leading-relaxed mb-3">
                                    {isEs 
                                        ? '“Tenía una póliza de término que subió de precio al cumplir 70. Andrés me ayudó a cambiar a gastos finales de por vida con una cuota fija que nunca aumentará.”' 
                                        : '“My 20-year term expired at age 70 with an unaffordable renewal price. Andres helped me transition to a locked-rate whole life plan that fits my retirement budget.”'}
                                </p>
                                <span className="text-xs font-bold text-primary block">— David T., Tampa, FL</span>
                            </div>
                        </div>
                    </section>

                    {/* 14. COMMON QUESTIONS (FAQ ACCORDION) */}
                    <section id="faq">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? 'Preguntas Frecuentes sobre Gastos Finales' : 'Frequently Asked Questions'}
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div 
                                        key={index} 
                                        className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-white shadow-xs"
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
                                            <div className="p-5 md:p-6 pt-0 text-gray-700 text-sm leading-relaxed border-t border-gray-100 bg-light-gray/40">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* 15. CTA / QUOTE SECTION */}
                    <section id="cta" className="bg-primary text-white rounded-2xl p-6 md:p-10 text-center space-y-6 shadow-xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                            {isEs ? 'Asesoría Gratuita y Sin Compromiso' : 'Free Unbiased Rate Comparison'}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black font-heading max-w-2xl mx-auto leading-tight">
                            {isEs 
                                ? 'Proteja a Sus Seres Queridos Hoy con Tarifas Congeladas' 
                                : 'Protect Your Family Today with Contractually Locked Rates'}
                        </h2>
                        <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
                            {isEs 
                                ? 'Permítanos cotizar y comparar más de 15 aseguradoras para encontrarle la opción más accesible para su edad y estado de salud.' 
                                : 'Let us quote and compare 15+ top burial insurers to find the most affordable, dependable option for your budget.'}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <button
                                onClick={onOpenQuote}
                                className="w-full sm:w-auto bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer"
                            >
                                {isEs ? 'Ver Mis Opciones de Gastos Finales' : 'Get My Final Expense Options'}
                            </button>
                            <a
                                href="tel:+13522258389"
                                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl border border-white/20 transition-all text-center"
                            >
                                {isEs ? 'Hablar con Andrés (+1 352-225-8389)' : 'Talk With Andres (+1 352-225-8389)'}
                            </a>
                        </div>
                    </section>

                </div>
            </div>

            {/* Related Services Navigation */}
            <RelatedServices currentService="final-expense" language={language} />
        </div>
    );
};
