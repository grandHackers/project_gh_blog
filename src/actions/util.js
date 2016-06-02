export function generatePostRequestConfig(data) {
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


export function generateGetRequestConfig() {
    return {
        method: 'GET',
        credentials: 'same-origin'
    }
}
