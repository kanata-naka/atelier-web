import { handleActions } from "redux-actions"
import { createSelector } from "reselect"
import { fetchWorks, movePage } from "./actions"
import { PER_PAGE } from "./models"

const initialState = {
  // 作品一覧
  items: [],
  // ページネーション
  pagination: {}
}

const handlers = {
  [fetchWorks]: (state, action) => ({
    ...state,
    ...{
      items: action.payload,
      pagination: initializePagination(action.payload, PER_PAGE)
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

/**
 * ページネーションを初期化する
 */
const initializePagination = (items, perPage) => {
  return {
    offset: 0,
    perPage: perPage,
    size: items.length
  }
}

export const getItemsByPage = createSelector(
  [state => state.items, state => state.pagination],
  (items, pagination) => {
    const itemsByPage = items.slice(
      pagination.offset,
      pagination.offset + pagination.perPage
    )
    return [...itemsByPage]
  }
)
