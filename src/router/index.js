import { createRouter, createWebHistory } from "vue-router";
import Landing from "../components/Landing.vue";
import Login from "../pages/auth/Login.vue";
import Signup from "../pages/auth/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import Tickets from "../pages/tickets/Tickets.vue";
import TicketForm from "../pages/tickets/TicketForm.vue";
import { getSession } from "../services/session";

const routes = [
  { path: "/", component: Landing },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/tickets", component: Tickets, meta: { requiresAuth: true } },
  { path: "/tickets/new", component: TicketForm, meta: { requiresAuth: true } },
  {
    path: "/tickets/:id/edit",
    component: TicketForm,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !getSession()) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
