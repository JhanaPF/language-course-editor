import axios from 'axios';
import { AxiosResponse } from "axios";
axios.defaults.withCredentials = true;

if (!process.env.REACT_APP_API_URL) {
    throw new Error("REACT_APP_API_URL is not defined in your environment variables.");
}
const apiUrl = process.env.REACT_APP_API_URL;

import { AxiosCallback, AxiosErrCbk, Endpoint, UnknownObj } from '../types/request';

function axiosRequest(url: string, options: object, successCbk?: AxiosCallback, errorCbk?: AxiosErrCbk) {

    axios({ url: apiUrl + url, headers: { Accept: 'application/json' }, ...options })
        .then(res => {
            //const log = console.log;
            //log('Request success: ', res)
            if (successCbk) successCbk(res);
        })
        .catch(err => {
            if (!err) return;

            if (err.response) {
                console.error('Request error: ', err, err.response.status);
                if (err.response.status === 401) sessionStorage.setItem('isLoggedIn', 'false');
                if (errorCbk) errorCbk(err);
            } else console.error(err);
        });
}

export function verifyToken(successCbk: AxiosCallback, errorCbk: AxiosErrCbk) { // Check local stored token
    axiosRequest('auth/token', { method: 'POST' }, successCbk, errorCbk);
}


export function get(endpoint: Endpoint, data: UnknownObj, successCbk: AxiosCallback, errorCbk: AxiosErrCbk) {
    axiosRequest(endpoint, { method: 'GET', params: data }, successCbk, errorCbk);
}

export function put(endpoint: Endpoint, data: UnknownObj | FormData, successCbk: AxiosCallback, errorCbk?: AxiosErrCbk) {
    axiosRequest(endpoint, { method: 'PUT', data, headers: { 'Content-Type': 'multipart/form-data' } }, successCbk, errorCbk);
}

export function post(endpoint: Endpoint, data: UnknownObj, successCbk: AxiosCallback, errorCbk: AxiosErrCbk) {
    axiosRequest(endpoint, { method: 'POST', data }, successCbk, errorCbk);
}

export function del(endpoint: Endpoint, data: UnknownObj, successCbk: AxiosCallback, errorCbk: AxiosErrCbk) {
    axiosRequest(endpoint, { method: 'DELETE', data }, successCbk, errorCbk);
}
