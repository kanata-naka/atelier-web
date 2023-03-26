import React from "react";
import { css } from "@emotion/react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

export function matchesMediaQuery(mediaQuery: string) {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(mediaQuery).matches;
}

export function renderMarkdown(source?: string) {
  if (!source) {
    return <span />;
  }
  return (
    <ReactMarkdown
      className="markdown-body"
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkBreaks, remarkGfm]}
      css={css`
        color: inherit !important;

        ul,
        ol {
          list-style: initial !important;
        }
      `}
    >
      {source}
    </ReactMarkdown>
  );
}

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

export function getCurrentScrollTop() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.pageYOffset || document.documentElement.scrollTop;
}
