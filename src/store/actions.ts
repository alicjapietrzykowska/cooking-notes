import { ActionTree } from "vuex";
import { AppState, Recipe, Credentials } from "./types";
import { auth, recipesRef } from "@/services/firebase.service";
import { snapshotToArray } from "@/services/utils.service";
import { showToast } from '@/services/toast.service';
import router from '@/routes';

export const actions: ActionTree<AppState, AppState> = {
  createUser(_ctx, payload: Credentials) {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(() => {
      showToast({
        summary: "Successfully registered",
        detail: "Your account has been created",
      });
    })
    .catch(error => console.error(error))
  },

  loginUser({dispatch}, payload: Credentials) {
    auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(() => {
      dispatch('fetchRecipes')
      showToast({
        summary: "Successfully logged in",
        detail: "Your has been logged in",
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
        summary: "Successfully created recipe",
        detail: "Your recipe has been saved",
      });
    } 
  },
  updateRecipe({state}, payload: Partial<Recipe>) {
    const userId = state.user?.uid
    if (!payload.id || !userId) return
    recipesRef.child(userId).child(payload.id).update({...payload});
    showToast({
      summary: "Successfully saved recipe",
      detail: "Your changes has been saved",
    });
  },
  removeRecipe({state}, recipeId: string) {
    const userId = state.user?.uid
    if (!recipeId || !userId) return
    recipesRef.child(userId).child(recipeId).remove();
    showToast({
      summary: "Successfully removed recipe",
      detail: "Your recipe had been removed",
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
