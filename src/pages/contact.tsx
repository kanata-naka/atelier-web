import React from "react";
import Head from "next/head";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import { SITE_NAME } from "@/constants";

export default function Page() {
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
}
