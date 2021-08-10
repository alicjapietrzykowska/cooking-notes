import { ActionTree } from "vuex";
import { AppState, Recipe, Credentials } from "./types";
import { auth, recipesRef } from "@/services/firebase.service";
import { snapshotToArray } from "@/services/utils.service";
import { showToast } from '@/services/toast.service';
import Firebase from "firebase/app";
import { getCurrentUser, getCurrentUserId } from '@/store/getters';

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
  loginUser({dispatch, commit}, payload: Credentials) {
    auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then((data) => {
      commit('updateUser', data.user)
      dispatch('fetchRecipes')
      showToast({
        summary: "Successfully logged in",
        detail: "Your has been logged in",
      });
    })
    .catch(error => console.error(error))
  },
  checkUser({commit}) {
    auth.onAuthStateChanged(function(user) {
      commit('updateUser', user)
    });
  },
  logOutUser({commit}) {
    auth.signOut()
    commit('updateUser', undefined)
  },
  fetchRecipes({state, commit }) {
    const userId = getCurrentUser()?.uid
    if (userId) {
      recipesRef.child(userId).on(
        "value",
        function (snapshot) {
          const data = snapshotToArray(snapshot);
          commit("updateRecipesList", data);
        },
        function (error) {
          console.error("Error: " + error);
        }
      );
    }
  },
  createRecipe(_ctx, payload: Partial<Recipe>) {
    const userId = getCurrentUserId()
    if (userId) {
      recipesRef.child(userId).push(payload);
      showToast({
        summary: "Successfully created recipe",
        detail: "Your recipe has been saved",
      });
    } 
  },
  updateRecipe(_ctx, payload: Partial<Recipe>) {
    const userId = getCurrentUserId()
    if (!payload.id || !userId) return
    recipesRef.child(userId).child(payload.id).update({...payload});
    showToast({
      summary: "Successfully saved recipe",
      detail: "Your changes has been saved",
    });
  },
  removeRecipe(_ctx, recipeId: string) {
    const userId = getCurrentUserId()
    if (!recipeId || !userId) return
    recipesRef.child(userId).child(recipeId).remove();
    showToast({
      summary: "Successfully removed recipe",
      detail: "Your recipe had been removed",
    });
  },
  fetchRecipeById({ commit }, recipeId: string) {
    const userId = getCurrentUserId()
    if (!recipeId || !userId) return
    recipesRef
    .child(userId)
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
