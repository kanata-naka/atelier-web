/** 表示するページ番号の配列を取得する */
export function getPageNumberRange(currentPage: number, lastPage: number, maxRange: number) {
  let first: number, last: number;
  if (lastPage < maxRange) {
    first = 1;
    last = lastPage;
  } else if (currentPage <= Math.floor(maxRange / 2) + 1) {
    first = 1;
    last = Math.min(maxRange, lastPage);
  } else if (currentPage >= lastPage - Math.floor(maxRange / 2)) {
    first = Math.max(1, lastPage - maxRange + 1);
    last = lastPage;
  } else {
    first = currentPage - Math.floor(maxRange / 2);
    last = currentPage + Math.floor(maxRange / 2);
  }
  const result: number[] = [];
  for (let page = first; page <= last; page++) {
    result.push(page);
  }
  return result;
}

/** 指定したページで表示する項目を取得する */
export function getItemsByPage<T>(items: T[], page: number, perPage: number) {
  const offset = perPage * (page - 1);
  const itemsByPage = items.slice(offset, offset + perPage);
  return [...itemsByPage];
}
