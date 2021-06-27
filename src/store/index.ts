import { createStore } from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";
import recipeList from "@/routes/recipe-list/store";

export default createStore({
  mutations,
  actions,
  modules: {
    recipeList,
  },
  state: {},
});
