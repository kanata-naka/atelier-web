import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import { callFunction } from "../common/firebase";
import { SITE_NAME, SITE_DESCRIPTION, RESTRICT_ALL } from "../common/models";
import Header from "../common/components/Header";
import Footer from "../common/components/Footer";
import OgpTags from "../common/components/OgpTags";
import ShareButtons from "../common/components/ShareButtons";
import TopCarousel from "../modules/home/components/TopCarousel";
import LatestArticles from "../modules/home/components/LatestArticles";
import About from "../modules/home/components/About";
import RecentWorks from "../modules/home/components/RecentWorks";
import RecentArts from "../modules/home/components/RecentArts";

// 環境設定を読み込む
const { publicRuntimeConfig } = getConfig();

const Component = ({
  topImages,
  /* latestArticles, recentWorks, */ recentArts,
}) => {
  return (
    <div>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
      <OgpTags
        url={`${publicRuntimeConfig.BASE_URL}/`}
        ogType="website"
        title={SITE_NAME}
        description={SITE_DESCRIPTION}
        ogImage="/images/ogp-image.png"
        twitterCard="summary_large_image"
        twitterImage="/images/ogp-twitter-image.png"
      />
      <Header />
      <TopCarousel items={topImages} />
      <div className="dashboard">
        <About />
        {/* <LatestArticles items={latestArticles} /> */}
        <RecentArts items={recentArts} />
      </div>
      {/* <RecentWorks items={recentWorks} /> */}
      <ShareButtons url={`${publicRuntimeConfig.BASE_URL}/`} />
      <Footer />
    </div>
  );
};

Component.getInitialProps = async () => {
  const result = await Promise.all([
    // トップ画像の一覧を取得する
    callFunction("topImages-get")
      .then((response) => {
        return response.data.result;
      })
      .catch((error) => {
        console.error(error);
        return [];
      }),
    // // 最新記事の一覧を取得する
    // callFunction("blog-getArticles", {
    //   page: 1,
    //   limit: 3
    // })
    //   .then(response => {
    //     return response.data.result;
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     return [];
    //   }),
    // 最近のイラスト一覧を取得する
    callFunction("arts-get", {
      limit: 10,
      restrict: [RESTRICT_ALL],
    })
      .then((response) => {
        return response.data.result;
      })
      .catch((error) => {
        console.error(error);
        return [];
      }),
    // // 最近の作品一覧を取得する
    // callFunction("works-get", {
    //   limit: 6,
    //   restrict: [RESTRICT_ALL],
    //   sort: {
    //     // 出版日の降順
    //     column: "publishedDate",
    //     order: "desc"
    //   }
    // })
    //   .then(response => {
    //     return response.data.result;
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     return [];
    //   })
  ]);
  return {
    topImages: result[0],
    // latestArticles: result[1],
    recentArts: result[1],
    // recentWorks: result[3]
  };
};

export default Component;
