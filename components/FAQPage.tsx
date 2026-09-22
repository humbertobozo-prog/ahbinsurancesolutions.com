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
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const baseUrl = 'https://www.ahbinsurancesolutions.com';
    const canonical = `${baseUrl}${isEs ? '/es/preguntas-frecuentes' : '/faq'}`;
    const enUrl = `${baseUrl}/faq`;
    const esUrl = `${baseUrl}/es/preguntas-frecuentes`;

    const title = isEs 
        ? 'Preguntas Frecuentes sobre Medicare, Gastos Finales e IUL en Florida | AHB Insurance' 
        : 'Medicare, Final Expense & IUL FAQ Florida | AHB Insurance Solutions';

    const description = isEs 
        ? 'Respuestas detalladas a más de 24 preguntas clave sobre Medicare Suplementario Plan G y N, Gastos Finales, IUL y Anualidades en Florida con el corredor Andrés H. Bozo.' 
        : 'Comprehensive answers to 24+ essential questions regarding Florida Medicare Supplement Plan G & N, Final Expense, IUL, and Annuities with licensed broker Andres H. Bozo.';

    const categories = [
        { id: 'all', labelEn: 'All Topics', labelEs: 'Todos los Temas' },
        { id: 'medicare', labelEn: 'Medicare & Medigap', labelEs: 'Medicare y Medigap' },
        { id: 'final-expense', labelEn: 'Final Expense', labelEs: 'Gastos Finales' },
        { id: 'iul', labelEn: 'IUL & Retirement', labelEs: 'IUL y Jubilación' },
        { id: 'annuities', labelEn: 'Annuities', labelEs: 'Anualidades' },
        { id: 'general', labelEn: 'General / Broker', labelEs: 'General / Corredor' }
    ];

    const faqs = isEs ? [
        // Medicare (6)
        {
            category: 'medicare',
            q: '¿Qué es un plan Suplementario de Medicare (Medigap)?',
            a: 'Las pólizas Medigap ayudan a pagar ciertos costos de desembolso cubiertos por Medicare (como deducibles, copagos y coseguros). Actúan como seguro secundario al Medicare Original (Partes A y B). Medigap generalmente le permite atenderse con cualquier proveedor a nivel nacional que acepte la asignación de Medicare, sujeto a las reglas de Medicare y Medigap.'
        },
        {
            category: 'medicare',
            q: '¿Cuál es la diferencia entre Medigap Plan G y Plan N en Florida?',
            a: 'El Plan G cubre el 100% de los gastos médicos de bolsillo aprobados por Medicare una vez que usted satisface el deducible anual de la Parte B, incluidos los cargos en exceso. El Plan N ofrece primas mensuales más competitivas, pero requiere pequeños copagos de hasta $20 por consulta médica y no cubre los cargos en exceso de la Parte B.'
        },
        {
            category: 'medicare',
            q: '¿Cuándo es el mejor momento para inscribirse en un plan Medigap en Florida?',
            a: 'Su Período de Inscripción Abierta de Medigap (MOEP) dura 6 meses e inicia el primer día del mes en que cumple 65 años y se inscribe en la Parte B de Medicare. Durante este lapso cuenta con Derechos de Emisión Garantizada, lo que significa que ninguna aseguradora puede rechazarlo ni cobrarle más por condiciones de salud preexistentes.'
        },
        {
            category: 'medicare',
            q: '¿Qué son los Cargos en Exceso de la Parte B y cómo me afectan?',
            a: 'Ocurren cuando un médico o especialista no acepta la asignación de Medicare y cobra hasta un 15% adicional sobre la tarifa aprobada por Medicare. El Plan G cubre el 100% de estos cargos en exceso, mientras que el Plan N no los cubre.'
        },
        {
            category: 'medicare',
            q: '¿Puedo cambiarme de un plan Medicare Advantage a Medigap en Florida?',
            a: 'Sí, pero fuera de derechos de prueba específicos ("trial rights") durante sus primeros 12 meses en Advantage, por lo general deberá pasar por suscripción médica (underwriting), respondiendo cuestionarios de salud. Un corredor independiente puede guiarle sobre los transportistas más favorables.'
        },
        {
            category: 'medicare',
            q: '¿Qué cubre la Parte D de Medicare para medicamentos recetados?',
            a: 'La Parte D es un seguro independiente administrado por aseguradoras privadas aprobado por Medicare para cubrir medicamentos recetados en farmacias. Cada plan cuenta con un formulario específico, niveles de medicamentos (tiers) y fases de cobertura (deducible, inicial, brecha y catastrophic).'
        },

        // Final Expense (6)
        {
            category: 'final-expense',
            q: '¿Qué cubre un seguro de Gastos Finales o de Entierro en Florida?',
            a: 'Es una póliza de seguro de vida entera diseñada específicamente para cubrir los costos funerarios, entierro o cremación, gastos médicos pendientes y deudas menores. Muchas pólizas de emisión simplificada no requieren examen médico tradicional, aunque los requisitos varían por aseguradora y solicitante.'
        },
        {
            category: 'final-expense',
            q: '¿Aumentarán mis primas mensuales o vencerá mi póliza de Gastos Finales?',
            a: 'Muchas pólizas de vida entera participantes ofrecen primas niveladas y cobertura permanente, sujetas a los términos, condiciones y al pago continuo de las primas requeridas. No expiran por la edad del asegurado siempre que las primas se mantengan al día.'
        },
        {
            category: 'final-expense',
            q: '¿Cuál es la diferencia entre Emisión Simplificada (Simplified Issue) y Emisión Garantizada (Guaranteed Issue)?',
            a: 'La Emisión Simplificada requiere responder cuestionarios de salud y verificación en bases de datos de recetas; si califica, otorga protección inmediata desde el Día 1 con tarifas más competitivas. Las pólizas de emisión garantizada generalmente no requieren suscripción médica tradicional ni preguntas de salud, pero la elegibilidad, las limitaciones de beneficios y los períodos de espera varían según el asegurador y el producto.'
        },
        {
            category: 'final-expense',
            q: '¿Cómo funcionan los períodos de espera (waiting periods) en emisión garantizada?',
            a: 'En pólizas de emisión garantizada sin preguntas médicas, si el fallecimiento ocurre por causas naturales (enfermedad) durante los primeros 24 meses, el asegurador reembolsa el 100% de las primas pagadas más un interés estipulado. Las muertes accidentales están cubiertas al 100% desde el Día 1. Tras el mes 24, se paga el 100% del beneficio por fallecimiento.'
        },
        {
            category: 'final-expense',
            q: '¿Puedo calificar si tengo condiciones de salud crónicas como diabetes o hipertensión?',
            a: 'Sí. Muchas condiciones controladas (como diabetes tipo 2 bien manejada o hipertensión) califican perfectamente para opciones de emisión simplificada con beneficios completos de Día 1. Casos de salud más complejos pueden ser elegibles mediante planes de emisión garantizada.'
        },
        {
            category: 'final-expense',
            q: '¿Cómo se determinan las primas de un seguro de Gastos Finales?',
            a: 'Las primas exactas varían en función de múltiples factores individuales, incluyendo la edad al momento de la emisión, el sexo, el estado de salud, el uso de tabaco, el monto de cobertura seleccionado (por ejemplo, $10,000 o $20,000), las reglas de suscripción de la aseguradora y su estado o código postal.'
        },

        // IUL & Retirement (6)
        {
            category: 'iul',
            q: '¿Cómo funciona una póliza de Vida Universal Indexada (IUL)?',
            a: 'Una póliza IUL combina protección de seguro de vida permanente con valor en efectivo vinculado al rendimiento de un índice bursátil (como el S&P 500). Cuenta con un piso contractual del 0% en la acreditación indexada (los costos de seguro y cargos administrativos se siguen deduciendo). Permite acceder a fondos mediante préstamos bajo el Código IRS 7702, siempre que la póliza esté debidamente fondeada, no sea un MEC y se mantenga activa.'
        },
        {
            category: 'iul',
            q: '¿Puedo perder dinero en efectivo si la bolsa de valores cae?',
            a: 'El componente de acreditación indexada cuenta con un piso contractual del 0%, lo que significa que su valor no se acredita con rendimientos negativos ante caídas del mercado. Sin embargo, los costos internos del seguro (COI) y los cargos administrativos de la póliza continúan deduciéndose independientemente del comportamiento bursátil.'
        },
        {
            category: 'iul',
            q: '¿Cómo funcionan los préstamos de póliza bajo el Código IRS 7702?',
            a: 'Los préstamos sobre el valor en efectivo permiten retirar fondos colateralizados de una póliza no-MEC con ventajas fiscales mientras la póliza permanezca en vigor. No son "dinero gratis": los préstamos acumulan intereses devengados por la aseguradora y reducen tanto el valor de rescate como el beneficio por fallecimiento.'
        },
        {
            category: 'iul',
            q: '¿Qué es un Contrato de Donación Modificado (MEC)?',
            a: 'Un MEC ocurre cuando una póliza de seguro de vida recibe aportes de primas que exceden los límites federales establecidos por el Código IRS 7702A. Si una póliza se convierte en MEC, las distribuciones y retiros pierden su tratamiento fiscal favorable y se gravan como ingresos ordinarios sujetos a multas por retiro anticipado.'
        },
        {
            category: 'iul',
            q: '¿Requiere una IUL mantenimiento y fondos de primas constantes?',
            a: 'Sí. Una IUL no es un depósito bancario ni una cuenta de ahorro automatizada. Requiere una gestión y supervisión cuidadosa, así como un fondeo adecuado para compensar el incremento de los costos del seguro (COI) a medida que el asegurado envejece, previniendo así la caducidad (lapse) de la póliza.'
        },
        {
            category: 'iul',
            q: '¿Qué son los beneficios en vida (Living Benefits) en pólizas IUL?',
            a: 'Son cláusulas opcionales o integradas que permiten acelerar una porción significativa del beneficio por fallecimiento (típicamente entre 60% y 90%) en vida si al asegurado se le diagnostica una enfermedad terminal, crónica o crítica, sujeto a las definiciones médicas y reglas de aprobación de la compañía.'
        },

        // Annuities (6)
        {
            category: 'annuities',
            q: '¿Qué es una Anualidad Fija Indexada (FIA)?',
            a: 'Es un contrato financiero emitido por una compañía de seguros que ofrece crecimiento con diferimiento fiscal vinculado a un índice externo (como el S&P 500), protegiendo el principal contra pérdidas directas de mercado mediante un piso contractual del 0%.'
        },
        {
            category: 'annuities',
            q: '¿Cómo protege el principal una anualidad fija durante caídas del mercado?',
            a: 'Debido a la estructura de opciones y garantías del emisor, si el índice bursátil registra un año negativo, el interés acreditado es del 0% en lugar de negativo. Su capital principal previamente acreditado y las ganancias bloqueadas no se reducen por el rendimiento negativo del mercado.'
        },
        {
            category: 'annuities',
            q: '¿Qué es un intercambio libre de impuestos según la Sección 1035 del IRS?',
            a: 'Es una provisión del código fiscal de EE. UU. que permite transferir fondos directamente de una póliza de seguro de vida, contrato de dotación o anualidad existente a una nueva anualidad u otro contrato elegible sin generar un evento tributario gravable en el momento del traspaso.'
        },
        {
            category: 'annuities',
            q: '¿Qué opciones tengo al finalizar el plazo inicial de mi anualidad?',
            a: 'Al término del período de vigencia inicial (por ejemplo, 5, 7 o 10 años), se abre una ventana de renovación. Puede retirar la suma total, realizar un intercambio tax-free bajo la Sección 1035 a un nuevo contrato o dejar que el contrato se renueve bajo las tasas vigentes de la aseguradora.'
        },
        {
            category: 'annuities',
            q: '¿Existen cargos por rescate anticipado (surrender charges) en las anualidades?',
            a: 'Sí. Las anualidades están diseñadas como vehículos a mediano y largo plazo. Retiros que excedan el límite anual exento de penalización (generalmente el 10% del valor del contrato) durante el período de penalización por rescate están sujetos a cargos de la aseguradora y posibles penalizaciones federales por retiro antes de los 59½ años.'
        },
        {
            category: 'annuities',
            q: '¿Cómo se gravan los retiros de una anualidad?',
            a: 'Los retiros de una anualidad con impuestos diferidos se gravan bajo la regla "LIFO" (último en entrar, primero en salir), lo que significa que las ganancias acumuladas se retiran y se gravan como ingreso ordinario antes de que comience a retirar el capital principal aportado.'
        },

        // General / Broker (3)
        {
            category: 'general',
            q: '¿Tiene algún costo la consulta con AHB Insurance Solutions?',
            a: 'No. Nuestra asesoría, análisis de necesidades y proceso de cotización son 100% gratuitos y sin compromiso para usted. Las compañías aseguradoras nos compensan directamente.'
        },
        {
            category: 'general',
            q: '¿Por qué trabajar con un corredor independiente en Florida?',
            a: 'Como corredores independientes (NPN 21228432), no estamos atados a una sola aseguradora. Comparamos planes imparcialmente entre más de 80 compañías líderes para encontrar la combinación ideal de cobertura y presupuesto.'
        },
        {
            category: 'general',
            q: '¿Cómo puedo solicitar una cotización personalizada o hablar con un experto?',
            a: 'Puede hacer clic en cualquiera de los botones de cotización en nuestro sitio web, completar el formulario seguro o llamar directamente al corredor Andrés H. Bozo al +1 (352) 225-8389.'
        }
    ] : [
        // Medicare (6)
        {
            category: 'medicare',
            q: 'What is a Medicare Supplement (Medigap) plan?',
            a: 'Medigap policies help pay certain Medicare-covered out-of-pocket costs (such as deductibles, copays, and coinsurance). They act as secondary insurance to Original Medicare (Parts A & B). Medigap generally allows you to see any provider nationwide who accepts Medicare assignment, subject to Medicare and Medigap rules.'
        },
        {
            category: 'medicare',
            q: 'What is the difference between Medigap Plan G and Plan N in Florida?',
            a: 'Plan G covers 100% of Medicare-approved out-of-pocket medical costs after you meet the annual Part B deductible, including Part B excess charges. Plan N offers more competitive monthly premiums with small copays of up to $20 for doctor visits and does not cover Part B excess charges.'
        },
        {
            category: 'medicare',
            q: 'When is the best time to buy a Medigap policy in Florida?',
            a: 'Your 6-month Medigap Open Enrollment Period (MOEP) begins the month you turn 65 and are enrolled in Medicare Part B. During this window, you have Guaranteed Issue Rights, meaning insurance carriers cannot deny coverage or charge higher premiums due to pre-existing health conditions.'
        },
        {
            category: 'medicare',
            q: 'What are Part B excess charges and how do they affect me in Florida?',
            a: 'Part B excess charges occur when a doctor does not accept Medicare assignment and charges up to an additional 15% above the Medicare-approved amount. Plan G covers 100% of these excess charges, whereas Plan N does not cover them.'
        },
        {
            category: 'medicare',
            q: 'Can I switch from a Medicare Advantage plan back to Medigap in Florida?',
            a: 'Yes, but outside of specific Trial Rights within your first 12 months in Medicare Advantage, you will generally need to pass medical underwriting questions. An independent broker can help evaluate your health profile to identify receptive carriers.'
        },
        {
            category: 'medicare',
            q: 'What does Medicare Part D cover for prescription drugs?',
            a: 'Part D is standalone prescription drug coverage offered by private insurance companies approved by Medicare. Each plan has a specific formulary, drug tiers, and cost-sharing phases (deductible, initial coverage, coverage gap, and catastrophic).'
        },

        // Final Expense (6)
        {
            category: 'final-expense',
            q: 'What does Final Expense or Burial Insurance cover in Florida?',
            a: 'It is a whole life insurance policy designed specifically to cover funeral, burial, or cremation expenses, final medical bills, and minor remaining debts. Many simplified-issue policies do not require a traditional medical exam, although underwriting rules vary by carrier and applicant.'
        },
        {
            category: 'final-expense',
            q: 'Will my monthly premiums increase as I grow older?',
            a: 'Many participating whole life policies offer level premiums and permanent coverage, subject to the policy’s terms, conditions and continued payment of required premiums. They do not expire due to age as long as premiums remain current.'
        },
        {
            category: 'final-expense',
            q: 'What is the difference between Simplified Issue and Guaranteed Issue final expense?',
            a: 'Simplified Issue requires answering health questions and an Rx database check; qualifying applicants receive immediate Day-One Level Benefit protection with more competitive rates. Guaranteed-issue policies generally do not require traditional medical underwriting or health questions, but eligibility, benefit limitations and waiting periods vary by carrier and product.'
        },
        {
            category: 'final-expense',
            q: 'How do graded waiting periods work on guaranteed issue policies?',
            a: 'On zero-question guaranteed issue policies, if death occurs from natural causes (illness) during the first 24 months, the insurer refunds 100% of premiums paid plus interest. Accidental death is covered at 100% immediately from Day 1. After month 24, 100% of the full face amount is paid.'
        },
        {
            category: 'final-expense',
            q: 'Can I qualify if I have chronic health conditions like diabetes or high blood pressure?',
            a: 'Yes. Many well-managed chronic conditions (such as stable Type 2 diabetes or controlled hypertension) qualify easily for simplified-issue plans with full Day-One coverage. More complex health profiles can be accommodated through guaranteed-issue options.'
        },
        {
            category: 'final-expense',
            q: 'How are final expense insurance premiums determined?',
            a: 'Exact premiums depend on multiple individual factors, including issue age, biological sex, tobacco use, health history, face amount selected (e.g., $10,000 or $20,000), carrier underwriting guidelines, and your state or ZIP code.'
        },

        // IUL & Retirement (6)
        {
            category: 'iul',
            q: 'How does an Indexed Universal Life (IUL) policy work?',
            a: 'An IUL policy combines permanent life insurance protection with cash value growth linked to an external market index (such as the S&P 500). It features a contractual 0% index-crediting floor (internal policy charges and COI still apply). It enables tax-advantaged retirement policy loan strategies under IRS Code Section 7702, provided the policy is properly funded, is not a MEC, and remains active.'
        },
        {
            category: 'iul',
            q: 'Can I lose cash value if the stock market index drops?',
            a: 'The index-crediting component features a contractual 0% floor, meaning the policy is not credited with negative index returns during market downturns. However, internal policy charges, cost of insurance (COI), and administrative fees continue to apply regardless of market performance.'
        },
        {
            category: 'iul',
            q: 'How do policy loans work under IRS Code Section 7702?',
            a: 'Policy loans allow you to access tax-advantaged collateralized funds from a non-MEC policy while it remains in force. They are not free money: outstanding loans accrue interest charged by the carrier and reduce both net surrender value and the death benefit.'
        },
        {
            category: 'iul',
            q: 'What is a Modified Endowment Contract (MEC) and how do I avoid it?',
            a: 'A MEC occurs when a life insurance policy receives total premium payments exceeding federal tax limits set by IRS Code Section 7702A. If classified as a MEC, tax-free distribution benefits are lost, and withdrawals are taxed as ordinary income plus potential early distribution penalties.'
        },
        {
            category: 'iul',
            q: 'Do IUL policies require ongoing premium funding and stewardship?',
            a: 'Yes. An IUL is not a bank deposit or automated savings vehicle. It requires careful ongoing policy stewardship and adequate premium funding to offset rising internal Cost of Insurance (COI) charges as the insured ages, preventing policy lapse.'
        },
        {
            category: 'iul',
            q: 'What are living benefits in IUL policies?',
            a: 'Living benefits are optional or built-in riders allowing you to accelerate a significant portion of the death benefit (typically 60% to 90%) while living if diagnosed with a qualifying terminal, chronic, or critical illness, subject to carrier definitions and approval rules.'
        },

        // Annuities (6)
        {
            category: 'annuities',
            q: 'What is a Fixed Indexed Annuity (FIA)?',
            a: 'A Fixed Indexed Annuity is a contract issued by an insurance carrier offering tax-deferred growth linked to an external market index (such as the S&P 500), while protecting principal from direct market losses through a contractual 0% floor.'
        },
        {
            category: 'annuities',
            q: 'How does principal protection work with a 0% floor in annuities?',
            a: 'Due to the options structure and issuer guarantees, if the linked index experiences a negative return year, your credited interest rate is 0% instead of negative. Your previously credited principal and locked gains are not reduced by market downturns.'
        },
        {
            category: 'annuities',
            q: 'What is an IRS Section 1035 tax-free exchange?',
            a: 'An IRS Section 1035 exchange is a tax provision allowing you to transfer funds directly from an existing life insurance policy, endowment contract, or annuity into a new annuity contract without triggering an immediate taxable event.'
        },
        {
            category: 'annuities',
            q: 'What happens at the end of an annuity contract term?',
            a: 'Upon contract maturity, a renewal window opens. You can elect to withdraw funds, execute an IRS Section 1035 tax-free exchange into a new carrier contract, or renew under current prevailing rates.'
        },
        {
            category: 'annuities',
            q: 'Are there surrender charges for early annuity withdrawals?',
            a: 'Yes. Annuities are structured as medium- to long-term retirement vehicles. Withdrawals exceeding annual penalty-free limits (typically 10% of contract value) during the surrender charge period are subject to carrier penalties and potential IRS early withdrawal penalties prior to age 59½.'
        },
        {
            category: 'annuities',
            q: 'How are annuity withdrawals taxed?',
            a: 'Annuity withdrawals from tax-deferred contracts are taxed under LIFO (Last-In, First-Out) rules, meaning accumulated earnings are withdrawn and taxed as ordinary income before your original principal contributions are returned tax-free.'
        },

        // General / Broker (3)
        {
            category: 'general',
            q: 'Does consulting with AHB Insurance Solutions cost anything?',
            a: 'No. Our advisory service, needs analysis, and custom quote process are 100% free and zero-obligation to you. Insurance carriers compensate us directly.'
        },
        {
            category: 'general',
            q: 'Why should I work with an independent insurance broker in Florida?',
            a: 'As independent brokers (NPN 21228432), we are not tied to any single insurance carrier. We compare policies impartially across 80+ top carriers to match your precise coverage goals and budget.'
        },
        {
            category: 'general',
            q: 'How can I request a personalized quote or speak with an expert?',
            a: 'You can click any quote button on our website, complete our secure intake form, or speak directly with licensed broker Andres H. Bozo at +1 (352) 225-8389.'
        }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        const matchesSearch = searchTerm === '' || 
            faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
            faq.a.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                "name": isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions",
                "item": canonical
            }
        ]
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
                schema={[faqSchema, breadcrumbSchema]}
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
                        {isEs ? 'Centro de Conocimiento y Ayuda' : 'Knowledge & Help Center'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black font-heading mb-4">
                        {isEs ? 'Preguntas Frecuentes (FAQ)' : 'Frequently Asked Questions'}
                    </h1>
                    <p className="text-gray-200 text-sm md:text-base font-medium">
                        {isEs ? 'Explore nuestra base completa con más de 24 respuestas autorizadas sobre Medicare, Gastos Finales, IUL y Anualidades en Florida.' : 'Explore our comprehensive knowledge base with 24+ authoritative answers regarding Florida Medicare, Final Expense, IUL, and Annuities.'}
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
                {/* Search and Category Filters */}
                <div className="mb-8 space-y-4">
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={isEs ? 'Buscar una pregunta o palabra clave...' : 'Search a question or keyword...'}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                    />

                    <div className="flex flex-wrap gap-2 pt-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                    selectedCategory === cat.id 
                                        ? 'bg-primary text-white shadow-md' 
                                        : 'bg-light-gray text-gray-700 hover:bg-gray-200 border border-gray-200'
                                }`}
                            >
                                {isEs ? cat.labelEs : cat.labelEn}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12 bg-light-gray rounded-2xl border border-gray-200">
                            <p className="text-gray-600 font-medium">
                                {isEs ? 'No se encontraron preguntas que coincidan con su búsqueda.' : 'No questions found matching your search term.'}
                            </p>
                        </div>
                    ) : (
                        filteredFaqs.map((faq, idx) => {
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
                        })
                    )}
                </div>

                {/* Direct Contact Banner */}
                <div className="mt-12 p-8 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                    <h3 className="font-black text-primary text-xl mb-2">
                        {isEs ? '¿No encuentra la respuesta a su pregunta?' : 'Didn’t find the answer you were looking for?'}
                    </h3>
                    <p className="text-sm text-gray-700 mb-6 max-w-lg mx-auto">
                        {isEs ? 'Hable directamente con el broker licenciado Andrés H. Bozo y reciba orientación personalizada en español o inglés.' : 'Speak directly with licensed broker Andres H. Bozo for personalized guidance in English or Spanish.'}
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
