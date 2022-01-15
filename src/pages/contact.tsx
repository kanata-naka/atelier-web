import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import { SITE_NAME } from "../common/models";
import Header from "../common/components/Header";
import Footer from "../common/components/Footer";
import OgpTags from "../common/components/OgpTags";

// 環境設定を読み込む
const { publicRuntimeConfig } = getConfig();

const Component = () => {
  return (
    <div>
      <Head>
        <title>CONTACT - {SITE_NAME}</title>
      </Head>
      <OgpTags
        url={`${publicRuntimeConfig.BASE_URL}/contact`}
        ogType="article"
        title={`CONTACT - ${SITE_NAME}`}
        twitterCard="summary_card"
      />
      <Header />
      <div className="under-construction">{"UNDER CONSTRUCTION"}</div>
      <Footer />
    </div>
  );
};

export default Component;
