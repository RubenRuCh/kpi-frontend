import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index.js';

// Normal imports (most used routes)
import Home from '@/views/Home.vue';
import KpiList from '@/views/kpis/KpiList.vue';
import NotFound from '@/views/NotFound.vue';

/* Lazy / async imports */

// KPI
const KpiDeletedList = () => import('@/views/kpis/KpiDeletedList.vue');
const KpiDetail = () => import('@/views/kpis/KpiDetail.vue');
const KpiRegistration = () => import('@/views/kpis/KpiRegistration.vue');
const KpiModification = () => import('@/views/kpis/KpiModification.vue');

// Field
const FieldList = () => import('@/views/fields/FieldList.vue');
const FieldDetail = () => import('@/views/fields/FieldDetail.vue');
const FieldRegistration = () => import('@/views/fields/FieldRegistration.vue');
const FieldModification = () => import('@/views/fields/FieldModification.vue');

// Conf
const ConfList = () => import('@/views/conf/ConfList.vue');

// Register
const RegisterList = () => import('@/views/registers/RegisterList.vue');

// Auth
const UserAuth = () => import('@/views/auth/UserAuth.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/conf',
    component: ConfList,
    meta: { requiresAuth: true },
  },
  {
    path: '/kpis',
    name: 'KPIs',
    component: KpiList,
    meta: { requiresAuth: true },
  },
  {
    path: '/kpis/deleted',
    component: KpiDeletedList,
    meta: { requiresAuth: true },
  },
  {
    name: 'Create',
    path: '/kpis/create',
    component: KpiRegistration,
    meta: { requiresAuth: true },
  },
  {
    path: '/kpis/:id',
    component: KpiDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/kpis/:id/edit',
    component: KpiModification,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/kpis/:id/clone',
    redirect: (to) => ({
      name: 'Create',
      query: { clone: to.params.id },
    }),
    props: true,
  },
  {
    path: '/kpis/:id/registers',
    component: RegisterList,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/fields',
    name: 'Fields',
    component: FieldList,
    meta: { requiresAuth: true },
  },
  {
    path: '/fields/create',
    component: FieldRegistration,
    meta: { requiresAuth: true },
  },
  {
    path: '/fields/:id',
    component: FieldDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/fields/:id/edit',
    component: FieldModification,
    props: true,
    meta: { requiresAuth: true },
  },
  { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
  { path: '/:notFound(.*)', component: NotFound, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// We can apply rules to each route. It will be interesting to apply a redirect when a user acces a view that only registered users have rights to see!
router.beforeEach(function (to, _from, next) {
  if (
    to.meta.requiresAuth &&
    !store.getters['auth/isAuthenticated'] &&
    process.env.NODE_ENV === 'production'
  ) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
    next('/');
  } else {
    next();
  }
});

export default router;
