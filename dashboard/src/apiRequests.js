import axios from 'axios';
axios.defaults.withCredentials = true;

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/";
const log = console.log;

function axiosRequest(url, options, successCbk, errorCbk) { 
    //log(options)
    return axios({ url:apiUrl + url, headers: {'Accept' : 'application/json'},  ...options})
        .then(res => {
            log("Request success: ", res);
            if(successCbk) successCbk(res);
        })
        .catch(err => {
            console.error("Request error: ", err);
            if(errorCbk) errorCbk(err);
        });
}

export function verifyToken (successCbk, errorCbk) { // Potentially token stored locally is no longer valid
    axiosRequest('auth/token', {method: 'POST'}, successCbk, errorCbk);
}

export function post(url, data, successCbk, errorCbk, noty=false){
    axiosRequest(url, {method: 'POST', data}, successCbk, errorCbk);
}

export function get(url, data, successCbk, errorCbk, noty=false){
    axiosRequest(url, {method: 'GET', data}, successCbk, errorCbk);
}

export function put(url, data, successCbk, errorCbk, noty=false){
    axiosRequest(url, {method: 'PUT', data: data, headers: { 'Content-Type': 'multipart/form-data'},}, successCbk, errorCbk);
}