<template>
  <div class="p-text-center">
    <h2>{{ $t("common.pageNotFound") }}</h2>
    <router-link :to="{ name: 'list' }">
      <Button :label="$t('common.backToMainPage')"></Button>
    </router-link>
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
