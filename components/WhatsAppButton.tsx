
import React from 'react';

interface WhatsAppButtonProps {
    ariaLabel?: string;
    language?: 'en' | 'es';
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ ariaLabel, language }) => {
    const isEs = language === 'es' || (typeof window !== 'undefined' && window.location.pathname.startsWith('/es'));
    
    // Dynamic contextual message based on current page
    const getWhatsAppHref = () => {
        if (typeof window === 'undefined') return "https://wa.me/13522258389";
        const path = window.location.pathname.toLowerCase();
        let message = isEs
            ? 'Hola Andrés, me gustaría hablar con usted sobre asesoría de seguros en Florida.'
            : 'Hello Andres, I would like to talk with you about insurance in Florida.';
            
        if (path.includes('medicare')) {
            message = isEs
                ? 'Hola Andrés, me gustaría obtener mi comparación de Medicare en Florida.'
                : 'Hello Andres, I would like to get my Florida Medicare comparison.';
        } else if (path.includes('final-expense') || path.includes('gastos-finales') || path.includes('burial')) {
            message = isEs
                ? 'Hola Andrés, me gustaría ver mis opciones de seguro de gastos finales.'
                : 'Hello Andres, I would like to get my Final Expense options.';
        } else if (path.includes('iul')) {
            message = isEs
                ? 'Hola Andrés, me gustaría solicitar una revisión de IUL (Vida Universal Indexada).'
                : 'Hello Andres, I would like to request an IUL review.';
        } else if (path.includes('annuities') || path.includes('anualidades')) {
            message = isEs
                ? 'Hola Andrés, me gustaría solicitar mi revisión de ingresos de jubilación y anualidades.'
                : 'Hello Andres, I would like to request my retirement income review.';
        }
        return `https://wa.me/13522258389?text=${encodeURIComponent(message)}`;
    };

    const ctaLabel = isEs ? 'Hablar con Andrés' : 'Talk With Andres';

    return (
        <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel || ctaLabel}
            title={ctaLabel}
            className="group fixed bottom-20 md:bottom-6 right-6 bg-[#075E54] text-white h-14 md:h-16 px-4 md:px-5 rounded-full flex items-center gap-3 shadow-2xl hover:bg-[#054c44] transform hover:scale-105 transition-all duration-300 z-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075E54]"
        >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.383 1.905 6.344l-1.225 4.485 4.635-1.218z" />
                </svg>
            </div>
            <span className="hidden sm:inline font-bold text-xs md:text-sm tracking-wide whitespace-nowrap text-white">
                {ctaLabel}
            </span>
        </a>
    );
};
