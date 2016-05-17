import fetch from 'isomorphic-fetch'
import process from 'process'

export const REQUEST_SESSION_STATUS = 'REQUEST_SESSION_STATUS'
export const RECEIVE_SESSION_STATUS = 'RECEIVE_SESSION_STATUS'

export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'

export const REQUEST_SIGN_UP = 'REQUEST_SIGN_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'

export const REQUEST_SIGN_OUT = 'REQUEST_SIGN_OUT'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'

export const REQUEST_GET_POSTS = 'REQUEST_GET_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST'
export const RECEIVE_CREATED_POST = 'RECEIVE_CREATED_POST'

import config from '../../config/client-config.js'
//const apiUrl = config.API_URL


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

export function requestSessionStatus() {
    return { type: REQUEST_SESSION_STATUS }
}

export function receiveSessionStatus(status) {
    var user = status.user
    return {
        type: RECEIVE_SESSION_STATUS,
        username: (!!user) ? user.username : ''
    }
}

export function checkSessionStatus() {
    return (dispatch) => {
        dispatch(requestSessionStatus())
        var url = config.SUBDIR_URL + "/checkSession"
        const requestConfig = generatePostRequestConfig()
        return fetch(url, requestConfig).then(response => response.json())
          .then(result => dispatch(receiveSessionStatus(result)) )
    }
}

export function requestSignUp() {
    return { type: REQUEST_SIGN_UP }
}

export function signUpSuccess(user) {
    return { 
        type: SIGN_UP_SUCCESS,
        username: user.username
    }
}

export function signUp(username, password, email, firstname, lastname) {
    const url = config.SUBDIR_URL + '/signup'
    const data = {username, password, email, firstname, lastname}
    const requestConfig = generatePostRequestConfig(data)
    return (dispatch) => {
        dispatch(requestSignUp())
        return fetch(url, requestConfig).then(response => response.json())
          .then(data => dispatch(signUpSuccess(data)))
    }
}


export function requestSignIn(username) {
    return {
        type: REQUEST_SIGN_IN,
        username
    }    
}

export function signInSuccess(user) {
    return {
        type: SIGN_IN_SUCCESS,
        username: user.username || ''
    }   
}

export function signIn(username, password) {
    return (dispatch) => {
        dispatch(requestSignIn(username))
        const data = {username, password} 
        const requestConfig = generatePostRequestConfig(data)
        return fetch(config.SUBDIR_URL + "/signin", requestConfig)
          .then(response => response.json())
          .then(data => dispatch(signInSuccess(data)))
    }
}

export function requestSignOut() {
    return { type: REQUEST_SIGN_OUT }
}

export function signOut() {
    const requestConfig = generatePostRequestConfig()
    return (dispatch) => {
        dispatch(requestSignOut())
        return fetch(config.SUBDIR_URL + "/signout", requestConfig) 
          .then(dispatch(signOutSuccess()))
    }    
}

export function signOutSuccess() {
    return { type: SIGN_OUT_SUCCESS }
}


/*  Post actions  */
export function requestGetPosts(owner) {
  return {
    type: REQUEST_GET_POSTS,
    owner
  }
}

export function receivePosts(owner, data) {
  return {
    type: RECEIVE_POSTS,
    owner,
    posts: data,
    receivedAt: Date.now()
  }
}

export function fetchPosts(owner) {
    /* Fetches posts belonging to some owner */
    const requestConfig = generateGetRequestConfig()
    return function (dispatch) {
        dispatch(requestGetPosts(owner))
        return fetch(config.API_URL + "/posts/" + owner, requestConfig)
            .then(response => response.json())
            .then(data => 
                  dispatch(receivePosts(owner, data)))
            .catch(error => console.log(error)) 
    }
}

export function requestCreatePost(post) {
    return {
        type: REQUEST_CREATE_POST,
        post: post
    }
}

export function receiveCreatedPost(data) {
    // receives the data of the post that was just created
    // earlier by the current user
    return {
        type: RECEIVE_CREATED_POST,
        post: data,
        receivedAt: Date.now()
    }
}

export function createPost(title, content) {
    // For now assuming that user is creating a post
    // only on their own blog, so not doing any validation here.
    return function (dispatch, getState) {
        const state = getState()
        var payload = {
            owner: state.currentUser,
            title,
            content
        }
        const requestConfig = generatePostRequestConfig(payload)
        dispatch(requestCreatePost(payload))
        return fetch(config.API_URL + '/posts/' + state.currentUser, requestConfig)
          .then(response => response.json())
          .then(data => 
                dispatch(receiveCreatedPost(data)))
          .catch(error => console.log(error)) 
    }
}

