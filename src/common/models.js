/**
 * グローバル変数
 */
export const Globals = {}

export const getOffsetByPage = (page, perPage) => {
  return perPage * (page - 1)
}

export const createPagination = (page, perPage, total) => {
  return { page, perPage, total }
}
