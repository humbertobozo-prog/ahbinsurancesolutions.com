import React, { useState } from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { faqsEs, faqsEn } from '../constants/faqData';

interface FAQPageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/preguntas-frecuentes' : '/faq'}`;
    const enUrl = `${baseUrl}/faq`;
    const esUrl = `${baseUrl}/es/preguntas-frecuentes`;

    const title = isEs 
        ? 'Preguntas Frecuentes sobre Medicare, Gastos Finales, Seguro de Vida, IUL y Anualidades | AHB' 
        : 'Medicare, Final Expense, Life Insurance, IUL & Annuities FAQ | AHB Solutions';

    const description = isEs 
        ? 'Respuestas detalladas a más de 30 preguntas clave sobre Medicare Suplementario Plan G y N, Gastos Finales, Seguro de Vida, IUL y Anualidades en Florida con el broker Andrés H. Bozo.' 
        : 'Comprehensive answers to 30+ essential questions regarding Florida Medicare Supplement Plan G & N, Final Expense, Life Insurance, IUL, and Annuities with licensed broker Andres H. Bozo.';

    const categories = [
        { id: 'all', labelEn: 'All Topics', labelEs: 'Todos los Temas' },
        { id: 'medicare', labelEn: 'Medicare', labelEs: 'Medicare' },
        { id: 'final-expense', labelEn: 'Final Expense', labelEs: 'Gastos Finales' },
        { id: 'life-insurance', labelEn: 'Life Insurance', labelEs: 'Seguro de Vida' },
        { id: 'iul', labelEn: 'IUL & Retirement', labelEs: 'IUL y Jubilación' },
        { id: 'annuities', labelEn: 'Annuities', labelEs: 'Anualidades' },
        { id: 'general', labelEn: 'General & Broker', labelEs: 'General y Broker' }
    ];

    const faqs = isEs ? faqsEs : faqsEn;

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        const matchesSearch = searchTerm === '' || 
            faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
            faq.a.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEs ? 'Inicio' : 'Home',
                "item": isEs ? `${baseUrl}/es` : baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions',
                "item": canonical
            }
        ]
    };

    return (
        <div className="bg-white min-h-screen text-dark-gray font-sans">
            <SEOHead 
                title={title}
                description={description}
                canonicalUrl={canonical}
                enUrl={enUrl}
                esUrl={esUrl}
                language={language}
                schema={[faqSchema, breadcrumbSchema]}
            />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="bg-light-gray border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                            {isEs ? 'Inicio' : 'Home'}
                        </a>
                        <span>/</span>
                        <span className="text-primary font-bold">
                            {isEs ? 'Preguntas Frecuentes' : 'FAQ'}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
                        {isEs ? 'Actualizado para Florida 2026' : 'Updated for Florida 2026'}
                    </span>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-primary text-white py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                    <span className="inline-block bg-accent text-primary font-black text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
                        {isEs ? 'Base de Conocimiento y Asesoría' : 'Knowledge Base & Expert Guidance'}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-4 leading-tight text-white">
                        {isEs 
                            ? 'Preguntas Frecuentes: Seguros y Jubilación en Florida' 
                            : 'Frequently Asked Questions: Florida Insurance & Retirement'}
                    </h1>
                    <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {isEs 
                            ? 'Claridad directa, objetiva y respaldada por licencias sobre Medicare, Gastos Finales, Seguro de Vida, IUL y Anualidades con el broker Andrés H. Bozo.' 
                            : 'Direct, objective, and licensed answers regarding Medicare, Final Expense, Life Insurance, IUL, and Annuities with broker Andres H. Bozo.'}
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={isEs ? "Buscar una pregunta (ej. Medigap, IUL, funeral, 0% piso)..." : "Search a question (e.g., Medigap, IUL, burial, 0% floor)..."}
                            className="w-full px-5 py-3.5 pl-12 rounded-xl bg-white text-dark-gray placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-lg text-sm md:text-base"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                            >
                                {isEs ? 'Borrar' : 'Clear'}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Category Filter Pills */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-20 shadow-xs">
                <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                selectedCategory === cat.id
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'bg-light-gray text-gray-600 hover:bg-gray-200 hover:text-dark-gray'
                            }`}
                        >
                            {isEs ? cat.labelEs : cat.labelEn}
                        </button>
                    ))}
                </div>
            </div>

            {/* FAQs Accordion Section */}
            <section className="py-12 md:py-16 container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="mb-6 flex items-center justify-between text-xs text-gray-500 font-semibold">
                    <span>
                        {isEs 
                            ? `Mostrando ${filteredFaqs.length} de ${faqs.length} preguntas` 
                            : `Showing ${filteredFaqs.length} of ${faqs.length} questions`}
                    </span>
                    {(searchTerm || selectedCategory !== 'all') && (
                        <button 
                            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                            className="text-primary hover:underline"
                        >
                            {isEs ? 'Restablecer filtros' : 'Reset filters'}
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {filteredFaqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div 
                                key={idx}
                                className={`border rounded-2xl transition-all duration-200 ${
                                    isOpen 
                                        ? 'border-primary/40 bg-white shadow-md ring-1 ring-primary/10' 
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                            item.category === 'medicare' ? 'bg-blue-600' :
                                            item.category === 'final-expense' ? 'bg-amber-600' :
                                            item.category === 'life-insurance' ? 'bg-indigo-600' :
                                            item.category === 'iul' ? 'bg-emerald-600' :
                                            item.category === 'annuities' ? 'bg-purple-600' : 'bg-primary'
                                        }`} />
                                        <span className="font-bold text-dark-gray text-base md:text-lg">
                                            {item.q}
                                        </span>
                                    </div>
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 text-xs font-black ${
                                        isOpen ? 'bg-primary text-white rotate-180' : 'bg-light-gray text-gray-600'
                                    }`}>
                                        ▼
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-6 md:px-6 md:pb-6 text-gray-700 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                                        <p>{item.a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-12 bg-light-gray rounded-2xl border border-gray-200 p-8">
                            <p className="text-gray-600 font-bold mb-2">
                                {isEs ? 'No se encontraron preguntas para su búsqueda.' : 'No matching questions found.'}
                            </p>
                            <p className="text-xs text-gray-500 mb-4">
                                {isEs ? 'Intente con otros términos o consulte directamente con nuestro broker.' : 'Try different keywords or ask our licensed broker directly.'}
                            </p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                                className="bg-primary text-white font-bold text-xs uppercase px-4 py-2 rounded-lg"
                            >
                                {isEs ? 'Ver todas las preguntas' : 'View all questions'}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Broker Direct Help CTA */}
            <section className="bg-light-gray border-t border-gray-200 py-12">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <span className="text-xs font-black text-accent uppercase tracking-widest bg-primary px-3 py-1 rounded-full inline-block">
                                {isEs ? '¿Tiene una pregunta específica no listada?' : 'Have a specific question not listed?'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black font-heading text-primary">
                                {isEs ? 'Hable directamente con Andrés Bozo' : 'Speak Directly With Andres Bozo'}
                            </h2>
                            <p className="text-gray-600 text-sm max-w-xl">
                                {isEs 
                                    ? 'Broker de seguros independiente con licencia en Florida (NPN 21228432). Asesoría 100% gratuita, imparcial y sin presiones comerciales.' 
                                    : 'Florida-licensed independent insurance broker (NPN 21228432). 100% free, impartial, zero-pressure guidance.'}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
                            <button
                                onClick={onOpenQuote}
                                className="bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow transition-colors text-center cursor-pointer"
                            >
                                {isEs ? 'Solicitar Asesoría Gratuita' : 'Request Free Consultation'}
                            </button>
                            <a
                                href="tel:+13522258389"
                                className="bg-accent hover:bg-[#FFB81C] text-primary font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors text-center"
                            >
                                {isEs ? 'Llamar: (352) 225-8389' : 'Call: (352) 225-8389'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
