import React, { useEffect } from 'react';
import type { Language } from '../types';

interface SEOHeadProps {
    title: string;
    description: string;
    canonicalUrl: string;
    enUrl: string;
    esUrl: string;
    language: Language;
    type?: string;
    ogImage?: string;
    schema?: object | object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description,
    canonicalUrl,
    enUrl,
    esUrl,
    language,
    type = 'website',
    ogImage = 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema
}) => {
    useEffect(() => {
        // 1. Update HTML lang
        document.documentElement.lang = language === 'es' ? 'es-US' : 'en-US';

        // 2. Update Title
        document.title = title;

        // 3. Update Meta Description and Meta Robots
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);

        let metaRobots = document.querySelector('meta[name="robots"]');
        if (!metaRobots) {
            metaRobots = document.createElement('meta');
            metaRobots.setAttribute('name', 'robots');
            document.head.appendChild(metaRobots);
        }
        metaRobots.setAttribute('content', 'index, follow, max-image-preview:large');

        // 4. Update Canonical
        let canonicalLink = document.getElementById('canonical-link') as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            canonicalLink.id = 'canonical-link';
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = canonicalUrl;

        // 5. Update Hreflangs
        const updateHreflang = (lang: string, href: string) => {
            let link = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.rel = 'alternate';
                link.setAttribute('hreflang', lang);
                document.head.appendChild(link);
            }
            link.href = href;
        };

        updateHreflang('en-US', enUrl);
        updateHreflang('es-US', esUrl);
        updateHreflang('x-default', enUrl);

        // 6. Update Open Graph
        const setMetaProp = (property: string, content: string) => {
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('property', property);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        setMetaProp('og:title', title);
        setMetaProp('og:description', description);
        setMetaProp('og:url', canonicalUrl);
        setMetaProp('og:type', type);
        setMetaProp('og:image', ogImage);
        setMetaProp('og:locale', language === 'es' ? 'es_US' : 'en_US');
        setMetaProp('og:locale:alternate', language === 'es' ? 'en_US' : 'es_US');

        // 7. Inject JSON-LD Schema
        if (schema) {
            let script = document.getElementById('dynamic-page-schema') as HTMLScriptElement;
            if (!script) {
                script = document.createElement('script');
                script.id = 'dynamic-page-schema';
                script.type = 'application/ld+json';
                document.head.appendChild(script);
            }
            const formattedSchema = Array.isArray(schema)
                ? { "@context": "https://schema.org", "@graph": schema }
                : schema;
            script.text = JSON.stringify(formattedSchema);
        } else {
            const script = document.getElementById('dynamic-page-schema');
            if (script) script.remove();
        }

    }, [title, description, canonicalUrl, enUrl, esUrl, language, type, ogImage, schema]);

    return null;
};
