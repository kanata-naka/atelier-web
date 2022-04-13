import React, { useEffect, useCallback } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { callFunction } from "../../api/firebase";
import { PageHeading } from "../../components/common/elements";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import OgpTags from "../../components/common/OgpTags";
import GalleryModal from "../../components/gallery/GalleryModal";
import { SITE_NAME } from "../../constants";
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
      <GalleryModal onClose={onClose} />
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
