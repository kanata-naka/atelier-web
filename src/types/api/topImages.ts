import { GetListResponse } from "@/types/api";

export type TopImageGetListResponse = GetListResponse<TopImageGetResponse>;

export type TopImageGetResponse = {
  /** ID */
  id: string;
  /** 画像 */
  image: TopImageGetResponse.Image;
  /** サムネイル画像 */
  thumbnailImage: TopImageGetResponse.Image;
  /** 説明 */
  description?: string;
  /** 表示順 */
  order: number;
  /** 作成日時 */
  createdAt: number;
  /** 更新日時 */
  updatedAt: number;
};

export namespace TopImageGetResponse {
  export type Image = {
    /** ストレージ上のパス */
    name: string;
    /** 画像のURL */
    url: string;
  };
}
