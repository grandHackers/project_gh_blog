import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './store/configureStore'

import { checkSessionStatus } from './actions'
import App from './containers/Main'
import AddPostForm from './containers/AddPostForm'
import SignInForm from './containers/SignInForm'
import SignUpForm from './containers/SignUpForm'
import config from '../config/client-config'

var initialStore = {
    currentUser: '',
    posts: []
}

let store = configureStore(initialStore);
// in case of hard refresh, we can retrieve the session again
// for now session just consists of current username
store.dispatch(checkSessionStatus()) 

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={config.SUBDIR_URL + "/"} component={App}/>
      <Route path={config.SUBDIR_URL + "/addPost"} component={AddPostForm}/>
      <Route path={config.SUBDIR_URL + "/signInForm"} component={SignInForm} />
      <Route path={config.SUBDIR_URL + "/signUpForm"} component={SignUpForm} />
    </Router>
  </Provider>,
  document.getElementById('root')
)