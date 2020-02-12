import { createAction } from "redux-actions"
import { MODULE_NAME } from "./models"

// トップ画像の一覧を取得する
export const loadTopImages = createAction(MODULE_NAME + "_" + "loadTopImages")
// 最新記事の一覧を取得する
export const loadLatestArticles = createAction(
  MODULE_NAME + "_" + "loadLatestArticles"
)
// 最近の作品一覧を取得する
export const loadRecentWorks = createAction(
  MODULE_NAME + "_" + "loadRecentWorks"
)
// 最近のイラスト一覧を取得する
export const loadRecentArts = createAction(MODULE_NAME + "_" + "loadRecentArts")
