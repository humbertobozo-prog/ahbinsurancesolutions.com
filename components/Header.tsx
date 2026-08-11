import React, { useState, useEffect } from 'react';
import type { Language, TranslationContent } from '../types';
import { Logo } from './Logo';
import { BLOG_POSTS } from '../constants/blogPosts';

interface HeaderProps {
    content: TranslationContent['header'];
    currentLang: Language;
    setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ content, currentLang, setLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isEs = currentLang === 'es';

    const navigateTo = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        window.history.pushState({}, '', path);
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
    };

    const handleLanguageSwitch = (targetLang: Language) => {
        if (targetLang === currentLang) return;
        const currentPath = window.location.pathname;
        let nextPath: string;

        if (targetLang === 'es') {
            if (currentPath === '/medicare') nextPath = '/es/medicare';
            else if (currentPath === '/final-expense') nextPath = '/es/gastos-finales';
            else if (currentPath === '/iul-retirement') nextPath = '/es/iul-jubilacion';
            else if (currentPath === '/blog') nextPath = '/es/blog';
            else if (currentPath.startsWith('/blog/')) {
                const slug = currentPath.replace('/blog/', '');
                const post = BLOG_POSTS.find(p => p.slug.en === slug);
                nextPath = post ? `/es/blog/${post.slug.es}` : '/es/blog';
            }
            else if (currentPath === '/faq') nextPath = '/es/preguntas-frecuentes';
            else if (currentPath === '/about-us') nextPath = '/es/nosotros';
            else if (currentPath === '/contact') nextPath = '/es/contacto';
            else if (currentPath === '/terms') nextPath = '/es/terminos';
            else if (currentPath === '/privacy') nextPath = '/es/privacidad';
            else nextPath = '/es';
        } else {
            if (currentPath === '/es/medicare') nextPath = '/medicare';
            else if (currentPath === '/es/gastos-finales') nextPath = '/final-expense';
            else if (currentPath === '/es/iul-jubilacion') nextPath = '/iul-retirement';
            else if (currentPath === '/es/blog') nextPath = '/blog';
            else if (currentPath.startsWith('/es/blog/')) {
                const slug = currentPath.replace('/es/blog/', '');
                const post = BLOG_POSTS.find(p => p.slug.es === slug);
                nextPath = post ? `/blog/${post.slug.en}` : '/blog';
            }
            else if (currentPath === '/es/preguntas-frecuentes') nextPath = '/faq';
            else if (currentPath === '/es/nosotros') nextPath = '/about-us';
            else if (currentPath === '/es/contacto') nextPath = '/contact';
            else if (currentPath === '/es/terminos') nextPath = '/terms';
            else if (currentPath === '/es/privacidad') nextPath = '/privacy';
            else nextPath = '/';
        }

        setLanguage(targetLang);
        window.history.pushState({}, '', nextPath);
        window.dispatchEvent(new Event('popstate'));
    };

    const linkClass = "hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none transition-colors duration-300 cursor-pointer text-xs lg:text-sm font-bold uppercase tracking-wider px-2 py-1 rounded";

    const medicarePath = isEs ? '/es/medicare' : '/medicare';
    const finalExpensePath = isEs ? '/es/gastos-finales' : '/final-expense';
    const iulPath = isEs ? '/es/iul-jubilacion' : '/iul-retirement';
    const blogPath = isEs ? '/es/blog' : '/blog';
    const faqPath = isEs ? '/es/preguntas-frecuentes' : '/faq';
    const aboutPath = isEs ? '/es/nosotros' : '/about-us';
    const contactPath = isEs ? '/es/contacto' : '/contact';
    const homePath = isEs ? '/es' : '/';

    return (
        <header className={`bg-primary text-white sticky top-0 z-50 h-16 transition-shadow duration-300 flex items-center ${isScrolled ? 'shadow-lg border-b border-white/5' : ''}`}>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-full">
                <a 
                    href={homePath} 
                    aria-label="AHB Insurance Solutions Home"
                    onClick={(e) => navigateTo(e, homePath)}
                    className="flex-shrink-0 focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-lg p-1"
                >
                    <Logo variant="light" />
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-2 lg:space-x-4" aria-label="Main Navigation">
                    <a href={homePath} onClick={(e) => navigateTo(e, homePath)} className={linkClass}>
                        {isEs ? 'INICIO' : 'HOME'}
                    </a>
                    <a href={medicarePath} onClick={(e) => navigateTo(e, medicarePath)} className={linkClass}>
                        MEDICARE
                    </a>
                    <a href={finalExpensePath} onClick={(e) => navigateTo(e, finalExpensePath)} className={linkClass}>
                        {isEs ? 'GASTOS FINALES' : 'FINAL EXPENSE'}
                    </a>
                    <a href={iulPath} onClick={(e) => navigateTo(e, iulPath)} className={linkClass}>
                        IUL
                    </a>
                    <a href={blogPath} onClick={(e) => navigateTo(e, blogPath)} className={linkClass}>
                        BLOG
                    </a>
                    <a href={faqPath} onClick={(e) => navigateTo(e, faqPath)} className={linkClass}>
                        FAQ
                    </a>
                    <a href={aboutPath} onClick={(e) => navigateTo(e, aboutPath)} className={linkClass}>
                        {isEs ? 'NOSOTROS' : 'ABOUT'}
                    </a>
                    <a 
                        href="tel:+13522258389" 
                        className="hidden lg:flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl font-black text-xs transition-all shadow-md ml-1"
                        aria-label={isEs ? "Llamar al broker Andrés Bozo" : "Call broker Andres Bozo"}
                    >
                        <svg className="w-3.5 h-3.5 fill-current text-accent" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        <span>+1 (352) 225-8389</span>
                    </a>
                    <a 
                        href={contactPath} 
                        onClick={(e) => navigateTo(e, contactPath)} 
                        className="bg-accent text-primary px-3.5 py-2 lg:px-4 lg:py-2 rounded-xl font-black uppercase tracking-widest text-[11px] lg:text-xs hover:bg-[#FFB81C] focus-visible:ring-4 focus-visible:ring-accent outline-none transition-all shadow-md ml-1"
                    >
                        {content.nav.getQuote}
                    </a>
                    
                    <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10 ml-1">
                         <button 
                            onClick={() => handleLanguageSwitch('en')} 
                            className={`flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent outline-none ${currentLang === 'en' ? 'bg-accent text-primary shadow-sm' : 'text-white hover:bg-white/10'}`}
                            aria-label="Switch to English"
                            aria-pressed={currentLang === 'en'}
                        >
                            EN
                        </button>
                        <button 
                            onClick={() => handleLanguageSwitch('es')} 
                            className={`flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent outline-none ${currentLang === 'es' ? 'bg-accent text-primary shadow-sm' : 'text-white hover:bg-white/10'}`}
                            aria-label="Cambiar a Español"
                            aria-pressed={currentLang === 'es'}
                        >
                            ES
                        </button>
                    </div>
                </nav>

                {/* Mobile Icons Group */}
                <div className="flex items-center md:hidden gap-1">
                    <a 
                        href="tel:+13522258389" 
                        className="w-12 h-12 flex items-center justify-center text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-lg"
                        aria-label="Call Andres Bozo"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                    </a>

                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="w-12 h-12 flex items-center justify-center text-white focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-lg"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div id="mobile-menu" className="md:hidden fixed inset-0 top-16 bg-primary z-50 animate-fade-in-down shadow-2xl overflow-y-auto">
                    <nav className="px-6 py-8 flex flex-col space-y-1" aria-label="Mobile Navigation">
                        <a href={homePath} className="text-lg font-black uppercase tracking-widest border-b border-white/5 py-3 focus-visible:text-accent outline-none" onClick={(e) => navigateTo(e, homePath)}>
                            {isEs ? 'Inicio' : 'Home'}
                        </a>
                        <a href={medicarePath} className="text-lg font-black uppercase tracking-widest border-b border-white/5 py-3 focus-visible:text-accent outline-none" onClick={(e) => navigateTo(e, medicarePath)}>
                            Medicare
                        </a>
                        <a href={finalExpensePath} className="text-lg font-black uppercase tracking-widest border-b border-white/5 py-3 focus-visible:text-accent outline-none" onClick={(e) => navigateTo(e, finalExpensePath)}>
                            {isEs ? 'Gastos Finales' : 'Final Expense'}
                        </a>
                        <a href={iulPath} className="text-lg font-black uppercase tracking-widest border-b border-white/5 py-3 focus-visible:text-accent outline-none" onClick={(e) => navigateTo(e, iulPath)}>
                            IUL
                        </a>
                        <a href={blogPath} className="text-lg font-black uppercase tracking-widest border-b border-white/5 py-3 focus-visible:text-accent outline-none" onClick={(e) => navigateTo(e, blogPath)}>
                            Blog
                        </a>
                        <a href={faqPath} className="text-lg font-black uppercase tracking-widest border-b border-white/5 py-3 focus-visible:text-accent outline-none" onClick={(e) => navigateTo(e, faqPath)}>
                            FAQ
                        </a>
                        <a href={aboutPath} className="text-lg font-black uppercase tracking-widest border-b border-white/5 py-3 focus-visible:text-accent outline-none" onClick={(e) => navigateTo(e, aboutPath)}>
                            {isEs ? 'Nosotros' : 'About'}
                        </a>
                        
                        <div className="pt-4">
                            <a href={contactPath} className="w-full text-center text-lg font-black text-primary bg-accent uppercase tracking-widest py-4 focus-visible:ring-4 focus-visible:ring-white outline-none rounded-xl inline-block shadow-lg" onClick={(e) => navigateTo(e, contactPath)}>
                                {content.nav.getQuote}
                            </a>
                        </div>
                        
                        <div className="flex items-center gap-4 pt-6">
                            <button 
                                onClick={() => handleLanguageSwitch('en')} 
                                className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-sm transition-all focus-visible:ring-4 focus-visible:ring-accent outline-none border-2 ${currentLang === 'en' ? 'bg-accent text-primary border-accent' : 'bg-white/5 text-white border-white/10'}`}
                                aria-pressed={currentLang === 'en'}
                            >
                                English
                            </button>
                            <button 
                                onClick={() => handleLanguageSwitch('es')} 
                                className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-sm transition-all focus-visible:ring-4 focus-visible:ring-accent outline-none border-2 ${currentLang === 'es' ? 'bg-accent text-primary border-accent' : 'bg-white/5 text-white border-white/10'}`}
                                aria-pressed={currentLang === 'es'}
                            >
                                Español
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Direct Contact</p>
                            <a href="tel:+13522258389" className="text-xl font-black text-accent tracking-tighter">+1 (352) 225-8389</a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};
