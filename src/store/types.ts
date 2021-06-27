import { RecipeListState } from "@/routes/recipe-list/store/types";

export interface AppState {
  user?: User;
  recipeList?: RecipeListState;
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