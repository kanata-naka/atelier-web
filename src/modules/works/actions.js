import { createAction } from "redux-actions"
import { MODULE_NAME } from "./models"

// 作品一覧を取得する
export const loadWorks = createAction(MODULE_NAME + "_" + "loadWorks")
// ページを移動する
export const movePage = createAction(MODULE_NAME + "_" + "movePage")
