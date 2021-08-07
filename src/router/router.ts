import { RouteRecordRaw } from 'vue-router'

const loginRoute: RouteRecordRaw = {
  path: '/login',
  name:'Login',
  meta: {
    hidden: true,
  },
  component: () => import('views/accounts/index.vue'),
}
const indexRoute: RouteRecordRaw = {
  path: '/',
  name:'Root',
  meta: {
    hidden: true,
  },
  redirect: '/index',
}
const rootRoute: RouteRecordRaw = {
  path: '/index',
  name:'Index',
  meta: {
    title: '控制台',
    icon: 'Apps',
  },
  component: () => import('../layout/index.vue'),
}
const constantRoutes = [loginRoute, indexRoute, rootRoute]
export { constantRoutes }
