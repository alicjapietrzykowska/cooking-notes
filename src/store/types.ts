export interface AppState {
  user?: User;
  activeRecipe?: Recipe;
  recipeList: Recipe[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface NameId {
  name: string;
  id: number;
}

export interface RecipeState {
  recipe?: Recipe;
}

export interface Recipe {
  id: string;
  name: string;
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
