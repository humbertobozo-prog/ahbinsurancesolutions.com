import React, { useState } from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { RelatedServices } from './RelatedServices';

interface AnnuitiesPageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const AnnuitiesPage: React.FC<AnnuitiesPageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/anualidades-florida' : '/annuities-florida'}`;
    const enUrl = `${baseUrl}/annuities-florida`;
    const esUrl = `${baseUrl}/es/anualidades-florida`;

    const title = isEs 
        ? 'Anualidades en Florida 2026 | Fijas, MYGA e Indexadas (FIA)' 
        : 'Fixed & Indexed Annuities in Florida | MYGA & Retirement Income';

    const description = isEs 
        ? 'Guía completa de anualidades en Florida: fijas tradicionales, MYGA, indexadas (FIA) e inmediatas. Tasas garantizadas, plazos, liquidez y opciones de ingresos para su jubilación con AHB Insurance Solutions.' 
        : 'Comprehensive guide to Florida annuities: Traditional Fixed, MYGA, Fixed Indexed (FIA), and Immediate Annuities. Contractually guaranteed rates, terms, liquidity, and retirement income options.';

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = isEs ? [
        {
            q: "¿Cómo funciona la tasa de interés garantizada en una anualidad fija de Florida?",
            a: "Una anualidad fija o MYGA en Florida le permite bloquear una tasa de interés predeterminada por escrito con la aseguradora durante todo el plazo del contrato. Este rendimiento compuesto crece con diferimiento fiscal completo (sin impuestos anuales sobre la renta hasta el momento del retiro), protegiendo su principal de las fluctuaciones del mercado bursátil."
        },
        {
            q: "¿Qué significan el plazo (term) y el período de cargos por rescate (surrender period)?",
            a: "El plazo (term) es la duración contractual durante la cual se mantiene vigente la estructura de tasas (por ejemplo, 3, 5, 7 o 10 años). El período de cargos por rescate (surrender period) es el intervalo de tiempo en el que la aseguradora aplica cargos si retira fondos por encima de los límites anuales permitidos. Al concluir este período, el capital y las ganancias pueden retirarse o reinvertirse sin penalización de la compañía."
        },
        {
            q: "¿Qué opciones de liquidez ofrecen las anualidades MYGA e indexadas?",
            a: "La mayoría de los contratos modernos en Florida incluyen provisiones de liquidez anual libre de penalización, permitiéndole retirar habitualmente hasta un 10% del valor acumulado cada año tras el primer año de vigencia. Además, muchos contratos contemplan cláusulas de exención por atención en hogares de ancianos o enfermedades terminales."
        },
        {
            q: "¿Qué sucede al vencimiento del contrato y cómo funciona la renovación?",
            a: "Al finalizar el plazo inicial, se abre una ventana de gracia donde usted puede optar por retirar la totalidad de los fondos, realizar un intercambio 1035 libre de impuestos hacia una nueva anualidad con tasas actualizadas, o permitir que la póliza se renueve bajo las tasas vigentes de la aseguradora."
        },
        {
            q: "¿Cómo están respaldadas y garantizadas las anualidades por las aseguradoras y el estado?",
            a: "Las anualidades están respaldadas por las reservas estatutarias, la cartera de inversiones conservadoras y la solidez financiera (ratings de A.M. Best) de la compañía de seguros emisora, regulada por la Oficina de Regulación de Seguros de Florida (OIR). Asimismo, los residentes de Florida cuentan con la protección subsidiaria de la Asociación de Garantía de Seguros de Vida y Salud de Florida (FLAHIGA), conforme a los límites legales del estado."
        },
        {
            q: "¿Cuáles son las opciones de ingresos vitalicios (income options)?",
            a: "Usted puede estructurar sus ahorros para convertirlos en un flujo de ingresos predecible mediante una Anualidad Inmediata (SPIA) o agregando una cláusula de retiro vitalicio garantizado (GLWB / Income Rider). Estas opciones le aseguran pagos regulares de por vida que no puede sobrevivir, creando una pensión privada a su medida."
        }
    ] : [
        {
            q: "How does the guaranteed interest rate work in a Florida fixed annuity?",
            a: "A fixed annuity or MYGA allows you to lock in a contractually guaranteed interest rate with the issuing insurance carrier for the duration of your chosen term. This compounded yield accumulates 100% tax-deferred (with no annual 1099 taxes until withdrawal), shielding your principal from stock market volatility."
        },
        {
            q: "What is the difference between the contract term and the surrender period?",
            a: "The term is the contractual duration for which your rate structure applies (e.g., 3, 5, 7, or 10 years). The surrender period is the timeframe during which early withdrawal charges apply if you access funds above your penalty-free allowance. Once the surrender period expires, your funds are fully liquid and accessible without carrier penalties."
        },
        {
            q: "What liquidity provisions do MYGAs and Fixed Indexed Annuities offer?",
            a: "Most modern Florida annuity contracts feature penalty-free annual liquidity provisions—typically allowing you to withdraw up to 10% of the accumulated account value each year after year one without incurring surrender charges. Many contracts also include nursing home or terminal illness waiver riders."
        },
        {
            q: "What happens at maturity and how does contract renewal work?",
            a: "At the end of your initial term, a renewal window opens. You can elect to take a full lump-sum distribution, execute an IRS Section 1035 tax-free exchange into a new annuity contract with current market rates, or let the policy renew automatically under the carrier's then-current renewal rate."
        },
        {
            q: "How are insurer guarantees and state protections structured for Florida annuities?",
            a: "Annuities are backed by the statutory reserves, conservative general account investments, and claims-paying financial strength (such as A.M. Best ratings) of the issuing life insurance carrier, supervised by the Florida Office of Insurance Regulation (OIR). Additionally, eligible Florida policyholders receive secondary backing from the Florida Life and Health Insurance Guaranty Association (FLAHIGA) up to statutory limits."
        },
        {
            q: "What lifetime income options are available for retirement cash flow?",
            a: "You can convert accumulated savings into a dependable income stream using a Single Premium Immediate Annuity (SPIA) or by attaching a Guaranteed Lifetime Withdrawal Benefit (GLWB) rider. These income options provide reliable cash flow for life that you cannot outlive, establishing a personal private pension."
        }
    ];

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": ["Service", "FinancialProduct"],
        "name": isEs ? "Asesoría en Anualidades y Jubilación en Florida" : "Florida Annuities & Guaranteed Retirement Solutions",
        "serviceType": "Annuity Planning & Retirement Financial Products",
        "category": "RetirementPlanning",
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
            "jobTitle": "Licensed Florida Insurance & Annuity Broker",
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
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": isEs ? "Ilustraciones personalizadas de anualidades y comparativa de tasas" : "Free customized annuity illustrations and multi-carrier rate comparisons",
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
                "name": isEs ? "Anualidades en Florida" : "Florida Annuities",
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
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                            {isEs ? 'Inicio' : 'Home'}
                        </a>
                        <span>/</span>
                        <span className="text-primary font-bold">
                            {isEs ? 'Anualidades en Florida' : 'Florida Annuities'}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
                        {isEs ? 'Broker Independiente NPN 21228432' : 'Independent Broker NPN 21228432'}
                    </span>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
                            {isEs ? 'Planificación de Jubilación en Florida | Protección de Capital' : 'Florida Retirement Planning | Capital Preservation'}
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-5 leading-tight">
                            {isEs 
                                ? 'Anualidades en Florida: Fijas, MYGA e Indexadas' 
                                : 'Florida Fixed Annuities & MYGA Options'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Guía experta de anualidades en Florida (fixed annuity Florida, MYGA Florida, retirement income Florida). Compare tasas de interés garantizadas, plazos, liquidez y opciones de ingresos para proteger sus ahorros de jubilación.'
                                : 'Expert guide to Florida annuities (fixed annuity Florida, MYGA Florida, retirement income Florida, fixed indexed annuity Florida). Compare guaranteed rates, terms, liquidity provisions, and lifetime income solutions across top-rated carriers.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onOpenQuote}
                                className="bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                            >
                                {isEs ? 'Solicitar Mi Revisión de Ingresos de Jubilación ➔' : 'Request My Retirement Income Review ➔'}
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

                    {/* SECTION 1: FIXED ANNUITY & MYGA OPTIONS */}
                    <section id="fixed-annuities" className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Opciones de Anualidades Fijas y MYGA' : 'Fixed Annuity & MYGA Options'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '1. Anualidades Fijas y MYGA en Florida: Fundamentos y Mecánica' : '1. Florida Fixed Annuity & MYGA Options: Core Mechanics'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Las anualidades fijas y las anualidades con garantía multianual (MYGA) son contratos emitidos por aseguradoras de vida altamente solventes para salvaguardar el capital de los jubilados en Florida. A diferencia de los instrumentos bursátiles volátiles, una anualidad fija permite estructurar un crecimiento compuesto con diferimiento fiscal completo y total predictibilidad financiera.' 
                                : 'Fixed annuities and Multi-Year Guarantee Annuities (MYGAs) are contracts issued by top-rated life insurance carriers to safeguard retiree capital across Florida (fixed annuity Florida, MYGA Florida). Unlike volatile equity portfolios, a fixed annuity establishes reliable, compounding growth with complete tax deferral and predictable contractual backing.'}
                        </p>
                        
                        {/* 7 Core Elements Explained in Depth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            
                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-black text-primary text-base flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
                                    <span>{isEs ? 'Tasa Garantizada (Guaranteed Rate)' : 'Guaranteed Rate'}</span>
                                </h3>
                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                    {isEs 
                                        ? 'La tasa de interés se fija por escrito desde el día de la emisión. El rendimiento pactado se acumula de forma compuesta sin estar sujeto a reducciones unilaterales por parte de la aseguradora durante el plazo acordado.' 
                                        : 'The interest rate is locked in writing on the contract issue date. Your agreed yield compounds steadily and cannot be unilaterally adjusted downward by the carrier during the committed term.'}
                                </p>
                            </div>

                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-black text-primary text-base flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
                                    <span>{isEs ? 'Plazo del Contrato (Term)' : 'Contract Term'}</span>
                                </h3>
                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                    {isEs 
                                        ? 'Los plazos de compromiso varían comúnmente entre 3, 5, 7 y 10 años. Seleccionar el plazo adecuado depende de su horizonte temporal de inversión, necesidades de liquidez futura y objetivos de jubilación.' 
                                        : 'Commitment terms typically range from 3, 5, 7, to 10 years. Selecting the appropriate term length aligns directly with your personal time horizon, upcoming liquidity needs, and retirement milestones.'}
                                </p>
                            </div>

                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-black text-primary text-base flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">3</span>
                                    <span>{isEs ? 'Período de Cargos por Rescate (Surrender Period)' : 'Surrender Period'}</span>
                                </h3>
                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                    {isEs 
                                        ? 'Es el intervalo cronológico en el cual la aseguradora aplica cargos por retiro anticipado si se rescata la póliza por encima de las provisiones libres permitidas. Al expirar este período, el contrato queda libre de cargos por rescate.' 
                                        : 'This is the specific window during which carrier surrender charges apply if funds are withdrawn beyond penalty-free allowances. Once the surrender period lapses, the contract becomes fully liquid with zero carrier fees.'}
                                </p>
                            </div>

                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-black text-primary text-base flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">4</span>
                                    <span>{isEs ? 'Liquidez Anual (Liquidity Provisions)' : 'Liquidity Provisions'}</span>
                                </h3>
                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                    {isEs 
                                        ? 'Para brindar flexibilidad, la mayoría de los contratos en Florida permiten retiros anuales libres de penalización (típicamente hasta un 10% del valor acumulado de la cuenta a partir del segundo año).' 
                                        : 'To ensure financial flexibility, most modern Florida contracts feature penalty-free withdrawal provisions—frequently allowing up to 10% of the accumulated account value to be withdrawn annually after year one.'}
                                </p>
                            </div>

                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-black text-primary text-base flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">5</span>
                                    <span>{isEs ? 'Renovación y Vencimiento (Renewal Options)' : 'Renewal & Maturity Options'}</span>
                                </h3>
                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                    {isEs 
                                        ? 'Al finalizar el plazo inicial, se abre una ventana de renovación. Usted puede retirar el capital, transferirlo mediante un intercambio 1035 del IRS a otra anualidad o renovar bajo las tasas vigentes.' 
                                        : 'Upon contract maturity, a renewal window opens. You can elect to withdraw funds, execute an IRS Section 1035 tax-free exchange into a new carrier contract, or renew under current prevailing rates.'}
                                </p>
                            </div>

                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-black text-primary text-base flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">6</span>
                                    <span>{isEs ? 'Respaldo de la Aseguradora (Insurer Guarantees & FLAHIGA)' : 'Insurer Guarantees & FLAHIGA Support'}</span>
                                </h3>
                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                    {isEs 
                                        ? 'Los contratos están respaldados por las reservas estatutarias y calificaciones financieras (A.M. Best) de la aseguradora, con el respaldo adicional de la Asociación de Garantía de Florida (FLAHIGA).' 
                                        : 'Contracts are backed by the statutory reserves and financial strength ratings (A.M. Best A/A+) of issuing life insurers, with secondary safety backed by the Florida Life & Health Insurance Guaranty Association (FLAHIGA).'}
                                </p>
                            </div>

                        </div>

                        {/* 7th Element: Income Options */}
                        <div className="p-6 bg-primary text-white rounded-2xl space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs">7</span>
                                <h3 className="font-black text-accent text-lg">
                                    {isEs ? 'Opciones de Ingresos Vitalicios (Income Options & GLWB)' : 'Income Options & Lifetime Payouts'}
                                </h3>
                            </div>
                            <p className="text-gray-200 text-sm leading-relaxed">
                                {isEs 
                                    ? 'Las anualidades permiten convertir el capital acumulado en un flujo constante de ingresos para la jubilación (retirement income Florida). Mediante anualidades inmediatas (SPIA) o cláusulas de retiro vitalicio garantizado (GLWB), usted obtiene pagos periódicos seguros de por vida que eliminan el riesgo de longevidad.' 
                                    : 'Annuities can transform accumulated savings into dependable retirement income (retirement income Florida). Through Single Premium Immediate Annuities (SPIAs) or Guaranteed Lifetime Withdrawal Benefit (GLWB) riders, you establish reliable lifetime cash flow that safeguards against longevity risk.'}
                            </p>
                        </div>
                    </section>

                    {/* SECTION 2: FIXED INDEXED ANNUITIES (FIA) */}
                    <section id="fixed-indexed-annuities" className="border-2 border-primary/20 bg-blue-50/40 rounded-2xl p-6 md:p-8 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-secondary text-white text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Crecimiento con Piso de Protección' : 'Index-Linked Growth with Floor'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '2. Anualidades Indexadas Fijas en Florida (Fixed Indexed Annuities - FIA)' : '2. Fixed Indexed Annuities (FIA) in Florida'}
                        </h2>
                        <div className="bg-white p-4 rounded-xl border border-blue-200 text-xs md:text-sm text-blue-950 font-medium leading-relaxed">
                            {isEs 
                                ? 'Nota de Diferenciación: Las Anualidades Indexadas Fijas (fixed indexed annuity Florida) vinculan el potencial de ganancias al rendimiento de un índice bursátil externo (como el S&P 500) a través de topes o tasas de participación, manteniendo un piso contractual del 0% contra las caídas del mercado.' 
                                : 'Important Distinction: Fixed Indexed Annuities (fixed indexed annuity Florida) link interest crediting potential to an external financial benchmark (such as the S&P 500) via caps or participation rates, while maintaining a contractual 0% floor against market downturns.'}
                        </div>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? '¿Cómo funciona una FIA? Su principal se mantiene protegido dentro de las reservas de la aseguradora. Si el índice de referencia experimenta ganancias en el ciclo anual, usted recibe un crédito de interés. Si el índice cae en terreno negativo, se aplica el piso del 0%: su cuenta recibe 0% de rendimiento pero su saldo principal y ganancias previas bloqueadas permanecen intactos.' 
                                : 'How an FIA operates: Your principal is shielded within the insurer general account. If the benchmark index logs positive gains during a crediting cycle, you receive an interest credit. If the index drops into negative territory, the 0% floor engages: your account receives zero interest for that period, but your principal and prior locked-in gains remain completely secure.'}
                        </p>
                    </section>

                    {/* SECTION 3: ANNUITY VS CD COMPARISON */}
                    <section id="annuity-vs-cd" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Análisis Comparativo' : 'Head-to-Head Comparison'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '3. Comparativa: Anualidad MYGA vs. Certificado de Depósito Bancario (CD)' : '3. Comparative Analysis: MYGA Annuity vs. Bank Certificate of Deposit (CD)'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Aunque tanto las MYGA como los CD bancarios ofrecen seguridad de capital, sus ventajas fiscales, normativas y de liquidez son muy diferentes para los jubilados en Florida:' 
                                : 'While both MYGAs and bank CDs offer principal safety, their tax treatment, regulatory backing, and liquidity mechanics differ significantly for Florida retirees:'}
                        </p>
                        
                        <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-xs">
                            <table className="w-full text-left text-xs md:text-sm">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="p-3.5 md:p-4 font-bold">{isEs ? 'Característica' : 'Feature'}</th>
                                        <th className="p-3.5 md:p-4 font-bold bg-secondary">{isEs ? 'Anualidad Fija / MYGA' : 'Fixed Annuity / MYGA'}</th>
                                        <th className="p-3.5 md:p-4 font-bold">{isEs ? 'Certificado de Depósito (CD Bancario)' : 'Bank Certificate of Deposit (CD)'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Tratamiento Fiscal de Intereses' : 'Tax Treatment on Earnings'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Diferimiento fiscal del 100% (No 1099 anual)' : '100% Tax-Deferred (No annual 1099-INT)'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Tributable cada año con Formulario 1099-INT' : 'Taxed annually as ordinary income via 1099-INT'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Entidad Emisora y Respaldo' : 'Issuing Institution & Backing'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Aseguradoras de Vida + FLAHIGA estatal' : 'Life Insurers + State FLAHIGA'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Bancos Comerciales asegurados por FDIC ($250k)' : 'FDIC-insured commercial banks up to $250k'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Liquidez Anual' : 'Annual Liquidity Provision'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Típicamente hasta 10% anual libre de penalidad' : 'Typically up to 10% annual penalty-free'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Penalidad de meses de interés por retiro anticipado' : 'Severe interest penalty for early withdrawal'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Opciones de Ingreso Vitalicio' : 'Lifetime Income Conversion'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Disponible mediante cláusulas de ingreso vitalicio' : 'Available with lifetime income riders'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'No disponible (Solo reinversión o retiro)' : 'Not available (Simple principal return)'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Traspaso a Herederos (Probate)' : 'Probate Court Avoidance'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Evita sucesión judicial; pago directo a beneficiario' : 'Bypasses probate; direct beneficiary payout'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Sujeto a corte de sucesión si no tiene POD registrado' : 'May require probate if POD designation lapses'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* SECTION 4: BROKER ADVICE WITH ANDRES BOZO */}
                    <section id="andres-bozo" className="bg-white border-2 border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xs">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 border-4 border-accent flex items-center justify-center text-3xl font-black text-primary shrink-0">
                            AB
                        </div>
                        <div className="space-y-2 text-center md:text-left">
                            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                                {isEs ? 'Asesoría Independiente en Florida' : 'Independent Florida Broker Advocacy'}
                            </span>
                            <h3 className="text-xl md:text-2xl font-black font-heading text-primary">
                                Andrés H. Bozo (NPN: 21228432)
                            </h3>
                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                {isEs 
                                    ? 'Como corredor independiente con licencia en Florida, comparo contratos de anualidades en múltiples aseguradoras de máxima calificación (Allianz, Athene, Corebridge, Lincoln, Pacific Life y SILAC). Le ayudo a evaluar tasas garantizadas, plazos y opciones de ingresos para diseñar la estrategia de retiro ideal.' 
                                    : 'As an independent licensed Florida broker, I analyze annuity contracts across top-rated carriers (Allianz, Athene, Corebridge, Lincoln, Pacific Life, and SILAC). I help you evaluate guaranteed rates, terms, and income options to craft your optimal retirement strategy.'}
                            </p>
                            <p className="text-xs font-semibold text-primary pt-1">
                                {isEs ? '📍 Sede en Gainesville, Florida | Servicio a residentes en todo el estado' : '📍 Based in Gainesville, FL | Serving clients across all Florida counties'}
                            </p>
                        </div>
                    </section>

                    {/* SECTION 5: ANNUITY FAQ */}
                    <section id="faq">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? 'Preguntas Frecuentes sobre Anualidades en Florida' : 'Frequently Asked Questions About Florida Annuities'}
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

                    {/* SECTION 6: CTA / ILLUSTRATION REQUEST */}
                    <section id="cta" className="bg-primary text-white rounded-2xl p-6 md:p-10 text-center space-y-6 shadow-xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                            {isEs ? 'Ilustración y Análisis Gratuito' : 'Free Customized Illustration'}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black font-heading max-w-2xl mx-auto leading-tight">
                            {isEs 
                                ? 'Descubra las Mejores Tasas Garantizadas para su Jubilación en Florida' 
                                : 'Explore Guaranteed Rates & Retirement Income Options in Florida'}
                        </h2>
                        <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
                            {isEs 
                                ? 'Solicite una comparativa detallada de tasas de interés contractuales, plazos y opciones de ingresos de por vida de las principales aseguradoras.' 
                                : 'Request a comprehensive rate comparison and customized retirement income strategy across top-rated carriers in Florida.'}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <button
                                onClick={onOpenQuote}
                                className="w-full sm:w-auto bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer"
                            >
                                {isEs ? 'Solicitar Mi Revisión de Ingresos de Jubilación' : 'Request My Retirement Income Review'}
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
            <RelatedServices currentService="iul-retirement" language={language} />
        </div>
    );
};
