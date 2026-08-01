import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    componentName?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`ErrorBoundary caught an error in ${this.props.componentName || 'a component'}:`, error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="my-6 p-6 bg-amber-50/80 border border-amber-200 rounded-2xl text-center shadow-sm max-w-2xl mx-auto">
                    <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold font-heading text-primary mb-1">
                        Unable to load content
                    </h3>
                    <p className="text-xs text-gray-600 mb-4 font-medium">
                        {this.state.error?.message?.includes('Fetch') || this.state.error?.message?.includes('import') 
                            ? 'A network issue prevented loading this section. Please check your connection and retry.'
                            : 'An unexpected error occurred while loading this section.'}
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Retry Loading
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
