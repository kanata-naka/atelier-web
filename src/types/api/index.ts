export type GetListData = {
  /** 一度に取得する最大件数 */
  limit?: number;
};

export type GetByIdData = {
  /** ID */
  id: string;
};

export type GetListResponse<T> = {
  /** 取得結果 */
  result: T[];
};
