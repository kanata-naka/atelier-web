import { createAction } from "redux-actions"

/**  */
export const fetchStart = createAction("api_fetchStart")
/**  */
export const fetchSucceeded = createAction("api_fetchSucceeded")
/**  */
export const fetchFailed = createAction("api_fetchFailed")
