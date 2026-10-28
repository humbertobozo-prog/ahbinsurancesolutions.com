import React from 'react';
import type { TranslationContent } from '../types';
import { Author } from './Author';

interface AboutUsProps {
    content: TranslationContent['aboutUs'];
    common?: TranslationContent['common'];
    priority?: boolean;
}

export const AboutUs: React.FC<AboutUsProps> = ({ content, priority = false }) => {

    return (
        <section id="about-us" className="py-6 md:py-10 bg-white overflow-hidden" aria-labelledby="about-heading">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    
                    {/* Columna de Texto - order-1 en móvil para que "Our Mission" aparezca inmediatamente */}
                    <div className="w-full lg:w-7/12 order-1 lg:order-2">
                        <div className="mb-6 md:mb-8">
                            <span className="inline-flex items-center text-[#8A6000] font-black uppercase tracking-[0.25em] text-[11px] mb-3 bg-accent/15 px-4 py-1.5 rounded-full border border-accent/30 shadow-sm" aria-hidden="true">
                                <span className="w-2 h-2 bg-accent rounded-full mr-2.5 animate-ping"></span>
                                {content.badge}
                            </span>
                            <h2 id="about-heading" className="text-3xl lg:text-4xl font-extrabold font-heading text-primary leading-tight">
                                {content.title}
                            </h2>
                            <div className="w-20 h-1.5 bg-accent mt-4 rounded-full shadow-sm" aria-hidden="true"></div>
                        </div>
                        
                        <div className="space-y-6 text-dark-gray text-base md:text-lg leading-relaxed max-w-2xl">
                            <p className="first-letter:text-6xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:mt-1 opacity-95" dangerouslySetInnerHTML={{ __html: content.paragraph1 }} />
                            <p className="opacity-80 font-medium" dangerouslySetInnerHTML={{ __html: content.paragraph2 }} />
                            
                            <blockquote className="relative py-6 pl-10 pr-6 border-l-4 border-accent bg-light-gray/60 rounded-r-2xl shadow-sm overflow-hidden group/quote my-4">
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover/quote:scale-150 transition-transform duration-1000" aria-hidden="true"></div>
                                <svg className="absolute top-5 left-3 w-7 h-7 text-accent/20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM0 15V7C0 4.79086 1.79086 3 4 3H7C8.10457 3 9 3.89543 9 5V6C9 7.10457 8.10457 8 7 8H4C3.44772 8 3 8.44772 3 9V15C3 15.5523 3.44772 16 4 16H7C8.10457 16 9 16.8954 9 18V21H5.983C2.66929 21 0 18.3137 0 15Z" />
                                </svg>
                                <p className="italic font-bold text-primary/90 text-lg md:text-xl leading-snug relative z-10" dangerouslySetInnerHTML={{ __html: content.paragraph3 }} />
                            </blockquote>
                        </div>

                        {/* Indicadores de Estadísticas */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10 pt-8 border-t border-gray-100">
                            <div className="group cursor-default">
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-black text-primary group-hover:text-accent transition-all duration-300">10</span>
                                    <span className="text-2xl font-black text-[#8A6000] ml-1">+</span>
                                </div>
                                <p className="text-[10px] sm:text-[11px] text-gray-700 font-black uppercase tracking-[0.2em] mt-2">{content.statsYears}</p>
                            </div>
                            <div className="group cursor-default">
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-black text-primary group-hover:text-accent transition-all duration-300">80</span>
                                    <span className="text-2xl font-black text-[#8A6000] ml-1">+</span>
                                </div>
                                <p className="text-[10px] sm:text-[11px] text-gray-700 font-black uppercase tracking-[0.2em] mt-2">{content.statsCompanies}</p>
                            </div>
                            <div className="col-span-2 md:col-span-1 group cursor-default">
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-black text-[#8A6000] group-hover:text-primary transition-all duration-300">100</span>
                                    <span className="text-2xl font-black text-primary ml-1">%</span>
                                </div>
                                <p className="text-[10px] sm:text-[11px] text-gray-700 font-black uppercase tracking-[0.2em] mt-2">{content.statsService}</p>
                            </div>
                        </div>
                    </div>

                    {/* Columna de Imagen - order-2 en móvil */}
                    <div className="w-full lg:w-5/12 order-2 lg:order-1 mt-4 lg:mt-0">
                        <Author 
                            variant="card" 
                            language={content.badge === "TRUSTED ADVISOR" ? "en" : "es"} 
                            priority={priority} 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};