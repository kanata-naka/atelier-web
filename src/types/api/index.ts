export type GetListRequest = {
  /** 一度に取得する最大件数 */
  limit?: number;
};

export type GetByIdRequest = {
  /** ID */
  id: string;
};

export type GetListResponse<T> = {
  /** 取得結果 */
  result: T[];
};
