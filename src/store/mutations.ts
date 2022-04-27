import { MutationTree } from "vuex";
import { AppState, Recipe, NameId, Filter, SortOption } from "./types";
import Firebase from "firebase/app";
import { getDefaultState } from "./state";
import {
  filterRecipeList,
  manageActiveFilters,
} from "@/services/filter.service";
import store from ".";

export const mutations: MutationTree<AppState> = {
  updateRecipesList(state, payload: Recipe[]) {
    state.recipeList = payload;
    state.filteredRecipeList = payload;
  },

  updateActiveRecipe(state, payload: Recipe) {
    state.activeRecipe = payload;
  },

  updateRecipe(state, payload: Partial<Recipe>) {
    state.recipeList = state.recipeList.map((recipe) =>
      recipe.id === payload.id ? { ...recipe, ...payload } : recipe
    );
    state.filteredRecipeList = [...state.recipeList];
  },

  removeRecipe(state, payload: string) {
    state.recipeList = state.recipeList.filter(
      (recipe) => recipe.id !== payload
    );
    state.filteredRecipeList = [...state.recipeList];
  },

  updateIngredientsList(state, payload: NameId[]) {
    state.ingredientsList = payload;
  },

  removeIngredient(state, payload: string) {
    state.ingredientsList = state.ingredientsList.filter(
      (recipe) => recipe.id !== payload
    );
  },

  updateUser(state, payload: Firebase.User | undefined | null) {
    if (!payload) {
      state.user = undefined;
    } else {
      state.user = {
        uid: payload.uid,
        email: payload.email,
      };
    }
  },
  filterList(state, payload: Filter) {
    if (!state.recipeList?.length) return;
    state.activeFilters = manageActiveFilters(payload, state.activeFilters);
    state.filteredRecipeList =
      filterRecipeList(state.activeFilters, state.recipeList) ||
      state.recipeList;
  },
  sortRecipeList(state, payload: SortOption) {
    if (!state.recipeList?.length) return;
    const field = payload.id;
    const sortedRecipeList = state.filteredRecipeList.sort((a, b) =>
      String(a[field]).localeCompare(String(b[field]))
    );
    state.filteredRecipeList =
      payload.order === "ASC" ? sortedRecipeList : sortedRecipeList.reverse();
  },
  updateIsLoading(state, payload: boolean) {
    state.isLoading = payload;
  },
  resetState() {
    store.replaceState({ ...getDefaultState() });
  },
};
