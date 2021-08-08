import { ActionTree } from "vuex";
import { AppState, Recipe } from "./types";
import { recipesRef } from "@/services/firebase.service";
import { snapshotToArray } from "@/services/utils.service";

export const actions: ActionTree<AppState, AppState> = {
  fetchRecipes({ commit }) {
    recipesRef.on(
      "value",
      function (snapshot) {
        const data = snapshotToArray(snapshot);
        commit("updateRecipesList", data);
      },
      function (error) {
        console.error("Error: " + error);
      }
    );
  },
  updateRecipe(_ctx, payload: Partial<Recipe>) {
    if (!payload.id) return
    recipesRef.child(payload.id).update({...payload});
  },
  createRecipe(_ctx, payload: Partial<Recipe>) {
    recipesRef.push(payload);
  },
  fetchRecipeById({ commit }, recipeId: string) {
    recipesRef
      .child(recipeId)
      .once("value")
      .then((snapshot) => commit("updateActiveRecipe", snapshot.val()))
      .catch((error) => ({
        errorCode: error.code,
        errorMessage: error.message,
      }));
  },
  resetActiveRecipe({ commit }) {
    commit("updateActiveRecipe", undefined);
  },
};
