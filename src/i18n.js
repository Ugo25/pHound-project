import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Inline mock resources for default languages 'es' and 'en'
const resources = {
  en: {
    common: { loading: "Loading...", error: "Error" },
    landing: { title: "Welcome to pHound" },
    auth: { login: "Login" },
    dashboard: { overview: "Overview" },
    scans: { history: "Scan History" },
    osint: { title: "OSINT Module" },
    reports: { generate: "Generate Report" },
    settings: { profile: "Profile Settings" },
    legal: { terms: "Terms of Service" }
  },
  es: {
    common: { loading: "Cargando...", error: "Error" },
    landing: { title: "Bienvenido a pHound" },
    auth: { login: "Iniciar Sesión" },
    dashboard: { overview: "Resumen" },
    scans: { history: "Historial de Escaneos" },
    osint: { title: "Módulo OSINT" },
    reports: { generate: "Generar Reporte" },
    settings: { profile: "Configuración de Perfil" },
    legal: { terms: "Términos de Servicio" }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Default language
    fallbackLng: 'en',
    ns: ['common', 'landing', 'auth', 'dashboard', 'scans', 'osint', 'reports', 'settings', 'legal'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
