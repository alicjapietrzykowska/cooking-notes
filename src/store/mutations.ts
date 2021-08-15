import { MutationTree } from "vuex";
import { AppState, Recipe } from "./types";
import Firebase from "firebase/app";

export const mutations: MutationTree<AppState> = {
  updateRecipesList(state, payload: Recipe[]) {
    state.recipeList = payload;
  },
  updateActiveRecipe(state, payload: Recipe) {
    state.activeRecipe = payload;
  },
  updateUser(state, payload: Firebase.User | undefined | null) {
    if (!payload) {
      state.user = undefined
    } else {
      state.user = {
        uid: payload.uid,
        email: payload.email
      }
    }
  },
  searchRecipeList(state, payload: string) {
    const filteredRecipes = state.recipeList.filter(recipe => recipe.name.toLowerCase().includes(payload))
    if (filteredRecipes.length) {
      state.recipeList = filteredRecipes
    }
  }
};
