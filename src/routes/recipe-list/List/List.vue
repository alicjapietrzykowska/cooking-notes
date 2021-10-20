<template>
  <div class="p-grid">
    <div class="p-col-12 p-md-3 p-d-flex p-dir-col p-align-center p-mb-3">
      <Button @click="addRecipe" :disabled="!user" class="p-mb-3 p-mb-md-5">
        {{ $t("recipe.add") }}
      </Button>

      <SearchBar @search="searchRecipe" />
      <Button
        class="p-mt-3 p-button-outlined p-d-md-none"
        @click="areFiltersVisible = !areFiltersVisible"
        >{{ $t(`filters.${areFiltersVisible ? "hide" : "show"}`) }}</Button
      >
      <Filters v-if="areFiltersVisible" />
    </div>

    <div class="p-col">
      <div class="p-d-flex p-jc-end p-mb-3">
        <SortingDropdown />
      </div>
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
import Filters from "../Filters";
import { BREAKPOINT_MD } from "@/static/breakpoints.config";
import SortingDropdown from "../SortingDropdown";

export default defineComponent({
  components: {
    SearchBar,
    NotFound,
    ListElement,
    Button,
    Filters,
    SortingDropdown,
  },
  setup() {
    const store = useStore<AppState>();
    const recipes = computed(() => store.state.filteredRecipeList);
    const user = computed(() => store.state.user);
    const searchPhrase = ref("");
    const isListFiltered = computed(() => !!store.state.activeFilters.length);
    const areFiltersVisible = ref(false);

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

    const checkWindowSize = () => {
      if (window.innerWidth < BREAKPOINT_MD) {
        areFiltersVisible.value = false;
      } else {
        areFiltersVisible.value = true;
      }
    };

    onMounted(() => {
      store.dispatch("fetchRecipes");
      checkWindowSize();
      window.addEventListener("resize", checkWindowSize);
    });

    watch(user, () => {
      store.dispatch("fetchRecipes");
    });

    return {
      user,
      recipes,
      searchPhrase,
      isListFiltered,
      areFiltersVisible,
      addRecipe,
      removeRecipe,
      searchRecipe,
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
