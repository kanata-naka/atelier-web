import React from "react";
import { css } from "@emotion/react";
import Head from "next/head";
import { callFunction } from "@/api/firebase";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import ShareButtons from "@/components/common/ShareButtons";
import About from "@/components/home/About";
import RecentArts from "@/components/home/RecentArts";
import RecentWorks from "@/components/home/RecentWorks";
import TopCarousel from "@/components/home/TopCarousel";
import { SITE_NAME, SITE_DESCRIPTION, TOP_CAROUSEL_SWITCH_INTERVAL } from "@/constants";
import { Restrict } from "@/constants";
import { responsiveBoundaryWidth } from "@/styles";
import { ArtGetListRequest, ArtGetListResponse, ArtGetResponse } from "@/types/api/arts";
import { TopImageGetListResponse, TopImageGetResponse } from "@/types/api/topImages";
import { WorkGetListRequest, WorkGetListResponse, WorkGetResponse } from "@/types/api/works";

function Page({
  topImages,
  recentWorks,
  recentArts,
}: {
  topImages: TopImageGetResponse[];
  recentWorks: WorkGetResponse[];
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
      <div
        css={css`
          display: flex;

          @media (max-width: ${responsiveBoundaryWidth}px) {
            flex-direction: column;
          }
        `}
      >
        <About />
        <RecentArts items={recentArts} />
      </div>
      <RecentWorks items={recentWorks} />
      <ShareButtons
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
        style={css`
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-bottom: 12px;
        `}
        buttonStyle={css`
          :not(:first-child) {
            margin-left: 10px;
          }
        `}
      />
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
      restrict: [Restrict.ALL],
      limit: 6,
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
    recentArts: result[1],
    recentWorks: result[2],
  };
};

export default Page;
