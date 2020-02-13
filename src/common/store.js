import { createStore, combineReducers } from "redux"
import commonReducer from "./reducer"

export const initialize = (reducer, initialState) => {
  const combinedReducer = combineReducers({
    common: commonReducer,
    ...reducer
  })
  return createStore(combinedReducer, initialState)
}
