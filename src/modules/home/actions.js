import { createAction } from "redux-actions"
import { MODULE_NAME } from "./models"

// カバー画像の一覧を取得する
export const fetchCovers = createAction(MODULE_NAME + "_" + "fetchCovers")
// ブログの記事一覧を取得する
export const fetchArticles = createAction(MODULE_NAME + "_" + "fetchArticles")
// WORKSの作品一覧を取得する
export const fetchWorks = createAction(MODULE_NAME + "_" + "fetchWorks")
// GALLERYの作品一覧を取得する
export const fetchGallery = createAction(MODULE_NAME + "_" + "fetchGallery")
