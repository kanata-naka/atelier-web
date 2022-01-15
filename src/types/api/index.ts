import {
  RESTRICT_ALL,
  RESTRICT_LIMITED,
  RESTRICT_PRIVATE,
} from "../../common/models";

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

const restrictList = [
  RESTRICT_ALL,
  RESTRICT_LIMITED,
  RESTRICT_PRIVATE,
] as const;

/** 公開範囲 */
export type Restrict = typeof restrictList[number];
