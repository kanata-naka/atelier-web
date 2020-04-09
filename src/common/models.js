/**
 * グローバル変数
 */
export const Globals = {}

export const getItemsByPage = (items, page, perPage) => {
  const offset = getOffsetByPage(page, perPage)
  const itemsByPage = items.slice(offset, offset + perPage)
  return [...itemsByPage]
}

const getOffsetByPage = (page, perPage) => {
  return perPage * (page - 1)
}
