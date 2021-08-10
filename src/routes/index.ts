import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "list",
    component: () => import("./recipe-list/List"),

  },
  {
    path: "/recipe/:id",
    name: "recipe",
    component: () => import("./recipe/Recipe"),
  },
  {
    path: "/recipe/add",
    name: "add-recipe",
    component: () =>
      import("./recipe/RecipeForm"),
  },
  {
    path: "/recipe/edit/:id",
    name: "edit-recipe",
    component: () =>
      import("./recipe/RecipeForm"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
