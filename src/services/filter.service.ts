import { FilterList, Recipe, SourceKey, NameId } from '@/store/types';

function filterBySearch(searchQuery: string, recipeList: Recipe[]) {
    return recipeList.filter(recipe => recipe.name.toLowerCase().includes(searchQuery))
}

function filterByIngredients(filters:NameId[], recipeList: Recipe[]) {
    const filteredRecipes: Recipe[] = []
    recipeList.forEach(recipe => {
      if (!recipe.ingredients) return;
      const haveIngredient = recipe.ingredients.some(recipeIngredient => filters.some(ingredient => ingredient.id === recipeIngredient.id))
      if (haveIngredient) {
        filteredRecipes.push(recipe)
      }
    })
    return filteredRecipes
}
function filterBySource(filters:SourceKey[], recipeList: Recipe[]) {
    return recipeList.filter(recipe => filters.some(source => recipe.source === source))
}

export function filterRecipeList(payload: FilterList, recipeList: Recipe[]) {
    const {filters, filterType} = payload
    if (!filters?.length) return recipeList
    let filteredRecipes: Recipe[] = []
    if (filterType === 'search') {
        //@ts-ignore
        filteredRecipes = filterBySearch(filters, recipeList)
    } else if (filterType === 'ingredients') {
         //@ts-ignore
        filteredRecipes = filterByIngredients(filters, recipeList)
    } else if (filterType === 'source') {
         //@ts-ignore
        filteredRecipes = filterBySource(filters, recipeList)
    }

    if (filteredRecipes.length) {
      return filteredRecipes
    } else if (payload.filters.length) {
      return []
    } else {
      return undefined
    }
}