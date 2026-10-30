import React from 'react';
import type { Language } from '../types';
import { translations } from '../constants/translations';
import { Header } from './Header';
import Footer from './Footer';
import { SEOHead } from './SEOHead';

interface EditorialPolicyPageProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const EditorialPolicyPage: React.FC<EditorialPolicyPageProps> = ({ language, setLanguage }) => {
    const content = translations[language];
    const isEs = language === 'es';
    
    return (
        <div className="bg-white text-dark-gray font-sans flex flex-col min-h-screen">
            <SEOHead 
                title={`${content.editorialPolicy.title} | AHB Insurance Solutions`}
                description={content.editorialPolicy.intro}
                language={language}
                ogImage="https://www.ahbinsurancesolutions.com/og-image.png"
                ogImageAlt={content.editorialPolicy.title}
                datePublished="2024-10-20"
                dateModified="2026-10-27"
            />
            <Header content={content.header} currentLang={language} setLanguage={setLanguage} />
            <main className="flex-grow pt-16 pb-20 container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-black mb-8">{content.editorialPolicy.title}</h1>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p>{content.editorialPolicy.intro}</p>
                    <h2 className="text-2xl font-bold mt-8 mb-4">{content.editorialPolicy.commitmentTitle}</h2>
                    <p>{content.editorialPolicy.commitmentText}</p>
                    <h2 className="text-2xl font-bold mt-8 mb-4">{content.editorialPolicy.independenceTitle}</h2>
                    <p>{content.editorialPolicy.independenceText}</p>
                    
                    <div className="mt-12 p-6 bg-light-gray rounded-2xl border border-gray-200">
                        <p className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">
                            {isEs ? 'Contacto de Cumplimiento' : 'Compliance Contact'}
                        </p>
                        <p className="text-xs text-gray-600">
                            {isEs 
                                ? 'Si tiene preguntas sobre nuestro proceso editorial o la precisión de nuestro contenido, contáctenos en:' 
                                : 'If you have questions about our editorial process or the accuracy of our content, contact us at:'}
                        </p>
                        <a href="mailto:andreshbozo@ahbinsurancesolutions.com" className="text-primary font-black mt-2 inline-block hover:underline">
                            andreshbozo@ahbinsurancesolutions.com
                        </a>
                    </div>
                </div>
            </main>
            <Footer content={content.footer} common={content.common} language={language} />
        </div>
    );
};

export default EditorialPolicyPage;
