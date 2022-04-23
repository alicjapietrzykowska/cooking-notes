import { ActionTree } from "vuex";
import {
  AppState,
  Recipe,
  Credentials,
  NameId,
  Filter,
  SortOption,
} from "@/store/types";
import { auth, ingredientsRef, recipesRef } from "@/services/firebase.service";
import { snapshotToArray, getRandomId } from "@/services/utils.service";
import { showToast } from "@/services/toast.service";
import router from "@/routes";
import { i18n } from "@/i18n";

export const actions: ActionTree<AppState, AppState> = {
  createUser(_ctx, payload: Credentials) {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        showToast({
          summary: i18n.global.t("toasts.registered.summary"),
          detail: i18n.global.t("toasts.registered.detail"),
        });
      })
      .catch((error) => {
        const errorCode = error.code.split("/")[1];

        showToast({
          severity: "error",
          summary: i18n.global.t(`toasts.registerError.${errorCode}`),
          detail: i18n.global.t("toasts.registerError.detail"),
        });
      });
  },

  loginUser({ dispatch }, payload: Credentials) {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        dispatch("fetchRecipes");
        showToast({
          summary: i18n.global.t("toasts.loggedIn.summary"),
          detail: i18n.global.t("toasts.loggedIn.detail"),
        });
      })
      .catch((error) => {
        const errorCode = error.code.split("/")[1];

        showToast({
          severity: "error",
          summary: i18n.global.t(`toasts.logInError.${errorCode}`),
          detail: i18n.global.t("toasts.logInError.detail"),
        });
      });
  },

  logOutUser({ commit }) {
    router.push({ name: "list" });
    auth.signOut();
    commit("resetState");
  },

  checkUser({ commit }) {
    // Observer for changes to the user's sign-in state initialized in App.vue
    commit("updateIsLoading", true);
    auth.onAuthStateChanged((user) => {
      commit("updateUser", user);
      commit("updateIsLoading", false);
    });
  },

  fetchRecipes({ state, commit }) {
    const userId = state.user?.uid;
    commit("updateIsLoading", true);
    if (userId) {
      recipesRef.child(userId).on(
        "value",
        function (snapshot) {
          const data = snapshotToArray(snapshot);
          commit("updateRecipesList", data);
          commit("updateIsLoading", false);
        },
        function (error) {
          commit("updateIsLoading", false);
          console.error("Error: " + error);
        }
      );
    } else if (state.recipeList?.length) {
      commit("updateRecipesList", state.recipeList);
      commit("updateIsLoading", false);
    } else {
      commit("updateRecipesList", []);
      commit("updateIsLoading", false);
    }
  },

  createRecipe({ state, commit }, payload: Partial<Recipe>) {
    const userId = state.user?.uid;
    if (userId) {
      recipesRef.child(userId).push(payload);
    } else {
      const recipeList = state.recipeList || [];
      const newRecipe = { ...payload, id: getRandomId() };
      commit("updateRecipesList", [...recipeList, newRecipe]);
    }
    showToast({
      summary: i18n.global.t("toasts.createdRecipe.summary"),
      detail: i18n.global.t("toasts.createdRecipe.detail"),
    });
  },

  updateRecipe({ state, commit }, payload: Partial<Recipe>) {
    const userId = state.user?.uid;
    if (!payload.id) return;
    if (userId) {
      recipesRef
        .child(userId)
        .child(payload.id)
        .update({ ...payload });
    } else {
      commit("updateRecipe", payload);
    }
    showToast({
      summary: i18n.global.t("toasts.updatedRecipe.summary"),
      detail: i18n.global.t("toasts.updatedRecipe.detail"),
    });
  },

  removeRecipe({ state, commit }, recipeId: string) {
    const userId = state.user?.uid;
    if (userId) {
      recipesRef.child(userId).child(recipeId).remove();
    } else {
      commit("removeRecipe", recipeId);
    }
    showToast({
      summary: i18n.global.t("toasts.removedRecipe.summary"),
      detail: i18n.global.t("toasts.removedRecipe.detail"),
    });
  },

  fetchRecipeById({ commit, state }, recipeId: string) {
    const userId = state.user?.uid;
    if (userId) {
      recipesRef
        .child(userId)
        .child(recipeId)
        .once("value")
        .then((snapshot) => commit("updateActiveRecipe", snapshot.val()))
        .catch((error) => ({
          errorCode: error.code,
          errorMessage: error.message,
        }));
    } else {
      const recipe = state.recipeList.find((recipe) => recipe.id === recipeId);
      commit("updateActiveRecipe", recipe);
    }
  },

  filterRecipeList({ commit }, payload: Filter) {
    commit("filterList", payload);
  },

  sortRecipeList({ commit }, payload: SortOption) {
    commit("sortRecipeList", payload);
  },

  resetActiveRecipe({ commit }) {
    commit("updateActiveRecipe", undefined);
  },

  fetchIngredients({ state, commit }) {
    const userId = state.user?.uid;
    if (userId) {
      ingredientsRef.child(userId).on(
        "value",
        function (snapshot) {
          const data = snapshotToArray(snapshot);
          commit("updateIngredientsList", data);
        },
        function (error) {
          console.error("Error: " + error);
        }
      );
    } else {
      commit("updateIngredientsList", state.ingredientsList);
    }
  },

  createIngredient({ state, commit }, payload: NameId) {
    const userId = state.user?.uid;
    if (userId) {
      ingredientsRef.child(userId).push(payload);
    } else {
      const ingredientsList = state.ingredientsList || [];
      const newIngredient = { ...payload, id: getRandomId() };
      commit("updateIngredientsList", [...ingredientsList, newIngredient]);
    }
  },

  removeIngredient({ state }, ingredientId: string) {
    const userId = state.user?.uid;
    if (!ingredientId || !userId) return;
    ingredientsRef.child(userId).child(ingredientId).remove();
    showToast({
      summary: i18n.global.t("toasts.removedIngredient.summary"),
      detail: i18n.global.t("toasts.removedIngredient.detail"),
    });
  },
};
