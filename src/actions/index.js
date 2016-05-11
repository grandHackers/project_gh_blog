import fetch from 'isomorphic-fetch'
import process from 'process'

export const SIGN_IN_USER = 'SIGN_IN_USER'
export const SIGN_OUT_USER = 'SIGN_OUT_USER'

export const REQUEST_GET_POSTS = 'REQUEST_GET_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST'
export const RECEIVE_CREATED_POST = 'RECEIVE_CREATED_POST'

import config from '../../config/config.js'
//const apiUrl = config.API_URL

/*  User actions  */
// TODO add unit test!
export function signInUser(username) {
    return {
        type: SIGN_IN_USER,
        username
    }
}

// TODO add unit test!
export function signOutUser(username) {
    return {
        type: SIGN_OUT_USER, 
        username
    }
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

