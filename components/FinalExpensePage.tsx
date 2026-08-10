import React from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';

interface FinalExpensePageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const FinalExpensePage: React.FC<FinalExpensePageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/gastos-finales' : '/final-expense'}`;
    const enUrl = `${baseUrl}/final-expense`;
    const esUrl = `${baseUrl}/es/gastos-finales`;

    const title = isEs 
        ? 'Seguro de Gastos Finales y Entierro en Florida 2026 | AHB Insurance' 
        : 'Final Expense & Burial Insurance in Florida 2026 | AHB Insurance';

    const description = isEs 
        ? 'Asegure entre $5,000 y $35,000 para costos de funeral y entierro en Florida. Tarifas congeladas, aceptación garantizada y sin exámenes médicos.' 
        : 'Secure $5,000 to $35,000 for funeral and burial costs in Florida. Locked-in rates, guaranteed acceptance, no medical exams required.';

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": isEs ? "Seguro de Gastos Finales y Funeral" : "Final Expense & Burial Life Insurance",
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
                "name": isEs ? "Gastos Finales en Florida" : "Final Expense Insurance",
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

            {/* Breadcrumb */}
            <div className="bg-light-gray border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Gastos Finales en Florida' : 'Final Expense Insurance'}</span>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                            {isEs ? 'Protección Familiar Permanente' : 'Permanent Family Protection'}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black font-heading mb-6 leading-tight">
                            {isEs 
                                ? 'Seguro de Gastos Finales y Funeral en Florida' 
                                : 'Final Expense & Burial Insurance Plans'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Evite que sus hijos o cónyuge asuman deudas de $10,000+ por costos funerarios. Garantice paz mental con pagos fijos y desembolso inmediato.'
                                : 'Protect your children from taking on $10,000+ in sudden funeral debt. Secure lifetime peace of mind with locked-in rates and immediate payouts.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onOpenQuote}
                                className="bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all text-center"
                            >
                                {isEs ? 'Calcular Tarifas Fijas ➔' : 'Get Instant Rate Quote ➔'}
                            </button>
                            <a
                                href="tel:+13522258389"
                                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl border border-white/20 transition-all text-center flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                                {isEs ? 'Llamar al Broker (+1 352-225-8389)' : 'Call Broker (+1 352-225-8389)'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Benefits */}
            <section className="py-12 md:py-16 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? '¿Por Qué Elegir un Seguro de Gastos Finales?' : 'Why Choose Final Expense Insurance?'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-light-gray rounded-2xl border border-gray-200">
                                <div className="w-10 h-10 bg-accent text-primary font-black rounded-xl flex items-center justify-center mb-4">1</div>
                                <h3 className="font-bold text-primary mb-2">{isEs ? 'Tarifas Congeladas' : 'Locked-In Rates'}</h3>
                                <p className="text-xs text-gray-600">{isEs ? 'Sus mensualidades jamás subirán por edad o problemas de salud.' : 'Monthly premiums never increase regardless of age or health changes.'}</p>
                            </div>
                            <div className="p-6 bg-light-gray rounded-2xl border border-gray-200">
                                <div className="w-10 h-10 bg-accent text-primary font-black rounded-xl flex items-center justify-center mb-4">2</div>
                                <h3 className="font-bold text-primary mb-2">{isEs ? 'Sin Exámenes Médicos' : 'No Medical Exams'}</h3>
                                <p className="text-xs text-gray-600">{isEs ? 'Aprobaciones sencillas respondiendo solo unas cuantas preguntas de salud.' : 'Easy approval process with simple health questions.'}</p>
                            </div>
                            <div className="p-6 bg-light-gray rounded-2xl border border-gray-200">
                                <div className="w-10 h-10 bg-accent text-primary font-black rounded-xl flex items-center justify-center mb-4">3</div>
                                <h3 className="font-bold text-primary mb-2">{isEs ? 'Efectivo Inmediato' : 'Fast Direct Payout'}</h3>
                                <p className="text-xs text-gray-600">{isEs ? 'El beneficio llega directo a su beneficiario libre de impuestos.' : 'Funds are disbursed directly to your beneficiaries tax-free.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-primary text-white rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-bold mb-4">{isEs ? 'Costo Promedio de Servicios Funerarios en Florida' : 'Average Cost of Funeral Services in Florida'}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                                <p className="text-accent font-bold text-xs uppercase mb-1">{isEs ? 'Servicio de Entierro Tradicional' : 'Traditional Burial Service'}</p>
                                <p className="text-2xl font-black">$8,500 – $12,500</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                                <p className="text-accent font-bold text-xs uppercase mb-1">{isEs ? 'Cremación con Ceremonia' : 'Cremation with Memorial'}</p>
                                <p className="text-2xl font-black">$3,200 – $6,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
