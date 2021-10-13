
import axios from 'axios'
import VueAxios from 'vue-axios'
import {utils} from "./utils";
import {ElMessage} from "element-plus";

let initConf = function(app) {
    let g = app.config.globalProperties;

    // axios >>>>>>>>>>
    app.use(VueAxios, axios);

    let myInstance = axios.create({});
    myInstance.defaults.baseURL = "/api"
    myInstance.interceptors.request.use(
        config => {
            let token = localStorage.getItem("my_token");
            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }

            if (config.method === 'post') {
                config.data = utils.stringify(config.data);
            }

            return config;
        },
        err => {
            console.log(err);
            return Promise.reject(err);
        }
    );
    app.config.globalProperties.myInstance = myInstance;




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
            // eslint-disable-next-line no-prototype-builtins
            if (config.headers.hasOwnProperty("hideLoading")) {
                delete config.headers.hideLoading;
            }

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
            let requestHideLoading = true;
            if (response.config.headers.hideLoading === false) {
                requestHideLoading = false;
            }

            if (response.headers.authorization) {
                let token = response.headers.authorization;
                localStorage.setItem("my_token", token);
            }
            if (g.loadingAuto && g.hideLoading && requestHideLoading) {
                g.hideLoading()
            }
            const BUSINESS_EXCEPTION = 4000;
            if (response.data.code === BUSINESS_EXCEPTION) {
                ElMessage.warning(response.data.content);
                return Promise.reject(response);
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
            g.hideLoading();
            return Promise.reject(error);
        }
    );
}



export {initConf};