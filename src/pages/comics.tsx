import Head from "next/head";
import { callFunction } from "@/api/firebase";
import ComicList from "@/components/comics/ComicList";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import PageHeading from "@/components/common/PageHeading";
import { SITE_NAME } from "@/constants";
import { Restrict } from "@/constants";
import { ComicGetListRequest, ComicGetListResponse, ComicGetResponse } from "@/types/api/comics";

function Page({ items }: { items: ComicGetResponse[] }) {
  return (
    <div>
      <Head>
        <title>{`COMICS - ${SITE_NAME}`}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/comics`}
        ogType="blog"
        title={`COMICS - ${SITE_NAME}`}
        twitterCard="summary_card"
      />
      <Header />
      <PageHeading>COMICS</PageHeading>
      <ComicList items={items} />
      <Footer />
    </div>
  );
}

Page.getInitialProps = async function () {
  const response = await callFunction<ComicGetListRequest, ComicGetListResponse>("comics-get", {
    restrict: [Restrict.ALL, Restrict.LIMITED],
  });
  return { items: response.data.result };
};

export default Page;
