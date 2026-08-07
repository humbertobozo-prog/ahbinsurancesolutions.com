import React from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { ContactForm } from './ContactForm';
import { translations } from '../constants/translations';

interface ContactPageProps {
    language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/contacto' : '/contact'}`;
    const enUrl = `${baseUrl}/contact`;
    const esUrl = `${baseUrl}/es/contacto`;

    const title = isEs 
        ? 'Contacto y Cotización Gratis | AHB Insurance Solutions Florida' 
        : 'Contact Us & Free Quote | AHB Insurance Solutions Florida';

    const description = isEs 
        ? 'Solicite su cotización gratuita de Medicare, Gastos Finales e IUL. Hable directamente con el corredor Andrés H. Bozo al (352) 225-8389.' 
        : 'Request your free quote for Medicare, Final Expense, or IUL. Speak directly with broker Andres H. Bozo at (352) 225-8389.';

    const content = translations[language];

    return (
        <div className="bg-white min-h-screen text-dark-gray font-sans pb-16">
            <SEOHead 
                title={title}
                description={description}
                canonicalUrl={canonical}
                enUrl={enUrl}
                esUrl={esUrl}
                language={language}
            />

            <div className="bg-light-gray border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Contacto y Cotización' : 'Contact & Quote'}</span>
                </div>
            </div>

            <section className="bg-primary text-white py-12 md:py-16 text-center">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <span className="bg-accent text-primary text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                        {isEs ? 'Atención Inmediata' : 'Immediate Support'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black font-heading mb-4">
                        {isEs ? 'Contacto y Solicitud de Cotización' : 'Contact Us & Free Quote Request'}
                    </h1>
                    <p className="text-gray-200 text-sm md:text-base font-medium">
                        {isEs ? 'Complete sus datos para recibir una comparación objetiva sin costo ni compromiso.' : 'Fill out the simple form to receive a free multi-carrier rate comparison.'}
                    </p>
                </div>
            </section>

            <ContactForm content={content.contactForm} />
        </div>
    );
};
