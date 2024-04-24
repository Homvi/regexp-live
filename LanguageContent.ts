// supported languages array
export const supportedLanguages = ['en', 'es'] as const;

// Type guard to check if the language is supported
export type LanguageCode = (typeof supportedLanguages)[number];

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

interface Register {
  register: string;
  name1: string;
  name2: string;
  username: string;
  email: string;
  pass1: string;
  pass2: string;
  terms: string;
  errPrivacy: string;
  errPass: string;
  registerOk: string;
  registerFail: string;
}

interface Login {
  login: string;
  email: string;
  pass: string;
  loginOk: string;
  loginFail: string;
}

interface LanguageContent {
  homePage: HomePageContent;
  navBar: NavBarContent;
  login: Login;
  register: Register;
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
    login: {
      login: 'Log in',
      email: 'Email',
      pass: 'Password',
      loginOk: 'You have succesfully logged in!',
      loginFail: "Oops it didn't work!",
    },
    register: {
      register: 'Register',
      name1: 'First name',
      name2: 'Last name',
      username: 'Username',
      email: 'Email',
      pass1: 'Password',
      pass2: 'Password again',
      terms: 'I have read and accept the privacy policy',
      errPrivacy: 'Accept privacy!',
      errPass: "The passwords didn't match",
      registerOk: 'The registration was successfull',
      registerFail: "Oops it didn't work!",
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
    login: {
      login: 'Iniciar sesión',
      email: 'Correo electrónico',
      pass: 'Contraseña',
      loginOk: 'Has iniciado sesión correctamente',
      loginFail: '¡Oops, algo salió mal!',
    },
    register: {
      register: 'Registrarse',
      name1: 'Nombre',
      name2: 'Apellido',
      username: 'Nombre de usuario',
      email: 'Correo electrónico',
      pass1: 'Contraseña',
      pass2: 'Repetir contraseña',
      terms: 'He leído y acepto la política de privacidad',
      errPrivacy: '¡Acepta la política de privacidad!',
      errPass: 'Las contraseñas no coinciden',
      registerOk: 'El registro fue exitoso',
      registerFail: '¡Ups, algo salió mal!',
    },
  },
};
