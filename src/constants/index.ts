import { SocialAccount } from "@/types";

export const FIREBASE_REGION = "asia-northeast1";

export const SITE_NAME = "カナタノアトリエ";

export const SITE_DESCRIPTION = "イラストレーター「かなたなか」のホームページです。";

export const FANBOX_URL = "https://atelier-kanata.fanbox.cc/";

export const TWITTER_USERNAME = "atelier_kanata";

export const COPYRIGHT = "© 2023 Naka Kanata.";

export const AUTHOR_NAME = "かなたなか";

export const INTRODUCTION = `この度はご覧いただきありがとうございます！<br />ご依頼・お問い合わせは <a href="/contact">CONTACT</a> よりお願いいたします🙇`;

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
    name: "Instagram",
    url: `https://www.instagram.com/knta3s/`,
    imageUrl: "/images/instagram-icon.png",
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
  {
    name: "Bluesky",
    url: `https://bsky.app/profile/atelier-kanata.bsky.social`,
    imageUrl: "/images/bluesky-icon.png",
  },
];

export const Restrict = {
  ALL: "0",
  LIMITED: "1",
  PRIVATE: "2",
} as const;

export const TOP_CAROUSEL_SWITCH_INTERVAL = 10000;

export const ART_SCROLL_FETCH_LIMIT = 12;

export const WORK_LIST_PER_PAGE = 10;

export const WORK_LIST_PAGE_NUMBER_DISPLAY_MAX_RANGE = 7;
