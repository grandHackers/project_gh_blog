import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './store/configureStore'
import App from './containers/Main'
import AddPostForm from './containers/AddPostForm'
import config from '../config/client-config'

var initialStore = {
    currentUser: '',
    posts: []
}
let store = configureStore(initialStore);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={config.SUBDIR_URL} component={App}/>
      <Route path={config.SUBDIR_URL + "/addPost"} component={AddPostForm}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)