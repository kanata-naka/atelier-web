export type SocialAccount = {
  /** SNS名 */
  name: string;
  /** SNSアカウントのURL */
  url: string;
  /** SNSのロゴ画像のURL */
  imageUrl: string;
};

export type Pagination = {
  /** 現在のページ番号 */
  page: number;
  /** 1ページに表示する最大件数 */
  perPage: number;
  /** 総件数 */
  total: number;
};

/** 公開範囲 */
export const Restrict = {
  /** 全体公開 */
  ALL: "0",
  /** サブページのみ */
  LIMITED: "1",
  /** 非公開 */
  PRIVATE: "2",
} as const;

export type Restrict = typeof Restrict[keyof typeof Restrict];
