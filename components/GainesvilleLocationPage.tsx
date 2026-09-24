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
  ExternalLink,
  Clock,
  Award,
  DollarSign,
  Compass,
  FileCheck
} from 'lucide-react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';

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
}) => {
  const isEs = language === 'es';
  const [activeTab, setActiveTab] = useState<'medicare' | 'final-expense' | 'iul' | 'annuities'>('medicare');

  const baseUrl = 'https://www.ahbinsurancesolutions.com';
  const canonicalUrl = `${baseUrl}${isEs ? '/es/locations/gainesville-fl' : '/locations/gainesville-fl'}`;
  const enUrl = `${baseUrl}/locations/gainesville-fl`;
  const esUrl = `${baseUrl}/es/locations/gainesville-fl`;

  const pageTitle = isEs
    ? "Gainesville, FL Insurance Broker | Broker de Seguros en Gainesville | AHB Insurance Solutions"
    : "Gainesville, FL Insurance Broker | Medicare, Life & Annuities | AHB Insurance Solutions";

  const pageDescription = isEs
    ? "Gainesville, FL Insurance Broker: Andrés Bozo (NPN: 21228432). Asesoría independiente en Medicare Medigap (UF Health Shands), Gastos Finales, IUL y Anualidades en el Condado de Alachua (5500 SW Archer Rd). Cotización gratuita: (352) 225-8389."
    : "Gainesville, FL Insurance Broker: Andres Bozo (NPN: 21228432). Independent Medicare Medigap (UF Health Shands), Final Expense, IUL & Annuity advisory across Alachua County (5500 SW Archer Rd). Free quote: (352) 225-8389.";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": isEs ? "Broker de Seguros en Gainesville, FL" : "Gainesville, FL Insurance Broker Services",
    "serviceType": "Independent Insurance Brokerage",
    "provider": {
      "@id": "https://www.ahbinsurancesolutions.com/#organization"
    },
    "broker": {
      "@id": "https://www.ahbinsurancesolutions.com/#person"
    },
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
    "description": pageDescription
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
        "name": "Gainesville, FL Insurance Broker",
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": isEs 
          ? "¿Puedo atenderme en UF Health Shands Hospital con un Suplemento de Medicare (Medigap)?" 
          : "Can I be treated at UF Health Shands Hospital with a Medicare Supplement (Medigap) plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isEs 
            ? "Sí. UF Health Shands Hospital y sus clínicas especializadas aceptan Medicare Original y pólizas suplementarias Medigap (como Plan G y Plan N), sujeto a las reglas de Medicare y Medigap."
            : "Yes. UF Health Shands Hospital and outpatient facilities accept Original Medicare and standardized Medigap policies (such as Plan G and Plan N), subject to Medicare and Medigap rules."
        }
      },
      {
        "@type": "Question",
        "name": isEs 
          ? "¿Dónde está ubicada la oficina de AHB Insurance Solutions en Gainesville?" 
          : "Where is the AHB Insurance Solutions office located in Gainesville?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isEs 
            ? "Nuestra oficina está ubicada en 5500 SW Archer Road, Apt H103, Gainesville, FL 32607 (Condado de Alachua, cerca de Celebration Pointe y Butler Plaza). Atendemos con cita previa o al teléfono (352) 225-8389."
            : "Our office is located at 5500 SW Archer Road, Apt H103, Gainesville, FL 32607 (Alachua County, near Celebration Pointe and Butler Plaza). We consult in person by appointment or by phone at (352) 225-8389."
        }
      },
      {
        "@type": "Question",
        "name": isEs 
          ? "¿Cobran alguna tarifa por comparar o cotizar seguros en Gainesville?" 
          : "Do you charge any consultation or broker fees in Gainesville?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isEs 
            ? "No, absolutamente nada. Nuestros servicios de consultoría, cotización entre más de 80 aseguradoras y trámite de pólizas son 100% gratuitos para usted."
            : "No, never. Our independent brokerage consultations, carrier rate comparisons, and enrollment assistance are 100% free with zero fees."
        }
      },
      {
        "@type": "Question",
        "name": isEs 
          ? "¿El broker Andrés Bozo ofrece atención bilingüe en español?" 
          : "Does broker Andres Bozo provide bilingual consultations in Spanish?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isEs 
            ? "Sí. Andrés Bozo (NPN: 21228432) es un corredor licenciado en Florida completamente bilingüe, brindando asesoría transparente en español e inglés."
            : "Yes. Andres Bozo (NPN: 21228432) is a licensed Florida insurance broker who is fluent in both English and Spanish."
        }
      }
    ]
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [language]);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        enUrl={enUrl}
        esUrl={esUrl}
        language={language}
        schema={[serviceSchema, breadcrumbSchema, faqSchema]}
      />

      {/* Breadcrumbs Navigation Bar */}
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
            <span className="text-amber-400 font-bold">Gainesville, FL (Alachua County)</span>
          </div>

          <button
            onClick={() => {
              const newLang = isEs ? 'en' : 'es';
              setLanguage(newLang);
              const newPath = newLang === 'es' ? '/es/locations/gainesville-fl' : '/locations/gainesville-fl';
              window.history.pushState({}, '', newPath);
              window.dispatchEvent(new Event('popstate'));
            }}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1 rounded-md text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
          >
            <span>{isEs ? "🇺🇸 English" : "🇪🇸 Español"}</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#022A3A] to-[#011B25] text-white py-14 md:py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            
            {/* Local Agency Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>5500 SW Archer Rd, Apt H103, Gainesville, FL 32607</span>
            </div>

            {/* H1 Title explicitly: Gainesville, FL Insurance Broker */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white mb-6 leading-[1.1]">
              {isEs 
                ? "Gainesville, FL Insurance Broker" 
                : "Gainesville, FL Insurance Broker"}
            </h1>

            <p className="text-xl md:text-2xl text-amber-300 font-bold mb-4">
              {isEs
                ? "Medicare Gainesville • Gastos Finales • IUL • Anualidades en el Condado de Alachua"
                : "Medicare Gainesville • Final Expense • IUL • Annuities in Alachua County"}
            </p>

            <p className="text-base md:text-lg text-slate-200 leading-relaxed font-normal mb-8 max-w-3xl">
              {isEs 
                ? "Asesoría independiente, ética y personalizada en Gainesville y todo el Condado de Alachua. Comparamos objetivamente entre múltiples aseguradoras líderes y reconocidas a nivel nacional para Suplementos de Medicare (Medigap), Gastos Finales, Seguro de Vida IUL y Anualidades. Libertad para atenderse en UF Health Shands y HCA Florida, sin tarifas de corretaje." 
                : "Local independent insurance brokerage headquartered on SW Archer Road in Gainesville, FL. We compare multiple top-rated national carriers for Medicare Supplements (Medigap), Final Expense Burial Insurance, Indexed Universal Life (IUL), and Annuities with zero broker fees. Freedom of access to UF Health Shands Hospital."}
            </p>

            {/* Direct CTAs & Local Phone */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base md:text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all uppercase tracking-wide cursor-pointer"
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
                <span>{isEs ? "Broker: Andrés Bozo" : "Broker: Andres Bozo"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>NPN: 21228432</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{isEs ? "Aseguradoras Líderes" : "Top National Carriers"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{isEs ? "Asesoría 100% Gratuita" : "100% Free Consultation"}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Local Office, Address, Phone, & Interactive Map */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md mb-4 border border-amber-400/20">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{isEs ? "Sede Local en Gainesville, FL" : "Gainesville, FL Headquarters"}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
                  {isEs ? "Oficina de AHB Insurance Solutions" : "AHB Insurance Solutions Office"}
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {isEs 
                    ? "Ubicados estratégicamente en SW Archer Road, cerca de Celebration Pointe, Butler Plaza y la salida 384 de la I-75. Atendemos a clientes de todo el Condado de Alachua en persona con cita previa, así como telefónicamente o por videollamada."
                    : "Strategically located on SW Archer Road near Celebration Pointe, Butler Plaza, and I-75 Exit 384. We serve clients across Alachua County in person by appointment, by phone, or via secure video consultation."}
                </p>

                <div className="space-y-3.5 text-sm text-slate-200 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">{isEs ? "Dirección Física:" : "Physical Address:"}</span>
                      <span>5500 SW Archer Road, Apt H103<br />Gainesville, FL 32607</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white block">{isEs ? "Teléfono Directo:" : "Direct Telephone:"}</span>
                      <a href="tel:+13522258389" className="hover:text-amber-300 font-bold text-amber-400 text-base transition-colors">
                        +1 (352) 225-8389
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white block">{isEs ? "Correo Electrónico:" : "Email:"}</span>
                      <span className="text-slate-300 text-xs md:text-sm">andreshbozo@ahbinsurancesolutions.com</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white block">{isEs ? "Horario de Atención:" : "Business Hours:"}</span>
                      <span className="text-slate-300 text-xs md:text-sm">{isEs ? "Lunes a Sábado: 8:00 AM – 8:00 PM (Cita previa)" : "Mon – Sat: 8:00 AM – 8:00 PM (By appointment)"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                    <UserCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white block">{isEs ? "Broker Principal:" : "Principal Broker:"}</span>
                      <span className="text-slate-300 text-xs md:text-sm">Andres H. Bozo (NPN: 21228432 | FL DFS Licensed)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=5500+SW+Archer+Road+Apt+H103+Gainesville+FL+32607+USA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs md:text-sm py-3 px-4 rounded-xl transition-all"
                >
                  <span>{isEs ? "Abrir en Google Maps" : "Open in Google Maps"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a 
                  href="tel:+13522258389"
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs md:text-sm py-3 px-4 rounded-xl border border-slate-700 transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{isEs ? "Llamar Ahora" : "Call Now"}</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map Embed */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-md flex-grow flex flex-col">
                <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span>{isEs ? "Mapa de Ubicación: 5500 SW Archer Rd, Gainesville, FL 32607" : "Location Map: 5500 SW Archer Rd, Gainesville, FL 32607"}</span>
                  </div>
                  <span className="hidden sm:inline-block text-slate-500">Alachua County, FL</span>
                </div>
                
                <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full">
                  <iframe 
                    title="AHB Insurance Solutions Gainesville Office Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3468.106404764833!2d-82.40351782355524!3d29.601550975149363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e8a3a0ea7d9bb7%3A0x8e82ef42878d655f!2s5500%20SW%20Archer%20Rd%20H103%2C%20Gainesville%2C%20FL%2032607!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Four Core Pillars in Gainesville (Interactive Tabs) */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/80 px-3.5 py-1.5 rounded-full">
              {isEs ? "Especialidades en Gainesville y Condado de Alachua" : "Core Specialties in Gainesville & Alachua County"}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-4">
              {isEs 
                ? "Servicios de Seguros Locales Diseñados para Usted" 
                : "Insurance Solutions Built for Gainesville Residents"}
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              {isEs 
                ? "Haga clic en cualquiera de las cuatro áreas para conocer nuestras soluciones específicas para jubilados, familias y profesionales locales." 
                : "Select any coverage pillar below to explore tailored protections for Gainesville retirees, healthcare workers, UF staff, and families."}
            </p>
          </div>

          {/* Service Selection Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            <button
              onClick={() => setActiveTab('medicare')}
              className={`px-5 py-3 rounded-xl font-bold text-sm md:text-base transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'medicare'
                  ? 'bg-slate-900 text-amber-400 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Hospital className="w-4 h-4" />
              <span>{isEs ? "Medicare Gainesville" : "Medicare Gainesville"}</span>
            </button>
            <button
              onClick={() => setActiveTab('final-expense')}
              className={`px-5 py-3 rounded-xl font-bold text-sm md:text-base transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'final-expense'
                  ? 'bg-slate-900 text-amber-400 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isEs ? "Final Expense Gainesville" : "Final Expense Gainesville"}</span>
            </button>
            <button
              onClick={() => setActiveTab('iul')}
              className={`px-5 py-3 rounded-xl font-bold text-sm md:text-base transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'iul'
                  ? 'bg-slate-900 text-amber-400 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{isEs ? "IUL Gainesville" : "IUL Gainesville"}</span>
            </button>
            <button
              onClick={() => setActiveTab('annuities')}
              className={`px-5 py-3 rounded-xl font-bold text-sm md:text-base transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'annuities'
                  ? 'bg-slate-900 text-amber-400 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>{isEs ? "Annuities Gainesville" : "Annuities Gainesville"}</span>
            </button>
          </div>

          {/* Tab 1: Medicare Gainesville */}
          {activeTab === 'medicare' && (
            <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                  <Hospital className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                    {isEs ? "Medicare Gainesville: Suplementos Medigap en Alachua County" : "Medicare Gainesville: Medigap Supplements in Alachua County"}
                  </h3>
                  <p className="text-sm text-slate-500 font-semibold">
                    {isEs ? "Acceso sin trabas a UF Health Shands, HCA Florida y Malcom Randall VA" : "Unrestricted Access to UF Health Shands, HCA Florida & Malcom Randall VA"}
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-slate-700 leading-relaxed">
                <p>
                  {isEs 
                    ? "Gainesville es el epicentro médico del norte de Florida gracias al reconocido sistema hospitalario UF Health Shands y al HCA Florida North Florida Hospital. Sin embargo, muchos beneficiarios de Medicare inscritos en planes Medicare Advantage HMO sufren limitaciones severas de redes de proveedores, copagos elevados para hospitalizaciones y largas demoras por autorizaciones previas."
                    : "Gainesville is North Central Florida's medical capital, anchored by UF Health Shands Hospital, HCA Florida North Florida Hospital, and the Malcom Randall VA Medical Center. However, retirees enrolled in Medicare Advantage HMOs often experience restrictive physician networks, high specialist copays, and prior authorization delays when seeking specialized care."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>{isEs ? "Ventajas de Medigap (Plan G / Plan N)" : "Medigap Plan G & Plan N Advantages"}</span>
                    </h4>
                    <ul className="text-sm space-y-2 text-slate-600">
                      <li>• {isEs ? "Flexibilidad para atenderse en UF Health Shands sin necesidad de referidos de médico primario (sujeto a aceptación de Medicare)." : "Freedom to consult doctors at UF Health Shands without primary care referrals (subject to Medicare assignment)."}</li>
                      <li>• {isEs ? "Válido con cualquier médico u hospital a nivel nacional que acepte Medicare Original y la asignación correspondiente." : "Nationwide access with any healthcare provider or hospital accepting Original Medicare and assignment."}</li>
                      <li>• {isEs ? "Sujeto a las reglas de Medicare y Medigap para procedimientos cubiertos." : "Subject to Medicare and Medigap rules for covered procedures."}</li>
                      <li>• {isEs ? "Costos predecibles: el Plan G cubre los costos de coseguro tras el deducible anual de Parte B." : "Predictable costs: Plan G covers out-of-pocket coinsurance after the annual Part B deductible."}</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                      <span>{isEs ? "Inscripción en Alachua County" : "Alachua County Enrollment Window"}</span>
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {isEs 
                        ? "Durante su Período de Inscripción Abierta de Medigap de 6 meses (inicia el mes en que cumple 65 años y se inscribe en la Parte B), tiene Derechos de Emisión Garantizada sin preguntas sobre su salud previa." 
                        : "During your 6-month Medigap Open Enrollment window (begins the month you turn 65 and enroll in Part B), you have Guaranteed Issue Rights with zero health underwriting."}
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      {isEs 
                        ? "“Rangos de primas únicamente ilustrativos. Las primas reales varían por código postal, edad, aseguradora, método de tarificación y elegibilidad. Solicite una comparación personalizada.”" 
                        : "“Illustrative premium ranges only. Actual premiums vary by ZIP code, age, carrier, rating method and eligibility. Request a personalized comparison.”"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-600">
                    {isEs ? "¿Desea comparar opciones de Medicare en Gainesville y Alachua?" : "Ready to compare Gainesville Medicare supplement plans?"}
                  </p>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    <span>{isEs ? "Comparar Tarifas de Medigap" : "Compare Medigap Rates"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Final Expense Gainesville */}
          {activeTab === 'final-expense' && (
            <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                    {isEs ? "Final Expense Gainesville: Seguro de Gastos Finales y Entierro" : "Final Expense Gainesville: Burial & Funeral Insurance"}
                  </h3>
                  <p className="text-sm text-slate-500 font-semibold">
                    {isEs ? "Protección familiar frente a costos funerarios en el Condado de Alachua" : "Protecting Alachua County Families from Unexpected Funeral Costs"}
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-slate-700 leading-relaxed">
                <p>
                  {isEs 
                    ? "En Gainesville, Archer, Newberry y High Springs, los costos de un servicio funerario completo o cremación oscilan habitualmente entre $7,200 y $9,800. Dado que el beneficio de defunción del Seguro Social federal es de tan solo $255 para cónyuges calificados, las familias a menudo se ven obligadas a solicitar préstamos o realizar colectas en momentos de profundo dolor."
                    : "In Gainesville, Archer, Newberry, and High Springs, traditional funeral and burial costs typically range between $7,200 and $9,800. With the federal Social Security one-time death benefit frozen at just $255 for eligible spouses, surviving family members often face unexpected out-of-pocket bills."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      {isEs ? "Libertad con Funerarias y Cementerios de Alachua" : "Freedom with Alachua County Funeral Homes"}
                    </h4>
                    <p className="text-sm text-slate-600 mb-3">
                      {isEs 
                        ? "Nuestras pólizas de vida entera pagan un beneficio en efectivo directo a sus beneficiarios, con total libertad para contratar a cualquier proveedor de Gainesville:" 
                        : "Our whole life policies pay cash directly to your designated beneficiaries, granting total freedom to work with any local provider:"}
                    </p>
                    <ul className="text-xs space-y-1.5 text-slate-600 font-medium">
                      <li>• Forest Meadows Funeral Home & Cemeteries (Gainesville)</li>
                      <li>• Williams-Thomas Funeral Homes (Downtown & Newberry Rd)</li>
                      <li>• Milam Funeral and Cremation Services (Gainesville & Newberry)</li>
                      <li>• Chestnut Funeral Home (Gainesville)</li>
                      <li>• Prairie Creek Conservation Cemetery (Gainesville)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      {isEs ? "Aspectos Clave de la Póliza" : "Key Policy Highlights"}
                    </h4>
                    <ul className="text-sm space-y-2 text-slate-600">
                      <li>• <strong>{isEs ? "Beneficio por Fallecimiento:" : "Death Benefit:"}</strong> {isEs ? "De $5,000 a $35,000 desembolsados a sus beneficiarios tras la aprobación del reclamo." : "$5,000 to $35,000 disbursed to designated beneficiaries upon claim approval."}</li>
                      <li>• <strong>{isEs ? "Primas Niveladas:" : "Level Premiums:"}</strong> {isEs ? "Primas niveladas que no aumentan con la edad, sujetas a las condiciones de la póliza y al pago oportuno." : "Level premiums that do not increase with age, subject to contract terms and timely payment."}</li>
                      <li>• <strong>{isEs ? "Sin Examen Médico Tradicional:" : "Simplified Underwriting:"}</strong> {isEs ? "Emisión simplificada basada en cuestionario de salud y verificación Rx, según la aseguradora." : "Simplified issue based on health questions and prescription checks, depending on carrier."}</li>
                      <li>• <strong>{isEs ? "Fondos Libres:" : "Unrestricted Funds:"}</strong> {isEs ? "Para funeral, deudas pendientes o legado familiar." : "Can be used for burial, cremation, medical bills, or family legacy."}</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-600">
                    {isEs ? "¿Desea calcular una cuota para seguro de gastos finales en Gainesville?" : "Need a custom burial insurance quote in Gainesville?"}
                  </p>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    <span>{isEs ? "Cotizar Gastos Finales" : "Get Final Expense Quote"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: IUL Gainesville */}
          {activeTab === 'iul' && (
            <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                    {isEs ? "IUL Gainesville: Seguro de Vida Universal Indexada" : "IUL Gainesville: Indexed Universal Life Insurance"}
                  </h3>
                  <p className="text-sm text-slate-500 font-semibold">
                    {isEs ? "Crecimiento indexado, protección familiar y ventajas fiscales bajo el Código IRS 7702" : "Index-Linked Cash Value, Family Protection & IRS Section 7702 Benefits"}
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-slate-700 leading-relaxed">
                <p>
                  {isEs 
                    ? "Gainesville alberga una destacada comunidad de profesores e investigadores de la University of Florida (UF), personal médico de UF Health, veteranos y trabajadores del VA Medical Center, así como dueños de negocios en Alachua, Newberry y Archer. Para quienes buscan maximizar su patrimonio y complementar planes de jubilación tradicionales (como 403(b), 401(k) o el Florida FRS), el IUL ofrece una solución con ventajas fiscales."
                    : "Gainesville is home to University of Florida (UF) professors, researchers, UF Health medical professionals, VA personnel, and entrepreneurs in Alachua, Newberry, and Archer. For professionals seeking to supplement traditional retirement accounts (like 403(b), 401(k), or Florida FRS), an Indexed Universal Life (IUL) policy provides permanent life insurance paired with tax-advantaged cash value accumulation."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      {isEs ? "Piso Contractual del 0% Frente a Pérdidas" : "Contractual 0% Index Floor"}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {isEs 
                        ? "El componente de acreditación indexada cuenta con un piso del 0%, lo que garantiza que a la estrategia de índice seleccionada no se le acredita un rendimiento negativo ante caídas del mercado. (Los costos de seguro y cargos de póliza afectan el valor en efectivo total)."
                        : "The index-crediting component features a contractual 0% floor, meaning the chosen index strategy is not credited with a negative return during stock market downturns. (Policy charges and insurance costs affect cash value)."}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      {isEs ? "Préstamos de Póliza e IRS Sección 7702" : "Tax-Advantaged Policy Loans (IRS Sec. 7702)"}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {isEs 
                        ? "Bajo el Código IRS 7702, los préstamos estructurados sobre la póliza brindan acceso a capital con tratamiento fiscal federal potencialmente favorable si la póliza no es un MEC y se mantiene en vigor (consulte a un asesor tributario calificado)."
                        : "Under Internal Revenue Code Section 7702, policy loans provide access to cash value with potentially favorable federal tax treatment when properly structured and maintained (consult a qualified tax advisor)."}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-600">
                    {isEs ? "¿Desea evaluar una ilustración personalizada de IUL en Gainesville?" : "Want to review a personalized IUL illustration in Gainesville?"}
                  </p>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
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
            <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
                  <DollarSign className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                    {isEs ? "Annuities Gainesville: Anualidades Fijas y Pensión Vitalicia" : "Annuities Gainesville: Fixed & Indexed Annuities"}
                  </h3>
                  <p className="text-sm text-slate-500 font-semibold">
                    {isEs ? "Protección del capital principal e ingresos vitalicios garantizados" : "Principal Protection & Guaranteed Lifetime Retirement Cash Flow"}
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-slate-700 leading-relaxed">
                <p>
                  {isEs 
                    ? "Para jubilados en Gainesville, incluyendo residentes de comunidades activas como Oak Hammock at UF, The Village y Haile Plantation, proteger los ahorros de toda la vida frente a la inflación y las caídas de la bolsa es esencial. Las anualidades fijas (MYGA) y anualidades fijas indexadas (FIA) ofrecen rendimientos garantizados y respaldo de aseguradoras de primer nivel."
                    : "For retirees in Gainesville, Oak Hammock at UF, The Village, and Haile Plantation, shielding retirement savings against market volatility is a top priority. Multi-Year Guarantee Annuities (MYGA) and Fixed Indexed Annuities (FIA) offer contractually guaranteed terms backed by carrier financial reserves."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      {isEs ? "Anualidades MYGA (Tasa Fija Garantizada)" : "Multi-Year Guarantee Annuities (MYGA)"}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {isEs 
                        ? "Similar a un certificado de depósito bancario pero con crecimiento de intereses diferido de impuestos. Fija una tasa atractiva garantizada por 3, 5, 7 o 10 años."
                        : "Similar to a CD but with tax-deferred growth. Contractually locks in a competitive fixed rate for 3, 5, 7, or 10 years, protected from market downturns."}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      {isEs ? "Cláusulas de Ingreso Vitalicio (Income Riders)" : "Guaranteed Lifetime Income Riders"}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {isEs 
                        ? "Opciones contractuales que permiten generar un flujo de ingresos predecibles durante el retiro, sujetas a los términos del contrato y a la solvencia de la aseguradora emisora."
                        : "Contractual rider options designed to provide predictable retirement income disbursements, subject to policy terms and the claims-paying ability of the issuing carrier."}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-600">
                    {isEs ? "¿Desea comparar tasas actuales de anualidades en Florida?" : "Explore current Florida annuity rates?"}
                  </p>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
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

      {/* Alachua County & Service Areas Grid */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              {isEs ? "Áreas de Servicio en el Condado de Alachua" : "Alachua County Service Areas"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-3">
              {isEs 
                ? "Comunidades Atendidas por AHB Insurance Solutions" 
                : "Communities We Serve Across Alachua County"}
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2">
              {isEs 
                ? "Brindamos atención presencial con cita previa en nuestra sede de SW Archer Road, visitas a domicilio en el Condado de Alachua y consultas remotas."
                : "Offering in-person consultations at our SW Archer Road office, home visits across Alachua County, and secure phone/video appointments."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-slate-900 text-lg">Gainesville</h3>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">HQ Office</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mb-2">ZIPs: 32601, 32605, 32607, 32608, 32653</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs 
                  ? "Haile Plantation, Tioga, Duckpond, Downtown, Suburban Heights, Millhopper y University of Florida." 
                  : "Haile Plantation, Tioga, Duckpond, Downtown, Suburban Heights, Millhopper, and University of Florida."}
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-slate-900 text-lg">Archer</h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">Alachua</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mb-2">ZIP: 32618</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs 
                  ? "A minutos directos por SW Archer Road. Asesoría especializada para familias rurales, agricultores y adultos mayores." 
                  : "Minutes away down SW Archer Road. Dedicated advisory for rural families, farmers, and seniors."}
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-slate-900 text-lg">Newberry</h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">Alachua</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mb-2">ZIP: 32669</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs 
                  ? "Planes de Medicare y seguro de vida IUL para familias jóvenes y jubilados en rápido crecimiento del oeste del condado." 
                  : "Medicare and IUL life insurance planning for growing families and retirees in West Alachua County."}
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-slate-900 text-lg">High Springs</h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">Alachua</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mb-2">ZIP: 32643</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs 
                  ? "Cobertura de gastos finales, pólizas Medigap y anualidades seguras en el norte del Condado de Alachua." 
                  : "Final expense coverage, Medigap supplements, and safe retirement annuities in North Alachua County."}
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-black text-slate-900 text-base mb-1">City of Alachua</h3>
              <p className="text-xs font-semibold text-slate-500 mb-2">ZIP: 32615</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs ? "Atención en Progress Center, San Felasco Tech City y áreas residenciales." : "Serving Progress Center, San Felasco Tech City, and residential neighborhoods."}
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-black text-slate-900 text-base mb-1">Hawthorne</h3>
              <p className="text-xs font-semibold text-slate-500 mb-2">ZIP: 32640</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs ? "Seguros de gastos funerarios y planes suplementarios para el este de Alachua." : "Burial insurance and Medicare options for East Alachua County."}
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-black text-slate-900 text-base mb-1">Micanopy</h3>
              <p className="text-xs font-semibold text-slate-500 mb-2">ZIP: 32667</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs ? "Asesoría para jubilados y negocios locales en la histórica ciudad de Micanopy." : "Retirement protection and Medicare guidance in historic Micanopy."}
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-black text-slate-900 text-base mb-1">Waldo</h3>
              <p className="text-xs font-semibold text-slate-500 mb-2">ZIP: 32694</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs ? "Soluciones de protección familiar y gastos finales con emisión simplificada." : "Family protection and simplified issue final expense solutions."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Meet Andres Bozo Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 text-center">
              <div className="relative inline-block mx-auto mb-4">
                <img 
                  src="/andresbozoofi.webp" 
                  alt="Andres Bozo - Gainesville FL Insurance Broker"
                  className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl border-4 border-amber-400 shadow-2xl mx-auto"
                />
                <span className="absolute bottom-2 right-2 bg-emerald-600 text-white p-1.5 rounded-full shadow-lg" title="Active FL DFS License">
                  <Award className="w-5 h-5" />
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">Andres H. Bozo</h3>
              <p className="text-amber-400 font-bold text-sm">Licensed Insurance Broker</p>
              <p className="text-slate-400 text-xs mt-1">NPN: 21228432 | Florida DFS</p>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
                <Award className="w-3.5 h-3.5" />
                <span>{isEs ? "Corredor Independiente en Gainesville" : "Independent Broker in Gainesville, FL"}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {isEs 
                  ? "Un Asesor que Trabaja para Usted, No para una Aseguradora" 
                  : "An Independent Broker Who Works for You, Not the Carriers"}
              </h2>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {isEs 
                  ? "A diferencia de los agentes cautivos que solo pueden ofrecer los productos de una única compañía, Andrés Bozo es un corredor independiente regulado por el Departamento de Servicios Financieros de Florida. Evaluamos y comparamos objetivamente opciones entre múltiples compañías líderes y reconocidas (Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters, Corebridge y más) para ayudarle a encontrar la póliza adecuada a su presupuesto, salud y metas familiares."
                  : "Unlike captive agents obligated to sell only one company's policies, Andres Bozo is an independent insurance broker regulated by the Florida Department of Financial Services. We evaluate options across multiple top-rated national carriers (Mutual of Omaha, Aetna, Cigna, Humana, UnitedHealthcare, Foresters, Corebridge, and more) to help you find coverage aligned with your budget and family goals."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs md:text-sm text-slate-200">
                <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEs ? "Asesoría 100% gratuita sin tarifas ocultas" : "100% free consultation with zero broker fees"}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEs ? "Atención 100% bilingüe (Español & Inglés)" : "Fully bilingual guidance in English & Spanish"}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEs ? "Revisión anual continua de pólizas" : "Annual policy checkups to keep rates optimal"}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isEs ? "Sede física en SW Archer Road" : "Physical headquarters on SW Archer Road"}</span>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="tel:+13522258389" 
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isEs ? "Hable directamente con Andrés Bozo: (352) 225-8389" : "Speak directly with Andres Bozo: (352) 225-8389"}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comprehensive Local FAQs */}
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
                  ? "¡Sí! UF Health Shands Hospital y todas sus clínicas asociadas aceptan Medicare Original y pólizas suplementarias Medigap (como Plan G y Plan N), sujeto a las reglas de Medicare y Medigap." 
                  : "Yes! UF Health Shands Hospital and its outpatient clinics accept Original Medicare and standardized Medigap policies (such as Plan G and Plan N), subject to Medicare and Medigap rules."}
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
                  ? "Nuestra oficina está ubicada en 5500 SW Archer Road, Apt H103, Gainesville, FL 32607 (Condado de Alachua, cerca de Celebration Pointe y Butler Plaza, salida 384 de la I-75). Atendemos presencialmente con cita previa o por teléfono directo al (352) 225-8389." 
                  : "Our physical address is 5500 SW Archer Road, Apt H103, Gainesville, FL 32607 (Alachua County, near Celebration Pointe and Butler Plaza, off I-75 Exit 384). We consult in person by appointment, or via direct phone at (352) 225-8389."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  {isEs 
                    ? "¿Cobran alguna tarifa o comisión por sus servicios de asesoría de seguros?" 
                    : "Do you charge any broker or consultation fees?"}
                </span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                {isEs 
                  ? "No, jamás. Nuestros servicios de consultoría, análisis comparativo entre múltiples aseguradoras líderes y trámite de pólizas son 100% gratuitos para usted. Las compañías de seguros nos compensan directamente bajo tarifas reguladas por el estado de Florida, por lo que su prima es exactamente la misma." 
                  : "No, never. Our independent broker services, rate comparisons across top national carriers, and policy enrollments are 100% free of charge to you. Insurance carriers compensate us directly under state-regulated rates."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  {isEs 
                    ? "¿Ofrecen atención y asesoría bilingüe en español en Gainesville?" 
                    : "Do you offer bilingual English and Spanish consultations in Gainesville?"}
                </span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                {isEs 
                  ? "Sí. El corredor de seguros Andrés Bozo (NPN: 21228432) es 100% bilingüe y brinda explicaciones claras, transparentes y éticas tanto en español como en inglés a toda la comunidad del Condado de Alachua y Florida." 
                  : "Yes. Licensed broker Andres Bozo (NPN: 21228432) is fully bilingual and provides clear, ethical advice in both English and Spanish across Alachua County and statewide."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  {isEs 
                    ? "¿Cómo se pagan los beneficios del seguro de gastos finales a las funerarias locales?" 
                    : "How are final expense benefits paid to local Gainesville funeral homes?"}
                </span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                {isEs 
                  ? "El beneficio por fallecimiento se paga en cheque o transferencia directa a los beneficiarios que usted elija (o directamente a la funeraria si su familia lo solicita). Esto les permite cubrir servicios con Forest Meadows, Williams-Thomas, Milam, Chestnut o Prairie Creek sin trabas." 
                  : "Death benefits are disbursed rapidly and directly to your designated beneficiaries, granting total flexibility to pay funeral providers like Forest Meadows, Williams-Thomas, Milam, Chestnut, or Prairie Creek without delay."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  {isEs 
                    ? "¿Cómo ayuda el IUL a empleados de la University of Florida o del sistema de salud?" 
                    : "How does an IUL benefit University of Florida or healthcare employees?"}
                </span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                {isEs 
                  ? "Una póliza IUL (Indexed Universal Life) complementa las cuentas de jubilación tradicionales 403(b), 401(k) o el Florida FRS. Ofrece acumulación con piso contractual del 0% contra caídas del mercado y préstamos de póliza libres de impuestos sobre la renta bajo el Código IRS 7702." 
                  : "An IUL complements traditional 403(b), 401(k), and Florida FRS plans. It provides permanent life protection, a 0% floor against market losses, and access to tax-advantaged loans under IRS Section 7702."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Contact Form & Final CTA */}
      <section id="contact" className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              {isEs ? "Consulta Local Gratuita y Sin Compromiso" : "Free Local Quote & Consultation"}
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mt-2">
              {isEs 
                ? "Hable Directamente con Andrés Bozo en Gainesville" 
                : "Speak Directly with Andres Bozo in Gainesville"}
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2">
              {isEs 
                ? "Complete el formulario a continuación o llame directamente al (352) 225-8389 para recibir su cotización y comparación personalizada para Gainesville y el Condado de Alachua." 
                : "Fill out the form below or call directly at (352) 225-8389 for your free market comparison across Gainesville and Alachua County."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {renderContactForm()}
          </div>
        </div>
      </section>

    </div>
  );
};
