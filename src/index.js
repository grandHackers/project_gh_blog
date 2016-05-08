import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './store/configureStore'
import App from './components/mainPage/Main'
import AddPostForm from './containers/AddPostForm'

var initialStore = {
    currentUser: 'erikay',
    posts: []
}
let store = configureStore(initialStore);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/addPost" component={AddPostForm}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)