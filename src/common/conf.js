
import axios from 'axios'
import VueAxios from 'vue-axios'
import {utils} from "./utils";
import {ElMessage} from "element-plus";

const BASE_URL = "/api";

function getRequestConfig(config) {
    let token = localStorage.getItem("my_token");
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    if (config.method === 'post') {
        config.data = utils.stringify(config.data);
    }
    return config;
}
function getResponse(response) {
    if (response.headers.authorization) {
        let token = response.headers.authorization;
        localStorage.setItem("my_token", token);
    }

    if (response.data.code >= 4000 && response.data.code <= 4099) {
        ElMessage.warning(response.data.content);
        return Promise.reject(response);
    }
    return response;
}
function getResponseError(error) {
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
        else {
            message = error + "\n" + error.response;
        }
    }
    ElMessage.error(message)
    return error;
}


let initConf = function(app) {
    let g = app.config.globalProperties;

    // axios >>>>>>>>>>
    app.use(VueAxios, axios);

    // 不带自动loading的axios
    let commonAxios = axios.create({});
    commonAxios.defaults.baseURL = BASE_URL;
    commonAxios.interceptors.request.use(
        config => {return getRequestConfig(config)},
        err => {console.log(err);return Promise.reject(err)}
    );
    commonAxios.interceptors.response.use(
        response => {return getResponse(response)},
        error => {error = getResponseError(error);return Promise.reject(error)}
    );
    g.commonAxios = commonAxios;


    // 自动使用loading 三个值可调用
    // this.loadingAuto = false; this.showLoading(); this.hideLoading();
    g.loadingAuto = true;
    g._loadingStatus = false;
    g._setShowLoading = function(f) {g.showLoading = f}
    g._setHideLoading = function(f) {g.hideLoading = f}
    g._setLoadingAuto = function(b) {g.loadingAuto = b}

    axios.defaults.baseURL = BASE_URL;
    axios.defaults.paramsSerializer = function(params) {return utils.stringify(params)};
    axios.interceptors.request.use(
        config => {
            if (g.loadingAuto && g.showLoading) {
                g.showLoading(true);
            }
            return getRequestConfig(config);
        },
        err => {
            console.log(err);
            return Promise.reject(err);
        }
    );

    axios.interceptors.response.use(
        response => {
            let requestHideLoading = response.config.headers.hideLoading === false ? false : true;
            if (g.loadingAuto && g.hideLoading && requestHideLoading) {
                g.hideLoading();
            }

            const BUSINESS_EXCEPTION = 4000;
            if (response.data.code === BUSINESS_EXCEPTION) {
                ElMessage.warning(response.data.content);
                g.hideLoading();
                return Promise.reject(response);
            }
            return getResponse(response);
        },
        error => {
            g.hideLoading();
            error = getResponseError(error);
            return Promise.reject(error);
        }
    );
}

export {initConf};

