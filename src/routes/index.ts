import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import List from "./recipe-list/List";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "List",
    component: List,
  },
  {
    path: "/recipe",
    name: "Recipe",
    // route level code-splitting
    // this generates a separate chunk (recipe.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "recipe" */ "./recipe/Recipe"),
  },
  {
    path: "/recipe/add",
    name: "AddRecipe",
    // route level code-splitting
    // this generates a separate chunk (recipe.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "recipeForm" */ "./recipe/RecipeForm"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
