import Head from "next/head";
import getConfig from "next/config";
import { SITE_NAME } from "../models";

const { publicRuntimeConfig } = getConfig();

/**
 * OGPタグ
 */
export default ({
  url,
  ogType,
  title,
  description,
  ogImage,
  twitterCard,
  twitterImage
}) => {
  return (
    <Head>
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:site" content={`@${publicRuntimeConfig.TWITTER_USERNAME}`} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      {description && (
        <meta property="twitter:description" content={description} />
      )}
      {twitterImage && <meta property="twitter:image" content={twitterImage} />}
    </Head>
  );
};
