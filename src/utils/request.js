import axios from "axios";

const request = axios.create({
    baseURL: 'https://api.aiman.jackyqi.cn',
    timeout: 5000
});

// 因为有跨域携带cookie的需求，所以需要设置withCredentials为true
request.defaults.withCredentials = true;

request.interceptors.request.use(
    config => {
        return config;
    }
);

request.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default request;