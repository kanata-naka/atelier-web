export type Pagination = {
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

/** 公開範囲 */
export namespace Restrict {
  /** 公開範囲: 全体公開 */
  export const ALL = "0";
  /** 公開範囲: サブページのみ */
  export const LIMITED = "1";
  /** 公開範囲: 非公開 */
  export const PRIVATE = "2";
}

const restrictList = [
  Restrict.ALL,
  Restrict.LIMITED,
  Restrict.PRIVATE,
] as const;

export type Restrict = typeof restrictList[number];
