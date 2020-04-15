/**
 * グローバル変数
 */
export const Globals = {}

export const createPagination = (page, perPage, total) => {
  return { page, perPage, total }
}

export const getItemsByPage = (items, page, perPage) => {
  const offset = perPage * (page - 1)
  const itemsByPage = items.slice(offset, offset + perPage)
  return [...itemsByPage]
}
