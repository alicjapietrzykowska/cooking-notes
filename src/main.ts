import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';
import { i18n } from './i18n';

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(i18n)
  .use(ToastService)
  .mount("#app");
