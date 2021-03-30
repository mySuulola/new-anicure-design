import axios, { AxiosResponse, AxiosError } from "axios";

const URL = "http://ff502a90ede1.ngrok.io"

const instance = axios.create({
    baseURL: 'http://188.166.146.141/api/v1/',
    // baseURL: `${URL}/api/v1/`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
});

export default {
    get(url: string, request?: any) {
        return instance
            .get(url, request)
            .then((response: AxiosResponse) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },
    post(url: string, request: any): any {
        return instance
            .post(url, request)
            .then((response) => {
                return Promise.resolve(response.data)
            })
            .catch((error: AxiosError) => {
                console.log(JSON.stringify(error), 'error calling')
                return Promise.reject(error.response)
            });
    },

    put(url: string, request: any) {
        return instance
            .put(url, request)
            .then((response) => Promise.resolve(response.data))
            .catch((error: AxiosError) => {
                console.log(error, 'error calling')
                return Promise.reject(error.response)
            });    },
    patch(url: string, request: any) {
        return instance
            .patch(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
    delete(url: string, request: any) {
        return instance
            .delete(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
};