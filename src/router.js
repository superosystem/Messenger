import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "@/views/LoginPage";
import RegistrationPage from "@/views/RegistrationPage";
import HelloWorld from "@/components/HelloWorld";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegistrationPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
});

export { routes };

export default router;
