import { createRouter, createWebHistory } from "vue-router";
import NewsFeed from "../views/NewsFeed.vue";
import LoginForm from "../views/LoginForm.vue";
import SearchNewsVue from "../components/SearchNews.vue";
import restrictPageIfDirectlyAccessed from "./guards/restrict-direct-access-guard";

const routes = [
  {
    path: "/",
    name: "sign-in",
    component: LoginForm,
  },
  {
    path: "/news-feed",
    name: "news-feed",
    component: NewsFeed,
    children: [
      {
        path: "/search",
        name: "search",
        component: SearchNewsVue,
      },
    ],
    meta: {
      restrictDirectAccess: true,
    },
    beforeEnter: [restrictPageIfDirectlyAccessed],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
