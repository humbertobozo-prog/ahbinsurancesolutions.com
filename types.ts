export type Language = 'en' | 'es';

export interface TranslationContent {
  meta: {
    title: string;
    description: string;
  };
  common: {
    npnTooltip: string;
  };
  header: {
    nav: {
      solutions: string;
      expertise: string;
      benefits: string;
      results: string;
      getQuote: string;
      services?: string;
      about?: string;
      whyUs?: string;
      testimonials?: string;
      contact?: string;
    };
    language: string;
  };
  hero: {
    heading: string;
    subheading: string;
    cta: string;
    trustText: string;
  };
  keyTakeaways: {
    title: string;
    items: {
      label: string;
      value: string;
    }[];
  };
  services: {
    title: string;
    items: {
      icon: string;
      title: string;
      description: string;
      highlight?: string;
    }[];
  };
  whyChooseUs: {
    title: string;
    items: {
      icon: string;
      title:string;
      description: string;
    }[];
  };
  aboutUs: {
    badge: string;
    identityBadge: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    imageAlt: string;
    statsYears: string;
    statsCompanies: string;
    statsService: string;
  };
  authoritativeLinks: {
    title: string;
    description: string;
    items: {
      label: string;
      url: string;
      source: string;
    }[];
  };
  testimonials: {
    title: string;
    label: string;
    items: {
      quote: string;
      author: string;
      location: string;
    }[];
  };
  trustBadges: {
    title: string;
    items: {
        icon: string;
        title: string;
        description: string;
    }[];
  };
  contactForm: {
    mainTitle: string;
    licenseInfo: string;
    secureConnection: string;
    steps: {
      1: {
        question: string;
        options: {
          funeral: string;
          medicare: string;
          retirement: string;
          dental: string;
        };
      };
      2: {
        question: string;
        options: {
          funeral?: string;
          medicare?: string;
          retirement?: string;
          dental?: string;
          range1: string;
          range2: string;
          range3: string;
        };
      };
      3: {
        title: string;
        question: string;
        inputs: {
          name: string;
          phone: string;
          email: string;
        };
        legalText: string;
        submit: string;
      };
    };
    errors: {
      nameRequired: string;
      nameLength: string;
      emailRequired: string;
      emailInvalid: string;
      phoneInvalid: string;
    };
    successMessage: string;
    errorMessage: string;
    backButton: string;
    stepLabel: string;
  };
  footer: {
    companyName: string;
    description: string;
    licenseInfo: string;
    linksTitle: string;
    links: {
      services: string;
      about: string;
      whyUs: string;
      testimonials: string;
      contact: string;
      privacy: string;
      terms: string;
    };
    contactTitle: string;
    followUsTitle: string;
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    facebook: string;
    instagram: string;
    secureConnection: string;
    copyright: string;
    cmsDisclaimer?: string;
  };
  whatsappButton: {
    ariaLabel: string;
  };
  tapToCallButton: {
    label: string;
    phone: string;
  };
}