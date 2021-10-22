<template>
  <div>
    <Button class="p-mb-4" @click="$router.push({ name: 'list' })">
      {{ $t("common.backToMainPage") }}
    </Button>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";

export default defineComponent({
  components: {
    Button,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
