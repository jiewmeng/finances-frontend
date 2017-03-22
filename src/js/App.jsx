import React from 'react'
import {createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import createHistory from "history/createBrowserHistory"
import {Route, Switch} from "react-router"
import {NavLink} from "react-router-dom"
import {ConnectedRouter, routerMiddleware} from "react-router-redux"
import {
  Layout,
  NavDrawer,
  Panel,
  AppBar,
} from "react-toolbox"
import {
  IconButton
} from "react-toolbox/lib/button"

import financeApp from "./reducers"
import SbpInvestmentsIndex from "./sbpInvestments/SbpInvestmentsIndex.jsx"
import Http404 from "./Http404.jsx"

const history = createHistory()
const historyMiddleware = routerMiddleware(history)
const store = createStore(
  financeApp,
  applyMiddleware(historyMiddleware)
)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerActive: true
    }
  }

  toggleDrawerActive() {
    this.setState({
      drawerActive: !this.getState("drawerActive")
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Layout>
          <NavDrawer>
            Sidebar
          </NavDrawer>

          <Panel>
            <AppBar
              leftIcon="menu"
              onLeftIconClick={this.toggleDrawerActive}>
            </AppBar>

            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={SbpInvestmentsIndex} />
                <Route component={Http404} />
              </Switch>
            </ConnectedRouter>
          </Panel>
        </Layout>
      </Provider>
    )
  }
}
