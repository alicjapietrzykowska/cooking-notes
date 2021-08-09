import { ActionTree } from "vuex";
import { AppState, Recipe, Credentials } from "./types";
import { auth, recipesRef } from "@/services/firebase.service";
import { snapshotToArray } from "@/services/utils.service";
import { showToast } from '@/services/toast.service';
import Firebase from "firebase/app";

export const actions: ActionTree<AppState, AppState> = {
  createUser({commit}, payload: Credentials) {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then((data) => {
      commit('updateUser', data.user)
      showToast({
        summary: "Successfully registered",
        detail: "Your account has been created",
      });
    })
    .catch(error => console.error(error))
  },
  loginUser({commit}, payload: Credentials) {
    auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then((data) => {
      commit('updateUser', data.user)
      showToast({
        summary: "Successfully logged in",
        detail: "Your has been logged in",
      });
    })
    .catch(error => console.error(error))
  },
  updateUser({commit}, payload: Firebase.User | undefined | null) {
    commit('updateUser', payload)
  },
  logOutUser({commit}) {
    auth.signOut()
    commit('updateUser', undefined)
  },
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
      detail: "Your recipe has been saved",
    });
  },
  updateRecipe(_ctx, payload: Partial<Recipe>) {
    if (!payload.id) return
    recipesRef.child(payload.id).update({...payload});
    showToast({
      summary: "Successfully saved recipe",
      detail: "Your changes has been saved",
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
