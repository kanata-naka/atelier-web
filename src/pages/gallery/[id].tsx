import React, { useEffect, useCallback } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { callFunction } from "../../common/api";
import { PageHeading } from "../../common/components/elements";
import Footer from "../../common/components/Footer";
import Header from "../../common/components/Header";
import OgpTags from "../../common/components/OgpTags";
import { SITE_NAME } from "../../common/models";
import GalleryModal from "../../modules/gallery/components/GalleryModal";
import { GetByIdRequest } from "../../types/api";
import { ArtGetResponse } from "../../types/api/arts";

const Page: NextPage<{ item: ArtGetResponse }> = ({ item }) => {
  useEffect(() => {
    // モーダルを開く
    GalleryModal.open(item);
    scrollTo(0, 0);
  }, [item]);

  const onClose = useCallback(() => {
    Router.push("/gallery");
  }, []);

  return (
    <div>
      <Head>
        <title>{`GALLERY - ${SITE_NAME}`}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/${item.id}`}
        ogType="article"
        title={`${item.title} - ${SITE_NAME}`}
        description={item.description}
        ogImage={item.images[0].url}
        twitterCard="summary_large_image"
        twitterImage={item.images[0].url}
      />
      <Header />
      <PageHeading>GALLERY</PageHeading>
      <GalleryModal.Component onClose={onClose} />
      <Footer />
    </div>
  );
};

Page.getInitialProps = async ({ query }) => {
  const response = await callFunction<GetByIdRequest, ArtGetResponse>(
    "arts-getById",
    {
      id: String(query.id),
    }
  );
  return { item: response.data };
};

export default Page;
