import { createRouter, createWebHistory } from "vue-router";

// import store from './store/index.js';

// Normal imports
import Home from "../views/Home.vue";
import KpiList from "../views/kpis/KpiList.vue";
import NotFound from "../views/NotFound.vue";

/* Lazy / async imports */
// KPI

const KpiDeletedList = () => import("../views/kpis/KpiDeletedList.vue");
const KpiDetail = () => import("../views/kpis/KpiDetail.vue");
const KpiRegistration = () => import("../views/kpis/KpiRegistration.vue");
const KpiModification = () => import("../views/kpis/KpiModification.vue");

// Field
const FieldDetail = () => import("../views/fields/FieldDetail.vue");
const FieldRegistration = () => import("../views/fields/FieldRegistration.vue");
const FieldModification = () => import("../views/fields/FieldModification.vue");

// Auth
// const UserAuth = () => import('./views/auth/UserAuth.vue');

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/kpis",
    name: "KPIs",
    component: KpiList,
  },
  {
    path: "/kpis/deleted",
    component: KpiDeletedList,
  },
  {
    name: "Create",
    path: "/kpis/create",
    component: KpiRegistration,
  },
  {
    path: "/kpis/:id",
    component: KpiDetail,
    props: true,
  },
  {
    path: "/kpis/:id/edit",
    component: KpiModification,
    props: true,
  },
  {
    path: "/kpis/:id/clone",
    redirect: (to) => ({
      name: "Create",
      query: { clone: to.params.id },
    }),
    props: true,
  },
  {
    path: "/fields",
    name: "Fields",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/fields/FieldList.vue"),
  },
  {
    path: "/fields/create",
    component: FieldRegistration,
  },
  {
    path: "/fields/:id",
    component: FieldDetail,
    props: true,
  },
  {
    path: "/fields/:id/edit",
    component: FieldModification,
    props: true,
  },
  // { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// We can apply rules to each route. It will be interesting to apply a redirect when a user acces a view that only registered users have rights to see!
router.beforeEach(function (to, _from, next) {
  // if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
  //   next('/auth');
  // } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
  //   next('/');
  // } else {
  next();
  // }
});

export default router;
