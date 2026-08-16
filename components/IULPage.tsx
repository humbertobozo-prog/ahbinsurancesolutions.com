import React, { useState } from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { RelatedServices } from './RelatedServices';

interface IULPageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const IULPage: React.FC<IULPageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/iul-jubilacion' : '/iul-retirement'}`;
    const enUrl = `${baseUrl}/iul-retirement`;
    const esUrl = `${baseUrl}/es/iul-jubilacion`;

    const title = isEs 
        ? 'Guía Completa de Vida Universal Indexada (IUL) en Florida 2026 | AHB Insurance' 
        : 'Indexed Universal Life (IUL) Insurance Master Guide Florida 2026 | AHB Insurance';

    const description = isEs 
        ? 'Aprenda cómo el IUL protege sus ahorros con piso del 0% contra caídas del mercado y permite ingresos de jubilación 100% libres de impuestos según Código IRS 7702 en Florida.' 
        : 'Discover how Indexed Universal Life (IUL) protects wealth with a 0% market downside floor and tax-free retirement loans under IRS Section 7702 in Florida.';

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = isEs ? [
        {
            q: "¿Cómo funciona la garantía de piso del 0% en un seguro IUL?",
            a: "En una póliza IUL, su dinero en efectivo no está invertido directamente en la bolsa de valores. En su lugar, el rendimiento se acredita en función de un índice (como el S&P 500). Si el índice cae un 20% o 30% durante un colapso financiero, la cláusula de piso del 0% garantiza que su saldo en efectivo no pierde ni un solo dólar por fluctuaciones del mercado."
        },
        {
            q: "¿Son realmente libres de impuestos los retiros de jubilación de un IUL?",
            a: "Sí. Bajo el Código de Impuestos de EE.UU. (IRS Código 7702 y Sección 72e), usted puede tomar préstamos sobre el valor en efectivo acumulado en la póliza. Dado que los préstamos de seguros no se consideran ingresos imponibles, no paga impuestos sobre la renta, ni afecta la tasa impositiva de sus beneficios de Seguro Social."
        },
        {
            q: "¿Qué son los Beneficios en Vida (Living Benefits) incluidos en una póliza IUL?",
            a: "Los Beneficios en Vida le permiten adelantar un porcentaje sustancial (hasta un 80% o 90%) del beneficio por fallecimiento mientras está vivo si se le diagnostica una enfermedad grave, crónica (incapacidad para realizar 2 de 6 actividades diarias) o terminal (Cáncer, Infarto, ACV, ALS), sin restricciones en cómo gasta el dinero."
        },
        {
            q: "¿En qué se diferencia un IUL de una cuenta 401(k) o IRA Tradicional?",
            a: "En un 401(k) o IRA Tradicional, sus retiros en la jubilación tributan como ingresos ordinarios al 100% y está sujeto a Distribuciones Mínimas Requeridas (RMDs) obligatorias a los 73/75 años. El IUL no tiene RMDs, no tiene límites de aportes según ingresos y permite acceso a capital exento de impuestos a cualquier edad antes o después de los 59.5 años sin penalidades del IRS."
        },
        {
            q: "¿Qué es un Contrato de Enfriamiento / Contrato de Beneficio Modificado (MEC) y cómo se evita?",
            a: "Un MEC ocurre si deposita demasiado dinero en efectivo en la póliza demasiado rápido en relación con el monto del beneficio por fallecimiento (prueba de 7 pagos del IRS). Estructuramos profesionalmente su IUL para maximizar la acumulación de efectivo manteniendo la póliza estrictamente no-MEC para preservar todos los privilegios fiscales."
        }
    ] : [
        {
            q: "How does the 0% downside market floor work in an IUL policy?",
            a: "With Indexed Universal Life, your cash value is not invested directly in equity markets. Instead, your interest crediting is linked to an index like the S&P 500. When the market plunges 20% or 30%, the 0% floor guarantees your principal cash value receives 0% loss—protecting your accumulated wealth from market crashes."
        },
        {
            q: "Are retirement withdrawals from an IUL policy truly tax-free?",
            a: "Yes. Under IRS Tax Code 7702 and Section 72(e), cash value distributions accessed via policy loans are tax-free. Because loans are not recognized as reportable gross income, they do not trigger income tax brackets or inflate Social Security benefit taxation."
        },
        {
            q: "What are Living Benefits (Accelerated Death Benefit Riders) in an IUL?",
            a: "Living Benefits allow you to accelerate up to 80%-90% of your policy's death benefit while living if diagnosed with a qualifying critical illness (heart attack, stroke, invasive cancer) or chronic condition (inability to perform 2 of 6 Activities of Daily Living). Funds can pay for experimental medical treatments, mortgage, or long-term care."
        },
        {
            q: "How does an IUL compare to a Traditional 401(k) or Traditional IRA?",
            a: "A 401(k) or Traditional IRA defers tax today, but 100% of future withdrawals are taxed as ordinary income in retirement, alongside mandatory Required Minimum Distributions (RMDs) at age 73/75. An IUL has no RMDs, no income eligibility limits, and permits penalty-free tax-exempt loans prior to age 59½."
        },
        {
            q: "What is a Modified Endowment Contract (MEC) and how do you prevent it?",
            a: "A policy becomes a MEC if funded with excessive cash relative to the death benefit under the IRS 7-pay test, causing distributions to lose tax-free status. We engineer custom maximum-funded, minimum-death-benefit IUL designs to prevent MEC status and optimize cash growth."
        }
    ];

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": ["Service", "FinancialProduct"],
        "name": isEs ? "Vida Universal Indexada (IUL) y Jubilación Libre de Impuestos en Florida" : "Indexed Universal Life (IUL) & Tax-Free Retirement Planning in Florida",
        "serviceType": "Indexed Universal Life Insurance & Retirement Wealth Structuring",
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
            "jobTitle": "Licensed Life Insurance & Financial Broker",
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
            "audienceType": isEs ? "Personas y familias que buscan crecimiento financiero libre de impuestos y protección de vida en Florida" : "Individuals and families seeking tax-free growth and living benefits in Florida"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": isEs ? "Ilustración personalizada de IUL y análisis de jubilación sin compromiso" : "Complimentary custom IUL illustration and retirement analysis",
            "availability": "https://schema.org/InStock"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "IUL Strategy Solutions",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": isEs ? "Crecimiento del Valor en Efectivo Indexado (Piso del 0% contra Pérdidas)" : "Indexed Cash Value Growth (0% Market Downside Protection)"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": isEs ? "Ingresos de Jubilación Libres de Impuestos (Préstamos con Ventaja Fiscal)" : "Tax-Free Retirement Income Streams"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": isEs ? "Beneficios en Vida (Enfermedad Crónica, Crítica o Terminal)" : "Living Benefits for Chronic, Critical & Terminal Illness"
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
                "name": isEs ? "IUL y Jubilación" : "IUL Tax-Free Retirement",
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
                    <span className="text-primary font-bold">{isEs ? 'IUL y Jubilación Libre de Impuestos' : 'IUL Tax-Free Retirement'}</span>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                            {isEs ? 'Planificación Financiera Avanzada | Código IRS 7702' : 'Advanced Financial Planning | IRS Code 7702'}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black font-heading mb-6 leading-tight">
                            {isEs 
                                ? 'Seguros de Vida Universal Indexada (IUL) en Florida' 
                                : 'Indexed Universal Life (IUL) Insurance Policies'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Combine crecimiento de capital basado en índices como el S&P 500, protección garantizada contra pérdidas de mercado (piso del 0%) e ingresos de jubilación 100% libres de impuestos.'
                                : 'Participate in index gains tied to the S&P 500, backed by a guaranteed 0% market downside floor and tax-free retirement loan strategies.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onOpenQuote}
                                className="bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                            >
                                {isEs ? 'Solicitar Ilustración Personalizada ➔' : 'Get Custom IUL Illustration ➔'}
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

            {/* In-Depth Educational Content */}
            <section className="py-12 md:py-16 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* How IUL Works Mechanics */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-4">
                            {isEs ? '¿Cómo Funciona el Motor Financiero de un IUL?' : 'The Financial Engine Behind an IUL Policy'}
                        </h2>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">
                            {isEs 
                                ? 'A diferencia de las acciones directas o los fondos mutuos, una póliza IUL separa su dinero del riesgo bursátil directo mediante el uso de opciones sobre índices. Esto crea la regla dorada del IUL: "Cero es su héroe".'
                                : 'Unlike direct stock investments or mutual funds, an IUL policy protects your money from market crashes using index call options. This enables the core IUL axiom: "Zero is your hero".'}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200">
                                <span className="text-primary font-black text-2xl block mb-2">01.</span>
                                <h3 className="font-bold text-primary mb-2 text-base">{isEs ? 'Piso del 0% Garantizado' : '0% Downside Floor'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Si el índice S&P 500 se desploma un 15%, 25% o 40%, su interés acreditado es del 0%. Su saldo acumulado anterior queda intocable.' 
                                        : 'When the S&P 500 index drops 15%, 25%, or 40%, your policy receives 0% interest—preserving 100% of prior gains.'}
                                </p>
                            </div>

                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200">
                                <span className="text-accent font-black text-2xl block mb-2">02.</span>
                                <h3 className="font-bold text-primary mb-2 text-base">{isEs ? 'Participación en Mercados Alcistas' : 'Upside Growth Potential'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Cuando los mercados suben, usted recibe rendimientos hasta un tope de tasa ("Cap") típicamente entre 8% y 12% o tasas de participación ilimitadas.' 
                                        : 'During bull market cycles, your account yields interest up to capped rates (8%-12%) or via uncapped participation strategies.'}
                                </p>
                            </div>

                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200">
                                <span className="text-secondary font-black text-2xl block mb-2">03.</span>
                                <h3 className="font-bold text-primary mb-2 text-base">{isEs ? 'Interés Compuesto Exento' : 'Tax-Free Compounding'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Sus ganancias crecen libre de impuestos sobre la renta y sobre plusvalías, permitiendo un crecimiento acelerado año tras año.' 
                                        : 'Interest growth accumulates without capital gains taxation, amplifying compound growth over multi-decade horizons.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Table: IUL vs 401(k) vs Roth IRA */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-2xl font-black font-heading text-primary mb-2">
                            {isEs ? 'Comparación Estratégica: IUL vs 401(k) / IRA vs Roth IRA' : 'Strategic Comparison: IUL vs 401(k) / Traditional IRA vs Roth IRA'}
                        </h2>
                        <p className="text-xs text-gray-600 mb-6">
                            {isEs ? 'Evaluación de reglas fiscales, límites de aportes y protección de activos bajo leyes de EE.UU.' : 'Evaluation of tax rules, contribution caps, and asset protection under U.S. law.'}
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs md:text-sm text-gray-700">
                                <thead className="bg-primary text-white text-xs uppercase font-bold">
                                    <tr>
                                        <th className="p-3.5 rounded-tl-xl">{isEs ? 'Criterio Financiero' : 'Financial Metric'}</th>
                                        <th className="p-3.5 bg-primary text-accent font-black">IUL (Código 7702)</th>
                                        <th className="p-3.5">401(k) / IRA Tradicional</th>
                                        <th className="p-3.5 rounded-tr-xl bg-gray-800">Roth IRA</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 font-medium">
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Tratamiento Fiscal de Retiros' : 'Taxation on Withdrawals'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">100% Libre de Impuestos</td>
                                        <td className="p-3.5 text-amber-700 font-bold">Tributa como Ingreso Ordinario</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">100% Libre de Impuestos</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Protección contra Caídas Bursátiles' : 'Market Downside Protection'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Garantía del 0% (Sin Pérdida)</td>
                                        <td className="p-3.5 text-red-600">Sin Protección (Riesgo Total)</td>
                                        <td className="p-3.5 text-red-600">Sin Protección (Riesgo Total)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Límite Anual de Contribución' : 'Annual Contribution Limits'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Sin Límite del IRS</td>
                                        <td className="p-3.5 text-gray-600">Tope de $23,500/año (2026)</td>
                                        <td className="p-3.5 text-gray-600">Tope estricto de $7,000/año</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Límite de Ingresos para Calificar' : 'Income Eligibility Cap'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Sin Límite de Ingresos</td>
                                        <td className="p-3.5 text-gray-600">Sin Límite</td>
                                        <td className="p-3.5 text-amber-700 font-bold">Eliminado a altos ingresos</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Retiros Antes de los 59.5 Años' : 'Withdrawals Before Age 59½'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Sin Penalidades del 10%</td>
                                        <td className="p-3.5 text-red-600">Penalidad del 10% del IRS</td>
                                        <td className="p-3.5 text-amber-700 font-bold">Solo aportes directos</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Protección Familiar (Fallecimiento)' : 'Death Benefit Protection'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Beneficio por Fallecimiento Exento</td>
                                        <td className="p-3.5 text-gray-600">No Incluye Seguro de Vida</td>
                                        <td className="p-3.5 text-gray-600">No Incluye Seguro de Vida</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Living Benefits Section */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 space-y-4">
                        <span className="bg-amber-500 text-white font-black text-xs uppercase px-3 py-1 rounded-full inline-block">
                            {isEs ? 'Protección en Vida sin Costo Adicional' : 'Accelerated Living Benefits Included'}
                        </span>
                        <h2 className="text-2xl font-black font-heading text-primary">
                            {isEs ? 'Beneficios en Vida: Use su Beneficio por Fallecimiento Mientras Vive' : 'Living Benefits: Access Your Policy Benefit While Living'}
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {isEs 
                                ? 'Las pólizas modernas de IUL en Florida no solo pagan cuando usted fallece. Si sufre una condición médica grave, puede acelerar entre el 60% y el 90% del beneficio por fallecimiento directamente a su cuenta bancaria para cubrir costos médicos o personales:'
                                : 'Modern Florida IUL policies offer living benefit riders that allow you to accelerate 60% to 90% of your tax-free death benefit while still living if diagnosed with:'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div className="bg-white p-4 rounded-xl border border-amber-200">
                                <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Enfermedades Crónicas' : 'Chronic Illness'}</h3>
                                <p className="text-xs text-gray-600">{isEs ? 'Incapacidad permanente para realizar 2 de las 6 actividades diarias (comer, bañarse, vestirse, etc.).' : 'Inability to perform 2 of 6 Activities of Daily Living without substantial assistance.'}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-amber-200">
                                <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Enfermedades Críticas' : 'Critical Illness'}</h3>
                                <p className="text-xs text-gray-600">{isEs ? 'Diagnóstico de Ataque Cardíaco, Cáncer Invasivo, Derrame Cerebral, Insuficiencia Renal o Trasplante.' : 'Diagnosis of Heart Attack, Invasive Cancer, Stroke, Kidney Failure, or Major Organ Transplant.'}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-amber-200">
                                <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Enfermedades Terminales' : 'Terminal Illness'}</h3>
                                <p className="text-xs text-gray-600">{isEs ? 'Expectativa de vida diagnosticada de 12 a 24 meses o menos.' : 'Medical diagnosis with life expectancy of 12 to 24 months or less.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive FAQ Section with Schema */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? 'Preguntas Frecuentes sobre IUL en Florida' : 'Frequently Asked Questions About Florida IUL'}
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
                    <div className="bg-primary text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="text-xl font-black font-heading text-accent">
                                {isEs ? '¿Desea ver una Ilustración de IUL según su edad y presupuesto?' : 'Ready to analyze a personalized IUL proposal for your age?'}
                            </h3>
                            <p className="text-sm text-gray-200">
                                {isEs 
                                    ? 'Diseñamos proyecciones con mínimo beneficio por fallecimiento y máxima acumulación en efectivo exento de impuestos.' 
                                    : 'We engineer maximum-funded, minimum-death-benefit policy designs tailored to your retirement timeline.'}
                            </p>
                        </div>
                        <button
                            onClick={onOpenQuote}
                            className="bg-accent text-primary hover:bg-[#FFB81C] text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all whitespace-nowrap shadow cursor-pointer"
                        >
                            {isEs ? 'Solicitar Ilustración IUL' : 'Request IUL Illustration'}
                        </button>
                    </div>

                </div>
            </section>

            {/* Internal Cross-Linking to Other Services */}
            <RelatedServices currentService="iul" language={language} />
        </div>
    );
};

