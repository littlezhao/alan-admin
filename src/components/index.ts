import type { App, Plugin } from 'vue'
import SvgIcon from './SvgIcon.vue'

let GlobalCompnents = {} as Plugin
GlobalCompnents.install = (app: App) => {
  app.component("SvgIcon", SvgIcon)
}
export default GlobalCompnents
