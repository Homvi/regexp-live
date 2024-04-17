// supported languages array
export const supportedLanguages = ['en', 'es'] as const;

// Type guard to check if the language is supported
export  type LanguageCode = (typeof supportedLanguages)[number];

interface HomePageContent {
  title: string;
  getStartedButton: string;
  login: string;
}

interface NavBarContent {
  request: string;
  language: string;
  accessibility: string;
  font: string;
  register: string;
  login: string;
  logout: string;
}

interface LanguageContent {
  homePage: HomePageContent;
  navBar: NavBarContent;
}

type MultiLanguageContent = {
  // The key is the language code
  [K in LanguageCode]: LanguageContent;
};

export const content: MultiLanguageContent = {
  en: {
    homePage: {
      title: 'The free, fun, and effective way to learn expressions!',
      getStartedButton: 'Get Started',
      login: 'I already have an account',
    },
    navBar: {
      request: 'Request expression',
      language: 'Change language',
      accessibility: 'Accessibility',
      font: 'Large font size',
      register: 'Register',
      login: 'Log in',
      logout: 'Log out',
    },
  },
  es: {
    homePage: {
      title: 'La forma gratuita, divertida y eficaz de aprender expresiones!',
      getStartedButton: 'Jugar',
      login: 'Ya tengo una cuenta',
    },
    navBar: {
      request: 'Solicitar expresión',
      language: 'Cambiar idioma',
      accessibility: 'Accessibilidad',
      font: 'Tamaño de fuente grande',
      register: 'Registrarse',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
    },
  },
};
