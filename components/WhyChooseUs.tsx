
import React from 'react';
import type { TranslationContent } from '../types';

interface WhyChooseUsProps {
    content: TranslationContent['whyChooseUs'];
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ content }) => {
    const imageBaseUrl = "https://images.pexels.com/photos/7551619/pexels-photo-7551619.jpeg";
    const imageSmall = `${imageBaseUrl}?auto=compress&cs=tinysrgb&w=480&q=65&fm=webp`;
    const imageMedium = `${imageBaseUrl}?auto=compress&cs=tinysrgb&w=800&q=65&fm=webp`;

    return (
        <section id="why-us" className="py-16 md:py-20 bg-white" aria-labelledby="why-us-heading">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <img 
                        src={imageMedium}
                        srcSet={`${imageSmall} 480w, ${imageMedium} 800w`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        alt="A diverse, multicultural group of smiling seniors" 
                        className="rounded-lg shadow-2xl w-full h-auto" 
                        loading="lazy"
                        width="800"
                        height="533"
                    />
                </div>
                <div className="md:w-1/2">
                    <h2 id="why-us-heading" className="text-3xl md:text-4xl font-bold font-heading text-primary mb-6">{content.title}</h2>
                    <ul className="space-y-6">
                        {content.items.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-secondary">{item.title}</h3>
                                    <p className="mt-1 text-dark-gray">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
