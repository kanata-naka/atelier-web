import { handleActions } from "redux-actions"
import { fetchCovers, fetchArticles, fetchWorks, fetchGallery } from "./actions"

const initialState = {
  // カバー画像一覧
  covers: [],
  // ブログの記事一覧
  articles: [],
  // WORKSの作品一覧
  works: [],
  // GALLERYの作品一覧
  galleryItems: []
}

const handlers = {
  [fetchCovers]: (state, action) => ({
    ...state,
    ...{
      covers: action.payload
    }
  }),
  [fetchArticles]: (state, action) => ({
    ...state,
    ...{
      articles: action.payload
    }
  }),
  [fetchWorks]: (state, action) => ({
    ...state,
    ...{
      works: action.payload
    }
  }),
  [fetchGallery]: (state, action) => ({
    ...state,
    ...{
      galleryItems: action.payload
    }
  })
}

export default handleActions(handlers, initialState)
