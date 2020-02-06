import { handleActions } from "redux-actions"
import { createSelector } from "reselect"
import { createPagination } from "../../common/models"
import { fetchWorks, movePage } from "./actions"
import { PER_PAGE } from "./models"

const initialState = {
  // 作品一覧
  works: [],
  // ページネーション
  pagination: {}
}

const handlers = {
  [fetchWorks]: (state, action) => ({
    ...state,
    ...{
      works: action.payload,
      pagination: createPagination(action.payload, PER_PAGE)
    }
  }),
  [movePage]: (state, action) => ({
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
