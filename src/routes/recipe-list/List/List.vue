<template>
  <div class="p-grid">
    <div class="p-col-3 p-px-3 p-d-flex p-dir-col p-align-center">
      <Button @click="addRecipe" class="btn btn-primary p-mb-5">
        {{ t("recipe.add") }}
      </Button>
      <SearchBar />
    </div>

    <div class="p-col">
      <div v-if="recipes?.length">
        <ListElement
          v-for="recipe of recipes"
          :key="recipe.id"
          :recipe="recipe"
          @remove-element="removeRecipe"
        />
      </div>
      <NotFound v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import SearchBar from "../SearchBar";
import NotFound from "../NotFound";
import ListElement from "../ListElement";
import Button from "primevue/button";
import router from "@/routes";
import { useStore } from "vuex";
import { AppState } from "@/store/types";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    SearchBar,
    NotFound,
    ListElement,
    Button,
  },
  setup() {
    const store = useStore<AppState>();
    const recipes = computed(() => store.state.recipeList);
    const user = computed(() => store.state.user);

    const addRecipe = () => {
      router.push({ name: "add-recipe" });
    };

    const removeRecipe = (id: string) => {
      store.dispatch("removeRecipe", id);
    };

    onMounted(() => {
      store.dispatch("fetchRecipes");
    });

    watch(user, () => {
      store.dispatch("fetchRecipes");
    });

    return { recipes, addRecipe, removeRecipe, ...useI18n() };
  },
});
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  justify-content: center;
}
</style>
