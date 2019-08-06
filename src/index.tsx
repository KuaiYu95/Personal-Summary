import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from './redux/store'
import Main from './comtainers/Main'
import * as serviceWorker from './serviceWorker'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <React.Suspense fallback={<div>loading...</div>}>
          <Route path='/' component={Main}></Route>
        </React.Suspense>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
