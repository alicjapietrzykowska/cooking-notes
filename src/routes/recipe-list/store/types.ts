export interface RecipeListState {
  recipes: RecipeListElement[];
}

export interface RecipeListElement {
  id: number;
  name: string;
  url: string;
  rating: string;
}