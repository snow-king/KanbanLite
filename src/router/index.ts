import { createRouter, createWebHistory } from "vue-router";
import Kanban from "@/components/KanbanBoard.vue";
import LoginScreen from "@/components/LoginScreen.vue";
import { useUserStore } from "../store/useUserStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginScreen,
    },
    {
      path: "/kanban",
      name: "Kanban",
      component: Kanban,
    },
  ],
});
router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  if (
    // make sure the user is authenticated
    !userStore.user.token &&
    // ❗️ Avoid an infinite redirect
    to.name !== "Login"
  ) {
    // redirect the user to the login page
    return { name: "Login" };
  }
});

export default router;
