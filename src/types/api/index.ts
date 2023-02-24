export type GetListRequest = {
  limit?: number;
};

export type GetByIdRequest = {
  id: string;
};

export type GetListResponse<T> = {
  result: T[];
};
