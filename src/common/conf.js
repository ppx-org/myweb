
import axios from 'axios'
import VueAxios from 'vue-axios'
import {utils} from "./utils";
import {ElMessage} from "element-plus";

let initConf = function(app) {

    let g = app.config.globalProperties;
    // axios >>>>>>>>>>
    app.use(VueAxios, axios);

    g.loadingAuto = true;
    g.loadingStatus = false;
    g.setShowLoading = function(f) {
        g.showLoading = f
    }
    g.setHideLoading = function(f) {
        g.hideLoading = f
    }
    g.setLoadingAuto = function(v) {
        g.loadingAuto = v;
    }

    axios.defaults.baseURL = "/api"
    axios.defaults.paramsSerializer = function(params) {
        return utils.stringify(params);
    }

    axios.interceptors.request.use(
        config => {
            let token = localStorage.getItem("my_token");
            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }

            if (config.method === 'post') {
                config.data = utils.stringify(config.data);
            }

            if (g.loadingAuto && g.showLoading) {
                app.config.globalProperties.showLoading(true)
            }

            return config;
        },
        err => {
            console.log(err);
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


            if (g.loadingAuto && g.hideLoading) {
                g.hideLoading()
            }
            return response;
        },
        error => {
            // 统一异常处理
            console.log(error);
            let message;
            if (error.isAxiosError && error.message === "Network Error") {
                message = "网络异常,URL:" + error.config.url;
            }
            else {
                if (error.response && error.response.data) {
                    let data = JSON.stringify(error.response.data);
                    message = error + "\n" + data;
                }
                message = error + "\n" + error.response;
            }
            ElMessage.error(message)
            return Promise.reject(error);
        }
    );
}



export {initConf};