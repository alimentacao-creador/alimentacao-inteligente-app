import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Header
  'app.title': {
    pt: 'Alimentação Inteligente',
    en: 'Smart Nutrition',
    es: 'Nutrición Inteligente',
    fr: 'Nutrition Intelligente'
  },
  'header.login': {
    pt: 'Entrar',
    en: 'Login',
    es: 'Iniciar Sesión',
    fr: 'Connexion'
  },
  
  // Hero Section
  'hero.title': {
    pt: 'Seu companheiro inteligente para nutrição, fitness e saúde diária',
    en: 'Your smart companion for nutrition, fitness and daily health',
    es: 'Tu compañero inteligente para nutrición, fitness y salud diaria',
    fr: 'Votre compagnon intelligent pour la nutrition, le fitness et la santé quotidienne'
  },
  'hero.subtitle': {
    pt: 'Receitas com IA, reconhecimento de calorias, acompanhamento fitness e muito mais — tudo numa só app.',
    en: 'AI recipes, calorie recognition, fitness tracking and more — all in one app.',
    es: 'Recetas con IA, reconocimiento de calorías, seguimiento de fitness y más — todo en una app.',
    fr: 'Recettes IA, reconnaissance de calories, suivi fitness et plus — tout dans une seule app.'
  },
  'hero.cta.primary': {
    pt: 'Comece Grátis Agora',
    en: 'Start Free Now',
    es: 'Empezar Gratis Ahora',
    fr: 'Commencer Gratuitement'
  },
  'hero.cta.secondary': {
    pt: 'Ver Planos Premium',
    en: 'View Premium Plans',
    es: 'Ver Planes Premium',
    fr: 'Voir Plans Premium'
  },
  
  // Features
  'features.title': {
    pt: 'Funcionalidades Principais',
    en: 'Main Features',
    es: 'Características Principales',
    fr: 'Fonctionnalités Principales'
  },
  'features.subtitle': {
    pt: 'Combinamos inteligência artificial com nutrição científica para criar a experiência alimentar perfeita para si.',
    en: 'We combine artificial intelligence with scientific nutrition to create the perfect nutritional experience for you.',
    es: 'Combinamos inteligencia artificial con nutrición científica para crear la experiencia nutricional perfecta para ti.',
    fr: 'Nous combinons intelligence artificielle et nutrition scientifique pour créer l\'expérience nutritionnelle parfaite pour vous.'
  },
  'features.nutrition.title': {
    pt: 'Análise Nutricional',
    en: 'Nutritional Analysis',
    es: 'Análisis Nutricional',
    fr: 'Analyse Nutritionnelle'
  },
  'features.nutrition.description': {
    pt: 'Reconhecimento automático de alimentos e análise detalhada de calorias e nutrientes',
    en: 'Automatic food recognition and detailed analysis of calories and nutrients',
    es: 'Reconocimiento automático de alimentos y análisis detallado de calorías y nutrientes',
    fr: 'Reconnaissance automatique des aliments et analyse détaillée des calories et nutriments'
  },
  'features.workouts.title': {
    pt: 'Treinos Personalizados',
    en: 'Personalized Workouts',
    es: 'Entrenamientos Personalizados',
    fr: 'Entraînements Personnalisés'
  },
  'features.workouts.description': {
    pt: 'Planos de exercício adaptados aos seus objetivos e nível de fitness',
    en: 'Exercise plans adapted to your goals and fitness level',
    es: 'Planes de ejercicio adaptados a tus objetivos y nivel de fitness',
    fr: 'Plans d\'exercice adaptés à vos objectifs et niveau de fitness'
  },
  'features.tracking.title': {
    pt: 'Acompanhamento',
    en: 'Tracking',
    es: 'Seguimiento',
    fr: 'Suivi'
  },
  'features.tracking.description': {
    pt: 'Monitorização em tempo real do seu progresso e objetivos de saúde',
    en: 'Real-time monitoring of your progress and health goals',
    es: 'Monitoreo en tiempo real de tu progreso y objetivos de salud',
    fr: 'Surveillance en temps réel de vos progrès et objectifs de santé'
  },
  
  // Auth
  'auth.login.title': {
    pt: 'Entrar na sua conta',
    en: 'Sign in to your account',
    es: 'Iniciar sesión en tu cuenta',
    fr: 'Connectez-vous à votre compte'
  },
  'auth.signup.title': {
    pt: 'Criar nova conta',
    en: 'Create new account',
    es: 'Crear nueva cuenta',
    fr: 'Créer un nouveau compte'
  },
  'auth.email': {
    pt: 'Email',
    en: 'Email',
    es: 'Email',
    fr: 'Email'
  },
  'auth.password': {
    pt: 'Palavra-passe',
    en: 'Password',
    es: 'Contraseña',
    fr: 'Mot de passe'
  },
  'auth.login.button': {
    pt: 'Entrar',
    en: 'Sign In',
    es: 'Iniciar Sesión',
    fr: 'Se Connecter'
  },
  'auth.signup.button': {
    pt: 'Criar Conta',
    en: 'Create Account',
    es: 'Crear Cuenta',
    fr: 'Créer un Compte'
  },
  'auth.google': {
    pt: 'Continuar com Google',
    en: 'Continue with Google',
    es: 'Continuar con Google',
    fr: 'Continuer avec Google'
  },
  'auth.switch.login': {
    pt: 'Já tem conta? Entrar',
    en: 'Already have an account? Sign in',
    es: '¿Ya tienes cuenta? Iniciar sesión',
    fr: 'Vous avez déjà un compte ? Se connecter'
  },
  'auth.switch.signup': {
    pt: 'Não tem conta? Criar conta',
    en: 'Don\'t have an account? Sign up',
    es: '¿No tienes cuenta? Registrarse',
    fr: 'Vous n\'avez pas de compte ? S\'inscrire'
  },
  
  // Footer
  'footer.copyright': {
    pt: '© 2024 Alimentação Inteligente. Todos os direitos reservados.',
    en: '© 2024 Smart Nutrition. All rights reserved.',
    es: '© 2024 Nutrición Inteligente. Todos los derechos reservados.',
    fr: '© 2024 Nutrition Intelligente. Tous droits réservés.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};