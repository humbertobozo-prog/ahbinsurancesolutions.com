
import React from 'react';

interface LogoProps {
    variant?: 'primary' | 'light';
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'primary', className = '' }) => {
    const primaryColor = variant === 'primary' ? '#003366' : '#FFFFFF';
    const accentColor = '#F2A900'; // Always gold
    const taglineColor = variant === 'primary' ? '#006699' : '#D1D5DB'; // secondary or gray-300

    return (
        <svg
            className={`${className} w-[160px] md:w-[225px] h-auto`}
            viewBox="0 0 225 40"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="logoTitle logoDesc"
        >
            <title id="logoTitle">AHB Insurance Solutions</title>
            <desc id="logoDesc">The logo for AHB Insurance Solutions, showing the company name in stylized text.</desc>
            <g>
                <text 
                    x="3" 
                    y="28" 
                    fontFamily="Montserrat, sans-serif" 
                    fontSize="30" 
                    fontWeight="700" 
                    fill={primaryColor}
                >
                    AHB
                </text>
                {/* A decorative line */}
                <rect x="78" y="8" width="3" height="24" fill={accentColor} rx="1.5" />
                <text 
                    x="90" 
                    y="24" 
                    fontFamily="Roboto, sans-serif" 
                    fontSize="13" 
                    fontWeight="500" 
                    fill={taglineColor}
                    letterSpacing="0.5"
                >
                    Insurance Solutions
                </text>
            </g>
        </svg>
    );
};
