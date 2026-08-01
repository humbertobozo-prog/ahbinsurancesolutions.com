import React from 'react';

interface TapToCallButtonProps {
    label: string;
    phone: string;
}

export const TapToCallButton: React.FC<TapToCallButtonProps> = ({ label, phone }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#022A3A] border-t border-white/10 p-2 shadow-2xl">
            <a 
                href={`tel:${phone.replace(/-/g, '')}`}
                className="w-full flex items-center justify-center gap-3 bg-[#FFB81C] text-[#022A3A] hover:bg-[#E0A114] active:bg-[#C28B10] active:scale-[0.98] transition-all py-4.5 rounded-xl shadow-lg border-b-2 border-[#022A3A]/20"
                style={{ minHeight: '52px' }}
            >
                {/* Pulsing Phone Icon */}
                <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#022A3A] opacity-30"></span>
                    <svg 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="relative inline-flex h-5 w-5 text-[#022A3A] transform rotate-[15deg] animate-[shake_1.5s_infinite]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </span>
                
                <span className="text-lg font-black uppercase tracking-wider">
                    {label}
                </span>
            </a>
        </div>
    );
};
