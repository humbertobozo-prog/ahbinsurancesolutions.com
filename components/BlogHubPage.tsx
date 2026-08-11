import React, { useState } from 'react';
import type { Language } from '../types';
import { BLOG_POSTS } from '../constants/blogPosts';
import { SEOHead } from './SEOHead';

interface BlogHubPageProps {
    language: Language;
    slug?: string;
    onOpenQuote: () => void;
}

const getResponsiveImageProps = (url: string, isHero: boolean = false) => {
    if (url.includes('images.pexels.com')) {
        const baseUrl = url.split('&w=')[0].split('?w=')[0];
        const joinChar = baseUrl.includes('?') ? '&' : '?';
        const img480 = `${baseUrl}${joinChar}auto=compress&cs=tinysrgb&fit=crop&q=80&fm=webp&w=480`;
        const img800 = `${baseUrl}${joinChar}auto=compress&cs=tinysrgb&fit=crop&q=80&fm=webp&w=800`;
        const img1200 = `${baseUrl}${joinChar}auto=compress&cs=tinysrgb&fit=crop&q=80&fm=webp&w=1200`;
        
        return {
            srcSet: `${img480} 480w, ${img800} 800w, ${img1200} 1200w`,
            sizes: isHero ? "(max-width: 768px) 95vw, 800px" : "(max-width: 768px) 95vw, (max-width: 1024px) 45vw, 400px"
        };
    }
    return {};
};

export const BlogHubPage: React.FC<BlogHubPageProps> = ({ language, slug, onOpenQuote }) => {
    const isEs = language === 'es';
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    
    // Find post if slug exists
    const currentPost = slug 
        ? BLOG_POSTS.find(p => p.slug.en === slug || p.slug.es === slug) 
        : undefined;

    if (currentPost) {
        // Single Article View
        const postSlug = isEs ? currentPost.slug.es : currentPost.slug.en;
        const canonical = `${baseUrl}${isEs ? '/es/blog/' : '/blog/'}${postSlug}`;
        const enUrl = `${baseUrl}/blog/${currentPost.slug.en}`;
        const esUrl = `${baseUrl}/es/blog/${currentPost.slug.es}`;

        const postTitle = isEs ? currentPost.title.es : currentPost.title.en;
        const postExcerpt = isEs ? currentPost.excerpt.es : currentPost.excerpt.en;
        const postContent = isEs ? currentPost.content.es : currentPost.content.en;

        const articleSchema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": postTitle,
            "description": postExcerpt,
            "image": currentPost.image,
            "datePublished": currentPost.date,
            "author": {
                "@type": "Person",
                "name": currentPost.author.name,
                "jobTitle": currentPost.author.title,
                "identifier": currentPost.author.npn
            },
            "publisher": {
                "@type": "Organization",
                "name": "AHB Insurance Solutions",
                "url": baseUrl
            }
        };

        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": isEs ? "Inicio" : "Home",
                    "item": `${baseUrl}${isEs ? '/es' : '/'}`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": `${baseUrl}${isEs ? '/es/blog' : '/blog'}`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": postTitle,
                    "item": canonical
                }
            ]
        };

        return (
            <div className="bg-white min-h-screen text-dark-gray font-sans pb-16">
                <SEOHead 
                    title={`${postTitle} | AHB Insurance`}
                    description={postExcerpt}
                    canonicalUrl={canonical}
                    enUrl={enUrl}
                    esUrl={esUrl}
                    language={language}
                    type="article"
                    ogImage={currentPost.image}
                    schema={[articleSchema, breadcrumbSchema]}
                />

                {/* Breadcrumb */}
                <div className="bg-light-gray border-b border-gray-200 py-3">
                    <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                        <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                            {isEs ? 'Inicio' : 'Home'}
                        </a>
                        <span>/</span>
                        <a href={isEs ? '/es/blog' : '/blog'} className="hover:text-primary transition-colors">
                            {isEs ? 'Blog' : 'Blog'}
                        </a>
                        <span>/</span>
                        <span className="text-primary font-bold line-clamp-1 max-w-[200px] sm:max-w-none">{postTitle}</span>
                    </div>
                </div>

                <article className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
                    <div className="mb-8">
                        <span className="bg-accent text-primary text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
                            {currentPost.category}
                        </span>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-primary leading-tight mb-4">
                            {postTitle}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <img src={currentPost.author.image} alt={currentPost.author.name} className="w-8 h-8 rounded-full border border-gray-300" />
                                <div>
                                    <p className="font-bold text-gray-800">{currentPost.author.name}</p>
                                    <p className="text-[10px] text-primary">Broker NPN: {currentPost.author.npn}</p>
                                </div>
                            </div>
                            <span>•</span>
                            <span>{currentPost.date}</span>
                            <span>•</span>
                            <span>{currentPost.readTime}</span>
                        </div>
                    </div>

                    <img 
                        src={currentPost.image} 
                        {...getResponsiveImageProps(currentPost.image, true)}
                        alt={postTitle} 
                        width="800"
                        height="450"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className="w-full h-64 sm:h-96 object-cover rounded-2xl shadow-md mb-8"
                    />

                    <div className="prose prose-lg max-w-none text-gray-800 space-y-6 leading-relaxed font-normal">
                        {postContent.split('\n\n').map((paragraph, idx) => {
                            if (paragraph.startsWith('## ')) {
                                return <h2 key={idx} className="text-2xl font-black font-heading text-primary mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                            }
                            if (paragraph.startsWith('### ')) {
                                return <h3 key={idx} className="text-xl font-bold font-heading text-primary mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                            }
                            if (paragraph.startsWith('> ')) {
                                return (
                                    <blockquote key={idx} className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-xl italic text-primary font-medium my-6">
                                        {paragraph.replace('> ', '')}
                                    </blockquote>
                                );
                            }
                            return <p key={idx}>{paragraph}</p>;
                        })}
                    </div>

                    {/* Author Box */}
                    <div className="mt-12 p-6 bg-light-gray rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
                        <img src={currentPost.author.image} alt={currentPost.author.name} className="w-20 h-20 rounded-full border-2 border-primary object-cover" />
                        <div className="text-center sm:text-left flex-grow">
                            <h3 className="font-black text-primary text-lg">{currentPost.author.name}</h3>
                            <p className="text-xs text-accent-dark font-bold uppercase tracking-wider mb-2">{currentPost.author.title} | NPN: {currentPost.author.npn}</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                {isEs 
                                    ? 'Especialista independiente en Medicare y seguros de vida en Florida. Ofrece orientación profesional sin costo ni compromiso.' 
                                    : 'Independent Medicare and life insurance specialist in Florida. Providing objective guidance with no hidden fees.'}
                            </p>
                        </div>
                        <button
                            onClick={onOpenQuote}
                            className="bg-accent text-primary font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-[#FFB81C] transition-all whitespace-nowrap shadow-sm"
                        >
                            {isEs ? 'Cotizar Gratis' : 'Free Quote'}
                        </button>
                    </div>
                </article>
            </div>
        );
    }

    // Blog Hub List View
    const canonical = `${baseUrl}${isEs ? '/es/blog' : '/blog'}`;
    const enUrl = `${baseUrl}/blog`;
    const esUrl = `${baseUrl}/es/blog`;

    const title = isEs 
        ? 'Centro de Conocimiento sobre Medicare y Seguros en Florida | AHB Insurance' 
        : 'Florida Medicare & Insurance Knowledge Hub | AHB Insurance';

    const description = isEs 
        ? 'Artículos educativos, guías de inscripción abierta de Medicare, seguros de gastos finales e IUL por el broker licenciado Andrés H. Bozo.' 
        : 'Educational guides on Florida Medicare enrollment, burial insurance, and tax-free IUL retirement by licensed broker Andres H. Bozo.';

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const postTitle = isEs ? post.title.es : post.title.en;
        const postExcerpt = isEs ? post.excerpt.es : post.excerpt.en;
        const matchesSearch = postTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              postExcerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const blogBreadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEs ? "Inicio" : "Home",
                "item": `${baseUrl}${isEs ? '/es' : '/'}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEs ? "Blog y Artículos" : "Blog & Articles",
                "item": canonical
            }
        ]
    };

    return (
        <div className="bg-white min-h-screen text-dark-gray font-sans pb-16">
            <SEOHead 
                title={title}
                description={description}
                canonicalUrl={canonical}
                enUrl={enUrl}
                esUrl={esUrl}
                language={language}
                schema={blogBreadcrumbSchema}
            />

            <div className="bg-light-gray border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Blog y Artículos' : 'Blog & Articles'}</span>
                </div>
            </div>

            <section className="bg-primary text-white py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                    <span className="bg-accent text-primary text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                        {isEs ? 'Autoridad Tópica en Florida' : 'Florida Topic Authority'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black font-heading mb-4">
                        {isEs ? 'Centro de Conocimiento e Información' : 'Insurance & Medicare Knowledge Hub'}
                    </h1>
                    <p className="text-gray-200 text-sm md:text-base font-medium mb-6">
                        {isEs 
                            ? 'Guías detalladas para ayudar a la comunidad de Florida a tomar decisiones informadas sobre Medicare, gastos finales e IUL.' 
                            : 'In-depth guides designed to help Florida retirees and families navigate Medicare, burial insurance, and tax-free wealth planning.'}
                    </p>
                    <div>
                        <a 
                            href={isEs ? '/es/generador-blog' : '/blog-generator'}
                            className="bg-accent text-primary font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-[#FFB81C] transition-all inline-flex items-center gap-2 shadow-md"
                        >
                            <span>✨ {isEs ? 'Generador de Artículos IA (SEO Drafts)' : 'AI Article Generator (SEO Drafts)'}</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 md:px-6 py-10 max-w-6xl">
                {/* Search & Category Bar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-gray-200">
                    <div className="w-full md:w-80">
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={isEs ? 'Buscar artículos...' : 'Search articles...'}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        {[
                            { id: 'all', label: isEs ? 'Todos' : 'All' },
                            { id: 'medicare', label: 'Medicare' },
                            { id: 'final-expense', label: isEs ? 'Gastos Finales' : 'Final Expense' },
                            { id: 'iul', label: 'IUL' }
                        ].map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${selectedCategory === cat.id ? 'bg-primary text-white shadow' : 'bg-light-gray text-gray-700 hover:bg-gray-200'}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => {
                        const postSlug = isEs ? post.slug.es : post.slug.en;
                        const postTitle = isEs ? post.title.es : post.title.en;
                        const postExcerpt = isEs ? post.excerpt.es : post.excerpt.en;
                        const postLink = isEs ? `/es/blog/${postSlug}` : `/blog/${postSlug}`;

                        return (
                            <a 
                                key={post.id}
                                href={postLink}
                                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img 
                                        src={post.image} 
                                        {...getResponsiveImageProps(post.image, false)}
                                        alt={postTitle} 
                                        width="400"
                                        height="225"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-medium">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition-colors mb-2 leading-snug">
                                            {postTitle}
                                        </h3>
                                        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                                            {postExcerpt}
                                        </p>
                                    </div>
                                    <span className="text-xs font-black text-secondary group-hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest">
                                        {isEs ? 'Leer Artículo' : 'Read Article'} ➔
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};
