import React, { useState, useRef, useEffect } from 'react';

interface InfoTooltipProps {
    text: string;
    label?: string;
    className?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
    text,
    label,
    className = '',
    position = 'top'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    }[position];

    return (
        <span 
            ref={containerRef}
            className={`relative inline-flex items-center align-baseline ${className}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(prev => !prev);
                }}
                className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-secondary/15 hover:bg-secondary text-secondary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 mx-1 text-[10px] font-bold cursor-pointer"
                aria-label={label || "Policy maintenance and tax disclosure"}
                aria-expanded={isOpen}
            >
                <svg 
                    className="w-2.5 h-2.5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                        clipRule="evenodd" 
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    role="tooltip"
                    className={`absolute z-50 w-72 sm:w-80 p-3.5 bg-gray-900 text-white text-xs leading-relaxed rounded-xl shadow-2xl border border-gray-700 animate-fadeIn pointer-events-auto text-left font-normal ${positionClasses}`}
                >
                    <div className="flex items-start justify-between gap-2 mb-1.5 pb-1 border-b border-gray-700">
                        <div className="flex items-center gap-1.5 text-accent font-bold text-[11px] uppercase tracking-wide">
                            <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span>Tax Advantage Notice</span>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                            className="text-gray-400 hover:text-white p-0.5"
                            aria-label="Close tooltip"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-gray-200 text-[11px] leading-normal font-sans">
                        {text}
                    </p>
                </div>
            )}
        </span>
    );
};
