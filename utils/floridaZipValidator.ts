export interface ZipValidationResult {
  isValid: boolean;
  isComplete: boolean;
  status: 'empty' | 'typing' | 'valid_florida' | 'invalid_prefix' | 'out_of_state' | 'invalid_format';
  region?: string;
  cityName?: string;
  feedbackMessage: string;
  feedbackType: 'info' | 'success' | 'warning' | 'error';
}

// 3-digit prefix mapping to Florida counties / metro regions
const FLORIDA_PREFIX_REGIONS: Record<string, { en: string; es: string; city: string }> = {
  '320': { en: 'Jacksonville / Northeast FL (St. Johns, Clay, Nassau)', es: 'Jacksonville y Noreste de FL (St. Johns, Clay, Nassau)', city: 'Jacksonville Area' },
  '321': { en: 'Daytona Beach / Volusia & Flagler Area', es: 'Daytona Beach / Área de Volusia y Flagler', city: 'Daytona Beach' },
  '322': { en: 'Jacksonville / Duval County', es: 'Jacksonville / Condado de Duval', city: 'Jacksonville' },
  '323': { en: 'Tallahassee / Leon County & Big Bend', es: 'Tallahassee / Condado de Leon', city: 'Tallahassee' },
  '324': { en: 'Panama City / Bay County & Emerald Coast', es: 'Panama City / Costa Esmeralda', city: 'Panama City' },
  '325': { en: 'Pensacola / Escambia & Northwest FL', es: 'Pensacola y Noroeste de FL', city: 'Pensacola' },
  '326': { en: 'Gainesville / Alachua & North Central FL', es: 'Gainesville / Condado de Alachua y Centro Norte', city: 'Gainesville' },
  '327': { en: 'Orlando North / Seminole & Volusia', es: 'Norte de Orlando / Seminole y Volusia', city: 'Orlando Metro' },
  '328': { en: 'Orlando / Orange County & Central FL', es: 'Orlando / Condado de Orange y Centro de FL', city: 'Orlando' },
  '329': { en: 'Melbourne / Palm Bay & Space Coast', es: 'Melbourne / Palm Bay y Space Coast (Brevard)', city: 'Melbourne' },
  '330': { en: 'South Florida / Keys, Broward & Homestead', es: 'Sur de Florida / Cayos, Broward y Homestead', city: 'South Florida' },
  '331': { en: 'Miami / Miami-Dade County', es: 'Miami / Condado de Miami-Dade', city: 'Miami' },
  '332': { en: 'Miami / Miami-Dade Metro Area', es: 'Miami / Área Metropolitana', city: 'Miami' },
  '333': { en: 'Fort Lauderdale / Broward County', es: 'Fort Lauderdale / Condado de Broward', city: 'Fort Lauderdale' },
  '334': { en: 'West Palm Beach / Palm Beach & Boca Raton', es: 'West Palm Beach / Palm Beach y Boca Raton', city: 'West Palm Beach' },
  '335': { en: 'Tampa East / Hillsborough, Pasco & Brandon', es: 'Este de Tampa / Hillsborough y Brandon', city: 'Tampa East' },
  '336': { en: 'Tampa / Hillsborough County', es: 'Tampa / Condado de Hillsborough', city: 'Tampa' },
  '337': { en: 'St. Petersburg / Clearwater & Pinellas', es: 'St. Petersburg / Clearwater y Pinellas', city: 'St. Petersburg' },
  '338': { en: 'Lakeland / Winter Haven & Polk County', es: 'Lakeland / Winter Haven y Condado de Polk', city: 'Lakeland' },
  '339': { en: 'Fort Myers / Cape Coral & Lee County', es: 'Fort Myers / Cape Coral y Condado de Lee', city: 'Fort Myers' },
  '341': { en: 'Naples / Marco Island & Collier County', es: 'Naples / Marco Island y Condado de Collier', city: 'Naples' },
  '342': { en: 'Sarasota / Bradenton & Manatee County', es: 'Sarasota / Bradenton y Condado de Manatee', city: 'Sarasota' },
  '344': { en: 'Ocala / Marion County & Nature Coast', es: 'Ocala / Condado de Marion', city: 'Ocala' },
  '346': { en: 'New Port Richey / Spring Hill & Pasco', es: 'New Port Richey / Spring Hill y Pasco', city: 'New Port Richey' },
  '347': { en: 'Kissimmee / Clermont & Osceola/Lake', es: 'Kissimmee / Clermont y Osceola/Lake', city: 'Kissimmee' },
  '349': { en: 'Port St. Lucie / Stuart & Treasure Coast', es: 'Port St. Lucie / Stuart y Costa del Tesoro', city: 'Port St. Lucie' },
};

/**
 * Validates a US ZIP code in real-time to check if it belongs to Florida.
 * Florida ZIP codes range from 32003 to 34997.
 */
export function validateFloridaZip(rawZip: string, isSpanish = false): ZipValidationResult {
  const cleanZip = rawZip.replace(/\D/g, '').slice(0, 5);

  if (!cleanZip) {
    return {
      isValid: false,
      isComplete: false,
      status: 'empty',
      feedbackMessage: isSpanish
        ? 'Ingrese su código postal de Florida de 5 dígitos (ej. 32607, 33101)'
        : 'Enter your 5-digit Florida ZIP code (e.g. 32607, 33101)',
      feedbackType: 'info',
    };
  }

  // Check prefix validity during typing (FL zip codes begin with 32, 33, or 34)
  const firstChar = cleanZip.charAt(0);
  const firstTwo = cleanZip.slice(0, 2);

  if (firstChar !== '3' || (cleanZip.length >= 2 && !['32', '33', '34'].includes(firstTwo))) {
    return {
      isValid: false,
      isComplete: cleanZip.length === 5,
      status: 'invalid_prefix',
      feedbackMessage: isSpanish
        ? `⚠️ El código "${cleanZip}" no parece ser de Florida. Los códigos postales de Florida inician con 32, 33 o 34.`
        : `⚠️ ZIP code "${cleanZip}" is outside Florida. Florida ZIP codes begin with 32, 33, or 34.`,
      feedbackType: cleanZip.length === 5 ? 'error' : 'warning',
    };
  }

  // Incomplete (1 to 4 digits matching Florida prefix)
  if (cleanZip.length < 5) {
    return {
      isValid: false,
      isComplete: false,
      status: 'typing',
      feedbackMessage: isSpanish
        ? `Detectando código postal de Florida (${cleanZip}... faltan ${5 - cleanZip.length} dígitos)`
        : `Entering Florida ZIP code (${cleanZip}... ${5 - cleanZip.length} more digits needed)`,
      feedbackType: 'info',
    };
  }

  // Exactly 5 digits: Check against valid Florida numeric range (32003 - 34997)
  const zipNum = parseInt(cleanZip, 10);
  const prefix3 = cleanZip.slice(0, 3);
  const regionInfo = FLORIDA_PREFIX_REGIONS[prefix3];

  const isFloridaNumericRange = zipNum >= 32003 && zipNum <= 34997 && !!regionInfo;

  if (isFloridaNumericRange) {
    const regionName = isSpanish ? regionInfo.es : regionInfo.en;
    return {
      isValid: true,
      isComplete: true,
      status: 'valid_florida',
      region: regionName,
      cityName: regionInfo.city,
      feedbackMessage: isSpanish
        ? `✓ Ubicación confirmada en Florida: ${regionName} (ZIP: ${cleanZip})`
        : `✓ Verified Florida Location: ${regionName} (ZIP: ${cleanZip})`,
      feedbackType: 'success',
    };
  }

  // 5 digits but not in Florida range
  return {
    isValid: false,
    isComplete: true,
    status: 'out_of_state',
    feedbackMessage: isSpanish
      ? `⚠️ AHB Insurance cuenta con licencia exclusiva para residentes de Florida (NPN 21228432). El código ${cleanZip} no está en Florida.`
      : `⚠️ AHB Insurance is licensed exclusively in Florida (NPN 21228432). ZIP code ${cleanZip} is outside our Florida service area.`,
    feedbackType: 'error',
  };
}

/**
 * Validates a 4-digit birth year and calculates age-based coverage eligibility
 */
export function validateBirthYear(rawYear: string, isSpanish = false): {
  isValid: boolean;
  age?: number;
  eligibilityText?: string;
  feedbackMessage: string;
  feedbackType: 'info' | 'success' | 'warning' | 'error';
} {
  const cleanYear = rawYear.replace(/\D/g, '').slice(0, 4);
  const currentYear = new Date().getFullYear();

  if (!cleanYear) {
    return {
      isValid: false,
      feedbackMessage: isSpanish
        ? 'Ingrese su año de nacimiento de 4 dígitos (ej. 1958)'
        : 'Enter your 4-digit birth year (e.g. 1958)',
      feedbackType: 'info',
    };
  }

  if (cleanYear.length < 4) {
    return {
      isValid: false,
      feedbackMessage: isSpanish
        ? `Ingrese el año completo de 4 dígitos (${cleanYear})`
        : `Enter complete 4-digit year (${cleanYear})`,
      feedbackType: 'info',
    };
  }

  const yearNum = parseInt(cleanYear, 10);
  if (yearNum < 1910 || yearNum > currentYear - 16) {
    return {
      isValid: false,
      feedbackMessage: isSpanish
        ? `Por favor ingrese un año de nacimiento válido entre 1910 y ${currentYear - 18}.`
        : `Please enter a valid birth year between 1910 and ${currentYear - 18}.`,
      feedbackType: 'error',
    };
  }

  const age = currentYear - yearNum;
  let eligibility: string;

  if (age >= 64) {
    eligibility = isSpanish
      ? `✓ Edad ~${age}: Elegible para Medicare Suplementario (Medigap Plan G/N) y Medicare Advantage`
      : `✓ Age ~${age}: Eligible for Medicare Supplement (Plan G/N) & Advantage Plans`;
  } else if (age >= 50) {
    eligibility = isSpanish
      ? `✓ Edad ~${age}: Elegible para Gastos Finales / Entierro y Crecimiento de Retiro IUL`
      : `✓ Age ~${age}: Eligible for Final Expense Burial Coverage & Tax-Free IUL Growth`;
  } else {
    eligibility = isSpanish
      ? `✓ Edad ~${age}: Elegible para Seguro de Vida IUL libre de impuestos y protección familiar`
      : `✓ Age ~${age}: Eligible for Tax-Free IUL Life Insurance & Family Wealth Protection`;
  }

  return {
    isValid: true,
    age,
    eligibilityText: eligibility,
    feedbackMessage: eligibility,
    feedbackType: 'success',
  };
}
