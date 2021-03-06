import { createI18n } from 'vue-i18n';

// Import different translations
import es from './langs/es.json'; // Spanish
import en from './langs/en.json'; // English
import ca from './langs/ca.json'; // Valencian

const messages = {
  es,
  en,
  ca
};

const i18n = createI18n({
  locale: window.navigator.language.split('-')[0],
  fallbackLocale: 'en',
  messages,
});

export default i18n;
