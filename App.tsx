import React, { useState, useEffect, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KeyTakeaways } from './components/KeyTakeaways';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { translations } from './constants/translations';
import type { Language } from './types';
import { Spinner } from './components/Spinner';
import { BackToTopButton } from './components/BackToTopButton';
import { TapToCallButton } from './components/TapToCallButton';
import { TermsAndPrivacyModal } from './components/TermsAndPrivacyModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SEOHead } from './components/SEOHead';

// Dedicated Lazy Page Imports
const MedicarePage = React.lazy(() => import('./components/MedicarePage').then(m => ({ default: m.MedicarePage })));
const FinalExpensePage = React.lazy(() => import('./components/FinalExpensePage').then(m => ({ default: m.FinalExpensePage })));
const IULPage = React.lazy(() => import('./components/IULPage').then(m => ({ default: m.IULPage })));
const BlogHubPage = React.lazy(() => import('./components/BlogHubPage').then(m => ({ default: m.BlogHubPage })));
const BlogGenerator = React.lazy(() => import('./components/BlogGenerator').then(m => ({ default: m.BlogGenerator })));
const FAQPage = React.lazy(() => import('./components/FAQPage').then(m => ({ default: m.FAQPage })));
const AboutPage = React.lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const LocationLandingPage = React.lazy(() => import('./components/LocationLandingPage').then(m => ({ default: m.LocationLandingPage })));
const LegalPage = React.lazy(() => import('./components/LegalPage').then(m => ({ default: m.LegalPage })));
const CityGuides = React.lazy(() => import('./components/CityGuides').then(m => ({ default: m.CityGuides })));

const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));
const AboutUs = React.lazy(() => import('./components/AboutUs').then(module => ({ default: module.AboutUs })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const TrustBadges = React.lazy(() => import('./components/TrustBadges').then(module => ({ default: module.TrustBadges })));
const ComplianceLinks = React.lazy(() => import('./components/ComplianceLinks').then(module => ({ default: module.ComplianceLinks })));
const ContactForm = React.lazy(() => import('./components/ContactForm').then(module => ({ default: module.ContactForm })));

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [path, setPath] = useState(window.location.pathname);
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
            const currentPath = window.location.pathname;
            setPath(currentPath);

            const isSpanishPath = currentPath.startsWith('/es') || 
                currentPath === '/spanish-insurance-orlando' || 
                currentPath === '/terminos' || 
                currentPath === '/privacidad';

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
        '/medicare-florida',
        '/medicare-supplement-florida',
        '/es/suplemento-medicare-florida',
        '/es/seguro-medicare-florida',
        '/final-expense-miami',
        '/burial-insurance-tampa',
        '/es/seguro-gastos-finales-tampa',
        '/es/seguro-gastos-finales-florida',
        '/iul-retirement-tampa',
        '/spanish-insurance-orlando',
        '/annuities-florida',
        '/es/anualidades-florida',
        '/annuities',
        '/es/anualidades',
        '/dental-vision-florida',
        '/es/dental-vision-florida'
    ];

    const legalPaths = ['/terms', '/privacy', '/terminos', '/privacidad', '/es/terminos', '/es/privacidad'];

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

    if (cleanPath === '/medicare' || cleanPath === '/es/medicare') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><MedicarePage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/final-expense' || cleanPath === '/es/gastos-finales') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><FinalExpensePage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/iul-retirement' || cleanPath === '/es/iul-jubilacion') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><IULPage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/blog' || cleanPath === '/es/blog' || cleanPath.startsWith('/blog/') || cleanPath.startsWith('/es/blog/')) {
        const slug = cleanPath.startsWith('/blog/') ? cleanPath.replace('/blog/', '') : (cleanPath.startsWith('/es/blog/') ? cleanPath.replace('/es/blog/', '') : undefined);
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><BlogHubPage language={language} slug={slug} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/blog-generator' || cleanPath === '/es/generador-blog') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><BlogGenerator language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/city-guides' || cleanPath === '/es/guias-ciudades' || cleanPath.startsWith('/cities/') || cleanPath.startsWith('/es/ciudades/')) {
        const citySlug = cleanPath.startsWith('/cities/') ? cleanPath.replace('/cities/', '') : (cleanPath.startsWith('/es/ciudades/') ? cleanPath.replace('/es/ciudades/', '') : undefined);
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><CityGuides language={language} initialCitySlug={citySlug} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/faq' || cleanPath === '/es/preguntas-frecuentes') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><FAQPage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/about-us' || cleanPath === '/es/nosotros') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><AboutPage language={language} onOpenQuote={handleNavigateToQuote} /></Suspense>;
    } else if (cleanPath === '/contact' || cleanPath === '/es/contacto') {
        mainContentComponent = <Suspense fallback={<Spinner height="py-48" />}><ContactPage language={language} /></Suspense>;
    } else {
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
                    canonicalUrl={`${baseUrl}${isEs ? '/es' : ''}`}
                    enUrl={baseUrl}
                    esUrl={`${baseUrl}/es`}
                    language={language}
                    schema={homeBreadcrumbSchema}
                />
                <Hero content={content.hero} />
                <KeyTakeaways content={content.keyTakeaways} />
                
                <ErrorBoundary componentName="Services">
                    <Suspense fallback={<Spinner height="py-32" />}>
                        <Services content={content.services} />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary componentName="AboutUs">
                    <Suspense fallback={<Spinner height="py-40" />}>
                        <AboutUs content={content.aboutUs} common={content.common} />
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
            <Footer content={content.footer} common={content.common} onOpenLegalModal={handleOpenLegalModal} />
            <WhatsAppButton ariaLabel={content.whatsappButton.ariaLabel} />
            <BackToTopButton />
            <TapToCallButton label={content.tapToCallButton?.label || (isEs ? 'Llamar al Broker' : 'Call Licensed Broker')} phone={content.tapToCallButton?.phone || '+13522258389'} />
            <TermsAndPrivacyModal 
                isOpen={legalModalOpen} 
                onClose={() => setLegalModalOpen(false)} 
                initialTab={legalModalTab} 
                language={language} 
            />
        </div>
    );
};

export default App;