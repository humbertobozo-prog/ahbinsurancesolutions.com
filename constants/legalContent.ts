import type { Language } from '../types';

export interface LegalDocument {
    title: string;
    lastUpdated: string;
    sections: {
        id: string;
        heading: string;
        content: string[];
        bulletPoints?: string[];
    }[];
}

export const legalContent: Record<Language, { terms: LegalDocument; privacy: LegalDocument }> = {
    es: {
        terms: {
            title: "Términos de Servicio y Avisos Legales",
            lastUpdated: "Última actualización: 1 de Enero de 2026",
            sections: [
                {
                    id: "broker-identification",
                    heading: "1. Identificación del Corredor y Licenciamiento",
                    content: [
                        "AHB Insurance Solutions opera como una agencia de seguros independiente autorizada y con licencia oficial en el Estado de Florida (EE. UU.), liderada por el agente registrado Andres Bozo (Número Nacional de Productor - NPN: 21228432).",
                        "Como corredores independientes, representamos a los clientes y consumidores ante más de 80 compañías aseguradoras líderes en el mercado de Medicare, Seguro de Gastos Finales de Entierro, Vida Universal Indexada (IUL) y Seguros de Vida Términos y Entero.",
                        "Nuestros servicios de consultoría, cotización y orientación para la selección de pólizas son 100% gratuitos para el consumidor. No cobramos tarifas de servicio directas por la solicitud de pólizas."
                    ]
                },
                {
                    id: "medicare-disclaimer",
                    heading: "2. Descargo de Responsabilidad Obligatorio de Medicare (CMS)",
                    content: [
                        "En cumplimiento estricto con las directrices de los Centros de Servicios de Medicare y Medicaid (CMS) de EE. UU.:",
                        "\"No ofrecemos todos los planes disponibles en su área. Cualquier información que proporcionemos se limita a los planes que ofrecemos en su área. Por favor contacte a Medicare.gov o al 1-800-MEDICARE (las 24 horas del día, los 7 días de la semana) para obtener información sobre todas sus opciones.\"",
                        "AHB Insurance Solutions no está respaldada, afiliada ni operada por el gobierno federal de los Estados Unidos ni por el programa gubernamental de Medicare."
                    ]
                },
                {
                    id: "tcpa-consent",
                    heading: "3. Consentimiento de Comunicaciones Telefónicas y Electrónicas (TCPA)",
                    content: [
                        "Al enviar su información de contacto (nombre, teléfono, correo electrónico) a través de nuestros formularios digitales, llamadas directas o chats en vivo, usted otorga su consentimiento expreso e informado por escrito para recibir comunicaciones de AHB Insurance Solutions y sus agentes licenciados.",
                        "Dichas comunicaciones pueden incluir llamadas telefónicas, mensajes de voz pregrabados, mensajes de texto (SMS/MMS) y correos electrónicos relacionados con cotizaciones, elegibilidad e información de seguros.",
                        "Usted reconoce y acepta que estas comunicaciones pueden realizarse utilizando sistemas de marcación telefónica automática (ATDS). La entrega de este consentimiento no es una condición obligatoria para comprar ningún bien o servicio. Puede optar por no recibir mensajes de texto en cualquier momento respondiendo con la palabra 'STOP' o 'ALTO' a cualquier SMS recibido, o notificándonos por correo a info@ahbinsurancesolutions.com."
                    ]
                },
                {
                    id: "quotes-underwriting",
                    heading: "4. Cotizaciones, Ilustraciones y Proceso de Suscripción",
                    content: [
                        "Todas las cotizaciones de prima, estimaciones e ilustraciones financieras generadas a través de este sitio web o proporcionadas por nuestros agentes son de carácter puramente informativo y no vinculante.",
                        "Las tarifas definitivas, la emisión de la póliza y las condiciones de cobertura están sujetas exclusivamente a la revisión de suscripción médica y aprobación final por parte de la compañía aseguradora emisora seleccionada.",
                        "AHB Insurance Solutions no garantiza la aceptación o aprobación de la póliza por parte de la compañía de seguros."
                    ]
                },
                {
                    id: "use-of-website",
                    heading: "5. Uso Permitido del Sitio Web y Propiedad Intelectual",
                    content: [
                        "Todo el contenido, diseños, textos, gráficos, logotipos, marcas comerciales y código fuente presentados en este sitio web son propiedad exclusiva de AHB Insurance Solutions o de sus licenciantes y están protegidos por las leyes de propiedad intelectual de los Estados Unidos.",
                        "Queda estrictamente prohibido copiar, reproducir, distribuir, modificar o utilizar cualquier material de este sitio con fines comerciales no autorizados sin el consentimiento previo por escrito de AHB Insurance Solutions."
                    ]
                },
                {
                    id: "limitation-liability",
                    heading: "6. Limitación de Responsabilidad",
                    content: [
                        "En la máxima medida permitida por la ley aplicable en el Estado de Florida, AHB Insurance Solutions y sus representantes no serán responsables por daños directos, indirectos, incidentales, consecuentes o punitivos derivados del uso de este sitio web o de la imposibilidad de acceder a los servicios.",
                        "No garantizamos que el sitio web opere de forma ininterrumpida o libre de errores técnicos, aunque mantenemos salvaguardas de seguridad y encriptación de nivel bancario."
                    ]
                },
                {
                    id: "governing-law",
                    heading: "7. Ley Aplicable y Jurisdicción",
                    content: [
                        "Estos Términos de Servicio se regirán e interpretarán de acuerdo con las leyes del Estado de Florida, EE. UU., sin dar efecto a sus principios de conflicto de leyes. Cualquier disputa legal que surja en relación con este sitio web o nuestros servicios estará sujeta a la jurisdicción exclusiva de los tribunales estatales o federales ubicados en el Condado de Alachua, Florida."
                    ]
                },
                {
                    id: "legal-contact",
                    heading: "8. Contacto Legal y Consultas",
                    content: [
                        "Si tiene preguntas sobre estos Términos de Servicio o desea presentar una solicitud legal, comuníquese con nosotros a través de los siguientes medios oficiales:",
                        "• Dirección Postal: 5500 SW Archer Road, Apt H103, Gainesville, FL 32607, EE. UU.",
                        "• Correo Electrónico: info@ahbinsurancesolutions.com",
                        "• Teléfono Directo: +1 (352) 225-8389"
                    ]
                }
            ]
        },
        privacy: {
            title: "Política de Privacidad y Protección de Datos",
            lastUpdated: "Última actualización: 1 de Enero de 2026",
            sections: [
                {
                    id: "info-collection",
                    heading: "1. Información Personal que Recopilamos",
                    content: [
                        "Para ofrecerle cotizaciones de seguros precisas y asesoría personalizada, podemos recopilar la siguiente información suministrada voluntariamente por usted:",
                        "• Datos de Contacto: Nombre completo, número de teléfono móvil o fijo, dirección de correo electrónico.",
                        "• Datos Demográficos y Geográficos: Rango de edad, estado de residencia y código postal.",
                        "• Preferencias de Cobertura: Tipo de seguro de interés (Medicare, Gastos Finales, IUL, Seguro de Vida).",
                        "• Datos Técnicos de Navegación: Dirección IP, tipo de navegador, sistema operativo y páginas visitadas a través de cookies de análisis anónimas."
                    ]
                },
                {
                    id: "info-use",
                    heading: "2. Uso de la Información",
                    content: [
                        "La información recopilada se utiliza exclusivamente para las siguientes finalidades legítimas de intermediación de seguros:",
                        "• Evaluar sus necesidades de seguro y comparar planes entre nuestras 80+ aseguradoras asociadas.",
                        "• Contactarlo a través de un agente licenciado de AHB Insurance Solutions para brindarle la asesoría solicitada.",
                        "• Asistirle en el proceso de llenado e ingreso de la solicitud de póliza formal.",
                        "• Cumplir con los requisitos legales y reglamentarios exigidos por el Departamento de Servicios Financieros de Florida y el CMS."
                    ]
                },
                {
                    id: "no-data-sale",
                    heading: "3. Compromiso de No Venta de Datos (Strict Non-Sale Policy)",
                    content: [
                        "NUNCA vendemos, alquilamos, comercializamos ni cedemos su información personal a corredores de datos de terceros, listas de correo masivo ni redes de telemercadeo externas.",
                        "Su información solo es compartida confidencialmente con la compañía aseguradora específica que usted seleccione al momento de enviar una solicitud formal de seguro para el proceso de suscripción."
                    ]
                },
                {
                    id: "data-security",
                    heading: "4. Seguridad y Encriptación de Datos",
                    content: [
                        "Implementamos medidas de seguridad físicas, técnicas y administrativas diseñadas para proteger sus datos personales contra acceso no autorizado, pérdida, alteración o divulgación.",
                        "Este sitio web utiliza cifrado SSL/TLS de 256 bits para garantizar que toda la transmisión de datos a través de nuestros formularios viaje de manera completamente segura."
                    ]
                },
                {
                    id: "cookies-tracking",
                    heading: "5. Uso de Cookies y Tecnologías de Seguimiento",
                    content: [
                        "Utilizamos cookies esenciales para el funcionamiento técnico del sitio y cookies analíticas para comprender la interacción de los usuarios y mejorar la velocidad y accesibilidad del portal.",
                        "Puede configurar su navegador web para rechazar cookies, aunque esto no afectará su capacidad para comunicarse directamente con nuestros agentes por teléfono."
                    ]
                },
                {
                    id: "user-rights",
                    heading: "6. Sus Derechos de Privacidad",
                    content: [
                        "Usted tiene derecho a solicitar acceso, corrección o eliminación de su información personal de nuestros registros activos en cualquier momento.",
                        "Para ejercer sus derechos de privacidad o darse de baja de nuestras comunicaciones, envíe un correo a info@ahbinsurancesolutions.com con el asunto 'Solicitud de Privacidad de Datos'."
                    ]
                }
            ]
        }
    },
    en: {
        terms: {
            title: "Terms of Service & Legal Notices",
            lastUpdated: "Last Updated: January 1, 2026",
            sections: [
                {
                    id: "broker-identification",
                    heading: "1. Broker Identification & Licensing",
                    content: [
                        "AHB Insurance Solutions operates as an independent licensed insurance brokerage in the State of Florida (USA), led by licensed agent Andres Bozo (National Producer Number - NPN: 21228432).",
                        "As independent brokers, we represent consumers before 80+ top-rated insurance carriers across Medicare Supplement (Medigap), Final Expense Burial Insurance, Indexed Universal Life (IUL), and Term/Whole Life Insurance.",
                        "Our consulting, quoting, and plan comparison services are 100% free of charge to consumers. We do not charge direct consumer service fees for policy applications."
                    ]
                },
                {
                    id: "medicare-disclaimer",
                    heading: "2. Mandatory Medicare Disclaimer (CMS Compliance)",
                    content: [
                        "In strict compliance with US Centers for Medicare & Medicaid Services (CMS) regulations:",
                        "\"We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE (24 hours a day/7 days a week) to get information on all of your options.\"",
                        "AHB Insurance Solutions is an independent agency and is not endorsed by, affiliated with, or operated by the United States government or the federal Medicare program."
                    ]
                },
                {
                    id: "tcpa-consent",
                    heading: "3. Telephone & Electronic Communication Consent (TCPA)",
                    content: [
                        "By submitting your contact information (name, phone number, email address) through our digital forms, direct phone calls, or live chat, you provide your express written consent for AHB Insurance Solutions and its licensed insurance agents to contact you.",
                        "Communications may include phone calls, pre-recorded voice messages, text messages (SMS/MMS), and emails regarding insurance quotes, eligibility, and policy options.",
                        "You acknowledge that these communications may be initiated using an automated telephone dialing system (ATDS). Consent is not a condition of purchasing any insurance product. You may opt out of text messages at any time by replying 'STOP' to any SMS, or by emailing info@ahbinsurancesolutions.com."
                    ]
                },
                {
                    id: "quotes-underwriting",
                    heading: "4. Quotes, Illustrations & Underwriting Approval",
                    content: [
                        "All premium quotes, rate estimates, and financial illustrations provided on this website or by our licensed brokers are for informational purposes only and non-binding.",
                        "Final premium rates, policy issuance, and coverage terms are subject solely to medical underwriting review and final approval by the issuing insurance carrier.",
                        "AHB Insurance Solutions does not guarantee policy approval or rate lock-in prior to carrier underwriting completion."
                    ]
                },
                {
                    id: "use-of-website",
                    heading: "5. Website Usage & Intellectual Property",
                    content: [
                        "All content, designs, trademarks, text, graphics, logos, and source code displayed on this website are the property of AHB Insurance Solutions or its licensors and are protected under US copyright and trademark laws.",
                        "Unauthorized copying, modification, or distribution of any website material without prior written permission from AHB Insurance Solutions is strictly prohibited."
                    ]
                },
                {
                    id: "limitation-liability",
                    heading: "6. Limitation of Liability",
                    content: [
                        "To the fullest extent permitted by Florida state law, AHB Insurance Solutions shall not be liable for direct, indirect, incidental, or consequential damages resulting from the use of or inability to access this website.",
                        "While we maintain strict SSL encryption and security protocols, we do not warrant that website functionality will be uninterrupted or error-free."
                    ]
                },
                {
                    id: "governing-law",
                    heading: "7. Governing Law & Jurisdiction",
                    content: [
                        "These Terms of Service are governed by and construed in accordance with the laws of the State of Florida, USA. Any legal dispute arising out of or related to these terms shall be subject to the exclusive jurisdiction of state or federal courts located in Alachua County, Florida."
                    ]
                },
                {
                    id: "legal-contact",
                    heading: "8. Legal Contact Information",
                    content: [
                        "For legal inquiries, compliance questions, or notices regarding these Terms, please contact us:",
                        "• Mailing Address: 5500 SW Archer Road, Apt H103, Gainesville, FL 32607, USA",
                        "• Email: info@ahbinsurancesolutions.com",
                        "• Phone: +1 (352) 225-8389"
                    ]
                }
            ]
        },
        privacy: {
            title: "Privacy Policy & Data Protection",
            lastUpdated: "Last Updated: January 1, 2026",
            sections: [
                {
                    id: "info-collection",
                    heading: "1. Personal Information We Collect",
                    content: [
                        "To provide tailored insurance quotes and professional advisory services, we collect information voluntarily submitted by you:",
                        "• Contact Information: Full name, phone number, email address.",
                        "• Geographic & Demographic Data: Age range, state of residence, zip code.",
                        "• Coverage Preferences: Product interest (Medicare Supplement, Final Expense, IUL, Life Insurance).",
                        "• Technical Data: Anonymized IP addresses, browser type, and navigation patterns via analytics cookies."
                    ]
                },
                {
                    id: "info-use",
                    heading: "2. How We Use Your Information",
                    content: [
                        "Your information is used strictly for legitimate insurance brokerage operations:",
                        "• Comparing plans across 80+ top insurance carriers to find your optimal rates.",
                        "• Connecting you with a licensed AHB Insurance Solutions broker for requested advice.",
                        "• Assisting in completing formal policy applications.",
                        "• Maintaining regulatory compliance with Florida DFS and CMS guidelines."
                    ]
                },
                {
                    id: "no-data-sale",
                    heading: "3. Strict Non-Sale of Personal Data",
                    content: [
                        "We NEVER sell, rent, trade, or transfer your personal information to third-party data brokers, lead generators, or telemarketing lists.",
                        "Your information is only shared with the specific insurance carrier you choose when submitting a formal policy application for underwriting purposes."
                    ]
                },
                {
                    id: "data-security",
                    heading: "4. Data Security & SSL Encryption",
                    content: [
                        "We maintain administrative, technical, and physical safeguards to prevent unauthorized access, loss, or disclosure of your personal data.",
                        "Our website enforces 256-bit SSL/TLS encryption across all form submissions and interactions."
                    ]
                },
                {
                    id: "cookies-tracking",
                    heading: "5. Cookies & Tracking Technologies",
                    content: [
                        "We use essential cookies for technical site functionality and anonymized performance cookies to optimize site speed.",
                        "You may adjust your browser settings to block cookies; doing so will not restrict your ability to call our brokers directly."
                    ]
                },
                {
                    id: "user-rights",
                    heading: "6. Your Privacy Rights & Opt-Out",
                    content: [
                        "You have the right to request access to, correction of, or deletion of your personal information from our active databases.",
                        "To exercise your privacy rights or opt out of future communications, email info@ahbinsurancesolutions.com with the subject line 'Privacy Rights Request'."
                    ]
                }
            ]
        }
    }
};
