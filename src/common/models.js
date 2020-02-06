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

export const getOffsetByPageNumber = (pageNumber, perPage) => {
  return perPage * (pageNumber - 1)
}
