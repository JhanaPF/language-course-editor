import axios from 'axios';
//axios.defaults.withCredentials = true;

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/";
const token = localStorage.getItem('token');
const mail = localStorage.getItem('mail');
const password = localStorage.getItem('password');

function axiosRequest(url, data, options, successCbk, errorCbk) {

    return axios(this.apiUrl + url, { headers: { 'Authorization': token },  ...options})
        .then(res => {
            console.log(res);
            if(successCbk) successCbk(res);
        })
        .catch(err => {
            console.error(err);
            if(errorCbk) errorCbk(err);
        });
}

export function verifyToken (successCbk, errorCbk) { // Potentially token stored locally is no longer valid

    axios.post(this.apiUrl + 'auth/token', { token })
    .then(res => {
        console.log("Token still valid")
        if(res.data.token)
            localStorage.setItem('token', res.data.token);
        if(successCbk)
            successCbk();
    })
    .catch(error => {
        console.log("Token no longer valid, reconnect");
        console.log(error);
        if(errorCbk) errorCbk();
    });
}

export function post(url, data, successCbk, errorCbk, noty=false){
    
    axios.post(
        apiUrl + url, 
        data, 
        { headers: { 'Authorization': token },
    })
    .then(res => {
        console.log(res);
        if(successCbk) successCbk();
    })
    .catch(err => {
        console.log(err);
        if(errorCbk) errorCbk();
    });
}

export function get(url, data, successCbk, errorCbk, noty=false){

    axios.get(apiUrl + url, {  headers: { 'Authorization': token } } )
    .then(res => {
        console.log(res);
        if(successCbk) successCbk(res);
    })
    .catch(err => {
        console.log(err);
        if(errorCbk) errorCbk();
    });
}

export function put(url, data, successCbk, errorCbk, noty=false){

    axiosRequest(
        url, 
        data, 
        {
            method: 'PUT',
            headers: { 
                'Authorization': token,
                'Accept' : 'application/json',
                'withCredentials': true
                //'Content-Type': 'multipart/form-data'
            },
        }, 
        successCbk, 
        errorCbk
    );
}