import { combineReducers } from 'redux'
import { 
    RECEIVE_POSTS, 
    RECEIVE_CREATED_POST,
    RECEIVE_SESSION_STATUS,
    SIGN_IN_SUCCESS,
    SIGN_UP_SUCCESS,
    SIGN_OUT_SUCCESS
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

// TODO add unit test!
export const currentUser = ( state = '', action ) => {
    switch (action.type) {
        case RECEIVE_SESSION_STATUS:
            return action.username
        case SIGN_IN_SUCCESS:
            return action.username
        case SIGN_UP_SUCCESS:
            return action.username
        case SIGN_OUT_SUCCESS:
            return ''
        default:
            return state
    }
}

const rootReducer = combineReducers({
    posts,
    currentUser
})

export default rootReducer