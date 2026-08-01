import React, { useState } from 'react';
import type { Language } from '../types';
import { legalContent } from '../constants/legalContent';

interface TermsAndPrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'terms' | 'privacy';
    language: Language;
}

export const TermsAndPrivacyModal: React.FC<TermsAndPrivacyModalProps> = ({
    isOpen,
    onClose,
    initialTab = 'terms',
    language
}) => {
    const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(initialTab);

    // Keep active tab synced if opened with initialTab prop
    React.useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
        }
    }, [isOpen, initialTab]);

    if (!isOpen) return null;

    const doc = legalContent[language][activeTab];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
        >
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] transition-all">
                {/* Header */}
                <div className="bg-primary text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-accent/20">
                                AHB Insurance Solutions
                            </span>
                            <span className="text-gray-300 text-xs">
                                NPN: 21228432
                            </span>
                        </div>
                        <h2 id="legal-modal-title" className="text-2xl font-black font-heading leading-tight text-white">
                            {doc.title}
                        </h2>
                        <p className="text-xs text-gray-300 mt-1">{doc.lastUpdated}</p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                        <button
                            onClick={handlePrint}
                            className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                            title={language === 'es' ? 'Imprimir documento' : 'Print document'}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            <span className="hidden sm:inline">{language === 'es' ? 'Imprimir' : 'Print'}</span>
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/10 text-white hover:bg-accent hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-accent"
                            aria-label={language === 'es' ? 'Cerrar modal' : 'Close modal'}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-light-gray p-2 px-6 border-b border-gray-200 flex gap-2">
                    <button
                        onClick={() => setActiveTab('terms')}
                        className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all uppercase tracking-wider ${
                            activeTab === 'terms'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-600 hover:text-primary hover:bg-gray-200/60'
                        }`}
                    >
                        {language === 'es' ? 'Términos de Servicio' : 'Terms of Service'}
                    </button>
                    <button
                        onClick={() => setActiveTab('privacy')}
                        className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all uppercase tracking-wider ${
                            activeTab === 'privacy'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-600 hover:text-primary hover:bg-gray-200/60'
                        }`}
                    >
                        {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
                    </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-grow">
                    {doc.sections.map((section) => (
                        <section key={section.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                            <h3 className="text-lg md:text-xl font-black font-heading text-primary mb-3 leading-snug">
                                {section.heading}
                            </h3>
                            <div className="space-y-3 text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                                {section.content.map((paragraph, pIdx) => (
                                    <p key={pIdx}>{paragraph}</p>
                                ))}
                                {section.bulletPoints && (
                                    <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                                        {section.bulletPoints.map((bp, bpIdx) => (
                                            <li key={bpIdx}>{bp}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Footer Bar */}
                <div className="bg-gray-50 p-4 px-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="font-bold text-gray-800">
                            AHB Insurance Solutions • Licensed Florida Broker NPN: 21228432
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a 
                            href="tel:13522258389" 
                            className="text-secondary hover:text-primary font-black underline flex items-center gap-1"
                        >
                            📞 +1 (352) 225-8389
                        </a>
                        <button
                            onClick={onClose}
                            className="bg-primary text-white px-5 py-2 rounded-xl font-bold hover:bg-secondary transition-colors"
                        >
                            {language === 'es' ? 'Entendido y Cerrar' : 'Close Legal Notice'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
