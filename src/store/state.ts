import { AppState } from "./types";

export const state: AppState = {
  user: undefined,
  activeRecipe: undefined,
  recipeList: [],
  filteredRecipeList: [],
  ingredientsList: [],
  activeFilters: []
};
