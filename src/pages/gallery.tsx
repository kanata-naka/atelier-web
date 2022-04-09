import React, { useEffect, useCallback } from "react";
import Head from "next/head";
import Router from "next/router";
import { callFunction } from "../common/api";
import { SITE_NAME } from "../common/models";
import { Restrict } from "../types";
import { GetByIdRequest } from "../types/api";
import {
  ArtGetListRequest,
  ArtGetListResponse,
  ArtGetResponse,
} from "../types/api/arts";
import { TagInfoGetResponse } from "../types/api/tagInfo";
import { PageHeading } from "../common/components/elements";
import Header from "../common/components/Header";
import Footer from "../common/components/Footer";
import OgpTags from "../common/components/OgpTags";
import TagInfo from "../modules/gallery/components/TagInfo";
import ArtScroll from "../modules/gallery/components/ArtScroll";
import GalleryModal from "../modules/gallery/components/GalleryModal";
import { FETCH_LIMIT } from "../modules/gallery/models";
import { NextPageContext } from "next";

const Component = ({
  id,
  item,
  tagInfo,
  tag,
  items,
  fetchedAll,
}: {
  id?: string;
  item?: ArtGetResponse;
  tagInfo?: TagInfoGetResponse.TagInfo[];
  tag?: string;
  items?: ArtGetResponse[];
  fetchedAll?: boolean;
}) => {
  useEffect(() => {
    if (item) {
      // モーダルを開く
      GalleryModal.open(item);
    }
    scrollTo(0, 0);
  }, [item, items]);

  const onClose = useCallback(() => {
    Router.push("/gallery");
  }, []);

  return (
    <div>
      <Head>
        <title>{`GALLERY - ${SITE_NAME}`}</title>
      </Head>
      {item ? (
        <OgpTags
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/${id}`}
          ogType="article"
          title={`${item.title} - ${SITE_NAME}`}
          description={item.description}
          ogImage={item.images[0].url}
          twitterCard="summary_large_image"
          twitterImage={item.images[0].url}
        />
      ) : (
        <OgpTags
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/gallery`}
          ogType="blog"
          title={`GALLERY - ${SITE_NAME}`}
          twitterCard="summary_card"
        />
      )}
      <Header />
      <PageHeading>GALLERY</PageHeading>
      {tagInfo && <TagInfo tagInfo={tagInfo} />}
      {item && <GalleryModal.Component onClose={onClose} />}
      {items && (
        <ArtScroll
          tag={tag}
          items={items}
          fetchedAll={fetchedAll!}
          fetchLimit={FETCH_LIMIT}
        />
      )}
      <Footer />
    </div>
  );
};

Component.getInitialProps = async ({ query }: NextPageContext) => {
  if (query.id) {
    const response = await callFunction<GetByIdRequest, ArtGetResponse>(
      "arts-getById",
      {
        id: String(query.id),
      }
    );
    return {
      id: response.data.id,
      item: response.data,
    };
  } else {
    // 全てのタグとその件数を取得する
    let tagInfo: TagInfoGetResponse.TagInfo[] = [];
    try {
      const response = await callFunction<GetByIdRequest, TagInfoGetResponse>(
        "tagInfo-getById",
        {
          id: "arts",
        }
      );
      tagInfo = response.data.info;
    } catch (error) {
      console.error(error);
    }
    // イラスト一覧（最初の${FETCH_LIMIT}件）を取得する
    let items: ArtGetResponse[] = [];
    let fetchedAll = false;
    try {
      const response = await callFunction<
        ArtGetListRequest,
        ArtGetListResponse
      >("arts-get", {
        tag: query.tag && String(query.tag),
        restrict: [Restrict.ALL, Restrict.LIMITED],
        limit: FETCH_LIMIT,
      });
      items = response.data.result;
      fetchedAll = response.data.fetchedAll;
    } catch (error) {
      console.error(error);
    }
    return {
      tagInfo,
      tag: query.tag && String(query.tag),
      items,
      fetchedAll,
    };
  }
};

export default Component;
