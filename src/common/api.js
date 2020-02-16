import axios from "axios"
import { fetchStart, fetchSucceeded, fetchFailed } from "./actions"

/**
 * APIを初期化する
 */
export const initializeApi = ({ API_BASE_URL, API_TIMEOUT }) => {
  axios.defaults.baseURL = API_BASE_URL
  axios.defaults.timeout = API_TIMEOUT
}

/**
 * APIを呼び出す
 */
export const fetchApi = async (dispatch, config) => {
  return { data: [] }
  // dispatch(fetchStart({ config }))
  // try {
  //   const response = await axios(config)
  //   dispatch(fetchSucceeded({ response, config }))
  //   return response
  // } catch (error) {
  //   // 呼び出しに失敗した場合
  //   dispatch(fetchFailed({ error, config }))
  //   throw error
  // }
}
