import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import PrimeVue from "primevue/config";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .mount("#app");
