import { MenuOption, NIcon } from 'naive-ui'
import { h } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import SvgIcon from 'comps/SvgIcon.vue'

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
      console.log(menu)
      return menu
    })
}
const rederIcon = (option: any) => {
  return () =>
    h(NIcon, null, { default: () => h(SvgIcon, { name: option.meta.icon }) })
}
export { parseMenu }
