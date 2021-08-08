<template>
  <Toast ref="toaster" />
  <router-view />
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";
import Toast from "primevue/toast";
import { init } from "@/services/toast.service";

export default defineComponent({
  components: {
    Toast,
  },
  setup() {
    const toaster = ref<ComponentPublicInstance>();
    init(toaster);

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
