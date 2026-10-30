import React, { useState, useEffect, useCallback } from 'react';
import type { TranslationContent } from '../types';

interface TestimonialsProps {
    content: TranslationContent['testimonials'];
    language?: 'en' | 'es';
}

const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

const TestimonialCard: React.FC<{ quote: string; author: string; location: string; index: number }> = ({ quote, author, location, index }) => {
    const initials = getInitials(author);
    const bgGradients = [
        'from-[#002855] to-[#1E3A8A]',
        'from-[#1E3A8A] to-[#0D9488]',
        'from-[#0F766E] to-[#0369A1]',
        'from-[#1E293B] to-[#334155]',
    ];
    const gradient = bgGradients[index % bgGradients.length];

    return (
        <div className="flex-shrink-0 w-full px-4 md:w-1/2">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl flex flex-col items-center text-center border border-gray-100 h-full min-h-[380px] justify-between transform transition-all duration-500 hover:shadow-2xl contain-layout">
                <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-black font-heading text-xl md:text-2xl shadow-md border-4 border-white`}>
                            {initials}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 p-1.5 rounded-full border-2 border-white shadow-sm" title="Verified Client Review">
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex gap-1.5 mb-5" aria-label="5 out of 5 stars rating">
                        {[1, 2, 3, 4, 5].map(i => (
                            <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-gray-700 italic mb-6 leading-relaxed text-base md:text-lg">"{quote}"</p>
                </div>
                <div className="mt-auto">
                    <h3 className="font-black text-primary font-heading uppercase text-base tracking-wide">{author}</h3>
                    <div className="text-xs font-black text-primary uppercase tracking-[0.25em] mt-2 bg-secondary/5 px-3 py-1 rounded-full">{location}</div>
                </div>
            </div>
        </div>
    );
};

export const Testimonials: React.FC<TestimonialsProps> = ({ content, language }) => {
    const isEs = language === 'es' || content.title.includes('Dicen');
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
                    <div className="overflow-hidden py-4 px-2 min-h-[420px]">
                        <div 
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {content.items.map((testimonial, index) => (
                                <TestimonialCard 
                                    key={index} 
                                    {...testimonial} 
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={prevSlide}
                        className="absolute top-1/2 -left-4 md:-left-8 lg:-left-12 -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-gray-100 text-primary hover:bg-accent hover:text-primary transition-all duration-300 z-20 hidden md:block active:scale-90"
                        aria-label="Previous testimonial"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute top-1/2 -right-4 md:-right-8 lg:-right-12 -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-gray-100 text-primary hover:bg-accent hover:text-primary transition-all duration-300 z-20 hidden md:block active:scale-90"
                        aria-label="Next testimonial"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>

                <div className="flex justify-center gap-4 mt-12">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className="group p-2 focus:outline-none"
                            aria-label={`Go to slide ${i + 1}`}
                        >
                            <div 
                                className={`h-3 transition-all duration-500 rounded-full ${currentIndex === i ? 'w-10 bg-accent' : 'w-3 bg-gray-300 group-hover:bg-gray-400'}`}
                            />
                        </button>
                    ))}
                </div>

                {/* FTC / CMS Compliance Disclaimer */}
                <div className="max-w-3xl mx-auto mt-10 text-center text-xs text-gray-500 leading-relaxed border-t border-gray-200/60 pt-4">
                    <p>
                        {isEs
                            ? 'Nota de conformidad: Comentarios y testimonios representativos de clientes asesorados en Florida. Se utilizan iniciales para proteger la privacidad individual según las directrices de confidencialidad del sector. Las primas, beneficios y aprobaciones finales dependen de la edad, salud, elegibilidad y criterios de suscripción de cada aseguradora.'
                            : 'Compliance Notice: Representative feedback from clients advised in Florida. Initials and general locations are used to protect personal privacy under state confidentiality standards. Rates, benefits, and final policy approvals vary based on age, health, carrier guidelines, and individual underwriting.'}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
