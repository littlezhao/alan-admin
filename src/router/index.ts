import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      hidden: true,
    },
    redirect: '/index',
  },
  {
    path: '/index',
    meta: {
      title: '首页',
    },
    component: () => import('../layout/index.vue'),
  },
  {
    path: '/sys',
    component: () => import('../layout/index.vue'),
    meta: {
      title: '系统管理',
    },
    children: [
      {
        path: '/sys/users',
        meta: {
          title: '用户管理',
        },
        component: () => import('views/sys/users/index.vue'),
      },
      {
        path: '/sys/roles',
        meta: {
          title: '角色管理',
        },
        component: () => import('views/sys/roles/index.vue'),
      },
      {
        path: '/sys/menus',
        meta: {
          title: '菜单管理',
        },
        component: () => import('views/sys/menus/index.vue'),
      },
    ],
  },
]
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})
export default router
