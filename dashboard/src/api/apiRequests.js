import axios from 'axios'
axios.defaults.withCredentials = true
if (!process.env.REACT_APP_API_URL) {
    throw new Error("REACT_APP_API_URL is not defined in your environment variables.");
}
const apiUrl = process.env.REACT_APP_API_URL
const log = console.log

function axiosRequest(url, options, successCbk, errorCbk) {

    return axios({ url: apiUrl + url, headers: { Accept: 'application/json' }, ...options })
        .then(res => {
            //log('Request success: ', res)
            if (successCbk) successCbk(res)
        })
        .catch(err => {
            if (!err) return

            if(err.response) {
                console.error('Request error: ', err, err.response.status)
                if (err.response.status === 401) sessionStorage.setItem('isLoggedIn', false)
                if (errorCbk) errorCbk(err)
            } else console.error(err)
        })
}

export function verifyToken(successCbk, errorCbk) { // Check local stored token
    axiosRequest('auth/token', { method: 'POST' }, successCbk, errorCbk)
}


export function get(endpoint, data, successCbk, errorCbk, noty = false) {
    axiosRequest(endpoint, { method: 'GET', params: data }, successCbk, errorCbk)
}

export function put(endpoint, data, successCbk, errorCbk, noty = false) {
    axiosRequest(endpoint, { method: 'PUT', data, headers: { 'Content-Type': 'multipart/form-data' } }, successCbk, errorCbk)
}

export function post(endpoint, data, successCbk, errorCbk, noty = false) {
    axiosRequest(endpoint, { method: 'POST', data }, successCbk, errorCbk)
}

export function del(endpoint, data, successCbk, errorCbk, noty = false) {
    axiosRequest(endpoint, { method: 'DELETE', data }, successCbk, errorCbk)
}
