import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { TranslationContent, Language } from '../types';
import emailjs from '@emailjs/browser';
import { validateFloridaZip, validateBirthYear, ZipValidationResult } from '../utils/floridaZipValidator';

interface ContactFormProps {
    content: TranslationContent['contactForm'];
    language?: Language;
    onOpenLegalModal?: (tab: 'terms' | 'privacy') => void;
}

type Step = 1 | 2 | 3;

interface FormData {
    zipCode: string;
    birthYear: string;
    name: string;
    email: string;
    phone: string;
    fax_number: string; // Honeypot para spam
}

type FormErrors = {
    zipCode?: string;
    birthYear?: string;
    name?: string;
    email?: string;
    phone?: string;
};

// --- CONFIGURACIÓN DE ENVÍO AHB INSURANCE ---
const SERVICE_ID = 'service_42y9pla'; 
const TEMPLATE_ID = 'template_yv3sr56'; 
const PUBLIC_KEY = 'QIDX04EOLTHErRZ7l'; 
const DESTINATION_EMAIL = 'andreshbozo@ahbinsurancesolutions.com';

const POPULAR_FL_CITIES = [
    { name: 'Miami', zip: '33101' },
    { name: 'Orlando', zip: '32801' },
    { name: 'Tampa', zip: '33601' },
    { name: 'Gainesville', zip: '32607' },
    { name: 'Jacksonville', zip: '32202' },
];

export const ContactForm: React.FC<ContactFormProps> = ({ content, language, onOpenLegalModal }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const isSpanish = language === 'es' || content.backButton === 'Atrás' || content.stepLabel === 'Paso' || content.mainTitle.includes('Elegibilidad');

    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState<FormData>({
        zipCode: '',
        birthYear: '',
        name: '',
        email: '',
        phone: '',
        fax_number: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isShaking, setIsShaking] = useState(false);

    // Real-time validation states
    const [zipValidation, setZipValidation] = useState<ZipValidationResult>(() => validateFloridaZip('', isSpanish));
    const [yearValidation, setYearValidation] = useState(() => validateBirthYear('', isSpanish));

    useEffect(() => {
        emailjs.init(PUBLIC_KEY);
    }, []);

    // Re-evaluate validation when language changes
    useEffect(() => {
        setZipValidation(validateFloridaZip(formData.zipCode, isSpanish));
        setYearValidation(validateBirthYear(formData.birthYear, isSpanish));
    }, [isSpanish, formData.zipCode, formData.birthYear]);

    const validateField = useCallback((name: string, value: string) => {
        let error = '';
        if (name === 'zipCode') {
            const result = validateFloridaZip(value, isSpanish);
            if (!value.trim()) {
                error = isSpanish ? 'El código postal es obligatorio' : 'ZIP code is required';
            } else if (!result.isValid) {
                error = result.feedbackMessage;
            }
        } else if (name === 'birthYear') {
            const result = validateBirthYear(value, isSpanish);
            if (!value.trim()) {
                error = isSpanish ? 'El año de nacimiento es obligatorio' : 'Birth year is required';
            } else if (!result.isValid) {
                error = result.feedbackMessage;
            }
        } else if (name === 'name') {
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
            if (!value.trim()) error = content.errors.phoneInvalid; 
            else if (cleanPhone.length < 10) error = content.errors.phoneInvalid;
        }
        return error;
    }, [content.errors, isSpanish]);

    const handleZipChange = (val: string) => {
        const cleanVal = val.replace(/\D/g, '').slice(0, 5);
        setFormData(prev => ({ ...prev, zipCode: cleanVal }));
        const result = validateFloridaZip(cleanVal, isSpanish);
        setZipValidation(result);
        if (touched.zipCode) {
            setErrors(prev => ({ ...prev, zipCode: result.isValid ? undefined : result.feedbackMessage }));
        }
    };

    const handleBirthYearChange = (val: string) => {
        const cleanVal = val.replace(/\D/g, '').slice(0, 4);
        setFormData(prev => ({ ...prev, birthYear: cleanVal }));
        const result = validateBirthYear(cleanVal, isSpanish);
        setYearValidation(result);
        if (touched.birthYear) {
            setErrors(prev => ({ ...prev, birthYear: result.isValid ? undefined : result.feedbackMessage }));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'zipCode') {
            handleZipChange(value);
            return;
        }
        if (name === 'birthYear') {
            handleBirthYearChange(value);
            return;
        }
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

    const selectQuickCity = (zip: string) => {
        setTouched(prev => ({ ...prev, zipCode: true }));
        handleZipChange(zip);
    };

    const validateStep = (step: Step) => {
        const newErrors: FormErrors = {};
        let isValid = true;
        if (step === 1) {
            setTouched(prev => ({ ...prev, zipCode: true, birthYear: true }));
            const zipResult = validateFloridaZip(formData.zipCode, isSpanish);
            const yearResult = validateBirthYear(formData.birthYear, isSpanish);
            
            if (!zipResult.isValid) {
                newErrors.zipCode = zipResult.feedbackMessage;
                isValid = false;
            }
            if (!yearResult.isValid) {
                newErrors.birthYear = yearResult.feedbackMessage;
                isValid = false;
            }
        }
        setErrors(newErrors);
        return isValid;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep === 1) {
                // Step 2 is automatic qualification simulation
                setCurrentStep(2);
                setTimeout(() => setCurrentStep(3), 1600);
            } else {
                setCurrentStep(prev => (prev + 1) as Step);
            }
        } else {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 400);
        }
    };

    const resetForm = () => {
        setFormData({
            zipCode: '',
            birthYear: '',
            name: '',
            email: '',
            phone: '',
            fax_number: '',
        });
        setCurrentStep(1);
        setStatus('idle');
        setTouched({});
        setErrors({});
        setZipValidation(validateFloridaZip('', isSpanish));
        setYearValidation(validateBirthYear('', isSpanish));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.fax_number !== '') return; 

        const newErrors: FormErrors = {};
        let isValid = true;
        ['name', 'email', 'phone'].forEach(f => {
            const err = validateField(f, formData[f as keyof FormData]);
            if (err) { newErrors[f as keyof FormErrors] = err; isValid = false; }
        });
        
        if (!isValid) {
            setErrors(newErrors);
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 400);
            return;
        }

        setStatus('loading');

        const templateParams = {
            to_email: DESTINATION_EMAIL,
            to_name: "Andres H. Bozo",
            from_name: formData.name.trim(),
            user_email: formData.email.trim().toLowerCase(),
            user_phone: formData.phone.trim(),
            zip_code: formData.zipCode,
            florida_region: zipValidation.region || 'Florida Resident',
            birth_year: formData.birthYear,
            estimated_age: yearValidation.age ? `~${yearValidation.age} years old` : 'Not specified',
            coverage_eligibility: yearValidation.eligibilityText || 'Standard Florida Quote',
            submission_date: new Date().toLocaleString()
        };

        try {
            const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            
            if (result.status === 200) {
                setStatus('success');
                if (sectionRef.current) {
                    sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                throw new Error(`EmailJS Status ${result.status}: ${result.text}`);
            }
        } catch (err: unknown) {
            console.error('Error al enviar el formulario:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 6000);
        }
    };

    if (status === 'success') {
        return (
            <section id="contact" ref={sectionRef} className="py-20 bg-primary text-white scroll-mt-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto bg-white text-dark-gray p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center animate-fade-in-up">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-primary mb-3">{content.successMessage}</h3>
                        
                        {zipValidation.region && (
                            <div className="inline-block bg-primary/5 border border-primary/15 rounded-xl px-4 py-2 mb-6">
                                <p className="text-xs md:text-sm font-bold text-primary">
                                    📍 {isSpanish ? 'Ubicación' : 'Location'}: <span className="text-secondary">{zipValidation.region}</span> ({formData.zipCode})
                                </p>
                            </div>
                        )}

                        <p className="text-gray-600 font-bold uppercase tracking-widest text-xs mb-8">{content.licenseInfo}</p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="tel:+13522258389"
                                className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {isSpanish ? 'Llamar al Broker Ahora' : 'Call Broker Directly'}
                            </a>
                            <button 
                                onClick={resetForm}
                                className="w-full sm:w-auto bg-gray-100 text-gray-700 px-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all active:scale-95"
                            >
                                {content.backButton}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" ref={sectionRef} className="py-8 md:py-12 bg-primary text-white scroll-mt-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-4xl font-black font-heading mb-3 leading-tight tracking-tight px-2">
                        {content.mainTitle}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="text-xs md:text-sm font-black uppercase tracking-widest text-primary bg-accent px-4 py-1.5 rounded-full shadow-md">
                            NPN: 21228432
                        </span>
                        <span className="text-xs font-bold text-gray-200 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                            {content.licenseInfo}
                        </span>
                        <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            {isSpanish ? 'Licenciado Exclusivo en Florida' : 'Florida Licensed Broker'}
                        </span>
                    </div>
                </div>

                <div className={`max-w-4xl mx-auto bg-white text-dark-gray rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden relative transition-all duration-300 contain-form-card ${isShaking ? 'animate-shake' : ''}`}>
                    {status === 'loading' && (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-lg font-black text-primary mt-6 tracking-widest uppercase">
                                {isSpanish ? 'Transmitiendo Solicitud Segura...' : 'Securing Official Florida Quote...'}
                            </p>
                        </div>
                    )}

                    {/* Progress Bar */}
                    <div 
                        className="bg-gray-200 w-full relative"
                        role="progressbar"
                        aria-valuenow={currentStep}
                        aria-valuemin={1}
                        aria-valuemax={3}
                        aria-label={isSpanish ? `Paso ${currentStep} de 3 del formulario de cotización` : `Step ${currentStep} of 3 in quote request form`}
                    >
                        <div className="h-3 bg-accent transition-all duration-700" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em] whitespace-nowrap" aria-hidden="true">
                            {currentStep === 1 
                                ? (isSpanish ? 'Paso 1/3: Ubicación y Elegibilidad' : 'Step 1/3: Location & Eligibility') 
                                : currentStep === 2 
                                ? (isSpanish ? 'Paso 2/3: Verificando Tarifas FL' : 'Step 2/3: Verifying FL Rates') 
                                : (isSpanish ? 'Paso 3/3: Envío de Cotización' : 'Step 3/3: Quote Delivery')}
                        </div>
                    </div>
                    
                    <div className="p-5 md:p-8 min-h-[460px] flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <span className="text-xs md:text-sm font-black text-primary uppercase tracking-[0.2em] flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse inline-block"></span>
                                {isSpanish ? 'Paso' : 'Step'} {currentStep} <span className="text-accent font-bold">/</span> 3
                            </span>
                            {currentStep === 3 && (
                                <button 
                                    type="button" 
                                    onClick={() => setCurrentStep(1)} 
                                    className="text-xs text-secondary font-black uppercase tracking-widest flex items-center hover:text-primary transition-colors bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm"
                                >
                                    <span className="mr-1">←</span> {content.backButton}
                                </button>
                            )}
                        </div>

                        <div>
                            {/* STEP 1: REAL-TIME FLORIDA ZIP CODE & BIRTH YEAR VALIDATION */}
                            {currentStep === 1 && (
                                <div className="space-y-6 max-w-lg mx-auto animate-fade-in-up">
                                    <div className="text-center">
                                        <h3 className="text-xl md:text-2xl font-black text-primary mb-1.5">
                                            {isSpanish ? 'Verifique su Elegibilidad en Florida' : 'Check Your Florida Eligibility'}
                                        </h3>
                                        <p className="text-xs md:text-sm text-gray-600">
                                            {isSpanish 
                                                ? 'Andrés H. Bozo está autorizado por el Estado de Florida para asesorarle sin costo.' 
                                                : 'Licensed broker Andres H. Bozo provides zero-cost comparisons across Florida.'}
                                        </p>
                                    </div>

                                    {/* ZIP CODE FIELD WITH REAL-TIME FEEDBACK */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label htmlFor="zipCode" className="block text-xs font-black text-primary uppercase tracking-[0.1em]">
                                                {isSpanish ? 'Código Postal en Florida (ZIP)' : 'Florida ZIP Code'}
                                            </label>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                                {isSpanish ? 'Rango FL: 32003 - 34997' : 'FL Range: 32003 - 34997'}
                                            </span>
                                        </div>

                                        <div className="relative">
                                            <input 
                                                id="zipCode" 
                                                type="text" 
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={5}
                                                name="zipCode" 
                                                autoComplete="postal-code"
                                                aria-describedby={formData.zipCode.length > 0 ? "zip-feedback" : undefined}
                                                aria-invalid={touched.zipCode ? !zipValidation.isValid : undefined}
                                                value={formData.zipCode} 
                                                onChange={handleInputChange} 
                                                onBlur={handleInputBlur} 
                                                className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all text-lg font-black tracking-wider outline-none ${
                                                    zipValidation.isValid 
                                                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900 focus:ring-2 focus:ring-emerald-400' 
                                                        : zipValidation.status === 'out_of_state' || (touched.zipCode && errors.zipCode)
                                                        ? 'border-red-500 bg-red-50/50 text-red-950 focus:ring-2 focus:ring-red-300'
                                                        : zipValidation.status === 'invalid_prefix'
                                                        ? 'border-amber-500 bg-amber-50/50 text-amber-950 focus:ring-2 focus:ring-amber-300'
                                                        : 'border-gray-200 focus:border-accent bg-gray-50 text-gray-900'
                                                }`} 
                                                placeholder={isSpanish ? 'Ej. 32607, 33101' : 'e.g. 32607, 33101'} 
                                            />
                                            {zipValidation.isValid && (
                                                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md text-xs font-black" aria-label={isSpanish ? 'Código postal verificado en Florida' : 'Florida ZIP verified'}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    <span>FL OK</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Real-time Dynamic Status Message */}
                                        {formData.zipCode.length > 0 && (
                                            <div id="zip-feedback" role="status" aria-live="polite" className={`mt-2 p-2.5 rounded-lg text-xs font-bold transition-all flex items-start gap-2 ${
                                                zipValidation.feedbackType === 'success'
                                                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                                                    : zipValidation.feedbackType === 'error'
                                                    ? 'bg-red-50 border border-red-200 text-red-700'
                                                    : zipValidation.feedbackType === 'warning'
                                                    ? 'bg-amber-50 border border-amber-200 text-amber-800'
                                                    : 'bg-blue-50 border border-blue-200 text-blue-800'
                                            }`}>
                                                <span className="text-sm shrink-0" aria-hidden="true">
                                                    {zipValidation.feedbackType === 'success' ? '📍' : zipValidation.feedbackType === 'error' ? '🚫' : 'ℹ️'}
                                                </span>
                                                <div className="flex-1 leading-snug">
                                                    <p>{zipValidation.feedbackMessage}</p>
                                                    {zipValidation.status === 'out_of_state' && (
                                                        <p className="mt-1 text-[11px] text-red-600 font-semibold">
                                                            {isSpanish 
                                                                ? 'Nota: AHB Insurance Solutions sólo opera con licencia en el estado de Florida.' 
                                                                : 'Notice: AHB Insurance Solutions is strictly licensed in Florida.'}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Quick Florida Metro Selectors */}
                                        <div className="mt-2.5 pt-2 border-t border-gray-100">
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                                {isSpanish ? 'Ciudades Populares de Florida:' : 'Quick Florida Select:'}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {POPULAR_FL_CITIES.map(city => (
                                                    <button
                                                        key={city.zip}
                                                        type="button"
                                                        onClick={() => selectQuickCity(city.zip)}
                                                        className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all border ${
                                                            formData.zipCode === city.zip 
                                                                ? 'bg-primary text-white border-primary shadow-sm' 
                                                                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-accent/20 hover:border-accent/40'
                                                        }`}
                                                    >
                                                        {city.name} ({city.zip})
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* BIRTH YEAR FIELD WITH REAL-TIME ELIGIBILITY CALCULATION */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label htmlFor="birthYear" className="block text-xs font-black text-primary uppercase tracking-[0.1em]">
                                                {isSpanish ? 'Año de Nacimiento (4 dígitos)' : 'Birth Year (4 digits)'}
                                            </label>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                                {isSpanish ? 'Ej. 1958' : 'e.g. 1958'}
                                            </span>
                                        </div>

                                        <div className="relative">
                                            <input 
                                                id="birthYear" 
                                                type="text" 
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={4}
                                                name="birthYear" 
                                                autoComplete="bday-year"
                                                aria-describedby={formData.birthYear.length >= 4 ? "birth-year-feedback" : undefined}
                                                aria-invalid={touched.birthYear ? !yearValidation.isValid : undefined}
                                                value={formData.birthYear} 
                                                onChange={handleInputChange} 
                                                onBlur={handleInputBlur} 
                                                className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all text-lg font-black tracking-wider outline-none ${
                                                    yearValidation.isValid 
                                                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900 focus:ring-2 focus:ring-emerald-400' 
                                                        : (touched.birthYear && errors.birthYear)
                                                        ? 'border-red-500 bg-red-50/50 text-red-950 focus:ring-2 focus:ring-red-300'
                                                        : 'border-gray-200 focus:border-accent bg-gray-50 text-gray-900'
                                                }`} 
                                                placeholder={isSpanish ? 'Ej. 1958' : 'e.g. 1958'} 
                                            />
                                            {yearValidation.isValid && (
                                                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md text-xs font-black" aria-label={isSpanish ? `Edad aproximada: ${yearValidation.age} años` : `Approximate age: ${yearValidation.age} years`}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    <span>~{yearValidation.age} {isSpanish ? 'años' : 'yrs'}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Real-time Dynamic Age Eligibility Badge */}
                                        {formData.birthYear.length >= 4 && (
                                            <div id="birth-year-feedback" role="status" aria-live="polite" className={`mt-2 p-2.5 rounded-lg text-xs font-bold transition-all flex items-start gap-2 ${
                                                yearValidation.feedbackType === 'success'
                                                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                                                    : 'bg-red-50 border border-red-200 text-red-700'
                                            }`}>
                                                <span className="text-sm shrink-0" aria-hidden="true">
                                                    {yearValidation.feedbackType === 'success' ? '🎯' : '⚠️'}
                                                </span>
                                                <p className="leading-snug">{yearValidation.feedbackMessage}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action button */}
                                    <div className="pt-2">
                                        <button 
                                            type="button"
                                            onClick={nextStep} 
                                            disabled={!zipValidation.isValid || !yearValidation.isValid}
                                            className="w-full bg-accent text-primary text-base md:text-lg font-black py-4 rounded-xl shadow-xl hover:bg-[#FFB81C] transition-all uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-b-4 border-primary/10"
                                        >
                                            <span>{isSpanish ? 'Continuar y Ver Tarifas' : 'Continue to Rate Check'}</span>
                                            <span>➔</span>
                                        </button>
                                        
                                        {!zipValidation.isValid && formData.zipCode.length === 5 && (
                                            <p className="text-center text-xs text-red-600 font-bold mt-2" role="alert">
                                                {isSpanish 
                                                    ? '⚠️ Ingrese un código postal de Florida para continuar.' 
                                                    : '⚠️ Please enter a Florida ZIP code to proceed.'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: VERIFICATION ANIMATION WITH FLORIDA REGION HIGHLIGHT */}
                            {currentStep === 2 && (
                                <div className="text-center py-12 px-4 max-w-md mx-auto animate-fade-in-up" role="status" aria-live="polite">
                                    <div className="relative w-20 h-20 mx-auto mb-6">
                                        <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-xl" aria-hidden="true">
                                            🌴
                                        </div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-primary mb-2">
                                        {isSpanish ? 'Verificando Cobertura en Florida...' : 'Verifying Florida Eligibility...'}
                                    </h3>
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-4 text-xs md:text-sm font-bold text-emerald-900 space-y-1">
                                        <p className="flex items-center justify-center gap-1.5">
                                            <span aria-hidden="true">📍</span> {zipValidation.region || 'Florida'} (ZIP: {formData.zipCode})
                                        </p>
                                        {yearValidation.age && (
                                            <p className="text-emerald-700 text-xs">
                                                {isSpanish ? `Edad Calculada: ~${yearValidation.age} años` : `Calculated Age: ~${yearValidation.age} years`}
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium animate-pulse">
                                        {isSpanish 
                                            ? 'Comparando más de 80 aseguradoras líderes en su condado...' 
                                            : 'Querying 80+ top-rated carriers in your Florida area...'}
                                    </p>
                                </div>
                            )}

                            {/* STEP 3: LEAD CAPTURE FORM */}
                            {currentStep === 3 && (
                                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 animate-fade-in-up">
                                    <div className="text-center mb-4">
                                        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full mb-2 border border-emerald-300">
                                            <span>✓</span>
                                            <span>{isSpanish ? 'Elegibilidad Florida Confirmada' : 'Florida Rates Qualified'} ({formData.zipCode})</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-primary mb-1 leading-tight">
                                            {content.steps[3].title}
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            {content.steps[3].question}
                                        </p>
                                    </div>

                                    <div className="hidden" aria-hidden="true">
                                        <input type="text" name="fax_number" tabIndex={-1} autoComplete="off" value={formData.fax_number} onChange={handleInputChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="name" className="block text-xs md:text-sm font-black text-primary uppercase tracking-[0.1em] mb-1.5 ml-1">
                                            {content.steps[3].inputs.name}
                                        </label>
                                        <input 
                                            id="name"
                                            type="text" 
                                            name="name" 
                                            autoComplete="name" 
                                            value={formData.name} 
                                            onChange={handleInputChange} 
                                            onBlur={handleInputBlur}
                                            placeholder={isSpanish ? 'Ej. María González' : 'e.g. Maria Gonzalez'}
                                            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-base font-bold ${touched.name && errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent bg-gray-50/50'}`} 
                                        />
                                        {touched.name && errors.name && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.name}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-xs md:text-sm font-black text-primary uppercase tracking-[0.1em] mb-1.5 ml-1">
                                                {content.steps[3].inputs.phone}
                                            </label>
                                            <input 
                                                id="phone"
                                                type="tel" 
                                                name="phone" 
                                                autoComplete="tel" 
                                                placeholder="(352) 225-8389" 
                                                value={formData.phone} 
                                                onChange={handleInputChange} 
                                                onBlur={handleInputBlur}
                                                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-base font-bold ${touched.phone && errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent bg-gray-50/50'}`} 
                                            />
                                            {touched.phone && errors.phone && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.phone}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-xs md:text-sm font-black text-primary uppercase tracking-[0.1em] mb-1.5 ml-1">
                                                {content.steps[3].inputs.email}
                                            </label>
                                            <input 
                                                id="email"
                                                type="email" 
                                                name="email" 
                                                autoComplete="email" 
                                                placeholder="ejemplo@email.com"
                                                value={formData.email} 
                                                onChange={handleInputChange} 
                                                onBlur={handleInputBlur}
                                                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-base font-bold ${touched.email && errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-accent bg-gray-50/50'}`} 
                                            />
                                            {touched.email && errors.email && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.email}</p>}
                                        </div>
                                    </div>

                                    {/* Legal & Consent Notice */}
                                    <div className="pt-2 text-[11px] text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-200">
                                        <p>
                                            {content.steps[3].legalText}
                                        </p>
                                        {onOpenLegalModal && (
                                            <div className="mt-1.5 flex gap-3 text-secondary font-bold text-[11px]">
                                                <button type="button" onClick={() => onOpenLegalModal('privacy')} className="hover:underline">
                                                    {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
                                                </button>
                                                <span>•</span>
                                                <button type="button" onClick={() => onOpenLegalModal('terms')} className="hover:underline">
                                                    {isSpanish ? 'Términos de Servicio' : 'Terms of Service'}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-2">
                                        <button 
                                            type="submit" 
                                            disabled={status === 'loading'}
                                            className="w-full bg-accent text-primary text-lg md:text-xl font-black py-4 rounded-xl shadow-xl hover:bg-[#FFB81C] transition-all uppercase tracking-widest flex justify-center items-center active:scale-95 disabled:opacity-50 border-b-4 border-primary/10"
                                        >
                                            {status === 'loading' ? (isSpanish ? 'Enviando...' : 'Submitting...') : content.steps[3].submit}
                                        </button>
                                    </div>

                                    {/* Direct Phone Alternative for seniors */}
                                    <div className="text-center pt-2">
                                        <p className="text-xs text-gray-500 mb-1">
                                            {isSpanish ? '¿Prefiere hablar directamente con Andrés H. Bozo?' : 'Prefer to talk directly with Andres H. Bozo?'}
                                        </p>
                                        <a 
                                            href="tel:+13522258389" 
                                            className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-secondary transition-colors"
                                        >
                                            <span>📞 (352) 225-8389</span>
                                            <span className="text-[10px] bg-accent/30 text-primary px-1.5 py-0.5 rounded font-bold">FL BROKER</span>
                                        </a>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
