import React, { useCallback } from "react";
import { SerializedStyles } from "@emotion/react";
import { SITE_NAME, TWITTER_USERNAME } from "@/constants";
import { reloadTwitterWidgets, reloadFacebookWidgets, reloadLINEItButtons } from "@/utils/vendorUtil";

function ShareButtons({
  url,
  title,
  style,
  buttonStyle,
}: {
  url: string;
  title?: string;
  style: SerializedStyles;
  buttonStyle: SerializedStyles;
}) {
  return (
    <ul css={style}>
      <TwitterShareButton url={url} title={title} style={buttonStyle} />
      <FacebookShareButton url={url} style={buttonStyle} />
      <LINEShareButton url={url} style={buttonStyle} />
    </ul>
  );
}

function TwitterShareButton({ url, title, style }: { url: string; title?: string; style: SerializedStyles }) {
  const elementRef = useCallback((element: Element | null) => {
    if (!element) {
      return;
    }
    // コンポーネントが変更されたらリロードする
    reloadTwitterWidgets(element);
  }, []);

  return (
    <li key={url} ref={elementRef} css={style}>
      <a
        href="https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw"
        className="twitter-hashtag-button"
        data-text={title ? `${title} - ${SITE_NAME}` : SITE_NAME}
        data-url={url}
        data-related={TWITTER_USERNAME}
        data-lang="ja"
        data-show-count="false"
      >
        Tweet
      </a>
    </li>
  );
}

function FacebookShareButton({ url, style }: { url: string; style: SerializedStyles }) {
  const elementRef = useCallback((element: Element | null) => {
    if (!element) {
      return;
    }
    // コンポーネントが変更されたらリロードする
    reloadFacebookWidgets(element);
  }, []);

  return (
    <li key={url} ref={elementRef} css={style}>
      <div
        className="fb-like"
        data-href={url}
        data-width=""
        data-layout="button"
        data-action="like"
        data-size="small"
        data-share="false"
      ></div>
    </li>
  );
}

function LINEShareButton({ url, style }: { url: string; style: SerializedStyles }) {
  const elementRef = useCallback((element: Element | null) => {
    if (!element) {
      return;
    }
    // コンポーネントが変更されたらリロードする
    reloadLINEItButtons();
  }, []);

  return (
    <li key={url} ref={elementRef} css={style}>
      <div
        className="line-it-button"
        data-lang="ja"
        data-type="share-a"
        data-ver="3"
        data-url={url}
        data-color="default"
        data-size="small"
        data-count="false"
        style={{ display: "none" }}
      ></div>
    </li>
  );
}

export default ShareButtons;
