import { createRouter, createWebHistory } from "vue-router";
import NewsFeed from "../views/NewsFeed.vue"
import LoginForm from "../views/LoginForm.vue"

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
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
