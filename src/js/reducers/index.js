import {combineReducers} from "redux"
import sbpInvestments from "./sbpInvestments"
import {routerReducer} from "react-router-redux"

const rootReducer = combineReducers({
  sbpInvestments,
  router: routerReducer
})

export default rootReducer
