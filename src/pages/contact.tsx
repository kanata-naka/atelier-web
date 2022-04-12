import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Footer from "../common/components/Footer";
import Header from "../common/components/Header";
import OgpTags from "../common/components/OgpTags";
import { SITE_NAME } from "../common/models";

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>CONTACT - {SITE_NAME}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/contact`}
        ogType="article"
        title={`CONTACT - ${SITE_NAME}`}
        twitterCard="summary_card"
      />
      <Header />
      <div className="under-construction">{"UNDER CONSTRUCTION"}</div>
      <Footer />
    </div>
  );
};

export default Page;
