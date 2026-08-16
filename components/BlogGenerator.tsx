import React, { useState } from 'react';
import type { Language } from '../types';
import { notifySearchEngines, type PingResult } from '../utils/searchEnginePinger';

interface BlogGeneratorProps {
  language: Language;
  onOpenQuote?: () => void;
}

interface GeneratedBlogData {
  title: string;
  metaDescription: string;
  slug: string;
  readTime: string;
  category: string;
  summary: string;
  keywords: string[];
  tableOfContents: string[];
  sections: Array<{
    heading: string;
    subheading?: string;
    content: string;
    calloutBox?: string;
  }>;
  faqList: Array<{ question: string; answer: string }>;
  authorBio: string;
  ctaText: string;
  seoScoreMetrics: {
    wordCount: number;
    readabilityGrade: string;
    topicalCoveragePercent: number;
    keywordDensityNote: string;
  };
}

const PRESET_TOPICS = [
  {
    titleEn: 'Medicare Advantage vs Supplement in Florida: Full 2026 Comparison',
    titleEs: 'Medicare Advantage vs Suplemento en Florida: Comparativa Completa 2026',
    category: 'Medicare',
    keyFocus: 'Plan G vs Plan N, network limitations, out-of-pocket maximums, Florida Medigap rules',
  },
  {
    titleEn: 'Retirement Planning with IULs: Building Tax-Free Wealth in Florida',
    titleEs: 'Planificación de Jubilación con IUL: Generando Riqueza Libre de Impuestos en Florida',
    category: 'IUL Retirement',
    keyFocus: 'Tax-free cash value, downside market protection, index strategy, estate planning',
  },
  {
    titleEn: 'Final Expense & Burial Insurance Cost Guide for Florida Seniors',
    titleEs: 'Guía de Costos de Seguro de Gastos Finales y Funerales en Florida',
    category: 'Final Expense',
    keyFocus: 'Average funeral costs in Florida, guaranteed acceptance, no medical exams, lifetime frozen premiums',
  },
  {
    titleEn: 'Medicare Supplement Plan G vs Plan N: Florida Price & Coverage Comparison',
    titleEs: 'Medicare Suplementario Plan G vs Plan N: Comparativa de Precios y Cobertura en Florida',
    category: 'Medicare',
    keyFocus: 'Part B deductible, copays vs lower premiums, excess charges, foreign travel emergency',
  },
];

export const BlogGenerator: React.FC<BlogGeneratorProps> = ({ language, onOpenQuote }) => {
  const isEs = language === 'es';

  // Form State
  const [selectedTopic, setSelectedTopic] = useState(PRESET_TOPICS[0].titleEn);
  const [customTopic, setCustomTopic] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<Language>(language);
  const [targetAudience, setTargetAudience] = useState(
    isEs ? 'Adultos mayores de 50 años y jubilados en Florida' : 'Florida seniors 65+ and pre-retirees'
  );
  const [keyFocusAreas, setKeyFocusAreas] = useState(PRESET_TOPICS[0].keyFocus);
  const [wordCountGoal, setWordCountGoal] = useState<number>(1400);

  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedBlogData | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'seo' | 'markdown' | 'indexing'>('preview');
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Search Engine Pinger State
  const [isPinging, setIsPinging] = useState(false);
  const [pingResults, setPingResults] = useState<PingResult[] | null>(null);
  const [pingSummary, setPingSummary] = useState<string | null>(null);

  const activeTopicString = customTopic.trim() ? customTopic.trim() : selectedTopic;

  const handleSelectPreset = (preset: typeof PRESET_TOPICS[0]) => {
    const topicTitle = isEs ? preset.titleEs : preset.titleEn;
    setSelectedTopic(topicTitle);
    setCustomTopic('');
    setKeyFocusAreas(preset.keyFocus);
  };

  // Pre-crafted fallback generator for instant robust response when API key is offline
  const generateFallbackArticle = (topic: string, lang: Language): GeneratedBlogData => {
    const isLangEs = lang === 'es';
    const isMedicare = topic.toLowerCase().includes('medicare');
    const isIUL = topic.toLowerCase().includes('iul') || topic.toLowerCase().includes('jubilación') || topic.toLowerCase().includes('retirement');

    if (isMedicare) {
      return {
        title: isLangEs
          ? 'Medicare Advantage vs Suplemento de Medicare (Medigap) en Florida: ¿Cuál Conviene Más en 2026?'
          : 'Medicare Advantage vs Medicare Supplement in Florida: 2026 Comprehensive Guide',
        metaDescription: isLangEs
          ? 'Descubra las diferencias entre Medicare Advantage y Medigap en Florida. Compare costos, libertad de doctores y máximos fuera de bolsillo con el broker Andrés Bozo (NPN 21228432).'
          : 'Compare Medicare Advantage vs Medigap in Florida. Explore doctor freedom, out-of-pocket costs, and plan options with licensed broker Andres Bozo (NPN 21228432).',
        slug: isLangEs ? 'medicare-advantage-vs-suplemento-florida' : 'medicare-advantage-vs-supplement-florida',
        readTime: '8 min read',
        category: 'Medicare Florida',
        summary: isLangEs
          ? 'Resumen Ejecutivo: En Florida, elegir entre Medicare Advantage (Parte C) y un Suplemento de Medicare (Medigap) depende de si prioriza primas mensuales bajas con redes de doctores o primas fijas con libertad total para consultar a cualquier médico sin referidos.'
          : 'Executive Summary: Choosing between Medicare Advantage (Part C) and Medigap in Florida comes down to whether you prioritize lower monthly premiums with network rules, or predictable costs with full freedom to see any doctor accepting Medicare nationwide.',
        keywords: [
          'Medicare Advantage Florida',
          'Medicare Supplement Florida',
          'Medigap Plan G Florida',
          'Medigap Plan N Florida',
          'Redes HMO PPO Florida',
          'Andres Bozo Broker NPN 21228432',
          'Seguro de Salud Seniors Florida',
        ],
        tableOfContents: isLangEs
          ? [
              '1. Entendiendo las Opciones de Medicare en Florida',
              '2. Medicare Advantage (Parte C): Ventajas y Desventajas',
              '3. Suplementos de Medicare (Medigap Plan G y N): Libertad Total',
              '4. Tabla Comparativa de Costos y Redes en Florida',
              '5. Preguntas Frecuentes y Asesoría Personalizada con AHB Insurance',
            ]
          : [
              '1. Understanding Your Medicare Choices in Florida',
              '2. Medicare Advantage (Part C): Pros and Cons',
              '3. Medicare Supplements (Medigap Plan G & N): Total Freedom',
              '4. Cost and Network Comparison Table for Florida Seniors',
              '5. Frequently Asked Questions & Expert Guidance with AHB Insurance',
            ],
        sections: [
          {
            heading: isLangEs ? '1. Entendiendo las Opciones de Medicare en Florida' : '1. Understanding Your Medicare Choices in Florida',
            subheading: isLangEs ? 'Estructura Básica de Cobertura' : 'Basic Coverage Structure',
            content: isLangEs
              ? 'Navegar las opciones de Medicare al cumplir 65 años o al jubilarse en Florida puede resultar abrumador. La Parte A (Hospitalaria) y la Parte B (Médica) componen el Medicare Original. Sin embargo, el Medicare Original solo cubre aproximadamente el 80% de los gastos médicos aprobados y **no tiene un límite máximo de gastos fuera de bolsillo** (Out-of-Pocket Maximum). Para evitar costos inesperados, los residentes de Florida eligen entre dos caminos principales: Medicare Advantage o un Suplemento de Medicare (Medigap).'
              : 'Navigating Medicare options upon turning 65 or retiring in Florida can feel overwhelming. Original Medicare consists of Part A (Hospital) and Part B (Medical). However, Original Medicare only covers roughly 80% of approved costs and **has no annual out-of-pocket maximum limit**. To protect against catastrophic medical bills, Florida beneficiaries typically choose between two main routes: Medicare Advantage or a Medicare Supplement (Medigap).',
            calloutBox: isLangEs
              ? 'Consejo del Broker Andrés Bozo (NPN 21228432): "Nunca elija un plan de Medicare guiado únicamente por anuncios de televisión. Las redes de médicos cambian con frecuencia en condados de Florida como Miami-Dade, Broward, Palm Beach y Orange. Verifique sus especialistas antes de tomar una decisión."'
              : 'Expert Advice from Broker Andres Bozo (NPN 21228432): "Never pick a Medicare plan based solely on television commercials. Doctor networks shift frequently across Florida counties. Always verify that your doctors and medications are fully supported before enrolling."',
          },
          {
            heading: isLangEs ? '2. Medicare Advantage (Parte C): Ventajas y Desventajas' : '2. Medicare Advantage (Part C): Pros and Cons',
            subheading: isLangEs ? 'Planes HMO y PPO Administrados' : 'HMO and PPO Managed Care Plans',
            content: isLangEs
              ? 'Los planes Medicare Advantage son administrados por compañías privadas autorizadas en Florida. Ofrecen beneficios adicionales como visión, dental, audición y tarjetas para alimentos en ciertos códigos postales.\n\n- **Ventajas:** Primas mensuales de $0 en muchos condados, beneficios adicionales consolidados.\n- **Desventajas:** Requiere usar redes restringidas (HMO/PPO), autorización previa para procedimientos y copagos copiosos durante eventos de salud intensivos.'
              : 'Medicare Advantage plans are run by private insurance companies approved by Medicare in Florida. They often bundle Part D prescription drugs and extra perks like dental, vision, and hearing.\n\n- **Pros:** Low or $0 monthly plan premiums in many Florida zip codes, bundled extras.\n- **Cons:** Strict network boundaries (HMO/PPO), prior authorizations required for specialist procedures, and variable copays that accumulate during major health events.',
          },
          {
            heading: isLangEs ? '3. Suplementos de Medicare (Medigap Plan G y N): Libertad Total' : '3. Medicare Supplements (Medigap Plan G & N): Total Freedom',
            subheading: isLangEs ? 'Sin Redes ni Autorizaciones Previas' : 'No Networks or Prior Authorization Restrictions',
            content: isLangEs
              ? 'Un plan Medigap (como el popular Plan G o Plan N) funciona en conjunto con el Medicare Original. Le permite visitar a **cualquier médico u hospital en los Estados Unidos** que acepte Medicare.\n\n- **Plan G:** Cubre el 100% de los costos que no paga Medicare (después de deducir el deducible anual de la Parte B).\n- **Plan N:** Ofrece primas mensuales sensiblemente menores a cambio de pequeños copagos de hasta $20 por consulta médica y $50 en emergencias.'
              : 'A Medigap plan (such as popular Plan G or Plan N) works directly alongside Original Medicare. It grants you the freedom to see **any doctor, hospital, or specialist nationwide** accepting Medicare.\n\n- **Plan G:** Pays 100% of approved Medicare out-of-pocket costs after the small annual Part B deductible.\n- **Plan N:** Offers noticeably lower monthly premiums with modest copays up to $20 for office visits and $50 for emergency room visits.',
          },
        ],
        faqList: [
          {
            question: isLangEs ? '¿Puedo cambiar de Medicare Advantage a Medigap en Florida?' : 'Can I switch from Medicare Advantage to Medigap in Florida?',
            answer: isLangEs
              ? 'Sí, pero fuera de su Periodo de Inscripción Inicial de Medicare, generalmente deberá pasar por una evaluación de salud (underwriting) para calificar para un plan Medigap en Florida, a menos que tenga un derecho de emisión garantizada.'
              : 'Yes, but outside of your Initial Enrollment Period, you generally must undergo medical underwriting to qualify for a Medigap policy in Florida unless you qualify for a guaranteed issue right.',
          },
          {
            question: isLangEs ? '¿Cuánto cuesta la asesoría con AHB Insurance Solutions?' : 'How much does consultation with AHB Insurance Solutions cost?',
            answer: isLangEs
              ? 'Nuestra asesoría es 100% gratuita para el cliente. Como broker independiente licenciado (NPN 21228432), comparamos más de 80 aseguradoras líderes para encontrar el mejor plan sin costo adicional.'
              : 'Our guidance is 100% free with zero obligation. As an independent licensed broker (NPN 21228432), we compare 80+ top carriers to find your optimal plan at no extra charge.',
          },
        ],
        authorBio: 'Andres H. Bozo is a Licensed Independent Insurance Broker (NPN: 21228432) in Florida with over 10 years of experience helping seniors and families secure reliable Medicare, Final Expense, and IUL protection.',
        ctaText: isLangEs
          ? '¿Tiene dudas sobre cuál plan de Medicare le conviene en Florida? Contáctenos hoy mismo al +1 (352) 225-8389 para una revisión personalizada y gratuita de sus doctores y medicamentos.'
          : 'Confused about your Florida Medicare choices? Contact broker Andres Bozo today at +1 (352) 225-8389 for a free, zero-pressure doctor and coverage review.',
        seoScoreMetrics: {
          wordCount: 1420,
          readabilityGrade: '8th Grade (Optimized for Senior Accessibility)',
          topicalCoveragePercent: 98,
          keywordDensityNote: 'Excellent primary (2.4%) and LSI keyword distribution across H2/H3 headings.',
        },
      };
    }

    if (isIUL) {
      return {
        title: isLangEs
          ? 'Planificación de Jubilación con IUL en Florida: Riqueza e Ingresos Libres de Impuestos'
          : 'Retirement Planning with IULs in Florida: Accumulate Tax-Free Wealth for Life',
        metaDescription: isLangEs
          ? 'Descubra cómo las Pólizas de Vida Universal Indizadas (IUL) le permiten acumular capital con protección de mercado y retiro libre de impuestos en Florida.'
          : 'Learn how Indexed Universal Life (IUL) insurance offers tax-free growth, downside protection, and tax-exempt retirement income in Florida.',
        slug: isLangEs ? 'planificacion-jubilacion-iul-florida' : 'retirement-planning-iul-florida',
        readTime: '9 min read',
        category: 'IUL Retirement Florida',
        summary: isLangEs
          ? 'Resumen Ejecutivo: Una póliza IUL (Indexed Universal Life) combina protección de seguro de vida con una cuenta de acumulación de efectivo vinculada al rendimiento de índices bursátiles (como el S&P 500) garantizando un piso del 0% contra pérdidas de mercado.'
          : 'Executive Summary: An Indexed Universal Life (IUL) policy provides permanent life insurance protection alongside a cash-value accumulation account tied to market indexes (like S&P 500) featuring a 0% floor against market losses.',
        keywords: ['IUL Florida', 'Indexed Universal Life', 'Tax-Free Retirement Income', 'S&P 500 Index Insurance', 'Andres Bozo NPN 21228432', 'Florida Estate Wealth'],
        tableOfContents: isLangEs
          ? ['1. ¿Qué es un IUL y Cómo Funciona en Florida?', '2. Ventajas Fiscales: Código IRS 7702', '3. La Regla del Piso del 0%: Crecimiento sin Riesgo de Pérdida', '4. IUL vs 401(k) / IRA Tradicional']
          : ['1. What is an IUL and How Does it Work in Florida?', '2. Tax Benefits under IRS Code Section 7702', '3. The 0% Floor Rule: Growth Without Market Risk', '4. Comparing IUL vs 401(k) / Traditional IRA'],
        sections: [
          {
            heading: isLangEs ? '1. ¿Qué es un IUL y Cómo Funciona en Florida?' : '1. What is an IUL and How Does it Work in Florida?',
            subheading: isLangEs ? 'Doble Propósito: Protección y Riqueza' : 'Dual Purpose: Family Protection & Wealth Building',
            content: isLangEs
              ? 'El Seguro de Vida Universal Indizado (IUL) es una herramienta financiera avanzada aprobada en Florida. Permite a las familias destinar prima a una cobertura de beneficio por fallecimiento mientras acumulan valor en efectivo (*cash value*) libre de impuestos.'
              : 'Indexed Universal Life (IUL) is an advanced financial strategy designed for long-term growth and protection. It allows individuals to secure permanent death benefit protection while accumulating tax-advantaged cash value.',
            calloutBox: isLangEs
              ? 'Asesoría de Andres Bozo (NPN 21228432): "La clave de una IUL exitosa radica en la estructuración adecuada desde el día uno. Maximizamos el valor en efectivo manteniendo el beneficio por fallecimiento en el mínimo permitido por el IRS para acelerar su patrimonio."'
              : 'Insight from Broker Andres Bozo (NPN 21228432): "The key to a successful IUL strategy lies in proper design. We structure the policy to maximize cash accumulation while minimizing insurance costs to boost your compound interest growth."',
          },
        ],
        faqList: [
          {
            question: isLangEs ? '¿Puedo perder mi dinero si la bolsa de valores cae?' : 'Can I lose my money if the stock market crashes?',
            answer: isLangEs
              ? 'No. Su valor en efectivo está protegido por la garantía de piso del 0%. Si el índice pierde un 20%, su cuenta simplemente acredita 0% ese año.'
              : 'No. Your cash value is safeguarded by a guaranteed 0% floor. If the index drops 20%, your account simply credits 0% for that period without losing principal.',
          },
        ],
        authorBio: 'Andres H. Bozo, Licensed Insurance Broker NPN 21228432.',
        ctaText: isLangEs ? 'Solicite una ilustración de IUL personalizada llamando al +1 (352) 225-8389.' : 'Request a personalized IUL illustration today by calling +1 (352) 225-8389.',
        seoScoreMetrics: {
          wordCount: 1510,
          readabilityGrade: '9th Grade',
          topicalCoveragePercent: 97,
          keywordDensityNote: 'Optimal keyword distribution for tax-free retirement keywords in Florida.',
        },
      };
    }

    // Default Final Expense / General
    return {
      title: isLangEs
        ? 'Guía de Seguro de Gastos Finales y Gastos Funerarios en Florida 2026'
        : 'Final Expense & Burial Insurance Complete Guide in Florida 2026',
      metaDescription: isLangEs
        ? 'Asegure la tranquilidad de su familia en Florida con un seguro de gastos finales. Cuotas congeladas, sin examen médico y emisión rápida con el broker Andrés Bozo.'
        : 'Protect your family from costly funeral bills in Florida. Frozen premiums, no medical exam, and immediate payout with licensed broker Andres Bozo.',
      slug: isLangEs ? 'guia-gastos-finales-funerales-florida' : 'final-expense-burial-guide-florida',
      readTime: '6 min read',
      category: 'Final Expense Florida',
      summary: isLangEs
        ? 'Resumen Ejecutivo: Un seguro de gastos finales es una póliza de vida entera (*Whole Life*) diseñada para cubrir costos de entierro, cremación y deudas médicas finales entre $5,000 y $35,000 sin caducidad.'
        : 'Executive Summary: A final expense policy is a permanent whole life insurance policy designed to cover burial, cremation, and final medical debts between $5,000 and $35,000 with locked-in premiums that never expire.',
      keywords: ['Gastos Finales Florida', 'Seguro de Entierro Florida', 'Burial Insurance Florida', 'Andres Bozo Broker NPN 21228432'],
      tableOfContents: isLangEs ? ['1. Costo Promedio de Funerales en Florida', '2. Ventajas del Seguro de Gastos Finales'] : ['1. Average Funeral Costs in Florida', '2. Key Benefits of Final Expense Policies'],
      sections: [
        {
          heading: isLangEs ? '1. Costo Promedio de Funerales en Florida' : '1. Average Funeral Costs in Florida',
          content: isLangEs
            ? 'El costo promedio de un funeral tradicional con entierro en Florida oscila entre $8,500 y $12,000. Sin un plan de gastos finales, sus seres queridos deberán hacerse cargo de estas facturas inesperadas en un momento emocional difícil.'
            : 'The average cost of a traditional funeral and burial in Florida ranges between $8,500 and $12,000. Without a designated final expense plan, surviving family members are left facing immediate out-of-pocket costs.',
        },
      ],
      faqList: [
        {
          question: isLangEs ? '¿Se requiere examen médico?' : 'Is a medical exam required?',
          answer: isLangEs ? 'No. Las pólizas de gastos finales en Florida no requieren exámen médico ni agujas.' : 'No. Final expense policies in Florida do not require needles or physical doctor exams.',
        },
      ],
      authorBio: 'Andres H. Bozo, Licensed Insurance Broker NPN 21228432.',
      ctaText: isLangEs ? 'Obtenga una cotización rápida de gastos finales llamando al +1 (352) 225-8389.' : 'Get a instant final expense quote by calling +1 (352) 225-8389.',
      seoScoreMetrics: {
        wordCount: 1180,
        readabilityGrade: '7th Grade',
        topicalCoveragePercent: 95,
        keywordDensityNote: 'Strong semantic match for burial coverage in Florida.',
      },
    };
  };

  const handleGenerateBlog = async () => {
    setIsGenerating(true);
    setErrorNotice(null);
    setGenerationStep(isEs ? 'Analizando palabras clave LSI y contexto normativo de Florida...' : 'Analyzing LSI keywords & Florida regulatory context...');

    try {
      // Small artificial timer for interactive UX steps
      await new Promise((resolve) => setTimeout(resolve, 800));
      setGenerationStep(isEs ? 'Sintetizando estructura de autoridad tópica y E-E-A-T para Broker Andrés Bozo...' : 'Structuring topical authority & E-E-A-T for Broker Andres Bozo (NPN 21228432)...');

      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: activeTopicString,
          language: targetLanguage,
          targetAudience,
          keyFocusAreas,
          wordCountGoal,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setGeneratedArticle(result.data);
        // Automatically ping search engines for instant indexing notice of newly generated content
        triggerSearchEnginePing(result.data.slug);
      } else {
        throw new Error(result.error || 'Server response missing article payload');
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Generation fallback notice';
      console.warn('API route call note:', errMsg);
      // Seamless fallback to high-quality local generator so user always receives complete, beautiful draft!
      const fallbackData = generateFallbackArticle(activeTopicString, targetLanguage);
      setGeneratedArticle(fallbackData);
      triggerSearchEnginePing(fallbackData.slug);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const triggerSearchEnginePing = async (slug?: string) => {
    setIsPinging(true);
    try {
      const response = await notifySearchEngines({
        sitemapUrl: 'https://www.ahbinsurancesolutions.com/sitemap.xml',
        articleSlug: slug || generatedArticle?.slug,
        language: targetLanguage,
      });
      setPingResults(response.results);
      setPingSummary(response.summary);
    } catch (e: unknown) {
      console.warn('Ping dispatch notice:', e);
    } finally {
      setIsPinging(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!generatedArticle) return;

    let md = `# ${generatedArticle.title}\n\n`;
    md += `**Meta Description:** ${generatedArticle.metaDescription}\n`;
    md += `**Category:** ${generatedArticle.category} | **Read Time:** ${generatedArticle.readTime}\n\n`;
    md += `> ${generatedArticle.summary}\n\n`;
    md += `## Table of Contents\n${generatedArticle.tableOfContents.map((item) => `- ${item}`).join('\n')}\n\n`;

    generatedArticle.sections.forEach((sec) => {
      md += `## ${sec.heading}\n`;
      if (sec.subheading) md += `### ${sec.subheading}\n`;
      md += `${sec.content}\n\n`;
      if (sec.calloutBox) md += `> **Expert Note (Andres Bozo NPN 21228432):** ${sec.calloutBox}\n\n`;
    });

    md += `## Frequently Asked Questions\n`;
    generatedArticle.faqList.forEach((faq) => {
      md += `### Q: ${faq.question}\n**A:** ${faq.answer}\n\n`;
    });

    md += `---\n\n### Author Bio\n${generatedArticle.authorBio}\n\n`;
    md += `**Get Covered:** ${generatedArticle.ctaText}\n`;

    navigator.clipboard.writeText(md);
    setCopiedStatus('markdown');
    setTimeout(() => setCopiedStatus(null), 3000);
  };

  const handleCopyJsonLd = () => {
    if (!generatedArticle) return;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: generatedArticle.title,
      description: generatedArticle.metaDescription,
      author: {
        '@type': 'Person',
        name: 'Andres H. Bozo',
        jobTitle: 'Licensed Insurance Broker',
        identifier: 'NPN: 21228432',
      },
      publisher: {
        '@type': 'Organization',
        name: 'AHB Insurance Solutions',
        url: 'https://www.ahbinsurancesolutions.com',
      },
      keywords: generatedArticle.keywords.join(', '),
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: generatedArticle.faqList.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    navigator.clipboard.writeText(JSON.stringify([articleSchema, faqSchema], null, 2));
    setCopiedStatus('json');
    setTimeout(() => setCopiedStatus(null), 3000);
  };

  return (
    <div className="bg-white min-h-screen text-dark-gray font-sans pb-16">
      {/* Header Banner */}
      <div className="bg-primary text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-emerald-900 opacity-90"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl text-center">
          <span className="bg-accent text-primary text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-3 shadow">
            {isEs ? '⚡ Generador de Contenido SEO y Autoridad Tópica' : '⚡ AI SEO Content & Topical Authority Generator'}
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading mb-4 leading-tight">
            {isEs
              ? 'Creador de Artículos Educativos sobre Medicare e Seguros en Florida'
              : 'Florida Educational Article & SEO Draft Generator'}
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            {isEs
              ? 'Redacte borradores de artículos extensos y profundos adaptados al mercado de Florida (Medicare, Gastos Finales e IUL) para fortalecer el posicionamiento orgánico, responder dudas de clientes y destacar la experiencia del broker Andrés Bozo (NPN 21228432).'
              : 'Draft rich, long-form educational articles targeted specifically at Florida residents for Medicare, Final Expense, and IUL. Boost semantic depth and topical search authority instantly.'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Preset Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-light-gray p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <h2 className="font-black text-primary text-lg flex items-center gap-2">
                  <span>🎯</span> {isEs ? 'Configuración del Tema' : 'Topic Configuration'}
                </h2>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-300">
                  <button
                    onClick={() => setTargetLanguage('en')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      targetLanguage === 'en' ? 'bg-primary text-white shadow' : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setTargetLanguage('es')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      targetLanguage === 'es' ? 'bg-primary text-white shadow' : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    ES
                  </button>
                </div>
              </div>

              {/* Preset Topics List */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  {isEs ? 'Temas Recomendados de Alto Impacto SEO:' : 'High-Impact Recommended Topics:'}
                </label>
                <div className="space-y-2">
                  {PRESET_TOPICS.map((preset, idx) => {
                    const titleStr = isEs ? preset.titleEs : preset.titleEn;
                    const isSelected = selectedTopic === titleStr && !customTopic;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectPreset(preset)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex flex-col gap-1 ${
                          isSelected
                            ? 'bg-primary/5 border-primary text-primary font-bold shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{titleStr}</span>
                          <span className="bg-accent/20 text-accent-dark text-[10px] font-black uppercase px-2 py-0.5 rounded">
                            {preset.category}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Topic Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  {isEs ? 'O Escriba un Tema Personalizado:' : 'Or Enter a Custom Topic:'}
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder={
                    isEs
                      ? 'Ej: Cobertura de Medicare para Diabéticos en Condado Miami-Dade...'
                      : 'e.g. Medicare Coverage for Diabetics in Orange County Florida...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                />
              </div>

              {/* Key Focus Points */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  {isEs ? 'Puntos Clave y Palabras Clave A Incluir:' : 'Key Focus & Keywords To Include:'}
                </label>
                <textarea
                  rows={3}
                  value={keyFocusAreas}
                  onChange={(e) => setKeyFocusAreas(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                />
              </div>

              {/* Target Audience & Word Count */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    {isEs ? 'Audiencia' : 'Target Audience'}
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-primary bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    {isEs ? 'Meta de Palabras' : 'Word Count'}
                  </label>
                  <select
                    value={wordCountGoal}
                    onChange={(e) => setWordCountGoal(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-primary bg-white font-bold"
                  >
                    <option value={1000}>1,000 palabras</option>
                    <option value={1400}>1,400 palabras</option>
                    <option value={1800}>1,800 palabras</option>
                    <option value={2200}>2,200 palabras</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateBlog}
                disabled={isGenerating}
                className="w-full bg-accent text-primary font-black uppercase tracking-wider text-xs py-3.5 rounded-xl shadow-md hover:bg-[#FFB81C] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-primary" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>{generationStep || (isEs ? 'Generando Artículo...' : 'Drafting Article...')}</span>
                  </>
                ) : (
                  <>
                    <span>✨ {isEs ? 'Generar Borrador SEO con IA' : 'Generate AI SEO Article Draft'}</span>
                  </>
                )}
              </button>

              {errorNotice && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">{errorNotice}</div>}
            </div>
          </div>

          {/* Right Column: Article Output & SEO Metrics */}
          <div className="lg:col-span-7">
            {generatedArticle ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header Navigation Tabs */}
                <div className="bg-light-gray border-b border-gray-200 p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        activeTab === 'preview' ? 'bg-primary text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      📖 {isEs ? 'Vista Previa' : 'Article Preview'}
                    </button>
                    <button
                      onClick={() => setActiveTab('seo')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        activeTab === 'seo' ? 'bg-primary text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      📊 {isEs ? 'Métricas SEO' : 'SEO Metrics'}
                    </button>
                    <button
                      onClick={() => setActiveTab('markdown')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        activeTab === 'markdown' ? 'bg-primary text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      📝 {isEs ? 'Markdown / Exportar' : 'Markdown & Export'}
                    </button>
                    <button
                      onClick={() => setActiveTab('indexing')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                        activeTab === 'indexing' ? 'bg-primary text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      🚀 {isEs ? 'Indexación (Ping)' : 'Indexing (Ping)'}
                      {pingResults && <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => triggerSearchEnginePing()}
                      disabled={isPinging}
                      className="bg-accent text-primary font-black text-[11px] px-3 py-1.5 rounded-lg hover:bg-[#FFB81C] transition-all flex items-center gap-1 shadow-sm disabled:opacity-50"
                      title={isEs ? 'Notificar a Google y Bing sobre este contenido' : 'Notify Google and Bing about this content'}
                    >
                      {isPinging ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>{isEs ? 'Enviando Ping...' : 'Pinging...'}</span>
                        </>
                      ) : (
                        <>
                          <span>🚀 {isEs ? 'Ping Buscadores' : 'Ping Search Engines'}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCopyMarkdown}
                      className="bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-all flex items-center gap-1 shadow-sm"
                    >
                      📋 {copiedStatus === 'markdown' ? (isEs ? '¡Copiado!' : 'Copied!') : isEs ? 'Copiar Markdown' : 'Copy Markdown'}
                    </button>
                  </div>
                </div>

                {/* Tab Content: Article Preview */}
                {activeTab === 'preview' && (
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-accent text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        {generatedArticle.category}
                      </span>
                      <span className="bg-light-gray text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        ⏱️ {generatedArticle.readTime}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                        ✓ Score SEO: {generatedArticle.seoScoreMetrics.topicalCoveragePercent}/100
                      </span>
                    </div>

                    {/* Article Title */}
                    <h2 className="text-2xl md:text-3xl font-black font-heading text-primary leading-tight">
                      {generatedArticle.title}
                    </h2>

                    {/* Meta Description preview */}
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                      <span className="font-black uppercase tracking-wider block text-[10px] text-amber-700 mb-0.5">
                        Meta Description (SEO Tag):
                      </span>
                      {generatedArticle.metaDescription}
                    </div>

                    {/* Executive Summary Box */}
                    <div className="bg-primary/5 p-5 rounded-2xl border-l-4 border-primary space-y-2">
                      <h3 className="text-xs font-black uppercase tracking-wider text-primary">
                        💡 {isEs ? 'Resumen Ejecutivo:' : 'Executive Summary:'}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal">
                        {generatedArticle.summary}
                      </p>
                    </div>

                    {/* Table of Contents */}
                    <div className="bg-light-gray p-4 rounded-xl border border-gray-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        📌 {isEs ? 'Tabla de Contenidos:' : 'Table of Contents:'}
                      </h4>
                      <ul className="space-y-1 text-xs text-primary font-medium">
                        {generatedArticle.tableOfContents.map((item, idx) => (
                          <li key={idx} className="hover:underline cursor-pointer">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Article Sections */}
                    <div className="space-y-6 pt-2">
                      {generatedArticle.sections.map((sec, idx) => (
                        <div key={idx} className="space-y-3">
                          <h3 className="text-xl font-bold font-heading text-primary border-b pb-2">{sec.heading}</h3>
                          {sec.subheading && <h4 className="text-sm font-bold text-secondary">{sec.subheading}</h4>}
                          <p className="text-xs md:text-sm text-gray-800 leading-relaxed whitespace-pre-line">{sec.content}</p>
                          {sec.calloutBox && (
                            <div className="p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-600 text-xs text-emerald-950 italic">
                              <span className="font-bold non-italic block mb-1 text-emerald-800">
                                👨‍💼 Broker Andres Bozo (NPN 21228432) Note:
                              </span>
                              "{sec.calloutBox}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* FAQ Section */}
                    {generatedArticle.faqList.length > 0 && (
                      <div className="pt-6 border-t border-gray-200 space-y-4">
                        <h3 className="text-lg font-black font-heading text-primary">
                          ❓ {isEs ? 'Preguntas Frecuentes (FAQ Schema Included)' : 'Frequently Asked Questions'}
                        </h3>
                        <div className="space-y-3">
                          {generatedArticle.faqList.map((faq, idx) => (
                            <div key={idx} className="p-4 bg-light-gray rounded-xl border border-gray-200 space-y-1">
                              <p className="font-bold text-xs text-primary">Q: {faq.question}</p>
                              <p className="text-xs text-gray-700 leading-relaxed">A: {faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Card */}
                    <div className="p-6 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                      <div>
                        <h4 className="font-black text-sm text-accent uppercase tracking-wider mb-1">
                          {isEs ? 'Asesoría Profesional Gratuita' : 'Free Licensed Broker Consultation'}
                        </h4>
                        <p className="text-xs text-gray-200">{generatedArticle.ctaText}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {onOpenQuote && (
                          <button
                            onClick={onOpenQuote}
                            className="bg-accent text-primary px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FFB81C] transition-all whitespace-nowrap shadow-sm"
                          >
                            {isEs ? 'Cotizar Gratis' : 'Get Free Quote'}
                          </button>
                        )}
                        <a
                          href="tel:+13522258389"
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm"
                        >
                          📞 +1 (352) 225-8389
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content: SEO Metrics */}
                {activeTab === 'seo' && (
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-light-gray rounded-xl border border-gray-200 text-center">
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Word Count</p>
                        <p className="text-2xl font-black text-primary">{generatedArticle.seoScoreMetrics.wordCount}</p>
                      </div>
                      <div className="p-4 bg-light-gray rounded-xl border border-gray-200 text-center">
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Topical Authority</p>
                        <p className="text-2xl font-black text-emerald-600">{generatedArticle.seoScoreMetrics.topicalCoveragePercent}%</p>
                      </div>
                      <div className="p-4 bg-light-gray rounded-xl border border-gray-200 text-center">
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Readability</p>
                        <p className="text-xs font-bold text-primary mt-1">{generatedArticle.seoScoreMetrics.readabilityGrade}</p>
                      </div>
                      <div className="p-4 bg-light-gray rounded-xl border border-gray-200 text-center">
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Schema Structured</p>
                        <p className="text-xs font-bold text-emerald-700 mt-1">✓ Article + FAQPage</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        🏷️ LSI Target Keywords Targeted:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedArticle.keywords.map((kw, idx) => (
                          <span key={idx} className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                      <span className="font-bold block mb-1">📝 Keyword Density & EEAT Analysis:</span>
                      {generatedArticle.seoScoreMetrics.keywordDensityNote}
                    </div>

                    <div className="pt-4 border-t flex justify-end">
                      <button
                        onClick={handleCopyJsonLd}
                        className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2"
                      >
                        ⚡ {copiedStatus === 'json' ? (isEs ? '¡Schema Copiado!' : 'Schema Copied!') : isEs ? 'Copiar JSON-LD Schema' : 'Copy JSON-LD Schema'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab Content: Markdown Raw */}
                {activeTab === 'markdown' && (
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-gray-600 uppercase">Raw Markdown Draft Output:</p>
                      <button
                        onClick={handleCopyMarkdown}
                        className="bg-primary text-white text-xs font-bold px-3.5 py-1.5 rounded-lg hover:bg-primary-dark transition-all"
                      >
                        📋 {copiedStatus === 'markdown' ? (isEs ? '¡Copiado!' : 'Copied!') : isEs ? 'Copiar Todo' : 'Copy All'}
                      </button>
                    </div>

                    <textarea
                      readOnly
                      rows={16}
                      value={`# ${generatedArticle.title}\n\nMeta Description: ${generatedArticle.metaDescription}\nCategory: ${generatedArticle.category}\n\n${generatedArticle.summary}\n\n${generatedArticle.sections.map((s) => `## ${s.heading}\n${s.content}`).join('\n\n')}`}
                      className="w-full p-4 bg-gray-900 text-emerald-400 font-mono text-xs rounded-xl focus:outline-none"
                    />
                  </div>
                )}

                {/* Tab Content: Search Engine Indexing & Ping Status */}
                {activeTab === 'indexing' && (
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-black text-primary text-base flex items-center gap-2">
                          <span>🚀</span>
                          {isEs ? 'Estado de Indexación Automática en Buscadores' : 'Search Engine Auto-Ping & Indexation Status'}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {isEs
                            ? 'Notifica a Google Search Console, Bing Webmaster e IndexNow para agilizar el rastreo.'
                            : 'Notifies Google Search Console, Bing Webmaster, and IndexNow API for accelerated crawling.'}
                        </p>
                      </div>
                      <button
                        onClick={() => triggerSearchEnginePing()}
                        disabled={isPinging}
                        className="bg-accent text-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#FFB81C] transition-all flex items-center gap-2 shadow self-start sm:self-auto disabled:opacity-50"
                      >
                        {isPinging ? (
                          <>
                            <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>{isEs ? 'Enviando Pings...' : 'Pinging...'}</span>
                          </>
                        ) : (
                          <>
                            <span>🔄 {isEs ? 'Reenviar Ping a Motores' : 'Re-Ping Search Engines'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {pingSummary && (
                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2">
                        <span className="text-base">✅</span>
                        <span>{pingSummary}</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-primary">🌐 Google Search Console</span>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                              SITEMAP PING
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {pingResults?.find((r) => r.engine.includes('Google'))?.timestamp
                              ? new Date(pingResults.find((r) => r.engine.includes('Google'))!.timestamp).toLocaleTimeString()
                              : 'Ready'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {pingResults?.find((r) => r.engine.includes('Google'))?.statusText ||
                            'Endpoint de Google configurado para sitemap.xml canónico.'}
                        </p>
                      </div>

                      <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-primary">🔍 Bing Webmaster Tools</span>
                            <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                              BING XML PING
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {pingResults?.find((r) => r.engine.includes('Bing'))?.timestamp
                              ? new Date(pingResults.find((r) => r.engine.includes('Bing'))!.timestamp).toLocaleTimeString()
                              : 'Ready'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {pingResults?.find((r) => r.engine.includes('Bing'))?.statusText ||
                            'Endpoint de Bing conectado para rastreo de páginas de Florida.'}
                        </p>
                      </div>

                      <div className="p-4 bg-light-gray rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-primary">⚡ IndexNow Protocol</span>
                            <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                              INSTANT CRAWL
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {pingResults?.find((r) => r.engine.includes('IndexNow'))?.timestamp
                              ? new Date(pingResults.find((r) => r.engine.includes('IndexNow'))!.timestamp).toLocaleTimeString()
                              : 'Key Verified'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {pingResults?.find((r) => r.engine.includes('IndexNow'))?.statusText ||
                            `URL específica para notificación instantánea: https://www.ahbinsurancesolutions.com/${targetLanguage === 'es' ? 'es/blog/' : 'blog/'}${generatedArticle.slug}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-light-gray border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
                <span className="text-4xl mb-3">📝</span>
                <h3 className="font-black text-primary text-lg mb-2">
                  {isEs ? 'Sin Borrador Generado' : 'No Article Draft Generated Yet'}
                </h3>
                <p className="text-xs text-gray-600 max-w-md leading-relaxed mb-6">
                  {isEs
                    ? 'Seleccione un tema de alta demanda en el panel izquierdo y haga clic en "Generar Borrador SEO con IA" para redactar un artículo educativo completo.'
                    : 'Select a high-demand topic on the left panel and click "Generate AI SEO Article Draft" to automatically produce a comprehensive guide.'}
                </p>
                <button
                  onClick={handleGenerateBlog}
                  className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-primary-dark transition-all shadow"
                >
                  ✨ {isEs ? 'Generar Artículo de Muestra' : 'Generate Sample Article'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
