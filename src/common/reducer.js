import { handleActions } from "redux-actions"
import { fetchStart, fetchSucceeded, fetchFailed } from "./actions"

const initialState = {
  fetching: {}
}

export default handleActions(
  {
    [fetchStart]: (state, action) => ({
      ...state,
      ...{ fetching: updateFetching(state.fetching, action.payload, true) }
    }),
    [fetchSucceeded]: (state, action) => ({
      ...state,
      ...{ fetching: updateFetching(state.fetching, action.payload, false) }
    }),
    [fetchFailed]: (state, action) => ({
      ...state,
      ...{ fetching: updateFetching(state.fetching, action.payload, false) }
    })
  },
  initialState
)

const updateFetching = (fetching, payload, isFetching) => {
  const key = payload.config.key || payload.config.url
  return { ...fetching, ...{ [key]: isFetching } }
}
