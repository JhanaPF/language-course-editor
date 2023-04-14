import axios from 'axios';
//axios.defaults.withCredentials = true;

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/";
const token = localStorage.getItem('token');
const log = console.log;

function axiosRequest(url, options, successCbk, errorCbk) { 
    log(options)
    return axios({ url:apiUrl + url, headers: { withCredentials: true},  ...options})
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
    axios.post(apiUrl + 'auth/token', { token })
    .then(res => {
        log("Token still valid")
        if(res.data.token)
            localStorage.setItem('token', res.data.token);
        if(successCbk)
            successCbk();
    })
    .catch(error => {
        log("Token no longer valid, reconnect");
        log(error);
        if(errorCbk) errorCbk();
    });
}

export function post(url, data, successCbk, errorCbk, noty=false){
    axiosRequest(url, {method: 'POST', data}, successCbk, errorCbk);
}

export function get(url, data, successCbk, errorCbk, noty=false){
    axios.get(apiUrl + url, {  headers: { 'Authorization': token } } )
    .then(res => {
        log(res);
        if(successCbk) successCbk(res);
    })
    .catch(err => {
        log(err);
        if(errorCbk) errorCbk();
    });
}

export function put(url, data, successCbk, errorCbk, noty=false){

    axiosRequest(
        url, 
        {
            method: 'PUT',
            headers: { 
             //   'Authorization': token,
                'Accept' : 'application/json',
                'withCredentials': true
                //'Content-Type': 'multipart/form-data'
            },
            data: data
        }, 
        successCbk, 
        errorCbk
    );
}