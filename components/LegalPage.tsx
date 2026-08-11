import React, { useState, useEffect } from 'react';
import type { Language } from '../types';
import { legalContent } from '../constants/legalContent';
import { Header } from './Header';
import { Footer } from './Footer';
import { translations } from '../constants/translations';
import { SEOHead } from './SEOHead';

interface LegalPageProps {
    path: string;
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ path, language, setLanguage }) => {
    // Determine tab based on state override or path
    const [userTab, setUserTab] = useState<'terms' | 'privacy' | null>(null);
    const activeTab: 'terms' | 'privacy' = userTab ?? ((path === '/privacy' || path === '/privacidad') ? 'privacy' : 'terms');

    const doc = legalContent[language][activeTab];
    const content = translations[language];

    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const isEs = language === 'es';
    const isTerms = activeTab === 'terms';

    const enUrl = `${baseUrl}/${isTerms ? 'terms' : 'privacy'}`;
    const esUrl = `${baseUrl}/es/${isTerms ? 'terminos' : 'privacidad'}`;
    const canonical = isEs ? esUrl : enUrl;

    useEffect(() => {
        document.documentElement.lang = language;
        document.title = `${doc.title} | AHB Insurance Solutions Florida`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [language, doc, activeTab]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-white text-dark-gray font-sans flex flex-col min-h-screen">
            <SEOHead 
                title={`${doc.title} | AHB Insurance Solutions Florida`}
                description={isTerms ? 'Terms of Service for AHB Insurance Solutions.' : 'Privacy Policy for AHB Insurance Solutions.'}
                canonicalUrl={canonical}
                enUrl={enUrl}
                esUrl={esUrl}
                language={language}
            />
            <Header content={content.header} currentLang={language} setLanguage={setLanguage} />

            <main className="flex-grow pt-8 pb-16">
                {/* Hero Header */}
                <section className="bg-primary text-white py-12 md:py-16 mb-12 relative overflow-hidden border-b-4 border-accent">
                    <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                        <div className="flex items-center gap-3 mb-4">
                            <a 
                                href="/" 
                                className="inline-flex items-center text-xs font-bold bg-white/10 hover:bg-white/20 text-accent px-3 py-1.5 rounded-full border border-white/20 transition-all"
                            >
                                ← {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
                            </a>
                            <span className="text-xs font-black uppercase tracking-widest text-gray-300">
                                License NPN: 21228432
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight mb-4 text-white">
                            {doc.title}
                        </h1>

                        <p className="text-sm md:text-base text-gray-200 font-medium max-w-2xl leading-relaxed mb-6">
                            {language === 'es' 
                                ? 'Consulte aquí los detalles legales completos, términos de intermediación de seguros, cumplimiento de CMS Medicare, consentimientos TCPA y políticas de privacidad de datos de AHB Insurance Solutions.'
                                : 'Review the complete legal details, insurance brokerage terms, CMS Medicare compliance statements, TCPA communications consent, and data privacy policies for AHB Insurance Solutions.'}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 border-t border-white/10 pt-4">
                            <span className="font-bold text-accent">{doc.lastUpdated}</span>
                            <span>•</span>
                            <span>State of Florida Licensed Insurance Agency</span>
                            <span>•</span>
                            <button 
                                onClick={handlePrint}
                                className="inline-flex items-center gap-1 hover:text-accent font-bold underline transition-colors"
                            >
                                🖨️ {language === 'es' ? 'Imprimir Documento Completo' : 'Print Full Document'}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Tab Switcher */}
                <div className="container mx-auto px-6 max-w-5xl mb-8">
                    <div className="bg-light-gray p-2 rounded-2xl border border-gray-200 flex flex-wrap gap-2">
                        <button
                            onClick={() => {
                                setUserTab('terms');
                                window.history.pushState({}, '', language === 'es' ? '/terminos' : '/terms');
                            }}
                            className={`flex-1 min-w-[200px] py-3 px-6 rounded-xl text-sm md:text-base font-black transition-all uppercase tracking-wider ${
                                activeTab === 'terms'
                                    ? 'bg-primary text-white shadow-lg border-2 border-accent/20'
                                    : 'text-gray-700 hover:text-primary hover:bg-gray-200/50'
                            }`}
                        >
                            📋 {language === 'es' ? 'Términos de Servicio' : 'Terms of Service'}
                        </button>
                        <button
                            onClick={() => {
                                setUserTab('privacy');
                                window.history.pushState({}, '', language === 'es' ? '/privacidad' : '/privacy');
                            }}
                            className={`flex-1 min-w-[200px] py-3 px-6 rounded-xl text-sm md:text-base font-black transition-all uppercase tracking-wider ${
                                activeTab === 'privacy'
                                    ? 'bg-primary text-white shadow-lg border-2 border-accent/20'
                                    : 'text-gray-700 hover:text-primary hover:bg-gray-200/50'
                            }`}
                        >
                            🔒 {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
                        </button>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Table of Contents Sidebar */}
                        <aside className="lg:col-span-4 hidden lg:block">
                            <div className="sticky top-28 bg-light-gray p-6 rounded-3xl border border-gray-200 shadow-sm">
                                <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 border-b border-gray-300 pb-2">
                                    {language === 'es' ? 'Índice de Secciones' : 'Table of Contents'}
                                </h3>
                                <nav className="space-y-2">
                                    {doc.sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className="w-full text-left text-xs font-bold text-gray-700 hover:text-primary hover:bg-white p-2 rounded-xl transition-all block truncate"
                                        >
                                            {section.heading}
                                        </button>
                                    ))}
                                </nav>

                                <div className="mt-8 p-4 bg-primary text-white rounded-2xl border border-primary/20 text-xs space-y-2">
                                    <p className="font-bold text-accent uppercase tracking-wider">AHB Direct Contact</p>
                                    <p className="text-gray-300">Need legal or compliance clarification?</p>
                                    <a 
                                        href="mailto:info@ahbinsurancesolutions.com" 
                                        className="inline-block text-accent font-bold hover:underline"
                                    >
                                        info@ahbinsurancesolutions.com
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Legal Sections */}
                        <article className="lg:col-span-8 bg-white p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-10">
                            {doc.sections.map((section) => (
                                <section 
                                    key={section.id} 
                                    id={section.id} 
                                    className="scroll-mt-32 border-b border-gray-100 pb-8 last:border-b-0 last:pb-0"
                                >
                                    <h2 className="text-xl md:text-2xl font-black font-heading text-primary mb-4 leading-snug">
                                        {section.heading}
                                    </h2>

                                    {/* Highlight CMS Medicare Disclaimer box */}
                                    {section.id === 'medicare-disclaimer' && (
                                        <div className="p-5 my-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-amber-950 font-bold text-xs md:text-sm leading-relaxed shadow-sm">
                                            ⚠️ <span className="uppercase tracking-wide font-black">CMS Compliance Notice:</span>
                                            <p className="mt-1 italic">{section.content[1]}</p>
                                        </div>
                                    )}

                                    {/* Highlight Strict Non-Sale of Data box */}
                                    {section.id === 'no-data-sale' && (
                                        <div className="p-5 my-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-emerald-950 font-bold text-xs md:text-sm leading-relaxed shadow-sm">
                                            🛡️ <span className="uppercase tracking-wide font-black">100% Data Protection Guarantee:</span>
                                            <p className="mt-1">{section.content[0]}</p>
                                        </div>
                                    )}

                                    <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                                        {section.content.map((paragraph, pIdx) => (
                                            <p key={pIdx}>{paragraph}</p>
                                        ))}

                                        {section.bulletPoints && (
                                            <ul className="list-disc pl-5 space-y-2 text-gray-800">
                                                {section.bulletPoints.map((bp, bpIdx) => (
                                                    <li key={bpIdx}>{bp}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </section>
                            ))}

                            {/* Contact Box */}
                            <div className="p-6 bg-light-gray rounded-2xl border border-gray-200 text-center space-y-3">
                                <h3 className="text-lg font-black text-primary font-heading uppercase tracking-wide">
                                    {language === 'es' ? '¿Tiene Dudas Legales o sobre sus Datos?' : 'Questions About Our Legal Terms?'}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 font-medium">
                                    {language === 'es' 
                                        ? 'Atendemos con gusto sus inquietudes de privacidad y cumplimiento. Estamos para servirle.'
                                        : 'We are glad to address any compliance or privacy concerns. We are here to help.'}
                                </p>
                                <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-bold">
                                    <a href="tel:13522258389" className="bg-accent text-primary px-5 py-2.5 rounded-xl hover:bg-[#FFB81C] transition-colors">
                                        📞 +1 (352) 225-8389
                                    </a>
                                    <a href="mailto:info@ahbinsurancesolutions.com" className="bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-secondary transition-colors">
                                        ✉️ info@ahbinsurancesolutions.com
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </main>

            <Footer content={content.footer} common={content.common} />
        </div>
    );
};
