import React from 'react';
import type { TranslationContent } from '../types';

interface KeyTakeawaysProps {
    content: TranslationContent['keyTakeaways'];
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ content }) => {
    return (
        <section className="bg-white py-8 md:py-12 border-b border-gray-100" aria-labelledby="takeaways-heading">
            <div className="container mx-auto px-6">
                <h2 id="takeaways-heading" className="sr-only">{content.title}</h2>
                <div className="bg-primary/5 rounded-3xl p-6 md:p-10 border border-primary/10 shadow-sm overflow-hidden relative group">
                    {/* Decorative accent background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700"></div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {content.items.map((item, index) => (
                            <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left group/item">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-3 shadow-sm group-hover/item:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-primary font-black uppercase tracking-wider text-sm leading-none">{item.label}</h3>
                                </div>
                                <p className="text-dark-gray font-medium text-sm leading-relaxed md:pl-11 opacity-90">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};