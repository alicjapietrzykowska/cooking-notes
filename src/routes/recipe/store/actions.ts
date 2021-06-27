import { AppState } from "@/store/types";
import { ActionTree } from "vuex";
import { RecipeState } from "./types";

export const actions: ActionTree<RecipeState, AppState> = {
  async fetchRecipeDetails(_ctx) {
    return null;
  },
};
