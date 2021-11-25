import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { visible: false },
  },
  {
    path: "/profile",
    name: "Perfil",
    meta: {
      requiresLogin: true,
      layout: "LayoutUsers",
      visible: true,
      permission: null,
    },
    component: () => import("../views/Profile.vue"),
  } /* 
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      requiresLogin: true,
      layout: "LayoutUsers",
      visible: true,
      permission: null,
    },
    component: () => import("../views/Dashboard.vue"),
  }, */,
  {
    path: "/historiasclinicas",
    name: "Historias Clinicas",
    meta: {
      requiresLogin: true,
      layout: "LayoutUsers",
      visible: true,
      permission: "view_consultamedica",
    },
    component: () => import("../views/HistoriaClinica/index.vue"),
  },
  {
    path: "/view-paciente",
    name: "View Paciente",
    meta: {
      requiresLogin: true,
      layout: "LayoutUsers",
      visible: false,
      permission: null,
    },
    component: () => import("../views/Paciente/viewPaciente.vue"),
  },
  {
    path: "/citas",
    name: "Citas",
    meta: {
      requiresLogin: true,
      layout: "LayoutUsers",
      visible: true,
      permission: "view_cita",
    },
    component: () => import("../views/Citas/index.vue"),
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/login.vue"),
    meta: {
      layout: "LayoutDefault",
      visible: false,
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("../views/auth/logout.vue"),
    meta: {
      layout: "LayoutDefault",
      visible: true,
      permission: null,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
