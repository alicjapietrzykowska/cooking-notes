import { AppState } from "@/store/types";
import { Module } from "vuex";
import { RecipeState } from "./types";
import { actions } from "./actions";
import { mutations } from "./mutations";

const recipeList: Module<RecipeState, AppState> = {
  namespaced: true,
  actions,
  mutations,
};

export default recipeList;
