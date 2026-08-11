import React from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { RelatedServices } from './RelatedServices';

interface IULPageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const IULPage: React.FC<IULPageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/iul-jubilacion' : '/iul-retirement'}`;
    const enUrl = `${baseUrl}/iul-retirement`;
    const esUrl = `${baseUrl}/es/iul-jubilacion`;

    const title = isEs 
        ? 'Vida Universal Indexada (IUL) en Florida 2026 | AHB Insurance' 
        : 'Indexed Universal Life (IUL) Insurance in Florida 2026 | AHB Insurance';

    const description = isEs 
        ? 'Acreciente su capital con protección de piso del 0% contra caídas del mercado y retiros libres de impuestos para su jubilación en Florida.' 
        : 'Grow cash value with a 0% market downside floor and tax-free retirement loans in Florida. Permanent life insurance protection.';

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": isEs ? "Vida Universal Indexada (IUL) y Jubilación" : "Indexed Universal Life (IUL) & Retirement Planning",
        "provider": {
            "@type": ["InsuranceAgency", "Organization", "LocalBusiness"],
            "name": "AHB Insurance Solutions",
            "url": "https://www.ahbinsurancesolutions.com/",
            "telephone": "+1-352-225-8389",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "5500 SW Archer Road, Apt H103",
                "addressLocality": "Gainesville",
                "addressRegion": "FL",
                "postalCode": "32607",
                "addressCountry": "US"
            }
        },
        "areaServed": "FL",
        "description": description
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
                "name": isEs ? "IUL y Jubilación" : "IUL Tax-Free Retirement",
                "item": canonical
            }
        ]
    };

    return (
        <div className="bg-white min-h-screen text-dark-gray font-sans">
            <SEOHead 
                title={title}
                description={description}
                canonicalUrl={canonical}
                enUrl={enUrl}
                esUrl={esUrl}
                language={language}
                schema={[serviceSchema, breadcrumbSchema]}
            />

            <div className="bg-light-gray border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'IUL y Jubilación Libre de Impuestos' : 'IUL Tax-Free Retirement'}</span>
                </div>
            </div>

            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                            {isEs ? 'Planificación Financiera Avanzada' : 'Advanced Financial Planning'}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black font-heading mb-6 leading-tight">
                            {isEs 
                                ? 'Vida Universal Indexada (IUL) en Florida' 
                                : 'Indexed Universal Life (IUL) Policies'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Acumule capital ligado a índices de mercado con piso de protección del 0% para evitar pérdidas en caídas bursátiles, más retiros libres de impuestos.'
                                : 'Participate in market index gains with a 0% downside floor that eliminates market loss, coupled with tax-free policy loans in retirement.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onOpenQuote}
                                className="bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all text-center"
                            >
                                {isEs ? 'Solicitar Ilustración Personalizada ➔' : 'Get Custom IUL Illustration ➔'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                        {isEs ? '¿Cómo Protege el IUL sus Ahorros?' : 'How IUL Protects Your Wealth'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-light-gray rounded-2xl border border-gray-200">
                            <h3 className="font-bold text-primary mb-2 text-lg">{isEs ? 'Protección de Piso del 0%' : '0% Downside Floor'}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {isEs 
                                    ? 'Si el índice S&P 500 cae un 20%, su capital en el IUL no pierde un solo centavo.' 
                                    : 'If the S&P 500 drops 20%, your policy cash value receives 0% interest and loses zero dollars.'}
                            </p>
                        </div>
                        <div className="p-6 bg-light-gray rounded-2xl border border-gray-200">
                            <h3 className="font-bold text-primary mb-2 text-lg">{isEs ? 'Ingresos Libres de Impuestos' : 'Tax-Free Retirement Income'}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {isEs 
                                    ? 'Acceda a su dinero mediante préstamos sobre la póliza sin pagar impuestos sobre la renta.' 
                                    : 'Borrow against your cash accumulation tax-free under IRS code 7702.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Cross-Linking to Other Services */}
            <RelatedServices currentService="iul" language={language} />
        </div>
    );
};
