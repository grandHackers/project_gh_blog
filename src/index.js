import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/mainPage/View'
import configureStore from './store/configureStore'

var initialStore = {
    currentUser: 'erikay',
    posts: []
}
let store = configureStore(initialStore);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)