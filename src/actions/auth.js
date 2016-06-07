import fetch from 'isomorphic-fetch'
import config from '../../config/client-config.js'
import { generateGetRequestConfig, generatePostRequestConfig } from './util.js'

export const REQUEST_SESSION_STATUS = 'REQUEST_SESSION_STATUS'
export const RECEIVE_SESSION_STATUS = 'RECEIVE_SESSION_STATUS'

export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'

export const REQUEST_SIGN_UP = 'REQUEST_SIGN_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

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
    return { 
        type: REQUEST_SIGN_UP
    }
}

function signUpSuccess(user) {
    return { 
        type: SIGN_UP_SUCCESS,
        user
    }
}

function signUpFailure() {
    return {
        type: SIGN_UP_FAILURE
    }   
}

// TODO refactor
export function signUp(email, password, firstname, lastname, router) {
    // for local signin
    const url = config.BASE_URL + '/signup'
    const payload = {email, password, firstname, lastname}
    const requestConfig = generatePostRequestConfig(payload)
        
    return (dispatch) => {
        dispatch(requestSignUp())
        return fetch(url, requestConfig)        
            .then(response => response.json())
            .then(data => {
                // we expect to get error field when error occurs
                // change server side code accordingly
                if (!data.error) {
                    dispatch(signUpSuccess(data))
                    router.push("/@" + data.username)
                    return Promise.resolve()
                } else {
                    const errorText = data.error
                    dispatch(signUpFailure())
                    return Promise.reject(errorText)
                }
            })
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

function signInFailure() {
    return {
        type: SIGN_IN_FAILURE
    }   
}


export function signIn(email, password, router) {
    // for local signin
    return (dispatch) => {
        dispatch(requestSignIn(email))
        const data = {email, password}
        var url = config.BASE_URL + "/signin"
        const requestConfig = generatePostRequestConfig(data)
        return fetch(url, requestConfig)        
            .then(response => response.json())
            .then(data => {
                // Note: (This is subject to change)
                // we expect to get error field when error occurs
                // change server side code accordingly
                if (!data.error) {
                    dispatch(signInSuccess(data))
                    router.push("/@" + data.username)
                } else {
                    const errorText = data.error
                    dispatch(signInFailure())
                    return Promise.reject(errorText)
                }
            })
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
