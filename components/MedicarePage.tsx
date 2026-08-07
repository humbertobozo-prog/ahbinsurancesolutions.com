import React from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';

interface MedicarePageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const MedicarePage: React.FC<MedicarePageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/medicare' : '/medicare'}`;
    const enUrl = `${baseUrl}/medicare`;
    const esUrl = `${baseUrl}/es/medicare`;

    const title = isEs 
        ? 'Planes de Medicare en Florida 2026: Medigap y Advantage | AHB Insurance' 
        : 'Medicare Plans in Florida 2026: Medigap & Advantage | AHB Insurance';

    const description = isEs 
        ? 'Compare planes Suplementarios de Medicare (Medigap Plan G, Plan N) y Medicare Advantage en Florida. Asesoría independiente gratuita con Andrés Bozo (NPN 21228432).' 
        : 'Compare Florida Medicare Supplement plans (Medigap Plan G, Plan N) and Medicare Advantage. Free independent advice from licensed broker Andres Bozo (NPN 21228432).';

    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": isEs ? "Planes y Suplementos de Medicare en Florida" : "Medicare Plans & Supplements in Florida",
        "provider": {
            "@type": "InsuranceAgency",
            "name": "AHB Insurance Solutions",
            "url": "https://www.ahbinsurancesolutions.com/",
            "telephone": "+1-352-225-8389"
        },
        "areaServed": "FL",
        "description": description
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
                schema={schema}
            />

            {/* Breadcrumb */}
            <div className="bg-light-gray border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Medicare en Florida' : 'Medicare in Florida'}</span>
                </div>
            </div>

            {/* Page Hero */}
            <section className="bg-primary text-white py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                            {isEs ? 'Guía Especializada 2026' : '2026 Specialized Guide'}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black font-heading mb-6 leading-tight">
                            {isEs 
                                ? 'Planes de Medicare y Suplementos en Florida' 
                                : 'Florida Medicare & Supplement Insurance Plans'}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                            {isEs
                                ? 'Proteja sus finanzas contra facturas médicas ilimitadas. Comparamos más de 80 compañías líderes de Medicare para encontrar la mejor cobertura al menor costo en Florida.'
                                : 'Shield your retirement from uncapped medical bills. We compare 80+ top carriers to find the best Medicare coverage at the lowest rate in Florida.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onOpenQuote}
                                className="bg-accent text-primary hover:bg-[#FFB81C] font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg transition-all text-center"
                            >
                                {isEs ? 'Cotizar Medicare Gratis ➔' : 'Get Free Medicare Quote ➔'}
                            </button>
                            <a
                                href="tel:+13522258389"
                                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl border border-white/20 transition-all text-center flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                                {isEs ? 'Llamar al Agente (+1 352-225-8389)' : 'Call Broker (+1 352-225-8389)'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Explanation */}
            <section className="py-12 md:py-16 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    
                    {/* Part A/B/C/D Grid */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black font-heading text-primary mb-6">
                            {isEs ? 'Comprender las Partes de Medicare' : 'Understanding the Parts of Medicare'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200">
                                <span className="bg-primary text-white text-xs font-black px-2.5 py-1 rounded mb-3 inline-block">Parte A</span>
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {isEs ? 'Seguro Hospitalario' : 'Hospital Insurance'}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Cubre estadías en el hospital, atención en centros de enfermería especializada y cuidados paliativos.' 
                                        : 'Covers inpatient hospital stays, skilled nursing facility care, and hospice care.'}
                                </p>
                            </div>

                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200">
                                <span className="bg-primary text-white text-xs font-black px-2.5 py-1 rounded mb-3 inline-block">Parte B</span>
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {isEs ? 'Seguro Médico' : 'Medical Insurance'}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Cubre consultas médicas, cuidados ambulatorios, exámenes preventivos y suministros médicos.' 
                                        : 'Covers doctor visits, outpatient care, medical supplies, and preventive services.'}
                                </p>
                            </div>

                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200">
                                <span className="bg-accent text-primary text-xs font-black px-2.5 py-1 rounded mb-3 inline-block">Medigap</span>
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {isEs ? 'Suplemento de Medicare (Plan G / N)' : 'Medicare Supplement (Plan G / N)'}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Paga el 20% que el Medicare Original no cubre. Sin restricciones de red de médicos en todo EE.UU.' 
                                        : 'Pays the 20% left uncovered by Original Medicare. Visit any doctor in the USA that accepts Medicare.'}
                                </p>
                            </div>

                            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200">
                                <span className="bg-secondary text-white text-xs font-black px-2.5 py-1 rounded mb-3 inline-block">Parte C</span>
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {isEs ? 'Medicare Advantage (HMO / PPO)' : 'Medicare Advantage (HMO / PPO)'}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {isEs 
                                        ? 'Planes privados de reemplazo que incluyen medicamentos, dental y visión, utilizando redes locales.' 
                                        : 'Private replacement plans that combine doctor, hospital, and drug coverage in local networks.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-2xl font-black font-heading text-primary mb-4">
                            {isEs ? 'Medigap Plan G vs Plan N en Florida' : 'Medigap Plan G vs Plan N in Florida'}
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-700">
                                <thead className="bg-primary text-white text-xs uppercase font-bold">
                                    <tr>
                                        <th className="p-3.5 rounded-tl-xl">{isEs ? 'Cobertura' : 'Coverage'}</th>
                                        <th className="p-3.5">Plan G</th>
                                        <th className="p-3.5 rounded-tr-xl">Plan N</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Deducible Parte A Hospital' : 'Part A Hospital Deductible'}</td>
                                        <td className="p-3.5 text-emerald-600 font-black">✓ 100% Cubierto</td>
                                        <td className="p-3.5 text-emerald-600 font-black">✓ 100% Cubierto</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Coseguro Médico Parte B' : 'Part B Medical Coinsurance'}</td>
                                        <td className="p-3.5 text-emerald-600 font-black">✓ 100% Cubierto</td>
                                        <td className="p-3.5 text-amber-600 font-bold">Copago hasta $20</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Cargos En Exceso Parte B' : 'Part B Excess Charges'}</td>
                                        <td className="p-3.5 text-emerald-600 font-black">✓ 100% Cubierto</td>
                                        <td className="p-3.5 text-gray-400 font-medium">No Cubierto</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3.5 font-bold">{isEs ? 'Prima Mensual Promedio' : 'Average Monthly Premium'}</td>
                                        <td className="p-3.5 font-bold">$140 – $180 / mes</td>
                                        <td className="p-3.5 font-bold text-secondary">$100 – $140 / mes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Broker Callout */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="text-xl font-black font-heading text-primary">
                                {isEs ? '¿Tiene dudas sobre sus fechas de inscripción?' : 'Unsure about your enrollment dates?'}
                            </h3>
                            <p className="text-sm text-gray-700">
                                {isEs 
                                    ? 'Como corredor licenciado en Florida (NPN 21228432), le ayudo gratuitamente a elegir el plan perfecto sin ningún compromiso.' 
                                    : 'As a licensed Florida broker (NPN 21228432), I help you compare plans for free with no obligations.'}
                            </p>
                        </div>
                        <button
                            onClick={onOpenQuote}
                            className="bg-primary text-white hover:bg-secondary text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all whitespace-nowrap shadow"
                        >
                            {isEs ? 'Consultar con Andrés Bozo' : 'Consult with Andres Bozo'}
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
};
