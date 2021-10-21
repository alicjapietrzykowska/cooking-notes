import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { i18n } from "@/i18n";
import PageNotFound from "./not-found";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/cooking-notes/",
    name: "list",
    component: () => import("./recipe-list/List"),
  },
  {
    path: "/cooking-notes/recipe/:id",
    name: "recipe",
    meta: { title: i18n.global.t("routes.details") },
    component: () => import("./recipe/Recipe"),
  },
  {
    path: "/cooking-notes/recipe/add",
    name: "add-recipe",
    meta: { title: i18n.global.t("routes.add") },

    component: () => import("./recipe/RecipeForm"),
  },
  {
    path: "/cooking-notes/recipe/edit/:id",
    name: "edit-recipe",
    meta: { title: i18n.global.t("routes.edit") },
    component: () => import("./recipe/RecipeForm"),
  },
  {
    path: "/",
    redirect: { name: "list" },
  },
  {
    path: "/cooking-notes/:pathMatch(.*)*",
    name: "not-found",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const DEFAULT_TITLE = i18n.global.t("app.name");

router.beforeEach((to) => {
  const routeTitle = to.meta.title
    ? `${to.meta.title} - ${DEFAULT_TITLE}`
    : DEFAULT_TITLE;
  document.title = routeTitle;
});

export default router;
