import React from 'react';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';

interface NotFoundPageProps {
  language: Language;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ language }) => {
  const isEs = language === 'es';
  const baseUrl = 'https://www.ahbinsurancesolutions.com';

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gray-50/50">
      <SEOHead
        title={isEs ? '404 - Página no encontrada | AHB Insurance Solutions' : '404 - Page Not Found | AHB Insurance Solutions'}
        description={
          isEs
            ? 'La página solicitada no existe o ha sido movida. Regrese a la página principal de AHB Insurance Solutions.'
            : 'The requested page does not exist or has been moved. Return to the AHB Insurance Solutions homepage.'
        }
        canonicalUrl={`${baseUrl}/404`}
        enUrl={`${baseUrl}/404`}
        esUrl={`${baseUrl}/404`}
        language={language}
      />

      <div className="max-w-lg w-full text-center bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
        <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>

        <span className="text-sm font-black uppercase tracking-widest text-accent block mb-2">
          Error 404
        </span>

        <h1 className="text-3xl md:text-4xl font-black font-heading text-primary mb-4">
          {isEs ? 'Página no encontrada' : 'Page Not Found'}
        </h1>

        <p className="text-gray-600 mb-8 text-base leading-relaxed">
          {isEs
            ? 'Lo sentimos, el enlace que intentó abrir no existe o ha sido reubicado. Por favor use los accesos directos abajo.'
            : 'Sorry, the page you are looking for does not exist or might have been removed.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={isEs ? '/es' : '/'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>{isEs ? 'Volver al Inicio' : 'Return Home'}</span>
          </a>

          <a
            href={isEs ? '/es/contacto' : '/contact'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-[#FFB81C] text-primary font-bold px-6 py-3.5 rounded-xl transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEs ? 'Contacto & Cotización' : 'Get a Quote'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
