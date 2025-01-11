import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { callFunction } from "@/api/firebase";
import EpisodeList from "@/components/comics/EpisodeList";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import PageHeading from "@/components/common/PageHeading";
import ShareButtons from "@/components/common/ShareButtons";
import { ComicType, SITE_NAME } from "@/constants";
import { frameBorderColor, responsiveBoundaryWidth } from "@/styles";
import { GetByIdRequest } from "@/types/api";
import { ComicGetResponse } from "@/types/api/comics";
import { formatDateFromUnixTimestamp } from "@/utils/dateUtil";

function Page({ item }: { item: ComicGetResponse }) {
  useEffect(() => {
    scrollTo(0, 0);
  }, [item]);

  return (
    <div>
      <Head>
        <title>{`${item.title} - COMICS - ${SITE_NAME}`}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/comics/${item.id}`}
        ogType="article"
        title={`${item.title} - ${SITE_NAME}`}
        description={item.description}
        ogImage={item.image ? item.image.url : undefined}
        twitterCard={item.image ? "summary_large_image" : "summary_card"}
        twitterImage={item.image ? item.image.url : undefined}
      />
      <Header />
      <PageHeading>COMICS</PageHeading>
      <h3
        css={css`
          padding: 12px 24px;
          font-size: 24px;
          font-weight: bold;
          line-height: 24px;
          color: #0f165a;
          background-color: #eff0ff;
        `}
      >
        {item.title}
      </h3>

      <div
        css={css`
          display: flex;
          padding: 18px 24px;

          @media (max-width: ${responsiveBoundaryWidth}px) {
            flex-direction: column-reverse;
          }
        `}
      >
        <section
          css={css`
            flex: 1;
          `}
        >
          <p
            css={css`
              padding: 24px;
              word-wrap: break-word;
            `}
          >
            {item.description}
          </p>
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/comics/${item.id}`}
            title={item.title}
            style={css`
              display: flex;
              align-items: flex-start;
              padding: 16px 0;

              @media (max-width: ${responsiveBoundaryWidth}px) {
                justify-content: center;
              }

              @media (min-width: ${responsiveBoundaryWidth + 1}px) {
                justify-content: flex-start;
                padding-left: 20px;
              }
            `}
            buttonStyle={css`
              :not(:first-child) {
                margin-left: 10px;
              }
            `}
          />
          <EpisodeList comicId={item.id} items={item.episodes} />
        </section>
        <section>
          <div
            css={css`
              position: relative;

              @media (min-width: ${responsiveBoundaryWidth + 1}px) {
                width: 400px;
              }
            `}
          >
            {item.type === ComicType.ONE_SHOT && <OneShotLabel />}
            {item.type === ComicType.SERIES && item.completed && <CompletedLabel />}
            {item.episodes && item.episodes.length && <UpdatedDate episode={item.episodes[0]} />}
            <Image
              src={item.image ? item.image.url : "/images/no-image.png"}
              fill
              alt={item.title}
              css={css`
                position: static !important;
                height: auto !important;
                border: 1px solid ${frameBorderColor};
              `}
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

function OneShotLabel() {
  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        top: 0;
        padding: 8px;
        background-color: white;
      `}
    >
      読み切り
    </div>
  );
}

function CompletedLabel() {
  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        top: 0;
        padding: 8px;
        background-color: white;
      `}
    >
      完結
    </div>
  );
}

function UpdatedDate({ episode }: { episode: ComicGetResponse.Episode }) {
  return (
    <div
      css={css`
        position: absolute;
        right: 0;
        top: 0;
        padding: 8px;
        background-color: red;
        color: white;
      `}
    >
      {formatDateFromUnixTimestamp(episode.createdAt)} 更新
    </div>
  );
}

Page.getInitialProps = async function ({ query }: NextPageContext) {
  const response = await callFunction<GetByIdRequest, ComicGetResponse>("comics-getById", {
    id: String(query.id),
  });
  return { item: response.data };
};

export default Page;
