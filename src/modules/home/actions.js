import { createAction } from "redux-actions"
import { MODULE_NAME } from "./models"

// カバー画像の一覧を取得する
export const loadTopImages = createAction(MODULE_NAME + "_" + "loadTopImages")
// ブログの記事一覧を取得する
export const loadArticles = createAction(MODULE_NAME + "_" + "loadArticles")
// WORKSの作品一覧を取得する
export const loadWorks = createAction(MODULE_NAME + "_" + "loadWorks")
// GALLERYの作品一覧を取得する
export const loadGallery = createAction(MODULE_NAME + "_" + "loadGallery")
