import * as marked from "marked";

/**
 * メディアクエリを判定する
 */
export const matchesMediaQuery = mediaQuery => {
  if (typeof window === "undefined") {
    return;
  }
  return window.matchMedia(mediaQuery).matches;
};

/**
 * Markdown形式のテキストを整形する
 */
export const renderMarkdown = src => {
  if (!src) {
    return <span />;
  }
  return (
    <span
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: marked(src, { breaks: true })
      }}></span>
  );
};

/**
 * ページの最後までスクロールした際の位置を取得する
 */
export const getOffsetScrolledToBottom = () => {
  if (typeof window === "undefined") {
    return;
  }
  // ページ全体の高さを取得する
  // ※ブラウザ間の差異をカバーする
  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  return pageHeight - window.innerHeight;
};

/**
 * 現在のスクロール位置を取得する
 */
export const getCurrentScrollTop = () => {
  if (typeof window === "undefined") {
    return;
  }
  return window.pageYOffset || document.documentElement.scrollTop;
};
