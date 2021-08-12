import { ActionTree } from "vuex";
import { AppState, Recipe, Credentials } from "./types";
import { auth, recipesRef } from "@/services/firebase.service";
import { snapshotToArray } from "@/services/utils.service";
import { showToast } from '@/services/toast.service';
import router from '@/routes';
import { i18n } from "@/i18n";

export const actions: ActionTree<AppState, AppState> = {
  createUser(_ctx, payload: Credentials) {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(() => {
      showToast({
        summary: i18n.global.t('toasts.registered.summary'),
        detail: i18n.global.t('toasts.registered.detail'),
      });
    })
    .catch(error => console.error(error))
  },

  loginUser({dispatch}, payload: Credentials) {
    auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(() => {
      dispatch('fetchRecipes')
      showToast({
        summary: i18n.global.t('toasts.loggedIn.summary'),
        detail: i18n.global.t('toasts.loggedIn.detail'),
      });
    })
    .catch(error => console.error(error))
  },

  logOutUser() {
    router.push({name: 'list'})
    auth.signOut()
  },

  checkUser({commit}) {
    // Observer for changes to the user's sign-in state initialized in App.vue
    auth.onAuthStateChanged((user) => {
      commit('updateUser', user)
    });
  },

  fetchRecipes({state, commit }) {
    const userId = state.user?.uid
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
    } else {
      commit("updateRecipesList", undefined);
    }
  },
  createRecipe({state}, payload: Partial<Recipe>) {
    const userId = state.user?.uid
    if (userId) {
      recipesRef.child(userId).push(payload);
      showToast({
        summary: i18n.global.t('toasts.createdRecipe.summary'),
        detail: i18n.global.t('toasts.createdRecipe.detail'),
      });
    } 
  },
  updateRecipe({state}, payload: Partial<Recipe>) {
    const userId = state.user?.uid
    if (!payload.id || !userId) return
    recipesRef.child(userId).child(payload.id).update({...payload});
    showToast({
      summary: i18n.global.t('toasts.updatedRecipe.summary'),
      detail: i18n.global.t('toasts.updatedRecipe.detail'),
    });
  },
  removeRecipe({state}, recipeId: string) {
    const userId = state.user?.uid
    if (!recipeId || !userId) return
    recipesRef.child(userId).child(recipeId).remove();
    showToast({
      summary: i18n.global.t('toasts.removedRecipe.summary'),
      detail: i18n.global.t('toasts.removedRecipe.detail'),
    });
  },
  fetchRecipeById({ commit, state }, recipeId: string) {
    const userId = state.user?.uid
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
