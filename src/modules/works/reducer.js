import { handleActions } from "redux-actions"
import { createSelector } from "reselect"
import { loadWorks, setPage } from "./actions"

const initialState = {
  // 作品一覧
  works: [],
  // ページネーション
  pagination: {}
}

const handlers = {
  [loadWorks]: (state, action) => ({
    ...state,
    ...{
      works: action.payload
    }
  }),
  [setPage]: (state, action) => ({
    ...state,
    ...{
      pagination: action.payload
    }
  })
}

export default handleActions(handlers, initialState)

export const getWorksByPage = createSelector(
  [state => state.works, state => state.pagination],
  (works, pagination) => {
    const worksByPage = works.slice(
      pagination.offset,
      pagination.offset + pagination.perPage
    )
    return [...worksByPage]
  }
)
