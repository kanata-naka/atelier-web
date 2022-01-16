import { Pagination } from "../types";

export const createPagination = (
  page: number,
  perPage: number,
  total: number
): Pagination => {
  return { page, perPage, total };
};

export const getItemsByPage = <T,>(
  items: T[],
  page: number,
  perPage: number
) => {
  const offset = perPage * (page - 1);
  const itemsByPage = items.slice(offset, offset + perPage);
  return [...itemsByPage];
};
