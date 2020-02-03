import { createStore, combineReducers } from "redux"
import commonReducer from "./reducer"

export const initialize = (reducer, initialState) => {
  const combinedReducer = combineReducers({
    common: commonReducer,
    ...reducer
  })
  if (typeof window === "undefined") {
    return createStore(combinedReducer, initialState)
  } else {
    if (!window.store) {
      window.store = createStore(combinedReducer, initialState)
    }
    return window.store
  }
}
