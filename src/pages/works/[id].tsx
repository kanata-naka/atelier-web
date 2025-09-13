import React, { useCallback, useEffect } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import Router from "next/router";
import { callFunction } from "@/api/firebase";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import PageHeading from "@/components/common/PageHeading";
import WorkModal from "@/components/works/WorkModal";
import { SITE_NAME } from "@/constants";
import { GetByIdRequest } from "@/types/api";
import { WorkGetResponse } from "@/types/api/works";

function Page({ item }: { item: WorkGetResponse }) {
  useEffect(() => {
    WorkModal.open(item);
    scrollTo(0, 0);
  }, [item]);

  const onClose = useCallback(() => {
    Router.push("/works");
  }, []);

  return (
    <div>
      <Head>
        <title>{`${item.title} - ${SITE_NAME}`}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/works/${item.id}`}
        ogType="article"
        title={`${item.title} - ${SITE_NAME}`}
        description={item.description}
        ogImage={item.images?.length ? item.images[0].url : undefined}
        twitterCard={item.images?.length ? "summary_large_image" : "summary_card"}
        twitterImage={item.images?.length ? item.images[0].url : undefined}
      />
      <Header />
      <PageHeading>WORKS</PageHeading>
      <WorkModal.Component onClose={onClose} />
      <Footer />
    </div>
  );
}

Page.getInitialProps = async function ({ query }: NextPageContext) {
  const response = await callFunction<GetByIdRequest, WorkGetResponse>("works-getById", {
    id: String(query.id),
  });
  return { item: response.data };
};

export default Page;
