import axios from 'axios';//
import _ from 'lodash';
import CryptoJS from 'crypto-js';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // baseURL: 'http://192.168.1.100:3002',
    withCredentials: true,
    // headers:{'x-request-key': process.env.REACT_APP_REQUEST_KEY}
});

let sha512 = (string, key) => {
    let encode = CryptoJS.SHA512(`${string}|${key}`)
    return encode
}

instance.interceptors.request.use(async config => {
    // config.headers['x-request-key'] = sha512(config.url, process.env.REACT_APP_REQUEST_KEY)
    config.headers['x-request-key'] = process.env.REACT_APP_REQUEST_KEY
    console.log('head', config)
    return config
})

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
    }
);

export default instance;