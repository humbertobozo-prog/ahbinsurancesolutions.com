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
        ? 'Guía Completa de Seguro de Gastos Finales y Funeral en Florida 2026 | AHB Insurance' 
        : 'Final Expense & Burial Insurance Complete Florida Guide 2026 | AHB Insurance';

    const description = isEs 
        ? 'Asegure entre $5,000 y $35,000 para costos funerales en Florida. Tarifas congeladas de por vida, sin exámenes médicos y desembolso libre de impuestos para su familia.' 
        : 'Secure $5,000 to $35,000 for Florida funeral costs. Permanent whole life coverage with locked rates, no medical exams, and immediate tax-free cash payout.';

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = isEs ? [
        {
            q: "¿El Seguro Social paga los gastos de funeral en Florida?",
            a: "No. El Seguro Social solo otorga un pago único por fallecimiento de $255 a cónyuges sobrevivientes elegibles. Dado que los funerales promedio en Florida cuestan entre $8,000 y $12,000, un seguro de gastos finales es fundamental para evitar traspasar esa carga financiera a sus seres queridos."
        },
        {
            q: "¿Aumentarán mis primas mensuales a medida que cumpla más años?",
            a: "No. Todas nuestras pólizas de Gastos Finales son de Vida Entera (Whole Life). Una vez aprobada la póliza, su tarifa mensual queda 100% congelada para siempre, el beneficio por fallecimiento nunca disminuirá y la póliza nunca expirará mientras mantenga los pagos al día."
        },
        {
            q: "¿Necesito un examen médico para calificar para un seguro de entierro?",
            a: "No. No hay exámenes médicos, muestras de sangre ni revisiones físicas. La aprobación se basa únicamente en un cuestionario de salud simple y la verificación electrónica de prescripciones médicas."
        },
        {
            q: "¿Cuál es la diferencia entre un Seguro de Gastos Finales y un Contrato Funerario Prepagado (Pre-Need)?",
            a: "Un contrato prepagado lo ata a una funeraria específica. Si esa funeraria quiebra, cambia de dueño o usted se muda fuera del estado o condado, puede perder su dinero. Un seguro de gastos finales otorga efectivo directo y libre de impuestos a sus beneficiarios, dándoles total libertad para usar cualquier funeraria en cualquier lugar de EE.UU."
        },
        {
            q: "¿Puedo calificar si tengo condiciones preexistentes como Diabetes o Hipertensión?",
            a: "Sí. Ofrecemos diferentes niveles de cobertura: Beneficio Inmediato (Level) para personas con condiciones controladas, Beneficio Graduado para condiciones moderadas reciente, y Emisión Garantizada (sin preguntas de salud) para personas entre 50 y 85 años con problemas graves de salud."
        }
    ] : [
        {
            q: "Does Social Security pay for my funeral expenses in Florida?",
            a: "No. Social Security provides a single, one-time death benefit of just $255 to eligible surviving spouses. Since average Florida funeral costs range from $8,000 to $12,000, final expense insurance is essential to prevent leaving debt to family members."
        },
        {
            q: "Will my monthly premiums ever increase as I get older?",
            a: "No. All of our Final Expense policies are Permanent Whole Life insurance. Once issued, your monthly premium is locked in for life, your coverage amount can never decrease, and the policy will never expire."
        },
        {
            q: "Do I need a medical exam or blood test to qualify for burial insurance?",
            a: "No. Qualification requires zero medical exams, blood draws, or doctor physicals. Approval is based on straightforward health questions and electronic medical prescription checks."
        },
        {
            q: "What is the difference between Final Expense Insurance and a Pre-Need Funeral Plan?",
            a: "Pre-need plans tie your money to one specific local funeral home. If that funeral home goes out of business or if you relocate, transferring funds can be difficult or costly. Final Expense insurance pays flexible, tax-free cash directly to your chosen beneficiary to use with any funeral director nationwide."
        },
        {
            q: "Can I qualify for coverage if I have pre-existing conditions like diabetes or high blood pressure?",
            a: "Yes. We offer Level Immediate Benefits for controlled conditions, Graded Benefits for moderate health histories, and Guaranteed Issue (no health questions) for applicants aged 50 to 85 with severe health challenges."
        }
    ];

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": isEs ? "Seguro de Gastos Finales y Funeral" : "Final Expense & Burial Life Insurance",
        "provider": {
            "@type": ["InsuranceAgency", "Organization", "LocalBusiness"],
            "name": "AHB Insurance Solutions",
            "url": "https://www.ahbinsurancesolutions.com/",
            "telephone": "+1-352-225-8389",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "5500 SW Archer Road, Apt H103",
                "addressLocality": "Gainesville",
                "addressRegion": "FL",
                "postalCode": "32607",
                "addressCountry": "US"
            }
        },
        "areaServed": "FL",
        "description": description
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
                "name": isEs ? "Gastos Finales en Florida" : "Final Expense Insurance",
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
                    <span className="text-primary font-bold">{isEs ? 'Gastos Finales en Florida' : 'Final Expense Insurance'}</span>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                            {isEs ? 'Protección Familiar Permanente | Cobertura de Vida Entera' : 'Permanent Family Protection | Whole Life Insurance'}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black font-heading mb-6 leading-tight">
                            {isEs 
                                ? 'Seguro de Gastos Finales y Funeral en Florida' 
                                : 'Final Expense & Burial Insurance Plans'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Garantice que sus hijos o cónyuge no enfrenten deudas repentinas de $10,000+ por costos funerarios. Tarifas congeladas para siempre, desembolso en días y sin exámenes médicos.'
                                : 'Protect your children from taking on $10,000+ in sudden funeral debt. Secure lifetime peace of mind with locked-in rates and immediate tax-free payouts.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onOpenQuote}
                                className="bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                            >
                                {isEs ? 'Calcular Tarifas Fijas ➔' : 'Get Instant Rate Quote ➔'}
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

            {/* Educational Content & Expense Breakdown */}
            <section className="py-12 md:py-16 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Understanding Final Expense Whole Life */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-4">
                            {isEs ? '¿Qué es el Seguro de Gastos Finales y Cómo Protege a la Familia?' : 'Understanding Final Expense Whole Life Insurance'}
                        </h2>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">
                            {isEs 
                                ? 'El Seguro de Gastos Finales (también conocido como seguro de entierro o seguro funerario) es una póliza de Vida Entera (Whole Life) diseñada específicamente para cubrir costos de entierro, cremación, servicios funerarios, facturas médicas pendientes y pequeñas deudas tras el fallecimiento.'
                                : 'Final Expense Insurance (often called burial or funeral insurance) is a permanent Whole Life policy crafted to cover burial costs, cremation services, medical bills, and outstanding debt upon death.'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-light-gray rounded-2xl border border-gray-200">
                                <div className="w-10 h-10 bg-accent text-primary font-black rounded-xl flex items-center justify-center mb-4 text-base">1</div>
                                <h3 className="font-bold text-primary mb-2 text-base">{isEs ? 'Tarifas Congeladas de Por Vida' : 'Locked-In Monthly Rates'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Sus mensualidades jamás aumentarán debido a su edad o deterioro de salud.' : 'Monthly premiums never increase regardless of age or health changes.'}</p>
                            </div>
                            <div className="p-6 bg-light-gray rounded-2xl border border-gray-200">
                                <div className="w-10 h-10 bg-accent text-primary font-black rounded-xl flex items-center justify-center mb-4 text-base">2</div>
                                <h3 className="font-bold text-primary mb-2 text-base">{isEs ? 'Sin Exámenes Médicos' : 'No Physical Exams'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Aprobación rápida respondiendo un breve cuestionario de salud sin agujas ni enfermeros.' : 'Instant approval process with simple medical questions and zero physical exams.'}</p>
                            </div>
                            <div className="p-6 bg-light-gray rounded-2xl border border-gray-200">
                                <div className="w-10 h-10 bg-accent text-primary font-black rounded-xl flex items-center justify-center mb-4 text-base">3</div>
                                <h3 className="font-bold text-primary mb-2 text-base">{isEs ? 'Desembolso en Efectivo Rápido' : 'Fast Cash Distribution'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'El beneficio llega libre de impuestos a sus beneficiarios en un lapso de 24 a 48 horas.' : 'Tax-free cash is paid directly to your designated beneficiaries within days.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Breakdown of Funeral Costs in Florida */}
                    <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-6">
                        <div>
                            <h2 className="text-2xl font-black font-heading text-accent mb-2">
                                {isEs ? 'Desglose de Costos Funerarios Reales en Florida 2026' : 'Itemized Real Funeral Costs in Florida 2026'}
                            </h2>
                            <p className="text-xs text-gray-200">
                                {isEs ? 'Según la Asociación Nacional de Directores de Funerarias (NFDA), estos son los costos promedios en Florida:' : 'According to National Funeral Directors Association (NFDA) benchmarks for Florida:'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2">
                                <h3 className="text-accent font-bold text-sm uppercase">{isEs ? 'Servicio de Entierro Tradicional' : 'Traditional Funeral & Burial'}</h3>
                                <p className="text-3xl font-black">$9,500 – $14,000</p>
                                <ul className="text-xs text-gray-300 space-y-1 pt-2">
                                    <li>• {isEs ? 'Honorarios del Director Funerario ($2,500)' : 'Funeral Director Base Fee ($2,500)'}</li>
                                    <li>• {isEs ? 'Ataúd de Metal o Madera ($2,500 - $5,000)' : 'Casket & Vault ($2,500 - $5,000)'}</li>
                                    <li>• {isEs ? 'Parcela de Cripta o Cementerio ($2,000 - $4,000)' : 'Cemetery Plot & Opening ($2,000 - $4,000)'}</li>
                                    <li>• {isEs ? 'Embalsamamiento y Velatorio ($1,200)' : 'Embalming & Viewing Services ($1,200)'}</li>
                                </ul>
                            </div>

                            <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2">
                                <h3 className="text-accent font-bold text-sm uppercase">{isEs ? 'Servicio de Cremación Memorial' : 'Cremation & Memorial Service'}</h3>
                                <p className="text-3xl font-black">$4,000 – $7,500</p>
                                <ul className="text-xs text-gray-300 space-y-1 pt-2">
                                    <li>• {isEs ? 'Tarifa de Cremación Básica ($1,500)' : 'Basic Cremation Fee ($1,500)'}</li>
                                    <li>• {isEs ? 'Urna y Recipiente ($300 - $1,000)' : 'Urna & Container ($300 - $1,000)'}</li>
                                    <li>• {isEs ? 'Ceremonia Memorial o Capilla ($1,500)' : 'Memorial Chapel Ceremony ($1,500)'}</li>
                                    <li>• {isEs ? 'Permisos de Cremación del Condado ($250)' : 'County Cremation Permits ($250)'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Underwriting Tiers Breakdown */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-2xl font-black font-heading text-primary mb-2">
                            {isEs ? 'Categorías de Aprobación según su Estado de Salud' : 'Underwriting Qualification Categories'}
                        </h2>
                        <p className="text-xs text-gray-600 mb-6">
                            {isEs ? 'Trabajamos con más de 15 aseguradoras especializadas para ubicarlo en la mejor tarifa según su historial médico.' : 'We partner with 15+ top burial insurance carriers to secure the lowest rate for your health profile.'}
                        </p>

                        <div className="space-y-4">
                            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-emerald-900 text-base">{isEs ? 'Beneficio Inmediato / Nivelado (Level Benefit)' : 'Level Immediate Benefit'}</h3>
                                    <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">{isEs ? '100% Desde el Día 1' : '100% Day-One Payout'}</span>
                                </div>
                                <p className="text-xs text-emerald-800 leading-relaxed">
                                    {isEs 
                                        ? 'Para solicitantes con salud razonable o condiciones controladas (como hipertensión, colesterol alto o diabetes controlada). Su familia recibe el 100% del dinero desde el primer día.' 
                                        : 'For applicants with good or manageable health (high blood pressure, controlled diabetes). Beneficiaries are 100% covered from day one.'}
                                </p>
                            </div>

                            <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-amber-900 text-base">{isEs ? 'Beneficio Graduado / Modificado (Graded Benefit)' : 'Graded Benefit'}</h3>
                                    <span className="bg-amber-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">{isEs ? 'Cobertura Progresiva' : 'Graded Payout'}</span>
                                </div>
                                <p className="text-xs text-amber-800 leading-relaxed">
                                    {isEs 
                                        ? 'Diseñado para personas con antecedentes médicos moderados recientes (como problemas cardíacos o neuropatía). Paga un porcentaje progresivo en los años 1-2 y 100% en el año 3.' 
                                        : 'Designed for moderate recent health history (past heart procedures). Pays a scaled percentage in years 1-2 and 100% starting year 3.'}
                                </p>
                            </div>

                            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-blue-900 text-base">{isEs ? 'Emisión Garantizada (Guaranteed Issue)' : 'Guaranteed Issue'}</h3>
                                    <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">{isEs ? 'Sin Preguntas de Salud' : 'Zero Health Questions'}</span>
                                </div>
                                <p className="text-xs text-blue-800 leading-relaxed">
                                    {isEs 
                                        ? 'Para personas de 50 a 85 años con problemas graves de salud. Aprobación 100% garantizada sin cuestionarios de salud ni registros médicos.' 
                                        : 'For applicants aged 50 to 85 with severe health issues. Guaranteed acceptance with zero health questions or medical records.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive FAQ Section with Schema */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? 'Preguntas Frecuentes sobre Seguro de Entierro en Florida' : 'Frequently Asked Questions About Florida Burial Insurance'}
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
                                {isEs ? '¿Desea conocer la tarifa mensual fija para su edad?' : 'Want to compare instant fixed rates for your exact age?'}
                            </h3>
                            <p className="text-sm text-gray-700">
                                {isEs 
                                    ? 'Como corredor licenciado en Florida (NPN 21228432), le muestro las opciones más económicas de más de 15 aseguradoras.' 
                                    : 'As a licensed Florida broker (NPN 21228432), I shop top carriers to lock in the lowest price for your family.'}
                            </p>
                        </div>
                        <button
                            onClick={onOpenQuote}
                            className="bg-primary text-white hover:bg-secondary text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all whitespace-nowrap shadow cursor-pointer"
                        >
                            {isEs ? 'Ver Tarifas Funerarias' : 'Get Instant Rates'}
                        </button>
                    </div>

                </div>
            </section>

            {/* Internal Cross-Linking to Other Services */}
            <RelatedServices currentService="final-expense" language={language} />
        </div>
    );
};

