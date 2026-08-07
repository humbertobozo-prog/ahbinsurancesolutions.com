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
import { LocationLandingPage } from './components/LocationLandingPage';
import { TapToCallButton } from './components/TapToCallButton';
import { TermsAndPrivacyModal } from './components/TermsAndPrivacyModal';
import { LegalPage } from './components/LegalPage';
import { ErrorBoundary } from './components/ErrorBoundary';

// Dedicated Page Imports
import { MedicarePage } from './components/MedicarePage';
import { FinalExpensePage } from './components/FinalExpensePage';
import { IULPage } from './components/IULPage';
import { BlogHubPage } from './components/BlogHubPage';
import { FAQPage } from './components/FAQPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { SEOHead } from './components/SEOHead';

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

    const landingPaths = [
        '/medicare-florida',
        '/final-expense-miami',
        '/iul-retirement-tampa',
        '/spanish-insurance-orlando'
    ];

    const legalPaths = ['/terms', '/privacy', '/terminos', '/privacidad', '/es/terminos', '/es/privacidad'];

    // Legal Pages
    if (legalPaths.includes(path)) {
        return (
            <>
                <LegalPage path={path} language={language} setLanguage={setLanguage} />
                <TermsAndPrivacyModal 
                    isOpen={legalModalOpen} 
                    onClose={() => setLegalModalOpen(false)} 
                    initialTab={legalModalTab} 
                    language={language} 
                />
            </>
        );
    }

    // Landing Pages
    if (landingPaths.includes(path)) {
        return (
            <>
                <LocationLandingPage
                    path={path}
                    language={language}
                    setLanguage={setLanguage}
                    onOpenLegalModal={handleOpenLegalModal}
                    renderContactForm={() => (
                        <ErrorBoundary componentName="ContactForm">
                            <Suspense fallback={<Spinner height="py-48" />}>
                                <ContactForm 
                                    content={translations[path === '/spanish-insurance-orlando' ? 'es' : language].contactForm} 
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
            </>
        );
    }

    // Dedicated Page Views
    let mainContentComponent: React.ReactNode;

    if (path === '/medicare' || path === '/es/medicare') {
        mainContentComponent = <MedicarePage language={language} onOpenQuote={handleNavigateToQuote} />;
    } else if (path === '/final-expense' || path === '/es/gastos-finales') {
        mainContentComponent = <FinalExpensePage language={language} onOpenQuote={handleNavigateToQuote} />;
    } else if (path === '/iul-retirement' || path === '/es/iul-jubilacion') {
        mainContentComponent = <IULPage language={language} onOpenQuote={handleNavigateToQuote} />;
    } else if (path === '/blog' || path === '/es/blog' || path.startsWith('/blog/') || path.startsWith('/es/blog/')) {
        const slug = path.startsWith('/blog/') ? path.replace('/blog/', '') : (path.startsWith('/es/blog/') ? path.replace('/es/blog/', '') : undefined);
        mainContentComponent = <BlogHubPage language={language} slug={slug} onOpenQuote={handleNavigateToQuote} />;
    } else if (path === '/faq' || path === '/es/preguntas-frecuentes') {
        mainContentComponent = <FAQPage language={language} onOpenQuote={handleNavigateToQuote} />;
    } else if (path === '/about-us' || path === '/es/nosotros') {
        mainContentComponent = <AboutPage language={language} onOpenQuote={handleNavigateToQuote} />;
    } else if (path === '/contact' || path === '/es/contacto') {
        mainContentComponent = <ContactPage language={language} />;
    } else {
        // Main Home View
        mainContentComponent = (
            <>
                <SEOHead 
                    title={content.meta.title}
                    description={content.meta.description}
                    canonicalUrl={`${baseUrl}${isEs ? '/es' : ''}`}
                    enUrl={baseUrl}
                    esUrl={`${baseUrl}/es`}
                    language={language}
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
                        <ContactForm content={content.contactForm} onOpenLegalModal={handleOpenLegalModal} />
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