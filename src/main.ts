import { createApp, useAttrs } from 'vue'
import App from './App.vue'
import './styles/index.css'
import naive from 'naive-ui'
import router from './router/index'
createApp(App).use(router).use(naive).mount('#app')
