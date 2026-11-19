import React, { useState, useEffect, useCallback } from 'react';
import type { TranslationContent } from '../types';

interface TestimonialsProps {
    content: TranslationContent['testimonials'];
    language?: 'en' | 'es';
}

const TestimonialCard: React.FC<{ quote: string; author: string; location: string; index: number }> = ({ quote, author, location, index }) => {
    const stepNumber = `0${index + 1}`;
    const bgGradients = [
        'from-[#002855] to-[#1E3A8A]',
        'from-[#1E3A8A] to-[#0D9488]',
        'from-[#0F766E] to-[#0369A1]',
        'from-[#1E293B] to-[#334155]',
    ];
    const gradient = bgGradients[index % bgGradients.length];

    return (
        <div className="flex-shrink-0 w-full px-4 md:w-1/2">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl flex flex-col items-center text-center border border-gray-100 h-full min-h-[360px] justify-between transform transition-all duration-500 hover:shadow-2xl contain-layout">
                <div className="flex flex-col items-center">
                    <div className="mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-black font-heading text-xl shadow-md border-4 border-white`} aria-hidden="true">
                            {stepNumber}
                        </div>
                    </div>
                    <h3 className="font-black text-primary font-heading uppercase text-lg tracking-wide mb-4">{author}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed text-base md:text-lg">{quote}</p>
                </div>
                <div className="mt-auto">
                    <div className="text-xs font-black text-primary uppercase tracking-[0.2em] mt-2 bg-secondary/5 px-4 py-1.5 rounded-full">{location}</div>
                </div>
            </div>
        </div>
    );
};

export const Testimonials: React.FC<TestimonialsProps> = ({ content, language }) => {
    const isEs = language === 'es' || content.title.includes('Estándares') || content.title.includes('Dicen');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(min-width: 768px)').matches ? 2 : 1;
        }
        return 2;
    });
    
    const totalItems = content.items.length;
    const maxIndex = Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setItemsPerPage(e.matches ? 2 : 1);
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide, isPaused]);

    return (
        <section id="testimonials" className="bg-light-gray py-16 md:py-20 overflow-hidden relative contain-section-defer">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 animate-fade-in-down">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[11px] mb-3 bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 inline-block">{content.label}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-primary leading-tight">{content.title}</h2>
                    <div className="w-20 h-1.5 bg-accent mx-auto mt-6 rounded-full shadow-sm"></div>
                </div>

                <div 
                    className="relative max-w-6xl mx-auto group contain-carousel"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="overflow-hidden py-4 px-2 min-h-[380px]">
                        <div 
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {content.items.map((item, index) => (
                                <TestimonialCard 
                                    key={index} 
                                    {...item} 
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    <button 
                        type="button"
                        onClick={prevSlide}
                        className="absolute top-1/2 -left-4 md:-left-8 lg:-left-12 -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-gray-100 text-primary hover:bg-accent hover:text-primary transition-all duration-300 z-20 hidden md:block active:scale-90"
                        aria-label={isEs ? "Estándar anterior" : "Previous standard"}
                    >
                        <span className="sr-only">{isEs ? "Estándar anterior" : "Previous standard"}</span>
                        <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button 
                        type="button"
                        onClick={nextSlide}
                        className="absolute top-1/2 -right-4 md:-right-8 lg:-right-12 -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-gray-100 text-primary hover:bg-accent hover:text-primary transition-all duration-300 z-20 hidden md:block active:scale-90"
                        aria-label={isEs ? "Siguiente estándar" : "Next standard"}
                    >
                        <span className="sr-only">{isEs ? "Siguiente estándar" : "Next standard"}</span>
                        <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>

                <div className="flex justify-center gap-4 mt-12">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentIndex(i)}
                            className="group p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
                            aria-label={isEs ? `Ir a la diapositiva ${i + 1}` : `Go to slide ${i + 1}`}
                        >
                            <span className="sr-only">{isEs ? `Ir a la diapositiva ${i + 1}` : `Go to slide ${i + 1}`}</span>
                            <span 
                                aria-hidden="true"
                                className={`block h-3 transition-all duration-500 rounded-full ${currentIndex === i ? 'w-10 bg-accent' : 'w-3 bg-gray-400 group-hover:bg-gray-500'}`}
                            />
                        </button>
                    ))}
                </div>

                {/* Regulatory Compliance Disclosure */}
                <div className="max-w-3xl mx-auto mt-10 text-center text-xs text-gray-600 leading-relaxed border-t border-gray-200/60 pt-4">
                    <p>
                        {isEs
                            ? 'Nota de conformidad: La asesoría de corretaje independiente se brinda sin costo directo al cliente. La elegibilidad, tarifas, disponibilidad de planes y aprobaciones finales dependen exclusivamente de la edad, residencia, salud y términos contractuales de cada aseguradora.'
                            : 'Compliance Notice: Independent brokerage advisory is provided at zero direct service fee to the consumer. Eligibility, premium rates, plan availability, and final approvals vary by age, county, health history, and issuing carrier underwriting.'}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
