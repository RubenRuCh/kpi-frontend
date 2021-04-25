import { createI18n } from 'vue-i18n';

// Import different translations
import es from './langs/es.json'; // Spanish
import en from './langs/en.json'; // English

const messages = {
  es,
  en,
};

const i18n = createI18n({
  locale: window.navigator.language.split('-')[0],
  fallbackLocale: 'es',
  messages,
});

export default i18n;
