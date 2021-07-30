import { MenuOption } from 'naive-ui'
import { RouteRecordRaw } from 'vue-router'

const parseMenu = (menus: RouteRecordRaw[] | undefined): Array<MenuOption> => {
  if (!menus || !menus.length) {
    return [] as Array<MenuOption>
  }
  return menus
    .filter((item) => !item.meta?.hidden)
    .map((item) => {
      let menu = {} as MenuOption
      if (item.children&&item.children.length) {
          menu.children = parseMenu(item.children)
        }
        menu.label = item.meta?.title as string
        menu.key = item.path
        console.log(menu)
      return menu
    })
}
export { parseMenu }
