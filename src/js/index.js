import {render} from "react-dom"
import React from "react"
import {createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import createHistory from "history/createBrowserHistory"
import {Route} from "react-router"
import {ConnectedRouter, routerMiddleware} from "react-router-redux"

import financeApp from "./reducers"
import App from "./App.jsx"

const history = createHistory()
const historyMiddleware = routerMiddleware(history)
const store = createStore(
  financeApp,
  applyMiddleware(historyMiddleware)
)

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>
), document.getElementById("app"))
