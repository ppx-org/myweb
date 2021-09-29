import { createApp } from 'vue'
import installElementPlus from './plugins/element'
import 'element-plus/lib/theme-chalk/index.css';
import router from './router'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'


const app = createApp(App)
installElementPlus(app)

app.use(router)
app.mount('#app')
app.use(VueAxios, axios)


// 全局组件
import Page from '/src/components/common/Page.vue'
app.component("my-page", Page)


// axios
axios.defaults.baseURL = "/api"
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem("my_token");
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        config.data = qs.stringify(config.data)
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        if (response.headers.authorization) {
            let token = response.headers.authorization;
            localStorage.setItem("my_token", token);
        }
        console.log(">>>>>>>>>>>>response.data")
        console.log(response.data)
        return response;
    },
    error => {
        // 统一异常处理
        console.log(error);
        let message = "";
        if (error.isAxiosError && error.message == "Network Error") {
            message = "网络异常,URL:" + error.config.url;
        }
        else {
            let data = JSON.stringify(error.response.data);
            message = error + "\n" + data;
        }
        ElMessage.error(message)
        return Promise.reject(error);
    }
);