import { Filter, Recipe, SourceKey, NameId } from "@/store/types";

export function manageActiveFilters(payload: Filter, activeFilters: Filter[]) {
  const activeFilterOfType = activeFilters.find(
    (filter) => filter.filterType === payload.filterType
  );
  if (activeFilterOfType) {
    if (payload.value.length) {
      //update value of the existing filter
      return activeFilters.map((filter) =>
        filter.filterType === payload.filterType
          ? { ...filter, value: payload.value }
          : filter
      );
    } else {
      //remove filter from the list if it was cleared
      return activeFilters.filter(
        (filter) => filter.filterType !== payload.filterType
      );
    }
  } else {
    //add new filter
    return [...activeFilters, payload];
  }
}

function filterBySearch(searchQuery: string, recipeList: Recipe[]) {
  return recipeList.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery)
  );
}

function filterByIngredients(ingredients: NameId[], recipeList: Recipe[]) {
  return recipeList.filter((recipe) => {
    return recipe.ingredients?.some((recipeIngredient) =>
      ingredients.some((ingredient) => ingredient.id === recipeIngredient.id)
    );
  });
}
function filterBySource(sources: SourceKey[], recipeList: Recipe[]) {
  return recipeList.filter((recipe) =>
    sources.some((source) => recipe.source === source)
  );
}

export function filterRecipeList(
  activeFilters: Filter[],
  recipeList: Recipe[]
) {
  if (!activeFilters.length) return undefined;
  let filteredRecipes: Recipe[] = [...recipeList];
  activeFilters.forEach((filter) => {
    const { filterType, value } = filter;
    if (filterType === "search") {
      filteredRecipes = filterBySearch(value as string, filteredRecipes);
    }
    if (filterType === "ingredients") {
      filteredRecipes = filterByIngredients(value as NameId[], filteredRecipes);
    }
    if (filterType === "source") {
      filteredRecipes = filterBySource(value as SourceKey[], filteredRecipes);
    }
  });
  return filteredRecipes;
}
