/** サイト名 */
export const SITE_NAME = "カナタノアトリエ";
/** 作者名 */
export const AUTHOR_NAME = "彼方ナカ";
/** サイトの説明 */
export const SITE_DESCRIPTION =
  "イラストレーター・漫画家志望の同人作家「彼方ナカ」のホームページです。";
/** 自己紹介 */
export const INTRODUCTION = `版権メインの個人サークル「カナタノアトリエ」、
一次創作オンリーのサークル「old dear place」で活動しています。`;
/** ブログのURL */
export const BLOG_URL = "https://note.com/kanata_noname";
/** Twitterのユーザ名 */
export const TWITTER_USERNAME = "kanata_noname";
/** SNSのアカウント一覧 */
export const SOCIAL_ACCOUNTS = [
  {
    name: "Twitter",
    url: `https://twitter.com/${TWITTER_USERNAME}`,
    imageUrl: "/images/twitter-icon.png"
  },
  {
    name: "pixiv",
    url: `https://www.pixiv.net/users/204608`,
    imageUrl: "/images/pixiv-icon.png"
  }
];
/** コピーライト */
export const COPYRIGHT = "© 2021 Naka Kanata.";

/**
 * ページネーションを生成する
 */
export const createPagination = (page, perPage, total) => {
  return { page, perPage, total };
};

export const getItemsByPage = (items, page, perPage) => {
  const offset = perPage * (page - 1);
  const itemsByPage = items.slice(offset, offset + perPage);
  return [...itemsByPage];
};
