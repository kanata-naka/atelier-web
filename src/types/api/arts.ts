import { Restrict } from "@/types";
import { GetListResponse, GetListRequest } from "@/types/api";

export type ArtGetListRequest = GetListRequest & {
  /** タグ */
  tag?: string;
  /** 公開範囲 */
  restrict?: Restrict[];
  /** 最後のID（自動スクロールで使用） */
  lastId?: string;
};

export type ArtGetListResponse = GetListResponse<ArtGetResponse> & {
  /** 最後まで取得されたか */
  fetchedAll: boolean;
};

export type ArtGetResponse = {
  /** ID */
  id: string;
  /** タイトル */
  title: string;
  /** タグ一覧 */
  tags?: string[];
  /** 画像一覧 */
  images: ArtGetResponse.Image[];
  /** 説明 */
  description?: string;
  /** 公開範囲 */
  restrict: Restrict;
  /** 作成日時 */
  createdAt: number;
  /** 更新日時 */
  updatedAt: number;
};

export namespace ArtGetResponse {
  export type Image = {
    /** ストレージ上のパス */
    name: string;
    /** 画像のURL */
    url: string;
    /** サムネイル画像のURL */
    thumbnailUrl: {
      /** サムネイル画像（小）のURL */
      small: string;
      /** サムネイル画像（中）のURL */
      medium: string;
    };
  };
}
