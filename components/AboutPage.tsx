import React from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { WhyChooseUs } from './WhyChooseUs';
import { translations } from '../constants/translations';

interface AboutPageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/sobre-andres-bozo' : '/about-andres-bozo'}`;
    const enUrl = `${baseUrl}/about-andres-bozo`;
    const esUrl = `${baseUrl}/es/sobre-andres-bozo`;

    const title = isEs 
        ? 'Sobre Andrés H. Bozo | Broker de Seguros Licenciado en Florida (NPN 21228432)' 
        : 'About Andres H. Bozo | Licensed Florida Insurance Broker (NPN 21228432)';

    const description = isEs 
        ? 'Conozca a Andrés H. Bozo (NPN 21228432), broker independiente de seguros en Florida. Asesoría experta y bilingüe en Medicare, Gastos Finales, IUL y Anualidades con más de 80 aseguradoras.' 
        : 'Meet Andres H. Bozo (NPN 21228432), independent Florida insurance broker. Expert bilingual guidance across Medicare, Final Expense, IUL, and Annuities representing 80+ top carriers.';

    const content = translations[language];

    // Local image paths (exclusive new portrait for About page)
    const imageSrc = "/andresbozo-portrait-new.jpg";
    const imageSm = "/andresbozo-portrait-new.jpg";

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Andres H. Bozo",
        "alternateName": ["Andres Bozo", "Andrés Bozo", "Andres H Bozo"],
        "jobTitle": isEs ? "Broker de Seguros Licenciado en Florida" : "Licensed Florida Insurance Broker",
        "description": isEs 
            ? "Broker independiente de seguros en Florida especializado en Medicare, Seguro de Gastos Finales, Vida Universal Indexada (IUL) y Anualidades. NPN: 21228432."
            : "Independent Florida insurance broker specializing in Medicare, Final Expense Burial Insurance, Indexed Universal Life (IUL), and Annuities. NPN: 21228432.",
        "telephone": "+1-352-225-8389",
        "email": "andreshbozo@ahbinsurancesolutions.com",
        "image": `${baseUrl}/andresbozo-portrait-new.jpg`,
        "url": canonical,
        "knowsLanguage": [
            { "@type": "Language", "name": "English" },
            { "@type": "Language", "name": "Spanish" }
        ],
        "knowsAbout": [
            "Florida Medicare Supplement (Medigap Plan G & Plan N)",
            "Medicare Advantage (Part C)",
            "Medicare Part D Prescription Drug Plans",
            "Final Expense & Burial Life Insurance",
            "Indexed Universal Life (IUL)",
            "Fixed Indexed Annuities (FIA)",
            "Senior Life Insurance Underwriting",
            "Florida Department of Financial Services Insurance Regulations"
        ],
        "hasCredential": [
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "State Insurance License",
                "name": "Florida Resident Insurance Agent License - Life, Health, and Variable Annuity",
                "recognizedBy": {
                    "@type": "GovernmentOrganization",
                    "name": "Florida Department of Financial Services (DFS)",
                    "url": "https://www.myfloridacfo.com/"
                }
            }
        ],
        "identifier": {
            "@type": "PropertyValue",
            "name": "National Producer Number (NPN)",
            "value": "21228432"
        },
        "worksFor": {
            "@type": ["Organization", "LocalBusiness", "InsuranceAgency"],
            "@id": `${baseUrl}/#organization`,
            "name": "AHB Insurance Solutions",
            "url": baseUrl,
            "telephone": "+1-352-225-8389",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "5500 SW Archer Road, Apt H103",
                "addressLocality": "Gainesville",
                "addressRegion": "FL",
                "postalCode": "32607",
                "addressCountry": "US"
            },
            "areaServed": {
                "@type": "State",
                "name": "Florida"
            }
        },
        "sameAs": [
            "https://licenseesearch.fldfs.com/",
            "https://nipr.com/"
        ]
    };

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${canonical}#aboutpage`,
        "name": title,
        "description": description,
        "url": canonical,
        "mainEntity": {
            "@id": `${baseUrl}/#person`
        }
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
                "name": isEs ? "Sobre Andrés Bozo (NPN 21228432)" : "About Andres Bozo (NPN 21228432)",
                "item": canonical
            }
        ]
    };

    const specializations = isEs ? [
        {
            title: "Medicare Suplementario (Medigap Plan G y N) y Medicare Advantage",
            desc: "Orientación integral en la transición a los 65 años o jubilación. Análisis detallado de coberturas para eliminar copagos hospitalarios impredecibles y revisión de redes médicas y formularios de medicamentos (Parte D).",
            badge: "Medicare Especialista"
        },
        {
            title: "Seguro de Gastos Finales y Protección Funeraria",
            desc: "Pólizas de seguro de vida entera para personas mayores de 50 a 85+ años con primas congeladas de por vida. Cobertura inmediata o simplificada sin exámenes médicos invasivos para proteger a hijos y cónyuge de deudas funerarias ($7,000–$12,000+).",
            badge: "Gastos Finales"
        },
        {
            title: "Vida Universal Indexada (IUL) y Estrategias de Retiro",
            desc: "Estructuración de pólizas con acumulación de valor en efectivo ligadas a índices como el S&P 500 con piso contractual del 0% en la acreditación indexada y estrategias de préstamos con ventajas fiscales según el Código IRS 7702.",
            badge: "IUL y Retiro"
        },
        {
            title: "Anualidades Fijas Indexadas (FIA)",
            desc: "Protección del capital principal de jubilación frente a caídas del mercado, con opciones de flujos de ingresos vitalicios garantizados contractualmente y crecimiento con impuestos diferidos.",
            badge: "Anualidades"
        },
        {
            title: "Planes Dentales, Visión y Audición para Mayores",
            desc: "Coberturas complementarias diseñadas para cubrir servicios no incluidos en el Medicare Original (Partes A y B), incluyendo implantes, prótesis, lentes y audífonos.",
            badge: "Salud Complementaria"
        }
    ] : [
        {
            title: "Florida Medicare Supplement (Medigap Plan G & N) & Advantage",
            desc: "Comprehensive guidance turning 65 or transitioning from employer group coverage. In-depth analysis to eliminate unpredictable hospital out-of-pocket exposure and review physician networks and Part D prescription formularies.",
            badge: "Medicare Specialist"
        },
        {
            title: "Final Expense & Senior Burial Life Insurance",
            desc: "Permanent whole life insurance policies for seniors aged 50 to 85+ with contractually locked premiums. Simplified issue and day-one coverage options with zero invasive physical exams to protect families from funeral debt ($7,000–$12,000+).",
            badge: "Final Expense"
        },
        {
            title: "Indexed Universal Life (IUL) & Retirement Strategies",
            desc: "Designing maximum-funded, anti-MEC cash value contracts tied to the S&P 500 with a contractual 0% index-crediting floor and tax-advantaged policy loan retirement strategies under Internal Revenue Code Section 7702.",
            badge: "IUL & Wealth"
        },
        {
            title: "Fixed Indexed Annuities (FIA)",
            desc: "Principal protection for accumulated retirement savings against stock market downturns, paired with contractual guaranteed lifetime income streams and tax-deferred compound growth.",
            badge: "Annuities"
        },
        {
            title: "Senior Dental, Vision & Hearing Coverage",
            desc: "Supplemental health coverage built specifically for services not covered by Original Medicare (Parts A & B), including dental implants, dentures, prescription eyewear, and hearing aids.",
            badge: "Senior Health"
        }
    ];

    const methodologySteps = isEs ? [
        {
            step: "01",
            title: "Diagnóstico Exhaustivo de Salud y Objetivos",
            desc: "Revisamos de manera confidencial su historial médico, medicamentos habituales, médicos de preferencia y presupuesto disponible para determinar las opciones a las que califica."
        },
        {
            step: "02",
            title: "Comparación Multi-Compañía entre 80+ Aseguradoras",
            desc: "Como broker independiente, evaluamos las tarifas reguladas y guías de suscripción médica de más de 80 compañías líderes autorizadas en Florida para encontrar la póliza más conveniente."
        },
        {
            step: "03",
            title: "Asesoría Bilingüe Transparente y Cero Presión",
            desc: "Le presentamos una comparativa clara con pros y contras. Explicamos cada cláusula en español o inglés sin tecnicismos confusos, para que tome una decisión 100% informada."
        },
        {
            step: "04",
            title: "Acompañamiento y Revisión Anual de por Vida",
            desc: "Nuestra relación comienza cuando se emite su póliza. Le asistimos en reclamos, cambios de dirección, dudas con facturas y realizamos revisiones anuales sin costo adicional."
        }
    ] : [
        {
            step: "01",
            title: "Comprehensive Health & Goals Discovery",
            desc: "We confidentially review your health background, current prescriptions, preferred doctors, and budget parameters to pinpoint exact underwriting eligibility across carriers."
        },
        {
            step: "02",
            title: "Market-Wide Comparison Across 80+ Carriers",
            desc: "As an independent broker, we compare state-regulated rates and medical underwriting guidelines across 80+ top Florida carriers to identify your most cost-effective solution."
        },
        {
            step: "03",
            title: "Clear, Bilingual Guidance with Zero Sales Pressure",
            desc: "We present transparent options side-by-side. We explain every rule, benefit, and limitation in plain English or Spanish with zero pressure, ensuring total clarity."
        },
        {
            step: "04",
            title: "Lifetime Advocacy & Annual Policy Reviews",
            desc: "Our client relationship is lifelong. We provide ongoing assistance with claims, carrier questions, and annual Medicare prescription formulary audits at zero cost to you."
        }
    ];

    const carrierList = [
        "Mutual of Omaha", "Aetna Health", "Humana", "UnitedHealthcare", "Cigna Healthcare",
        "Transamerica", "Americo", "National Life Group", "Corebridge Financial (AIG)", "WellCare",
        "Devoted Health", "CarePlus Health Plans", "Florida Blue", "American Continental (Aetna)", "Allianz Life"
    ];

    return (
        <div className="bg-slate-50 min-h-screen text-dark-gray font-sans pb-20">
            <SEOHead 
                title={title}
                description={description}
                canonicalUrl={canonical}
                enUrl={enUrl}
                esUrl={esUrl}
                language={language}
                schema={[personSchema, aboutPageSchema, breadcrumbSchema]}
            />

            {/* Breadcrumb Bar */}
            <div className="bg-white border-b border-gray-200 py-2.5">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2 flex-wrap">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Andrés H. Bozo (NPN 21228432)' : 'Andres H. Bozo (NPN 21228432)'}</span>
                </div>
            </div>

            {/* Hero Profile & Verification Header */}
            <section className="bg-primary text-white pt-10 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 max-w-6xl mx-auto">
                        
                        {/* Portrait Card */}
                        <div className="w-full sm:w-80 lg:w-96 flex-shrink-0">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-gradient-to-tr from-accent via-secondary to-blue-400 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-700"></div>
                                <div className="relative bg-white rounded-2xl p-2.5 shadow-2xl overflow-hidden border border-white/20">
                                    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 relative">
                                        <picture>
                                            <source 
                                                type="image/webp" 
                                                srcSet={`${imageSm} 480w, ${imageSrc} 1000w`} 
                                                sizes="(max-width: 640px) 92vw, 400px"
                                            />
                                            <img 
                                                src={imageSrc} 
                                                srcSet={`${imageSm} 480w, ${imageSrc} 1000w`}
                                                sizes="(max-width: 640px) 92vw, 400px"
                                                alt={isEs ? "Andrés H. Bozo, broker de seguros licenciado en Florida NPN 21228432" : "Andres H. Bozo, licensed Florida insurance broker NPN 21228432"}
                                                width="400"
                                                height="500"
                                                className="w-full h-full object-cover"
                                                style={{ objectPosition: '50% 20%' }}
                                                loading="eager"
                                                fetchPriority="high"
                                            />
                                        </picture>
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent p-4 text-center">
                                            <span className="inline-block bg-accent text-primary text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                                                NPN: 21228432
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3.5 text-center bg-white text-dark-gray">
                                        <h2 className="text-xl font-black text-primary font-heading">Andres H. Bozo</h2>
                                        <p className="text-xs text-gray-600 font-bold uppercase tracking-wider mt-0.5">
                                            {isEs ? 'Broker Independiente Licenciado' : 'Licensed Independent Broker'}
                                        </p>
                                        <p className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center justify-center gap-1">
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                                            {isEs ? 'Licencia de Florida Activa y Verificada' : 'Active Florida State License'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Executive Identity Content */}
                        <div className="flex-grow text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                                <span>FLORIDA DEPARTMENT OF FINANCIAL SERVICES</span>
                            </div>
                            
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading leading-tight mb-4">
                                {isEs ? 'Andrés H. Bozo' : 'Andres H. Bozo'}
                            </h1>
                            <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed max-w-2xl mb-6">
                                {isEs 
                                    ? 'Corredor de seguros independiente certificado en Florida (NPN: 21228432) y fundador de AHB Insurance Solutions. Especialista en Medicare, Gastos Finales, IUL y Anualidades con representación directa ante más de 80 aseguradoras.' 
                                    : 'Florida-licensed independent insurance broker (NPN: 21228432) and founder of AHB Insurance Solutions. Specializing in Medicare, Final Expense Burial Insurance, IUL, and Annuities with direct broker representation across 80+ top-rated carriers.'}
                            </p>

                            {/* Quick Credentials Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mb-8 text-left">
                                <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-3 rounded-xl">
                                    <span className="text-[10px] text-gray-300 uppercase tracking-wider block font-bold">{isEs ? 'Registro Nacional' : 'National Registry'}</span>
                                    <span className="text-sm font-black text-accent">NPN 21228432</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-3 rounded-xl">
                                    <span className="text-[10px] text-gray-300 uppercase tracking-wider block font-bold">{isEs ? 'Jurisdicción' : 'Jurisdiction'}</span>
                                    <span className="text-sm font-black text-white">{isEs ? 'Florida (67 Condados)' : 'State of Florida'}</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-3 rounded-xl col-span-2 sm:col-span-1">
                                    <span className="text-[10px] text-gray-300 uppercase tracking-wider block font-bold">{isEs ? 'Idiomas' : 'Languages'}</span>
                                    <span className="text-sm font-black text-white">English & Español</span>
                                </div>
                            </div>

                            {/* CTAs & Direct Contact */}
                            <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start flex-wrap">
                                <a
                                    href="tel:+13522258389"
                                    className="w-full sm:w-auto bg-accent hover:bg-[#FFB81C] text-primary font-black uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                    </svg>
                                    <span>+1 (352) 225-8389</span>
                                </a>
                                <button
                                    onClick={onOpenQuote}
                                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all"
                                >
                                    {isEs ? 'Solicitar Asesoría Gratuita ➔' : 'Request Free Consultation ➔'}
                                </button>
                                <a
                                    href="https://licenseesearch.fldfs.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-gray-300 hover:text-white border border-white/20 hover:border-white/40 px-4 py-3 rounded-xl transition-all"
                                    title={isEs ? "Verificar licencia en el portal oficial del estado de Florida" : "Verify agent license on Florida DFS official database"}
                                >
                                    <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{isEs ? 'Verificar Licencia en DFS Florida' : 'Verify License on FL DFS'}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Official Licensing & Entity Profile Box */}
            <section className="container mx-auto px-4 md:px-6 -mt-8 relative z-20 max-w-6xl">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100">
                        <div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-secondary block mb-1">
                                {isEs ? 'Ficha Profesional & Licenciamiento Estatal' : 'Professional Record & State Licensing'}
                            </span>
                            <h2 className="text-2xl font-black font-heading text-primary">
                                {isEs ? 'Estructura Profesional y Acreditación de Andrés Bozo' : 'Andres Bozo Professional & Agency Profile'}
                            </h2>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="bg-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1 rounded-full">
                                {isEs ? 'Actualizado: Septiembre 2026' : 'Updated: September 2026'}
                            </span>
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-lg text-emerald-800 text-xs font-bold">
                                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                                <span>{isEs ? 'Licencia Residente Activa en Florida' : 'Active Florida Resident License'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-sm">
                        <div className="space-y-1">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">{isEs ? 'Nombre Completo' : 'Full Legal Name'}</span>
                            <p className="font-extrabold text-primary">Andres H. Bozo</p>
                            <span className="text-xs text-gray-600 block">{isEs ? 'Broker Principal' : 'Principal Broker'}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">{isEs ? 'Agencia / Razón' : 'Agency Entity'}</span>
                            <p className="font-extrabold text-primary">AHB Insurance Solutions</p>
                            <span className="text-xs text-gray-600 block">{isEs ? 'Brokerage Independiente' : 'Independent Brokerage'}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">{isEs ? 'Líneas de Autoridad' : 'Lines of Authority'}</span>
                            <p className="font-extrabold text-primary">{isEs ? 'Vida, Salud y Anualidades' : 'Life, Health & Annuities'}</p>
                            <span className="text-xs text-gray-600 block">{isEs ? 'Contratos Variables' : 'Variable Contracts'}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">{isEs ? 'Cobertura Geográfica' : 'Service Territory'}</span>
                            <p className="font-extrabold text-primary">{isEs ? 'Todo el Estado de Florida' : 'Statewide Florida'}</p>
                            <span className="text-xs text-gray-600 block">{isEs ? '67 Condados (Remoto y Presencial)' : '67 Counties (Remote & In-Person)'}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Biography & Mission Section */}
            <section className="container mx-auto px-4 md:px-6 py-14 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-5 text-gray-800 leading-relaxed text-base">
                        <span className="text-xs font-black uppercase tracking-widest text-[#8A6000] bg-accent/15 px-3 py-1 rounded-full border border-accent/30 inline-block">
                            {isEs ? 'Nuestra Historia y Filosofía' : 'Our Story & Philosophy'}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-heading text-primary leading-tight">
                            {isEs 
                                ? 'La Misión de Andrés Bozo: Proteger su Patrimonio y su Tranquilidad' 
                                : 'Andres Bozo’s Mission: Safeguarding Your Family’s Legacy'}
                        </h2>
                        
                        <p className="text-gray-700">
                            {isEs 
                                ? 'AHB Insurance Solutions nació de una convicción clara: las familias y las personas mayores en Florida merecen una asesoría honesta, transparente y 100% independiente. A lo largo de los años, Andrés H. Bozo observó cómo muchos adultos mayores eran empujados hacia pólizas inadecuadas por agentes cautivos con cuotas de venta restrictivas, o se sentían desamparados ante la complejidad de los formularios de Medicare y los costos inesperados de funeral.' 
                                : 'AHB Insurance Solutions was built on a simple conviction: Florida seniors and working families deserve honest, transparent, and completely independent insurance guidance. Over the years, Andres H. Bozo saw firsthand how retirees were often steered into one-size-fits-all plans by captive agents bound to corporate quotas, leaving them exposed to unexpected medical bills or costly gaps in burial coverage.'}
                        </p>

                        <p className="text-gray-700">
                            {isEs 
                                ? 'Como corredor independiente (Broker), Andrés no representa a una compañía aseguradora; representa exclusivamente los intereses de sus clientes. Al tener contratos directos con más de 80 compañías de primer nivel nacional, puede analizar de forma objetiva las primas reguladas y los criterios de aceptación médica para recomendar la opción que realmente se adapta a la salud y presupuesto de cada persona.' 
                                : 'As an independent broker, Andres does not work for an insurance carrier; he works directly for his clients. By maintaining direct contracts with over 80 A-rated national insurance carriers, Andres objectively scans state-regulated rates and underwriting criteria to find the optimal plan tailored to each client’s medical history and financial goals.'}
                        </p>

                        <div className="bg-light-gray p-5 rounded-xl border-l-4 border-accent shadow-sm my-4">
                            <p className="italic font-bold text-primary text-sm sm:text-base">
                                {isEs 
                                    ? '«En AHB Insurance Solutions, usted nunca es un número de póliza. Es un vecino, un amigo y una familia a la que cuidamos como a la nuestra propia.»' 
                                    : '“At AHB Insurance Solutions, you are never just a policy number. You are a neighbor, a friend, and a family whose security we protect as our own.”'}
                            </p>
                            <span className="block text-xs font-bold text-gray-600 mt-2">— Andres H. Bozo, NPN 21228432</span>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                            <h3 className="font-black text-primary text-lg font-heading mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 bg-accent rounded-full"></span>
                                {isEs ? 'El Compromiso Independiente' : 'The Independent Broker Promise'}
                            </h3>
                            <ul className="space-y-3.5 text-xs text-gray-700 font-medium">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                                    <span><strong>{isEs ? 'Cero Costo para el Cliente:' : '100% Free Service:'}</strong> {isEs ? 'La asesoría y gestión es gratuita. Las tarifas están reguladas por el estado de Florida.' : 'Broker advisory is free to you. Rates are state-regulated by law.'}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                                    <span><strong>{isEs ? '80+ Compañías Aseguradoras:' : '80+ Carrier Options:'}</strong> {isEs ? 'No estamos atados a ninguna marca en particular. Buscamos el mejor precio real.' : 'No captive brand bias. We match you with the strongest market value.'}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                                    <span><strong>{isEs ? 'Servicio Bilingüe Nativo:' : 'Native Bilingual Advisory:'}</strong> {isEs ? 'Atención fluida en inglés y español para total claridad contractual.' : 'Fluent in English & Spanish to ensure total policy understanding.'}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                                    <span><strong>{isEs ? 'Revisión Anual Permanente:' : 'Lifetime Annual Audits:'}</strong> {isEs ? 'Revisamos medicamentos y cambios de red cada año sin costo.' : 'Annual Medicare Part D formulary and rate reviews every year.'}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Direct Card */}
                        <div className="bg-gradient-to-br from-primary to-[#002244] text-white p-6 rounded-2xl shadow-lg">
                            <h4 className="font-bold text-accent text-xs uppercase tracking-wider mb-1">{isEs ? 'Contacto Directo con Andrés' : 'Direct Line to Andres'}</h4>
                            <p className="text-lg font-black font-heading mb-3">{isEs ? 'Hable directamente con su broker' : 'Speak Directly with Your Broker'}</p>
                            <div className="space-y-2 text-xs text-gray-200">
                                <p className="flex items-center gap-2">
                                    <span className="text-accent font-bold">📞</span>
                                    <a href="tel:+13522258389" className="hover:text-accent font-bold text-sm">+1 (352) 225-8389</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-accent font-bold">✉️</span>
                                    <a href="mailto:andreshbozo@ahbinsurancesolutions.com" className="hover:text-accent break-all">andreshbozo@ahbinsurancesolutions.com</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-accent font-bold">📍</span>
                                    <span>5500 SW Archer Road, Apt H103, Gainesville, FL 32607</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Areas of Specialization */}
            <section className="bg-white py-14 border-y border-gray-200">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs font-black uppercase tracking-widest text-secondary block mb-2">
                            {isEs ? 'Áreas de Especialización' : 'Core Practice Areas'}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-heading text-primary">
                            {isEs ? 'Soluciones de Cobertura Diseñadas para Florida' : 'Specialized Insurance Solutions for Florida Residents'}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mt-3 font-medium">
                            {isEs 
                                ? 'Asesoramiento técnico en los productos más relevantes para proteger la salud, la familia y el retiro.' 
                                : 'Technical advisory in the essential products designed to protect your healthcare, family, and retirement.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {specializations.map((item, idx) => (
                            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-gray-200 hover:border-secondary/40 hover:shadow-lg transition-all flex flex-col justify-between">
                                <div>
                                    <span className="inline-block bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-3">
                                        {item.badge}
                                    </span>
                                    <h3 className="text-lg font-black font-heading text-primary mb-2.5 leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4-Step Methodology */}
            <section className="container mx-auto px-4 md:px-6 py-14 max-w-6xl">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-black uppercase tracking-widest text-secondary block mb-2">
                        {isEs ? 'Metodología de Trabajo' : 'Advisory Methodology'}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-heading text-primary">
                        {isEs ? 'Nuestro Proceso de Asesoría en 4 Pasos' : 'Our 4-Step Client-First Methodology'}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-3 font-medium">
                        {isEs 
                            ? 'Un método transparente y estructurado para garantizar que obtenga exactamente la cobertura que necesita.' 
                            : 'A structured, objective approach to guarantee you secure the exact coverage aligned with your goals.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {methodologySteps.map((m, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group hover:border-accent hover:shadow-md transition-all">
                            <span className="text-4xl font-black text-gray-200 group-hover:text-accent/30 transition-colors font-heading block mb-2">
                                {m.step}
                            </span>
                            <h3 className="text-base font-black font-heading text-primary mb-2 leading-snug">
                                {m.title}
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                {m.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Carrier Relationships Section */}
            <section className="bg-primary text-white py-14">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl text-center">
                    <span className="text-accent text-xs font-black uppercase tracking-widest block mb-2">
                        {isEs ? 'Más de 80 Aseguradoras Contratadas' : '80+ Top-Rated Insurance Carriers'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading mb-4">
                        {isEs ? 'Representamos al Mercado Completo de Florida' : 'Direct Broker Representation Across Top Carriers'}
                    </h2>
                    <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-3xl mx-auto font-medium mb-8 leading-relaxed">
                        {isEs 
                            ? 'Mantenemos contratos directos con las compañías aseguradoras más sólidas y prestigiosas del país para ofrecerle siempre la mejor relación costo-beneficio.' 
                            : 'We maintain direct broker appointments with the nation’s most financially stable insurance companies to compare all viable options.'}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
                        {carrierList.map((c, i) => (
                            <span key={i} className="bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-100 hover:bg-white/20 transition-colors">
                                {c}
                            </span>
                        ))}
                        <span className="bg-accent text-primary px-3.5 py-1.5 rounded-full text-xs font-black">
                            {isEs ? '+ Más de 65 Compañías Adicionales' : '+ 65 More Top Carriers'}
                        </span>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Block */}
            <WhyChooseUs content={content.whyChooseUs} />

            {/* Disclosures & Regulatory Compliance Notice */}
            <section className="container mx-auto px-4 md:px-6 py-10 max-w-6xl">
                <div className="bg-gray-100 rounded-2xl p-6 border border-gray-300 text-xs text-gray-600 space-y-3 leading-relaxed">
                    <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px] flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>{isEs ? 'Avisos de Divulgación Regulatoria y Cumplimiento Legal' : 'Regulatory Disclosures & Legal Compliance Notice'}</span>
                    </h3>
                    <p>
                        <strong>{isEs ? 'Aviso de Licencia:' : 'Licensing Disclosure:'}</strong> {isEs 
                            ? 'Andrés H. Bozo es un corredor de seguros residente licenciado por el Departamento de Servicios Financieros del Estado de Florida (DFS), Número de Productor Nacional (NPN) 21228432. AHB Insurance Solutions opera como una agencia de corretaje independiente.' 
                            : 'Andres H. Bozo is a licensed resident insurance broker authorized by the Florida Department of Financial Services (DFS), National Producer Number (NPN) 21228432. AHB Insurance Solutions operates as an independent insurance agency.'}
                    </p>
                    <p>
                        <strong>{isEs ? 'Descargo de Responsabilidad de Medicare (CMS):' : 'CMS Medicare Disclaimer:'}</strong> {isEs 
                            ? 'No ofrecemos todos los planes disponibles en su área. Cualquier información que proporcionemos se limita a los planes que ofrecemos en su área. Comuníquese con Medicare.gov o al 1-800-MEDICARE las 24 horas del día, los 7 días de la semana, o con su Programa Estatal de Asistencia en Seguros de Salud (SHIP) local para obtener información sobre todas sus opciones.' 
                            : 'We do not offer every plan available in your area. Currently we represent multiple organizations which offer multiple products in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program (SHIP) to get information on all of your options.'}
                    </p>
                    <p>
                        <strong>{isEs ? 'Divulgación de Compensación y Relación con Aseguradoras:' : 'Compensation & Carrier Relationship Disclosure:'}</strong> {isEs 
                            ? 'Como corredor de seguros independiente, Andrés H. Bozo recibe una compensación directa de las compañías aseguradoras a través de comisiones estándar cuando se emite una póliza. Esta estructura de compensación no añade ningún recargo, tarifa adicional ni sobreprecio a su prima oficial regulada por el estado.' 
                            : 'As an independent insurance broker, Andres H. Bozo is compensated directly by insurance carriers through standard commissions when a policy is placed. This commission structure does not add any fee, surcharge, or markup to your official state-regulated premium.'}
                    </p>
                    <p>
                        <strong>{isEs ? 'Aviso Fiscal y Legal:' : 'Tax & Legal Disclaimer:'}</strong> {isEs 
                            ? 'La información proporcionada sobre productos de seguro de vida (incluyendo IUL y anualidades) tiene fines educativos y no constituye asesoramiento tributario o legal formal. Los préstamos sobre pólizas reducen el beneficio por fallecimiento y el valor en efectivo. Consulte siempre a un contador público certificado (CPA) o abogado fiscal para analizar su situación particular.' 
                            : 'Information provided regarding life insurance contracts (including IUL and annuities) is for educational purposes and does not constitute formal tax or legal advice. Policy loans reduce death benefit and cash surrender value. Always consult a certified CPA or tax attorney regarding your individual tax circumstances.'}
                    </p>
                </div>

                <div className="text-center pt-8">
                    <button
                        onClick={onOpenQuote}
                        className="bg-accent text-primary font-black uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg hover:bg-[#FFB81C] transition-all"
                    >
                        {isEs ? 'Hablar con Andrés Bozo Hoy ➔' : 'Talk with Andres Bozo Today ➔'}
                    </button>
                </div>
            </section>
        </div>
    );
};
