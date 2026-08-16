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

    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": title,
        "description": description,
        "mainEntity": {
            "@type": ["Organization", "LocalBusiness", "InsuranceAgency"],
            "name": "AHB Insurance Solutions",
            "url": baseUrl,
            "telephone": "+1-352-225-8389",
            "email": "andreshbozo@ahbinsurancesolutions.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "5500 SW Archer Road, Apt H103",
                "addressLocality": "Gainesville",
                "addressRegion": "FL",
                "postalCode": "32607",
                "addressCountry": "US"
            }
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
                "name": isEs ? "Contacto" : "Contact Us",
                "item": canonical
            }
        ]
    };

    return (
        <div className="bg-white min-h-screen text-dark-gray font-sans pb-16">
            <SEOHead 
                title={title}
                description={description}
                canonicalUrl={canonical}
                enUrl={enUrl}
                esUrl={esUrl}
                language={language}
                schema={[contactSchema, breadcrumbSchema]}
            />

            <div className="bg-light-gray border-b border-gray-200 py-2">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Contacto y Cotización' : 'Contact & Quote'}</span>
                </div>
            </div>

            <section className="bg-primary text-white py-6 md:py-8 text-center border-b border-white/10">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                        <span className="bg-accent text-primary text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                            {isEs ? 'Atención Inmediata' : 'Immediate Support'}
                        </span>
                        <span className="bg-white/10 text-accent border border-accent/30 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                            NPN: 21228432
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black font-heading mb-2">
                        {isEs ? 'Contacto y Solicitud de Cotización' : 'Contact Us & Free Quote Request'}
                    </h1>
                    <p className="text-gray-200 text-xs md:text-sm font-medium max-w-xl mx-auto">
                        {isEs ? 'Complete sus datos para recibir una comparación objetiva sin costo ni compromiso.' : 'Fill out the simple form to receive a free multi-carrier rate comparison.'}
                    </p>
                </div>
            </section>

            <ContactForm content={content.contactForm} language={language} />
        </div>
    );
};
