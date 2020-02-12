import { handleActions } from "redux-actions"
import {
  loadTopImages,
  loadLatestArticles,
  loadRecentWorks,
  loadRecentArts
} from "./actions"

const initialState = {
  // トップ画像の一覧
  topImages: [],
  // 最新記事の一覧
  latestArticles: [],
  // 最近の作品一覧
  recentWorks: [],
  // 最近のイラスト一覧
  recentArts: []
}

const handlers = {
  [loadTopImages]: (state, action) => ({
    ...state,
    ...{
      topImages: action.payload
    }
  }),
  [loadLatestArticles]: (state, action) => ({
    ...state,
    ...{
      latestArticles: action.payload
    }
  }),
  [loadRecentWorks]: (state, action) => ({
    ...state,
    ...{
      recentWorks: action.payload
    }
  }),
  [loadRecentArts]: (state, action) => ({
    ...state,
    ...{
      recentArts: action.payload
    }
  })
}

export default handleActions(handlers, initialState)
