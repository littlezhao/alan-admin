import { RouteRecordRaw } from 'vue-router'

const loginRoute: RouteRecordRaw = {
  path: '/login',
  meta: {
    hidden: true,
  },
  component: () => import('views/accounts/index.vue'),
}
const indexRoute: RouteRecordRaw = {
  path: '/',
  meta: {
    hidden: true,
  },
  redirect: '/index',
}
const rootRoute: RouteRecordRaw = {
  path: '/index',
  meta: {
    title: '控制台',
    icon: 'dashbord',
  },
  component: () => import('../layout/index.vue'),
}
const constantRoutes = [loginRoute, indexRoute, rootRoute]
export { constantRoutes }
