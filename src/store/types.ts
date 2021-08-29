export interface AppState {
  user?: User;
  activeRecipe?: Recipe;
  recipeList: Recipe[];
  filteredRecipeList: Recipe[];
  ingredientsList: NameId[]
}

export interface Credentials {
  email: string,
  password: string
}

export interface User {
  uid: string;
  email: string | null;
}

export interface NameId {
  name: string;
  id: string;
}

export interface RecipeState {
  recipe?: Recipe;
}

export interface Recipe {
  id: string;
  name: string;
  dateCreated: number;
  recipeUrl: string;
  rating: number;
  dates: Array<number>;
  ingredients: Array<NameId>;
  notes: string;
  source: SourceKey;
  bookTitle: string;
  bookPage: string;
  bookAuthors: string;
  comment: string;
}

export interface SourceOption {
  key: SourceKey;
  name: string;
}

export type SourceKey = "link" | "book" | "other";

export type LoginDialogType = 'login' | 'register'