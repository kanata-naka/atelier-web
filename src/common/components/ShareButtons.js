import { SITE_BASE_URL, SITE_NAME, TWITTER_USERNAME } from "../models"

export default ({ path, title, classPrefix = "" }) => {
  return (
    <ul className={`${classPrefix}share-buttons`}>
      <ShareButtonItem classPrefix={classPrefix}>
        <a
          href="https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw"
          className="twitter-hashtag-button"
          data-text={title ? `${title} - ${SITE_NAME}` : SITE_NAME}
          data-url={`${SITE_BASE_URL}${path}`}
          data-related={TWITTER_USERNAME}
          data-lang="ja"
          data-show-count="false">
          Tweet
        </a>
      </ShareButtonItem>
      <ShareButtonItem classPrefix={classPrefix}>
        <div
          className="fb-like"
          data-href={`${SITE_BASE_URL}${path}`}
          data-width=""
          data-layout="button"
          data-action="like"
          data-size="small"
          data-share="false"></div>
      </ShareButtonItem>
      <ShareButtonItem classPrefix={classPrefix}>
        <div
          className="line-it-button"
          data-lang="ja"
          data-type="share-a"
          data-ver="3"
          data-url={`${SITE_BASE_URL}${path}`}
          data-color="default"
          data-size="small"
          data-count="false"
          style={{ display: "none" }}></div>
        {/** <div
        className="line-it-button"
        data-lang="ja"
        data-type="like"
        data-url="https://social-plugins.line.me/ja/how_to_install#lineitbutton"
        style={{ display: "none" }}></div> */}
      </ShareButtonItem>
    </ul>
  )
}

const ShareButtonItem = ({ classPrefix, children }) => {
  return <li className={`${classPrefix}share-buttons-item`}>{children}</li>
}
