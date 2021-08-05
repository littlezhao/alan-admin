import { MenuOption, NIcon } from 'naive-ui'
import { defineAsyncComponent, h } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import SvgIcon from 'comps/SvgIcon.vue'
import { MenuModel } from '@/interfaces'
const parseMenu = (menus: RouteRecordRaw[] | undefined): Array<MenuOption> => {
  if (!menus || !menus.length) {
    return [] as Array<MenuOption>
  }
  return menus
    .filter((item) => !item.meta?.hidden)
    .map((item) => {
      let menu = {} as MenuOption
      if (item.children && item.children.length) {
        menu.children = parseMenu(item.children)
      }
      if (item.meta && item.meta.icon) {
        menu.icon = rederIcon(item)
      }
      menu.label = item.meta?.title as string
      menu.key = item.path
      return menu
    })
}
const rederIcon = (option: any) => {
  return () =>
    h(NIcon, null, { default: () => h(SvgIcon, { name: option.meta.icon }) })
}
const parseMenuToRouters = (menus: MenuModel[]): Array<RouteRecordRaw> => {
  const views = import.meta.glob('../views/**/*.vue')
  const layout = import.meta.glob('../layout/*.vue')
  return menus.map((item) => {
    let menu = {} as RouteRecordRaw
    if (item.children && item.children.length) {
      menu.children = parseMenuToRouters(item.children)
    }
    menu.meta = { ...item }
    menu.path = item.path
    const comps = Object.keys(views)
      .concat(Object.keys(layout))
        .filter(key => key.includes(item.component))
    menu.component = comps.length && views[comps[0]] || layout[comps[0]] 
    return menu
  })
}
export { parseMenu, parseMenuToRouters }
