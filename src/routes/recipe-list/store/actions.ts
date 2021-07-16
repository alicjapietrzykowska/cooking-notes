import { AppState } from "@/store/types";
import { ActionTree } from "vuex";
import { RecipeListState, RecipeListElement} from "./types";
import { recipesRef } from '@/services/firebase.service';
import { snapshotToArray } from "@/services/utils.service";

export const actions: ActionTree<RecipeListState, AppState> = {
  fetchRecipes({commit}) {
    recipesRef.on("value", function(snapshot) {
      const data = snapshotToArray(snapshot)
      commit('updateRecipesList', data)
   }, function (error) {
      console.error("Error: " + error);
   });
  },
};
