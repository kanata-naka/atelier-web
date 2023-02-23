import React from "react";
import { marked } from "marked";

/** メディアクエリを判定する */
export function matchesMediaQuery(mediaQuery: string) {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(mediaQuery).matches;
}

/** Markdown形式のテキストを整形する */
export function renderMarkdown(src?: string) {
  if (!src) {
    return <span />;
  }
  return (
    <span
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: marked(src, { breaks: true }),
      }}
    ></span>
  );
}

/** ページの最後までスクロールした際の位置を取得する */
export function getOffsetScrolledToBottom() {
  if (typeof window === "undefined") {
    return null;
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
}

/** 現在のスクロール位置を取得する */
export function getCurrentScrollTop() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.pageYOffset || document.documentElement.scrollTop;
}
