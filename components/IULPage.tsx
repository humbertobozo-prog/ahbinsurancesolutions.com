import React, { useState } from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { RelatedServices } from './RelatedServices';
import { InfoTooltip } from './InfoTooltip';

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
        ? 'Aprenda cómo el IUL protege su capital con piso del 0% contra caídas del mercado y permite estrategias de préstamos para el retiro con ventajas fiscales según el Código IRS 7702.' 
        : 'Discover how Indexed Universal Life (IUL) protects wealth with a 0% market downside floor and tax-advantaged retirement policy loans under IRS Section 7702 in Florida.';

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = isEs ? [
        {
            q: "¿Cómo funciona la garantía de piso del 0% en un seguro IUL?",
            a: "En una póliza IUL, su dinero en efectivo no está invertido directamente en la bolsa de valores. En su lugar, el rendimiento se acredita en función de un índice (como el S&P 500). Si el índice cae un 20% o 30% durante un colapso financiero, la cláusula de piso del 0% garantiza que su saldo en efectivo no pierde ni un solo dólar por fluctuaciones del mercado."
        },
        {
            q: "¿Los préstamos para el retiro de una póliza IUL son dinero libre de impuestos garantizado?",
            a: "No. Un préstamo sobre la póliza (policy loan) no es dinero gratuito ni libre de impuestos de forma incondicional. Bajo los Códigos IRS 7702 y 72(e), los retiros hasta la base de costo (primas pagadas) y los préstamos tomados contra el valor en efectivo no se consideran ingresos imponibles mientras la póliza permanezca activa y en vigor. Sin embargo, si la póliza caduca (lapse), se entrega o se cancela con un préstamo pendiente superior a la base de primas pagadas, el monto adeudado en exceso se convierte de inmediato en ingreso ordinario gravable. Por ello, una estrategia de IUL requiere monitoreo periódico y un diseño prudente con cláusulas de protección contra sobrepréstamos."
        },
        {
            q: "¿Qué son los Beneficios en Vida (Living Benefits) incluidos en una póliza IUL?",
            a: "Los Beneficios en Vida le permiten adelantar un porcentaje sustancial (hasta un 80% o 90%) del beneficio por fallecimiento mientras está vivo si se le diagnostica una enfermedad grave, crónica (incapacidad para realizar 2 de 6 actividades diarias) o terminal (Cáncer, Infarto, ACV, ALS), sin restricciones en cómo gasta el dinero."
        },
        {
            q: "¿En qué se diferencia un IUL de una cuenta 401(k) o IRA Tradicional respecto a impuestos y penalidades?",
            a: "En un 401(k) o IRA Tradicional, las contribuciones son antes de impuestos, pero el 100% de los retiros futuros tributa como ingreso ordinario, además de sufrir una penalidad del 10% del IRS si se retira antes de los 59 años y medio (salvo excepciones) y Distribuciones Mínimas Requeridas (RMDs) obligatorias a los 73/75 años. En un IUL no-MEC, los préstamos sobre la póliza no tienen penalidad por edad del 10% y no existen RMDs obligatorias. No obstante, a diferencia de un 401(k), los préstamos de un IUL acumulan intereses y reducen el valor neto; si no se administran para cubrir los costos internos crecientes del seguro, la póliza puede caducar y generar consecuencias fiscales."
        },
        {
            q: "¿Qué es un Contrato de Dotación Modificada (MEC) y cómo se evita?",
            a: "Un MEC ocurre si deposita demasiado dinero en efectivo en la póliza demasiado rápido en relación con el beneficio por fallecimiento, violando la prueba de 7 pagos ('7-pay test') del IRS. En un contrato MEC, los retiros y préstamos pierden su ventaja fiscal, tributando primero sobre ganancias como ingreso ordinario y con penalidad del 10% antes de los 59½ años. Estructuramos profesionalmente su IUL para maximizar la acumulación de efectivo manteniendo la póliza estrictamente no-MEC."
        }
    ] : [
        {
            q: "How does the 0% downside market floor work in an IUL policy?",
            a: "With Indexed Universal Life, your cash value is not invested directly in equity markets. Instead, your interest crediting is linked to an index like the S&P 500. When the market plunges 20% or 30%, the 0% floor guarantees your principal cash value receives 0% loss—protecting your accumulated wealth from market crashes."
        },
        {
            q: "Are retirement policy loans from an IUL guaranteed tax-free money?",
            a: "No. A policy loan is not guaranteed free money. Under IRS Tax Code 7702 and Section 72(e), cash value withdrawals up to cost basis and collateralized policy loans are not treated as taxable gross income as long as the policy remains active and in force. However, if the policy lapses, is surrendered, or terminates before death with an outstanding loan balance exceeding the total premiums paid, that unpaid loan balance becomes immediately taxable as ordinary income in that tax year. Maintaining tax advantages requires disciplined policy management, sufficient cash reserves, and overloan protection riders."
        },
        {
            q: "What are Living Benefits (Accelerated Death Benefit Riders) in an IUL?",
            a: "Living Benefits allow you to accelerate up to 80%-90% of your policy's death benefit while living if diagnosed with a qualifying critical illness (heart attack, stroke, invasive cancer) or chronic condition (inability to perform 2 of 6 Activities of Daily Living). Funds can pay for experimental medical treatments, mortgage, or long-term care."
        },
        {
            q: "How does an IUL compare to a Traditional 401(k) or Traditional IRA regarding taxes and penalties?",
            a: "A Traditional 401(k) or IRA defers taxes on contributions, but 100% of future withdrawals are taxed as ordinary income, alongside a 10% IRS early withdrawal penalty prior to age 59½ and mandatory Required Minimum Distributions (RMDs) at age 73/75. In a properly structured non-MEC IUL, policy loans are not subject to the statutory 10% early withdrawal age penalty, and there are no mandatory RMDs. However, unlike a 401(k), policy loans accrue interest and represent debt against your policy. If not actively managed against rising Cost of Insurance charges, an overleveraged loan can cause policy lapse and trigger severe income tax consequences."
        },
        {
            q: "What is a Modified Endowment Contract (MEC) and how do you prevent it?",
            a: "A policy becomes a MEC if funded with excessive cash relative to the death benefit under the IRS 7-pay test, causing distributions to lose tax-advantaged status and subjecting loans to ordinary income tax plus a 10% penalty before age 59½. We engineer custom maximum-funded, minimum-death-benefit IUL designs to prevent MEC status and optimize cash growth."
        }
    ];

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": ["Service", "FinancialProduct"],
        "name": isEs ? "Vida Universal Indexada (IUL) y Estrategias de Retiro en Florida" : "Indexed Universal Life (IUL) & Retirement Strategy Planning in Florida",
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
            "audienceType": isEs ? "Personas y familias que buscan crecimiento financiero con ventajas fiscales y protección de vida en Florida" : "Individuals and families seeking tax-advantaged growth and living benefits in Florida"
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
                        "name": isEs ? "Estrategias de Préstamos para el Retiro con Ventajas Fiscales (Código IRS 7702)" : "Tax-Advantaged Retirement Policy Loan Strategies (IRS Code 7702)"
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
                    <span className="text-primary font-bold">{isEs ? 'Vida Universal Indexada (IUL)' : 'Indexed Universal Life (IUL)'}</span>
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
                            {isEs ? (
                                <>
                                    Combine potencial de crecimiento ligado a índices como el S&P 500, protección garantizada con piso del 0% contra caídas de mercado y estrategias de préstamos sobre póliza con ventajas fiscales para el retiro
                                    <InfoTooltip 
                                        text="El estatus libre de impuestos se basa en retiros de base y préstamos sobre póliza bajo el Código IRS 7702. Depende del mantenimiento y fondeo continuo de la póliza para evitar lapsos y cargos tributarios imprevistos." 
                                        label="Aviso sobre ventajas fiscales y mantenimiento de la póliza"
                                    />
                                    {' '}(sujeto a la adecuada estructura, fondeo y mantenimiento del contrato).
                                </>
                            ) : (
                                <>
                                    Participate in index gains tied to the S&P 500, backed by a guaranteed 0% market downside floor and tax-free retirement policy loan strategies
                                    <InfoTooltip 
                                        text="Tax-free status is achieved via policy loans and withdrawals under IRS Code 7702. It requires ongoing policy maintenance, adequate funding to cover rising insurance charges (COI), and preventing policy lapse so unpaid loans do not become taxable ordinary income." 
                                        label="Tax-advantaged retirement notice"
                                    />
                                    {' '}(subject to proper funding, structure, and ongoing policy maintenance).
                                </>
                            )}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onOpenQuote}
                                className="bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                            >
                                {isEs ? 'Solicitar una Revisión de IUL ➔' : 'Request an IUL Review ➔'}
                            </button>
                            <a
                                href="tel:+13522258389"
                                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl border border-white/20 transition-all text-center flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                                {isEs ? 'Hablar con Andrés (+1 352-225-8389)' : 'Talk With Andres (+1 352-225-8389)'}
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
                                <h3 className="font-bold text-primary mb-2 text-base">{isEs ? 'Crecimiento con Impuestos Diferidos' : 'Tax-Deferred Accumulation'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'El crecimiento del valor en efectivo acumula intereses con impuestos diferidos bajo la Sección 7702 del IRS, lo que permite capitalizar sin impuestos anuales por plusvalías.' 
                                        : 'Cash value accumulates on a tax-deferred basis under IRS Section 7702, allowing interest to compound without yearly capital gains tax friction.'}
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
                                        <td className="p-3.5 font-bold">{isEs ? 'Tratamiento Fiscal de Retiros / Préstamos' : 'Taxation on Withdrawals / Loans'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">
                                            <span className="inline-flex items-center flex-wrap">
                                                <span>
                                                    {isEs 
                                                        ? 'Retiros hasta la base y préstamos exentos de impuestos mientras la póliza siga en vigor (no MEC)' 
                                                        : 'Withdrawals to basis tax-free; loans income-tax-free while policy remains in force (non-MEC)'}
                                                </span>
                                                <InfoTooltip 
                                                    text={isEs 
                                                        ? 'Los préstamos sobre póliza están exentos de impuestos mientras la póliza esté activa. Requiere fondeo adecuado para evitar un lapse con préstamos pendientes.' 
                                                        : 'Policy loans are tax-free under IRC 7702 while the policy remains active. Tax-free status depends on ongoing policy maintenance and sufficient funding to prevent lapse.'}
                                                    label={isEs ? 'Detalles de exención tributaria y mantenimiento' : 'Tax-free loan policy maintenance details'}
                                                />
                                            </span>
                                        </td>
                                        <td className="p-3.5 text-amber-700 font-bold">Tributa como Ingreso Ordinario</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">100% Libre de Impuestos (tras 5 años)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Protección contra Caídas Bursátiles' : 'Market Downside Protection'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Garantía del 0% (Sin Pérdida)</td>
                                        <td className="p-3.5 text-red-600">Sin Protección (Riesgo Total)</td>
                                        <td className="p-3.5 text-red-600">Sin Protección (Riesgo Total)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Límite Anual de Contribución' : 'Annual Contribution Limits'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Sin Límite Estatutario IRS (Sujeto a diseño)</td>
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
                                        <td className="p-3.5 font-bold">{isEs ? 'Acceso Antes de los 59.5 Años' : 'Access Before Age 59½'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">
                                            {isEs 
                                                ? 'Sin penalidad del 10% del IRS en préstamos de pólizas no-MEC (requiere gestión activa para evitar lapse)*' 
                                                : 'No 10% IRS penalty on non-MEC policy loans (requires ongoing management to prevent lapse)*'}
                                        </td>
                                        <td className="p-3.5 text-red-600">Penalidad del 10% del IRS (salvo excepción)</td>
                                        <td className="p-3.5 text-amber-700 font-bold">Solo aportes directos sin penalidad</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Protección Familiar (Fallecimiento)' : 'Death Benefit Protection'}</td>
                                        <td className="p-3.5 text-emerald-700 font-bold">Beneficio por Fallecimiento Exento de Impuestos</td>
                                        <td className="p-3.5 text-gray-600">No Incluye Seguro de Vida</td>
                                        <td className="p-3.5 text-gray-600">No Incluye Seguro de Vida</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-4 italic">
                            {isEs 
                                ? '*Nota importante de compliance: Los préstamos sobre póliza reducen el valor neto y el beneficio por fallecimiento, y acumulan intereses. Si la póliza caduca con préstamos pendientes que superen las primas pagadas, el saldo en exceso se vuelve gravable como ingreso ordinario.' 
                                : '*Important compliance note: Policy loans reduce net cash value and death benefit, and accrue interest. If a policy lapses with outstanding loans exceeding the cumulative premiums paid, the excess loan balance becomes taxable ordinary income.'}
                        </p>
                    </div>

                    {/* Critical Compliance Callout: Policy Loan ≠ Guaranteed Tax-Free Money */}
                    <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-amber-600 text-white font-black text-xs uppercase px-3 py-1 rounded-full inline-block">
                                {isEs ? 'Educación Financiera y Compliance' : 'Financial Education & Compliance'}
                            </span>
                            <span className="text-xs font-bold text-amber-900">
                                {isEs ? 'Transparencia Normativa para Residentes de Florida' : 'Regulatory Transparency for Florida Families'}
                            </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black font-heading text-primary">
                            {isEs 
                                ? 'Préstamo sobre Póliza (Policy Loan) ≠ Dinero Libre de Impuestos Garantizado' 
                                : 'Policy Loan ≠ Guaranteed Tax-Free Money: Understanding Potential Tax Consequences'}
                        </h2>
                        <p className="text-sm text-gray-800 leading-relaxed font-medium">
                            {isEs
                                ? 'En el mercado de seguros, a menudo se presenta el IUL con promesas comerciales de "ingresos de jubilación 100% libres de impuestos". Aunque los préstamos sobre la póliza son una estrategia legítima respaldada por el Código IRS 7702, NO deben considerarse una garantía universal ni dinero regalado. Para mantener su tratamiento favorable y evitar consecuencias tributarias severas, es imperativo entender cómo funcionan:'
                                : 'In the marketplace, IUL is frequently marketed with claims of unconditional "tax-free retirement income." While policy loans represent a legitimate, statutory mechanism under IRS Code Section 7702, a policy loan is NOT guaranteed free money. Responsible financial planning requires understanding the conditions, interest mechanics, and potential tax liabilities:'}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="bg-white p-5 rounded-xl border border-amber-200 space-y-2">
                                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                                    <span className="text-lg">⚠️</span>
                                    <h3>{isEs ? 'Riesgo de Caducidad y Consecuencia Fiscal (Lapse Risk)' : 'Policy Lapse & Phantom Tax Liability'}</h3>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed">
                                    {isEs
                                        ? 'Si una póliza con préstamos pendientes caduca (lapse), se cancela o se entrega (surrender) en vida del asegurado, cualquier monto de préstamo que exceda la base de costo (primas netas pagadas) se convierte automáticamente en INGRESO ORDINARIO GRAVABLE en ese año fiscal. Esto puede desencadenar una fuerte factura impositiva sin tener dinero en efectivo disponible para pagarla.'
                                        : 'If an IUL policy lapses or is surrendered during the insured\'s lifetime with an outstanding loan exceeding total premiums paid (cost basis), that excess loan balance becomes immediately TAXABLE AS ORDINARY INCOME. This can trigger a substantial "phantom tax" bill with zero liquid cash available to pay it.'}
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-amber-200 space-y-2">
                                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                                    <span className="text-lg">📈</span>
                                    <h3>{isEs ? 'Intereses del Préstamo y Costo del Seguro (COI)' : 'Loan Interest Accrual & Rising COI Charges'}</h3>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed">
                                    {isEs
                                        ? 'Los préstamos de póliza acumulan intereses contractuales. Si no se pagan de su bolsillo, los intereses se suman a la deuda principal, restando valor en efectivo y beneficio por fallecimiento. Conforme el asegurado envejece, el Costo de Seguro (COI) mensual aumenta; si el capital restante no cubre el COI y los intereses, la póliza corre riesgo de caducar.'
                                        : 'Policy loans accrue interest. Unpaid interest is capitalized into the loan balance, reducing net cash value and net death benefit. Meanwhile, internal monthly Cost of Insurance (COI) charges increase with age. If remaining cash value cannot support both loan interest and COI charges, the policy risks lapse.'}
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-amber-200 space-y-2">
                                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                                    <span className="text-lg">⚖️</span>
                                    <h3>{isEs ? 'Estatus de Contrato de Dotación Modificada (MEC)' : 'Modified Endowment Contract (MEC) Rules'}</h3>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed">
                                    {isEs
                                        ? 'Si se aportan primas por encima del límite de 7 pagos ("7-pay test") del IRS, la póliza se reclasifica como MEC. En un MEC, los préstamos tributan bajo la regla LIFO (ganancias primero como ingreso ordinario) y reciben una penalidad adicional del 10% del IRS si se retiran antes de los 59 años y medio.'
                                        : 'Paying premiums beyond the IRS 7-pay test reclassifies the contract as a MEC. In a MEC, all loans and withdrawals lose tax advantages, are taxed on a LIFO basis (earnings first as ordinary income), and trigger a 10% early withdrawal penalty if taken prior to age 59½.'}
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-amber-200 space-y-2">
                                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                                    <span className="text-lg">🛡️</span>
                                    <h3>{isEs ? 'Cómo Diseñamos Pólizas Responsables en AHB' : 'How AHB Protects Your Long-Term Strategy'}</h3>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed">
                                    {isEs
                                        ? 'Diseñamos contratos con Cláusula de Protección contra Sobrepréstamos (Overloan Protection Rider), simulamos proyecciones con tasas conservadoras (5.5% a 6.0% en vez de topes máximos inflados) y realizamos revisiones anuales para garantizar que su póliza mantenga un amortiguador de capital saludable.'
                                        : 'We incorporate Overloan Protection Riders to safeguard against unintended lapse, model projections using conservative crediting rates (5.5%–6.0% rather than inflated maximum caps), and conduct annual policy reviews to ensure sufficient cash reserves.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* IRS Code 7702 & 72(e) Tax Mechanics */}
                    <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-6 md:p-8 space-y-4">
                        <span className="bg-primary text-white font-black text-xs uppercase px-3 py-1 rounded-full inline-block">
                            {isEs ? 'Sustento Legal IRS Sección 7702 y 72(e)' : 'IRS Code 7702 & 72(e) Legal Framework'}
                        </span>
                        <h2 className="text-2xl font-black font-heading text-primary">
                            {isEs ? 'Mecanismo Legal de los Préstamos con Ventajas Fiscales' : 'The Tax Mechanics Behind IUL Policy Loans'}
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {isEs 
                                ? 'El tratamiento fiscal favorable del IUL se basa en leyes tributarias federales vigentes aprobadas por el Congreso de EE.UU. En lugar de realizar "retiros" que tributan como ganancias de capital, el propietario de la póliza solicita préstamos colateralizados sobre el valor acumulado:'
                                : 'The tax advantages of an IUL are established under federal tax statutes enacted by the U.S. Congress. Rather than taking taxable capital gains distributions, policyholders request collateralized policy loans:'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="bg-white p-5 rounded-xl border border-blue-200">
                                <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Sección 7702 del Código del IRS' : 'IRS Code Section 7702'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Define la prueba del valor en efectivo en contratos de seguro de vida, eximiendo del impuesto a la renta el crecimiento del capital y garantizando el desembolso por fallecimiento libre de impuestos para los beneficiarios.' 
                                        : 'Defines life insurance contracts under federal tax law, granting tax-deferred cash accumulation and income-tax-free death benefit distributions.'}
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-blue-200">
                                <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Diseño de Máxima Financiación Anti-MEC' : 'Maximum-Funded Anti-MEC Design'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Sometemos la póliza a la prueba del "7-Pay Test" del IRS para evitar el estatus MEC, preservando el acceso a préstamos sin penalidad por edad y con ventajas fiscales mientras la póliza permanezca en vigor.' 
                                        : 'We engineer policies under the IRS 7-pay test to prevent MEC classification, preserving tax-advantaged, penalty-free policy loan access while the contract remains in force.'}
                                </p>
                            </div>
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
                                    ? 'Diseñamos proyecciones con mínimo beneficio por fallecimiento y máxima acumulación en efectivo con ventajas fiscales.' 
                                    : 'We engineer maximum-funded, minimum-death-benefit policy designs tailored to your retirement timeline.'}
                            </p>
                        </div>
                        <button
                            onClick={onOpenQuote}
                            className="bg-accent text-primary hover:bg-[#FFB81C] text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all whitespace-nowrap shadow cursor-pointer"
                        >
                            {isEs ? 'Solicitar una Revisión de IUL' : 'Request an IUL Review'}
                        </button>
                    </div>

                    {/* Financial/Regulatory Compliance Disclaimer */}
                    <div className="mt-8 p-5 bg-gray-50 border border-gray-300 rounded-xl text-[11px] text-gray-600 leading-relaxed text-justify space-y-2">
                        <p><strong>{isEs ? "Aviso Legal y de Cumplimiento Financiero (IRC § 7702 & § 72):" : "Financial & Regulatory Compliance Disclosure (IRC § 7702 & § 72):"}</strong></p>
                        <p>
                            {isEs
                                ? "La Vida Universal Indexada (IUL) es una póliza de seguro de vida permanente sujeta a costos de mortalidad y administración, no un instrumento de inversión bursátil directo ni un plan de ahorro garantizado. Un préstamo sobre la póliza (policy loan) NO equivale a dinero libre de impuestos garantizado. Si bien los retiros hasta la base de costos y los préstamos sobre pólizas no-MEC no generan impuestos sobre la renta mientras la póliza permanezca vigente y activa, la existencia de préstamos pendientes acumula intereses y reduce tanto el valor de rescate en efectivo como el beneficio por fallecimiento. Si la póliza caduca (lapse), se entrega (surrender) o se liquida con un saldo de préstamo que supere las primas netas pagadas (cost basis), el monto adeudado en exceso se considerará de inmediato distribución imponible tributable como ingreso ordinario para el asegurado. Mantener la viabilidad fiscal requiere supervisión continua, primas suficientes para cubrir los cargos crecientes por costo de seguro (COI) y la inclusión de cláusulas de protección contra sobrepréstamos. AHB Insurance Solutions y sus agentes autorizados proporcionan orientación formativa e intermediación de seguros, no asesoría fiscal, contable o legal formal; consulte siempre a su CPA o asesor tributario certificado antes de ejecutar estrategias de distribución."
                                : "Indexed Universal Life (IUL) is a permanent life insurance policy subject to mortality and administrative charges, not an equity security or guaranteed savings vehicle. A policy loan DOES NOT equate to guaranteed tax-free money. While withdrawals up to basis and collateralized loans from a non-MEC policy are non-taxable distributions as long as the policy remains in force, outstanding loans accrue interest and diminish both net surrender value and death benefit. If a policy lapses, is surrendered, or terminates before the death of the insured with an outstanding loan balance that exceeds the cumulative premiums paid (cost basis), the entire excess loan amount becomes immediately recognized as taxable ordinary income in that tax year. Sustaining tax-advantaged income distributions requires ongoing policy stewardship, adequate premium funding to offset rising internal Cost of Insurance (COI) charges, and overloan protection riders. AHB Insurance Solutions and its licensed brokers provide insurance analysis and broker services, not formal tax or legal advice; always consult a certified CPA or tax attorney regarding your individual tax circumstances."}
                        </p>
                    </div>

                </div>
            </section>

            {/* Internal Cross-Linking to Other Services */}
            <RelatedServices currentService="iul" language={language} />
        </div>
    );
};

