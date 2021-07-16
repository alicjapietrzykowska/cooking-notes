<template>
  <div>
    {{ recipe?.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RecipeListElement } from "../store/types";

export default defineComponent({
  props: {
    recipe: {
      required: true,
      type: Object as PropType<RecipeListElement>,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
