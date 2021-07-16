import { RecipeListState } from "@/routes/recipe-list/store/types";
import { RecipeState } from "@/routes/recipe/store/types";

export interface AppState {
  user?: User;
  recipeList?: RecipeListState;
  recipe?: RecipeState
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}


export interface NameId {
  name: string,
  id: number
}