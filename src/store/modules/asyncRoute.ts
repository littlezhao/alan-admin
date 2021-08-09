import { defineStore } from 'pinia'
import router from '@/router'
import { RouteRecordName, RouteRecordRaw, useRouter } from 'vue-router'
import { getMenus } from '@/apis/modules/menus'
import { parseMenuToRouters } from '@/utils/menuUtils'
import { MenuModel } from '@/interfaces'
import store from '..'

export interface IMenuState {
  menus: RouteRecordRaw[]
  buttons: MenuModel[]
  isDynamicAddedRoute: boolean
}

const useAsyncRouteStore = defineStore({
  id: 'routes',
  state: (): IMenuState => ({
    menus: [],
    buttons: [],
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
      const menusButtons = await getMenus<Array<MenuModel>>()
      this.filterButtons(menusButtons)
      this.filterMenu(menusButtons)
      const accessMenus = parseMenuToRouters(menusButtons)
      this.addRoute(accessMenus)
      this.setMenus(accessMenus)
      this.setDynamicAddedRoute(true)
    },
    filterMenu(menusAndButtons: MenuModel[]) {
      return menusAndButtons.filter((item) => {
        if (item.children && item.children.length) {
          item.children = this.filterMenu(item.children)
        }
        return item.type != 2
      })
    },
    filterButtons(menusAndButtons: MenuModel[]) {
      menusAndButtons.forEach((item) => {
        if (item.children && item.children.length) {
          this.filterButtons(item.children)
        }
        if (item.type == 2) this.buttons.push(item)
      })
    },
    addRoute(routes: RouteRecordRaw[]) {
      routes.forEach((route) => {
        if (!router.hasRoute(route.name as RouteRecordName)) {
          router.addRoute(route)
          router.options.routes.push(route)
        }
      })
    },
  },
})
// Need to be used outside the setup
export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store)
}
export default useAsyncRouteStore
