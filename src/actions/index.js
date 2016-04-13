import fetch from 'isomorphic-fetch'

// ? : Should I create separate action creators that handle
//     when I fetch / create my OWN posts?
// for now just make it simple and assume i'm only fetching my posts...

export const REQUEST_GET_POSTS = 'REQUEST_GET_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST'
export const RECEIVE_CREATED_POST = 'RECEIVE_CREATED_POST'

const apiUrl = ""

export function requestGetPosts(owner) {
  return {
    type: REQUEST_GET_POSTS,
    owner
  }
}

export function receivePosts(owner, data) {
  console.log(data);
  return {
    type: RECEIVE_POSTS,
    owner,
    posts: data,
    receivedAt: Date.now()
  }
}

export function fetchPosts(owner) {
    return function (dispatch) {
        dispatch(requestGetPosts(owner))
        return fetch(apiUrl + "/posts/" + owner)
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
        return fetch(apiUrl + '/posts/' + state.currentUser, {
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

