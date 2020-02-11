import { handleActions } from "redux-actions"
import { loadTopImages, loadArticles, loadWorks, loadGallery } from "./actions"

const initialState = {
  // カバー画像一覧
  covers: [],
  // ブログの記事一覧
  articles: [],
  // WORKSの作品一覧
  works: [],
  // GALLERYの作品一覧
  gallery: []
}

const handlers = {
  [loadTopImages]: (state, action) => ({
    ...state,
    ...{
      covers: action.payload
    }
  }),
  [loadArticles]: (state, action) => ({
    ...state,
    ...{
      articles: action.payload
    }
  }),
  [loadWorks]: (state, action) => ({
    ...state,
    ...{
      works: action.payload
    }
  }),
  [loadGallery]: (state, action) => ({
    ...state,
    ...{
      gallery: action.payload
    }
  })
}

export default handleActions(handlers, initialState)
