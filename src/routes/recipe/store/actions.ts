import { recipesRef } from "@/services/firebase.service";
import { AppState } from "@/store/types";
import { ActionTree } from "vuex";
import { RecipeState, Recipe } from "./types";


export const actions: ActionTree<RecipeState, AppState> = {
  createRecipe(_ctx, payload: Partial<Recipe>) {
    recipesRef.push(payload)
  },
  fetchRecipeDetails(_ctx) {
    return null;
  },
};
