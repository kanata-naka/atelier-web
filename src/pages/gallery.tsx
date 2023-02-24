import React, { useEffect } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import { callFunction } from "@/api/firebase";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import PageHeading from "@/components/common/PageHeading";
import ArtScroll from "@/components/gallery/ArtScroll";
import TagList from "@/components/gallery/TagList";
import { ART_SCROLL_FETCH_LIMIT, SITE_NAME } from "@/constants";
import { Restrict } from "@/constants";
import { GetByIdRequest } from "@/types/api";
import { ArtGetListRequest, ArtGetListResponse, ArtGetResponse } from "@/types/api/arts";
import { TagInfoGetResponse } from "@/types/api/tagInfo";

function Page({
  tagInfo,
  tag,
  items,
  fetchedAll,
}: {
  tagInfo: TagInfoGetResponse.TagInfo[];
  tag?: string;
  items: ArtGetResponse[];
  fetchedAll: boolean;
}) {
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
      <ArtScroll tag={tag} items={items} fetchedAll={fetchedAll} fetchLimit={ART_SCROLL_FETCH_LIMIT} />
      <Footer />
    </div>
  );
}

Page.getInitialProps = async function ({ query }: NextPageContext) {
  const result = await Promise.all([
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
