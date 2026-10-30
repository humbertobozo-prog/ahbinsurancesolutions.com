import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import type { TranslationContent } from '../types';
import { Image } from './Image';

interface HeroProps {
    content: TranslationContent['hero'];
    language?: 'en' | 'es';
}

export const Hero: React.FC<HeroProps> = ({ content, language = 'en' }) => {
    const imgRef = React.useRef<HTMLImageElement>(null);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (imgRef.current && window.innerWidth >= 768) {
                        const translateY = Math.min(window.scrollY * 0.08, 40);
                        imgRef.current.style.transform = `translateY(${translateY}px) scale(1.03)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        if (window.innerWidth >= 768) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = window.innerWidth >= 768 ? 64 : 56;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // High-performance self-hosted responsive WebP images
    const imageSm = "/hero-seniors-medicare-sm.webp";
    const imageMd = "/hero-seniors-medicare.webp";
    const imageLg = "/hero-seniors-medicare-lg.webp";

    const heroAlt = language === 'es'
        ? "Andrés Bozo asesorando en seguros de Medicare y vida en Florida"
        : "Licensed Florida insurance broker Andres Bozo guiding seniors on Medicare";

    return (
        <section id="home" className="bg-light-gray relative overflow-hidden" aria-labelledby="hero-heading">
            <div id="main-content" className="container mx-auto px-4 md:px-6 pt-4 pb-8 md:pt-8 md:pb-12 lg:pt-10 lg:pb-16 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                
                <div className="w-full md:w-1/2 z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-primary text-accent px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-sm border border-accent/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
                        <span>{language === 'es' ? 'Período Abierto de Inscripción Medicare 2027 (15 Oct – 7 Dic)' : 'Active: 2027 Medicare Open Enrollment (Oct 15 – Dec 7)'}</span>
                    </div>
                    <h1 id="hero-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-heading text-primary mb-3 md:mb-4 leading-[1.15] md:leading-tight">
                        {content.heading}
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg text-dark-gray/90 mb-4 md:mb-6 leading-relaxed font-medium">
                        {content.subheading}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <a 
                            href="#contact"
                            onClick={(e) => handleNavClick(e, 'contact')}
                            aria-label={`${content.cta.replace(/➔|->|▯/g, '').trim()} - Medicare, Final Expense & IUL Florida`}
                            className="inline-flex items-center justify-center bg-accent text-primary border-b-4 border-primary/10 hover:bg-[#FFB81C] focus-visible:ring-4 focus-visible:ring-accent outline-none px-6 md:px-8 lg:px-10 py-3.5 md:py-4 rounded-xl font-black text-base sm:text-lg md:text-xl uppercase tracking-widest shadow-xl transition-all duration-300 active:scale-95 group" 
                        >
                            <span>{content.cta.replace(/➔|->|▯/g, '').trim()}</span>
                            <ArrowRight className="w-5 h-5 ml-2.5 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </a>
                    </div>

                    <div className="mt-4 md:mt-5 flex items-center justify-center md:justify-start gap-2 min-h-[36px]">
                        <div className="flex -space-x-2" aria-hidden="true">
                            {[
                                { bg: 'bg-primary text-white', label: 'FL' },
                                { bg: 'bg-secondary text-white', label: '65+' },
                                { bg: 'bg-accent text-primary', label: '★' },
                            ].map((badge, idx) => (
                                <div key={idx} className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white ${badge.bg} flex items-center justify-center text-[10px] md:text-xs font-black shadow-sm`}>
                                    <span>{badge.label}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] md:text-xs text-dark-gray font-black uppercase tracking-widest">
                            {content.trustText}
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 hero-img-container">
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group aspect-[4/3]">
                        <div className="w-full h-full overflow-hidden">
                            <Image
                                ref={imgRef}
                                src={imageMd}
                                srcSet={`${imageSm} 480w, ${imageMd} 800w, ${imageLg} 1200w`}
                                sizes="(max-width: 767px) 95vw, (max-width: 1200px) 50vw, 600px"
                                alt={heroAlt}
                                className="w-full h-full object-cover transition-transform duration-100 ease-out"
                                containerClassName="w-full h-full"
                                style={{ willChange: 'transform' }}
                                width="800"
                                height="600"
                                loading="eager"
                                fetchPriority="high"
                                sources={[{
                                    type: "image/webp",
                                    srcSet: `${imageSm} 480w, ${imageMd} 800w, ${imageLg} 1200w`,
                                    sizes: "(max-width: 767px) 95vw, (max-width: 1200px) 50vw, 600px"
                                }]}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                    </div>
                </div>
            </div>
            
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 md:w-96 md:h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 md:w-72 md:h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
};