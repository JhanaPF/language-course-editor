// API REQUESTS apiRequests.js

import axios from 'axios';
axios.defaults.withCredentials = true;
const apiUrl = localStorage.getItem('apiUrl');
const log = console.log;

function axiosRequest(url, options, successCbk, errorCbk) { 
    //log(options)
    return axios({ url:apiUrl + url, headers: {'Accept' : 'application/json'},  ...options})
    .then(res => {
        log("Request success: ", res);
        if(successCbk) successCbk(res.data);
    })
    .catch(err => {
        console.error("Request error: ", err, err.response.status);
        if(err.response.status === 401) sessionStorage.setItem('isLoggedIn', false);
        if(errorCbk) errorCbk(err);
    });
}

export function verifyToken (successCbk, errorCbk) { // Potentially token stored locally is no longer valid
    axiosRequest('auth/token', {method: 'POST'}, successCbk, errorCbk);
}

export function get(url, data, successCbk, errorCbk, noty=false){
    axiosRequest(url, {method: 'GET', params: data}, successCbk, errorCbk);
}

export function put(url, data, successCbk, errorCbk, noty=false){
    axiosRequest(url, {method: 'PUT', data: data, headers: {'Content-Type': 'multipart/form-data'}}, successCbk, errorCbk);
}

export function post(url, data, successCbk, errorCbk, noty=false){
    axiosRequest(url, {method: 'POST', data}, successCbk, errorCbk);
}

export function del(url, data, successCbk, errorCbk, noty=false){
    axiosRequest(url, {method: 'DELETE', data}, successCbk, errorCbk);
}