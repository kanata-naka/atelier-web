import { createAction } from "redux-actions"
import { MODULE_NAME } from "./models"

// カバー画像の一覧を表示する
export const showCovers = createAction(MODULE_NAME + "_" + "showCovers")
// ブログの記事一覧を表示する
export const showArticles = createAction(MODULE_NAME + "_" + "showArticles")
// WORKSの作品一覧を表示する
export const showWorks = createAction(MODULE_NAME + "_" + "showWorks")
// GALLERYの作品一覧を表示する
export const showGallery = createAction(MODULE_NAME + "_" + "showGallery")
