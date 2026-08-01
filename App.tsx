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
    const content = translations[language];

    const handleOpenLegalModal = (tab: 'terms' | 'privacy') => {
        setLegalModalTab(tab);
        setLegalModalOpen(true);
    };

    useEffect(() => {
        const handleLocationChange = () => {
            setPath(window.location.pathname);
        };
        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    useEffect(() => {
        // Sync language and metadata for standard pages
        const landingPaths = [
            '/medicare-florida',
            '/final-expense-miami',
            '/iul-retirement-tampa',
            '/spanish-insurance-orlando'
        ];
        
        if (!landingPaths.includes(path)) {
            document.documentElement.lang = language;
            document.title = content.meta.title;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', content.meta.description);
            }
        }

        // Dynamic Canonical Tag Handling
        const updateCanonical = () => {
            const canonicalElement = document.getElementById('canonical-link') as HTMLLinkElement;
            if (canonicalElement) {
                const baseUrl = 'https://www.ahbinsurancesolutions.com';
                const currentPath = window.location.pathname === '/' ? '' : window.location.pathname;
                canonicalElement.href = `${baseUrl}${currentPath}`;
            }
        };

        updateCanonical();
        window.addEventListener('popstate', updateCanonical);
        return () => window.removeEventListener('popstate', updateCanonical);
    }, [language, content, path]);

    const landingPaths = [
        '/medicare-florida',
        '/final-expense-miami',
        '/iul-retirement-tampa',
        '/spanish-insurance-orlando'
    ];
    
    const activeLanguage = (path === '/spanish-insurance-orlando') ? 'es' : language;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": activeLanguage === 'es' ? [
            {
                "@type": "Question",
                "name": "¿Qué es un plan Suplementario de Medicare (Medigap)?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Los planes Suplementarios de Medicare (Medigap) son pólizas de seguro privadas que ayudan a pagar algunos de los costos de bolsillo no cubiertos por el Medicare Original, como copagos, coseguros y deducibles. Esto le permite tener costos de salud más predecibles."
                }
            },
            {
                "@type": "Question",
                "name": "¿Qué cubre el Seguro de Gastos Finales o de Entierro?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "El Seguro de Gastos Finales (también conocido como seguro de entierro o de funeral) es una póliza de seguro de vida entera diseñada específicamente para cubrir los costos funerarios, gastos de entierro y facturas médicas pendientes. Ofrece aceptación garantizada para personas mayores sin necesidad de exámenes médicos complejos."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cómo funciona una póliza de Vida Universal Indexada (IUL)?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Una póliza de Vida Universal Indexada (IUL) ofrece protección de seguro de vida permanente combinada con un componente de valor en efectivo que crece según el rendimiento de un índice de mercado (como el S&P 500). Cuenta con un piso del 0% para proteger su principal de pérdidas de mercado y permite retirar fondos libres de impuestos para su jubilación."
                }
            },
            {
                "@type": "Question",
                "name": "¿Por qué debería contratar un seguro a través de un corredor (broker) independiente?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Como corredores independientes licenciados en AHB Insurance Solutions, lo representamos a usted, no a las compañías de seguros. Comparamos opciones con más de 80 aseguradoras líderes para encontrar el mejor plan y precio que se adapte a su perfil y presupuesto, ofreciéndole una consulta 100% gratuita y sin compromiso."
                }
            }
        ] : [
            {
                "@type": "Question",
                "name": "What is a Medicare Supplement (Medigap) plan?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Medicare Supplement (Medigap) plans are private insurance policies that help pay for some of the out-of-pocket costs not covered by Original Medicare, such as copayments, coinsurance, and deductibles, giving you more predictable healthcare costs."
                }
            },
            {
                "@type": "Question",
                "name": "What does Final Expense (Burial) Insurance cover?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Final Expense or Burial Insurance is a whole life insurance policy designed specifically to cover funeral service costs, burial fees, and outstanding medical bills. This protects your loved ones from sudden financial burdens. Many plans offer guaranteed acceptance with no medical exams required."
                }
            },
            {
                "@type": "Question",
                "name": "How does an Indexed Universal Life (IUL) policy work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "An Indexed Universal Life (IUL) policy provides permanent life insurance protection coupled with a cash value account that grows based on the performance of a stock market index (such as the S&P 500). It includes a 0% interest rate floor to shield your principal from market losses and allows for tax-free retirement income withdrawals."
                }
            },
            {
                "@type": "Question",
                "name": "Why should I use an independent insurance broker?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "As independent licensed brokers, AHB Insurance Solutions represents you, not the insurance carriers. We compare benefits and premium rates across 80+ top carriers to find the perfect plan for your unique health and financial needs at no extra cost to you."
                }
            }
        ]
    };

    const legalPaths = ['/terms', '/privacy', '/terminos', '/privacidad'];

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

    if (landingPaths.includes(path)) {
        return (
            <>
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
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

    return (
        <div className="bg-white text-dark-gray font-sans flex flex-col min-h-screen pb-20 md:pb-0">
            <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header
                content={content.header}
                currentLang={language}
                setLanguage={setLanguage}
            />
            <main className="flex-grow">
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
            </main>
            <Footer content={content.footer} common={content.common} onOpenLegalModal={handleOpenLegalModal} />
            <WhatsAppButton ariaLabel={content.whatsappButton.ariaLabel} />
            <BackToTopButton />
            <TapToCallButton label={content.tapToCallButton.label} phone={content.tapToCallButton.phone} />
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