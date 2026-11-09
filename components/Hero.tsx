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
        <section id="home" className="bg-gradient-to-b from-slate-50 via-light-gray to-white relative overflow-hidden" aria-labelledby="hero-heading">
            <div id="main-content" className="container mx-auto px-4 sm:px-6 md:px-8 pt-2.5 pb-4 sm:pt-3 sm:pb-5 md:pt-4 md:pb-6 lg:pt-5 lg:pb-7 flex flex-col lg:flex-row items-center gap-5 lg:gap-8 xl:gap-10">
                
                <div className="w-full lg:w-7/12 z-10 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <div className="inline-flex items-center gap-2 bg-primary text-accent px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider mb-3 shadow-xs border border-accent/40">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
                        <span>{language === 'es' ? 'Período Abierto de Inscripción Medicare 2027 (15 Oct – 7 Dic)' : 'Active: 2027 Medicare Open Enrollment (Oct 15 – Dec 7)'}</span>
                    </div>

                    <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-black font-heading text-primary mb-3 leading-[1.12] tracking-tight">
                        {content.heading}
                    </h1>

                    <p className="text-base sm:text-lg md:text-lg lg:text-xl text-slate-700 mb-4 leading-relaxed font-normal md:font-medium max-w-2xl">
                        {language === 'es' 
                            ? 'Representamos sus intereses, no a las aseguradoras. Como corredores independientes licenciados en Florida, comparamos más de 80 compañías para encontrar su plan ideal al menor costo y con asesoría sin costo.' 
                            : 'At AHB Insurance Solutions, we represent you, not the insurance companies. As independent licensed brokers, we compare 80+ top carriers to find the perfect plan for your unique needs at zero cost to you.'}
                    </p>

                    {/* 3 Pillars: Generous & Legible Micro-Grid for Desktop & 15" Displays */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-4 text-left">
                        <a 
                            href={language === 'es' ? '/es/seguro-medicare-florida' : '/medicare-florida'}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = language === 'es' ? '/es/seguro-medicare-florida' : '/medicare-florida';
                                window.history.pushState({}, '', target);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group/pill bg-white hover:bg-blue-50/70 border border-slate-200/90 hover:border-primary/40 rounded-xl p-3 transition-all shadow-xs hover:shadow-md"
                        >
                            <div className="flex items-center gap-2 text-primary font-black text-sm sm:text-base">
                                <span aria-hidden="true">🏥</span>
                                <span>{language === 'es' ? 'Medicare & Medigap' : 'Florida Medicare'}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                                {language === 'es' ? 'Planes G, N y Advantage. Cobertura con libertad de médicos.' : 'Medigap Plan G/N & Advantage with nationwide doctor freedom.'}
                            </p>
                        </a>

                        <a 
                            href={language === 'es' ? '/es/gastos-finales' : '/final-expense'}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = language === 'es' ? '/es/gastos-finales' : '/final-expense';
                                window.history.pushState({}, '', target);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group/pill bg-white hover:bg-amber-50/70 border border-slate-200/90 hover:border-accent/50 rounded-xl p-3 transition-all shadow-xs hover:shadow-md"
                        >
                            <div className="flex items-center gap-2 text-primary font-black text-sm sm:text-base">
                                <span aria-hidden="true">🕊️</span>
                                <span>{language === 'es' ? 'Gastos Finales' : 'Burial Insurance'}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                                {language === 'es' ? '$5K a $35K de por vida con primas niveladas fijas.' : '$5K to $35K whole life coverage with guaranteed level rates.'}
                            </p>
                        </a>

                        <a 
                            href={language === 'es' ? '/es/iul-jubilacion' : '/iul-retirement'}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = language === 'es' ? '/es/iul-jubilacion' : '/iul-retirement';
                                window.history.pushState({}, '', target);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group/pill bg-white hover:bg-emerald-50/70 border border-slate-200/90 hover:border-emerald-500/40 rounded-xl p-3 transition-all shadow-xs hover:shadow-md"
                        >
                            <div className="flex items-center gap-2 text-primary font-black text-sm sm:text-base">
                                <span aria-hidden="true">📈</span>
                                <span>{language === 'es' ? 'IUL y Retiro' : 'IUL & Retirement'}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                                {language === 'es' ? 'Crecimiento de capital libre de impuestos y sin riesgo bursátil.' : 'Tax-advantaged cash growth and guaranteed income options.'}
                            </p>
                        </a>
                    </div>
                    
                    {/* CTA and Trust Strip with Large, Clear Touch & Reading Targets */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
                        <a 
                            href="#contact"
                            onClick={(e) => handleNavClick(e, 'contact')}
                            aria-label={`${content.cta.replace(/➔|->|▯/g, '').trim()} - Medicare, Final Expense & IUL Florida`}
                            className="inline-flex items-center justify-center bg-accent text-primary border-b-4 border-primary/20 hover:bg-[#FFB81C] focus-visible:ring-4 focus-visible:ring-accent outline-none px-7 sm:px-9 py-3 sm:py-3.5 rounded-xl font-black text-base sm:text-lg uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 group shrink-0" 
                        >
                            <span>{content.cta.replace(/➔|->|▯/g, '').trim()}</span>
                            <ArrowRight className="w-5 h-5 ml-2.5 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </a>

                        <div className="flex items-center gap-3 text-dark-gray font-bold">
                            <div className="flex -space-x-2 shrink-0" aria-hidden="true">
                                {[
                                    { bg: 'bg-primary text-white', label: 'FL' },
                                    { bg: 'bg-secondary text-white', label: '65+' },
                                    { bg: 'bg-accent text-primary', label: '★' },
                                ].map((badge, idx) => (
                                    <div key={idx} className={`w-8 h-8 rounded-full border-2 border-white ${badge.bg} flex items-center justify-center text-[10px] font-black shadow-xs`}>
                                        <span>{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 font-black uppercase tracking-wider">
                                {content.trustText}
                            </p>
                        </div>
                    </div>

                    {/* Quick Coverage Routing Bar with Legible Text */}
                    <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 w-full">
                        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-500 mr-1">
                            {language === 'es' ? 'Acceso Directo:' : 'Explore Solutions:'}
                        </span>
                        <a 
                            href={language === 'es' ? '/es/gastos-finales' : '/final-expense'}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = language === 'es' ? '/es/gastos-finales' : '/final-expense';
                                window.history.pushState({}, '', target);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1.5 bg-white hover:bg-amber-50 text-primary border border-slate-200 hover:border-accent px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
                        >
                            <span aria-hidden="true">🕊️</span>
                            <span>{language === 'es' ? 'Seguro de Entierro ($5K–$35K)' : 'Burial Insurance ($5K–$35K)'}</span>
                        </a>
                        <a 
                            href={language === 'es' ? '/es/seguro-medicare-florida' : '/medicare-florida'}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = language === 'es' ? '/es/seguro-medicare-florida' : '/medicare-florida';
                                window.history.pushState({}, '', target);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1.5 bg-white hover:bg-blue-50 text-primary border border-slate-200 hover:border-primary px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
                        >
                            <span aria-hidden="true">🏥</span>
                            <span>{language === 'es' ? 'Planes Medicare Florida' : 'Florida Medicare Plans'}</span>
                        </a>
                        <a 
                            href={language === 'es' ? '/es/iul-jubilacion' : '/iul-retirement'}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = language === 'es' ? '/es/iul-jubilacion' : '/iul-retirement';
                                window.history.pushState({}, '', target);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-primary border border-slate-200 hover:border-emerald-600 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
                        >
                            <span aria-hidden="true">📈</span>
                            <span>{language === 'es' ? 'IUL y Retiro' : 'IUL & Retirement'}</span>
                        </a>
                    </div>
                </div>

                {/* Rebalanced, Compact Informative Visual Feature Card */}
                <div className="w-full lg:w-5/12 hero-img-container relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white bg-slate-100 max-h-[320px] sm:max-h-[360px] md:max-h-[420px] lg:max-h-[460px]">
                    <div className="w-full h-full overflow-hidden">
                        <Image
                            ref={imgRef}
                            src={imageMd}
                            srcSet={`${imageSm} 480w, ${imageMd} 800w, ${imageLg} 1200w`}
                            sizes="(max-width: 767px) 95vw, (max-width: 1024px) 80vw, 550px"
                            alt={heroAlt}
                            className="w-full h-full object-cover transition-transform duration-100 ease-out"
                            containerClassName="w-full h-full"
                            style={{ willChange: 'transform', transform: 'scale(1.03)' }}
                            width="800"
                            height="600"
                            loading="eager"
                            fetchPriority="high"
                            sources={[{
                                type: "image/webp",
                                srcSet: `${imageSm} 480w, ${imageMd} 800w, ${imageLg} 1200w`,
                                sizes: "(max-width: 767px) 95vw, (max-width: 1024px) 80vw, 550px"
                            }]}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-black/20 pointer-events-none"></div>

                    {/* Informative Floating Trust Badges with clear typography */}
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl border border-white/20 shadow-md flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
                        <span>{language === 'es' ? 'Licencia Florida DFS / NPN: 21228432' : 'FL DFS License / NPN: 21228432'}</span>
                    </div>

                    <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md text-primary px-3.5 py-2.5 rounded-xl border border-white/80 shadow-lg flex items-center justify-between text-xs font-black uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                            <span className="text-accent" aria-hidden="true">★</span>
                            <span>{language === 'es' ? '80+ Aseguradoras' : '80+ Top Carriers'}</span>
                        </div>
                        <span className="text-slate-300" aria-hidden="true">|</span>
                        <div className="flex items-center gap-1.5">
                            <span aria-hidden="true">⭐</span>
                            <span>{language === 'es' ? '10+ Años Exp.' : '10+ Yrs Exp.'}</span>
                        </div>
                        <span className="text-slate-300" aria-hidden="true">|</span>
                        <div className="flex items-center gap-1.5 text-emerald-700">
                            <span aria-hidden="true">✓</span>
                            <span>{language === 'es' ? '100% Sin Costo' : '100% Free'}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 md:w-96 md:h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 md:w-72 md:h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
};