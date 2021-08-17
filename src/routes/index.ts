import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { i18n } from "@/i18n";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "list",
    component: () => import("./recipe-list/List"),

  },
  {
    path: "/recipe/:id",
    name: "recipe",
    meta: { title: i18n.global.t('routes.details') },
    component: () => import("./recipe/Recipe"),
  },
  {
    path: "/recipe/add",
    name: "add-recipe",
    meta: { title: i18n.global.t('routes.add') },

    component: () =>
      import("./recipe/RecipeForm"),
  },
  {
    path: "/recipe/edit/:id",
    name: "edit-recipe",
    meta: { title: i18n.global.t('routes.edit') },
    component: () =>
      import("./recipe/RecipeForm"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const DEFAULT_TITLE = i18n.global.t('app.name');

router.beforeEach((to) => {
    const routeTitle = to.meta.title ? `${to.meta.title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    document.title = routeTitle;

})

export default router;
