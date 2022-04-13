import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { callFunction } from "../api/firebase";
import { PageHeading } from "../components/common/elements";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import OgpTags from "../components/common/OgpTags";
import ArtScroll from "../components/gallery/ArtScroll";
import TagList from "../components/gallery/TagList";
import { SITE_NAME } from "../constants";
import { ART_SCROLL_FETCH_LIMIT } from "../constants/gallery";
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
      <TagList info={tagInfo} />
      <ArtScroll
        tag={tag}
        items={items}
        fetchedAll={fetchedAll}
        fetchLimit={ART_SCROLL_FETCH_LIMIT}
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
    // イラスト一覧（最初の${ART_SCROLL_FETCH_LIMIT}件）を取得する
    callFunction<ArtGetListRequest, ArtGetListResponse>("arts-get", {
      tag: query.tag && String(query.tag),
      restrict: [Restrict.ALL, Restrict.LIMITED],
      limit: ART_SCROLL_FETCH_LIMIT,
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
