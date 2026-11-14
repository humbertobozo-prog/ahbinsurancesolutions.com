import React, { useState } from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { ContactForm } from './ContactForm';
import { translations } from '../constants/translations';

interface ContactPageProps {
    language: Language;
}

const SERVICE_ID = 'service_42y9pla';
const TEMPLATE_ID = 'template_yv3sr56';
const PUBLIC_KEY = 'QIDX04EOLTHErRZ7l';
const DESTINATION_EMAIL = 'andreshbozo@ahbinsurancesolutions.com';

interface DirectFormState {
    name: string;
    phone: string;
    email: string;
    zipCode: string;
    message: string;
    fax_number: string;
}

interface DirectFormErrors {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
    const isEs = language === 'es' || (typeof window !== 'undefined' && window.location.pathname.startsWith('/es'));
    const baseUrl = 'https://www.ahbinsurancesolutions.com';

    const title = isEs 
        ? 'Hable con Andrés H. Bozo | Mensaje Directo y Cotización Gratis | AHB Insurance' 
        : 'Talk With Andres H. Bozo | Direct Message & Free Quote | AHB Insurance';

    const description = isEs 
        ? 'Envíe un mensaje directo a Andrés H. Bozo (NPN 21228432) o solicite su cotización gratuita de Medicare, Gastos Finales e IUL en Florida al (352) 225-8389.' 
        : 'Send a direct message to licensed Florida broker Andres H. Bozo (NPN 21228432) or request a free Medicare, Final Expense, or IUL consultation at (352) 225-8389.';

    const content = translations[language];
    const [selectedService, setSelectedService] = useState<string>('medicare');
    const [activeMode, setActiveMode] = useState<'message' | 'quote'>('message');

    const [directForm, setDirectForm] = useState<DirectFormState>({
        name: '',
        phone: '',
        email: '',
        zipCode: '',
        message: '',
        fax_number: '',
    });
    const [directErrors, setDirectErrors] = useState<DirectFormErrors>({});
    const [directStatus, setDirectStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const services = [
        { id: 'medicare', labelEn: 'Medicare Comparison', labelEs: 'Comparación Medicare' },
        { id: 'final-expense', labelEn: 'Final Expense Quote', labelEs: 'Cotización Gastos Finales' },
        { id: 'iul', labelEn: 'IUL Review', labelEs: 'Revisión IUL' },
        { id: 'annuities', labelEn: 'Retirement Income Review', labelEs: 'Revisión Jubilación' },
        { id: 'general', labelEn: 'Ask Andres a Question', labelEs: 'Hacer Pregunta a Andrés' }
    ];

    const selectedServiceObj = services.find(s => s.id === selectedService);
    const selectedServiceLabel = selectedServiceObj
        ? (isEs ? selectedServiceObj.labelEs : selectedServiceObj.labelEn)
        : (isEs ? 'Asesoría General' : 'General Consultation');

    const handleDirectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const nextValue = name === 'zipCode' ? value.replace(/\D/g, '').slice(0, 5) : value;
        setDirectForm(prev => ({ ...prev, [name]: nextValue }));
        if (directErrors[name as keyof DirectFormErrors]) {
            setDirectErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleDirectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (directForm.fax_number !== '') return;

        const nextErrors: DirectFormErrors = {};
        if (!directForm.name.trim() || directForm.name.trim().length < 2) {
            nextErrors.name = content.contactForm.errors.nameRequired;
        }
        const cleanPhone = directForm.phone.replace(/\D/g, '');
        if (!directForm.phone.trim() || cleanPhone.length < 10) {
            nextErrors.phone = content.contactForm.errors.phoneInvalid;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!directForm.email.trim() || !emailRegex.test(directForm.email)) {
            nextErrors.email = content.contactForm.errors.emailInvalid;
        }
        if (!directForm.message.trim() || directForm.message.trim().length < 5) {
            nextErrors.message = isEs
                ? 'Por favor escriba su mensaje o consulta para Andrés.'
                : 'Please enter a short message or question for Andres.';
        }

        if (Object.keys(nextErrors).length > 0) {
            setDirectErrors(nextErrors);
            return;
        }

        setDirectStatus('loading');

        const trimmedMsg = directForm.message.trim();
        const templateParams = {
            to_email: DESTINATION_EMAIL,
            to_name: "Andres H. Bozo",
            from_name: directForm.name.trim(),
            user_email: directForm.email.trim().toLowerCase(),
            user_phone: directForm.phone.trim(),
            zip_code: directForm.zipCode.trim() || 'Not provided',
            florida_region: 'Direct Message to Andres Bozo',
            birth_year: 'N/A',
            estimated_age: 'Not specified',
            coverage_eligibility: `Direct Message [${selectedServiceLabel}] - ${trimmedMsg}`,
            message: trimmedMsg,
            submission_date: new Date().toLocaleString()
        };

        try {
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: directForm.name.trim(),
                    email: directForm.email.trim().toLowerCase(),
                    phone: directForm.phone.trim(),
                    zipCode: directForm.zipCode.trim() || undefined,
                    topic: selectedServiceLabel,
                    message: trimmedMsg,
                })
            }).catch(err => console.warn('Server contact backup ping failed:', err));

            const emailjsModule = await import('@emailjs/browser');
            const emailjs = emailjsModule.default || emailjsModule;
            const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

            if (result.status === 200) {
                setDirectStatus('success');
            } else {
                throw new Error(`EmailJS Status ${result.status}: ${result.text}`);
            }
        } catch (err: unknown) {
            console.error('Error sending direct message:', err);
            setDirectStatus('error');
            setTimeout(() => setDirectStatus('idle'), 6000);
        }
    };

    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": title,
        "description": description,
        "mainEntity": {
            "@type": "InsuranceAgency",
            "name": "AHB Insurance Solutions",
            "url": baseUrl,
            "telephone": "+1-352-225-8389",
            "email": "andreshbozo@ahbinsurancesolutions.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "5500 SW Archer Road, Ste H103",
                "addressLocality": "Gainesville",
                "addressRegion": "FL",
                "postalCode": "32607",
                "addressCountry": "US"
            }
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
                "name": isEs ? "Hablar con Andrés" : "Talk With Andres",
                "item": `${baseUrl}${isEs ? '/es/contacto' : '/contact'}`
            }
        ]
    };

    return (
        <div className="bg-white min-h-screen text-dark-gray font-sans pb-16">
            <SEOHead 
                title={title}
                description={description}
                language={language}
                ogImage="https://www.ahbinsurancesolutions.com/og-image.png"
                ogImageAlt={isEs ? "Hable directamente con Andrés H. Bozo - AHB Insurance Solutions" : "Talk Directly With Andres H. Bozo - AHB Insurance Solutions"}
                datePublished="2024-01-15"
                dateModified="2026-10-10"
                schema={[contactSchema, breadcrumbSchema]}
            />

            <div className="bg-light-gray border-b border-gray-200 py-2">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Hablar con Andrés Bozo' : 'Talk With Andres Bozo'}</span>
                </div>
            </div>

            <section className="bg-primary text-white py-8 md:py-10 text-center border-b border-white/10">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-2.5">
                        <span className="bg-accent text-primary text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                            {isEs ? 'Atención Directa con Andrés' : 'Direct Broker Access'}
                        </span>
                        <span className="bg-white/10 text-accent border border-accent/30 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                            NPN: 21228432
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black font-heading mb-2.5">
                        {isEs ? 'Hable Directamente con Andrés H. Bozo' : 'Talk Directly With Andres H. Bozo'}
                    </h1>
                    <p className="text-gray-200 text-xs md:text-base font-medium max-w-2xl mx-auto">
                        {isEs 
                            ? 'Envíe un mensaje directo a Andrés o verifique su elegibilidad en Florida para recibir opciones claras de Medicare, Gastos Finales e IUL sin costo ni presión.' 
                            : 'Send a direct message to Andres or run a quick 2027 Florida rate check for unbiased Medicare, Final Expense, or IUL guidance with zero broker fees.'}
                    </p>

                    {/* Direct Phone, WhatsApp & About Andres Card */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        <a 
                            href={isEs ? '/es/sobre-andres-bozo' : '/about-andres-bozo'}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = isEs ? '/es/sobre-andres-bozo' : '/about-andres-bozo';
                                window.history.pushState({}, '', target);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            title={isEs ? "Ver perfil y biografía de Andrés H. Bozo" : "View profile & bio of Andres H. Bozo"}
                            className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-accent/60 rounded-2xl p-2.5 pr-4 transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent shrink-0 group-hover:scale-105 transition-transform bg-slate-100">
                                <img 
                                    src="/andresbozoofi-sm.webp" 
                                    alt="Andres H. Bozo" 
                                    className="w-full h-full object-cover" 
                                    width="48" 
                                    height="48" 
                                />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-black text-white group-hover:text-accent transition-colors flex items-center gap-1">
                                    <span>Andres H. Bozo</span>
                                    <span className="text-xs text-accent">➔</span>
                                </div>
                                <div className="text-[11px] font-bold text-gray-300">
                                    {isEs ? 'Corredor Licenciado Florida · NPN: 21228432' : 'Licensed Florida Broker · NPN: 21228432'}
                                </div>
                                <div className="text-[10px] text-amber-300 font-black uppercase tracking-wider">
                                    {isEs ? 'Acerca de Andrés Bozo' : 'About Andres Bozo'}
                                </div>
                            </div>
                        </a>

                        <div className="flex flex-col sm:flex-row gap-2.5">
                            <a 
                                href="tel:+13522258389"
                                className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl font-black text-xs md:text-sm transition-all shadow-md"
                            >
                                <span>📞</span>
                                <span>(352) 225-8389</span>
                            </a>
                            <a 
                                href="https://wa.me/13522258389"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-4 py-3 rounded-xl font-black text-xs md:text-sm transition-all shadow-md"
                            >
                                <span>💬</span>
                                <span>{isEs ? 'WhatsApp Directo' : 'WhatsApp Andres'}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Topic Selector + Mode Toggle */}
            <section className="pt-8 pb-4 bg-white">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-lg md:text-xl font-black text-primary mb-4">
                        {isEs ? '1. ¿Sobre qué tema desea hablar con Andrés?' : '1. What would you like to talk with Andres about?'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
                        {services.map(s => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => setSelectedService(s.id)}
                                className={`p-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                                    selectedService === s.id
                                        ? 'bg-primary text-white border-primary shadow-md'
                                        : 'bg-light-gray hover:bg-gray-200 border-gray-200 text-dark-gray'
                                }`}
                            >
                                {isEs ? s.labelEs : s.labelEn}
                            </button>
                        ))}
                    </div>

                    {/* Mode Switcher */}
                    <div className="inline-flex flex-wrap justify-center gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
                        <button
                            type="button"
                            onClick={() => setActiveMode('message')}
                            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
                                activeMode === 'message'
                                    ? 'bg-accent text-primary shadow-sm'
                                    : 'text-gray-700 hover:text-primary'
                            }`}
                        >
                            ✉️ {isEs ? 'Enviar Mensaje a Andrés' : 'Send a Message to Andres'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveMode('quote')}
                            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
                                activeMode === 'quote'
                                    ? 'bg-accent text-primary shadow-sm'
                                    : 'text-gray-700 hover:text-primary'
                            }`}
                        >
                            ⚡ {isEs ? 'Verificar Elegibilidad 2027' : '2027 Eligibility & Rate Check'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Direct Message Form OR 3-Step Quote Calculator */}
            <section className="bg-white py-4 md:py-6">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    {activeMode === 'message' ? (
                        <div className="bg-primary text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10">
                            {directStatus === 'success' ? (
                                <div className="bg-white text-dark-gray rounded-2xl p-8 text-center space-y-5">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-black text-primary">
                                        {isEs ? '¡Mensaje Enviado a Andrés H. Bozo!' : 'Message Sent to Andres H. Bozo!'}
                                    </h3>
                                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                                        {isEs 
                                            ? `Gracias ${directForm.name}. Andrés recibió su mensaje sobre "${selectedServiceLabel}" y le responderá a la brevedad.` 
                                            : `Thank you ${directForm.name}. Andres received your message about "${selectedServiceLabel}" and will reply personally shortly.`}
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                                        <a
                                            href="tel:+13522258389"
                                            className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
                                        >
                                            📞 {isEs ? 'Llamar a Andrés Ahora' : 'Call Andres Now'}
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDirectForm({ name: '', phone: '', email: '', zipCode: '', message: '', fax_number: '' });
                                                setDirectStatus('idle');
                                            }}
                                            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                                        >
                                            {isEs ? 'Enviar Otro Mensaje' : 'Send Another Message'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-6">
                                        <span className="inline-block bg-accent/20 text-accent text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-accent/30 mb-2">
                                            {selectedServiceLabel}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-black text-white">
                                            {isEs ? 'Escriba su Mensaje Directo para Andrés' : 'Write Your Direct Message to Andres'}
                                        </h3>
                                        <p className="text-xs md:text-sm text-gray-300 mt-1">
                                            {isEs 
                                                ? 'Su mensaje llega directamente a andreshbozo@ahbinsurancesolutions.com — sin centros de llamadas ni intermediarios.' 
                                                : 'Your message goes directly to andreshbozo@ahbinsurancesolutions.com — no call centers or third-party resellers.'}
                                        </p>
                                    </div>

                                    <form onSubmit={handleDirectSubmit} className="bg-white text-dark-gray rounded-2xl p-6 md:p-8 space-y-4">
                                        <div className="hidden" aria-hidden="true">
                                            <input type="text" name="fax_number" tabIndex={-1} autoComplete="off" value={directForm.fax_number} onChange={handleDirectChange} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="direct-name" className="block text-xs font-black text-primary uppercase tracking-wider mb-1.5">
                                                    {content.contactForm.steps[3].inputs.name} *
                                                </label>
                                                <input
                                                    id="direct-name"
                                                    name="name"
                                                    type="text"
                                                    autoComplete="name"
                                                    value={directForm.name}
                                                    onChange={handleDirectChange}
                                                    placeholder={isEs ? 'Ej. María González' : 'e.g. Maria Gonzalez'}
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm font-bold ${directErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent bg-gray-50'}`}
                                                />
                                                {directErrors.name && <p className="mt-1 text-xs text-red-600 font-bold">{directErrors.name}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="direct-phone" className="block text-xs font-black text-primary uppercase tracking-wider mb-1.5">
                                                    {content.contactForm.steps[3].inputs.phone} *
                                                </label>
                                                <input
                                                    id="direct-phone"
                                                    name="phone"
                                                    type="tel"
                                                    autoComplete="tel"
                                                    value={directForm.phone}
                                                    onChange={handleDirectChange}
                                                    placeholder="(352) 225-8389"
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm font-bold ${directErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent bg-gray-50'}`}
                                                />
                                                {directErrors.phone && <p className="mt-1 text-xs text-red-600 font-bold">{directErrors.phone}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="direct-email" className="block text-xs font-black text-primary uppercase tracking-wider mb-1.5">
                                                    {content.contactForm.steps[3].inputs.email} *
                                                </label>
                                                <input
                                                    id="direct-email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    value={directForm.email}
                                                    onChange={handleDirectChange}
                                                    placeholder="ejemplo@email.com"
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm font-bold ${directErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent bg-gray-50'}`}
                                                />
                                                {directErrors.email && <p className="mt-1 text-xs text-red-600 font-bold">{directErrors.email}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="direct-zip" className="block text-xs font-black text-primary uppercase tracking-wider mb-1.5">
                                                    {isEs ? 'Código Postal en Florida (Opcional)' : 'Florida ZIP Code (Optional)'}
                                                </label>
                                                <input
                                                    id="direct-zip"
                                                    name="zipCode"
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={5}
                                                    autoComplete="postal-code"
                                                    value={directForm.zipCode}
                                                    onChange={handleDirectChange}
                                                    placeholder={isEs ? 'Ej. 32607' : 'e.g. 32607'}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent bg-gray-50 outline-none text-sm font-bold"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="direct-message" className="block text-xs font-black text-primary uppercase tracking-wider mb-1.5">
                                                {isEs ? 'Su Mensaje para Andrés H. Bozo *' : 'Your Message for Andres H. Bozo *'}
                                            </label>
                                            <textarea
                                                id="direct-message"
                                                name="message"
                                                rows={4}
                                                value={directForm.message}
                                                onChange={handleDirectChange}
                                                placeholder={isEs 
                                                    ? 'Escriba su pregunta sobre Medicare, Gastos Finales, IUL o Anualidades, su edad aproximada y el mejor horario para contactarle...' 
                                                    : 'Write your question about Medicare, Final Expense, IUL, or Annuities, your approximate age, and the best time for Andres to reach out...'}
                                                className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm font-medium text-gray-900 resize-y ${directErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent bg-gray-50'}`}
                                            />
                                            {directErrors.message && <p className="mt-1 text-xs text-red-600 font-bold">{directErrors.message}</p>}
                                        </div>

                                        {directStatus === 'error' && (
                                            <div role="alert" className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
                                                {content.contactForm.errorMessage}
                                            </div>
                                        )}

                                        <p className="text-[11px] text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-200">
                                            {content.contactForm.steps[3].legalText}
                                        </p>

                                        <button
                                            type="submit"
                                            disabled={directStatus === 'loading'}
                                            className="w-full bg-accent text-primary text-base md:text-lg font-black py-4 rounded-xl shadow-lg hover:bg-[#FFB81C] transition-all uppercase tracking-widest active:scale-95 disabled:opacity-50"
                                        >
                                            {directStatus === 'loading'
                                                ? (isEs ? 'Enviando Mensaje...' : 'Sending Message...')
                                                : (isEs ? 'Enviar Mensaje a Andrés ➔' : 'Send Message to Andres ➔')}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    ) : (
                        <ContactForm content={content.contactForm} language={language} selectedService={selectedServiceLabel} />
                    )}
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
