import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "@/views/LoginPage";

const routes = [
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
});

export default router;
