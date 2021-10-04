<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText
      type="text"
      v-model.trim="searchQuery"
      @keyup="$emit('search', searchQuery)"
      :placeholder="$t('common.search')"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";

export default defineComponent({
  components: {
    InputText,
  },
  emits: ["search"],
  setup() {
    const searchQuery = ref("");
    return { searchQuery };
  },
});
</script>

<style scoped lang="scss">
.p-input-icon-left {
  width: 100%;
  input {
    width: 100%;
  }
}
</style>
