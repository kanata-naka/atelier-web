/**
 * グローバル変数
 */
export const Globals = {}

/**
 * ページネーションを作成する
 */
export const createPagination = (items, perPage, pageNumber = 1) => {
  return {
    offset: getOffsetByPageNumber(pageNumber, perPage),
    perPage,
    size: items.length
  }
}

/**
 * ページ番号から1件目のオフセットを取得する
 */
export const getOffsetByPageNumber = (pageNumber, perPage) => {
  return perPage * (pageNumber - 1)
}
