<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText
      type="text"
      v-model="searchQuery"
      :placeholder="t('common.search')"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    InputText,
  },
  setup() {
    const searchQuery = ref("");
    return { searchQuery, ...useI18n() };
  },
});
</script>

<style scoped></style>
