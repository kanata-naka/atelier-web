import { Restrict } from "@/types";
import { GetListRequest, GetListResponse } from "@/types/api";

export type WorkGetListRequest = GetListRequest & {
  /** 公開範囲 */
  restrict?: Restrict[];
  /** ソート */
  sort?: {
    /** ソート対象のカラム */
    column?: "publishedDate" | "createdAt";
    /** ソートの方向 */
    order?: "asc" | "desc";
  };
};

export type WorkGetListResponse = GetListResponse<WorkGetResponse>;

export type WorkGetResponse = {
  /** ID */
  id: string;
  /** タイトル */
  title: string;
  /** 出版日 */
  publishedDate: number;
  /** 画像一覧 */
  images?: WorkGetResponse.Image[];
  /** 説明 */
  description?: string;
  /** 公開範囲 */
  restrict: Restrict;
  /** 作成日時 */
  createdAt: number;
  /** 更新日時 */
  updatedAt: number;
};

export namespace WorkGetResponse {
  export type Image = {
    /** ストレージ上のパス */
    name: string;
    /** 画像のURL */
    url: string;
    /** サムネイル画像のURL */
    thumbnailUrl: {
      /** サムネイル画像（小）のURL */
      small: string;
    };
  };
}
