import { NameId } from "@/store/types";

export interface RecipeState {
  recipe?: Recipe;
}

export interface Recipe {
  id: number;
  name: string;
  url: string;
  rating: string;
  dates: Array<string>
  ingredients: Array<NameId>,
  note: string
}
