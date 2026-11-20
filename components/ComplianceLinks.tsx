
import React from 'react';
import type { Language, TranslationContent } from '../types';

interface ComplianceLinksProps {
    content: TranslationContent['authoritativeLinks'];
    language?: Language;
}

export const ComplianceLinks: React.FC<ComplianceLinksProps> = ({ content, language = 'en' }) => {
    const isEs = language === 'es';

    return (
        <section className="bg-white py-12 border-t border-gray-100" aria-labelledby="compliance-heading">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto space-y-10">
                    {/* Clear, senior-friendly Coverage Guide to improve clarity and text ratio */}
                    <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200/80">
                        <h2 className="text-2xl font-black font-heading text-primary mb-2">
                            {isEs
                                ? 'Guía Rápida para Familias y Adultos Mayores'
                                : 'Simple Answers About Medicare, Burial & Life Coverage'}
                        </h2>
                        <p className="text-sm text-slate-600 mb-6">
                            {isEs
                                ? 'Escrito por Andrés H. Bozo (NPN 21228432) · Actualizado: 20 de noviembre de 2026'
                                : 'Plain-language guide written by licensed broker Andres H. Bozo (NPN 21228432). Updated November 20, 2026.'}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
                            <article>
                                <h3 className="font-bold text-primary text-base mb-1.5">
                                    {isEs ? '¿Cómo ayuda Medigap Plan G o Plan N?' : 'How does Medigap Plan G or Plan N protect you?'}
                                </h3>
                                <p>
                                    {isEs
                                        ? 'Medicare Original cubre el 80% de las visitas médicas. Usted paga el 20% restante sin límite anual. Un suplemento Medigap cubre ese 20% y los copagos hospitalarios. Puede visitar a cualquier médico del país que acepte Medicare.'
                                        : 'Original Medicare pays 80% of approved medical visits, leaving a 20% share with no yearly limit. Medigap Plan G or Plan N steps in to pay those remaining bills. You keep freedom to visit any doctor nationwide who takes Medicare.'}
                                </p>
                            </article>

                            <article>
                                <h3 className="font-bold text-primary text-base mb-1.5">
                                    {isEs ? '¿Quién califica para Gastos Finales?' : 'Who qualifies for Final Expense protection?'}
                                </h3>
                                <p>
                                    {isEs
                                        ? 'Las pólizas de gastos finales ofrecen montos de $5,000 a $35,000 para cubrir funeral, cremación o deudas médicas. La mayoría solo pide preguntas simples de salud, sin exámenes de sangre. También existen planes garantizados si tuvo condiciones previas.'
                                        : 'Final expense policies offer $5,000 to $35,000 in whole life protection for funeral, cremation, and final bills. Most applicants answer simple health questions with no medical exam. Guaranteed options remain available for chronic health histories.'}
                                </p>
                            </article>

                            <article>
                                <h3 className="font-bold text-primary text-base mb-1.5">
                                    {isEs ? '¿Cómo funciona una póliza IUL para retiro?' : 'How does an IUL policy build retirement value?'}
                                </h3>
                                <p>
                                    {isEs
                                        ? 'Una póliza IUL brinda protección de vida y acumulación vinculada a un índice bursátil que puede contar con un piso contractual del 0% en la acreditación indexada (los cargos internos de la póliza y el costo del seguro COI siguen aplicando). Los préstamos bajo la regla IRS 7702 requieren mantener la póliza activa.'
                                        : 'An Indexed Universal Life policy pairs lifelong protection with cash accumulation linked to a market index. A contractual 0% floor on the index-crediting component limits negative index credits (internal policy charges and COI still apply). Policy loans under IRS Code 7702 require keeping the contract properly funded.'}
                                </p>
                            </article>

                            <article>
                                <h3 className="font-bold text-primary text-base mb-1.5">
                                    {isEs ? '¿Por qué trabajar con un corredor independiente?' : 'Why work with an independent licensed broker?'}
                                </h3>
                                <p>
                                    {isEs
                                        ? 'Un agente exclusivo solo vende una marca. Como corredor independiente, Andrés Bozo compara opciones entre múltiples aseguradoras licenciadas en Florida para ajustar el plan a sus médicos, medicinas y presupuesto, sin honorarios adicionales (la aseguradora compensa al corredor tras la emisión).'
                                        : 'A captive agent can only show one company. As an independent advisor, Andres Bozo compares rates across multiple Florida-licensed carriers to match your doctors, prescriptions, and budget with no consulting fee (insurers compensate the broker directly upon enrollment).'}
                                </p>
                            </article>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="md:w-1/3 text-center md:text-left">
                            <div className="inline-flex p-3 bg-secondary/5 rounded-2xl mb-4 border border-secondary/10">
                                <svg aria-hidden="true" className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h2 id="compliance-heading" className="text-xl font-black font-heading text-primary mb-3 uppercase tracking-tight">{content.title}</h2>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                {content.description}
                            </p>
                        </div>
                        
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {content.items.map((item, index) => (
                                <a 
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-5 bg-light-gray rounded-2xl border border-gray-100 hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-primary font-black text-sm uppercase tracking-wider group-hover:text-secondary">{item.label}</span>
                                        <svg aria-hidden="true" className="w-4 h-4 text-gray-500 group-hover:text-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                    </div>
                                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{item.source}</span>
                                </a>
                            ))}
                            
                            {/* Visible CMS & Financial Disclaimers */}
                            <div className="sm:col-span-2 p-4 bg-accent/10 rounded-2xl border border-accent/25 text-xs text-slate-700 leading-relaxed">
                                <p className="font-bold text-primary mb-1">
                                    {isEs ? 'Aviso Legal de Medicare y Cumplimiento' : 'Important Medicare & Policy Disclaimers'}
                                </p>
                                <p>
                                    {isEs
                                        ? 'No ofrecemos todos los planes disponibles en su área. Comuníquese con Medicare.gov o llame al 1-800-MEDICARE para ver todas sus opciones. Los detalles, primas y aprobaciones dependen de la suscripción de cada compañía y leyes estatales. Este sitio ofrece educación general y no constituye asesoría legal o fiscal.'
                                        : 'Disclaimer: We do not offer every plan available in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options. Policy availability, premiums, and approval depend on underwriting and contract terms. Information here is educational and not tax or legal advice.'}
                                </p>
                                <p className="mt-2 font-semibold text-primary">
                                    {isEs
                                        ? 'Dirección Postal / Administrativa (sin atención al público): 5500 SW Archer Road, Ste H103, Gainesville, FL 32607 · Tel: +1 (352) 225-8389 · NPN: 21228432'
                                        : 'Mailing & Administrative Address (no walk-in office): 5500 SW Archer Road, Ste H103, Gainesville, FL 32607 · Phone: +1 (352) 225-8389 · NPN: 21228432'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComplianceLinks;

