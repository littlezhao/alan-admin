import { createApp, useAttrs } from 'vue'
import App from './App.vue'
import './styles/index.css'
import naive from 'naive-ui'
import router from './router/index'
import GlobalCompnents from './components/index'
createApp(App).use(router).use(GlobalCompnents).use(naive).mount('#app')
