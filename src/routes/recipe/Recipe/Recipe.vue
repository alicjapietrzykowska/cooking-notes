<template>
  <div>Recipe: {{ recipe?.name }}</div>
</template>

<script lang="ts">
import { AppState } from "@/store/types";
import { computed, defineComponent, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore<AppState>();

    const route = useRoute();
    const recipeId = route.params.id;

    const recipe = computed(() => store.state.activeRecipe);
    const user = computed(() => store.state.user);
    onMounted(() => {
      store.dispatch("fetchRecipeById", recipeId);
    });

    watch(user, () => {
      if (user.value) store.dispatch("fetchRecipeById", recipeId);
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
