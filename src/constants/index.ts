import { SocialAccount } from "@/types";

/** Firebaseのリージョン */
export const FIREBASE_REGION = "asia-northeast1";

/** サイト名 */
export const SITE_NAME = "カナタノアトリエ";

/** サイトの説明 */
export const SITE_DESCRIPTION = "イラストレーター「彼方なか」のホームページです。";

/** ブログのURL */
export const BLOG_URL = "https://note.com/kanata_naka";

/** Twitterのユーザ名 */
export const TWITTER_USERNAME = "atelier_kanata";

/** コピーライト */
export const COPYRIGHT = "© 2021 Naka Kanata.";

/** 作者名 */
export const AUTHOR_NAME = "彼方なか";

/** 自己紹介 */
export const INTRODUCTION = `版権メインの個人サークル「カナタノアトリエ」、
一次創作オンリーのサークル「old dear place」で活動しています。`;

/** SNSアカウント一覧 */
export const SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    name: "Twitter",
    url: `https://twitter.com/${TWITTER_USERNAME}`,
    imageUrl: "/images/twitter-icon.png",
  },
  {
    name: "pixiv",
    url: `https://www.pixiv.net/users/204608`,
    imageUrl: "/images/pixiv-icon.png",
  },
];

/** 公開範囲 */
export const Restrict = {
  /** 全体公開 */
  ALL: "0",
  /** サブページのみ */
  LIMITED: "1",
  /** 非公開 */
  PRIVATE: "2",
} as const;

/** カルーセルの画像を切り替える間隔（ミリ秒） */
export const TOP_CAROUSEL_SWITCH_INTERVAL = 10000;

/** 無限スクロールの一度に読み込む最大件数 */
export const ART_SCROLL_FETCH_LIMIT = 12;

/** 作品リストの1ページに表示する最大件数 */
export const WORK_LIST_PER_PAGE = 5;

/** 作品リストのページ番号を表示する最大件数 */
export const WORK_LIST_PAGE_NUMBER_DISPLAY_MAX_RANGE = 7;
