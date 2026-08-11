import React from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { AboutUs } from './AboutUs';
import { WhyChooseUs } from './WhyChooseUs';
import { translations } from '../constants/translations';

interface AboutPageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/nosotros' : '/about-us'}`;
    const enUrl = `${baseUrl}/about-us`;
    const esUrl = `${baseUrl}/es/nosotros`;

    const title = isEs 
        ? 'Sobre Nosotros y Broker Andrés H. Bozo | AHB Insurance Solutions' 
        : 'About Us & Licensed Broker Andres H. Bozo | AHB Insurance Solutions';

    const description = isEs 
        ? 'Conozca a Andrés H. Bozo (NPN 21228432), corredor independiente especializado en Medicare y Seguros de Vida en Florida. Más de 80 aseguradoras.' 
        : 'Meet Andres H. Bozo (NPN 21228432), independent insurance broker specializing in Florida Medicare and Life Insurance. 80+ top carriers.';

    const content = translations[language];

    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": title,
        "description": description,
        "mainEntity": {
            "@type": "Person",
            "name": "Andres H. Bozo",
            "jobTitle": "Licensed Insurance Broker",
            "telephone": "+1-352-225-8389",
            "identifier": "21228432",
            "worksFor": {
                "@type": ["Organization", "LocalBusiness", "InsuranceAgency"],
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
                }
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
                "name": isEs ? "Sobre Nosotros" : "About Us",
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
                schema={[aboutSchema, breadcrumbSchema]}
            />

            <div className="bg-light-gray border-b border-gray-200 py-2">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Nosotros y Licencia' : 'About Broker'}</span>
                </div>
            </div>

            <section className="bg-primary text-white py-5 md:py-7 text-center">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <span className="bg-accent text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-0.5 rounded-full mb-1.5 inline-block">
                        NPN: 21228432
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading mb-2">
                        {isEs ? 'Sobre AHB Insurance Solutions' : 'About AHB Insurance Solutions'}
                    </h1>
                    <p className="text-gray-200 text-xs sm:text-sm md:text-base font-medium">
                        {isEs ? 'Su socio independiente para una jubilación segura, protegida y digna en Florida.' : 'Your independent partner for a secure and dignified retirement in Florida.'}
                    </p>
                </div>
            </section>

            <AboutUs content={content.aboutUs} common={content.common} priority={true} />
            <WhyChooseUs content={content.whyChooseUs} />

            <div className="container mx-auto px-4 md:px-6 text-center pt-8">
                <button
                    onClick={onOpenQuote}
                    className="bg-accent text-primary font-black uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg hover:bg-[#FFB81C] transition-all"
                >
                    {isEs ? 'Solicitar Asesoría Personalizada ➔' : 'Schedule Custom Advisory ➔'}
                </button>
            </div>
        </div>
    );
};
