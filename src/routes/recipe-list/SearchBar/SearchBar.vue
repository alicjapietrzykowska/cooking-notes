<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText type="text" v-model="searchQuery" placeholder="Search" />
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";

export default defineComponent({
  components: {
    InputText,
  },
  setup() {
    const searchQuery = ref("");
    return { searchQuery };
  },
});
</script>

<style scoped></style>
