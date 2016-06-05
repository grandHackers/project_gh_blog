import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import Actions from '../actions'

function filterPosts(postState, deleteId) {
    var remState = postState.slice()
    var idx = remState.findIndex(
        post => post.id === deleteId
    )
    remState.splice(idx, 1)
    return remState
}

export const posts = (state = [], action) => {
  switch (action.type) {
    case Actions.RECEIVE_POSTS:
        return action.posts
    case Actions.RECEIVE_CREATED_POST:
        return [
            action.post,
            ...state,
        ]
    case Actions.EDIT_POST_SUCCESS:
        var remState = filterPosts(state, action.post.id)        
        return [
            action.post, 
            ...remState
        ]
    case Actions.DELETE_POST_SUCCESS:
        var remState = filterPosts(state, action.postId)
        return remState
    default:
        // ignore REQUEST_* actions for now
        return state
  }
}

export const currentUser = ( state = {}, action ) => {
    var userInfo = action.user
    if (!!userInfo) { // user info is present in form of an object
        userInfo.name = userInfo.first_name + " " + userInfo.last_name
    }
    // user info is expected to have id, name, and email
    switch (action.type) {
        case Actions.RECEIVE_SESSION_STATUS:
            return userInfo
        case Actions.SIGN_IN_SUCCESS:
            return userInfo
        case Actions.SIGN_UP_SUCCESS:
            return userInfo
        case Actions.SIGN_OUT_SUCCESS:
            return {}
        case Actions.UPDATE_USERNAME_SUCCESS:
            return userInfo
        default:
            return state
    }
}

const rootReducer = combineReducers({
    currentUser,
    posts,
    form: formReducer,
})

export default rootReducer