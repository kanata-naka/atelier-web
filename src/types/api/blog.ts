import { GetListResponse } from ".";

export type BlogGetArticleListResponse =
  GetListResponse<BlogGetArticleListResponse.Article>;

export namespace BlogGetArticleListResponse {
  export type Article = {
    /** URL */
    url: string;
    /** タイトル */
    title: string;
    /** 画像の一覧 */
    topImage?: {
      /** 画像のURL */
      url: string;
    };
    /** 作成日時 */
    createdAt: string;
  };
}
