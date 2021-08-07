import { defineStore } from 'pinia'
import router from '@/router'
import { RouteRecordName, RouteRecordRaw, useRouter } from 'vue-router'
import { getMenus } from '@/apis/modules/menus'
import { parseMenuToRouters } from '@/utils/menuUtils'
import { MenuModel } from '@/interfaces'
import store from '..'

export interface IMenuState {
  menus: RouteRecordRaw[]
  routers: RouteRecordRaw[]
  isDynamicAddedRoute: boolean
}

const useAsyncRouteStore = defineStore({
  id: 'routes',
  state: (): IMenuState => ({
    menus: [],
    routers: [],
    isDynamicAddedRoute: false,
  }),
  getters: {
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    setMenus(menus: RouteRecordRaw[]) {
      this.menus = menus
    },
    async generateAsyncRoutes() {
      const menus = await getMenus<Array<MenuModel>>()
      const accessMenus = parseMenuToRouters(menus)
      this.setMenus(accessMenus)
      this.addRoute(accessMenus)
      this.setDynamicAddedRoute(true)
    },
    addRoute(routes:RouteRecordRaw[]) {
      routes.forEach((route) => {
        if (!router.hasRoute(route.name as RouteRecordName)) {
          router.addRoute(route)
          router.options.routes.push(route)
        }
      })
    }
  },
})
// Need to be used outside the setup
export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store)
}
export default useAsyncRouteStore
