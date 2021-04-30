import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';
import i18n from '@/plugins/i18n/index.js';

// Import global custom components
import BaseSpinner from '@/components/ui/spinners/BaseSpinner.vue';
import BaseBadge from '@/components/ui/badges/BaseBadge.vue';

const app = createApp(App);
app.use(store);
app.use(router);
installElementPlus(app);
app.use(i18n);

// Add global components here
app.component('base-spinner', BaseSpinner);
app.component('base-badge', BaseBadge);
app.mount('#app');

console.log(store);
