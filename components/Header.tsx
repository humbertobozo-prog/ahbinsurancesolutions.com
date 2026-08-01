import React, { useState, useEffect } from 'react';
import type { Language, TranslationContent } from '../types';
import { Logo } from './Logo';

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

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const id = targetId.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = window.innerWidth >= 768 ? 64 : 56;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsOpen(false);
    };

    const linkClass = "hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none transition-colors duration-300 cursor-pointer text-base md:text-sm font-bold uppercase tracking-wider px-2 py-3 md:py-1 rounded";

    return (
        <header className={`bg-primary text-white sticky top-0 z-50 h-16 md:h-16 transition-shadow duration-300 flex items-center ${isScrolled ? 'shadow-lg border-b border-white/5' : ''}`}>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-full">
                <a 
                    href="#home" 
                    aria-label="AHB Insurance Solutions Home"
                    onClick={(e) => handleNavClick(e, 'home')}
                    className="flex-shrink-0 focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-lg p-1"
                >
                    <Logo variant="light" />
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-3 lg:space-x-5" aria-label="Main Navigation">
                    <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className={linkClass}>{content.nav.solutions}</a>
                    <a href="#about-us" onClick={(e) => handleNavClick(e, 'about-us')} className={linkClass}>{content.nav.expertise}</a>
                    <a href="#why-us" onClick={(e) => handleNavClick(e, 'why-us')} className={linkClass}>{content.nav.benefits}</a>
                    <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className={linkClass}>{content.nav.results}</a>
                    <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-accent text-primary px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl font-black uppercase tracking-widest text-[11px] lg:text-xs hover:bg-[#FFB81C] focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary outline-none transition-all shadow-md">{content.nav.getQuote}</a>
                    
                    <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10">
                         <button 
                            onClick={() => setLanguage('en')} 
                            className={`flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent outline-none ${currentLang === 'en' ? 'bg-accent text-primary shadow-sm' : 'text-white hover:bg-white/10'}`}
                            aria-label="Switch to English"
                            aria-pressed={currentLang === 'en'}
                        >
                            EN
                        </button>
                        <button 
                            onClick={() => setLanguage('es')} 
                            className={`flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent outline-none ${currentLang === 'es' ? 'bg-accent text-primary shadow-sm' : 'text-white hover:bg-white/10'}`}
                            aria-label="Cambiar a Español"
                            aria-pressed={currentLang === 'es'}
                        >
                            ES
                        </button>
                    </div>
                </nav>

                {/* Mobile Icons Group */}
                <div className="flex items-center md:hidden gap-1">
                    {/* Click-to-Call Mobile */}
                    <a 
                        href="tel:+13522258389" 
                        className="w-12 h-12 flex items-center justify-center text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-lg"
                        aria-label="Call Andres Bozo"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                    </a>

                    {/* Hamburger Button (Min 48x48px) */}
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

            {/* Optimized Mobile Menu */}
            {isOpen && (
                <div id="mobile-menu" className="md:hidden fixed inset-0 top-16 bg-primary z-50 animate-fade-in-down shadow-2xl overflow-y-auto">
                    <nav className="px-6 py-10 flex flex-col space-y-2" aria-label="Mobile Navigation">
                        <a href="#services" className="text-xl font-black uppercase tracking-widest border-b border-white/5 py-4 focus-visible:text-accent outline-none" onClick={(e) => handleNavClick(e, 'services')}>{content.nav.solutions}</a>
                        <a href="#about-us" className="text-xl font-black uppercase tracking-widest border-b border-white/5 py-4 focus-visible:text-accent outline-none" onClick={(e) => handleNavClick(e, 'about-us')}>{content.nav.expertise}</a>
                        <a href="#why-us" className="text-xl font-black uppercase tracking-widest border-b border-white/5 py-4 focus-visible:text-accent outline-none" onClick={(e) => handleNavClick(e, 'why-us')}>{content.nav.benefits}</a>
                        <a href="#testimonials" className="text-xl font-black uppercase tracking-widest border-b border-white/5 py-4 focus-visible:text-accent outline-none" onClick={(e) => handleNavClick(e, 'testimonials')}>{content.nav.results}</a>
                        <div className="pt-4">
                            <a href="#contact" className="w-full text-center text-xl font-black text-primary bg-accent uppercase tracking-widest py-5 focus-visible:ring-4 focus-visible:ring-white outline-none rounded-xl inline-block shadow-lg" onClick={(e) => handleNavClick(e, 'contact')}>
                                {content.nav.getQuote}
                            </a>
                        </div>
                        
                        <div className="flex items-center gap-4 pt-10">
                            <button 
                                onClick={() => setLanguage('en')} 
                                className={`flex-1 py-5 rounded-xl font-black uppercase tracking-widest text-sm shadow-sm transition-all focus-visible:ring-4 focus-visible:ring-accent outline-none border-2 ${currentLang === 'en' ? 'bg-accent text-primary border-accent' : 'bg-white/5 text-white border-white/10'}`}
                                aria-pressed={currentLang === 'en'}
                            >
                                English
                            </button>
                            <button 
                                onClick={() => setLanguage('es')} 
                                className={`flex-1 py-5 rounded-xl font-black uppercase tracking-widest text-sm shadow-sm transition-all focus-visible:ring-4 focus-visible:ring-accent outline-none border-2 ${currentLang === 'es' ? 'bg-accent text-primary border-accent' : 'bg-white/5 text-white border-white/10'}`}
                                aria-pressed={currentLang === 'es'}
                            >
                                Español
                            </button>
                        </div>

                        {/* Direct Support Info in Menu */}
                        <div className="mt-12 pt-8 border-t border-white/10 text-center">
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-4">Direct Contact</p>
                            <a href="tel:+13522258389" className="text-2xl font-black text-accent tracking-tighter">+1 (352) 225-8389</a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};