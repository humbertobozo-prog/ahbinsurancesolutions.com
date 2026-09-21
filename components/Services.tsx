
import React from 'react';
import type { TranslationContent } from '../types';
import { InfoTooltip } from './InfoTooltip';

interface ServicesProps {
    content: TranslationContent['services'];
    language?: 'en' | 'es';
}

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    highlight?: string;
    language?: 'en' | 'es';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, highlight, language }) => {
    const isEs = language === 'es';
    const lowerTitle = title.toLowerCase();
    const isIUL = lowerTitle.includes('iul') || lowerTitle.includes('universal');

    let ctaText = isEs ? 'Hablar con Andrés ➔' : 'Talk With Andres ➔';
    let targetUrl = isEs ? '/es/contacto' : '/contact';

    if (lowerTitle.includes('medicare')) {
        ctaText = isEs ? 'Obtener Mi Comparación de Medicare ➔' : 'Get My Medicare Comparison ➔';
        targetUrl = isEs ? '/es/medicare' : '/medicare';
    } else if (lowerTitle.includes('final') || lowerTitle.includes('gastos') || lowerTitle.includes('burial') || lowerTitle.includes('entierro')) {
        ctaText = isEs ? 'Ver Mis Opciones de Gastos Finales ➔' : 'Get My Final Expense Options ➔';
        targetUrl = isEs ? '/es/gastos-finales' : '/final-expense';
    } else if (isIUL) {
        ctaText = isEs ? 'Solicitar una Revisión de IUL ➔' : 'Request an IUL Review ➔';
        targetUrl = isEs ? '/es/iul-jubilacion' : '/iul-retirement';
    } else if (lowerTitle.includes('annuit') || lowerTitle.includes('anualidad')) {
        ctaText = isEs ? 'Solicitar Mi Revisión de Ingresos de Jubilación ➔' : 'Request My Retirement Income Review ➔';
        targetUrl = isEs ? '/es/anualidades-florida' : '/annuities-florida';
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.history.pushState({}, '', targetUrl);
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tooltipNotice = isEs
        ? 'El estatus libre de impuestos se logra mediante préstamos sobre la póliza bajo el Código IRS 7702. Depende del mantenimiento activo de la póliza, fondos suficientes para cubrir costos de seguro y evitar la caducidad (lapse) para que los préstamos no se conviertan en ingreso gravable.'
        : 'Tax-free status is achieved via policy loans and withdrawals under IRS Code 7702. It requires ongoing policy maintenance, adequate funding to cover internal insurance charges, and preventing policy lapse to avoid converting unpaid loans into taxable income.';

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-secondary/30 hover:shadow-xl">
            <div className="flex-grow">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-secondary/10 rounded-full text-secondary">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon}></path>
                        </svg>
                    </div>
                </div>
                <h3 className="text-2xl font-black font-heading text-primary mb-3 leading-tight flex items-center justify-center">
                    <span>{title}</span>
                    {isIUL && (
                        <InfoTooltip 
                            text={tooltipNotice} 
                            label={isEs ? 'Información sobre ventajas fiscales de IUL' : 'IUL Tax-Advantage Disclosure'}
                            position="top" 
                        />
                    )}
                </h3>
                <p className="text-gray-700 leading-relaxed font-medium mb-4">
                    {description}
                </p>
            </div>
            {highlight && (
                <div className="mt-2 mb-6 pt-4 border-t border-gray-100">
                    <p className="text-secondary font-black italic text-sm">"{highlight}"</p>
                </div>
            )}
            <div className="pt-2">
                <a
                    href={targetUrl}
                    onClick={handleClick}
                    className="inline-block w-full bg-primary hover:bg-secondary text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-sm hover:shadow transition-all text-center cursor-pointer"
                >
                    {ctaText}
                </a>
            </div>
        </div>
    );
};

export const Services: React.FC<ServicesProps> = ({ content, language = 'en' }) => {
    return (
        <section id="services" className="bg-light-gray py-16 md:py-20" aria-labelledby="services-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                        AHB Insurance Solutions
                    </span>
                    <h2 id="services-heading" className="text-4xl md:text-5xl font-black font-heading text-primary leading-tight">
                        {content.title}
                    </h2>
                    <div className="w-20 h-1.5 bg-accent mx-auto mt-6 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content.items.map((service, index) => (
                        <ServiceCard 
                            key={index} 
                            {...service} 
                            language={language}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
