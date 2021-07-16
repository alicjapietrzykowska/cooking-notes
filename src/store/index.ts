import { createStore } from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";
import recipeList from "@/routes/recipe-list/store";
import recipe from "@/routes/recipe/store";

export default createStore({
  mutations,
  actions,
  modules: {
    recipeList,
    recipe
  },
  state: {},
});
