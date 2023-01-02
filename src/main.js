import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import routes from './constants/routes'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes,
});

loadFonts();

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app');
