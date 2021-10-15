import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
// import 'element-plus/dist/index.css';
import './common.css'
import router from './router'
import App from './App.vue'
import store from './store'


const app = createApp(App)
app.use(store)
app.use(ElementPlus, {size:'mini'})
app.use(router)

app.mount('#app')

// 初始化配置
import {initConf} from './common/conf'
initConf(app);

// 全局组件
import Page from '/src/components/common/Page.vue'
app.component("my-page", Page)





