import { GetListResponse } from ".";

export type BlogGetArticleListResponse = GetListResponse<ArticleItem>;

export type ArticleItem = {
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
