import fetch from 'isomorphic-fetch'
import config from '../config/client-config.js'
const API_ROOT = config.API_URL

function generatePostRequestConfig(data) {
    var requestConfig = {
        method: 'POST',
        credentials: 'same-origin'
    }
    if (!!data) {
        requestConfig.body = JSON.stringify(data)
        requestConfig.headers = { 'Content-Type': 'application/json' }
    } 
    return requestConfig
}

function generateGetRequestConfig() {
    return {
        method: 'GET',
        credentials: 'same-origin'
    }
} 


export default function callApi(endpoint, method, payload) {
    var method = method.toLowerCase()
    const fullUrl = API_ROOT + endpoint
    
    var requestConfig = {
        method,
        credentials: 'same-origin'
    }

    if (!!payload) {
        requestConfig.body = JSON.stringify(payload)
        requestConfig.headers = { 'Content-Type': 'application/json' }          
    }
    console.log(fullUrl)
    return fetch(fullUrl, requestConfig)
}
