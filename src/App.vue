<template>
  <Toast ref="toaster" />
  <Layout />
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";
import Toast from "primevue/toast";
import { init } from "@/services/toast.service";
import { Layout } from "./components";
import { useStore } from "vuex";
import { AppState } from "@/store/types";
import { getCurrentUser } from "@/store/getters";

export default defineComponent({
  components: {
    Toast,
    Layout,
  },
  setup() {
    const store = useStore<AppState>();
    const toaster = ref<ComponentPublicInstance>();
    init(toaster);

    store.dispatch("updateUser", getCurrentUser());

    return {
      toaster,
    };
  },
});
</script>
<style lang="scss">
@import "~primevue/resources/themes/saga-blue/theme.css"; //theme
@import "~primevue/resources/primevue.min.css"; //core css
@import "~primeflex/primeflex.css"; //flex css
@import "~primeicons/primeicons.css"; //icons
@import "./assets/styles/app.scss";
</style>
