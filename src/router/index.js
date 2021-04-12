import { createRouter, createWebHistory } from 'vue-router';

// import store from './store/index.js';

// Normal imports
import Home from '../views/Home.vue';
import KpiList from '../views/kpis/KpiList.vue';
import NotFound from '../views/NotFound.vue';

/* Lazy / async imports */
// KPI
const KpiDetail = () => import('../views/kpis/KpiDetail.vue');
const KpiRegistration = () => import('../views/kpis/KpiRegistration.vue');
const KpiModification = () => import('../views/kpis/KpiModification.vue');

// Auth
// const UserAuth = () => import('./views/auth/UserAuth.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/kpis',
    name: 'KPIs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: KpiList,
    props: true,
    children: [{ path: 'create', component: KpiRegistration }],
  },
  {
    path: '/kpis/:id',
    component: KpiDetail,
    props: true,
    children: [{ path: 'edit', component: KpiModification }],
  },
  {
    path: '/fields',
    name: 'Fields',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/fields/FieldList.vue'),
  },
  // { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
  { path: '/:notFound(.*)', component: NotFound },
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
