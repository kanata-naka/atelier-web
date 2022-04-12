import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { callFunction } from "../common/api";
import Footer from "../common/components/Footer";
import Header from "../common/components/Header";
import OgpTags from "../common/components/OgpTags";
import ShareButtons from "../common/components/ShareButtons";
import { SITE_NAME, SITE_DESCRIPTION } from "../common/models";
import About from "../modules/home/components/About";
import RecentArts from "../modules/home/components/RecentArts";
import RecentWorks from "../modules/home/components/RecentWorks";
import TopCarousel from "../modules/home/components/TopCarousel";
import { TOP_CAROUSEL_SWITCH_INTERVAL } from "../modules/home/model";
import { Restrict } from "../types";
// import { GetListRequest } from "../types/api";
import {
  ArtGetListRequest,
  ArtGetListResponse,
  ArtGetResponse,
} from "../types/api/arts";
// import { BlogGetArticleListResponse } from "../types/api/blog";
import {
  TopImageGetListResponse,
  TopImageGetResponse,
} from "../types/api/topImages";
import {
  WorkGetListRequest,
  WorkGetListResponse,
  WorkGetResponse,
} from "../types/api/works";
// import LatestArticles from "../modules/home/components/LatestArticles";

const Page: NextPage<{
  topImages: TopImageGetResponse[];
  /* latestArticles: BlogGetArticleListResponse.Article[], */ recentWorks: WorkGetResponse[];
  recentArts: ArtGetResponse[];
}> = ({ topImages, /* latestArticles, */ recentWorks, recentArts }) => {
  return (
    <div>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
        ogType="website"
        title={SITE_NAME}
        description={SITE_DESCRIPTION}
        ogImage="/images/ogp-image.png"
        twitterCard="summary_large_image"
        twitterImage="/images/ogp-twitter-image.png"
      />
      <Header />
      <TopCarousel
        items={topImages}
        switchInterval={TOP_CAROUSEL_SWITCH_INTERVAL}
      />
      <div className="dashboard">
        <About />
        {/* <LatestArticles items={latestArticles} /> */}
        <RecentArts items={recentArts} />
      </div>
      <RecentWorks items={recentWorks} />
      <ShareButtons url={`${process.env.NEXT_PUBLIC_BASE_URL}/`} />
      <Footer />
    </div>
  );
};

Page.getInitialProps = async () => {
  const result = await Promise.all([
    // トップ画像の一覧を取得する
    callFunction<never, TopImageGetListResponse>("topImages-get")
      .then((response) => {
        return response.data.result;
      })
      .catch((error): TopImageGetResponse[] => {
        console.error(error);
        return [];
      }),
    // 最新記事の一覧を取得する
    // callFunction<GetListRequest, BlogGetArticleListResponse>(
    //   "blog-getArticles",
    //   {
    //     limit: 3,
    //   }
    // )
    //   .then((response) => {
    //     return response.data.result;
    //   })
    //   .catch((error): BlogGetArticleListResponse.Article[] => {
    //     console.error(error);
    //     return [];
    //   }),
    // 最近のイラスト一覧を取得する
    callFunction<ArtGetListRequest, ArtGetListResponse>("arts-get", {
      restrict: [Restrict.ALL],
      limit: 10,
    })
      .then((response) => {
        return response.data.result;
      })
      .catch((error): ArtGetResponse[] => {
        console.error(error);
        return [];
      }),
    // 最近の作品一覧を取得する
    callFunction<WorkGetListRequest, WorkGetListResponse>("works-get", {
      limit: 6,
      restrict: [Restrict.ALL],
      sort: {
        // 出版日の降順
        column: "publishedDate",
        order: "desc",
      },
    })
      .then((response) => {
        return response.data.result;
      })
      .catch((error): WorkGetResponse[] => {
        console.error(error);
        return [];
      }),
  ]);
  return {
    topImages: result[0],
    // latestArticles: result[1],
    recentArts: result[1],
    recentWorks: result[2],
  };
};

export default Page;
