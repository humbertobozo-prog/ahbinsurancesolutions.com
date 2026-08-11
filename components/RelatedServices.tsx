import React from 'react';
import type { Language } from '../types';

interface RelatedServicesProps {
    currentService: 'medicare' | 'final-expense' | 'iul';
    language: Language;
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({ currentService, language }) => {
    const isEs = language === 'es';

    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        window.history.pushState({}, '', href);
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const services = [
        {
            id: 'medicare',
            title: isEs ? 'Planes Suplementarios de Medicare (Medigap)' : 'Medicare Supplement (Medigap) Plans',
            description: isEs 
                ? 'Proteja sus ahorros contra copagos y deducibles médicos ilimitados con los Planes G y N en Florida.' 
                : 'Shield your savings from uncapped medical co-pays with Florida Plan G & Plan N coverage.',
            link: isEs ? '/es/medicare' : '/medicare',
            cta: isEs ? 'Ver Planes de Medicare ➔' : 'Explore Medicare Plans ➔',
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            id: 'final-expense',
            title: isEs ? 'Seguro de Gastos Finales y Funeral' : 'Final Expense & Burial Life Insurance',
            description: isEs 
                ? 'Garantice que su familia cuente con $5,000 a $35,000 inmediatos para cubrir costos funerarios sin exámenes médicos.' 
                : 'Secure $5,000 to $35,000 in immediate cash benefits for funeral costs with guaranteed approval.',
            link: isEs ? '/es/gastos-finales' : '/final-expense',
            cta: isEs ? 'Ver Cobertura de Gastos Finales ➔' : 'Explore Burial Insurance ➔',
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            id: 'iul',
            title: isEs ? 'Vida Universal Indexada (IUL) y Jubilación' : 'Indexed Universal Life (IUL) & Retirement',
            description: isEs 
                ? 'Acumule fondos libres de impuestos ligados a índices bursátiles con piso de protección del 0% contra caídas del mercado.' 
                : 'Build tax-free retirement wealth tied to market indexes with a 0% downside safety floor.',
            link: isEs ? '/es/iul-jubilacion' : '/iul-retirement',
            cta: isEs ? 'Ver Estrategias IUL ➔' : 'Explore IUL Tax-Free Plans ➔',
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        }
    ];

    const filteredServices = services.filter(s => s.id !== currentService);

    return (
        <section className="py-12 bg-light-gray border-t border-gray-200">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="text-center mb-8">
                    <span className="text-xs font-black uppercase tracking-widest text-primary/70 bg-accent/20 px-3 py-1 rounded-full inline-block mb-2">
                        {isEs ? 'Soluciones Complementarias de Seguro' : 'Complementary Protection Solutions'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                        {isEs ? 'Otras Coberturas para Familias en Florida' : 'Other Insurance Services for Florida Residents'}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        {isEs 
                            ? 'Combine sus soluciones de seguro para una protección integral en su jubilación.' 
                            : 'Explore complete retirement and family protection options tailored for you.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredServices.map((service) => (
                        <a
                            key={service.id}
                            href={service.link}
                            onClick={(e) => handleNavigate(e, service.link)}
                            className="bg-white border border-gray-200 hover:border-primary/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-lg font-bold font-heading text-primary group-hover:text-secondary transition-colors">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
                                    {service.description}
                                </p>
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-primary group-hover:text-secondary flex items-center gap-1 mt-2">
                                {service.cta}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
