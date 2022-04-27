import { AppState } from "./types";

export const getDefaultState = (): AppState => {
  return {
    user: undefined,
    activeRecipe: undefined,
    recipeList: [],
    filteredRecipeList: [],
    ingredientsList: [],
    activeFilters: [],
    isLoading: false,
  };
};

export const state: AppState = getDefaultState();
