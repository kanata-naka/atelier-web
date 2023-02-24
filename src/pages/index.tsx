import React from "react";
import Head from "next/head";
import { callFunction } from "@/api/firebase";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import ShareButtons from "@/components/common/ShareButtons";
import About from "@/components/home/About";
// import LatestArticles from "@/components/home/LatestArticles";
import RecentArts from "@/components/home/RecentArts";
import RecentWorks from "@/components/home/RecentWorks";
import TopCarousel from "@/components/home/TopCarousel";
import { SITE_NAME, SITE_DESCRIPTION, TOP_CAROUSEL_SWITCH_INTERVAL } from "@/constants";
import { Restrict } from "@/constants";
// import { GetListRequest } from "@/types/api";
import { ArtGetListRequest, ArtGetListResponse, ArtGetResponse } from "@/types/api/arts";
// import { BlogGetArticleListResponse } from "@/types/api/blog";
import { TopImageGetListResponse, TopImageGetResponse } from "@/types/api/topImages";
import { WorkGetListRequest, WorkGetListResponse, WorkGetResponse } from "@/types/api/works";

function Page({
  topImages,
  /* latestArticles, */ recentWorks,
  recentArts,
}: {
  topImages: TopImageGetResponse[];
  /* latestArticles: BlogGetArticleListResponse.Article[], */ recentWorks: WorkGetResponse[];
  recentArts: ArtGetResponse[];
}) {
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
      <TopCarousel items={topImages} switchInterval={TOP_CAROUSEL_SWITCH_INTERVAL} />
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
}

Page.getInitialProps = async function () {
  const result = await Promise.all([
    callFunction<never, TopImageGetListResponse>("topImages-get")
      .then((response) => {
        return response.data.result;
      })
      .catch((error): TopImageGetResponse[] => {
        console.error(error);
        return [];
      }),
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
