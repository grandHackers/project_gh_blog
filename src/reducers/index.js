import { combineReducers } from 'redux'
import { 
    RECEIVE_POSTS, 
    RECEIVE_CREATED_POST, 
} from '../actions';

const posts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
        return action.posts
    case RECEIVE_CREATED_POST:
        return [
            ...state,
            action.post
        ]
    default:
        // ignore REQUEST_* actions for now
        return state
  }
}

const currentUser = ( state = 'erikay', action ) => {
    switch (action.type) {
        // TODO add more actions!
        case 'blarg': 
            return action.blarg
        default:
            return state
    }
}

const rootReducer = combineReducers({
    posts,
    currentUser
})

export default rootReducer