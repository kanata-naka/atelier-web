import { GetListResponse } from ".";

export type TopImageGetListResponse = GetListResponse<TopImageItem>;

export type TopImageItem = {
  /** ID */
  id: string;
  /** 画像 */
  image: TopImageItem.Image;
  /** サムネイル画像 */
  thumbnailImage: TopImageItem.Image;
  /** 説明 */
  description?: string;
  /** 表示順 */
  order: number;
  /** 作成日時 */
  createdAt: number;
  /** 更新日時 */
  updatedAt: number;
};

export namespace TopImageItem {
  export type Image = {
    /** ストレージ上のパス */
    name: string;
    /** 画像のURL */
    url: string;
  };
}
