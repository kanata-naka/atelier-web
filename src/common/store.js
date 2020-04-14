import { createStore } from "redux"
import reducers from "./reducers"

export const initialize = (isServer, initialState) => {
  const store = createStore(reducers, initialState)
  if (isServer && typeof window === "undefined") {
    return store
  } else {
    if (!window.store) {
      window.store = store
    }
  }
  return store
}
