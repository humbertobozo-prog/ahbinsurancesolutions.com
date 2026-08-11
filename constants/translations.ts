import type { TranslationContent, Language } from '../types';

export const translations: Record<Language, TranslationContent> = {
  en: {
    meta: {
      title: "Medicare, Final Expense & IUL Specialists | AHB Insurance Solutions",
      description: "Secure your family's future with expert insurance guidance. Specializing in Medicare, Final Expense Insurance, and Indexed Universal Life (IUL). Licensed Broker NPN: 21228432."
    },
    common: {
      npnTooltip: "National Producer Number - A unique NAIC identifier for licensed insurance professionals."
    },
    header: {
      nav: {
        solutions: "SOLUTIONS",
        expertise: "EXPERTISE",
        benefits: "BENEFITS",
        results: "RESULTS",
        getQuote: "GET QUOTE",
        services: "SOLUTIONS",
        about: "EXPERTISE",
        whyUs: "BENEFITS",
        testimonials: "RESULTS",
        contact: "GET QUOTE",
      },
      language: "Español",
    },
    hero: {
      heading: "Medicare Supplement Plans in Florida | Florida Medigap Quotes",
      subheading: "At AHB Insurance Solutions, we represent you, not the insurance companies. As independent licensed brokers, we compare 80+ top carriers to find the perfect Medicare Supplement, Burial Insurance for Florida Seniors, or Indexed Universal Life (IUL) plan for your unique needs.",
      cta: "Check 2026 Florida Eligibility ➔",
      trustText: "🔒 Licensed Professional | NPN: 21228432 | Florida Licensed Broker"
    },
    keyTakeaways: {
      title: "Key Takeaways",
      items: [
        { label: "Medicare Experts", value: "Custom A/B/C/D guidance." },
        { label: "Burial Protection", value: "Guaranteed acceptance burial plans." },
        { label: "IUL Growth", value: "Tax-free wealth & retirement strategies." },
        { label: "80+ Companies", value: "We compare the market for your best rate." }
      ]
    },
    services: {
      title: "Our Specialized Solutions",
      items: [
        {
          icon: "M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Medicare Supplement Plans in Florida",
          description: "Confused by Medicare parts A, B, C, and D? We simplify your options to ensure you get the maximum benefits and the lowest out-of-pocket costs.",
          highlight: "Florida Medigap Quotes available for instant comparisons today.",
        },
        {
          icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
          title: "Burial Insurance Florida Seniors",
          description: "Protect your family from the financial burden of funeral costs. Compare the best final expense options in Tampa, Miami, Orlando, and statewide Florida.",
          highlight: "Guaranteed acceptance programs — even if you've been denied coverage previously.",
        },
        {
          icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
          title: "Indexed Universal Life (IUL)",
          description: "Indexed Universal Life insurance offers more than a death benefit. It's a powerful tool to grow tax-free cash value for a worry-free retirement.",
          highlight: "Build a legacy that grows over time."
        },
        {
          icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Term & Whole Life",
          description: "From simple term life to permanent whole life protection. We help you choose the policy that fits your budget and goals.",
        },
        {
          icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Annuities",
          description: "Never outlive your money. We design guaranteed income streams to ensure you enjoy your golden years without financial stress.",
        },
        {
          icon: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Dental, Vision & Hearing",
          description: "Essential care for a full life. Our supplemental plans cover what original Medicare doesn't, keeping your senses sharp and smile bright.",
          highlight: "Complete coverage for your quality of life."
        },
      ],
    },
    whyChooseUs: {
      title: "The AHB Advantage",
      items: [
        {
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "10+ Years Expertise",
          description: "A decade of helping seniors navigate the complex insurance landscape.",
        },
        {
          icon: "M12 6.252a5.752 5.752 0 010 11.504A5.752 5.752 0 0112 6.252z",
          title: "Client-First Ethics",
          description: "As your broker, my only loyalty is to you and your best interests.",
        },
        {
          icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18M18.75 3v18M9 6.75h6.375M9 12h6.375M9 17.25h6.375M12 21V3",
          title: "80+ A-Rated Carriers",
          description: "We shop the market so you don't have to, ensuring the lowest possible rates.",
        },
        {
          icon: "M3 5h12M9 3v2m0 10v2m5.618-4.591A8.966 8.966 0 0118 21l-3.09-3.09m-1.5-1.5l-3.09 3.09A8.966 8.966 0 013 11.008l3.09-3.09m-1.5-1.5l3.09 3.09",
          title: "Bilingual Service",
          description: "Spanish or English? We speak your language to ensure total clarity.",
        },
      ],
    },
    aboutUs: {
      badge: "TRUSTED ADVISOR",
      identityBadge: "Licensed Agent | NPN: 21228432",
      title: "Our Mission: Protecting Your Legacy",
      paragraph1: "Founded on the principles of honesty and transparency, AHB Insurance Solutions was established by <strong>Andres H Bozo</strong>, a <strong>Licensed Broker (NPN: 21228432)</strong>. After seeing many seniors struggle with confusing paperwork and rising costs, Andres committed to creating a brokerage that simplifies the process while maximizing protection.",
      paragraph2: "We specialize in the products that matter most to you as you plan for the future. Whether it's finding the right Medicare Advantage plan, securing a Final Expense policy to protect your children from funeral costs, or using an IUL to build tax-free wealth, we have the expertise to guide you.",
      paragraph3: "At AHB, you are never just a policy number. You are a neighbor, a friend, and a partner. We work with over 80 nationwide carriers to find the 'Goldilocks' plan—the one that's just right for your budget and your health.",
      imageAlt: "Andres H. Bozo, expert insurance broker, providing personalized guidance for Medicare and Life Insurance.",
      statsYears: "Years of Experience",
      statsCompanies: "Carrier Partners",
      statsService: "Client Satisfaction"
    },
    authoritativeLinks: {
      title: "Authoritative Resources & Compliance",
      description: "For your protection and to help you make informed decisions, we provide direct access to official government resources and licensing verification.",
      items: [
        { label: "Medicare.gov", source: "Official U.S. Government Site", url: "https://www.medicare.gov" },
        { label: "Social Security Administration", source: "SSA.gov Official Site", url: "https://www.ssa.gov" },
        { label: "Florida Dept. of Financial Services", source: "Agent License Verification", url: "https://across.myfloridacfo.com/LicenseSearch" }
      ]
    },
    testimonials: {
      title: "What Our Clients Say",
      label: "Real Experiences",
      items: [
        {
          quote: "Andres made the Medicare maze so easy to understand. I finally have the coverage I need without the stress!",
          author: "Maria G.",
          location: "Miami, FL",
        },
        {
          quote: "I was worried about my health history, but Andres found me a Final Expense policy that was affordable and accepted me immediately.",
          author: "John D.",
          location: "Jacksonville, FL",
        },
        {
          quote: "The IUL strategy Andres explained is changing my retirement outlook. Professional and highly knowledgeable.",
          author: "Carlos R.",
          location: "Tampa, FL",
        },
        {
          quote: "Finding a broker who speaks Spanish fluently and actually cares about the community is a blessing. Highly recommended!",
          author: "Elena P.",
          location: "Orlando, FL",
        },
      ],
    },
    trustBadges: {
        title: "Advanced Security & Reliability",
        items: [
            {
                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.956 11.956 0 013.586 21a11.956 11.956 0 0110.434-18.286z",
                title: "Cloud-Optimized Infrastructure",
                description: "Protected by enterprise-grade CDN for high availability and global performance."
            },
            {
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                title: "256-bit SSL Protection",
                description: "Your information is transmitted with industry-standard bank-level encryption."
            },
            {
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                title: "Licensed Professional",
                description: "Verified NPN 21228432. Certified to provide personalized and unbiased quotes."
            }
        ]
    },
    contactForm: {
      mainTitle: "Check Your 2026 Eligibility. Answer 3 quick questions to see your rates.",
      licenseInfo: "Licensed Broker | NPN: 21228432",
      secureConnection: "Secured by Advanced CDN",
      steps: {
        1: {
          question: "Which protection is most important to you?",
          options: {
            funeral: "Medicare Supplements",
            medicare: "Final Expense / Burial",
            retirement: "IUL / Retirement Savings",
            dental: "Dental, Vision & Hearing"
          }
        },
        2: {
          question: "What is your current age?",
          options: {
            range1: "50 to 64",
            range2: "65 to 75",
            range3: "76 or older"
          }
        },
        3: {
          title: "Good news! You likely qualify for specialized savings.",
          question: "Where should we send your personalized quote?",
          inputs: {
            name: "Full Name",
            phone: "Phone Number",
            email: "Email Address"
          },
          legalText: 'By clicking "GET MY QUOTE", I consent to be contacted via phone, SMS, or email by AHB Insurance Solutions. This may include automated technology. Standard rates apply. No purchase necessary.',
          submit: "GET MY FREE QUOTE ➔"
        }
      },
      errors: {
        nameRequired: "Please enter your full name.",
        nameLength: "Name is too short.",
        emailRequired: "Email is required.",
        emailInvalid: "Invalid email format.",
        phoneInvalid: "Invalid USA phone number."
      },
      successMessage: "Success! An expert advisor is preparing your quotes and will reach out shortly.",
      errorMessage: "Transmission error. Please try again or call us directly.",
      backButton: "Back",
      stepLabel: "Step"
    },
    footer: {
        companyName: "AHB Insurance Solutions LLC",
        description: "Your independent partner for a secure and dignified retirement.",
        licenseInfo: "Licensed Broker | NPN: 21228432",
        linksTitle: "Quick Links",
        links: {
            services: "Services",
            about: "Our Story",
            whyUs: "Why AHB",
            testimonials: "Reviews",
            contact: "Free Quote",
            privacy: "Privacy Policy",
            terms: "Terms of Service"
        },
        contactTitle: "Get in Touch",
        followUsTitle: "Connect",
        address: "5500 SW Archer Road, Apt H103\nGainesville, FL 32607, USA",
        phone: "+1-352-225-8389",
        email: "andreshbozo@ahbinsurancesolutions.com",
        whatsapp: "Chat on WhatsApp",
        facebook: "Facebook",
        instagram: "Instagram",
        secureConnection: "Advanced CDN & SSL Encryption",
        copyright: "© 2026 AHB Insurance Solutions LLC. All Rights Reserved."
    },
    whatsappButton: {
        ariaLabel: "Chat on WhatsApp"
    },
    tapToCallButton: {
        label: "Tap to Call: +1 (352) 225-8389",
        phone: "+1-352-225-8389"
    }
  },
  es: {
    meta: {
        title: "Seguro Medicare Florida y Gastos Finales | Broker de Seguros Bilingüe AHB",
        description: "Encuentre el mejor Seguro Medicare en Florida y Pólizas de Seguro de Gastos Finales sin examen médico. Comparamos 80+ aseguradoras para la comunidad hispana. Broker Licenciado NPN 21228432."
    },
    common: {
      npnTooltip: "Número de Productor Nacional - Un identificador único de la NAIC para profesionales de seguros licenciados."
    },
    header: {
      nav: {
        solutions: "SOLUCIONES",
        expertise: "EXPERIENCIA",
        benefits: "BENEFICIOS",
        results: "RESULTADOS",
        getQuote: "COTIZAR",
        services: "SOLUCIONES",
        about: "EXPERIENCIA",
        whyUs: "BENEFICIOS",
        testimonials: "RESULTADOS",
        contact: "COTIZAR",
      },
      language: "English",
    },
    hero: {
      heading: "Seguro Medicare en Florida y Gastos Finales | Asesoría en Español",
      subheading: "En AHB Insurance Solutions representamos sus intereses, no a las aseguradoras. Como brokers independientes licenciados en Florida, comparamos más de 80 compañías líderes para conseguirle el mejor Seguro Medicare en Florida, Seguro de Gastos Finales (Entierro) y Vida Universal Indexada (IUL).",
      cta: "Verificar Elegibilidad en Florida 2026 ➔",
      trustText: "🔒 Broker Bilingüe Licenciado | NPN: 21228432 | Asesoría 100% Gratuita"
    },
    keyTakeaways: {
      title: "Resumen de Valor",
      items: [
        { label: "Expertos Medicare", value: "Guía personalizada Partes A/B/C/D." },
        { label: "Gastos Finales", value: "Planes de entierro con aceptación garantizada." },
        { label: "Estrategias IUL", value: "Riqueza libre de impuestos y retiro." },
        { label: "80+ Compañías", value: "Comparamos todo el mercado para usted." }
      ]
    },
    services: {
      title: "Nuestras Soluciones Especializadas",
      items: [
        {
          icon: "M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Planes Suplementarios de Medicare en Florida",
          description: "¿Confundido por las partes A, B, C y D? Simplificamos sus opciones para asegurar que obtenga los máximos beneficios con el menor costo posible.",
          highlight: "Cotizaciones Gratuitas de Medigap en Florida para comparar hoy.",
        },
        {
          icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
          title: "Seguro de Gastos Finales y Entierro en Florida",
          description: "Proteja a su familia de la carga financiera de un funeral. Compare las mejores opciones de seguros de entierros para personas mayores en Miami, Tampa y Orlando.",
          highlight: "Programas con aceptación garantizada — incluso si le han denegado cobertura antes.",
        },
        {
          icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
          title: "Seguro de Vida Universal Indexado (IUL)",
          description: "El seguro de Vida Universal Indexada es una herramienta poderosa para acumular valor en efectivo libre de impuestos para su retiro.",
          highlight: "Construya un legado que crece con el tiempo."
        },
        {
          icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Vida Término y Permanente",
          description: "Desde protección temporal hasta seguros de vida permanentes. Le ayudamos a elegir la póliza que se ajuste a sus metas.",
        },
        {
          icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Anualidades",
          description: "Nunca se quede sin dinero. Diseñamos ingresos garantizados para que disfrute su jubilación sin preocupaciones financieras.",
        },
        {
          icon: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Dental, Visión y Audición",
          description: "Cuidado esencial para una vida plena. Nuestros planes cubren lo que Medicare original no cubre.",
          highlight: "Cobertura completa para su calidad de vida."
        },
      ],
    },
    whyChooseUs: {
      title: "La Ventaja AHB",
      items: [
        {
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "10+ Años de Experiencia",
          description: "Una década ayudando a la comunidad a navegar el complejo mundo de los seguros.",
        },
        {
          icon: "M12 6.252a5.752 5.752 0 010 11.504A5.752 5.752 0 0112 6.252z",
          title: "Ética de Servicio",
          description: "Como su broker, mi única lealtad es hacia usted y sus mejores intereses.",
        },
        {
          icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18M18.75 3v18M9 6.75h6.375M9 12h6.375M9 17.25h6.375M12 21V3",
          title: "80+ Compañías de Élite",
          description: "Buscamos en todo el mercado para asegurar que obtenga la tarifa más baja posible.",
        },
        {
          icon: "M3 5h12M9 3v2m0 10v2m5.618-4.591A8.966 8.966 0 0118 21l-3.09-3.09m-1.5-1.5l-3.09 3.09A8.966 8.966 0 013 11.008l3.09-3.09m-1.5-1.5l3.09 3.09",
          title: "Asesoría Bilingüe",
          description: "¿Español o Inglés? Hablamos su idioma para garantizar total claridad.",
        },
      ],
    },
    aboutUs: {
      badge: "ASESOR DE CONFIANZA",
      identityBadge: "Agente Licenciado | NPN: 21228432",
      title: "Nuestra Misión: Proteger su Legado",
      paragraph1: "Fundada bajo principios de honestidad y transparencia, AHB Insurance Solutions fue establecida por <strong>Andres H Bozo</strong>, <strong>Broker Licenciado (NPN: 21228432)</strong>. Al ver a muchas personas mayores luchar con trámites confusos y costos crecientes, Andres se comprometió a simplificar el proceso.",
      paragraph2: "Nos especializamos en los productos que más le importan. Ya sea encontrar el plan de Medicare adecuado, asegurar una póliza de Gastos Finales para proteger a sus hijos, o usar un IUL para crear riqueza libre de impuestos.",
      paragraph3: "En AHB, usted no es solo un número. Es un vecino y un amigo. Trabajamos con más de 80 compañías a nivel nacional para encontrar el plan perfecto para su presupuesto y salud.",
      imageAlt: "Andres H. Bozo, experto en seguros, brindando asesoría personalizada en Medicare y Seguros de Vida.",
      statsYears: "Años de Experiencia",
      statsCompanies: "Compañías Aliadas",
      statsService: "Satisfacción del Cliente"
    },
    authoritativeLinks: {
      title: "Recursos Oficiales y Cumplimiento",
      description: "Para su protección y para ayudarle a tomar decisiones informadas, proporcionamos acceso directo a recursos gubernamentales oficiales y verificación de licencias.",
      items: [
        { label: "Medicare.gov", source: "Sitio Oficial del Gobierno de EE.UU.", url: "https://www.medicare.gov" },
        { label: "Admin. del Seguro Social", source: "Sitio Oficial SSA.gov", url: "https://www.ssa.gov" },
        { label: "Depto. de Seguros de Florida", source: "Verificación de Licencia de Agente", url: "https://across.myfloridacfo.com/LicenseSearch" }
      ]
    },
    testimonials: {
      title: "Lo Que Dicen Nuestros Clientes",
      label: "Experiencias Reales",
      items: [
        {
          quote: "Andres hizo que el laberinto de Medicare fuera fácil de entender. ¡Finalmente tengo la cobertura que necesito!",
          author: "Maria G.",
          location: "Miami, FL",
        },
        {
          quote: "Me preocupaba mi salud, pero Andres me encontró una póliza de Gastos Finales asequible que me aceptó de inmediato.",
          author: "John D.",
          location: "Jacksonville, FL",
        },
        {
          quote: "La estrategia de IUL que Andres me explicó cambió mi perspectiva de retiro. Muy profesional.",
          author: "Carlos R.",
          location: "Tampa, FL",
        },
        {
          quote: "Encontrar un broker que hable español fluido y que realmente se preocupe es una bendición. ¡Muy recomendado!",
          author: "Elena P.",
          location: "Orlando, FL",
        },
      ],
    },
    trustBadges: {
        title: "Seguridad Avanzada y Fiabilidad",
        items: [
            {
                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.956 11.956 0 013.586 21a11.956 11.956 0 0110.434-18.286z",
                title: "Infraestructura Optimizada",
                description: "Protegido por CDN de nivel empresarial para alta disponibilidad y rendimiento global."
            },
            {
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                title: "Protección SSL 256-bit",
                description: "Su información se transmite con encriptación bancaria estándar de la industria."
            },
            {
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                title: "Profesional Licenciado",
                description: "Verificado NPN 21228432. Certificado para brindar asesoría honesta e imparcial."
            }
        ]
    },
    contactForm: {
      mainTitle: "Verifique su Elegibilidad 2026. Responda 3 preguntas para ver sus tarifas.",
      licenseInfo: "Broker Licenciado | NPN: 21228432",
      secureConnection: "Asegurado por Red de Entrega de Contenido (CDN)",
      steps: {
        1: {
          question: "¿Qué protección es más importante para usted?",
          options: {
            funeral: "Suplementos de Medicare",
            medicare: "Gastos Finales / Entierro",
            retirement: "IUL / Ahorro para Retiro",
            dental: "Dental, Visión y Audición"
          }
        },
        2: {
          question: "¿Cuál es su edad actual?",
          options: {
            range1: "50 a 64 años",
            range2: "65 a 75 años",
            range3: "76 años o más"
          }
        },
        3: {
          title: "¡Buenas noticias! Probablemente califica para ahorros especiales.",
          question: "¿A dónde enviamos su cotización personalizada?",
          inputs: {
            name: "Nombre Completo",
            phone: "Teléfono Celular",
            email: "Correo Electrónico"
          },
          legalText: 'Al hacer clic en "VER MI TARIFA", doy mi consentimiento para ser contactado por AHB Insurance Solutions vía teléfono, SMS o email.',
          submit: "VER MI TARIFA GRATIS ➔"
        }
      },
      errors: {
        nameRequired: "Por favor, ingrese su nombre.",
        nameLength: "El nombre es muy corto.",
        emailRequired: "Correo es obligatorio.",
        emailInvalid: "Formato de correo inválido.",
        phoneInvalid: "Número de teléfono inválido."
      },
      successMessage: "¡Éxito! Un asesor experto está preparando sus cotizaciones y se contactará pronto.",
      errorMessage: "Error de envío. Por favor intente de nuevo o llámenos directamente.",
      backButton: "Atrás",
      stepLabel: "Paso"
    },
    footer: {
        companyName: "AHB Insurance Solutions LLC",
        description: "Su socio independiente para una jubilación segura y digna.",
        licenseInfo: "Broker Licenciado | NPN: 21228432",
        linksTitle: "Enlaces Rápidos",
        links: {
            services: "Servicios",
            about: "Historia",
            whyUs: "Por Qué AHB",
            testimonials: "Reseñas",
            contact: "Cotizar Gratis",
            privacy: "Privacidad",
            terms: "Términos"
        },
        contactTitle: "Contacto",
        followUsTitle: "Síguenos",
        address: "5500 SW Archer Road, Apt H103\nGainesville, FL 32607, USA",
        phone: "+1-352-225-8389",
        email: "andreshbozo@ahbinsurancesolutions.com",
        whatsapp: "WhatsApp",
        facebook: "Facebook",
        instagram: "Instagram",
        secureConnection: "Encriptación SSL y CDN Avanzada",
        copyright: "© 2026 AHB Insurance Solutions LLC. All Rights Reserved."
    },
    whatsappButton: {
        ariaLabel: "Chat por WhatsApp"
    },
    tapToCallButton: {
        label: "Llamar Ahora: +1 (352) 225-8389",
        phone: "+1-352-225-8389"
    }
  },
};