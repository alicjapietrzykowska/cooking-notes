import { AppState } from "@/store/types";
import { Module } from "vuex";
import { RecipeListState } from "./types";
import { actions } from "./actions";
import { mutations } from "./mutations";

const recipeList: Module<RecipeListState, AppState> = {
  namespaced: true,
  actions,
  mutations,
};

export default recipeList;
