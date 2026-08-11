import React, { useState } from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';
import { FLORIDA_CITIES } from '../data/cityGuidesData';

interface CityGuidesProps {
  language: Language;
  onOpenQuote?: () => void;
  initialCitySlug?: string;
}

export const CityGuides: React.FC<CityGuidesProps> = ({
  language,
  onOpenQuote,
  initialCitySlug = 'miami',
}) => {
  const isEs = language === 'es';
  const [activeSlug, setActiveSlug] = useState<string>(initialCitySlug);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  const activeCity = FLORIDA_CITIES.find((c) => c.slug === activeSlug) || FLORIDA_CITIES[0];

  const filteredCities = FLORIDA_CITIES.filter((c) =>
    c.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.regionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateCitySchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'InsuranceAgency',
      name: `AHB Insurance Solutions - ${activeCity.cityName}`,
      description: isEs ? activeCity.taglineEs : activeCity.taglineEn,
      areaServed: {
        '@type': 'AdministrativeArea',
        name: `${activeCity.cityName}, ${activeCity.county}, Florida`,
      },
      telephone: '+1-352-225-8389',
      founder: {
        '@type': 'Person',
        name: 'Andres H. Bozo',
        jobTitle: 'Licensed Florida Insurance Broker (NPN: 21228432)',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Insurance Products',
        itemListElement: [
          { '@type': 'Offer', name: 'Medicare Supplement Insurance (Medigap Plan G & N)' },
          { '@type': 'Offer', name: 'Final Expense & Burial Insurance' },
          { '@type': 'Offer', name: 'Indexed Universal Life (IUL) Retirement' },
        ],
      },
    };
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(generateCitySchema(), null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <div className="bg-white min-h-screen text-dark-gray font-sans pb-16">
      <SEOHead
        title={
          isEs
            ? `Seguros Medicare, Gastos Finales e IUL en ${activeCity.cityName}, Florida | AHB Insurance`
            : `Medicare, Medigap & Life Insurance in ${activeCity.cityName}, FL | AHB Insurance`
        }
        description={
          isEs
            ? `Asesoría de seguros en ${activeCity.cityName} (${activeCity.county}). Compare Suplementos de Medicare, entierro y planes IUL con el broker Andrés Bozo (NPN 21228432).`
            : `Local insurance broker guide for ${activeCity.cityName}, FL. Compare Medicare Supplement Plan G/N, Final Expense burial coverage, and IUL with broker Andres Bozo.`
        }
      />

      {/* Header Banner */}
      <div className="bg-primary text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-emerald-950 opacity-90"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl text-center">
          <span className="bg-accent text-primary text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-3 shadow">
            📍 {isEs ? 'Guía de Cobertura Local por Ciudades de Florida' : 'Florida Geo-Targeted Local City Insurance Guides'}
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading mb-4 leading-tight">
            {isEs
              ? `Seguro de Medicare y Vida en ${activeCity.cityName}, Florida`
              : `Medicare & Life Insurance Solutions in ${activeCity.cityName}, FL`}
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            {isEs ? activeCity.taglineEs : activeCity.taglineEn}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10 max-w-6xl">
        {/* City Selector & Search Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-light-gray p-4 rounded-2xl border border-gray-200">
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-primary">
                🏙️ {isEs ? 'Seleccione su Ciudad o Condado en Florida:' : 'Select Your Florida City or County:'}
              </h2>
              <p className="text-[11px] text-gray-600">
                {isEs ? 'Información sobre hospitales, costos funerarios y Medicare local' : 'Local hospital networks, burial cost averages & Medigap guidance'}
              </p>
            </div>
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder={isEs ? 'Buscar ciudad o condado...' : 'Search city or county...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none bg-white"
              />
            </div>
          </div>

          {/* City Chips */}
          <div className="flex flex-wrap gap-2">
            {filteredCities.map((city) => {
              const isActive = city.slug === activeSlug;
              return (
                <button
                  key={city.slug}
                  onClick={() => setActiveSlug(city.slug)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                    isActive
                      ? 'bg-primary text-white shadow-md ring-2 ring-primary/20 scale-105'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  <span>📍</span>
                  <span>{city.cityName}</span>
                  <span className="text-[10px] opacity-75 font-normal">({city.regionName})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Active City Detail Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-light-gray rounded-2xl border border-gray-200 text-center">
                <span className="text-2xl mb-1 block">👥</span>
                <p className="text-[10px] font-bold text-gray-500 uppercase">{isEs ? 'Población Senior (65+)' : 'Senior Population'}</p>
                <p className="text-sm font-black text-primary mt-0.5">{activeCity.populationSeniors}</p>
              </div>
              <div className="p-4 bg-light-gray rounded-2xl border border-gray-200 text-center">
                <span className="text-2xl mb-1 block">⚰️</span>
                <p className="text-[10px] font-bold text-gray-500 uppercase">{isEs ? 'Costo Funeral Promedio' : 'Avg Funeral Cost'}</p>
                <p className="text-sm font-black text-emerald-700 mt-0.5">{activeCity.avgFuneralCost}</p>
              </div>
              <div className="p-4 bg-light-gray rounded-2xl border border-gray-200 text-center">
                <span className="text-2xl mb-1 block">👨‍💼</span>
                <p className="text-[10px] font-bold text-gray-500 uppercase">{isEs ? 'Broker Licenciado FL' : 'Licensed FL Broker'}</p>
                <p className="text-xs font-black text-primary mt-0.5">Andres Bozo (NPN 21228432)</p>
              </div>
            </div>

            {/* Section 1: Medicare Overview for City */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary font-black text-lg">🏥</div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary">
                    {isEs ? `1. Cobertura de Medicare en ${activeCity.cityName}` : `1. Medicare Coverage in ${activeCity.cityName}, FL`}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">{activeCity.county}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal">
                {isEs ? activeCity.medicareOverviewEs : activeCity.medicareOverviewEn}
              </p>

              {/* Local Hospitals Supported */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <span>🏥</span> {isEs ? `Hospitales y Redes Médicas Clave en ${activeCity.cityName}:` : `Key Hospitals & Health Networks in ${activeCity.cityName}:`}
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeCity.hospitals.map((hosp, idx) => (
                    <span key={idx} className="bg-white text-emerald-900 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-lg shadow-xs">
                      ✓ {hosp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Final Expense */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2.5 bg-accent/20 rounded-xl text-primary font-black text-lg">🛡️</div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary">
                    {isEs ? `2. Seguro de Gastos Finales y Funerales en ${activeCity.cityName}` : `2. Final Expense & Burial Insurance in ${activeCity.cityName}`}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">{isEs ? 'Protección para su familia sin examen médico' : 'Whole life coverage with locked rates'}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal">
                {isEs ? activeCity.finalExpenseOverviewEs : activeCity.finalExpenseOverviewEn}
              </p>
            </div>

            {/* Section 3: IUL Retirement */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary font-black text-lg">📈</div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary">
                    {isEs ? `3. Planificación IUL e Ingresos de Jubilación en ${activeCity.cityName}` : `3. IUL Retirement & Wealth Growth in ${activeCity.cityName}`}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">{isEs ? 'Estrategia fiscal con piso garantizado del 0%' : 'Tax-free cash accumulation'}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal">
                {isEs ? activeCity.iulOverviewEs : activeCity.iulOverviewEn}
              </p>
            </div>

            {/* Local FAQs */}
            <div className="bg-light-gray p-6 md:p-8 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="text-lg font-black font-heading text-primary flex items-center gap-2">
                <span>❓</span> {isEs ? `Preguntas Frecuentes en ${activeCity.cityName}` : `Frequently Asked Questions in ${activeCity.cityName}`}
              </h3>
              <div className="space-y-3">
                {(isEs ? activeCity.faqsEs : activeCity.faqsEn).map((faq, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
                    <p className="font-bold text-xs text-primary">Q: {faq.question}</p>
                    <p className="text-xs text-gray-700 leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Broker Local Presence Card */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-2xl shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent text-primary font-black flex items-center justify-center text-lg border-2 border-white shadow">
                  AB
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">Andres H. Bozo</h4>
                  <p className="text-[11px] text-accent font-bold">Licensed FL Insurance Broker (NPN: 21228432)</p>
                </div>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed">
                {isEs
                  ? `Brindamos asesoría bilingüe y 100% gratuita para residentes de ${activeCity.cityName} y todo ${activeCity.county}. Comparamos más de 80 aseguradoras líderes.`
                  : `Providing free, unbiased insurance guidance for residents in ${activeCity.cityName} and ${activeCity.county}. We represent over 80 nationwide top-rated carriers.`}
              </p>

              <div className="space-y-2 pt-2">
                {onOpenQuote && (
                  <button
                    onClick={onOpenQuote}
                    className="w-full bg-accent text-primary font-black text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-[#FFB81C] transition-all shadow"
                  >
                    {isEs ? 'Cotizar Gratis en ' + activeCity.cityName : 'Get Free Quote in ' + activeCity.cityName}
                  </button>
                )}
                <a
                  href="tel:+13522258389"
                  className="w-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <span>📞</span> +1 (352) 225-8389
                </a>
              </div>
            </div>

            {/* Neighborhoods Served List */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-primary flex items-center gap-1.5">
                <span>📍</span> {isEs ? `Zonas y Vecindarios Atendidos:` : `Neighborhoods Served in ${activeCity.cityName}:`}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeCity.neighborhoods.map((n, idx) => (
                  <span key={idx} className="bg-light-gray text-gray-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Schema Inspector Box */}
            <div className="bg-light-gray p-5 rounded-2xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">JSON-LD Local Schema</span>
                <button
                  onClick={handleCopySchema}
                  className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-primary-dark transition-all"
                >
                  {copiedSchema ? '✓ Copied' : 'Copy Schema'}
                </button>
              </div>
              <textarea
                readOnly
                rows={6}
                value={JSON.stringify(generateCitySchema(), null, 2)}
                className="w-full p-2.5 bg-gray-900 text-emerald-400 font-mono text-[10px] rounded-xl focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
