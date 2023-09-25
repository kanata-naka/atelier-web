import { SocialAccount } from "@/types";

export const FIREBASE_REGION = "asia-northeast1";

export const SITE_NAME = "カナタノアトリエ";

export const SITE_DESCRIPTION = "イラストレーター・漫画家「彼方なか」のホームページです。";

export const BLOG_URL = "https://atelier-kanata.fanbox.cc/";

export const CONTACT_URL = "https://atelier-kanata.fanbox.cc/posts/6388900";

export const TWITTER_USERNAME = "atelier_kanata";

export const COPYRIGHT = "© 2021 Naka Kanata.";

export const AUTHOR_NAME = "彼方なか";

export const INTRODUCTION = `版権メインの個人サークル「カナタノアトリエ」、
一次創作オンリーのサークル「old dear place」で活動しています。`;

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
  {
    name: "YouTube",
    url: `https://www.youtube.com/@atelier_kanata`,
    imageUrl: "/images/youtube-icon.png",
  },
  {
    name: "Misskey.io",
    url: `https://misskey.io/@atelier_kanata`,
    imageUrl: "/images/misskey-io-icon.webp",
  },
];

export const Restrict = {
  ALL: "0",
  LIMITED: "1",
  PRIVATE: "2",
} as const;

export const TOP_CAROUSEL_SWITCH_INTERVAL = 10000;

export const ART_SCROLL_FETCH_LIMIT = 12;

export const WORK_LIST_PER_PAGE = 5;

export const WORK_LIST_PAGE_NUMBER_DISPLAY_MAX_RANGE = 7;
