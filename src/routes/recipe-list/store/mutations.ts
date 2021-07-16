import { MutationTree } from "vuex";
import { RecipeListState, RecipeListElement } from './types';

export const mutations: MutationTree<RecipeListState> = {
    updateRecipesList(state, payload: RecipeListElement[]) {
        state.recipes = payload
    }
};
