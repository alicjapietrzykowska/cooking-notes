import { NameId } from "@/store/types";

export interface RecipeState {
  recipe?: Recipe;
}

export interface Recipe {
  id: number;
  name: string;
  recipeUrl: string;
  rating: number;
  dates: Array<number>
  ingredients: Array<NameId>,
  notes: string,
  source: SourceKey,
  bookTitle: string,
  bookPage: string,
  bookAuthors: string,
  comment: string,
}

export interface SourceOption {
  key: SourceKey;
  name: string;
}

export type SourceKey = 'link' | 'book' | 'other'

