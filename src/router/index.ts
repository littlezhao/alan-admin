import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
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
      title: '控制台',
      icon:'dashbord'
    },
    component: () => import('../layout/index.vue'),
  },
  {
    path: '/sys',
    component: () => import('../layout/index.vue'),
    meta: {
      title: '系统管理',
      icon:'system'
    },
    children: [
      {
        path: '/sys/users',
        meta: {
          title: '用户管理',
          icon:'users',
        },
        component: () => import('views/sys/users/index.vue'),
      },
      {
        path: '/sys/roles',
        meta: {
          title: '角色管理',
          icon:'roles',
        },
        component: () => import('views/sys/roles/index.vue'),
      },
      {
        path: '/sys/menus',
        meta: {
          title: '菜单管理',
          icon:'menus'
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

NProgress.configure({ showSpinner: true })
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
