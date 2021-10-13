import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './common.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, {size:'mini'})
app.use(router)
app.mount('#app')

// 初始化配置
import {initConf} from './common/conf'
initConf(app);

// 全局组件
import Page from '/src/components/common/Page.vue'
app.component("my-page", Page)





