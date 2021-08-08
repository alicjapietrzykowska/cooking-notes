<template>
  <div class="p-grid">
    <div class="p-col-3">
      <Button @click="addRecipe" class="btn btn-primary">Add recipe</Button>
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
import { computed, defineComponent, onMounted } from "vue";
import SearchBar from "../SearchBar";
import NotFound from "../NotFound";
import ListElement from "../ListElement";
import Button from "primevue/button";
import router from "@/routes";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    SearchBar,
    NotFound,
    ListElement,
    Button,
  },
  setup() {
    const store = useStore();
    const recipes = computed(() => {
      return store.state.recipeList;
    });

    const addRecipe = () => {
      router.push({ name: "add-recipe" });
    };

    const removeRecipe = (id: string) => {
      store.dispatch("removeRecipe", id);
    };

    onMounted(() => {
      store.dispatch("fetchRecipes");
    });

    return { recipes, addRecipe, removeRecipe };
  },
});
</script>

<style lang="scss" scoped></style>
