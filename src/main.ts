import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .mount("#app");
