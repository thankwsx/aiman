import axios from "axios";

const request = axios.create({
    baseURL: 'https://api.aiman.jackyqi.cn',
    timeout: 5000
});

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