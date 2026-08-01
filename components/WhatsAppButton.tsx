
import React from 'react';

interface WhatsAppButtonProps {
    ariaLabel: string;
}

const WHATSAPP_URL = "https://wa.me/13522258389";

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ ariaLabel }) => {
    return (
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="fixed bottom-20 md:bottom-6 right-6 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 z-50"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.383 1.905 6.344l-1.225 4.485 4.635-1.218z" />
            </svg>
        </a>
    );
};
