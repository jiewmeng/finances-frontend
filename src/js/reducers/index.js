import {combineReducers} from "redux"
import sbpInvestments from "./sbpInvestments"
import {routerReducer} from "react-router-redux"

const financeApp = combineReducers({
  sbpInvestments,
  router: routerReducer
})

export default financeApp
