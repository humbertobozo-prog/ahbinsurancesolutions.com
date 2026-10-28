import React from 'react';
import { Image } from './Image';
import type { Language } from '../types';

interface AuthorProps {
    variant?: 'card' | 'compact' | 'badge';
    theme?: 'light' | 'dark';
    language?: Language;
    priority?: boolean;
    className?: string;
}

export const Author: React.FC<AuthorProps> = ({ 
    variant = 'card', 
    theme = 'light', 
    language = 'en',
    priority = false,
    className = ''
}) => {
    const isEn = language === 'en';
    
    const content = {
        name: "Andres H. Bozo",
        license: isEn ? "Licensed Broker" : "Corredor Licenciado",
        npn: "21228432",
        npnLabel: "NPN",
        tagline: isEn ? "10+ Years Guiding Florida Seniors & Families" : "10+ Años Asesorando a Familias en Florida",
        bio: isEn 
            ? "Andres H. Bozo is an independent, state-licensed insurance broker (NPN: 21228432) with over 10 years of dedicated experience guiding Florida families through Medicare, Final Expense, and Indexed Universal Life insurance."
            : "Andrés H. Bozo es un corredor de seguros independiente licenciado en Florida (NPN: 21228432) con más de 10 años de experiencia asesorando a familias y personas mayores en Medicare, Gastos Finales y Vida Universal Indexada (IUL).",
        verified: isEn ? "Verified License" : "Licencia Verificada",
        npnTooltip: isEn 
            ? "National Producer Number - A unique NAIC identifier for licensed insurance professionals."
            : "Número de Productor Nacional - Un identificador único de la NAIC para profesionales de seguros licenciados."
    };

    const imageSrc = "/andresbozoofi.webp";
    const imageSm = "/andresbozoofi-sm.webp";

    if (variant === 'compact') {
        return (
            <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-white' : 'text-primary'} ${className}`}>
                <div className="relative shrink-0">
                    <div className={`absolute -inset-0.5 bg-gradient-to-tr from-[#D97706] to-[#8A6000] rounded-full opacity-40 blur-[1px]`} aria-hidden="true"></div>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-slate-100">
                        <Image 
                            src={imageSm}
                            alt={content.name}
                            width="48"
                            height="48"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-[#D97706] text-white p-0.5 rounded-full shadow-sm" aria-hidden="true">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm tracking-tight">{content.name}</span>
                        <span aria-hidden="true" className="text-slate-500 opacity-50">·</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-amber-400' : 'text-[#8A6000]'}`}>
                            {content.license} {content.npnLabel}: {content.npn}
                        </span>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} line-clamp-1`}>
                        {content.tagline}
                    </p>
                </div>
                
                {/* Structured Data for Search Engines */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": content.name,
                        "jobTitle": "Licensed Insurance Broker",
                        "identifier": content.npn,
                        "description": content.bio,
                        "image": `https://www.ahbinsurancesolutions.com${imageSrc}`
                    })}
                </script>
            </div>
        );
    }

    if (variant === 'badge') {
        return (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'} ${className}`}>
                <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                    <Image src={imageSm} alt={content.name} width="24" height="24" className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                    {content.name} · {content.npnLabel} {content.npn}
                </span>
            </div>
        );
    }

    // Default: 'card' variant
    return (
        <div className={`group relative bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
            <div className="flex flex-col sm:flex-row items-stretch">
                <div className="w-full sm:w-2/5 relative aspect-[4/5] sm:aspect-auto">
                    <Image 
                        src={imageSrc}
                        srcSet={`${imageSm} 480w, ${imageSrc} 1000w`}
                        sizes="(max-width: 640px) 100vw, 300px"
                        alt={content.name}
                        width="400"
                        height="500"
                        className="w-full h-full object-cover"
                        loading={priority ? "eager" : "lazy"}
                        fetchPriority={priority ? "high" : "auto"}
                        style={{ objectPosition: '50% 20%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
                <div className="w-full sm:w-3/5 p-6 flex flex-col justify-center">
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#8A6000]">
                                {content.license}
                            </span>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <div className="group/npn relative">
                                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 cursor-help border-b border-dotted border-slate-300">
                                    {content.npnLabel}: {content.npn}
                                </span>
                                <div className="absolute bottom-full left-0 mb-2 hidden group-hover/npn:block w-48 p-2 bg-slate-900 text-white text-[10px] rounded shadow-xl z-50 normal-case tracking-normal font-medium leading-tight">
                                    {content.npnTooltip}
                                    <div className="absolute top-full left-4 border-4 border-transparent border-t-slate-900" aria-hidden="true"></div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-primary tracking-tight">
                            {content.name}
                        </h3>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {content.bio}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true"></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                {content.verified}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true"></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                {isEn ? "Independent" : "Independiente"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Person Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": content.name,
                    "jobTitle": "Licensed Insurance Broker",
                    "identifier": content.npn,
                    "description": content.bio,
                    "image": `https://www.ahbinsurancesolutions.com${imageSrc}`,
                    "sameAs": [
                        "https://www.facebook.com/ahbinsurancesolutions",
                        "https://www.instagram.com/ahbinsurancesolutions"
                    ]
                })}
            </script>
        </div>
    );
};
