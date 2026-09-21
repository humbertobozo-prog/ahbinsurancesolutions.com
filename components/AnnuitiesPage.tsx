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
        : 'Fixed & Indexed Annuities in Florida | Guaranteed Retirement Income';

    const description = isEs 
        ? 'Guía completa de anualidades en Florida: fijas tradicionales, MYGA, indexadas (FIA) e inmediatas. Conozca rendimientos garantizados y protección de capital para su jubilación.' 
        : 'Comprehensive Florida annuities guide: Traditional Fixed, MYGA, Fixed Indexed (FIA), and Immediate Annuities. Contractually guaranteed growth and retirement income.';

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = isEs ? [
        {
            q: "¿Cómo garantizan las anualidades fijas el crecimiento de mi dinero?",
            a: "Las anualidades fijas pueden brindar términos de interés contractualmente garantizados, sujetos a la solidez financiera de la aseguradora emisora y al contrato específico. A diferencia de las inversiones de renta variable, su capital principal no está expuesto directamente a caídas de bolsa, y los intereses crecen con diferimiento de impuestos hasta el momento de su retiro."
        },
        {
            q: "¿Cuál es la diferencia entre una Anualidad Fija y una Anualidad Indexada Fija (FIA)?",
            a: "Una Anualidad Fija tradicional ofrece una tasa de interés fija predeterminada (por ejemplo, 5% anual durante un período convenido). Una Anualidad Indexada Fija (FIA) vincula su potencial de rendimiento al desempeño de un índice de mercado externo (como el S&P 500) a través de topes (caps) o tasas de participación, pero incorpora un piso contractualmente garantizado del 0%. Esto significa que si el índice cae en un año negativo, su cuenta no pierde capital debido al descenso del mercado."
        },
        {
            q: "¿Qué es una MYGA (Multi-Year Guarantee Annuity)?",
            a: "Una MYGA es una anualidad fija con garantía multianual. Funciona de manera conceptual similar a un Certificado de Depósito (CD) bancario, pero es emitida por una aseguradora de vida y ofrece ventajas tributarias: usted bloquea una tasa de interés fija y garantizada durante un plazo determinado (usualmente de 3, 5, 7 o 10 años), y el crecimiento compuesto no paga impuestos sobre la renta anuales hasta que se retire el dinero."
        },
        {
            q: "¿Puedo retirar dinero de mi anualidad antes de que termine el contrato?",
            a: "La mayoría de los contratos de anualidades permiten retiros anuales libres de penalización (habitualmente hasta un 10% del valor acumulado por año tras el primer año de contrato). Retiros por encima de ese límite durante el período de penalidad (surrender period) están sujetos a cargos por rescate. Asimismo, retiros antes de los 59 años y medio pueden estar sujetos a una penalidad fiscal del 10% del IRS sobre las ganancias conforme al IRC §72(q)."
        },
        {
            q: "¿Qué sucede con mi dinero si fallezco antes de retirar la totalidad de la anualidad?",
            a: "A diferencia de una pensión tradicional que puede extinguirse al fallecer, el valor total remanente de su anualidad se transfiere directamente a sus beneficiarios designados, sin pasar por los retrasos ni los costos del proceso judicial de sucesión (probate) en Florida."
        },
        {
            q: "¿Están protegidas las anualidades en Florida?",
            a: "Sí. Las anualidades son contratos respaldados por la capacidad de pago y las reservas financieras de la compañía de seguros emisora, reguladas por la Oficina de Regulación de Seguros de Florida (OIR). Además, los residentes de Florida cuentan con la cobertura de la Asociación de Garantía de Seguros de Vida y Salud de Florida (FLAHIGA), sujeta a los límites legales del estado."
        }
    ] : [
        {
            q: "How do fixed annuities guarantee my retirement savings?",
            a: "Fixed annuities can provide contractually guaranteed interest terms, subject to the financial strength of the issuing insurer and the specific contract terms. Unlike direct stock market investments, your principal balance is shielded from negative market swings, and your compounded interest accumulates tax-deferred until distribution."
        },
        {
            q: "What is the key difference between a Fixed Annuity and a Fixed Indexed Annuity (FIA)?",
            a: "A Traditional Fixed Annuity credits a stated, predetermined fixed annual interest rate (e.g., 5% per year for a set term). A Fixed Indexed Annuity (FIA) links interest earning potential to an external financial benchmark (such as the S&P 500) using caps or participation rates, while incorporating a contractual 0% floor. If the underlying market index loses value during a contract period, your annuity account is protected from market loss."
        },
        {
            q: "What is a MYGA (Multi-Year Guarantee Annuity)?",
            a: "A MYGA is a Multi-Year Guarantee Annuity. It functions similarly in concept to a bank Certificate of Deposit (CD), but is issued by an insurance carrier with distinct tax advantages: you lock in an exact contractual interest rate for a chosen term (typically 3, 5, 7, or 10 years), and your compounded gains grow 100% tax-deferred until withdrawal."
        },
        {
            q: "Can I access my funds before the annuity contract term expires?",
            a: "Most modern annuity contracts feature penalty-free annual withdrawal provisions (typically 10% of the account value annually after year one). Withdrawals exceeding that allowance during the surrender charge period are subject to carrier surrender fees. Additionally, IRS rules impose a 10% premature tax penalty on earnings withdrawn prior to age 59½ under IRC §72(q)."
        },
        {
            q: "What happens to my annuity balance if I pass away?",
            a: "Unlike certain traditional corporate pension structures that terminate upon death, your annuity contract designates named beneficiaries. The full remaining accumulated value transfers directly to your beneficiaries, bypassing costly and time-consuming Florida probate court proceedings."
        },
        {
            q: "Are annuities protected in Florida?",
            a: "Yes. Annuities are backed by the financial strength, statutory reserves, and claims-paying ability of the issuing life insurance carrier, supervised by the Florida Office of Insurance Regulation (OIR). Additionally, eligible Florida policyholders have protection via the Florida Life and Health Insurance Guaranty Association (FLAHIGA), up to statutory limits."
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
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">
                        {isEs ? 'Anualidades en Florida' : 'Florida Annuities'}
                    </span>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
                            {isEs ? 'Planificación de Jubilación en Florida | Protección de Capital' : 'Florida Retirement Planning | Capital Preservation'}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black font-heading mb-5 leading-tight">
                            {isEs 
                                ? 'Anualidades en Florida: Fijas, MYGA e Indexadas' 
                                : 'Florida Fixed & Indexed Annuities'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Las anualidades fijas pueden brindar términos de interés contractualmente garantizados, sujetos a la solidez financiera de la aseguradora emisora y al contrato específico. Proteja sus ahorros de jubilación y genere ingresos predecibles.'
                                : 'Fixed annuities can provide contractually guaranteed interest terms, subject to the financial strength of the issuing insurer and the specific contract. Safeguard retirement savings while establishing predictable lifelong income.'}
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

                    {/* SECTION 1: FIXED ANNUITIES */}
                    <section id="fixed-annuities" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Seguridad Contractual' : 'Contractual Certainty'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '1. Anualidades Fijas Tradicionales (Fixed Annuities)' : '1. Traditional Fixed Annuities'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Una anualidad fija es un contrato emitido por una compañía de seguros de vida en el que el titular deposita una cantidad de capital y la aseguradora garantiza una tasa de rendimiento periódica establecida. Este tipo de producto está diseñado primordialmente para la preservación del capital y la obtención de rendimientos predecibles y estables.' 
                                : 'A traditional fixed annuity is a contract issued by a life insurance company where the policyholder deposits principal and the carrier guarantees a specified interest rate for a stated duration. This vehicle is primarily built for capital preservation and stable, predictable financial accumulation.'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary text-sm mb-1">{isEs ? 'Protección del Principal' : 'Principal Protection'}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Su balance depositado no fluctúa con las caídas del mercado de valores.' : 'Your initial deposit is insulated from stock market fluctuations.'}</p>
                            </div>
                            <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary text-sm mb-1">{isEs ? 'Crecimiento con Diferimiento Fiscal' : 'Tax-Deferred Compounding'}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Los intereses acumulados no generan tributación anual hasta su retiro.' : 'Earnings compound without annual 1099 taxable distributions.'}</p>
                            </div>
                            <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary text-sm mb-1">{isEs ? 'Tasa de Interés Contractual' : 'Contractual Interest'}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Rendimiento garantizado por escrito según los términos del contrato.' : 'Guaranteed interest rates specified contractually by the insurer.'}</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: MYGA (MULTI-YEAR GUARANTEE ANNUITIES) */}
                    <section id="myga" className="bg-light-gray p-6 md:p-8 rounded-2xl border border-gray-200 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-accent text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Plazo Fijo Garantizado' : 'Guaranteed Fixed Term'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '2. Anualidades con Garantía Multianual (MYGA)' : '2. Multi-Year Guarantee Annuities (MYGA)'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Las anualidades MYGA (Multi-Year Guarantee Annuity) son un subtipo de anualidad fija sumamente popular entre los jubilados de Florida. Funcionan de forma conceptual similar a los Certificados de Depósito (CD) de los bancos, pero son emitidas por compañías aseguradoras y gozan de diferimiento fiscal completo.' 
                                : 'Multi-Year Guarantee Annuities (MYGAs) are a specific fixed annuity category widely used by Florida retirees. They function conceptually like bank Certificates of Deposit (CDs), but are issued by life insurance carriers and benefit from comprehensive tax deferral.'}
                        </p>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-3">
                            <h4 className="font-bold text-primary text-base">{isEs ? 'Características Clave de las MYGA:' : 'Key MYGA Characteristics:'}</h4>
                            <ul className="text-xs md:text-sm text-gray-700 space-y-2">
                                <li>• <strong>{isEs ? 'Plazos Definidos:' : 'Flexible Term Durations:'}</strong> {isEs ? 'Plazos típicos de 3, 5, 7 o 10 años donde la tasa convenida permanece idéntica y congelada.' : 'Typical terms of 3, 5, 7, or 10 years locking an exact interest rate for the whole period.'}</li>
                                <li>• <strong>{isEs ? 'Retiros Anuales Libres de Penalidad:' : 'Penalty-Free Withdrawals:'}</strong> {isEs ? 'La mayoría de los contratos permiten retirar hasta un 10% del balance anualmente a partir del segundo año.' : 'Most contracts permit penalty-free annual withdrawals (typically up to 10%) after year one.'}</li>
                                <li>• <strong>{isEs ? 'Transferencias 1035 Libres de Impuestos:' : '1035 Tax-Free Exchanges:'}</strong> {isEs ? 'Al vencer el plazo, puede renovar o transferir el capital a otra anualidad mediante un intercambio 1035 del IRS sin pagar impuestos.' : 'At contract maturity, you can roll funds into another annuity via an IRS Section 1035 tax-free exchange.'}</li>
                            </ul>
                        </div>
                    </section>

                    {/* SECTION 3: FIXED INDEXED ANNUITIES (FIA) */}
                    <section id="fixed-indexed-annuities" className="border-2 border-primary/20 bg-blue-50/40 rounded-2xl p-6 md:p-8 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-secondary text-white text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Crecimiento con Piso de Protección' : 'Index-Linked Growth with Floor'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '3. Anualidades Indexadas Fijas (Fixed Indexed Annuities - FIA)' : '3. Fixed Indexed Annuities (FIA)'}
                        </h2>
                        <div className="bg-white p-4 rounded-xl border border-blue-200 text-xs md:text-sm text-blue-950 font-medium leading-relaxed">
                            {isEs 
                                ? 'Nota de Diferenciación: Es fundamental distinguir una Anualidad Fija Tradicional de una Anualidad Indexada Fija (FIA). Mientras que la anualidad fija acredita una tasa establecida, la FIA vincula su potencial de ganancias al rendimiento de un índice bursátil externo (como el S&P 500), manteniendo un piso garantizado de protección de capital.' 
                                : 'Important Distinction: It is essential to distinguish traditional fixed annuities from Fixed Indexed Annuities (FIAs). While a fixed annuity credits a predetermined fixed rate, an FIA links interest credits to the performance of an external market index (such as the S&P 500), while maintaining a contractually guaranteed 0% floor against market downturns.'}
                        </div>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? '¿Cómo funciona una FIA? Su dinero nunca se invierte directamente en acciones ni en la bolsa. La aseguradora invierte en sus reservas conservadoras de alta calidad y utiliza una porción de las ganancias para adquirir opciones sobre el índice. Si el índice sube, usted recibe un crédito de interés calculado según topes (caps) o porcentajes de participación. Si el índice sufre pérdidas durante el período de medición, se aplica el piso del 0%: su cuenta simplemente recibe 0% de interés y no sufre pérdidas de capital por caídas del mercado.' 
                                : 'How does an FIA function? Your funds are not directly invested in the stock market or equity shares. Instead, the insurer backs your principal within its general account and credits interest based on external index gains subject to contractual caps, spreads, or participation rates. If the underlying index falls into negative territory during a crediting cycle, the 0% floor protects your account: you receive zero interest for that period, but your principal and prior locked-in gains remain intact.'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary text-sm mb-1">{isEs ? 'Piso Garantizado del 0%' : '0% Contractual Floor'}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'En años de caídas bursátiles severas, su saldo acreditado no disminuye por caídas del índice.' : 'During market corrections, your credited balance is protected from index losses.'}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary text-sm mb-1">{isEs ? 'Bloqueo Anual de Ganancias (Reset)' : 'Annual Gains Reset'}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{isEs ? 'Los intereses acreditados cada año se consolidan y pasan a formar parte del principal garantizado.' : 'Interest credited each cycle is locked in and becomes part of your new guaranteed baseline.'}</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: IMMEDIATE ANNUITIES (SPIA) */}
                    <section id="immediate-annuities" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Ingresos de Jubilación Inmediatos' : 'Immediate Cashflow'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '4. Anualidades Inmediatas de Prima Única (SPIA)' : '4. Single Premium Immediate Annuities (SPIA)'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Una Anualidad Inmediata de Prima Única (SPIA, por sus siglas en inglés) está diseñada para personas que ya están en el momento de la jubilación y necesitan transformar un monto acumulado (por ejemplo, de una cuenta 401(k), IRA o venta de una propiedad) en un flujo regular de ingresos mensuales a partir de los siguientes 30 días a 12 meses.' 
                                : 'A Single Premium Immediate Annuity (SPIA) is structured for individuals entering retirement who need to convert a lump sum (such as a 401(k) rollover, IRA distribution, or property sale proceeds) into an immediate stream of reliable monthly income starting within 30 days to 12 months.'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs md:text-sm">
                            <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary mb-1">{isEs ? 'Vida Única (Single Life)' : 'Single Life Annuity'}</h4>
                                <p className="text-gray-600">{isEs ? 'Pagos mensuales garantizados mientras el titular viva.' : 'Guaranteed monthly payouts for the duration of the policyholder\'s lifetime.'}</p>
                            </div>
                            <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary mb-1">{isEs ? 'Vida Conjunta (Joint Life)' : 'Joint & Survivor Life'}</h4>
                                <p className="text-gray-600">{isEs ? 'Los ingresos continúan entregándose al cónyuge sobreviviente.' : 'Income payments continue to a surviving spouse for their lifetime.'}</p>
                            </div>
                            <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                                <h4 className="font-bold text-primary mb-1">{isEs ? 'Período Cierto (Period Certain)' : 'Period Certain'}</h4>
                                <p className="text-gray-600">{isEs ? 'Garantiza pagos por 10, 15 o 20 años incluso en caso de fallecimiento temprano.' : 'Guarantees payments for a fixed timeframe (e.g. 10 or 20 years) to beneficiaries.'}</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 5: LIFETIME INCOME RIDERS */}
                    <section id="lifetime-income" className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-accent text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Solución de Pensión Privada' : 'Private Pension Structure'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-white">
                            {isEs ? '5. Ingresos de por Vida Garantizados (Lifetime Income Riders - GLWB)' : '5. Guaranteed Lifetime Income Solutions (GLWB)'}
                        </h2>
                        <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'El mayor temor de los jubilados modernos es el riesgo de longevidad: agotar sus ahorros antes de fallecer. Mediante cláusulas adicionales de ingresos vitalicios garantizados (Guaranteed Lifetime Withdrawal Benefit - GLWB), una anualidad le asegura una pensión mensual predecible de por vida, sin importar cuántos años viva e incluso si el balance de la cuenta llega a cero.' 
                                : 'The primary concern for modern retirees is longevity risk: outliving their accumulated assets. Through Guaranteed Lifetime Withdrawal Benefit (GLWB) riders, an annuity establishes a personal private pension. You receive contractually guaranteed monthly income for as long as you live, regardless of how long your retirement lasts, even if your underlying account balance is depleted to zero.'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm pt-2">
                            <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1">
                                <h4 className="font-bold text-accent">{isEs ? 'Ingresos Predecibles' : 'Predictable Cashflow'}</h4>
                                <p className="text-gray-300">{isEs ? 'Sepa exactamente cuánto dinero recibirá cada mes para complementar el Seguro Social.' : 'Know exactly what monthly amount will arrive to supplement your Social Security benefits.'}</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1">
                                <h4 className="font-bold text-accent">{isEs ? 'Control de Activos Remanentes' : 'Retained Asset Ownership'}</h4>
                                <p className="text-gray-300">{isEs ? 'A diferencia de una anualización irrevocable, usted conserva el control del valor de rescate restante.' : 'Unlike traditional annuitization, you retain ownership of any remaining cash balance for heirs.'}</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 6: ANNUITY VS CD COMPARISON */}
                    <section id="annuity-vs-cd" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Análisis Comparativo' : 'Head-to-Head Comparison'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '6. Comparativa Exhaustiva: Anualidad vs. Certificado de Depósito Bancario (CD)' : '6. Comprehensive Comparison: Annuity vs. Bank CD'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Tanto las anualidades fijas (MYGA) como los certificados de depósito (CD) son herramientas conservadoras diseñadas para la seguridad del capital. No obstante, presentan diferencias regulatorias, fiscales y operativas determinantes:' 
                                : 'Both fixed annuities (MYGAs) and bank certificates of deposit (CDs) are conservative instruments designed for principal safety. However, their tax treatment, yield potential, and regulatory mechanics differ significantly:'}
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
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Compañías de Seguros de Vida + FLAHIGA estatal' : 'Insurance Carrier Reserves + State FLAHIGA'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Bancos Comerciales asegurados por FDIC ($250k)' : 'FDIC-insured commercial banks up to $250k'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Liquidez Anual' : 'Annual Liquidity Provision'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Típicamente hasta 10% anual libre de penalidad' : 'Typically up to 10% annual penalty-free'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Penalidad de meses de interés por retiro anticipado' : 'Severe interest penalty for early withdrawal'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Opciones de Ingreso de por Vida' : 'Lifetime Income Conversion'}</td>
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

                    {/* SECTION 7: BROKER ADVICE WITH ANDRES BOZO */}
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
                                    ? 'Como corredor independiente con licencia en Florida, comparo contratos de anualidades en múltiples aseguradoras de máxima calificación crediticia (A.M. Best A/A+ como Allianz, Athene, Corebridge, Lincoln, Pacific Life y SILAC). Mi objetivo es estructurar una propuesta adaptada a sus metas de liquidez, horizonte temporal y tolerancia al riesgo con total transparencia y rigor analítico.' 
                                    : 'As an independent licensed Florida broker, I analyze annuity contracts across top-rated carriers (A.M. Best A/A+ ratings including Allianz, Athene, Corebridge, Lincoln, Pacific Life, and SILAC). My objective is to structure a personalized solution tailored to your liquidity horizon, tax bracket, and retirement goals with complete analytical transparency.'}
                            </p>
                            <p className="text-xs font-semibold text-primary pt-1">
                                {isEs ? '📍 Sede en Gainesville, Florida | Servicio a residentes en todo el estado' : '📍 Based in Gainesville, FL | Serving clients across all Florida counties'}
                            </p>
                        </div>
                    </section>

                    {/* SECTION 8: ANNUITY FAQ */}
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

                    {/* SECTION 9: CTA / ILLUSTRATION REQUEST */}
                    <section id="cta" className="bg-primary text-white rounded-2xl p-6 md:p-10 text-center space-y-6 shadow-xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                            {isEs ? 'Ilustración y Análisis Gratuito' : 'Free Customized Illustration'}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black font-heading max-w-2xl mx-auto leading-tight">
                            {isEs 
                                ? 'Descubra Cuánto Rendimiento Contractual Puede Proteger su Jubilación' 
                                : 'Explore Guaranteed Growth & Retirement Payout Options'}
                        </h2>
                        <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
                            {isEs 
                                ? 'Solicite una comparativa detallada de tasas de interés contractuales y opciones de ingresos de por vida de las principales aseguradoras en Florida.' 
                                : 'Request a comprehensive comparison of contractual rates and guaranteed lifetime income options from top Florida carriers.'}
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
