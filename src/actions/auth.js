import fetch from 'isomorphic-fetch'
import config from '../../config/client-config.js'
import { generateGetRequestConfig, generatePostRequestConfig } from './util.js'

export const REQUEST_SESSION_STATUS = 'REQUEST_SESSION_STATUS'
export const RECEIVE_SESSION_STATUS = 'RECEIVE_SESSION_STATUS'

export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'

export const REQUEST_SIGN_UP = 'REQUEST_SIGN_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'

export const REQUEST_SIGN_OUT = 'REQUEST_SIGN_OUT'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'


function requestSessionStatus() {
    return { type: REQUEST_SESSION_STATUS }
}

function receiveSessionStatus(status) {
    var user = status.user || {}
    return {
        type: RECEIVE_SESSION_STATUS,
        user
    }
}

export function checkSessionStatus() {
    return (dispatch) => {
        dispatch(requestSessionStatus())
        var url = config.BASE_URL + "/checkSession"
        const requestConfig = generatePostRequestConfig()
        return fetch(url, requestConfig).then(response => response.json())
          .then(result => dispatch(receiveSessionStatus(result)) )
    }
}

function requestSignUp() {
    return { type: REQUEST_SIGN_UP }
}

function signUpSuccess(user) {
    return { 
        type: SIGN_UP_SUCCESS,
        user
    }
}

export function signUp(email, password, firstname, lastname, router) {
    // for local signup
    const url = config.BASE_URL + '/signup'
    const data = {email, password, firstname, lastname}
    const requestConfig = generatePostRequestConfig(data)
    return (dispatch) => {
        dispatch(requestSignUp())
        return fetch(url, requestConfig)
            .then(response => {
                if (response.statusCode != 401) {
                    return response.json()                   
                } else {
                    throw "Failed login!"
                }                
            })
            .then(userData => {
                dispatch(signUpSuccess(userData))
                router.push("/@" + userData.username)
            })
            .catch(err => console.log(err)) 
    }
}


function requestSignIn(email) {
    return {
        type: REQUEST_SIGN_IN,
        email
    }    
}

function signInSuccess(user) {
    return {
        type: SIGN_IN_SUCCESS,
        user
    }   
}

export function signIn(email, password, router) {
    // for local signin
    return (dispatch) => {
        dispatch(requestSignIn(email))
        const data = {email, password} 
        const requestConfig = generatePostRequestConfig(data)
        return fetch(config.BASE_URL + "/signin", requestConfig)
            .then(response => {
                if (response.statusCode != 401) {
                    return response.json()                   
                } else {
                    throw "Failed login!"
                }                
            })
            .then(userData => {
                dispatch(signInSuccess(userData))
                console.log(router)
                router.push("/@" + userData.username)
            })
            .catch(err => console.log(err))          
    }
}

function requestSignOut() {
    return { type: REQUEST_SIGN_OUT }
}

export function signOut() {
    const requestConfig = generatePostRequestConfig()
    return (dispatch) => {
        dispatch(requestSignOut())
        return fetch(config.BASE_URL + "/signout", requestConfig) 
          .then(dispatch(signOutSuccess()))
    }    
}

function signOutSuccess() {
    return { type: SIGN_OUT_SUCCESS }
}
