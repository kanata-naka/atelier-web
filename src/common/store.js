import { createStore, combineReducers } from "redux"
import commonReducers from "./reducers"

export const initialize = (reducers, isServer, initialState) => {
  const combinedReducers = combineReducers({
    common: commonReducers,
    ...reducers
  })
  const store = createStore(combinedReducers, initialState)
  if (isServer && typeof window === "undefined") {
    return store
  }
  return (window.store = store)
}
