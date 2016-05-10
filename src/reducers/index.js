import { combineReducers } from 'redux'
import { 
    RECEIVE_POSTS, 
    RECEIVE_CREATED_POST,
    SIGN_IN_USER 
} from '../actions';

export const posts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
        return action.posts
    case RECEIVE_CREATED_POST:
        return [
            action.post,
            ...state,
        ]
    default:
        // ignore REQUEST_* actions for now
        return state
  }
}

export const currentUser = ( state = undefined, action ) => {
    switch (action.type) {
        case SIGN_IN_USER:
            return action.username
        // TODO do something for signout
        default:
            return state
    }
}

const rootReducer = combineReducers({
    posts,
    currentUser
})

export default rootReducer