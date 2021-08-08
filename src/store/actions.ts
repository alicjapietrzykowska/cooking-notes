import { ActionTree } from "vuex";
import { AppState, Recipe } from "./types";
import { recipesRef } from "@/services/firebase.service";
import { snapshotToArray } from "@/services/utils.service";
import { showToast } from '@/services/toast.service';

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
  createRecipe(_ctx, payload: Partial<Recipe>) {
    recipesRef.push(payload);
    showToast({
      summary: "Successfully created recipe",
      detail: "Your recipe had been saved",
    });
  },
  updateRecipe(_ctx, payload: Partial<Recipe>) {
    if (!payload.id) return
    recipesRef.child(payload.id).update({...payload});
    showToast({
      summary: "Successfully saved recipe",
      detail: "Your changes had been saved",
    });
  },
  removeRecipe(_ctx, recipeId: string) {
    recipesRef.child(recipeId).remove();
    showToast({
      summary: "Successfully removed recipe",
      detail: "Your recipe had been removed",
    });
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
