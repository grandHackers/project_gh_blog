import fetch from 'isomorphic-fetch'
import { generateGetRequestConfig, generatePostRequestConfig } from './util.js'
import callApi from '../api'
import config from '../../config/client-config.js'

export const REQUEST_GET_POSTS = 'REQUEST_GET_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST'
export const RECEIVE_CREATED_POST = 'RECEIVE_CREATED_POST'

function requestGetPosts(ownerId) {
  return {
    type: REQUEST_GET_POSTS,
    ownerId
  }
}

function receivePosts(ownerId, data) {
  return {
    type: RECEIVE_POSTS,
    ownerId,
    posts: data,
    receivedAt: Date.now()
  }
}

export function fetchPosts(owner) {
    /* Fetches posts belonging to some owner */
    const requestConfig = generateGetRequestConfig()
    return function (dispatch) {
        dispatch(requestGetPosts(owner))
        return fetch(config.API_URL + "/posts?owner=" + owner, requestConfig)
            .then(response => response.json())
            .then(data => 
                  dispatch(receivePosts(owner, data)))
            .catch(error => console.log(error)) 
    }
}

function requestCreatePost(post) {
    return {
        type: REQUEST_CREATE_POST,
        post: post
    }
}

function receiveCreatedPost(data) {
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
    return (dispatch, getState) => {
        var payload = { title, content }
        dispatch(requestCreatePost(payload))
        //const requestConfig = generatePostRequestConfig(payload)
        return callApi('/posts', 'POST', payload)
          .then(response => response.json())
          .then(data => { 
                // Note: (This is subject to change)
                // we expect to get error field when error occurs
                // change server side code accordingly          
                if (!data.error) {
                    dispatch(receiveCreatedPost(data))
                    return Promise.resolve()                    
                } else {
                    const errorText = data.error
                    return Promise.reject(errorText)
                } 
        }) 
    }
}

export const REQUEST_EDIT_POST = "REQUEST_EDIT_POST"
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS"
export const EDIT_POST_FAILURE = "EDIT_POST_FAILURE"

function requestEditPost(postId, title, content) {
    return {
        type: REQUEST_EDIT_POST,
        postId,
        title,
        content
    }
}

function editPostSuccess(post) {
    return {
        type: EDIT_POST_SUCCESS,
        post
    }
}

function editPostFailure() {
    return {
        type: EDIT_POST_FAILURE
    }
}

export function editPost(postId, title, content) {
    return (dispatch, getState) => {
        var payload = { title, content }
        dispatch(requestEditPost(postId, title, content))
        return callApi(`/posts/${postId}`, 'PUT', payload)
            .then(response => {
                debugger;
                if (response.ok) {
                    return response.json()
                } else {
                    return Promise.reject(response.json())
                }
            })
            .then(data => {
                dispatch(editPostSuccess(data))
                return Promise.resolve(data)       
            })
            .catch(errData => {
                dispatch(editPostFailure())
                const errText = errData.error
                console.log(errText) 
                return Promise.reject(errText)                
            })
    }
}


export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'

const requestDeletePost = postId => { 
    return {
        type: REQUEST_DELETE_POST,
        postId 
    } 
}

const deletePostSuccess = postId => {
    return {
        type: DELETE_POST_SUCCESS,
        postId
    }
}

const deletePostFailure = postId => {
    return {
        type: DELETE_POST_FAILURE,
        postId
    }
}

//
export function deletePost(postId) {
    return function (dispatch, getState) {
        dispatch(requestDeletePost(postId))
        callApi(`/posts/${postId}`, 'DELETE')
            .then(response => {
                if (response.status === 200) {
                    dispatch(deletePostSuccess(postId))
                    return Promise.resolve()
                } else {
                    dispatch(deletePostFailure(postId))
                    return Promise.reject()
                }
            })
            .catch(error => console.error(error))
    }
}

export function getPost(postId) {
    // TODO add request, success, and failure action types!
    return function (dispatch, getState) {
        callApi(`/posts/${postId}`, 'GET')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else { 
                    return Promise.reject(response.statusText)
                }
            })
    }
}