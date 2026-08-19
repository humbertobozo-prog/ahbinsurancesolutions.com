import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Language, TranslationContent } from '../types';
import { translations } from '../constants/translations';
import { SEOHead } from './SEOHead';
import { BackToTopButton } from './BackToTopButton';
import { Footer } from './Footer';
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
                        ? "Seguro Medicare Florida 2026 | Asesoría y Planes Suplementarios en Español" 
                        : "Best Florida Medicare Supplement Plans 2026 | Medigap Plan G & N",
                    description: activeLang === 'es' 
                        ? "Consiga el mejor seguro Medicare en Florida. Comparamos planes Suplementarios de Medicare (Medigap) Partes G y N de más de 80 aseguradoras. Asesoría gratuita en español." 
                        : "Compare Florida Medicare Supplement (Medigap) Plans. Find top Plan G and Plan N rates from 80+ insurers. Guaranteed coverage & no network restrictions in FL.",
                    heading: activeLang === 'es' ? "Seguro Medicare en Florida 2026" : "Medicare Supplement Insurance in Florida",
                    subheading: activeLang === 'es' 
                        ? "Asesoría especializada 100% en español para la comunidad hispana de Florida. Comparamos las mejores opciones de Suplementos de Medicare (Medigap Plan G y N) con primas bajas y sin redes restringidas." 
                        : "Florida Seniors 50+: Lock in low monthly rates for Medicare Supplement (Medigap) Plan G & Plan N with zero doctor network restrictions.",
                    highlights: activeLang === 'es' ? [
                        { title: "Planes Medigap Plan G y Plan N", desc: "Compare coberturas y primas sin deducibles sorpresa ni costos ocultos en Florida." },
                        { title: "Sin Redes de Médicos Restringidas", desc: "Visite a cualquier médico o especialista en Florida y todo EE.UU. que acepte Medicare." },
                        { title: "Atención Bilingüe Personalizada", desc: "Hable directamente en español con Andrés Bozo (Broker Licenciado NPN 21228432)." }
                    ] : [
                        { title: "Medigap Plan G & N Comparison", desc: "Compare Part G, K, and N premiums side-by-side with 100% transparency." },
                        { title: "Zero Doctor Networks", desc: "See any doctor or hospital in Florida and nationwide that accepts Medicare." },
                        { title: "2026 Rate Protection", desc: "Save up to 35% on standard rates by unlocking licensed broker discounts." }
                    ]
                };
            case '/final-expense-miami':
            case '/burial-insurance-tampa':
            case '/es/seguro-gastos-finales-tampa':
            case '/es/seguro-gastos-finales-florida':
                return {
                    title: activeLang === 'es' 
                        ? "Seguro de Gastos Finales en Florida 2026 | Entierro y Funeral Sin Examen Médico" 
                        : "Burial & Final Expense Insurance Florida | No Medical Exam Coverage",
                    description: activeLang === 'es' 
                        ? "Pólizas de seguro de gastos finales de entierro en Florida de $5,000 a $35,000. Tarifas fijas congeladas para siempre, sin exámenes médicos y aprobación garantizada. Asesoría en español." 
                        : "Burial Insurance & Funeral Expense Coverage in Florida. $5,000 to $35,000 cash benefits for seniors with no medical exam. Free quote.",
                    heading: activeLang === 'es' ? "Seguro de Gastos Finales y Entierro en Florida" : "Burial & Final Expense Insurance in Florida",
                    subheading: activeLang === 'es' 
                        ? "Garantice la tranquilidad de su familia y evite deudas de $10,000+ por costos funerarios. Pólizas de vida entera permanentes con cuotas fijas que jamás aumentan." 
                        : "Ensure your family in Florida isn't burdened by $10,000+ funeral costs. Instant guaranteed approval life insurance.",
                    highlights: activeLang === 'es' ? [
                        { title: "Sin Exámenes Médicos", desc: "Aprobación garantizada para personas de 50 a 85 años sin pruebas de sangre ni visitas médicas." },
                        { title: "Pagos Fijos de Por Vida", desc: "Su mensualidad queda congelada para siempre y la póliza nunca vencerá." },
                        { title: "Efectivo Directo y Libre de Impuestos", desc: "Sus beneficiarios reciben el dinero en efectivo en pocos días para cubrir funeral, cremación o deudas." }
                    ] : [
                        { title: "No Health Exams Required", desc: "100% guaranteed approval for seniors aged 50 to 85 regardless of health history." },
                        { title: "Immediate Cash Payouts", desc: "Beneficiaries receive cash tax-free within days to handle burial, cremation, or medical bills." },
                        { title: "Locked Monthly Rates", desc: "Your monthly premium will never increase, and your policy will never expire." }
                    ]
                };
            case '/annuities-florida':
            case '/es/anualidades-florida':
                return {
                    title: "Florida Fixed Annuities 2026 | Guaranteed Retirement Income Florida",
                    description: "Protect your retirement savings with Florida Fixed & MYGA Annuities. Earn guaranteed interest rates with 0% stock market risk. Free rate quote.",
                    heading: "Guaranteed Fixed Annuities in Florida",
                    subheading: "Safeguard your hard-earned retirement nest egg from stock market volatility while locking in guaranteed high interest returns.",
                    highlights: [
                        { title: "0% Stock Market Risk", desc: "Your principal balance is 100% protected against stock market crashes." },
                        { title: "Guaranteed High Returns", desc: "Lock in fixed interest growth far exceeding standard bank CD rates." },
                        { title: "Lifetime Pension Cashflow", desc: "Convert savings into a guaranteed monthly paycheck you can never outlive." }
                    ]
                };
            case '/dental-vision-florida':
            case '/es/dental-vision-florida':
                return {
                    title: "Florida Senior Dental & Vision Insurance | Affordable Plans 2026",
                    description: "Complete Dental and Vision insurance for Florida seniors and families. Cover cleanings, implants, dentures & eyewear with no waiting periods.",
                    heading: "Senior Dental & Vision Insurance in Florida",
                    subheading: "Don't pay out-of-pocket for dental cleanings, crowns, implants, or glasses. Comprehensive coverage across top Florida provider networks.",
                    highlights: [
                        { title: "Immediate Coverage Available", desc: "No waiting periods for preventive cleanings and routine dental care." },
                        { title: "Implants, Dentures & Crowns", desc: "Substantial savings on major dental procedures and specialty care." },
                        { title: "Wide Florida Provider Network", desc: "Choose from thousands of top-rated dentists and optometrists statewide." }
                    ]
                };
            case '/iul-retirement-tampa':
                return {
                    title: "Indexed Universal Life Tampa | Tax-Free Retirement Planning Florida",
                    description: "Grow your private retirement wealth tax-free with an Indexed Universal Life (IUL) policy in Tampa, FL. Protect capital & secure guaranteed retirement cash streams.",
                    heading: "Indexed Universal Life (IUL) in Tampa",
                    subheading: "Build powerful, protected tax-free cash reserves while protecting your Tampa family. Elite private financial strategies.",
                    highlights: [
                        { title: "Tax-Free Capital Growth", desc: "Your index-linked cash balances accumulate interest without IRS dividend taxation." },
                        { title: "Principal Safety Locks", desc: "0% interest floors shield your hard-earned money from stock market downturns." },
                        { title: "Worry-Free Retirement Cash", desc: "Generate lifelong income streams directly from your private life insurance asset." }
                    ]
                };
            case '/spanish-insurance-orlando':
            default:
                return {
                    title: "Seguros de Vida y Medicare en Orlando | Broker de Seguros Florida",
                    description: "Especialista en Seguros de Medicare y Gastos Finales de Entierro en Orlando. Obtenga asesoría profesional bilingüe gratuita con Andres Bozo NPN 21228432.",
                    heading: "Seguros de Vida y Medicare en Orlando",
                    subheading: "Asesoría profesional en español para familias de Florida Central. Comparamos más de 80 compañías para que pague menos.",
                    highlights: [
                        { title: "Planes de Medicare 2026", desc: "Partes A, B, C y D simplificadas para hispanohablantes en Orlando y Kissimmee." },
                        { title: "Gastos Finales de Entierro", desc: "Garantice la tranquilidad de su familia y cubra todos los costos de funeral." },
                        { title: "Atención 100% en Español", desc: "Hable directamente con Andres Bozo en su propio idioma sin intermediarios." }
                    ]
                };
        }
    };

    const details = getPageDetails();
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${path}`;

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "InsuranceAgency", "Organization"],
        "name": "AHB Insurance Solutions",
        "url": canonical,
        "telephone": "+1-352-225-8389",
        "email": "andreshbozo@ahbinsurancesolutions.com",
        "description": details.description,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "5500 SW Archer Road, Apt H103",
            "addressLocality": "Gainesville",
            "addressRegion": "FL",
            "postalCode": "32607",
            "addressCountry": "US"
        },
        "identifier": {
            "@type": "PropertyValue",
            "name": "NPN",
            "value": "21228432"
        }
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

    return (
        <div className="bg-white text-dark-gray font-sans flex flex-col min-h-screen pb-20 md:pb-0">
            <SEOHead 
                title={details.title}
                description={details.description}
                canonicalUrl={canonical}
                enUrl={canonical}
                esUrl={canonical}
                language={activeLang}
                schema={[localBusinessSchema, breadcrumbSchema]}
            />
            {/* Header / Sub Nav */}
            <header className="sticky top-0 bg-primary z-50 text-white border-b border-white/5 shadow-md">
                <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-accent">
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
                                    <span>{activeLang === 'es' ? 'Obtener Cotización Gratis' : 'Get Free Quote Today'}</span>
                                    <ArrowRight className="w-5 h-5 ml-2.5 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </a>
                                <a 
                                    href="tel:+13522258389" 
                                    className="inline-flex justify-center items-center bg-transparent border-2 border-white text-white text-lg font-black px-8 py-5 rounded-xl uppercase tracking-widest hover:bg-white/10 transition-all shadow-md"
                                >
                                    Call +1 (352) 225-8389
                                </a>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 font-mono">
                                National Producer Number (NPN): 21228432 | Florida License: Andres Bozo
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

                {/* Embedded Contact form with progress indicators */}
                {renderContactForm()}
            </main>

            {/* Structured Local NAP Footer */}
            <Footer content={content.footer} common={content.common} onOpenLegalModal={onOpenLegalModal} />
            <WhatsAppButton ariaLabel={content.whatsappButton.ariaLabel} />
            <BackToTopButton />
            <TapToCallButton label={content.tapToCallButton.label} phone={content.tapToCallButton.phone} />
        </div>
    );
};
