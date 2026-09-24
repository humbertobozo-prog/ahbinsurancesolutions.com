export interface FaqItem {
  category: 'medicare' | 'final-expense' | 'life-insurance' | 'iul' | 'annuities' | 'general';
  q: string;
  a: string;
}

export const faqsEs: FaqItem[] = [
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
    a: 'Sí. Muchas condiciones controladas (como diabetes tipo 2 bien manejada o hipertensión) califican para opciones de emisión simplificada con beneficios completos de Día 1. Casos de salud más complejos pueden ser elegibles mediante planes de emisión garantizada.'
  },
  {
    category: 'final-expense',
    q: '¿Cuánto cuesta un seguro de Gastos Finales y cómo se determinan las primas?',
    a: 'Las primas de Gastos Finales varían según la edad, historial de salud, consumo de tabaco, monto de cobertura, suscripción médica y la compañía aseguradora específica.'
  },

  // Life Insurance (5)
  {
    category: 'life-insurance',
    q: '¿Cuál es la diferencia entre Seguro de Vida a Término y Seguro de Vida Entera?',
    a: 'El Seguro de Vida a Término brinda protección temporal (por ejemplo 10, 20 o 30 años) con primas bajas, ideal para cubrir una hipoteca o los años de crianza de los hijos. El Seguro de Vida Entera ofrece cobertura permanente para toda la vida con primas fijas garantizadas y acumula valor en efectivo garantizado.'
  },
  {
    category: 'life-insurance',
    q: '¿Qué son los Beneficios en Vida (Living Benefits) en un seguro de vida?',
    a: 'Son cláusulas adicionales (riders) que le permiten adelantar un porcentaje significativo de su beneficio por muerte en caso de ser diagnosticado con una enfermedad terminal, crítica o crónica (como cáncer, infarto o incapacidad para realizar actividades de la vida diaria), permitiéndole costear tratamientos en vida.'
  },
  {
    category: 'life-insurance',
    q: '¿Cómo funciona el seguro de vida sin examen médico en Florida?',
    a: 'Las pólizas de emisión acelerada y simplificada utilizan tecnología de suscripción electrónica que consulta historiales farmacéuticos y registros vehiculares en tiempo real. Permiten que solicitantes con perfiles de salud calificados obtengan cobertura en cuestión de horas o días sin agujas ni enfermeros.'
  },
  {
    category: 'life-insurance',
    q: '¿El beneficio por muerte del seguro de vida paga impuestos en Florida?',
    a: 'En la gran mayoría de los casos, los beneficios por fallecimiento pagados a beneficiarios designados son transferidos libres de impuesto sobre la renta federal y estatal (IRS Código 101(a)). Además, en Florida, los beneficios pasan directamente a los beneficiarios evitando el proceso de sucesión testamentaria (probate).'
  },
  {
    category: 'life-insurance',
    q: '¿Cuánta cobertura de seguro de vida necesita una familia promedio?',
    a: 'Una regla general utilizada en la industria es entre 7 y 10 veces los ingresos anuales del sostén de familia, sumado a las deudas existentes (hipoteca, autos, préstamos) y los fondos futuros para la educación de los hijos. Un análisis de necesidades financieras personalizado con un corredor independiente le ayuda a determinar la cifra exacta sin pagar de más.'
  },

  // IUL & Retirement (6)
  {
    category: 'iul',
    q: '¿Cómo funciona una póliza de Seguro de Vida Universal Indexada (IUL)?',
    a: 'Combina protección permanente por fallecimiento con valor en efectivo vinculado a un índice externo (como el S&P 500). Cuenta con un piso contractual del 0% frente a pérdidas bursátiles directas y permite acceder a préstamos de póliza con ventajas fiscales bajo la Sección 7702 del Código IRS, siempre que la póliza esté debidamente fondeada, no sea un MEC y se mantenga en vigor.'
  },
  {
    category: 'iul',
    q: '¿Puedo perder mi valor en efectivo si la bolsa de valores cae?',
    a: 'El componente de acreditación indexada cuenta con un piso contractual del 0%, por lo que a la estrategia de índice no se le acreditan rendimientos negativos durante caídas del mercado. No obstante, los costos internos de seguro (COI) y cargos administrativos continúan deduciéndose periódicamente.'
  },
  {
    category: 'iul',
    q: '¿Cómo funcionan los préstamos de póliza bajo la Sección 7702 del IRS?',
    a: 'Permiten acceder a fondos colateralizados de la póliza sin considerarse ingresos gravables bajo el Código IRS 7702 (para pólizas no-MEC). No son dinero regalado: devengan intereses fijados por la compañía y reducen el valor de rescate neto y el beneficio por fallecimiento si no se reembolsan.'
  },
  {
    category: 'iul',
    q: '¿Qué es un Contrato de Dotación Modificada (MEC) y cómo se evita?',
    a: 'Un MEC ocurre si los pagos de primas exceden los límites tributarios federales estipulados por la Sección 7702A del IRS (la prueba de las 7 primas niveladas). Si se convierte en MEC, los retiros y préstamos pasan a tributar bajo la regla LIFO como ingreso ordinario más posibles multas por retiro prematuro.'
  },
  {
    category: 'iul',
    q: '¿Requiere una póliza IUL supervisión y fondeo continuo?',
    a: 'Sí. Un IUL no es un depósito bancario automático. Requiere una gestión disciplinada y un fondeo suficiente de primas para compensar el costo del seguro (COI), el cual se incrementa de manera natural a medida que el asegurado avanza en edad.'
  },
  {
    category: 'iul',
    q: '¿Cuáles son las opciones de índices disponibles en una póliza IUL?',
    a: 'La mayoría de las aseguradoras ofrecen opciones vinculadas al índice S&P 500, índices ponderados por volatilidad (volatility-controlled indices) y cuentas de interés fijo garantizado, permitiendo diversificar la estrategia de acreditación dentro de la misma póliza.'
  },

  // Annuities (6)
  {
    category: 'annuities',
    q: '¿Qué es una Anualidad Fija Indexada (FIA)?',
    a: 'Es un contrato con una aseguradora que ofrece crecimiento de intereses con impuestos diferidos vinculado a un índice externo de mercado (como el S&P 500), con un piso contractual del 0% que protege el saldo contra caídas del índice (sujeto a las condiciones del contrato, gastos y cargos por rescate si aplican).'
  },
  {
    category: 'annuities',
    q: '¿Cómo protege el capital el piso contractual del 0% en una anualidad?',
    a: 'Debido a la estructura de opciones del asegurador, si el índice tiene un rendimiento anual negativo, su rendimiento acreditado es del 0% en lugar de negativo. Todo el capital y las ganancias previamente acreditadas quedan protegidas contra pérdidas de mercado directas.'
  },
  {
    category: 'annuities',
    q: '¿Qué es un intercambio libre de impuestos según la Sección 1035 del IRS?',
    a: 'Es una disposición del Código Tributario que permite transferir directamente fondos de una anualidad existente (o de una póliza de seguro de vida) a una nueva anualidad sin generar un hecho imponible ni pagar impuestos en ese momento.'
  },
  {
    category: 'annuities',
    q: '¿Qué sucede al vencer el plazo de una anualidad MYGA?',
    a: 'Al vencer el plazo contratado, se abre una ventana de gracia para retirar los fondos sin penalización, transferirlos mediante un intercambio 1035 a una nueva anualidad con mejores tasas, o renovar el contrato bajo las tasas vigentes de la aseguradora.'
  },
  {
    category: 'annuities',
    q: '¿Existen penalizaciones o cargos por rescate (surrender charges) en las anualidades?',
    a: 'Sí. Las anualidades son instrumentos diseñados para mediano y largo plazo. Los retiros que excedan el límite anual libre de penalizaciones (generalmente 10% anual) durante el período de rescate están sujetos a cargos contractuales y a una multa del 10% del IRS si se retiran antes de los 59½ años.'
  },
  {
    category: 'annuities',
    q: '¿Cómo se gravan los retiros de una anualidad no calificada?',
    a: 'Tributan bajo la regla LIFO (Last-In, First-Out): las ganancias acumuladas se retiran y tributan primero como ingreso ordinario, antes de que se devuelva el capital principal no gravable.'
  },

  // General / Broker (3)
  {
    category: 'general',
    q: '¿Tiene algún costo consultar con AHB Insurance Solutions?',
    a: 'No, ninguno. Nuestros servicios de asesoría, análisis de necesidades y comparativa entre múltiples aseguradoras líderes nacionales son 100% gratuitos y sin compromiso para usted. Las aseguradoras nos compensan directamente bajo tarifas reguladas.'
  },
  {
    category: 'general',
    q: '¿Por qué conviene trabajar con un corredor independiente en Florida?',
    a: 'Como corredores independientes (NPN: 21228432), no estamos atados a una sola compañía. Comparamos objetivamente pólizas de múltiples aseguradoras líderes nacionales para hallar la que mejor proteja su salud, familia y presupuesto.'
  },
  {
    category: 'general',
    q: '¿Cómo puedo solicitar una cotización o hablar con el corredor Andrés Bozo?',
    a: 'Puede hacer clic en cualquier botón de cotización de nuestra web, completar el formulario de contacto o llamar directamente al broker licenciado Andrés H. Bozo al +1 (352) 225-8389.'
  }
];

export const faqsEn: FaqItem[] = [
  // Medicare (6)
  {
    category: 'medicare',
    q: 'What is a Medicare Supplement (Medigap) insurance plan?',
    a: 'Medigap policies help pay certain out-of-pocket costs covered by Medicare (such as copayments, coinsurance, and deductibles). They act as secondary insurance to Original Medicare (Parts A & B). Medigap generally allows you to see any provider nationwide that accepts Medicare assignment, subject to Medicare and Medigap rules.'
  },
  {
    category: 'medicare',
    q: 'What is the difference between Medigap Plan G and Plan N in Florida?',
    a: 'Plan G covers 100% of Medicare-approved out-of-pocket medical costs once you satisfy the annual Part B deductible, including Part B excess charges. Plan N features lower monthly premiums, but requires small copayments of up to $20 for doctor visits and up to $50 for emergency room visits that do not lead to inpatient admission, and does not cover Part B excess charges.'
  },
  {
    category: 'medicare',
    q: 'When is the best time to enroll in a Florida Medigap plan?',
    a: 'Your 6-month Medigap Open Enrollment Period (MOEP) begins on the first day of the month you are 65 or older and enrolled in Medicare Part B. During this period, you have Guaranteed Issue Rights, meaning carriers cannot deny coverage or charge higher premiums based on pre-existing health conditions.'
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
    q: 'How much does final expense insurance cost, and how are premiums determined?',
    a: 'Final Expense premiums vary based on age, health history, tobacco use, coverage amount, underwriting, and the specific insurance carrier.'
  },

  // Life Insurance (5)
  {
    category: 'life-insurance',
    q: 'What is the main difference between Term Life and Permanent Whole Life insurance?',
    a: 'Term Life Insurance provides pure death benefit protection for a specified period (such as 10, 20, or 30 years) with the lowest initial premium, ideal for debt payoff and child-rearing years. Permanent Whole Life provides lifelong coverage with guaranteed level premiums and builds guaranteed cash value over time.'
  },
  {
    category: 'life-insurance',
    q: 'What are Living Benefits riders on a life insurance policy?',
    a: 'Living Benefits riders allow policyholders to accelerate a portion of the tax-free death benefit while living if diagnosed with a qualifying critical, chronic, or terminal illness (such as invasive cancer, stroke, heart attack, or cognitive impairment) to cover healthcare and living expenses.'
  },
  {
    category: 'life-insurance',
    q: 'How does no-medical-exam life insurance work in Florida?',
    a: 'Modern accelerated underwriting uses electronic databases (including prescription records and motor vehicle checks) to evaluate qualified applicants instantly. Eligible applicants can secure coverage up to $1,000,000 or more within days without undergoing needle blood draws or paramedical exams.'
  },
  {
    category: 'life-insurance',
    q: 'Are life insurance death benefits taxable to beneficiaries in Florida?',
    a: 'In the vast majority of cases, death benefit proceeds paid to designated beneficiaries are free of federal and Florida state income taxes under Internal Revenue Code Section 101(a). Beneficiary designations also bypass public probate court proceedings.'
  },
  {
    category: 'life-insurance',
    q: 'How much life insurance coverage does a typical family need?',
    a: 'A sound benchmark is 7 to 10 times the annual income of breadwinners, added to mortgage liabilities, outstanding consumer loans, and expected education funds. An independent broker performs a personalized capital needs analysis to establish your optimal coverage.'
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
    q: 'What are the index options typically available in an IUL policy?',
    a: 'Most top carriers offer options linked to the S&P 500, volatility-controlled multi-asset indexes, and guaranteed fixed accounts, allowing policyholders to diversify interest-crediting allocations inside the same policy.'
  },

  // Annuities (6)
  {
    category: 'annuities',
    q: 'What is a Fixed Indexed Annuity (FIA)?',
    a: 'A Fixed Indexed Annuity is a contract issued by an insurance carrier offering tax-deferred growth linked to an external market index (such as the S&P 500), while protecting principal from direct market losses through a contractual 0% floor (contract fees, expenses, and surrender charges may apply).'
  },
  {
    category: 'annuities',
    q: 'How does principal protection work with a 0% floor in annuities?',
    a: 'Due to the options structure and issuer guarantees, if the linked index experiences a negative return year, your credited interest rate is 0% instead of negative. Your previously credited principal and locked gains are not reduced by market downturns, though contractual charges may apply.'
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
    a: 'No. Our advisory service, needs analysis, and custom quote process are 100% free and zero-obligation to you. Insurance carriers compensate us directly under state-regulated compensation schedules.'
  },
  {
    category: 'general',
    q: 'Why should I work with an independent insurance broker in Florida?',
    a: 'As independent brokers (NPN 21228432), we are not tied to any single insurance carrier. We compare policies impartially across multiple top-rated national carriers to match your precise coverage goals and budget.'
  },
  {
    category: 'general',
    q: 'How can I request a personalized quote or speak with an expert?',
    a: 'You can click any quote button on our website, complete our secure intake form, or speak directly with licensed broker Andres H. Bozo at +1 (352) 225-8389.'
  }
];
