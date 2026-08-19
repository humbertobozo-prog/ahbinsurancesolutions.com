import React from 'react';
import type { TranslationContent } from '../types';
import { Logo } from './Logo';

interface FooterProps {
    content: TranslationContent['footer'];
    common: TranslationContent['common'];
    onOpenLegalModal?: (tab: 'terms' | 'privacy') => void;
}

const WHATSAPP_URL = "https://wa.me/13522258389";
const FACEBOOK_URL = "https://www.facebook.com/ahbinsurancesolutions";
const INSTAGRAM_URL = "https://www.instagram.com/ahbinsurancesolutions";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=5500+SW+Archer+Road+Apt+H103+Gainesville+FL+32607+USA";

export const Footer: React.FC<FooterProps> = ({ content, common, onOpenLegalModal }) => {
    return (
        <footer className="bg-primary text-white pt-16 pb-8" aria-label="Main Footer">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
                    <div className="lg:col-span-4">
                        <Logo variant="light" className="mb-4" />
                        <p className="text-gray-200 mb-4 leading-relaxed">{content.description}</p>
                        
                        <div className="group relative border-t border-white/20 pt-2 inline-block focus-within:ring-2 focus-within:ring-accent rounded p-1 outline-none" tabIndex={0}>
                            <p className="text-white text-sm font-bold cursor-help transition-colors hover:text-accent group-focus:text-accent">
                                {content.licenseInfo}
                            </p>
                            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block group-focus:block w-56 p-2 bg-dark-gray text-white text-[10px] rounded shadow-xl z-50 animate-fade-in-up font-medium normal-case tracking-normal">
                                {common.npnTooltip}
                                <div className="absolute top-full left-4 border-8 border-transparent border-t-dark-gray" aria-hidden="true"></div>
                            </div>
                        </div>
                        
                        {/* Enhanced SSL Badge */}
                        <div className="mt-6 flex items-center bg-white/5 p-4 rounded-xl border border-white/10 w-fit">
                            <div className="bg-green-500/20 p-2 rounded-lg mr-3">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Security Check</span>
                                <span className="text-xs font-bold text-white">{content.secureConnection}</span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="font-bold font-heading text-lg mb-4 text-white uppercase tracking-wider">{content.linksTitle}</h3>
                        <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
                            <li><a href="/medicare" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/medicare'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">Medicare Plan G & N</a></li>
                            <li><a href="/final-expense" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/final-expense'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">Final Expense / Burial</a></li>
                            <li><a href="/iul-retirement" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/iul-retirement'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">IUL Life Insurance</a></li>
                            <li><a href="/annuities-florida" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/annuities-florida'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">Annuities Florida</a></li>
                            <li><a href="/dental-vision-florida" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/dental-vision-florida'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">Senior Dental & Vision</a></li>
                            <li><a href="/blog" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/blog'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">Blog & Knowledge Hub</a></li>
                            <li><a href="/city-guides" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/city-guides'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">Florida City Guides</a></li>
                            <li><a href="/faq" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/faq'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">FAQ / Preguntas</a></li>
                            <li><a href="/about-us" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/about-us'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">{content.links.about}</a></li>
                            <li><a href="/contact" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/contact'); window.dispatchEvent(new Event('popstate')); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors">{content.links.contact}</a></li>
                            <li>
                                <a 
                                    href="/privacy" 
                                    onClick={(e) => {
                                        if (onOpenLegalModal) {
                                            e.preventDefault();
                                            onOpenLegalModal('privacy');
                                        }
                                    }} 
                                    className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors"
                                >
                                    {content.links.privacy}
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/terms" 
                                    onClick={(e) => {
                                        if (onOpenLegalModal) {
                                            e.preventDefault();
                                            onOpenLegalModal('terms');
                                        }
                                    }} 
                                    className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none px-1 rounded transition-colors"
                                >
                                    {content.links.terms}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-3" itemScope itemType="https://schema.org/InsuranceAgency">
                        <meta itemProp="name" content="AHB Insurance Solutions" />
                        <meta itemProp="image" content="https://www.ahbinsurancesolutions.com/andresbozoofi.webp" />
                        <h3 className="font-heading font-bold text-lg mb-4 text-white uppercase tracking-wider">{content.contactTitle}</h3>
                        <ul className="space-y-3 text-gray-200">
                            <li>
                                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none p-1 rounded transition-colors" itemProp="hasMap">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="whitespace-pre-line leading-relaxed">
                                        <span itemProp="streetAddress">5500 SW Archer Road, Apt H103</span>{"\n"}
                                        <span itemProp="addressLocality">Gainesville</span>, <span itemProp="addressRegion">FL</span> <span itemProp="postalCode">32607</span>, <span itemProp="addressCountry">USA</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${content.phone.replace(/-/g, '')}`} className="hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none p-1 rounded transition-colors flex items-center" itemProp="telephone">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="font-medium">{content.phone}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${content.email}`} className="hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none p-1 rounded transition-colors flex items-center" itemProp="email">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-medium truncate">{content.email}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <h3 className="font-bold font-heading text-lg mb-4 text-white uppercase tracking-wider">{content.followUsTitle}</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none p-1 rounded transition-colors flex items-center">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.383 1.905 6.344l-1.225 4.485 4.635-1.218z" />
                                    </svg>
                                    <span>{content.whatsapp}</span>
                                </a>
                            </li>
                             <li>
                                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none p-1 rounded transition-colors flex items-center">
                                    <svg aria-hidden="true" className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                    <span>{content.facebook}</span>
                                </a>
                            </li>
                            <li>
                                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent outline-none p-1 rounded transition-colors flex items-center">
                                    <svg aria-hidden="true" className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.795-.645-1.44-1.441-1.44z"></path>
                                    </svg>
                                    <span>{content.instagram}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-6 text-center text-gray-400 text-xs space-y-3">
                    <p>{content.copyright}</p>
                    {content.cmsDisclaimer && (
                        <p className="max-w-4xl mx-auto text-[11px] leading-relaxed text-gray-300 bg-white/5 p-3 rounded-lg border border-white/10">
                            {content.cmsDisclaimer}
                        </p>
                    )}
                </div>
            </div>
        </footer>
    );
};