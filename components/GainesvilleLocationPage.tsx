import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Hospital, 
  Building2, 
  UserCheck, 
  HelpCircle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { BackToTopButton } from './BackToTopButton';
import { Footer } from './Footer';
import { TapToCallButton } from './TapToCallButton';
import { WhatsAppButton } from './WhatsAppButton';
import { translations } from '../constants/translations';

interface GainesvilleLocationPageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  renderContactForm: () => React.ReactNode;
  onOpenLegalModal?: (tab: 'terms' | 'privacy') => void;
}

export const GainesvilleLocationPage: React.FC<GainesvilleLocationPageProps> = ({
  language,
  setLanguage,
  renderContactForm,
  onOpenLegalModal,
}) => {
  const isEs = language === 'es';
  const content = translations[language];
  const [activeTab, setActiveTab] = useState<'medicare' | 'final-expense' | 'iul' | 'annuities'>('medicare');

  const baseUrl = 'https://www.ahbinsurancesolutions.com';
  const canonicalUrl = `${baseUrl}${isEs ? '/es/locations/gainesville-fl' : '/locations/gainesville-fl'}`;
  const enUrl = `${baseUrl}/locations/gainesville-fl`;
  const esUrl = `${baseUrl}/es/locations/gainesville-fl`;

  const pageTitle = isEs
    ? "Broker de Seguros de Medicare y Vida en Gainesville, FL | AHB Insurance Solutions"
    : "Medicare & Life Insurance Broker in Gainesville, FL | AHB Insurance Solutions";

  const pageDescription = isEs
    ? "Corredor de seguros local e independiente en Gainesville, FL (5500 SW Archer Rd). Asesoría experta en Medicare Medigap (UF Health Shands), Gastos Finales e IUL en el Condado de Alachua, Archer, Newberry y High Springs. Andrés Bozo NPN 21228432."
    : "Local independent insurance broker in Gainesville, FL (5500 SW Archer Rd). Expert Medicare Medigap (UF Health Shands access), Final Expense & IUL guidance across Alachua County, Archer, Newberry & High Springs. Andres Bozo NPN 21228432.";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InsuranceAgency", "FinancialService"],
    "@id": "https://www.ahbinsurancesolutions.com/#organization",
    "name": "AHB Insurance Solutions - Gainesville",
    "legalName": "AHB Insurance Solutions LLC",
    "url": canonicalUrl,
    "image": "https://www.ahbinsurancesolutions.com/andresbozoofi.webp",
    "telephone": "+1-352-225-8389",
    "email": "andreshbozo@ahbinsurancesolutions.com",
    "priceRange": "Free Consultation",
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
    "areaServed": [
      { "@type": "City", "name": "Gainesville" },
      { "@type": "AdministrativeArea", "name": "Alachua County" },
      { "@type": "City", "name": "Archer" },
      { "@type": "City", "name": "Newberry" },
      { "@type": "City", "name": "High Springs" },
      { "@type": "City", "name": "Alachua" },
      { "@type": "City", "name": "Hawthorne" },
      { "@type": "City", "name": "Micanopy" },
      { "@type": "City", "name": "Waldo" },
      { "@type": "State", "name": "Florida" }
    ],
    "founder": {
      "@type": "Person",
      "name": "Andres H. Bozo",
      "jobTitle": isEs ? "Broker de Seguros Licenciado" : "Licensed Insurance Broker",
      "identifier": {
        "@type": "PropertyValue",
        "name": "NPN",
        "value": "21228432"
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
        "item": isEs ? `${baseUrl}/es` : baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isEs ? "Ubicaciones" : "Locations",
        "item": isEs ? `${baseUrl}/es/guias-ciudades` : `${baseUrl}/city-guides`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": isEs ? "Gainesville, FL" : "Gainesville, FL",
        "item": canonicalUrl
      }
    ]
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [language]);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans flex flex-col min-h-screen pb-20 md:pb-0">
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        enUrl={enUrl}
        esUrl={esUrl}
        language={language}
        schema={[localBusinessSchema, breadcrumbSchema]}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumbs" className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs py-3 px-4 md:px-6">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a 
                href={isEs ? "/es" : "/"} 
                onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', isEs ? '/es' : '/'); window.dispatchEvent(new Event('popstate')); }}
                className="hover:text-amber-400 transition-colors"
              >
                {isEs ? "Inicio" : "Home"}
              </a>
              <span className="text-slate-600">/</span>
              <a 
                href={isEs ? "/es/guias-ciudades" : "/city-guides"} 
                onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', isEs ? '/es/guias-ciudades' : '/city-guides'); window.dispatchEvent(new Event('popstate')); }}
                className="hover:text-amber-400 transition-colors"
              >
                {isEs ? "Florida" : "Florida"}
              </a>
              <span className="text-slate-600">/</span>
              <span className="text-amber-400 font-bold">Gainesville (Alachua County)</span>
            </div>

            <button
              onClick={() => {
                const newLang = isEs ? 'en' : 'es';
                setLanguage(newLang);
                const newPath = newLang === 'es' ? '/es/locations/gainesville-fl' : '/locations/gainesville-fl';
                window.history.pushState({}, '', newPath);
                window.dispatchEvent(new Event('popstate'));
              }}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1 rounded-md text-xs font-bold border border-slate-700 transition-colors"
            >
              <span>{isEs ? "🇺🇸 English" : "🇪🇸 Español"}</span>
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#022A3A] to-[#011B25] text-white py-12 md:py-20 border-b border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl">
              
              {/* Local Agency Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>5500 SW Archer Rd, Gainesville, FL 32607</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white mb-6 leading-[1.1]">
                {isEs 
                  ? "Broker de Seguros de Medicare y Vida en Gainesville, FL" 
                  : "Medicare & Life Insurance Broker in Gainesville, FL"}
              </h1>

              <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-medium mb-8 max-w-3xl">
                {isEs 
                  ? "Asesoría independiente y personalizada en Gainesville y todo el Condado de Alachua. Comparamos más de 80 aseguradoras líderes para Suplementos de Medicare (Medigap), Gastos Finales, Seguro de Vida IUL y Anualidades. Acceso directo sin restricciones a UF Health Shands y HCA Florida." 
                  : "Local independent insurance brokerage serving Gainesville, Alachua County, Archer, Newberry, and High Springs. We compare 80+ top carriers for Medicare Supplements (Medigap), Final Expense Whole Life, Indexed Universal Life (IUL), and Annuities with zero broker fees."}
              </p>

              {/* CTAs and Local Phone */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base md:text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all uppercase tracking-wide"
                >
                  <span>{isEs ? "Solicitar Cotización Local" : "Get Your Local Quote"}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <a 
                  href="tel:+13522258389" 
                  className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base md:text-lg px-6 py-4 rounded-xl transition-all"
                >
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>(352) 225-8389</span>
                </a>
              </div>

              {/* Local Trust Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-700/60 text-xs md:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEs ? "Licencia Florida DFS" : "FL DFS Licensed"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>NPN: 21228432</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEs ? "80+ Aseguradoras" : "80+ Top Carriers"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEs ? "Asesoría 100% Gratuita" : "100% Free Advisory"}</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Local Office & Service Region Highlights */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {isEs ? "Sede Local en Alachua County" : "Alachua County Local Headquarters"}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
                  {isEs 
                    ? "Su Corredor de Confianza en Gainesville, Florida" 
                    : "Your Trusted Independent Insurance Broker in Gainesville, FL"}
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-4">
                  {isEs 
                    ? "Ubicados en 5500 SW Archer Road, AHB Insurance Solutions brinda atención presencial en Gainesville y las comunidades aledañas del Condado de Alachua, así como consultas telefónicas o por videollamada. Como corredor independiente regulado por el Departamento de Servicios Financieros de Florida (DFS), Andrés Bozo trabaja exclusivamente para el beneficio de sus clientes, no para una aseguradora en particular."
                    : "Headquartered at 5500 SW Archer Road, AHB Insurance Solutions provides in-person consultations throughout Gainesville and surrounding Alachua County communities, as well as phone and secure video meetings. As an independent broker regulated by the Florida Department of Financial Services (DFS), Andres Bozo works directly for you—not for an insurance company."}
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Gainesville (32607, 32608, 32601, 32605)</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Archer (32618)</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Newberry (32669)</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">High Springs (32643)</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Alachua (32615)</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Tioga & Jonesville</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Haile Plantation</span>
                </div>
              </div>

              {/* Local Contact Card */}
              <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-800">
                <h3 className="text-xl font-black text-amber-400 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span>{isEs ? "Oficina de Gainesville" : "Gainesville Office"}</span>
                </h3>
                <div className="space-y-3 text-sm text-slate-300 mb-6">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>5500 SW Archer Road, Apt H103<br />Gainesville, FL 32607</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <a href="tel:+13522258389" className="hover:text-amber-300 font-bold text-white transition-colors">
                      +1 (352) 225-8389
                    </a>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="truncate">andreshbozo@ahbinsurancesolutions.com</span>
                  </p>
                  <p className="flex items-center gap-2.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <UserCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Andres Bozo (NPN: 21228432)</span>
                  </p>
                </div>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=5500+SW+Archer+Road+Apt+H103+Gainesville+FL+32607+USA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold py-2.5 px-4 rounded-lg border border-slate-700 transition-colors"
                >
                  <span>{isEs ? "Abrir en Google Maps" : "View on Google Maps"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Detailed Services Navigation / Tabs */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
                {isEs ? "Servicios Exclusivos para Gainesville y Alachua" : "Exclusive Gainesville & Alachua County Coverage"}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-4">
                {isEs 
                  ? "Soluciones de Seguros Diseñadas para Residentes de Gainesville" 
                  : "Insurance Solutions Built for Gainesville Residents"}
              </h2>
              <p className="text-slate-600 text-base md:text-lg">
                {isEs 
                  ? "Seleccione un área de cobertura para conocer las ventajas específicas para la comunidad local de Gainesville." 
                  : "Explore our specialized coverage lines designed specifically for Gainesville retirees, families, and professionals."}
              </p>
            </div>

            {/* Service Selection Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
              <button
                onClick={() => setActiveTab('medicare')}
                className={`px-5 py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                  activeTab === 'medicare'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {isEs ? "Medicare & Medigap Gainesville" : "Medicare & Medigap Gainesville"}
              </button>
              <button
                onClick={() => setActiveTab('final-expense')}
                className={`px-5 py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                  activeTab === 'final-expense'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {isEs ? "Gastos Finales & Funeral" : "Final Expense & Burial"}
              </button>
              <button
                onClick={() => setActiveTab('iul')}
                className={`px-5 py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                  activeTab === 'iul'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {isEs ? "Seguro de Vida IUL Gainesville" : "IUL Life Insurance Gainesville"}
              </button>
              <button
                onClick={() => setActiveTab('annuities')}
                className={`px-5 py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                  activeTab === 'annuities'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {isEs ? "Anualidades de Retiro" : "Retirement Annuities"}
              </button>
            </div>

            {/* Tab 1: Medicare & Medigap Gainesville */}
            {activeTab === 'medicare' && (
              <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                    <Hospital className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      {isEs ? "Medicare y Medigap en Gainesville y Condado de Alachua" : "Medicare & Medigap in Gainesville & Alachua County"}
                    </h3>
                    <p className="text-sm text-slate-500 font-semibold">
                      {isEs ? "Acceso sin trabas a UF Health Shands, HCA Florida y Malcom Randall VA" : "Unrestricted Access to UF Health Shands, HCA Florida & Malcom Randall VA"}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 text-slate-700 leading-relaxed">
                  <p>
                    {isEs 
                      ? "Gainesville es el epicentro médico del norte de Florida gracias al reconocido sistema UF Health Shands Hospital y al HCA Florida North Florida Hospital. Sin embargo, muchos beneficiarios de Medicare que eligen planes Medicare Advantage HMO se encuentran con limitaciones de red, retrasos en aprobaciones previas y dificultades para ver a especialistas clave."
                      : "Gainesville is North Central Florida's premier medical hub, anchored by UF Health Shands Hospital, HCA Florida North Florida Hospital, and the Malcom Randall VA Medical Center. However, many retirees enrolled in Medicare Advantage HMO plans discover restrictive provider networks and prior authorization roadblocks when trying to see top specialists."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>{isEs ? "Ventajas de Medigap Plan G / N en Gainesville" : "Medigap Plan G & N Advantages in Gainesville"}</span>
                      </h4>
                      <ul className="text-sm space-y-2 text-slate-600">
                        <li>• {isEs ? "Libertad total para atenderse en UF Health Shands y HCA North Florida." : "Complete freedom to visit UF Health Shands and HCA North Florida."}</li>
                        <li>• {isEs ? "Sin necesidad de referidos de médico primario para ver especialistas." : "Zero primary care referrals needed to consult specialists."}</li>
                        <li>• {isEs ? "Cobertura válida en cualquier hospital de Florida y todo Estados Unidos." : "Nationwide coverage at any hospital or clinic accepting Medicare."}</li>
                        <li>• {isEs ? "Costos predecibles de bolsillo sin copagos sorpresa." : "Predictable out-of-pocket costs with no surprise copays."}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <span>{isEs ? "Período de Inscripción Abierta en Florida" : "Florida Medigap Open Enrollment Window"}</span>
                      </h4>
                      <p className="text-sm text-slate-600 mb-2">
                        {isEs 
                          ? "Durante su ventana de 6 meses (inicia al cumplir 65 años e inscribirse en la Parte B), tiene Derechos de Emisión Garantizada sin preguntas de salud." 
                          : "During your 6-month Medigap Open Enrollment window (starts the month you turn 65 and enroll in Part B), you have Guaranteed Issue Rights without medical underwriting."}
                      </p>
                      <p className="text-xs text-slate-500 italic">
                        {isEs 
                          ? "“Rangos de primas únicamente ilustrativos. Las primas reales varían por código postal, edad, aseguradora, método de tarificación y elegibilidad. Solicite una comparación personalizada.” (Actualizado: Septiembre 2026)." 
                          : "“Illustrative premium ranges only. Actual premiums vary by ZIP code, age, carrier, rating method and eligibility. Request a personalized comparison.” (Updated: September 2026)."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-600">
                      {isEs ? "¿Desea comparar opciones de Medicare en Alachua County?" : "Ready to compare Gainesville Medicare plans?"}
                    </p>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
                    >
                      <span>{isEs ? "Comparar Tarifas de Medigap" : "Compare Medigap Rates"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Final Expense & Burial Gainesville */}
            {activeTab === 'final-expense' && (
              <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      {isEs ? "Seguro de Gastos Finales y Entierro en Gainesville" : "Final Expense & Burial Insurance in Gainesville, FL"}
                    </h3>
                    <p className="text-sm text-slate-500 font-semibold">
                      {isEs ? "Protección familiar frente a costos funerarios en el Condado de Alachua" : "Protecting Alachua County Families from Unexpected Funeral Costs"}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 text-slate-700 leading-relaxed">
                  <p>
                    {isEs 
                      ? "En el área de Gainesville, Archer, Newberry y High Springs, los costos de un servicio funerario completo o cremación tradicional oscilan habitualmente entre $7,200 y $9,800. Dado que el beneficio único de defunción del Seguro Social federal es de tan solo $255 para cónyuges elegibles, las familias a menudo enfrentan una carga económica imprevista."
                      : "In Gainesville, Archer, Newberry, and High Springs, traditional funeral, cemetery, or memorial service costs typically range between $7,200 and $9,800. With the standard Social Security one-time death benefit set at just $255 for eligible spouses, surviving family members often face immediate out-of-pocket stress."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        {isEs ? "Funerarias y Cementerios Locales en Alachua County" : "Alachua County Funeral & Cemetery Context"}
                      </h4>
                      <p className="text-sm text-slate-600 mb-3">
                        {isEs 
                          ? "Nuestras pólizas de vida entera pagan un beneficio en efectivo directo a sus beneficiarios, brindándoles libertad total para trabajar con cualquier proveedor local:" 
                          : "Our whole life policies pay immediate cash directly to your beneficiaries, allowing complete flexibility to work with any local provider:"}
                      </p>
                      <ul className="text-xs space-y-1 text-slate-600 font-medium">
                        <li>• Forest Meadows Funeral Home & Cemetery (Gainesville)</li>
                        <li>• Williams-Thomas Funeral Homes (Downtown & Westside)</li>
                        <li>• Milam Funeral and Cremation Services (Gainesville & Newberry)</li>
                        <li>• Chestnut Funeral Home (Gainesville)</li>
                        <li>• Prairie Creek Conservation Cemetery (Gainesville)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        {isEs ? "Características Clave de la Póliza" : "Key Policy Highlights"}
                      </h4>
                      <ul className="text-sm space-y-2 text-slate-600">
                        <li>• <strong>{isEs ? "Beneficio en Efectivo:" : "Cash Benefit:"}</strong> $5,000 {isEs ? "a" : "to"} $35,000.</li>
                        <li>• <strong>{isEs ? "Tarifas Congeladas:" : "Locked Premiums:"}</strong> {isEs ? "Sus cuotas jamás subirán por edad o salud." : "Rates never increase regardless of age or health changes."}</li>
                        <li>• <strong>{isEs ? "Emisión Simplificada:" : "Simplified Issue:"}</strong> {isEs ? "Muchas pólizas no requieren examen médico tradicional." : "Many policies do not require a traditional medical exam."}</li>
                        <li>• <strong>{isEs ? "Uso Libre:" : "Unrestricted Funds:"}</strong> {isEs ? "Para funeral, cremación, deudas médicas o legado familiar." : "Use for burial, cremation, leftover bills, or family legacy."}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-600">
                      {isEs ? "¿Desea calcular una cuota para seguro de entierro?" : "Need a custom burial insurance quote in Gainesville?"}
                    </p>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
                    >
                      <span>{isEs ? "Cotizar Gastos Finales" : "Get Final Expense Quote"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: IUL Life Insurance Gainesville */}
            {activeTab === 'iul' && (
              <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      {isEs ? "Seguro de Vida Universal Indexada (IUL) en Gainesville" : "Indexed Universal Life (IUL) in Gainesville, FL"}
                    </h3>
                    <p className="text-sm text-slate-500 font-semibold">
                      {isEs ? "Crecimiento indexado, protección familiar y ventajas fiscales bajo el Código IRS 7702" : "Index-Linked Cash Value, Family Protection & IRS Section 7702 Benefits"}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 text-slate-700 leading-relaxed">
                  <p>
                    {isEs 
                      ? "Gainesville cuenta con una próspera comunidad de profesores y personal universitario de la University of Florida (UF), médicos e investigadores de UF Health, personal del VA y propietarios de pequeñas empresas en Alachua, Newberry y High Springs. Para quienes buscan complementar sus planes de jubilación tradicionales (como 403(b), 401(k) o FRS), el IUL ofrece una alternativa de protección y acumulación con ventajas fiscales."
                      : "Gainesville is home to a dynamic community of University of Florida (UF) faculty, UF Health physicians and healthcare professionals, VA personnel, and entrepreneurs in Alachua, Newberry, and Archer. For professionals looking to complement retirement plans (such as 403(b), 401(k), or Florida FRS), an Indexed Universal Life (IUL) policy provides permanent life insurance combined with index-linked cash value accumulation."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        {isEs ? "Piso Contractual del 0% Frente a Caídas" : "Contractual 0% Index Floor"}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {isEs 
                          ? "El componente de acreditación indexada de una póliza IUL cuenta con un piso contractual del 0%, lo que significa que a la estrategia de índice seleccionada no se le acredita un rendimiento negativo cuando los índices bursátiles caen. (Los costos de seguro y cargos contractuales afectan el valor en efectivo total)."
                          : "The index-crediting component of an IUL may have a contractual 0% floor, meaning the selected index strategy is not credited with a negative index return during market declines. (Policy charges and insurance costs affect overall cash value)."}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        {isEs ? "Préstamos de Póliza e IRS Sección 7702" : "Tax-Advantaged Policy Loans (IRS Sec. 7702)"}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {isEs 
                          ? "Bajo el Código IRS Sección 7702, los préstamos sobre la póliza pueden brindar acceso al valor en efectivo con un tratamiento fiscal federal potencialmente favorable cuando la póliza se estructura adecuadamente, no es un MEC y se mantiene en vigor (consulte a un asesor tributario calificado)."
                          : "Under Internal Revenue Code Section 7702, policy loans may provide access to cash value with potentially favorable federal tax treatment when the policy is structured properly, is not a Modified Endowment Contract (MEC), and remains in force (consult a qualified tax advisor)."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-600">
                      {isEs ? "¿Desea analizar una ilustración personalizada de IUL?" : "Want to review a personalized IUL illustration in Gainesville?"}
                    </p>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
                    >
                      <span>{isEs ? "Solicitar Ilustración IUL" : "Request IUL Illustration"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Annuities Gainesville */}
            {activeTab === 'annuities' && (
              <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      {isEs ? "Anualidades Fijas e Indexadas en Gainesville" : "Fixed & Indexed Annuities in Gainesville, FL"}
                    </h3>
                    <p className="text-sm text-slate-500 font-semibold">
                      {isEs ? "Protección del capital principal e ingresos vitalicios garantizados" : "Principal Protection & Guaranteed Lifetime Retirement Cash Flow"}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 text-slate-700 leading-relaxed">
                  <p>
                    {isEs 
                      ? "Para los adultos mayores y jubilados en Gainesville, comunidades como Oak Hammock at UF o The Village, preservar el capital acumulado contra la volatilidad del mercado es una prioridad absoluta. Las anualidades fijas (MYGA) y las anualidades fijas indexadas (FIA) pueden proporcionar términos de interés contractualmente garantizados, respaldados por la solidez financiera de la aseguradora emisora."
                      : "For retirees in Gainesville, Oak Hammock at UF, and surrounding Alachua County active adult neighborhoods, preserving accumulated nest eggs against stock market volatility is paramount. Multi-Year Guarantee Annuities (MYGA) and Fixed Indexed Annuities (FIA) offer contractually guaranteed terms, insulated from market downturns and backed by top-rated issuing insurers."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        {isEs ? "Anualidades de Garantía Multianual (MYGA)" : "Multi-Year Guarantee Annuities (MYGA)"}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {isEs 
                          ? "Funciona de manera similar a un certificado bancario pero con crecimiento diferido de impuestos. Garantiza una tasa fija durante periodos de 3, 5, 7 o 10 años."
                          : "Offers a contractually guaranteed fixed rate over 3, 5, 7, or 10 years with tax-deferred growth, backed by carrier financial reserves."}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        {isEs ? "Opciones de Pensión Vitalicia" : "Guaranteed Lifetime Income Riders"}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {isEs 
                          ? "Convierta una porción de sus ahorros en un flujo de ingresos mensual garantizado de por vida que jamás podrá sobrevivir."
                          : "Transform a portion of your savings into a dependable monthly paycheck for life that you cannot outlive."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-600">
                      {isEs ? "¿Desea evaluar tasas de anualidades en Florida?" : "Explore current Florida annuity rates?"}
                    </p>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
                    >
                      <span>{isEs ? "Comparar Anualidades" : "Compare Annuity Rates"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Local Alachua County Cities & Neighborhoods Grid */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {isEs ? "Área de Cobertura Local" : "Local Service Area"}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-2">
                {isEs 
                  ? "Comunidades Atendidas en el Condado de Alachua" 
                  : "Communities We Serve Across Alachua County"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">Gainesville</h3>
                <p className="text-xs text-slate-500 mb-2">ZIPs: 32601, 32605, 32607, 32608, 32653</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEs ? "Haile Plantation, Tioga, Duckpond, Downtown, Suburban Heights, Millhopper." : "Haile Plantation, Tioga, Duckpond, Downtown, Suburban Heights, Millhopper."}
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">Archer</h3>
                <p className="text-xs text-slate-500 mb-2">ZIP: 32618</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEs ? "Asesoría presencial a minutos por SW Archer Road para familias y agricultores." : "Direct in-person advisory down SW Archer Road for rural families and retirees."}
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">Newberry</h3>
                <p className="text-xs text-slate-600 mb-2">ZIP: 32669</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEs ? "Planes de Medicare y seguro de vida para familias en rápido crecimiento." : "Medicare & life insurance planning for rapidly expanding West Alachua neighborhoods."}
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-1">High Springs</h3>
                <p className="text-xs text-slate-500 mb-2">ZIP: 32643</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEs ? "Cobertura de gastos finales y Medigap para adultos mayores en el norte del condado." : "Senior final expense and Medigap protection across North Alachua County."}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Local Gainesville FAQs */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
                {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-3">
                {isEs 
                  ? "Preguntas Frecuentes sobre Seguros en Gainesville, FL" 
                  : "Gainesville, FL Insurance FAQs"}
              </h2>
            </div>

            <div className="space-y-4">
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    {isEs 
                      ? "¿Puedo atenderme en UF Health Shands con un Suplemento de Medicare (Medigap)?" 
                      : "Can I be treated at UF Health Shands with a Medicare Supplement (Medigap) plan?"}
                  </span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-7">
                  {isEs 
                    ? "¡Sí! UF Health Shands Hospital y sus clínicas especializadas aceptan Medicare Original y pólizas suplementarias Medigap (como el Plan G y Plan N). A diferencia de los planes Medicare Advantage HMO, usted no necesita referidos ni autorizaciones previas para ver a los especialistas de Shands." 
                    : "Yes! UF Health Shands Hospital and its outpatient clinics accept Original Medicare and standardized Medigap policies (such as Plan G and Plan N). Unlike Medicare Advantage HMOs, you do not need specialist referrals or prior authorization approvals."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    {isEs 
                      ? "¿Dónde está ubicada la oficina de AHB Insurance Solutions en Gainesville?" 
                      : "Where is the AHB Insurance Solutions office located in Gainesville?"}
                  </span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-7">
                  {isEs 
                    ? "Nuestra oficina está ubicada en 5500 SW Archer Road, Apt H103, Gainesville, FL 32607. Atendemos a clientes de todo el Condado de Alachua de manera presencial con cita previa, así como por teléfono al (352) 225-8389 o videollamada." 
                    : "Our physical address is 5500 SW Archer Road, Apt H103, Gainesville, FL 32607. We serve clients throughout Alachua County in person by appointment, or via direct phone consultation at (352) 225-8389."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    {isEs 
                      ? "¿Cobran alguna comisión o tarifa por la asesoría de seguros?" 
                      : "Do you charge any broker or consultation fees?"}
                  </span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-7">
                  {isEs 
                    ? "No, absolutamente nada. Nuestros servicios de asesoría, comparación de más de 80 aseguradoras y trámite de pólizas son 100% gratuitos para usted. Las aseguradoras nos compensan directamente bajo tarifas reguladas por el estado de Florida." 
                    : "No, never. Our independent broker services, rate comparisons across 80+ top carriers, and policy enrollments are 100% free of charge. Insurance carriers compensate us directly under state-regulated rates."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    {isEs 
                      ? "¿Ofrecen atención bilingüe en español en Gainesville?" 
                      : "Do you offer bilingual English and Spanish consultations in Gainesville?"}
                  </span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-7">
                  {isEs 
                    ? "Sí. El broker Andrés Bozo (NPN: 21228432) es 100% bilingüe y brinda explicaciones claras, transparentes y éticas tanto en español como en inglés a toda la comunidad de Florida." 
                    : "Yes. Licensed broker Andres Bozo (NPN: 21228432) is fully bilingual and provides transparent, clear advice in both English and Spanish."}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Embedded Contact Form */}
        <section id="contact" className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
                {isEs ? "Consulta Gratuita y Sin Compromiso" : "Free Local Quote & Consultation"}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-2">
                {isEs 
                  ? "Hable Directamente con Andrés Bozo en Gainesville" 
                  : "Speak Directly with Andres Bozo in Gainesville"}
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2">
                {isEs 
                  ? "Complete el formulario a continuación o llame directamente al (352) 225-8389 para recibir su análisis comparativo." 
                  : "Fill out the form below or call directly at (352) 225-8389 for your free market comparison."}
              </p>
            </div>

            {renderContactForm()}
          </div>
        </section>

      </main>

      {/* Footer & Global Elements */}
      <Footer content={content.footer} common={content.common} onOpenLegalModal={onOpenLegalModal} />
      <WhatsAppButton ariaLabel={content.whatsappButton.ariaLabel} language={language} />
      <BackToTopButton />
      <TapToCallButton label={isEs ? 'Llamar al Broker' : 'Call Licensed Broker'} phone='+13522258389' />
    </div>
  );
};
