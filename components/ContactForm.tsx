import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { TranslationContent } from '../types';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
    content: TranslationContent['contactForm'];
    onOpenLegalModal?: (tab: 'terms' | 'privacy') => void;
}

type Step = 1 | 2 | 3;

interface FormData {
    interest: string;
    ageRange: string;
    name: string;
    email: string;
    phone: string;
    fax_number: string; // Honeypot para spam
}

type FormErrors = {
    name?: string;
    email?: string;
    phone?: string;
};

// --- CONFIGURACIÓN DE ENVÍO AHB INSURANCE ---
// IMPORTANTE: Para que esto funcione con Zoho Mail, debes:
// 1. EN ZOHO: Activar la "Autenticación de Dos Pasos" (TFA) en accounts.zoho.com. (OBLIGATORIO)
// 2. EN ZOHO: Generar una "App-Specific Password" (Contraseña de Aplicación).
// 3. EN EMAILJS: Usar tu correo completo como 'Username' y la contraseña generada (SIN ESPACIOS).
// 4. EN ZOHO: Habilitar IMAP/SMTP en la configuración de Zoho Mail.
// 5. Si falla el login (Error 535), verifica si tu cuenta es .com, .eu o .in y ajusta el servidor SMTP.
const SERVICE_ID = 'service_42y9pla'; 
const TEMPLATE_ID = 'template_yv3sr56'; 
const PUBLIC_KEY = 'QIDX04EOLTHErRZ7l'; 
const DESTINATION_EMAIL = 'andreshbozo@ahbinsurancesolutions.com';

export const ContactForm: React.FC<ContactFormProps> = ({ content, onOpenLegalModal }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [techError, setTechError] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        interest: '',
        ageRange: '',
        name: '',
        email: '',
        phone: '',
        fax_number: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        emailjs.init(PUBLIC_KEY);
    }, []);

    // Convierte las llaves técnicas en texto legible basado en el idioma actual
    const getReadableLabel = (field: 'interest' | 'ageRange', value: string) => {
        if (field === 'interest') {
            const options = content.steps[1].options;
            const optionsMap: Record<string, string> = {
                funeral: options.funeral,
                medicare: options.medicare,
                retirement: options.retirement,
                dental: options.dental
            };
            return optionsMap[value] || value;
        } else {
            const range = content.steps[2].options;
            const rangeMap: Record<string, string> = {
                '50-64': range.range1,
                '65-75': range.range2,
                '76+': range.range3
            };
            return rangeMap[value] || value;
        }
    };

    const validateField = useCallback((name: string, value: string) => {
        let error = '';
        if (name === 'name') {
            if (!value.trim()) error = content.errors.nameRequired;
            else if (value.trim().length < 3) error = content.errors.nameLength;
        } else if (name === 'email') {
            if (!value.trim()) error = content.errors.emailRequired;
            else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) error = content.errors.emailInvalid;
            }
        } else if (name === 'phone') {
            const cleanPhone = value.replace(/\D/g, '');
            if (!value.trim()) error = content.errors.phoneInvalid; // Use translated error
            else if (cleanPhone.length < 10) error = content.errors.phoneInvalid;
        }
        return error;
    }, [content.errors]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            const fieldError = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: fieldError || undefined }));
        }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const fieldError = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: fieldError || undefined }));
    };

    const resetForm = () => {
        setFormData({
            interest: '',
            ageRange: '',
            name: '',
            email: '',
            phone: '',
            fax_number: '',
        });
        setCurrentStep(1);
        setStatus('idle');
        setTouched({});
        setErrors({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Bloqueo de bot (Honeypot)
        if (formData.fax_number !== '') return; 

        const newErrors: FormErrors = {};
        let isValid = true;
        ['name', 'email', 'phone'].forEach(f => {
            const err = validateField(f, formData[f as keyof FormData]);
            if (err) { newErrors[f as keyof FormErrors] = err; isValid = false; }
        });
        
        if (!isValid) {
            setErrors(newErrors);
            setTouched({ name: true, email: true, phone: true });
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 400);
            return;
        }

        setStatus('loading');
        setTechError('');

        // Preparamos los parámetros de la plantilla para EmailJS
        const templateParams = {
            to_email: DESTINATION_EMAIL,
            to_name: "Andres H. Bozo",
            from_name: formData.name.trim(),
            user_email: formData.email.trim().toLowerCase(),
            user_phone: formData.phone.trim(),
            user_interest: getReadableLabel('interest', formData.interest),
            user_age: getReadableLabel('ageRange', formData.ageRange),
            reply_to: formData.email.trim().toLowerCase(), // Permite responder al cliente directamente
            submission_date: new Date().toLocaleString()
        };

        try {
            console.log('Enviando Prospecto a Zoho:', templateParams);
            const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            
            if (result.status === 200) {
                setStatus('success');
                // Scroll suave solo a la sección de contacto, no al inicio de la web
                if (sectionRef.current) {
                    sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                throw new Error(`EmailJS Status ${result.status}: ${result.text}`);
            }
        } catch (err: unknown) {
            console.error('Error al enviar el formulario:', err);
            const errorMsg = (err as { text?: string; message?: string })?.text || (err as Error)?.message || 'Error de red';
            setTechError(errorMsg);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 6000);
        }
    };

    if (status === 'success') {
        return (
            <section id="contact" ref={sectionRef} className="py-20 bg-primary text-white scroll-mt-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto bg-white text-dark-gray p-12 rounded-[2.5rem] shadow-2xl text-center animate-fade-in-up">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-3xl font-black text-primary mb-4">{content.successMessage}</h3>
                        <p className="text-gray-600 font-bold uppercase tracking-widest text-xs mb-8">{content.licenseInfo}</p>
                        
                        <button 
                            onClick={resetForm}
                            className="bg-accent text-primary px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#FFB81C] transition-all shadow-md active:scale-95"
                        >
                            {content.backButton}
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" ref={sectionRef} className="py-16 md:py-20 bg-primary text-white scroll-mt-16">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl md:text-5xl font-black font-heading mb-4 md:mb-6 leading-tight tracking-tight px-2">
                        {content.mainTitle}
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-accent/90 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                            NPN: 21228432
                        </span>
                    </div>
                </div>

                <div className={`max-w-4xl mx-auto bg-white text-dark-gray rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden relative transition-all duration-300 ${isShaking ? 'animate-shake' : ''}`}>
                    {status === 'loading' && (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-lg font-black text-primary mt-6 tracking-widest uppercase">Securing Quote...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="absolute top-4 left-4 right-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded z-40 animate-fade-in-down shadow-md">
                            <p className="font-bold">Error de Envío</p>
                            <p className="text-[10px] font-mono bg-red-100 p-1 rounded my-1">{techError}</p>
                            <p className="text-xs">{content.errorMessage}</p>
                        </div>
                    )}

                    <div className="bg-gray-200 w-full relative">
                        <div className="h-4 bg-accent transition-all duration-700" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.2em]">
                            {currentStep === 1 ? '33% Complete' : currentStep === 2 ? '66% Complete' : '100% Final Step'}
                        </div>
                    </div>
                    
                    <div className="p-6 md:p-16">
                        <div className="flex justify-between items-center mb-10 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <span className="text-xs md:text-sm font-black text-primary uppercase tracking-[0.2em] flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse inline-block"></span>
                                {content.stepLabel} {currentStep} <span className="text-accent font-bold">/</span> 3
                            </span>
                            {currentStep > 1 && (
                                <button type="button" onClick={() => setCurrentStep(prev => (prev - 1) as Step)} className="text-xs text-secondary font-black uppercase tracking-widest flex items-center hover:text-primary transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                                    <span className="mr-1">←</span> {content.backButton}
                                </button>
                            )}
                        </div>

                        <div className="animate-fade-in-up">
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl md:text-3xl font-black text-primary mb-8 text-center">{content.steps[1].question}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { key: 'funeral', label: content.steps[1].options.funeral, icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
                                            { key: 'medicare', label: content.steps[1].options.medicare, icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                                            { key: 'retirement', label: content.steps[1].options.retirement, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                                            { key: 'dental', label: content.steps[1].options.dental, icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                                        ].map((opt) => (
                                            <button
                                                key={opt.key}
                                                type="button"
                                                onClick={() => { setFormData(prev => ({ ...prev, interest: opt.key })); setCurrentStep(2); }}
                                                className="flex items-center p-6 rounded-2xl border-2 border-gray-100 hover:border-accent hover:bg-accent/5 transition-all text-left group"
                                            >
                                                <div className="p-3 rounded-xl mr-4 bg-gray-100 text-secondary group-hover:bg-accent group-hover:text-primary transition-colors">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={opt.icon}></path></svg>
                                                </div>
                                                <span className="text-lg font-black text-primary leading-tight">{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl md:text-3xl font-black text-primary mb-8 text-center">{content.steps[2].question}</h3>
                                    <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                                        {[
                                            { key: '50-64', label: content.steps[2].options.range1 },
                                            { key: '65-75', label: content.steps[2].options.range2 },
                                            { key: '76+', label: content.steps[2].options.range3 },
                                        ].map((opt) => (
                                            <button
                                                key={opt.key}
                                                type="button"
                                                onClick={() => { setFormData(prev => ({ ...prev, ageRange: opt.key })); setCurrentStep(3); }}
                                                className="p-6 rounded-2xl border-2 border-gray-100 hover:border-accent hover:bg-accent/5 text-center text-xl font-black transition-all"
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl md:text-3xl font-black text-primary mb-2 leading-tight">{content.steps[3].title}</h3>
                                    </div>

                                    {/* Honeypot field */}
                                    <div className="hidden" aria-hidden="true">
                                        <input type="text" name="fax_number" tabIndex={-1} autoComplete="off" value={formData.fax_number} onChange={handleInputChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="name" className="block text-sm md:text-base font-black text-primary uppercase tracking-[0.1em] mb-3 ml-1">{content.steps[3].inputs.name}</label>
                                        <input 
                                            id="name"
                                            type="text" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} onBlur={handleInputBlur}
                                            className={`w-full px-6 py-5 rounded-2xl border-2 outline-none transition-all text-xl font-bold ${touched.name && errors.name ? 'border-red-500 bg-red-50' : 'border-gray-250 focus:border-accent bg-gray-50/50'}`} 
                                        />
                                        {touched.name && errors.name && <p className="mt-1.5 text-xs text-red-500 font-bold uppercase">{errors.name}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm md:text-base font-black text-primary uppercase tracking-[0.1em] mb-3 ml-1">{content.steps[3].inputs.phone}</label>
                                            <input 
                                                id="phone"
                                                type="tel" name="phone" autoComplete="tel" placeholder="+1" value={formData.phone} onChange={handleInputChange} onBlur={handleInputBlur}
                                                className={`w-full px-6 py-5 rounded-2xl border-2 outline-none transition-all text-xl font-bold ${touched.phone && errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-250 focus:border-accent bg-gray-50/50'}`} 
                                            />
                                            {touched.phone && errors.phone && <p className="mt-1.5 text-xs text-red-500 font-bold uppercase">{errors.phone}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm md:text-base font-black text-primary uppercase tracking-[0.1em] mb-3 ml-1">{content.steps[3].inputs.email}</label>
                                            <input 
                                                id="email"
                                                type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} onBlur={handleInputBlur}
                                                className={`w-full px-6 py-5 rounded-2xl border-2 outline-none transition-all text-xl font-bold ${touched.email && errors.email ? 'border-red-500 bg-red-50' : 'border-gray-250 focus:border-accent bg-gray-50/50'}`} 
                                            />
                                            {touched.email && errors.email && <p className="mt-1.5 text-xs text-red-500 font-bold uppercase">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <p className="text-xs md:text-sm text-gray-500 italic mb-3 text-center leading-relaxed font-medium">{content.steps[3].legalText}</p>
                                        <div className="flex justify-center items-center gap-3 text-xs font-bold text-gray-600 mb-6 flex-wrap">
                                            <button 
                                                type="button" 
                                                onClick={() => onOpenLegalModal ? onOpenLegalModal('terms') : window.location.href = '/terms'}
                                                className="text-secondary hover:text-primary underline transition-colors"
                                            >
                                                Términos de Servicio / Terms
                                            </button>
                                            <span>•</span>
                                            <button 
                                                type="button" 
                                                onClick={() => onOpenLegalModal ? onOpenLegalModal('privacy') : window.location.href = '/privacy'}
                                                className="text-secondary hover:text-primary underline transition-colors"
                                            >
                                                Política de Privacidad / Privacy
                                            </button>
                                        </div>
                                        <button 
                                            type="submit" 
                                            disabled={status === 'loading'}
                                            className="w-full bg-accent text-primary text-xl md:text-2xl font-black py-5 md:py-6 rounded-2xl shadow-xl hover:bg-[#FFB81C] transition-all uppercase tracking-widest flex justify-center items-center active:scale-95 disabled:opacity-50 border-b-4 border-primary/10"
                                        >
                                            {status === 'loading' ? 'Enviando...' : content.steps[3].submit}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Highly prominent phone-call alternative for Seniors 50+ */}
                <div className="max-w-4xl mx-auto mt-12 p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm text-center flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/20 transition-colors">
                    <div className="text-center md:text-left">
                        <span className="inline-flex items-center gap-1.5 bg-accent/25 text-accent text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-accent/20 mb-3">
                            ⚡ Fast VIP Alternative
                        </span>
                        <h4 className="text-2xl font-black text-white leading-tight flex items-center justify-center md:justify-start gap-2.5">
                            <svg className="w-6 h-6 animate-pulse text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Prefer to speak to a licensed human?
                        </h4>
                        <p className="text-lg text-gray-300 font-semibold mt-1 leading-relaxed">
                            Skip the questions! Call Andres Bozo directly for friendly help in English or Spanish.
                        </p>
                    </div>
                    <div className="w-full md:w-auto flex-shrink-0">
                        <a 
                            href="tel:+13522258389" 
                            className="w-full md:w-auto text-center inline-flex items-center justify-center gap-3 bg-accent text-primary px-8 py-5 rounded-xl font-black uppercase tracking-widest text-lg md:text-xl hover:bg-[#FFB81C] hover:scale-105 active:scale-95 transition-all shadow-xl border-b-4 border-primary/10"
                        >
                            Call +1 (352) 225-8389
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};