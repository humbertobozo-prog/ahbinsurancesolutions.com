import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface PictureSource {
    srcSet: string;
    type?: string;
    media?: string;
    sizes?: string;
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    srcSet?: string;
    sizes?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    containerClassName?: string;
    loading?: 'lazy' | 'eager';
    fetchPriority?: 'high' | 'low' | 'auto';
    decoding?: 'async' | 'sync' | 'auto';
    sources?: PictureSource[];
    blurDataURL?: string;
    style?: React.CSSProperties;
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
    onError?: React.ReactEventHandler<HTMLImageElement>;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({
    src,
    alt,
    srcSet,
    sizes,
    width,
    height,
    className = '',
    containerClassName = '',
    loading = 'lazy',
    fetchPriority,
    decoding = 'async',
    sources,
    blurDataURL,
    style,
    onLoad,
    onError,
    ...rest
}, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const innerRef = useRef<HTMLImageElement | null>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLImageElement);

    // If cached or immediately complete, asynchronously verify decoding before removing blur
    useEffect(() => {
        if (innerRef.current?.complete && innerRef.current?.naturalWidth > 0) {
            innerRef.current.decode?.()
                .then(() => setIsLoaded(true))
                .catch(() => setIsLoaded(true));
        }
    }, [src]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setIsLoaded(true);
        if (onLoad) onLoad(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setHasError(true);
        setIsLoaded(true); // Stop shimmer on error
        if (onError) onError(e);
    };

    // Low-resolution blurred placeholder
    const placeholderUrl = blurDataURL || (
        src && src.includes('images.pexels.com')
            ? `${src.split('&w=')[0].split('?w=')[0]}${src.includes('?') ? '&' : '?'}auto=compress&cs=tinysrgb&w=32&fit=crop&q=20&blur=15`
            : undefined
    );

    const effectiveFetchPriority = fetchPriority ?? (loading === 'eager' ? 'high' : 'auto');

    const imageElement = (
        <img
            ref={innerRef}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            fetchPriority={effectiveFetchPriority}
            decoding={decoding}
            onLoad={handleLoad}
            onError={handleError}
            style={style}
            className={`w-full h-full transition-all duration-700 ease-out ${
                isLoaded
                    ? 'blur-0 scale-100 opacity-100'
                    : 'blur-md scale-105 opacity-80'
            } ${className}`}
            {...rest}
        />
    );

    return (
        <div 
            className={`relative overflow-hidden ${containerClassName}`}
            style={{
                // Prevent CLS when width and height are provided without explicit fixed container height
                ...(width && height && !containerClassName.includes('h-') && !containerClassName.includes('aspect-') 
                    ? { aspectRatio: `${width} / ${height}` } 
                    : {})
            }}
        >
            {/* Blur-up placeholder layer */}
            {!isLoaded && !hasError && (
                <div 
                    className="absolute inset-0 bg-slate-200/90 animate-pulse pointer-events-none transition-opacity duration-700 z-0 overflow-hidden"
                    style={{
                        backgroundImage: placeholderUrl ? `url(${placeholderUrl})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(16px)',
                        transform: 'scale(1.1)'
                    }}
                    aria-hidden="true"
                />
            )}

            {sources && sources.length > 0 ? (
                <picture className="w-full h-full relative z-10 block">
                    {sources.map((source, index) => (
                        <source
                            key={index}
                            srcSet={source.srcSet}
                            type={source.type}
                            media={source.media}
                            sizes={source.sizes}
                        />
                    ))}
                    {imageElement}
                </picture>
            ) : (
                <div className="w-full h-full relative z-10">
                    {imageElement}
                </div>
            )}
        </div>
    );
});

Image.displayName = 'Image';

export default Image;
