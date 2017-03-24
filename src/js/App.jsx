import React from 'react'
import {createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import createHistory from "history/createBrowserHistory"
import {Route, Switch} from "react-router"
import {NavLink} from "react-router-dom"
import {ConnectedRouter, routerMiddleware} from "react-router-redux"
import {
  Layout,
  Panel,
  AppBar,
} from "react-toolbox"
import Navigation from "react-toolbox/lib/navigation"

import rootReducer from "./reducers"
import SbpInvestmentsIndex from "./sbpInvestments/SbpInvestmentsIndex.jsx"
import Http404 from "./Http404.jsx"
import "./app.css"

if (module.hot) {
  module.hot.accept("./reducers", () => {
    const nextReducer = require("./reducers")
    store.replaceReducer(nextReducer)
  })
}

const history = createHistory()
const historyMiddleware = routerMiddleware(history)
const store = createStore(
  rootReducer,
  applyMiddleware(historyMiddleware)
)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerActive: false
    }

    this.toggleDrawerActive = this.toggleDrawerActive.bind(this)
  }

  toggleDrawerActive() {
    this.setState({
      drawerActive: !this.state.drawerActive
    })
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
            <Panel>
              <AppBar title="Personal Finance">
                <Navigation type="horizontal">
                  <NavLink to="/" styleName="app-link">
                    SBP Investments
                  </NavLink>
                </Navigation>
              </AppBar>

              <Switch>
                <Route exact path="/" component={SbpInvestmentsIndex} />
                <Route component={Http404} />
              </Switch>
            </Panel>
          </Layout>
        </ConnectedRouter>
      </Provider>
    )
  }
}
