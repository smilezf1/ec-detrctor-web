import axios from 'axios'
import router from '../../router'
import Vue from 'vue';
import { config } from 'shelljs';
let v = new Vue();
//环境的切换
if (process.env.NODE_ENV == 'development') {//开发环境
    axios.defaults.baseURL = 'http://192.168.3.58:9980/ec_detector';
} else if (process.env.NODE_ENV == 'debug') { //测试环境
    axios.defaults.baseURL = 'http://192.168.3.58:9980/ec_detector';
} else if (process.env.NODE_ENV == 'production') { //生产环境
    axios.defaults.baseURL = 'http://192.168.3.58:9980/ec_detector';
}
axios.defaults.timeout = 2000000;//设置超时时间
//请求拦截器
axios.interceptors.request.use(config => {
    if (localStorage.getItem("Authorization")) {
        config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config;
}, error => {
    return Promise.reject(error)
})
//响应拦截器
//code:05 用户已失效
let dialog = null;
axios.interceptors.response.use(response => {
    if (response.data.code == '05') {
        if (!dialog) {
            dialog = v.$alert('会话过期,请重新登录', '系统提示', {
                confirmButtonText: '确定',
                type: "warning",
                callback: action => {
                    localStorage.removeItem("Authorization");
                    router.push({ path: '/' });
                }
            })
        }
    }
    if (response.data.code == '99' || response.data.code == '500') {
        v.$notify({ title: "警告", message: response.data.message, type: 'warning', duration: 2000 })
    }
    return response;
}, error => {
    if (!dialog) {
        dialog = v.$alert('请求超时', '系统提示', {
            confirmButtonText: "确定",
            type: 'warning',
            callback: action => {
                localStorage.removeItem('Authorization');
                router.push({ path: '/' })
            }
        })
    }
})
//get请求
export function fetchGet(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then
            (res => {
                resolve(res)
            }, error => {
                reject(error)
            }).catch((error) => {
                reject(error)
            })

    })
}
//post请求
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => { resolve(res) }, error => {
            reject(error)
        }).catch((error) => {
            reject(error)
        })
    })
}
//上传进度条
export function uploadFile(url, params, config) {
    let axiosConfig = {
        url: url,
        method: 'post',
        data: params
    }
    if (config instanceof Object) {
        for (let key in config) {
            axiosConfig[key] = config[key]
        }
    }
    return axios(axiosConfig)
}
export default {
    fetchGet, fetchPost, uploadFile
}
