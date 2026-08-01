
import React from 'react';
import type { TranslationContent } from '../types';

interface ComplianceLinksProps {
    content: TranslationContent['authoritativeLinks'];
}

export const ComplianceLinks: React.FC<ComplianceLinksProps> = ({ content }) => {
    return (
        <section className="bg-white py-12 border-t border-gray-100" aria-labelledby="compliance-heading">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="md:w-1/3 text-center md:text-left">
                            <div className="inline-flex p-3 bg-secondary/5 rounded-2xl mb-4 border border-secondary/10">
                                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h2 id="compliance-heading" className="text-xl font-black font-heading text-primary mb-3 uppercase tracking-tight">{content.title}</h2>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                {content.description}
                            </p>
                        </div>
                        
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {content.items.map((item, index) => (
                                <a 
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-5 bg-light-gray rounded-2xl border border-gray-100 hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-primary font-black text-sm uppercase tracking-wider group-hover:text-secondary">{item.label}</span>
                                        <svg className="w-4 h-4 text-gray-400 group-hover:text-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                    </div>
                                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{item.source}</span>
                                </a>
                            ))}
                            
                            {/* Extra informational block */}
                            <div className="sm:col-span-2 p-4 bg-accent/5 rounded-2xl border border-accent/10 flex items-center">
                                <span className="text-[10px] text-primary font-bold uppercase tracking-widest text-center w-full">
                                    As independent brokers, we strictly follow CMS and State Department of Financial Services guidelines.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
