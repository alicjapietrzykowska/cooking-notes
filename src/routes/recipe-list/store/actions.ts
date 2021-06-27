import { AppState } from "@/store/types";
import { ActionTree } from "vuex";
import { RecipeListState } from "./types";

export const actions: ActionTree<RecipeListState, AppState> = {
  async fetchRecipes(_ctx) {
    return null;
  },
};
