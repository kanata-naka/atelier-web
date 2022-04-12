import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { callFunction } from "../../common/api";
import { PageHeading } from "../../common/components/elements";
import Footer from "../../common/components/Footer";
import Header from "../../common/components/Header";
import OgpTags from "../../common/components/OgpTags";
import { SITE_NAME } from "../../common/models";
import WorkList from "../../modules/works/components/WorkList";
import { GetByIdRequest } from "../../types/api";
import { WorkGetResponse } from "../../types/api/works";

const Page: NextPage<{ item: WorkGetResponse }> = ({ item }) => {
  useEffect(() => {
    scrollTo(0, 0);
  }, [item]);

  return (
    <div>
      <Head>
        <title>{`WORKS - ${SITE_NAME}`}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/works/${item.id}`}
        ogType="article"
        title={`${item.title} - ${SITE_NAME}`}
        description={item.description}
        ogImage={item.images?.length ? item.images[0].url : undefined}
        twitterCard={
          item.images?.length ? "summary_large_image" : "summary_card"
        }
        twitterImage={item.images?.length ? item.images[0].url : undefined}
      />
      <Header />
      <PageHeading>WORKS</PageHeading>
      <WorkList items={[item]} />
      <Footer />
    </div>
  );
};

Page.getInitialProps = async ({ query }) => {
  const response = await callFunction<GetByIdRequest, WorkGetResponse>(
    "works-getById",
    {
      id: String(query.id),
    }
  );
  return { item: response.data };
};

export default Page;
