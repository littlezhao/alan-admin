import type { App, Plugin } from 'vue'
import SvgIcon from './SvgIcon.vue'
import Button from './Button.vue'

let GlobalCompnents = {} as Plugin
GlobalCompnents.install = (app: App) => {
  app.component('SvgIcon', SvgIcon)
  app.component('IconButton', Button)
}
export default GlobalCompnents
