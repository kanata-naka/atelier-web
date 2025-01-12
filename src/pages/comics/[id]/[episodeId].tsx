import React, { useEffect } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import { callFunction } from "@/api/firebase";
import PageViewer from "@/components/comics/PageViewer";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import { SITE_NAME } from "@/constants";
import { ComicGetResponse, ComicGetByEpisodeIdRequest } from "@/types/api/comics";

function Page({ item, episodeId }: { item: ComicGetResponse; episodeId: string }) {
  useEffect(() => {
    scrollTo(0, 0);
  }, [item]);

  const episode = item.episodes.find((_episode) => _episode.id === episodeId)!;

  return (
    <div>
      <Head>
        <title>{`${item.title} ${episode.title} - ${SITE_NAME}`}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/comics/${item.id}/${episode.id}`}
        ogType="article"
        title={`${item.title} ${episode.title} - ${SITE_NAME}`}
        description={episode.description}
        ogImage={episode.image ? episode.image.url : undefined}
        twitterCard={episode.image ? "summary_large_image" : "summary_card"}
        twitterImage={episode.image ? episode.image.url : undefined}
      />
      <Header />
      <PageViewer comic={item} episode={episode} />
      <Footer />
    </div>
  );
}

Page.getInitialProps = async function ({ query }: NextPageContext) {
  const response = await callFunction<ComicGetByEpisodeIdRequest, ComicGetResponse>("comics-getByEpisodeId", {
    id: String(query.id),
    episodeId: String(query.episodeId),
  });
  return { item: response.data, episodeId: String(query.episodeId) };
};

export default Page;
