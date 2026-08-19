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
    ogImage = 'https://www.ahbinsurancesolutions.com/og-image.png',
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
        let canonicalLink = (document.getElementById('canonical-link') || document.querySelector('link[rel="canonical"]')) as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            canonicalLink.id = 'canonical-link';
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = canonicalUrl;

        // 5. Update Hreflangs (Unify en-US, es-US, x-default)
        const updateHreflang = (lang: string, href: string) => {
            let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement;
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
        setMetaProp('og:image:width', '1200');
        setMetaProp('og:image:height', '630');
        setMetaProp('og:locale', language === 'es' ? 'es_US' : 'en_US');
        setMetaProp('og:locale:alternate', language === 'es' ? 'en_US' : 'es_US');
        setMetaProp('twitter:card', 'summary_large_image');
        setMetaProp('twitter:title', title);
        setMetaProp('twitter:description', description);
        setMetaProp('twitter:image', ogImage);

        // 7. Update Unified JSON-LD Schema
        let script = (document.getElementById('app-ld-json') || document.querySelector('script[type="application/ld+json"]')) as HTMLScriptElement;
        if (!script) {
            script = document.createElement('script');
            script.id = 'app-ld-json';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        } else {
            script.id = 'app-ld-json';
        }

        // Clean up legacy dynamic script if it exists
        const legacyDynamicScript = document.getElementById('dynamic-page-schema');
        if (legacyDynamicScript && legacyDynamicScript !== script) {
            legacyDynamicScript.remove();
        }

        const langTag = language === 'es' ? 'es-US' : 'en-US';

        const websiteSchema = {
            "@type": "WebSite",
            "@id": "https://www.ahbinsurancesolutions.com/#website",
            "url": "https://www.ahbinsurancesolutions.com/",
            "name": "AHB Insurance Solutions",
            "description": "Licensed Medicare and Life Insurance Brokerage",
            "publisher": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
            "inLanguage": ["en-US", "es-US"]
        };

        const webpageSchema = {
            "@type": "WebPage",
            "@id": `${canonicalUrl}#webpage`,
            "url": canonicalUrl,
            "name": title,
            "description": description,
            "isPartOf": { "@id": "https://www.ahbinsurancesolutions.com/#website" },
            "about": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
            "inLanguage": langTag
        };

        const organizationSchema = {
            "@type": ["Organization", "InsuranceAgency", "LocalBusiness"],
            "@id": "https://www.ahbinsurancesolutions.com/#organization",
            "name": "AHB Insurance Solutions",
            "legalName": "AHB Insurance Solutions LLC",
            "url": "https://www.ahbinsurancesolutions.com/",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.ahbinsurancesolutions.com/andresbozoofi.webp"
            },
            "image": "https://www.ahbinsurancesolutions.com/andresbozoofi.webp",
            "description": "Licensed insurance agency specializing in Medicare Supplements, Advantage Plans, Final Expense Life Insurance, and Indexed Universal Life (IUL).",
            "telephone": "+1-352-225-8389",
            "email": "andreshbozo@ahbinsurancesolutions.com",
            "priceRange": "Free Consultation",
            "identifier": {
                "@type": "PropertyValue",
                "name": "NPN",
                "value": "21228432"
            },
            "taxID": "21228432",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "5500 SW Archer Road, Apt H103",
                "addressLocality": "Gainesville",
                "addressRegion": "FL",
                "postalCode": "32607",
                "addressCountry": "US"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "29.6015",
                "longitude": "-82.4013"
            },
            "hasMap": "https://www.google.com/maps/search/?api=1&query=5500+SW+Archer+Road+Apt+H103+Gainesville+FL+32607+USA",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "08:00",
                    "closes": "20:00"
                }
            ],
            "areaServed": {
                "@type": "State",
                "name": "Florida"
            },
            "sameAs": [
                "https://www.facebook.com/ahbinsurancesolutions",
                "https://www.instagram.com/ahbinsurancesolutions"
            ],
            "founder": {
                "@id": "https://www.ahbinsurancesolutions.com/#person"
            }
        };

        const personSchema = {
            "@type": "Person",
            "@id": "https://www.ahbinsurancesolutions.com/#person",
            "name": "Andres H. Bozo",
            "alternateName": "Andres Bozo",
            "jobTitle": "Licensed Insurance Broker",
            "worksFor": {
                "@id": "https://www.ahbinsurancesolutions.com/#organization"
            },
            "telephone": "+1-352-225-8389",
            "email": "andreshbozo@ahbinsurancesolutions.com",
            "image": "https://www.ahbinsurancesolutions.com/andresbozoofi.webp",
            "knowsAbout": ["Medicare", "Final Expense Insurance", "Life Insurance", "Indexed Universal Life (IUL)", "Burial Insurance"],
            "identifier": {
                "@type": "PropertyValue",
                "name": "NPN",
                "value": "21228432"
            }
        };

        const fullGraph: any[] = [websiteSchema, webpageSchema, organizationSchema, personSchema];

        if (schema) {
            const schemaList = Array.isArray(schema) ? schema : [schema];
            for (const item of schemaList) {
                if (item && typeof item === 'object') {
                    if ('@graph' in item && Array.isArray((item as any)['@graph'])) {
                        fullGraph.push(...(item as any)['@graph']);
                    } else {
                        const { ['@context']: _, ...rest } = item as any;
                        fullGraph.push(rest);
                    }
                }
            }
        }

        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": fullGraph
        }, null, 2);

    }, [title, description, canonicalUrl, enUrl, esUrl, language, type, ogImage, schema]);

    return null;
};
