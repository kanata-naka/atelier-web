import { TWITTER_USERNAME } from "../../common/models";
import { SocialAccount } from "../../types";

/** カルーセルの画像を切り替える間隔（ミリ秒） */
export const TOP_CAROUSEL_SWITCH_INTERVAL = 7000;

/** 作者名 */
export const AUTHOR_NAME = "彼方なか";
/** 自己紹介 */
export const INTRODUCTION = `版権メインの個人サークル「カナタノアトリエ」、
一次創作オンリーのサークル「old dear place」で活動しています。`;

/** SNSのアカウント一覧 */
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
