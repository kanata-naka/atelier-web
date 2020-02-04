import { handleActions } from "redux-actions"
import { showCovers, showArticles, showWorks, showGallery } from "./actions"

const initialState = {
  // カバー画像一覧
  coverItems: [],
  // ブログの記事一覧
  articles: [],
  // WORKSの作品一覧
  workItems: [],
  // GALLERYの作品一覧
  galleryItems: []
}

const handlers = {
  [showCovers]: (state, action) => ({
    ...state,
    ...{
      coverItems: action.payload
    }
  }),
  [showArticles]: (state, action) => ({
    ...state,
    ...{
      articles: action.payload
    }
  }),
  [showWorks]: (state, action) => ({
    ...state,
    ...{
      workItems: action.payload
    }
  }),
  [showGallery]: (state, action) => ({
    ...state,
    ...{
      galleryItems: action.payload
    }
  })
}

export default handleActions(handlers, initialState)
