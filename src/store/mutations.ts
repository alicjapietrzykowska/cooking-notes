import { MutationTree } from "vuex";
import { AppState, Recipe, NameId, FilterList } from './types';
import Firebase from "firebase/app";
import { filterRecipeList } from "@/services/filter.service";

export const mutations: MutationTree<AppState> = {
  updateRecipesList(state, payload: Recipe[]) {
    state.recipeList = payload;
    state.filteredRecipeList = payload;
  },
  updateActiveRecipe(state, payload: Recipe) {
    state.activeRecipe = payload;
  },
  updateIngredientsList(state, payload: NameId[]) {
    state.ingredientsList = payload;
  },
  updateUser(state, payload: Firebase.User | undefined | null) {
    if (!payload) {
      state.user = undefined
    } else {
      state.user = {
        uid: payload.uid,
        email: payload.email
      }
    }
  },
  filterList(state, payload: FilterList) {
    state.filteredRecipeList = filterRecipeList(payload, state.filteredRecipeList) || state.recipeList
  
    state.isListFiltered = state.filteredRecipeList.length !== state.recipeList.length

  }
};
