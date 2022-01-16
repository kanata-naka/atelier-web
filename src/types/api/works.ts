import { Restrict } from "../";
import { GetListData, GetListResponse } from ".";

export type WorkGetListData = GetListData & {
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

export type WorkGetListResponse = GetListResponse<WorkItem>;

export type WorkItem = {
  /** ID */
  id: string;
  /** タイトル */
  title: string;
  /** 出版日 */
  publishedDate: number;
  /** 画像の一覧 */
  images?: WorkItem.Image[];
  /** 説明 */
  description?: string;
  /** 公開範囲 */
  restrict: Restrict;
  /** 作成日時 */
  createdAt: number;
  /** 更新日時 */
  updatedAt: number;
};

export namespace WorkItem {
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
