import React from 'react'
//import { Router, Route, browserHistory } from 'react-router'
import { Router, Route, useRouterHistory } from 'react-router'
import { createHistory } from 'history'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './store/configureStore'

import Actions from './actions'
import App from './containers/Main'
import AddPostForm from './containers/AddPostForm'
import config from '../config/client-config'

var initialStore = {
    currentUser: {},
    posts: []
}

const browserHistory = useRouterHistory(createHistory)({
  basename: config.SUBDIR_URL
})

let store = configureStore(initialStore);
// in case of hard refresh, we can retrieve the session again
// for now session just consists of current username
store.dispatch(Actions.checkSessionStatus()) 

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={"/"}  component={App} />
      <Route path={"/@:owner"} component={App} />
      <Route path={"/addPost"} component={AddPostForm} />
    </Router>
  </Provider>,
  document.getElementById('root')
)