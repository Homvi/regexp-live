// Interface for the structure of the homepage content
interface HomePageContent {
  title: string;
  getStartedButton: string;
  login: string;
}

interface navBar {
  request: string;
  language: string;
  accessibility: string;
  font: string;
  register: string;
  login: string;
  logout: string;
}

// Interface for the content of each language
interface LanguageContent {
  homePage: HomePageContent;
  navBar: navBar;
}

// Interface for the overall content structure
interface MultiLanguageContent {
  en: LanguageContent;
  es: LanguageContent;
}

// Defining the content with its structure
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
