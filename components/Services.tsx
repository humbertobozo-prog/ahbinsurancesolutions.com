
import React from 'react';
import type { TranslationContent } from '../types';

interface ServicesProps {
    content: TranslationContent['services'];
}

const ServiceCard: React.FC<{ icon: string; title: string; description: string; highlight?: string; }> = ({ icon, title, description, highlight }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full border border-gray-50">
        <div className="flex-grow">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-secondary/10 rounded-full text-secondary">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon}></path>
                    </svg>
                </div>
            </div>
            <h3 className="text-2xl font-black font-heading text-primary mb-3 leading-tight">{title}</h3>
            <p className="text-gray-700 leading-relaxed font-medium">{description}</p>
        </div>
        {highlight && (
            <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-secondary font-black italic text-sm">"{highlight}"</p>
            </div>
        )}
    </div>
);

export const Services: React.FC<ServicesProps> = ({ content }) => {
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
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};
