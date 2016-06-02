import fetch from 'isomorphic-fetch'
import { generateGetRequestConfig, generatePostRequestConfig } from './util.js'


export const REQUEST_GET_POSTS = 'REQUEST_GET_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST'
export const RECEIVE_CREATED_POST = 'RECEIVE_CREATED_POST'

import config from '../../config/client-config.js'


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
    return function (dispatch, getState) {
        const state = getState()
        //const ownerId = state.currentUser.id
        //var payload = { ownerId, title, content }
        var payload = { title, content }
        const requestConfig = generatePostRequestConfig(payload)
        dispatch(requestCreatePost(payload))
        return fetch(config.API_URL + '/posts/', requestConfig)
          .then(response => response.json())
          .then(data => 
                dispatch(receiveCreatedPost(data)))
          .catch(error => console.log(error)) 
    }
}

