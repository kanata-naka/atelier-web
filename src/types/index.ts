import { Restrict } from "@/constants";

export type PaginationState = {
  /** 現在のページ番号 */
  page: number;
  /** 1ページに表示する最大件数 */
  perPage: number;
  /** 総件数 */
  total: number;
};

export type SocialAccount = {
  /** SNS名 */
  name: string;
  /** SNSアカウントのURL */
  url: string;
  /** SNSのロゴ画像のURL */
  imageUrl: string;
};

export type Restrict = (typeof Restrict)[keyof typeof Restrict];
