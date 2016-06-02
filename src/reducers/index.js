import { combineReducers } from 'redux'
import Actions from '../actions'


export const posts = (state = [], action) => {
  switch (action.type) {
    case Actions.RECEIVE_POSTS:
        return action.posts
    case Actions.RECEIVE_CREATED_POST:
        return [
            action.post,
            ...state,
        ]
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
    posts,
    currentUser
})

export default rootReducer