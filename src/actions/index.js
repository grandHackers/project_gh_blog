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
        return fetch(url, {
            method: 'POST',
            data: {}
        }).then(response => response.json())
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
    return (dispatch) => {
        dispatch(requestSignUp())
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify(data)
        }).then(response => response.json())
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
        return fetch(config.SUBDIR_URL + "/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
          .then(data => dispatch(signInSuccess(data)))
    }
}

export function requestSignOut() {
    return { type: REQUEST_SIGN_OUT }
}

export function signOut() {
    return (dispatch) => {
        dispatch(requestSignOut())
        return fetch(config.SUBDIR_URL + "/signout", { method: 'POST'})
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
    return function (dispatch) {
        dispatch(requestGetPosts(owner))
        return fetch(config.API_URL + "/posts/" + owner)
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
        dispatch(requestCreatePost(payload))
        return fetch(config.API_URL + '/posts/' + state.currentUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(response => response.json())
          .then(data => 
                dispatch(receiveCreatedPost(data)))
          .catch(error => console.log(error)) 
    }
}

