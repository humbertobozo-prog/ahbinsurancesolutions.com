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
    ogImageAlt?: string;
    datePublished?: string;
    dateModified?: string;
    schema?: object | object[];
    noindex?: boolean;
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
    ogImageAlt,
    datePublished,
    dateModified,
    schema,
    noindex = false
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
        metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

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
        setMetaProp('og:image:secure_url', ogImage);
        setMetaProp('og:image:width', '1200');
        setMetaProp('og:image:height', '630');
        const effectiveAlt = ogImageAlt || (language === 'es' 
            ? 'AHB Insurance Solutions - Especialistas en Medicare, Gastos Finales e IUL en Florida' 
            : 'AHB Insurance Solutions - Florida Medicare, Final Expense and IUL Specialists');
        setMetaProp('og:image:alt', effectiveAlt);
        setMetaProp('og:locale', language === 'es' ? 'es_US' : 'en_US');
        setMetaProp('og:locale:alternate', language === 'es' ? 'en_US' : 'es_US');
        setMetaProp('twitter:card', 'summary_large_image');
        setMetaProp('twitter:title', title);
        setMetaProp('twitter:description', description);
        setMetaProp('twitter:image', ogImage);
        setMetaProp('twitter:image:alt', effectiveAlt);

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

        const webpageSchema: Record<string, unknown> = {
            "@type": "WebPage",
            "@id": `${canonicalUrl}#webpage`,
            "url": canonicalUrl,
            "name": title,
            "description": description,
            "isPartOf": { "@id": "https://www.ahbinsurancesolutions.com/#website" },
            "about": { "@id": "https://www.ahbinsurancesolutions.com/#organization" },
            "inLanguage": langTag
        };
        if (datePublished) webpageSchema.datePublished = datePublished;
        if (dateModified) webpageSchema.dateModified = dateModified;
        if (ogImage) {
            webpageSchema.primaryImageOfPage = {
                "@type": "ImageObject",
                "url": ogImage
            };
        }

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
            "description": language === 'es'
                ? "Agencia de seguros independiente en Florida licenciada y especializada en Suplementos de Medicare (Medigap), Gastos Finales, Seguro de Vida Universal Indexada (IUL) y Anualidades."
                : "Independent licensed insurance brokerage in Florida specializing in Medicare Supplement Plans (Medigap), Final Expense Life Insurance, Indexed Universal Life (IUL), and Annuities.",
            "telephone": "+1-352-225-8389",
            "email": "andreshbozo@ahbinsurancesolutions.com",
            "priceRange": "$$",
            "currenciesAccepted": "USD",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer, Direct Debit",
            "identifier": {
                "@type": "PropertyValue",
                "name": "National Producer Number (NPN)",
                "value": "21228432",
                "url": "https://nipr.com/"
            },
            "taxID": "NPN-21228432",
            "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "name": "Florida Resident Insurance Agent License - Life, Health, and Variable Annuity",
                "credentialCategory": "State Insurance License",
                "recognizedBy": {
                    "@type": "GovernmentOrganization",
                    "name": "Florida Department of Financial Services (DFS)"
                }
            },
            "contactPoint": [
                {
                    "@type": "ContactPoint",
                    "telephone": "+1-352-225-8389",
                    "contactType": "customer service",
                    "email": "andreshbozo@ahbinsurancesolutions.com",
                    "areaServed": "US-FL",
                    "availableLanguage": ["English", "Spanish"]
                }
            ],
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
                "latitude": 29.6015,
                "longitude": -82.4013
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
            "areaServed": [
                { "@type": "State", "name": "Florida" },
                { "@type": "AdministrativeArea", "name": "Alachua County, Florida" },
                { "@type": "AdministrativeArea", "name": "Miami-Dade County, Florida" },
                { "@type": "AdministrativeArea", "name": "Orange County, Florida" },
                { "@type": "AdministrativeArea", "name": "Hillsborough County, Florida" },
                { "@type": "AdministrativeArea", "name": "Duval County, Florida" },
                { "@type": "AdministrativeArea", "name": "Broward County, Florida" },
                { "@type": "AdministrativeArea", "name": "Palm Beach County, Florida" },
                { "@type": "AdministrativeArea", "name": "Pinellas County, Florida" }
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": language === 'es' ? "Catálogo de Seguros de Florida" : "Florida Insurance Products & Brokerage",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": language === 'es' ? "Planes Suplementarios de Medicare (Medigap Plan G y N)" : "Medicare Supplement Insurance (Medigap Plan G & N)"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": language === 'es' ? "Seguro de Gastos Finales y Entierro" : "Final Expense & Senior Burial Whole Life Insurance"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": language === 'es' ? "Seguro de Vida Universal Indexada (IUL) para Retiro" : "Indexed Universal Life (IUL) Retirement Strategies"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": language === 'es' ? "Anualidades Fijas e Indexadas de Retiro" : "Fixed & Fixed Indexed Annuities (FIA)"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": language === 'es' ? "Seguro Dental, Visión y Audición Senior" : "Senior Dental, Vision & Hearing Coverage"
                        }
                    }
                ]
            },
            "sameAs": [
                "https://www.facebook.com/ahbinsurancesolutions",
                "https://www.instagram.com/ahbinsurancesolutions",
                "https://licenseesearch.fldfs.com/",
                "https://nipr.com/"
            ],
            "founder": {
                "@id": "https://www.ahbinsurancesolutions.com/#person"
            }
        };

        const personSchema = {
            "@type": "Person",
            "@id": "https://www.ahbinsurancesolutions.com/#person",
            "name": "Andres H. Bozo",
            "alternateName": ["Andres Bozo", "Andrés Bozo", "Andres H Bozo"],
            "jobTitle": language === 'es' ? "Broker de Seguros Licenciado en Florida" : "Licensed Florida Insurance Broker",
            "description": language === 'es'
                ? "Broker independiente de seguros en Florida especializado en Medicare, Seguro de Gastos Finales, Vida Universal Indexada (IUL) y Anualidades. NPN: 21228432."
                : "Independent Florida insurance broker specializing in Medicare, Final Expense Burial Insurance, Indexed Universal Life (IUL), and Annuities. NPN: 21228432.",
            "worksFor": {
                "@id": "https://www.ahbinsurancesolutions.com/#organization"
            },
            "telephone": "+1-352-225-8389",
            "email": "andreshbozo@ahbinsurancesolutions.com",
            "image": "https://www.ahbinsurancesolutions.com/andresbozoofi.webp",
            "url": language === 'es' ? "https://www.ahbinsurancesolutions.com/es/sobre-andres-bozo" : "https://www.ahbinsurancesolutions.com/about-andres-bozo",
            "knowsLanguage": ["English", "Spanish"],
            "knowsAbout": ["Medicare", "Final Expense Insurance", "Life Insurance", "Indexed Universal Life (IUL)", "Burial Insurance", "Annuities"],
            "hasCredential": [
                {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "State Insurance License",
                    "name": "Florida Resident Insurance Agent License - Life, Health, and Variable Annuity",
                    "recognizedBy": {
                        "@type": "GovernmentOrganization",
                        "name": "Florida Department of Financial Services (DFS)"
                    }
                }
            ],
            "identifier": {
                "@type": "PropertyValue",
                "name": "NPN",
                "value": "21228432"
            },
            "sameAs": [
                "https://licenseesearch.fldfs.com/",
                "https://nipr.com/"
            ]
        };

        const fullGraph: Record<string, unknown>[] = [websiteSchema, webpageSchema, organizationSchema, personSchema];

        if (schema) {
            const schemaList = Array.isArray(schema) ? schema : [schema];
            for (const item of schemaList) {
                if (item && typeof item === 'object') {
                    const recordItem = item as Record<string, unknown>;
                    if ('@graph' in recordItem && Array.isArray(recordItem['@graph'])) {
                        fullGraph.push(...(recordItem['@graph'] as Record<string, unknown>[]));
                    } else {
                        const copy = { ...recordItem };
                        delete copy['@context'];
                        fullGraph.push(copy);
                    }
                }
            }
        }

        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": fullGraph
        }, null, 2);

    }, [title, description, canonicalUrl, enUrl, esUrl, language, type, ogImage, ogImageAlt, datePublished, dateModified, schema, noindex]);

    return null;
};
