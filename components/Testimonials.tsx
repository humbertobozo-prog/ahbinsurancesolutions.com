
import React, { useState, useEffect, useCallback } from 'react';
import type { TranslationContent } from '../types';

interface TestimonialsProps {
    content: TranslationContent['testimonials'];
}

const TestimonialCard: React.FC<{ quote: string; author: string; location: string; imageUrl: string }> = ({ quote, author, location, imageUrl }) => (
    <div className="flex-shrink-0 w-full px-4 md:w-1/2">
        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl flex flex-col items-center text-center border border-gray-50 h-full transform transition-all duration-500 hover:shadow-2xl">
            <div className="relative mb-8">
                <div className="absolute -inset-2 bg-gradient-to-tr from-accent to-secondary rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <img 
                    src={imageUrl} 
                    alt={`${author} - Cliente de seguros en ${location}`} 
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" 
                    loading="lazy" 
                    width="96"
                    height="96"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 p-1.5 rounded-full border-2 border-white shadow-sm">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
            </div>
            <div className="flex gap-1.5 mb-6">
                {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ))}
            </div>
            <p className="text-gray-700 italic mb-8 leading-relaxed text-lg flex-grow">"{quote}"</p>
            <div>
                <div className="font-black text-primary font-heading uppercase text-base tracking-wide">{author}</div>
                <div className="text-xs font-black text-primary uppercase tracking-[0.25em] mt-2 bg-secondary/5 px-3 py-1 rounded-full">{location}</div>
            </div>
        </div>
    </div>
);

const testimonialImages = [
    'https://images.pexels.com/photos/5905920/pexels-photo-5905920.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80&fm=webp',
    'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80&fm=webp',
    'https://images.pexels.com/photos/4069335/pexels-photo-4069335.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80&fm=webp',
    'https://images.pexels.com/photos/8051783/pexels-photo-8051783.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80&fm=webp',
];

export const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    
    const totalItems = content.items.length;
    const maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 768 ? 1 : 2);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
        <section id="testimonials" className="bg-light-gray py-16 md:py-20 overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 animate-fade-in-down">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[11px] mb-3 bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 inline-block">{content.label}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-primary leading-tight">{content.title}</h2>
                    <div className="w-20 h-1.5 bg-accent mx-auto mt-6 rounded-full shadow-sm"></div>
                </div>

                <div 
                    className="relative max-w-6xl mx-auto group"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="overflow-hidden py-4 px-2">
                        <div 
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {content.items.map((testimonial, index) => (
                                <TestimonialCard 
                                    key={index} 
                                    {...testimonial} 
                                    imageUrl={testimonialImages[index % testimonialImages.length]} 
                                />
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={prevSlide}
                        className="absolute top-1/2 -left-4 md:-left-8 lg:-left-12 -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-gray-100 text-primary hover:bg-accent hover:text-white transition-all duration-300 z-20 hidden md:block active:scale-90"
                        aria-label="Previous testimonial"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute top-1/2 -right-4 md:-right-8 lg:-right-12 -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-gray-100 text-primary hover:bg-accent hover:text-white transition-all duration-300 z-20 hidden md:block active:scale-90"
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
            </div>
        </section>
    );
};
