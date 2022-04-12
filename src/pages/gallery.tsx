import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { callFunction } from "../common/api";
import { PageHeading } from "../common/components/elements";
import Footer from "../common/components/Footer";
import Header from "../common/components/Header";
import OgpTags from "../common/components/OgpTags";
import { SITE_NAME } from "../common/models";
import GalleryScroll from "../modules/gallery/components/GalleryScroll";
import TagInfo from "../modules/gallery/components/TagInfo";
import { GALLERY_SCROLL_FETCH_LIMIT } from "../modules/gallery/models";
import { Restrict } from "../types";
import { GetByIdRequest } from "../types/api";
import {
  ArtGetListRequest,
  ArtGetListResponse,
  ArtGetResponse,
} from "../types/api/arts";
import { TagInfoGetResponse } from "../types/api/tagInfo";

const Page: NextPage<{
  tagInfo: TagInfoGetResponse.TagInfo[];
  tag?: string;
  items: ArtGetResponse[];
  fetchedAll: boolean;
}> = ({ tagInfo, tag, items, fetchedAll }) => {
  useEffect(() => {
    scrollTo(0, 0);
  }, [items]);

  return (
    <div>
      <Head>
        <title>{`GALLERY - ${SITE_NAME}`}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/gallery`}
        ogType="blog"
        title={`GALLERY - ${SITE_NAME}`}
        twitterCard="summary_card"
      />
      <Header />
      <PageHeading>GALLERY</PageHeading>
      <TagInfo tagInfo={tagInfo} />
      <GalleryScroll
        tag={tag}
        items={items}
        fetchedAll={fetchedAll}
        fetchLimit={GALLERY_SCROLL_FETCH_LIMIT}
      />
      <Footer />
    </div>
  );
};

Page.getInitialProps = async ({ query }) => {
  const result = await Promise.all([
    // 全てのタグとその件数を取得する
    callFunction<GetByIdRequest, TagInfoGetResponse>("tagInfo-getById", {
      id: "arts",
    })
      .then((response) => {
        return response.data.info;
      })
      .catch((error) => {
        console.error(error);
        return [];
      }),
    // イラスト一覧（最初の${GALLERY_SCROLL_FETCH_LIMIT}件）を取得する
    callFunction<ArtGetListRequest, ArtGetListResponse>("arts-get", {
      tag: query.tag && String(query.tag),
      restrict: [Restrict.ALL, Restrict.LIMITED],
      limit: GALLERY_SCROLL_FETCH_LIMIT,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return { result: [], fetchedAll: false };
      }),
  ]);
  return {
    tagInfo: result[0],
    tag: query.tag && String(query.tag),
    items: result[1].result,
    fetchedAll: result[1].fetchedAll,
  };
};

export default Page;
