import * as AuthActions from './auth'
import * as PostActions from './post'
import * as UserActions from './user'

const Actions = Object.assign({}, AuthActions, PostActions, UserActions)
export default Actions