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
        ? 'Anualidades Fijas en Florida: MYGA, FIA y Opciones de Ingresos | AHB Insurance' 
        : 'Florida Fixed Annuities: MYGA, FIA & Retirement Income Options | AHB Insurance';

    const description = isEs 
        ? 'Guía completa sobre anualidades fijas en Florida: tradicionales, MYGA, indexadas (FIA) y SPIA. Tasas de interés garantizadas, acreditación, liquidez, comparativa con CD e ingresos de jubilación con el broker Andrés H. Bozo.' 
        : 'Comprehensive Florida guide to fixed annuities, MYGAs, Fixed Indexed Annuities (FIA), and SPIAs. Learn interest crediting, liquidity, surrender charges, CD comparison, and lifetime income options with licensed broker Andres H. Bozo.';

    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = isEs ? [
        {
            q: "¿Qué es una anualidad fija y cómo protege el capital en Florida?",
            a: "Una anualidad fija es un contrato legalmente vinculante emitido por una compañía de seguros de vida con licencia en Florida. A diferencia de las inversiones en bolsa, el capital está respaldado por las reservas estatutarias y la cartera de bonos de grado de inversión de la aseguradora. El contrato ofrece un crecimiento de intereses compuesto con diferimiento fiscal del 100% y un piso contractual que protege su saldo contra cualquier pérdida de mercado."
        },
        {
            q: "¿Cuál es la diferencia exacta entre una anualidad tradicional, una MYGA y una FIA?",
            a: "Una anualidad fija tradicional declara una tasa periódica revisable anualmente con una tasa mínima garantizada. Una MYGA (Multi-Year Guarantee Annuity) bloquea una tasa de interés fija exacta durante un período multianual pactado (por ejemplo, 3, 5, 7 o 10 años). Una Anualidad Indexada Fija (FIA) ofrece un rendimiento vinculado al desempeño de un índice bursátil externo (como el S&P 500) mediante topes (caps) o tasas de participación, manteniendo siempre un piso garantizado del 0% para evitar rendimientos negativos."
        },
        {
            q: "¿Cómo funciona el diferimiento fiscal (Tax Deferral) en las anualidades?",
            a: "En una anualidad, usted no recibe formularios 1099-INT anuales sobre los intereses ganados mientras los fondos permanezcan dentro del contrato. El dinero que habría pagado en impuestos cada año permanece dentro de la cuenta devengando intereses sobre intereses (interés compuesto triple: interés sobre el capital, interés sobre los intereses y rendimiento sobre los impuestos diferidos). Los impuestos sobre las ganancias solo se pagan cuando se realizan retiros."
        },
        {
            q: "¿Qué liquidez tengo disponible si necesito dinero de emergencia?",
            a: "La gran mayoría de los contratos modernos de anualidades en Florida incluyen una provisión de liquidez anual libre de penalización (penalty-free withdrawal), que suele permitir retirar hasta un 10% del saldo acumulado cada año tras el primer aniversario de la póliza. Asimismo, muchos contratos incluyen cláusulas de exención por internamiento en hogares de ancianos o enfermedades terminales que liberan hasta el 100% del capital sin cargos por rescate."
        },
        {
            q: "¿Qué sucede al vencer el plazo de una anualidad MYGA?",
            a: "Al término del plazo contractual (por ejemplo, al concluir los 5 años), se abre una ventana de gracia de 30 días. Usted tiene tres alternativas: 1) Retirar la totalidad de su capital y ganancias en un pago único; 2) Realizar un intercambio 1035 libre de impuestos hacia una nueva anualidad con las tasas más competitivas del mercado en ese momento; o 3) Permitir que la póliza se renueve bajo la tasa vigente estipulada por la aseguradora."
        },
        {
            q: "¿Cómo se comparan las anualidades con los Certificados de Depósito (CD) bancarios?",
            a: "Los CD bancarios están respaldados por la FDIC hasta $250,000 por depositante y generan impuestos anuales ordinarios a través del Formulario 1099-INT. Las anualidades MYGA ofrecen diferimiento fiscal del 100%, están respaldadas por las reservas de la aseguradora y por la Asociación de Garantía de Seguros de Vida y Salud de Florida (FLAHIGA), permiten retiros parciales anuales del 10% sin penalización y pueden convertirse en ingresos vitalicios garantizados que no se agotan."
        },
        {
            q: "¿Qué es un intercambio libre de impuestos según la Sección 1035 del IRS?",
            a: "La Sección 1035 del Código de Rentas Internas permite transferir fondos directamente de una anualidad existente (o el valor en efectivo de una póliza de seguro de vida) a una nueva anualidad sin generar un hecho imponible ni pagar impuestos en el momento del traspaso. Esto permite a los titulares modernizar contratos antiguos con tasas bajas a contratos contemporáneos con mejores rendimientos o beneficios en vida."
        },
        {
            q: "¿Cómo garantiza una anualidad un flujo de ingresos de por vida (Lifetime Income)?",
            a: "Mediante la anuitización tradicional o, más habitualmente hoy en día, mediante una Cláusula de Retiro Vitalicio Garantizado (GLWB / Income Rider). El GLWB calcula una base de ingresos contractual (Income Base) que crece a una tasa compuesta anual predefinida. Al activar los retiros, la aseguradora le paga un porcentaje anual garantizado por el resto de su vida, incluso si el valor de la cuenta en efectivo llega a cero debido a una larga longevidad."
        }
    ] : [
        {
            q: "What is a fixed annuity and how does it protect retirement principal in Florida?",
            a: "A fixed annuity is a legally binding contract issued by a state-licensed life insurance company. Unlike stock market investments, your principal is backed by the insurer's general account statutory reserves and conservative investment-grade bond portfolio. The contract provides 100% tax-deferred compound interest growth and a contractual guarantee ensuring your balance is completely shielded from market downturns."
        },
        {
            q: "What is the exact difference between a traditional fixed annuity, a MYGA, and an FIA?",
            a: "A traditional fixed annuity declares an annual interest rate with a contractual minimum floor. A Multi-Year Guarantee Annuity (MYGA) locks in an exact, guaranteed fixed yield for a committed term (such as 3, 5, 7, or 10 years). A Fixed Indexed Annuity (FIA) links growth potential to an external market benchmark (like the S&P 500) via caps or participation rates, while maintaining a strict 0% contractual floor to ensure you never lose principal during market downturns."
        },
        {
            q: "How does tax deferral work in fixed annuities?",
            a: "With an annuity, you do not receive annual 1099-INT tax forms on accrued interest as long as funds remain within the contract. Money that would otherwise go toward annual income taxes stays in your account, generating triple compounding (interest on principal, interest on interest, and interest on tax savings). Income taxes are only paid when distributions are withdrawn."
        },
        {
            q: "What liquidity options are available if I face an unexpected financial emergency?",
            a: "Most modern Florida annuity contracts feature an annual penalty-free withdrawal provision, typically permitting withdrawals of up to 10% of your accumulated account value each year after the first contract anniversary. Furthermore, many contracts include waiver riders for nursing home confinement or terminal illness that grant 100% penalty-free access to your capital."
        },
        {
            q: "What happens when a MYGA contract term matures?",
            a: "When your contractual term ends (for example, at the end of a 5-year term), a 30-day window opens. You have three primary choices: 1) Take a full lump-sum distribution of your principal and earnings; 2) Execute an IRS Section 1035 tax-free exchange into a new annuity offering top market rates at that time; or 3) Allow the contract to automatically renew under the carrier's prevailing renewal rate."
        },
        {
            q: "How do fixed annuities compare to bank Certificates of Deposit (CDs)?",
            a: "Bank CDs are FDIC-insured up to $250,000 per depositor and generate taxable income annually reported on Form 1099-INT. Annuities grow 100% tax-deferred, are backed by insurer statutory reserves and the Florida Life and Health Insurance Guaranty Association (FLAHIGA), typically offer 10% penalty-free annual liquidity, and provide the option to convert funds into guaranteed lifetime retirement income that you cannot outlive."
        },
        {
            q: "What is an IRS Section 1035 tax-free exchange?",
            a: "Section 1035 of the Internal Revenue Code allows you to roll over funds directly from an existing annuity contract (or the cash value of a permanent life policy) into a new annuity without triggering a taxable event or paying tax penalties. This empowers Florida savers to upgrade older, low-yielding contracts to modern products with higher yields and superior living benefits."
        },
        {
            q: "How does an annuity establish guaranteed lifetime income?",
            a: "Either through traditional annuitization or through a modern Guaranteed Lifetime Withdrawal Benefit (GLWB) income rider. A GLWB tracks a contractual 'Income Base' that compounds at a contractual roll-up rate. When activated, the insurer disburses a guaranteed payout percentage every year for life, even if your underlying cash surrender value reaches zero due to living a long life."
        }
    ];

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": ["Service", "FinancialProduct"],
        "name": isEs ? "Asesoría en Anualidades y Jubilación en Florida" : "Florida Fixed Annuities: MYGA, FIA & Retirement Income Solutions",
        "serviceType": "Fixed Annuity & Retirement Financial Product Brokerage",
        "category": "RetirementPlanning",
        "description": description,
        "provider": {
            "@id": "https://www.ahbinsurancesolutions.com/#organization"
        },
        "broker": {
            "@id": "https://www.ahbinsurancesolutions.com/#person"
        },
        "areaServed": {
            "@type": "State",
            "name": "Florida"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": isEs ? "Comparativa personalizada de tasas de anualidades fijas en Florida" : "Free customized annuity rate comparisons and retirement income illustrations",
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
                "name": isEs ? "Anualidades Fijas en Florida" : "Florida Fixed Annuities",
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
                            {isEs ? 'Anualidades en Florida' : 'Florida Fixed Annuities'}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
                        {isEs ? 'Broker Independiente Licenciado NPN 21228432' : 'Licensed Independent Florida Broker NPN 21228432'}
                    </span>
                </div>
            </nav>

            {/* HERO SECTION WITH EXACT REQUESTED H1 */}
            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
                            {isEs ? 'Planificación de Jubilación en Florida | Preservación de Capital' : 'Florida Retirement Planning | Capital Preservation'}
                        </span>
                        {/* H1 requested by user */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-5 leading-tight text-white">
                            {isEs 
                                ? 'Anualidades Fijas en Florida: MYGA, FIA y Opciones de Ingresos para la Jubilación' 
                                : 'Florida Fixed Annuities: MYGA, FIA & Retirement Income Options'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Guía integral sobre anualidades fijas en Florida (fixed annuity Florida, MYGA Florida, retirement income Florida). Compare tasas de interés contractuales, plazos, liquidez anual y estrategias de ingresos de por vida respaldadas por aseguradoras líderes.'
                                : 'Comprehensive guide to Florida fixed annuities (fixed annuity Florida, MYGA Florida, retirement income Florida). Compare guaranteed contract rates, terms, liquidity provisions, and lifetime income solutions across top-rated carriers.'}
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

                    {/* SECTION 1: WHAT IS A FIXED ANNUITY? */}
                    <section id="what-is-a-fixed-annuity" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Fundamentos Contractuales' : 'Core Foundations'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '¿Qué es una Anualidad Fija?' : 'What Is a Fixed Annuity?'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Una anualidad fija es un contrato emitido por una compañía de seguros de vida autorizada en Florida. Su objetivo principal es ofrecer una alternativa conservadora diseñada para proteger el capital contra caídas bursátiles, acumular intereses con diferimiento fiscal y brindar opciones contractuales para convertir ahorros en un flujo predecible de ingresos de jubilación, sujeto a los términos del contrato y a la solvencia de la aseguradora.' 
                                : 'A fixed annuity is a contract issued by a state-licensed life insurance company. Its primary objective is to provide a conservative vehicle designed to protect principal against direct market declines, compound interest on a tax-deferred basis, and offer contractual mechanisms to convert accumulated savings into a predictable stream of retirement income, subject to contract terms and insurer claims-paying ability.'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-bold text-primary text-base">
                                    {isEs ? '1. Fase de Acumulación' : '1. Accumulation Phase'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Durante esta etapa, sus fondos depositados crecen a una tasa de interés contractualmente garantizada o vinculada a un índice, sin pagar impuestos anuales sobre las ganancias.' 
                                        : 'During this phase, your deposit earns interest at a contractually locked rate or index formula, compounding tax-deferred without annual 1099 tax erosion.'}
                                </p>
                            </div>
                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-bold text-primary text-base">
                                    {isEs ? '2. Fase de Distribución / Ingresos' : '2. Distribution / Payout Phase'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Usted decide cómo y cuándo acceder a su dinero: mediante retiros anuales libres de penalización (según contrato), retiro al vencimiento o una opción de ingresos vitalicios respaldada por la póliza.' 
                                        : 'You choose how to access your assets: via penalty-free annual withdrawals (subject to policy provisions), lump-sum at term maturity, or contractual lifetime income options designed to provide disbursements for life.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: FIXED ANNUITIES (TRADITIONAL) */}
                    <section id="fixed-annuities" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Modalidad Clásica' : 'Traditional Annuity Structure'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Anualidades Fijas Tradicionales' : 'Fixed Annuities'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Las anualidades fijas tradicionales (declared-rate fixed annuities) ofrecen una tasa de interés declarada periódicamente por la aseguradora. El contrato estipula una tasa inicial garantizada durante un período específico (a menudo de 1 año) junto con una tasa mínima garantizada de por vida que la póliza nunca puede perforar hacia abajo (por ejemplo, un piso mínimo del 1.5% al 3.0%).' 
                                : 'Traditional fixed annuities (declared-rate annuities) credit interest based on a rate declared periodically by the insurer general account. The contract specifies an initial guaranteed crediting rate for an introductory period (often 1 year) along with a lifetime guaranteed minimum floor (e.g., 1.5% to 3.0%) that the carrier can never drop below, regardless of macroeconomic shifts.'}
                        </p>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Son la herramienta predilecta para ahorradores ultraconservadores en Florida que priorizan la estabilidad absoluta sobre el crecimiento bursátil, con la garantía de que el saldo de su cuenta aumentará cada mes de forma inalterable.' 
                                : 'They remain the preferred vehicle for ultra-conservative Florida savers prioritizing total capital stability over market speculation, providing assurance that the contract value steadily increases every single month.'}
                        </p>
                    </section>

                    {/* SECTION 3: MYGA (MULTI-YEAR GUARANTEE ANNUITY) */}
                    <section id="myga" className="bg-blue-50/50 p-6 md:p-8 rounded-2xl border border-blue-200 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-secondary text-white text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Tasa Fija Garantizada por Múltiples Años' : 'Guaranteed Multi-Year Yield'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'MYGA: Anualidad con Garantía Multianual' : 'MYGA (Multi-Year Guarantee Annuity)'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Una MYGA es una variante de anualidad fija en la que la aseguradora fija por contrato una tasa de interés garantizada durante todo el plazo acordado (habitualmente 3, 5, 7 o 10 años). A diferencia de las anualidades con tasas renovables anualmente, el rendimiento pactado se garantiza contractualmente para la duración del período comprometido, sujeto a la solvencia financiera de la aseguradora.' 
                                : 'A Multi-Year Guarantee Annuity (MYGA) is a specialized fixed annuity where the insurance carrier contractually guarantees a fixed interest rate for the duration of a committed term (commonly 3, 5, 7, or 10 years). Unlike products with annual renewal rates, the agreed yield is locked for the multi-year period, backed by the financial strength of the issuing insurer.'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div className="bg-white p-4 rounded-xl border border-blue-100 text-center shadow-xs">
                                <span className="block font-black text-primary text-xl">3 a 10 Años</span>
                                <span className="text-xs text-gray-500 font-semibold">{isEs ? 'Plazos Contractuales' : 'Contract Terms'}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-blue-100 text-center shadow-xs">
                                <span className="block font-black text-emerald-700 text-xl">Tasa Garantizada</span>
                                <span className="text-xs text-gray-500 font-semibold">{isEs ? 'Fija por Contrato' : 'Contractually Locked'}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-blue-100 text-center shadow-xs">
                                <span className="block font-black text-primary text-xl">Diferido de IRS</span>
                                <span className="text-xs text-gray-500 font-semibold">{isEs ? 'Cero 1099 Anual' : 'Zero Annual 1099 Taxes'}</span>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: FIXED INDEXED ANNUITIES (FIA) */}
                    <section id="fixed-indexed-annuities" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Crecimiento Indexado con Piso del 0%' : 'Index-Linked Potential with 0% Floor'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Anualidades Indexadas Fijas (Fixed Indexed Annuities - FIA)' : 'Fixed Indexed Annuities'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Una Anualidad Indexada Fija (FIA) combina la protección de principal de una anualidad fija con el potencial de obtener intereses vinculados al desempeño de un índice bursátil externo reconocido (como el S&P 500, Nasdaq-100 o índices diversificados de baja volatilidad).' 
                                : 'A Fixed Indexed Annuity (FIA) combines the principal safety of a fixed contract with the opportunity to earn interest linked to an external market benchmark (such as the S&P 500, Nasdaq-100, or multi-asset volatility-controlled indices).'}
                        </p>
                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs md:text-sm text-amber-950 leading-relaxed font-medium">
                            <strong className="text-primary">{isEs ? 'Punto Clave de Cumplimiento:' : 'Key Regulatory Distinction:'} </strong>
                            {isEs 
                                ? 'Usted NO invierte directamente en acciones, fondos mutuos ni en el mercado de valores. Los fondos están custodiados en las reservas de la aseguradora. La compañía utiliza una porción de sus rendimientos de inversión para adquirir opciones sobre el índice, lo que permite acreditar intereses cuando el índice sube mientras protege el capital principal de pérdidas directas del mercado, sujeto a los términos del contrato y a la solvencia de la aseguradora.' 
                                : 'You are NOT directly invested in equities, stock portfolios, or mutual funds. Your assets are housed within the insurer general account. The carrier utilizes investment yields to purchase index options, crediting interest when the benchmark rises while protecting principal against direct market downturns, subject to contract provisions and insurer claims-paying ability.'}
                        </div>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'El piso contractual del 0% estipula que en los períodos en que el índice de referencia registre caídas, su cuenta recibirá un crédito de interés del 0% en lugar de un rendimiento negativo. Las ganancias previamente acreditadas se consolidan según las reglas de reajuste del contrato, sujetas a posibles deducciones por comisiones de cláusulas o rescate aplicables.' 
                                : 'The contractual 0% floor provides that during down-market periods, your policy receives a 0% interest credit rather than a negative market return. Subject to contract terms, optional rider fees, and insurer claims-paying ability, previously credited gains are locked in and protected from future market index declines.'}
                        </p>
                    </section>

                    {/* SECTION 5: SPIA (SINGLE PREMIUM IMMEDIATE ANNUITY) */}
                    <section id="spia" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Pensión Privada Inmediata' : 'Immediate Retirement Pension'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'SPIA: Anualidad Inmediata de Prima Única' : 'SPIA (Single Premium Immediate Annuity)'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Una Anualidad Inmediata de Prima Única (SPIA) está diseñada para personas que necesitan generar ingresos garantizados al instante. Usted transfiere un monto único a la aseguradora y los pagos comienzan de inmediato (habitualmente dentro de los primeros 30 días a 12 meses).' 
                                : 'A Single Premium Immediate Annuity (SPIA) is designed for individuals requiring immediate guaranteed cash flow. You deposit a single lump sum with the insurance carrier, and income disbursements commence immediately (typically within 30 days to 12 months).'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                                <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Estructura de Pensión Privada' : 'Private Pension Structure'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Funciona exactamente como una pensión corporativa: transforma un fondo de jubilación acumulado en un cheque mensual constante de por vida.' 
                                        : 'Functions as a personal pension, converting an accumulated nest egg into an unwavering monthly paycheck for life.'}
                                </p>
                            </div>
                            <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                                <h3 className="font-bold text-primary text-sm mb-1">{isEs ? 'Ventaja Fiscal: Ratio de Exclusión' : 'Tax Advantage: Exclusion Ratio'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'En fondos no calificados (after-tax), cada pago mensual se compone parcialmente de capital libre de impuestos y parcialmente de interés, reduciendo su impacto fiscal inicial.' 
                                        : 'For non-qualified deposits, each monthly payment consists partly of tax-free principal return and partly of taxable interest, dramatically reducing initial tax drag.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 6: LIFETIME INCOME (GLWB & ANNUITIZATION) */}
                    <section id="lifetime-income" className="bg-primary text-white p-6 md:p-8 rounded-2xl space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-accent text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Solución contra el Riesgo de Longevidad' : 'Longevity Protection'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-white">
                            {isEs ? 'Ingresos de por Vida: Opciones Vitalicias y Cláusulas GLWB' : 'Lifetime Income'}
                        </h2>
                        <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'El mayor temor para la mayoría de los jubilados en Florida es el "riesgo de longevidad": la posibilidad real de vivir más allá de lo que alcanzan sus ahorros. Las anualidades son el único producto financiero del sector privado con la capacidad legal de garantizar un cheque mensual vitalicio respaldado por contrato.' 
                                : 'The foremost financial risk facing Florida retirees is longevity risk—the very real danger of outliving personal savings. Annuities represent the only private-sector financial instrument legally structured to guarantee contractually binding lifetime paychecks.'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="bg-white/10 p-5 rounded-xl border border-white/15 space-y-2">
                                <h3 className="font-bold text-accent text-base">
                                    {isEs ? 'Anuitización Tradicional' : 'Traditional Annuitization'}
                                </h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    {isEs 
                                        ? 'Se renuncia al acceso al capital principal a cambio de un flujo irrevocable de pagos mensuales fijos de por vida (Life Only o Joint Survivor).' 
                                        : 'Irrevocably surrenders access to underlying cash principal in exchange for a permanent, irrevocable monthly payout stream.'}
                                </p>
                            </div>
                            <div className="bg-white/10 p-5 rounded-xl border border-white/15 space-y-2">
                                <h3 className="font-bold text-accent text-base">
                                    {isEs ? 'Cláusula de Retiro Vitalicio (GLWB)' : 'Income Riders (GLWB)'}
                                </h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    {isEs 
                                        ? 'Permite recibir ingresos vitalicios garantizados mientras usted conserva la propiedad, el control y la liquidez de su valor de rescate acumulado para sus herederos.' 
                                        : 'Generates guaranteed lifetime withdrawals while allowing you to retain control, liquidity, and remaining cash surrender value for designated beneficiaries.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 7: INTEREST CREDITING */}
                    <section id="interest-crediting" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Mecanismo de Rendimiento' : 'Yield Crediting Mechanics'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Acreditación de Intereses: Estrategias, Topes y Participación' : 'Interest Crediting'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'La acreditación de intereses varía según la arquitectura de la anualidad seleccionada. Comprender estos mecanismos contractuales garantiza que elija el producto adecuado para su tolerancia al riesgo:' 
                                : 'Interest crediting mechanics depend on the specific annuity architecture chosen. Understanding these contractual variables ensures appropriate alignment with your risk tolerance:'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 bg-light-gray rounded-xl border border-gray-200 space-y-1.5">
                                <h3 className="font-bold text-primary text-sm">{isEs ? '1. Tasas Fijas Declaradas (Fixed)' : '1. Declared Fixed Rates'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Porcentaje fijo compuesto exacto (por ejemplo, 5.25% anual en una MYGA a 5 años) garantizado por escrito.' 
                                        : 'Exact fixed compounding percentage (e.g., 5.25% annually on a 5-year MYGA) contractually guaranteed.'}
                                </p>
                            </div>
                            <div className="p-5 bg-light-gray rounded-xl border border-gray-200 space-y-1.5">
                                <h3 className="font-bold text-primary text-sm">{isEs ? '2. Topes de Ganancia (Caps)' : '2. Cap Rates'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'El rendimiento máximo acreditado en un ciclo anual. Si el índice sube un 15% y su tope es del 9%, su contrato recibe el 9%.' 
                                        : 'The maximum interest credited during a cycle. If the benchmark climbs 15% and your cap is 9%, you receive 9%.'}
                                </p>
                            </div>
                            <div className="p-5 bg-light-gray rounded-xl border border-gray-200 space-y-1.5">
                                <h3 className="font-bold text-primary text-sm">{isEs ? '3. Tasa de Participación (Participation Rate)' : '3. Participation Rates'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'El porcentaje de la ganancia del índice que se acredita. Con una participación del 100% o 120% en índices de volatilidad controlada, usted recibe toda o más de la subida.' 
                                        : 'The percentage of the benchmark index gain credited. With 100% or 120% participation on volatility-controlled indices, you capture full upside.'}
                                </p>
                            </div>
                            <div className="p-5 bg-light-gray rounded-xl border border-gray-200 space-y-1.5">
                                <h3 className="font-bold text-primary text-sm">{isEs ? '4. Bloqueo Anual (Annual Reset)' : '4. Annual Reset Feature'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Cada año, las ganancias acreditadas se bloquean de forma permanente en el saldo de su cuenta y se convierten en el nuevo piso.' 
                                        : 'At the end of each anniversary, credited gains lock in permanently, becoming the new baseline floor that can never be lost.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 8: LIQUIDITY */}
                    <section id="liquidity" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Acceso a Fondos y Flexibilidad' : 'Access & Cash Flexibility'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Liquidez: Retiros Libres de Penalización y Cláusulas' : 'Liquidity'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'A diferencia de lo que a veces se piensa, las anualidades fijas modernas en Florida suelen incorporar mecanismos de liquidez contractuales para atender necesidades imprevistas, dependiendo del contrato específico y de la aseguradora:' 
                                : 'Depending on the contract and carrier, modern Florida fixed annuities provide structured liquidity provisions to accommodate unexpected lifestyle needs:'}
                        </p>
                        <div className="space-y-3">
                            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs flex items-start gap-3">
                                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs shrink-0 mt-0.5">10%</span>
                                <div>
                                    <h3 className="font-bold text-primary text-sm">{isEs ? 'Retiro Anual Libre de Penalización (Según Contrato)' : 'Penalty-Free Annual Withdrawals (Where Applicable)'}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {isEs 
                                            ? 'Muchos contratos permiten retirar hasta un 10% del valor acumulado de la cuenta por año (típicamente a partir del segundo año o tras 12 meses) sin cargos de rescate de la aseguradora, sujeto a las disposiciones de la póliza.' 
                                            : 'Many contracts permit annual penalty-free withdrawals (commonly up to 10% of accumulated contract value after the first contract year) without carrier surrender charges, subject to contract terms.'}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs flex items-start gap-3">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-black flex items-center justify-center text-xs shrink-0 mt-0.5">RMD</span>
                                <div>
                                    <h3 className="font-bold text-primary text-sm">{isEs ? 'Distribuciones Mínimas Requeridas (RMD Friendly)' : 'RMD Friendly for Qualified Accounts'}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {isEs 
                                            ? 'En contratos mantenidos dentro de cuentas calificadas (IRA tradicional o 401k rollover), muchas aseguradoras exoneran los cargos de rescate para montos correspondientes a RMDs obligatorios por el IRS.' 
                                            : 'Under many carrier contracts, surrender charges are waived for IRS-mandated Required Minimum Distributions (RMDs) on qualified IRA and 401(k) rollovers, subject to policy provisions.'}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs flex items-start gap-3">
                                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 font-black flex items-center justify-center text-xs shrink-0 mt-0.5">🏥</span>
                                <div>
                                    <h3 className="font-bold text-primary text-sm">{isEs ? 'Cláusulas de Enfermería y Enfermedad Terminal' : 'Nursing Home & Terminal Illness Waivers'}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {isEs 
                                            ? 'Algunos contratos incorporan cláusulas adicionales que permiten acceder a fondos sin penalización de rescate ante internación en centros de enfermería calificados o diagnóstico de enfermedad terminal, sujeto a las condiciones contractuales y aprobación estatal.' 
                                            : 'Some contracts offer waiver riders that, subject to qualifying medical conditions and state availability, permit penalty-free access to contract value in the event of qualified nursing confinement or terminal illness.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 9: SURRENDER CHARGES */}
                    <section id="surrender-charges" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Transparencia Contractual' : 'Fee Transparency'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Cargos por Rescate (Surrender Charges) y Reglas del IRS' : 'Surrender Charges'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Las anualidades son instrumentos financieros diseñados para horizontes de mediano a largo plazo. Si usted retira fondos por encima del límite libre permitido durante el período de compromiso, la aseguradora aplicará un cargo por rescate decreciente.' 
                                : 'Annuities are designed for medium- to long-term retirement planning horizons. If you withdraw assets exceeding the annual penalty-free allowance during the commitment period, a declining surrender charge schedule applies.'}
                        </p>
                        <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-3">
                            <h3 className="font-bold text-primary text-sm">{isEs ? 'Ejemplo Típico de Escala de Rescate (Contrato a 7 años)' : 'Sample 7-Year Surrender Charge Schedule'}</h3>
                            <div className="grid grid-cols-7 gap-2 text-center text-xs">
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200"><span className="block font-bold text-gray-500">Año 1</span><span className="font-black text-red-600">8%</span></div>
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200"><span className="block font-bold text-gray-500">Año 2</span><span className="font-black text-red-600">7%</span></div>
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200"><span className="block font-bold text-gray-500">Año 3</span><span className="font-black text-amber-600">6%</span></div>
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200"><span className="block font-bold text-gray-500">Año 4</span><span className="font-black text-amber-600">5%</span></div>
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200"><span className="block font-bold text-gray-500">Año 5</span><span className="font-black text-amber-600">4%</span></div>
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200"><span className="block font-bold text-gray-500">Año 6</span><span className="font-black text-emerald-600">3%</span></div>
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200"><span className="block font-bold text-gray-500">Año 7</span><span className="font-black text-emerald-600">2%</span></div>
                            </div>
                            <p className="text-xs text-gray-500 text-center font-medium pt-1">
                                {isEs ? 'A partir del Año 8: 0% de cargo por rescate (100% líquida).' : 'After Year 7: 0% surrender fee (100% liquid).' }
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-600 leading-relaxed space-y-1">
                                <strong className="text-primary block font-bold text-sm">{isEs ? 'Ajuste de Valor de Mercado (MVA):' : 'Market Value Adjustment (MVA):'}</strong>
                                {isEs 
                                    ? 'Un ajuste que refleja los cambios en las tasas de interés de los bonos corporativos si se rescata la póliza antes del vencimiento. Si las tasas de mercado bajaron desde la emisión, el MVA puede aumentar su valor de rescate.' 
                                    : 'An adjustment reflecting macroeconomic interest rate shifts if liquidated before maturity. If prevailing rates declined since purchase, the MVA can actually increase the net payout value.'}
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-600 leading-relaxed space-y-1">
                                <strong className="text-primary block font-bold text-sm">{isEs ? 'Penalidad Federal del 10% del IRS (Edad 59½):' : 'IRS 10% Premature Penalty (Under 59½):'}</strong>
                                {isEs 
                                    ? 'Al igual que con las cuentas IRA y 401(k), los retiros de ganancias imponibles antes de cumplir 59½ años pueden estar sujetos a una penalidad fiscal federal adicional del 10% bajo la Sección 72(t).' 
                                    : 'Identical to Traditional IRAs and 401(k)s, taxable earnings withdrawn prior to age 59½ may incur a 10% federal IRS tax penalty under Code Section 72(t).'}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 10: TAX CONSIDERATIONS */}
                    <section id="tax-considerations" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Eficiencia Fiscal' : 'Tax Advantages'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Consideraciones Fiscales: Diferimiento, LIFO e Intercambios 1035' : 'Tax Considerations'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'El código tributario de los Estados Unidos otorga un trato privilegiado a las anualidades para incentivar el ahorro para la jubilación. Comprender las normas fiscales optimiza significativamente su patrimonio neto:' 
                                : 'The U.S. Internal Revenue Code affords annuities unique tax privileges to incentivize long-term retirement security. Understanding these tax rules maximizes your net retirement wealth:'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-bold text-primary text-sm">{isEs ? '1. Crecimiento con Diferimiento Fiscal' : '1. Tax-Deferred Compounding'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Los intereses acumulados no tributan anualmente mientras permanezcan en el contrato. Al momento del retiro, las ganancias se gravan como ingreso ordinario y los retiros antes de los 59½ años pueden conllevar una penalidad del 10% del IRS.' 
                                        : 'Accumulated interest compounds tax-deferred while inside the contract. Upon withdrawal, earnings are taxed as ordinary income, and withdrawals prior to age 59½ may be subject to a 10% IRS penalty.'}
                                </p>
                            </div>
                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-bold text-primary text-sm">{isEs ? '2. Regla Tributaria LIFO' : '2. LIFO Taxation on Non-Qualified'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'En fondos no calificados (post-tax), los retiros se gravan bajo la regla "Last-In, First-Out". Las ganancias acumuladas se retiran y tributan como ingreso ordinario primero, antes de recuperar el capital principal.' 
                                        : 'For non-qualified after-tax deposits, withdrawals follow Last-In, First-Out (LIFO) rules: accrued interest is withdrawn and taxed as ordinary income before your original tax-free cost basis is returned.'}
                                </p>
                            </div>
                            <div className="p-5 bg-light-gray rounded-2xl border border-gray-200 space-y-2">
                                <h3 className="font-bold text-primary text-sm">{isEs ? '3. Intercambio 1035 Libre de Impuestos' : '3. Section 1035 Tax-Free Rollovers'}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'La Sección 1035 del IRS le permite transferir su saldo desde una anualidad existente hacia una nueva con mejores tasas o beneficios sin desencadenar un evento gravable ni pagar impuestos de inmediato.' 
                                        : 'IRS Section 1035 enables you to transfer funds directly from an older annuity into a new, higher-yielding contract without triggering income taxes or tax penalties.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 11: ANNUITY VS CD */}
                    <section id="annuity-vs-cd" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Análisis Cara a Cara' : 'Head-to-Head Comparison'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Comparativa: Anualidad vs. Certificado de Depósito Bancario (CD)' : 'Annuity vs CD'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Muchos residentes en Florida comparan las anualidades MYGA con los certificados de depósito bancarios debido a la seguridad del capital. Sin embargo, existen diferencias operativas, fiscales y de rendimiento fundamentales:' 
                                : 'Florida savers frequently weigh MYGA fixed annuities against bank certificates of deposit (CDs) for principal security. However, their structural, tax, and liquidity mechanics differ significantly:'}
                        </p>
                        
                        <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-xs">
                            <table className="w-full text-left text-xs md:text-sm">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="p-3.5 md:p-4 font-bold">{isEs ? 'Característica Clave' : 'Key Feature'}</th>
                                        <th className="p-3.5 md:p-4 font-bold bg-secondary">{isEs ? 'Anualidad Fija / MYGA' : 'Fixed Annuity / MYGA'}</th>
                                        <th className="p-3.5 md:p-4 font-bold">{isEs ? 'Certificado de Depósito Bancario (CD)' : 'Bank Certificate of Deposit (CD)'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Tratamiento Fiscal de Intereses' : 'Tax Treatment on Growth'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Diferimiento fiscal del 100% (Cero 1099 anual)' : '100% Tax-Deferred (No annual 1099 tax)'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Tributable anualmente como ingreso ordinario (Form 1099-INT)' : 'Taxed annually as ordinary income via 1099-INT'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Entidad Emisora y Respaldo' : 'Issuing Institution & Guarantee Backing'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Reservas estatutarias de aseguradora + FLAHIGA' : 'Insurer Statutory Reserves + FLAHIGA'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Bancos comerciales asegurados por FDIC ($250,000)' : 'Commercial banks insured by FDIC up to $250k'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Liquidez Parcial durante el Plazo' : 'Partial Liquidity During Term'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Típicamente hasta 10% anual libre de penalidad' : 'Typically up to 10% penalty-free annual access'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Pérdida de meses de interés por cualquier retiro' : 'Forfeiture of several months of interest'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Opciones de Conversión a Pensión' : 'Lifetime Pension Option'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Disponible mediante anuitización o GLWB' : 'Available with lifetime income riders / GLWB'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'No disponible (Solo devolución de principal)' : 'Not available (Simple principal return)'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3.5 md:p-4 font-semibold text-gray-900">{isEs ? 'Evitar Corte de Sucesión (Probate)' : 'Probate Court Avoidance'}</td>
                                        <td className="p-3.5 md:p-4 font-bold text-emerald-700 bg-emerald-50/40">{isEs ? 'Traspaso privado directo al beneficiario designado' : 'Bypasses probate directly to designated heirs'}</td>
                                        <td className="p-3.5 md:p-4 text-gray-700">{isEs ? 'Sujeto a probate a menos que tenga POD activo' : 'Subject to probate unless valid POD is on file'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* SECTION 12: WHO MAY CONSIDER AN ANNUITY? */}
                    <section id="who-may-consider" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Perfiles Idóneos' : 'Ideal Candidates'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? '¿Quién Debería Considerar una Anualidad?' : 'Who May Consider an Annuity?'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'Las anualidades no son para todo el mundo, pero representan una solución sobresaliente para perfiles específicos en la fase de pre-jubilación o retiro:' 
                                : 'Annuities are not suitable for every financial circumstance, but they represent a powerful, customized strategy for several distinct retirement planning profiles:'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                                <h3 className="font-bold text-primary text-base">
                                    {isEs ? '1. Pre-Jubilados (50 a 65 años)' : '1. Pre-Retirees (Ages 50 to 65)'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Personas que buscan proteger su patrimonio central acumulado contra el "riesgo de secuencia de rendimientos" (Sequence of Returns Risk) justo antes de retirarse.' 
                                        : 'Individuals within 5 to 10 years of retirement seeking to protect their nest egg from sequence-of-returns market volatility right before retiring.'}
                                </p>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                                <h3 className="font-bold text-primary text-base">
                                    {isEs ? '2. Ahorradores Cansados del Impuesto de los CD' : '2. CD Savers Seeking Tax Relief'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Inversores conservadores con cuentas bancarias o CD que desean bloquear tasas competitivas sin pagar impuestos sobre la renta cada año con formularios 1099.' 
                                        : 'Conservative savers tired of surrendering a substantial portion of bank CD interest to annual 1099 taxes, seeking 100% tax-deferred growth.'}
                                </p>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                                <h3 className="font-bold text-primary text-base">
                                    {isEs ? '3. Jubilados sin Pensión de Empresa' : '3. Retirees Lacking Corporate Pensions'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Quienes dependen únicamente del Seguro Social y necesitan crear un flujo de ingresos mensual garantizado para cubrir sus gastos fijos de vida de por vida.' 
                                        : 'Individuals reliant solely on Social Security who wish to establish an unwavering, pension-like monthly cash flow to cover basic living expenses for life.'}
                                </p>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                                <h3 className="font-bold text-primary text-base">
                                    {isEs ? '4. Titulares de Cuentas 401(k) e IRA' : '4. 401(k) & IRA Rollover Candidates'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Personas que cambian de empleo o se jubilan y desean realizar un rollover directo de sus fondos calificados sin multas para blindar su capital.' 
                                        : 'Retirees rolling over employer-sponsored 401(k) or 403(b) accounts into a safe, contractually guaranteed IRA without triggering taxes.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 13: IMPORTANT CONSIDERATIONS */}
                    <section id="important-considerations" className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 md:p-8 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-amber-600 text-white text-xs font-black uppercase px-2.5 py-0.5 rounded">
                                {isEs ? 'Evaluación Crítica e Idoneidad' : 'Suitability & Considerations'}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                            {isEs ? 'Consideraciones Importantes antes de Contratar' : 'Important Considerations'}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {isEs 
                                ? 'La transparencia es el pilar de nuestra práctica. Antes de adquirir cualquier contrato de anualidad en Florida, tenga en cuenta estos factores esenciales:' 
                                : 'Transparency is foundational to our advisory practice. Prior to committing assets into any annuity contract in Florida, consider these critical elements:'}
                        </p>
                        <ul className="space-y-3 text-xs md:text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-black mt-0.5">▪</span>
                                <span><strong>{isEs ? 'No son depósitos bancarios:' : 'Not bank deposits:'} </strong> {isEs ? 'Las anualidades son contratos de seguro de vida, no depósitos bancarios asegurados por la FDIC. Están respaldadas por la solvencia financiera de la aseguradora emisora y la protección subsidiaria de FLAHIGA.' : 'Annuities are insurance contracts, not bank deposits insured by the FDIC. Guarantees depend on the claims-paying ability of the issuing insurer and statutory state guaranty protections.'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-black mt-0.5">▪</span>
                                <span><strong>{isEs ? 'Horizonte temporal:' : 'Time commitment:'} </strong> {isEs ? 'No debe colocar en una anualidad fondos que vaya a necesitar para gastos inmediatos o de emergencia antes de que expire el período de cargos por rescate.' : 'Never allocate funds into an annuity that may be required for short-term liquidity or emergency reserves prior to the expiration of the surrender charge schedule.'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-black mt-0.5">▪</span>
                                <span><strong>{isEs ? 'Costos de cláusulas opcionales:' : 'Rider fees:'} </strong> {isEs ? 'Mientras que las MYGA básicas no tienen costos de mantenimiento, las cláusulas de retiro vitalicio (GLWB) en anualidades indexadas suelen tener un cargo anual (generalmente del 0.75% al 1.25% de la base de ingresos).' : 'While base MYGAs have zero annual administrative fees, optional income riders (GLWB) on index products typically carry an annual fee (commonly 0.75% to 1.25% of the Income Base).'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-black mt-0.5">▪</span>
                                <span><strong>{isEs ? 'Solidez de la Aseguradora:' : 'Financial strength:'} </strong> {isEs ? 'Trabajamos exclusivamente con compañías que cuentan con calificaciones de solvencia de primer nivel (A.M. Best A++, A+, A), como Allianz, Athene, Corebridge, Lincoln, Pacific Life y SILAC.' : 'We exclusively recommend carriers with excellent financial strength ratings (A.M. Best A++, A+, A), including Allianz, Athene, Corebridge, Lincoln, Pacific Life, and SILAC.'}</span>
                            </li>
                        </ul>
                    </section>

                    {/* BROKER ADVOCACY SECTION */}
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
                                    ? 'Como corredor independiente con licencia en Florida, realizo comparativas neutrales entre más de 80 compañías líderes. Le ayudo a evaluar tasas fijas, estrategias de indexación, liquidez y opciones de pensión vitalicia sin costo alguno para usted.' 
                                    : 'As an independent licensed Florida insurance broker, I provide impartial multi-carrier comparisons across 80+ top carriers. I help you evaluate fixed yields, index crediting, liquidity provisions, and lifetime income options at zero cost to you.'}
                            </p>
                            <p className="text-xs font-semibold text-primary pt-1">
                                {isEs ? '📍 Sede en Gainesville, Florida | Servicio a residentes en todos los condados de Florida' : '📍 Based in Gainesville, FL | Serving clients across all 67 Florida counties'}
                            </p>
                        </div>
                    </section>

                    {/* SECTION 14: FAQ */}
                    <section id="faq">
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? 'Preguntas Frecuentes sobre Anualidades en Florida' : 'Frequently Asked Questions (FAQ)'}
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

                    {/* SECTION 15: CTA */}
                    <section id="cta" className="bg-primary text-white rounded-2xl p-6 md:p-10 text-center space-y-6 shadow-xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                            {isEs ? 'Ilustración y Análisis Gratuito' : 'Free Customized Illustration'}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black font-heading max-w-2xl mx-auto leading-tight">
                            {isEs 
                                ? 'Descubra las Mejores Opciones de Anualidades y Jubilación en Florida' 
                                : 'Explore Top Florida Fixed Annuity Rates & Retirement Income Options'}
                        </h2>
                        <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
                            {isEs 
                                ? 'Solicite una comparativa detallada de tasas de interés contractuales, plazos y opciones de ingresos de por vida de las principales aseguradoras con el broker Andrés H. Bozo.' 
                                : 'Request a comprehensive multi-carrier rate comparison and customized retirement income strategy with licensed Florida broker Andres H. Bozo.'}
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
