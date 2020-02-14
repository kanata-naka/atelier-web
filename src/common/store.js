import { createStore, combineReducers } from "redux"
import commonReducers from "./reducer"

export const initialize = (reducers, isServer, initialState) => {
  const combinedReducer = combineReducers({
    common: commonReducers,
    ...reducers
  })
  const store = createStore(combinedReducer, initialState)
  if (isServer && typeof window === "undefined") {
    return store
  }
  if (!window.store) {
    window.store = store
  }
  return window.store
}
