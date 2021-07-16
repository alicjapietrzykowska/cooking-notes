import { db } from "@/services/firebase.service";
import { AppState } from "@/store/types";
import { ActionTree } from "vuex";
import { RecipeState, Recipe } from "./types";

const recipesDb = db.ref("/recipes");

export const actions: ActionTree<RecipeState, AppState> = {
  createRecipe(_ctx, payload: Partial<Recipe>) {
    recipesDb.push(payload)
  },
  fetchRecipeDetails(_ctx) {
    return null;
  },
};
