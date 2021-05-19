import {localStorageService} from '@/store/modules/UserStorage/actions';

import { createRouter, createWebHistory } from 'vue-router';
//import store from '@/store/index.js';

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

// User
const controlPanel = () => import("@/views/users/usersControl.vue");
const userList = () => import("@/views/users/userList.vue");
const userCreate = () => import("@/views/users/userCreate.vue");
const profile = () => import("@/views/users/profile.vue");


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { authorize: [] },
  },
  {
    path: '/conf',
    component: ConfList,
    meta: { authorize: ['Admin'] },
  },
  {
    path: '/kpis',
    name: 'KPIs',
    component: KpiList,
    meta: { authorize: [] },
  },
  {
    path: '/kpis/deleted',
    component: KpiDeletedList,
    meta: { authorize: ['Admin'] },
  },
  {
    name: 'Create',
    path: '/kpis/create',
    component: KpiRegistration,
    meta: { authorize: ['Admin'] },
  },
  {
    path: '/kpis/:id',
    component: KpiDetail,
    props: true,
    meta: { authorize: [] },
  },
  {
    path: '/kpis/:id/edit',
    component: KpiModification,
    props: true,
    meta: { authorize: ['Admin'] },
  },
  {
    path: '/kpis/:id/clone',
    redirect: (to) => ({
      name: 'Create',
      query: { clone: to.params.id },
    }),
    meta: { authorize: ['Admin'] },
    props: true,
  },
  {
    path: '/kpis/:id/registers',
    component: RegisterList,
    props: true,
    meta: { authorize: [] },
  },
  {
    path: '/fields',
    name: 'Fields',
    component: FieldList,
    meta: { authorize: ['Admin'] },
  },
  {
    path: '/fields/create',
    component: FieldRegistration,
    meta: { authorize: ['Admin'] },
  },
  {
    path: '/fields/:id',
    component: FieldDetail,
    props: true,
    meta: { authorize: ['Admin'] },
  },
  {
    path: '/fields/:id/edit',
    component: FieldModification,
    props: true,
    meta: { authorize: ['Admin'] },
  },
  {
    path: "/adminpanel",
    component: controlPanel,
    meta: { authorize:['Admin']}
  },
  {
    path: "/adminpanel/user/list",
    component: userList,
    meta: { authorize:['Admin']}
  },
  {
    path: "/adminpanel/user/create",
    component: userCreate,
    meta: { authorize:['Admin']}
  },
  {
    path: "/profile",
    component: profile,
    name: "Profile"
  },
  { path: '/auth', component: UserAuth },
  { path: '/:notFound(.*)', component: NotFound, meta: { authorize:[]}},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// We can apply rules to each route. It will be interesting to apply a redirect when a user acces a view that only registered users have rights to see!
router.beforeEach(function (to, _from, next) {

  const {authorize} = to.meta;
  const currentUser = localStorageService.currentUserValue;

    if(authorize) {

      if(!currentUser && process.env.NODE_ENV === 'development') {
        next('/auth');
      }
      
    if(authorize.length && !authorize.includes(currentUser.role)) {
      next('/');
      
    }

  }

    next();

});

export default router;
