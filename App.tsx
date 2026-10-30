import React, { useState, useEffect, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KeyTakeaways } from './components/KeyTakeaways';
const Footer = React.lazy(() => import('./components/Footer'));
import { WhatsAppButton } from './components/WhatsAppButton';
import { translations } from './constants/translations';
import type { Language } from './types';
import { Spinner } from './components/Spinner';
import { BackToTopButton } from './components/BackToTopButton';
import { TapToCallButton } from './components/TapToCallButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SEOHead } from './components/SEOHead';

// Slugs for fast routing without bundling hundreds of KB of data into the main chunk
const VALID_BLOG_SLUGS = new Set([
    'medicare-open-enrollment-florida-2026',
    'medicare-inscripcion-abierta-florida-2026',
    'final-expense-burial-costs-florida',
    'costos-funerales-gastos-finales-florida',
    'iul-vs-401k-tax-free-retirement',
    'iul-vs-401k-jubilacion-libre-de-impuestos'
]);

const VALID_CITY_SLUGS = new Set([
    'miami',
    'orlando',
    'tampa',
    'jacksonville',
    'st-petersburg',
    'hialeah',
    'tallahassee'
]);

const TermsAndPrivacyModal = React.lazy(() => import('./components/TermsAndPrivacyModal'));

// Dedicated Lazy Page Imports
const MedicarePage = React.lazy(() => import('./components/MedicarePage'));
const FinalExpensePage = React.lazy(() => import('./components/FinalExpensePage'));
const IULPage = React.lazy(() => import('./components/IULPage'));
const AnnuitiesPage = React.lazy(() => import('./components/AnnuitiesPage'));
const BlogHubPage = React.lazy(() => import('./components/BlogHubPage'));
const FAQPage = React.lazy(() => import('./components/FAQPage'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));
const LocationLandingPage = React.lazy(() => import('./components/LocationLandingPage'));
const GainesvilleLocationPage = React.lazy(() => import('./components/GainesvilleLocationPage'));
const LegalPage = React.lazy(() => import('./components/LegalPage'));
const CityGuides = React.lazy(() => import('./components/CityGuides'));
const EditorialPolicyPage = React.lazy(() => import('./components/EditorialPolicyPage'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));

const Services = React.lazy(() => import('./components/Services'));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs'));
const AboutUs = React.lazy(() => import('./components/AboutUs'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const TrustBadges = React.lazy(() => import('./components/TrustBadges'));
const ComplianceLinks = React.lazy(() => import('./components/ComplianceLinks'));
const ContactForm = React.lazy(() => import('./components/ContactForm'));

const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    const p = window.location.pathname;
    return (p.startsWith('/es') || p === '/spanish-insurance-orlando') ? 'es' : 'en';
};

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>(getInitialLanguage);
    const [path, setPath] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/'));
    const [legalModalOpen, setLegalModalOpen] = useState(false);
    const [legalModalTab, setLegalModalTab] = useState<'terms' | 'privacy'>('terms');

    const handleOpenLegalModal = (tab: 'terms' | 'privacy') => {
        setLegalModalTab(tab);
        setLegalModalOpen(true);
    };

    const handleNavigateToQuote = () => {
        window.history.pushState({}, '', language === 'es' ? '/es/contacto' : '/contact');
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const syncPathAndLang = () => {
            let currentPath = window.location.pathname;

            // Client-side instant normalization for legacy URLs
            if (currentPath === '/medicare' || currentPath === '/medicare/' || currentPath === '/medicare-supplement-florida') {
                window.history.replaceState({}, '', '/medicare-florida');
                currentPath = '/medicare-florida';
            } else if (currentPath === '/es/medicare' || currentPath === '/es/medicare/' || currentPath === '/es/suplemento-medicare-florida') {
                window.history.replaceState({}, '', '/es/seguro-medicare-florida');
                currentPath = '/es/seguro-medicare-florida';
            } else if (currentPath === '/iul' || currentPath === '/iul/' || currentPath === '/iul-florida' || currentPath === '/iul-florida/') {
                window.history.replaceState({}, '', '/iul-retirement');
                currentPath = '/iul-retirement';
            } else if (currentPath === '/es/iul' || currentPath === '/es/iul/' || currentPath === '/es/iul-florida' || currentPath === '/es/iul-florida/' || currentPath === '/iul-jubilacion') {
                window.history.replaceState({}, '', '/es/iul-jubilacion');
                currentPath = '/es/iul-jubilacion';
            } else if (currentPath === '/annuities' || currentPath === '/annuities/') {
                window.history.replaceState({}, '', '/annuities-florida');
                currentPath = '/annuities-florida';
            } else if (currentPath === '/es/anualidades' || currentPath === '/es/anualidades/') {
                window.history.replaceState({}, '', '/es/anualidades-florida');
                currentPath = '/es/anualidades-florida';
            } else if (currentPath === '/terminos' || currentPath === '/terminos/') {
                window.history.replaceState({}, '', '/es/terminos');
                currentPath = '/es/terminos';
            } else if (currentPath === '/privacidad' || currentPath === '/privacidad/') {
                window.history.replaceState({}, '', '/es/privacidad');
                currentPath = '/es/privacidad';
            } else if (currentPath === '/politica-editorial' || currentPath === '/es/politica-editorial' || currentPath === '/es/politica-editorial/') {
                window.history.replaceState({}, '', '/es/politica-editorial');
                currentPath = '/es/politica-editorial';
            }

            setPath(currentPath);

            const isSpanishPath = currentPath.startsWith('/es') || 
                currentPath === '/spanish-insurance-orlando';

            setLanguage(isSpanishPath ? 'es' : 'en');
        };

        syncPathAndLang();
        window.addEventListener('popstate', syncPathAndLang);
        return () => window.removeEventListener('popstate', syncPathAndLang);
    }, []);

    const content = translations[language];
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';

    const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;

    const landingPaths = [
        '/final-expense-miami',
        '/burial-insurance-tampa',
        '/es/seguro-gastos-finales-tampa',
        '/es/seguro-gastos-finales-florida',
        '/iul-retirement-tampa',
        '/es/iul-jubilacion-tampa',
        '/orlando-spanish-insurance',
        '/spanish-insurance-orlando',
        '/dental-vision-florida',
        '/es/dental-vision-florida'
    ];

    const legalPaths = ['/terms', '/privacy', '/es/terminos', '/es/privacidad'];

    // Legal Pages
    if (legalPaths.includes(cleanPath)) {
        return (
            <Suspense fallback={<Spinner height="py-48" />}>
                <LegalPage path={cleanPath} language={language} setLanguage={setLanguage} />
                <TermsAndPrivacyModal 
                    isOpen={legalModalOpen} 
                    onClose={() => setLegalModalOpen(false)} 
                    initialTab={legalModalTab} 
                    language={language} 
                />
            </Suspense>
        );
    }

    // Landing Pages
    if (landingPaths.includes(cleanPath)) {
        return (
            <Suspense fallback={<Spinner height="py-48" />}>
                <LocationLandingPage
                    path={cleanPath}
                    language={language}
                    setLanguage={setLanguage}
                    onOpenLegalModal={handleOpenLegalModal}
                    renderContactForm={() => (
                        <ErrorBoundary componentName="ContactForm">
                            <Suspense fallback={<Spinner height="py-48" />}>
                                <ContactForm 
                                    content={translations[cleanPath === '/spanish-insurance-orlando' ? 'es' : language].contactForm} 
                                    onOpenLegalModal={handleOpenLegalModal}
                                />
                            </Suspense>
                        </ErrorBoundary>
                    )}
                />
                <TermsAndPrivacyModal 
                    isOpen={legalModalOpen} 
                    onClose={() => setLegalModalOpen(false)} 
                    initialTab={legalModalTab} 
                    language={language} 
                />
            </Suspense>
        );
    }

    // Dedicated Page Views
    let mainContentComponent: React.ReactNode;

    if (
        cleanPath === '/medicare-florida' || 
        cleanPath === '/es/seguro-medicare-florida' ||
        cleanPath === '/medicare' || 
        cleanPath === '/es/medicare' ||
        cleanPath === '/medicare-supplement-florida' ||
        cleanPath === '/es/suplemento-medicare-florida'
    ) {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><MedicarePage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/final-expense' || cleanPath === '/es/gastos-finales') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><FinalExpensePage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (
        cleanPath === '/iul-retirement' || 
        cleanPath === '/es/iul-jubilacion' ||
        cleanPath === '/iul' ||
        cleanPath === '/es/iul' ||
        cleanPath === '/iul-florida' ||
        cleanPath === '/es/iul-florida' ||
        cleanPath === '/iul-jubilacion'
    ) {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><IULPage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/annuities-florida' || cleanPath === '/es/anualidades-florida' || cleanPath === '/annuities' || cleanPath === '/es/anualidades') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><AnnuitiesPage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/blog' || cleanPath === '/es/blog' || cleanPath.startsWith('/blog/') || cleanPath.startsWith('/es/blog/')) {
        const slug = cleanPath.startsWith('/blog/') ? cleanPath.replace('/blog/', '') : (cleanPath.startsWith('/es/blog/') ? cleanPath.replace('/es/blog/', '') : undefined);
        const postExists = !slug || VALID_BLOG_SLUGS.has(slug);
        if (!postExists) {
            mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><NotFoundPage language={language} /></Suspense>;
        } else {
            mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><BlogHubPage language={language} slug={slug} onOpenQuote={handleNavigateToQuote} /></Suspense>;
        }
    } else if (cleanPath === '/city-guides' || cleanPath === '/es/guias-ciudades' || cleanPath.startsWith('/cities/') || cleanPath.startsWith('/es/ciudades/')) {
        const citySlug = cleanPath.startsWith('/cities/') ? cleanPath.replace('/cities/', '') : (cleanPath.startsWith('/es/ciudades/') ? cleanPath.replace('/es/ciudades/', '') : undefined);
        const cityExists = !citySlug || VALID_CITY_SLUGS.has(citySlug);
        if (!cityExists) {
            mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><NotFoundPage language={language} /></Suspense>;
        } else {
            mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><CityGuides language={language} initialCitySlug={citySlug} onOpenQuote={handleNavigateToQuote} /></Suspense>;
        }
    } else if (
        cleanPath === '/locations/gainesville-fl' || 
        cleanPath === '/es/locations/gainesville-fl' ||
        cleanPath === '/es/localidades/gainesville-fl' ||
        cleanPath === '/gainesville-fl-insurance' ||
        cleanPath === '/es/seguros-gainesville-fl'
    ) {
        mainContentComponent = (
            <Suspense fallback={<Spinner height="py-48" />}>
                <GainesvilleLocationPage 
                    language={language} 
                    setLanguage={setLanguage}
                    renderContactForm={() => (
                        <ErrorBoundary componentName="ContactForm">
                            <Suspense fallback={<Spinner height="py-48" />}>
                                <ContactForm 
                                    content={translations[language].contactForm} 
                                    onOpenLegalModal={handleOpenLegalModal}
                                />
                            </Suspense>
                        </ErrorBoundary>
                    )}
                    onOpenLegalModal={handleOpenLegalModal}
                />
                <TermsAndPrivacyModal 
                    isOpen={legalModalOpen} 
                    onClose={() => setLegalModalOpen(false)} 
                    initialTab={legalModalTab} 
                    language={language} 
                />
            </Suspense>
        );
    } else if (cleanPath === '/faq' || cleanPath === '/es/preguntas-frecuentes') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><FAQPage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/about-us' || cleanPath === '/es/nosotros' || cleanPath === '/about-andres-bozo' || cleanPath === '/es/sobre-andres-bozo') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><AboutPage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/contact' || cleanPath === '/es/contacto') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><ContactPage language={language} /></Suspense>;
    } else if (cleanPath === '/editorial-policy' || cleanPath === '/es/politica-editorial') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><EditorialPolicyPage language={language} setLanguage={setLanguage} /></Suspense>;
    } else if (cleanPath === '/' || cleanPath === '/es' || cleanPath === '') {
        // Main Home View
        const homeBreadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": isEs ? "Inicio" : "Home",
                    "item": `${baseUrl}${isEs ? '/es' : ''}`
                }
            ]
        };

        mainContentComponent = (
            <>
                <SEOHead 
                    title={content.meta.title}
                    description={content.meta.description}
                    pathname={path}
                    language={language}
                    ogImage={`${baseUrl}/og-image.png`}
                    ogImageAlt={isEs ? "AHB Insurance Solutions - Especialistas en Medicare, Gastos Finales e IUL en Florida" : "AHB Insurance Solutions - Florida Medicare, Final Expense and IUL Specialists"}
                    datePublished="2024-01-15"
                    dateModified="2026-10-10"
                    schema={homeBreadcrumbSchema}
                />
                <Hero content={content.hero} language={language} />
                <KeyTakeaways content={content.keyTakeaways} />
                
                <ErrorBoundary componentName="Services">
                    <Suspense fallback={<Spinner height="py-32" />}>
                        <Services 
                            content={content.services} 
                            language={language} 
                        />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary componentName="AboutUs">
                    <Suspense fallback={<Spinner height="py-40" />}>
                        <AboutUs content={content.aboutUs} common={content.common} priority={true} />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary componentName="WhyChooseUs">
                    <Suspense fallback={<Spinner height="py-24" />}>
                        <WhyChooseUs content={content.whyChooseUs} />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary componentName="Testimonials">
                    <Suspense fallback={<Spinner height="py-32" />}>
                        <Testimonials content={content.testimonials} />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary componentName="TrustBadges">
                    <Suspense fallback={<Spinner height="py-24" />}>
                        <TrustBadges content={content.trustBadges} />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary componentName="ContactForm">
                    <Suspense fallback={<Spinner height="py-48" />}>
                        <ContactForm content={content.contactForm} language={language} onOpenLegalModal={handleOpenLegalModal} />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary componentName="ComplianceLinks">
                    <Suspense fallback={<Spinner height="py-20" />}>
                        <ComplianceLinks content={content.authoritativeLinks} />
                    </Suspense>
                </ErrorBoundary>
            </>
        );
    } else {
        // Explicit 404 Not Found View
        mainContentComponent = (
            <Suspense fallback={<Spinner height="py-48" />}>
                <NotFoundPage language={language} />
            </Suspense>
        );
    }

    return (
        <div className="bg-white text-dark-gray font-sans flex flex-col min-h-screen pb-20 md:pb-0">
            <Header
                content={content.header}
                currentLang={language}
                setLanguage={setLanguage}
            />
            <main className="flex-grow">
                {mainContentComponent}
            </main>
            <Suspense fallback={<div className="h-[400px]" />}>
                <Footer content={content.footer} common={content.common} language={language} onOpenLegalModal={handleOpenLegalModal} />
            </Suspense>
            <WhatsAppButton ariaLabel={content.whatsappButton.ariaLabel} language={language} />
            <BackToTopButton />
            <TapToCallButton label={content.tapToCallButton?.label || (isEs ? 'Llamar al Broker' : 'Call Licensed Broker')} phone={content.tapToCallButton?.phone || '+13522258389'} />
            {legalModalOpen && (
                <Suspense fallback={null}>
                    <TermsAndPrivacyModal 
                        isOpen={legalModalOpen} 
                        onClose={() => setLegalModalOpen(false)} 
                        initialTab={legalModalTab} 
                        language={language} 
                    />
                </Suspense>
            )}
        </div>
    );
};

export default App;