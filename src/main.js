import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './request.js'
import './mock'

const app = createApp(App)
app.config.globalProperties.$request = request
app.use(store).use(router).use(ElementPlus).mount('#app')
