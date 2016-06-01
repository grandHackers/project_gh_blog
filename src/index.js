import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './store/configureStore'

import { Router, Route, useRouterHistory } from 'react-router'
import { createHistory } from 'history'

import Actions from './actions'
import Main from './containers/Main'
import AddPostForm from './containers/AddPostForm'
import config from '../config/client-config'

injectTapEventPlugin()

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
      <Route path={"/"}  component={Main} />
      <Route path={"/@:owner"} component={Main} />
      <Route path={"/addPost"} component={AddPostForm} />
    </Router>
  </Provider>,
  document.getElementById('root')
)