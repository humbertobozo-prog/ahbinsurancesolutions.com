import React from 'react';

interface SpinnerProps {
    height?: string;
    size?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ height = "py-20", size = "h-16 w-16" }) => {
    return (
        <div className={`flex justify-center items-center w-full ${height}`} aria-live="polite" aria-busy="true">
            <div
                className={`animate-spin rounded-full ${size} border-t-4 border-b-4 border-primary`}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};