<template>
  <div class="p-grid">
    <div class="p-col-12 p-md-3 p-d-flex p-dir-col p-align-center p-mb-3">
      <Button
        @click="addRecipe"
        :disabled="!user"
        class="btn btn-primary p-mb-3 p-mb-md-5"
      >
        {{ t("recipe.add") }}
      </Button>
      <SearchBar @search="searchRecipe" />
      <Filters @is-filtered="isListFiltered = $event" />
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
      <NotFound
        v-else
        :isFiltered="isListFiltered"
        :searchPhrase="searchPhrase"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch, ref } from "vue";
import SearchBar from "../SearchBar";
import NotFound from "../NotFound";
import ListElement from "../ListElement";
import Button from "primevue/button";
import router from "@/routes";
import { useStore } from "vuex";
import { AppState, Filter } from "@/store/types";
import { useI18n } from "vue-i18n";
import Filters from "../Filters";

export default defineComponent({
  components: {
    SearchBar,
    NotFound,
    ListElement,
    Button,
    Filters,
  },
  setup() {
    const store = useStore<AppState>();
    const recipes = computed(() => store.state.filteredRecipeList);
    const user = computed(() => store.state.user);
    const searchPhrase = ref("");
    const isListFiltered = ref(false);

    const addRecipe = () => {
      router.push({ name: "add-recipe" });
    };

    const removeRecipe = (id: string) => {
      store.dispatch("removeRecipe", id);
    };

    const searchRecipe = (query: string) => {
      searchPhrase.value = query.toString().toLowerCase();
      const filter: Filter = {
        value: searchPhrase.value,
        filterType: "search",
      };
      store.dispatch("filterRecipeList", filter);
    };

    onMounted(() => {
      store.dispatch("fetchRecipes");
    });

    watch(user, () => {
      store.dispatch("fetchRecipes");
    });

    return {
      user,
      recipes,
      searchPhrase,
      isListFiltered,
      addRecipe,
      removeRecipe,
      searchRecipe,
      ...useI18n(),
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  justify-content: center;
}
</style>
