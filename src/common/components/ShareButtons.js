import React, { useCallback } from "react";
import {
  reloadTwitterWidgets,
  reloadFacebookWidgets,
  reloadLINEItButtons
} from "../../utils/vendorUtil";
import { SITE_NAME, TWITTER_USERNAME } from "../models";

/**
 * シェアボタン
 */
export default ({ url, title, classPrefix = "" }) => {
  return (
    <ul className={`${classPrefix}share-buttons`}>
      <TwitterShareButton classPrefix={classPrefix} url={url} title={title} />
      <FacebookShareButton classPrefix={classPrefix} url={url} />
      <LINEShareButton classPrefix={classPrefix} url={url} />
    </ul>
  );
};

const TwitterShareButton = ({ classPrefix, url, title }) => {
  const elementRef = useCallback(element => {
    if (!element) {
      return;
    }
    // コンポーネントが変更されたらリロードする
    reloadTwitterWidgets(element);
  }, []);

  return (
    <li
      key={url}
      className={`${classPrefix}share-buttons-item`}
      ref={elementRef}>
      <a
        href="https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw"
        className="twitter-hashtag-button"
        data-text={title ? `${title} - ${SITE_NAME}` : SITE_NAME}
        data-url={url}
        data-related={TWITTER_USERNAME}
        data-lang="ja"
        data-show-count="false">
        Tweet
      </a>
    </li>
  );
};

const FacebookShareButton = ({ classPrefix, url }) => {
  const elementRef = useCallback(element => {
    if (!element) {
      return;
    }
    // コンポーネントが変更されたらリロードする
    reloadFacebookWidgets(element);
  }, []);

  return (
    <li
      key={url}
      className={`${classPrefix}share-buttons-item`}
      ref={elementRef}>
      <div
        className="fb-like"
        data-href={url}
        data-width=""
        data-layout="button"
        data-action="like"
        data-size="small"
        data-share="false"></div>
    </li>
  );
};

const LINEShareButton = ({ classPrefix, url }) => {
  const elementRef = useCallback(element => {
    if (!element) {
      return;
    }
    // コンポーネントが変更されたらリロードする
    reloadLINEItButtons();
  }, []);

  return (
    <li
      key={url}
      className={`${classPrefix}share-buttons-item`}
      ref={elementRef}>
      <div
        className="line-it-button"
        data-lang="ja"
        data-type="share-a"
        data-ver="3"
        data-url={url}
        data-color="default"
        data-size="small"
        data-count="false"
        style={{ display: "none" }}></div>
    </li>
  );
};
