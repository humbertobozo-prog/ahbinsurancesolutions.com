import React from 'react';
import type { Language } from '../types';
import { translations } from '../constants/translations';
import { Header } from './Header';
import Footer from './Footer';
import { SEOHead } from './SEOHead';

interface EditorialPolicyPageProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const EditorialPolicyPage: React.FC<EditorialPolicyPageProps> = ({ language, setLanguage }) => {
    const content = translations[language];
    const isEs = language === 'es';
    
    const seoTitle = `${content.editorialPolicy.title} | AHB`;
    const seoDescription = isEs
        ? 'Política editorial y revisión independiente de guías de Medicare, Gastos Finales e IUL en Florida por Andrés H. Bozo (NPN 21228432).'
        : 'Editorial review standards and Florida licensing disclosures for Medicare, Final Expense, and IUL guides by Andres H. Bozo (NPN 21228432).';

    return (
        <div className="bg-white text-dark-gray font-sans flex flex-col min-h-screen">
            <SEOHead 
                title={seoTitle}
                description={seoDescription}
                language={language}
                ogImage="https://www.ahbinsurancesolutions.com/og-image.png"
                ogImageAlt={content.editorialPolicy.title}
                datePublished="2024-10-20"
                dateModified="2026-10-27"
            />
            <Header content={content.header} currentLang={language} setLanguage={setLanguage} />
            <main className="flex-grow pt-16 pb-20 container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-black mb-4">{content.editorialPolicy.title}</h1>
                <p className="text-xs font-semibold text-gray-500 mb-8 border-b border-gray-200 pb-4">
                    {isEs
                        ? 'Por Andrés H. Bozo, Broker Licenciado en Florida (NPN 21228432) · Publicado: 20 Oct 2024 · Actualizado: 27 Oct 2026'
                        : 'By Andres H. Bozo, Licensed Florida Broker (NPN 21228432) · Published: Oct 20, 2024 · Updated: Oct 27, 2026'}
                </p>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p>{content.editorialPolicy.intro}</p>
                    <h2 className="text-2xl font-bold mt-8 mb-4">{content.editorialPolicy.commitmentTitle}</h2>
                    <p>{content.editorialPolicy.commitmentText}</p>
                    <h2 className="text-2xl font-bold mt-8 mb-4">{content.editorialPolicy.independenceTitle}</h2>
                    <p>{content.editorialPolicy.independenceText}</p>
                    <h2 className="text-2xl font-bold mt-8 mb-4">
                        {isEs ? 'Estándares de Verificación y Transparencia' : 'Verification & Disclosure Standards'}
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>
                            {isEs
                                ? 'Las cifras de Medicare Parte A, Parte B y topes de Parte D se revisan contra publicaciones oficiales de CMS.gov y Medicare.gov, etiquetando explícitamente los datos por año calendario (2026 vs. 2027).'
                                : 'Medicare Part A, Part B deductibles, and Part D out-of-pocket caps are checked directly against official CMS.gov and Medicare.gov publications and labeled explicitly by plan year (2026 vs. 2027).'}
                        </li>
                        <li>
                            {isEs
                                ? 'Las explicaciones de pólizas IUL y anualidades distinguen claramente entre el piso contractual del 0% en acreditación indexada y los cargos internos de póliza, COI o periodos de rescate.'
                                : 'IUL and fixed annuity guides distinguish clearly between contractual 0% index crediting floors and internal policy charges, Cost of Insurance (COI) deductions, or surrender schedules.'}
                        </li>
                        <li>
                            {isEs
                                ? 'Todas las guías incluyen atribución de autoría y fecha de actualización verificable bajo supervisión del corredor Andrés H. Bozo (NPN 21228432).'
                                : 'Every guide carries visible authorship and last-modified attribution overseen by principal broker Andres H. Bozo (NPN 21228432).'}
                        </li>
                    </ul>
                    
                    <div className="mt-12 p-6 bg-light-gray rounded-2xl border border-gray-200">
                        <p className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">
                            {isEs ? 'Contacto de Cumplimiento' : 'Compliance Contact'}
                        </p>
                        <p className="text-xs text-gray-600">
                            {isEs 
                                ? 'Si tiene preguntas sobre nuestro proceso editorial o la precisión de nuestro contenido, contáctenos en:' 
                                : 'If you have questions about our editorial process or the accuracy of our content, contact us at:'}
                        </p>
                        <a href="mailto:andreshbozo@ahbinsurancesolutions.com" className="text-primary font-black mt-2 inline-block hover:underline">
                            andreshbozo@ahbinsurancesolutions.com
                        </a>
                    </div>
                </div>
            </main>
            <Footer content={content.footer} common={content.common} language={language} />
        </div>
    );
};

export default EditorialPolicyPage;
