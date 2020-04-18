import Head from "next/head"
import { SITE_BASE_URL, SITE_NAME, TWITTER_USERNAME } from "../models"

export default ({
  path,
  ogType,
  title,
  description,
  ogImage,
  twitterCard,
  twitterImage
}) => {
  return (
    <Head>
      <meta property="og:url" content={`${SITE_BASE_URL}${path}`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:site" content={`@${TWITTER_USERNAME}`} />
      <meta property="twitter:url" content={`${SITE_BASE_URL}${path}`} />
      <meta property="twitter:title" content={title} />
      {description && (
        <meta property="twitter:description" content={description} />
      )}
      {twitterImage && <meta property="twitter:image" content={twitterImage} />}
    </Head>
  )
}
