<template>
  <div>Recipe: {{ recipe?.name }}</div>
</template>

<script lang="ts">
import { AppState } from "@/store/types";
import { computed, defineComponent, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore<AppState>();

    const route = useRoute();
    const recipeId = route.params.id;

    const recipe = computed(() => store.state.activeRecipe);
    onMounted(() => {
      store.dispatch("fetchRecipeById", recipeId);
    });

    onUnmounted(() => {
      store.dispatch("resetActiveRecipe");
    });

    return {
      recipeId,
      recipe,
    };
  },
});
</script>

<style scoped></style>
