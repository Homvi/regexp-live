// Interface for the structure of the homepage content
interface HomePageContent {
  title: string;
  getStartedButton: string;
  login: string;
}

// Interface for the content of each language
interface LanguageContent {
  homePage: HomePageContent;
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
  },
  es: {
    homePage: {
      title: 'La forma gratuita, divertida y eficaz de aprender expresiones!',
      getStartedButton: 'Jugar',
      login: 'Ya tengo una cuenta',
    },
  },
};
