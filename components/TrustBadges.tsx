
import React from 'react';
import type { TranslationContent } from '../types';

interface TrustBadgesProps {
    content: TranslationContent['trustBadges'];
}

const TrustBadgeCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full border border-transparent hover:border-gray-100">
        <div className="flex-shrink-0 mb-6 flex items-center justify-center h-20 w-20 rounded-full bg-blue-50 text-secondary group-hover:bg-primary group-hover:text-accent transition-colors duration-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon}></path>
            </svg>
        </div>
        <h3 className="text-xl font-bold font-heading text-primary mb-3 group-hover:text-secondary transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export const TrustBadges: React.FC<TrustBadgesProps> = ({ content }) => {
    return (
        <section id="trust-security" className="bg-light-gray py-16 md:py-20 relative" aria-labelledby="trust-badges-heading">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 id="trust-badges-heading" className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">{content.title}</h2>
                    <div className="h-1.5 w-24 bg-accent mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {content.items.map((badge, index) => (
                        <TrustBadgeCard key={index} {...badge} />
                    ))}
                </div>
            </div>
        </section>
    );
};
