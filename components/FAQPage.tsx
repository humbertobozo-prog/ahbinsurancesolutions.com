import React, { useState } from 'react';
import type { Language } from '../types';
import { SEOHead } from './SEOHead';

interface FAQPageProps {
    language: Language;
    onOpenQuote: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ language, onOpenQuote }) => {
    const isEs = language === 'es';
    const [searchTerm, setSearchTerm] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/preguntas-frecuentes' : '/faq'}`;
    const enUrl = `${baseUrl}/faq`;
    const esUrl = `${baseUrl}/es/preguntas-frecuentes`;

    const title = isEs 
        ? 'Preguntas Frecuentes sobre Medicare y Seguros en Florida | AHB Insurance' 
        : 'Medicare & Insurance FAQ Florida | AHB Insurance Solutions';

    const description = isEs 
        ? 'Respuestas claras a sus dudas sobre Medicare Suplementario, Gastos Finales, IUL y seguro de vida en Florida. Corredor independiente Andrés H. Bozo.' 
        : 'Clear answers to your questions about Medicare Supplement, Final Expense, IUL, and life insurance in Florida. Independent broker Andres H. Bozo.';

    const faqs = isEs ? [
        {
            q: '¿Qué es un plan Suplementario de Medicare (Medigap)?',
            a: 'Los planes Suplementarios de Medicare (Medigap) son pólizas privadas que ayudan a pagar los costos de bolsillo no cubiertos por el Medicare Original, como el coseguro del 20%, copagos y deducibles. Le permiten acudir a cualquier médico o centro de EE.UU. que acepte Medicare.'
        },
        {
            q: '¿Cuál es la diferencia entre Medigap Plan G y Plan N?',
            a: 'El Plan G cubre el 100% de los gastos médicos de su bolsillo una vez que satisface el deducible anual de la Parte B. El Plan N tiene primas mensuales más bajas, pero requiere pequeños copagos de hasta $20 por consulta médica y no cubre los cargos en exceso de la Parte B.'
        },
        {
            q: '¿Qué cubre un seguro de Gastos Finales o de Entierro?',
            a: 'Es una póliza de seguro de vida entera diseñada específicamente para cubrir los costos funerarios, entierro o cremación, así como facturas médicas pendientes. Mantiene mensualidades congeladas para toda la vida y no requiere exámenes médicos.'
        },
        {
            q: '¿Cómo funciona una póliza de Vida Universal Indexada (IUL)?',
            a: 'Una póliza IUL ofrece protección de seguro de vida permanente combinada con una cuenta de acumulación de efectivo ligada a un índice de mercado (como el S&P 500). Cuenta con un piso del 0% para proteger su capital de caídas bursátiles y permite préstamos libres de impuestos para su jubilación.'
        },
        {
            q: '¿Por qué contratar a través de un corredor (broker) independiente?',
            a: 'Como corredores independientes en AHB Insurance Solutions (NPN 21228432), no trabajamos para una sola aseguradora. Comparamos opciones con más de 80 compañías líderes para encontrar el mejor plan y tarifa para usted, con una consulta 100% gratuita.'
        },
        {
            q: '¿Tiene algún costo la asesoría con AHB Insurance Solutions?',
            a: 'No. Nuestra asesoría y proceso de cotización son 100% gratuitos para usted. Las compañías de seguros pagan nuestra compensación, por lo que usted obtiene el precio oficial exacto o inferior al acudir directamente a la compañía.'
        }
    ] : [
        {
            q: 'What is a Medicare Supplement (Medigap) plan?',
            a: 'Medicare Supplement (Medigap) plans are private insurance policies that pay for out-of-pocket costs not covered by Original Medicare, such as the 20% coinsurance, copays, and deductibles. They allow you to visit any doctor or hospital nationwide that accepts Medicare.'
        },
        {
            q: 'What is the difference between Medigap Plan G and Plan N?',
            a: 'Plan G covers 100% of out-of-pocket medical costs after you meet the annual Part B deductible. Plan N offers lower monthly premiums with small copays of up to $20 for doctor visits and does not cover Part B excess charges.'
        },
        {
            q: 'What does Final Expense or Burial Insurance cover?',
            a: 'It is a whole life insurance policy designed specifically to cover funeral, burial, or cremation costs and remaining medical debts. It locks in your rate for life and requires no medical exams.'
        },
        {
            q: 'How does an Indexed Universal Life (IUL) policy work?',
            a: 'An IUL policy provides permanent life insurance protection combined with a cash value account tied to a market index (like the S&P 500). It includes a 0% floor to protect your principal from market losses and allows for tax-free retirement loans.'
        },
        {
            q: 'Why should I use an independent insurance broker?',
            a: 'As independent brokers at AHB Insurance Solutions (NPN 21228432), we represent you, not the insurance companies. We compare plans across 80+ top carriers to find you the best rate for free.'
        },
        {
            q: 'Does consulting with AHB Insurance Solutions cost anything?',
            a: 'No. Our advisory service and custom quote process are 100% free to you. Insurance carriers compensate us directly, so you get the exact same or better rate as going direct.'
        }
    ];

    const filteredFaqs = faqs.filter(faq => 
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
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
                schema={faqSchema}
            />

            <div className="bg-light-gray border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 md:px-6 text-xs text-gray-600 font-medium flex items-center gap-2">
                    <a href={isEs ? '/es' : '/'} className="hover:text-primary transition-colors">
                        {isEs ? 'Inicio' : 'Home'}
                    </a>
                    <span>/</span>
                    <span className="text-primary font-bold">{isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}</span>
                </div>
            </div>

            <section className="bg-primary text-white py-12 md:py-16 text-center">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <span className="bg-accent text-primary text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                        {isEs ? 'Centro de Ayuda' : 'Help Center'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black font-heading mb-4">
                        {isEs ? 'Preguntas Frecuentes (FAQ)' : 'Frequently Asked Questions'}
                    </h1>
                    <p className="text-gray-200 text-sm md:text-base font-medium">
                        {isEs ? 'Encuentre respuestas rápidas a sus dudas sobre Medicare, Gastos Finales e IUL.' : 'Find quick answers regarding Medicare, Burial Insurance, and IUL policies.'}
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
                <div className="mb-8">
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={isEs ? 'Buscar una pregunta o tema...' : 'Search a question or topic...'}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                    />
                </div>

                <div className="space-y-4">
                    {filteredFaqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div key={idx} className="bg-light-gray rounded-2xl border border-gray-200 overflow-hidden transition-all">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full p-5 text-left font-bold text-primary flex justify-between items-center gap-4 hover:bg-gray-200/50 transition-colors"
                                >
                                    <span className="text-base sm:text-lg">{faq.q}</span>
                                    <span className="text-accent-dark font-black text-xl">{isOpen ? '−' : '+'}</span>
                                </button>
                                {isOpen && (
                                    <div className="p-5 pt-0 text-sm text-gray-700 leading-relaxed border-t border-gray-200/50">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Direct Contact Banner */}
                <div className="mt-12 p-8 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                    <h3 className="font-black text-primary text-xl mb-2">
                        {isEs ? '¿No encuentra la respuesta a su pregunta?' : 'Didn’t find the answer you were looking for?'}
                    </h3>
                    <p className="text-sm text-gray-700 mb-6 max-w-lg mx-auto">
                        {isEs ? 'Hable directamente con el broker Andrés H. Bozo y reciba orientación personalizada en español o inglés.' : 'Speak directly with licensed broker Andres H. Bozo for personalized guidance in English or Spanish.'}
                    </p>
                    <button
                        onClick={onOpenQuote}
                        className="bg-accent text-primary font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow hover:bg-[#FFB81C] transition-all"
                    >
                        {isEs ? 'Solicitar Asesoría Gratuita ➔' : 'Request Free Consultation ➔'}
                    </button>
                </div>
            </section>
        </div>
    );
};
