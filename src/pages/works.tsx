import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { NextPageContext } from "next";
import Head from "next/head";
import Router from "next/router";
import { callFunction } from "@/api/firebase";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import PageHeading from "@/components/common/PageHeading";
import WorkScroll from "@/components/works/WorkScroll";
import { SITE_NAME, WORK_SCROLL_FETCH_LIMIT } from "@/constants";
import { Restrict } from "@/constants";
import { responsiveBoundaryWidth } from "@/styles";
import { WorkGetListRequest, WorkGetListResponse, WorkGetResponse } from "@/types/api/works";

function Page({ tag, items, fetchedAll }: { tag?: string; items: WorkGetResponse[]; fetchedAll: boolean }) {
  useEffect(() => {
    scrollTo(0, 0);
  }, [items]);

  return (
    <div>
      <Head>
        <title>{`WORKS - ${SITE_NAME}`}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/works`}
        ogType="blog"
        title={`WORKS - ${SITE_NAME}`}
        twitterCard="summary_card"
      />
      <Header />
      <PageHeading>WORKS</PageHeading>
      <WorkTab tag={tag} />
      <WorkScroll tag={tag} items={items} fetchedAll={fetchedAll} fetchLimit={WORK_SCROLL_FETCH_LIMIT} />
      <Footer />
    </div>
  );
}

const WORK_TAB_ITEMS: { name: string; tag?: string }[] = [
  { name: "CORPORATE PROJECT", tag: "企業案件" },
  { name: "COMMISSION", tag: "個人依頼" },
  { name: "DOUJIN", tag: "同人" },
  { name: "ALL" },
];

function WorkTab({ tag }: { tag?: string }) {
  return (
    <ul
      css={css`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0 12px;
        padding: 18px 10px 20px 18px;
        justify-content: center;

        @media (min-width: ${responsiveBoundaryWidth + 1}px) {
          flex-wrap: nowrap;
        }
      `}
    >
      {tag && !WORK_TAB_ITEMS.map((item) => item.tag).includes(tag) && <WorkTabItem name={tag} isActive={true} />}
      {WORK_TAB_ITEMS.map((item, index) => (
        <WorkTabItem key={index} name={item.name} tag={item.tag} isActive={item.tag === tag} />
      ))}
    </ul>
  );
}

function WorkTabItem({ name, tag, isActive }: { name: string; tag?: string; isActive: boolean }) {
  const url = tag ? `/works?tag=${tag}` : `/works`;
  return (
    <li
      css={css`
        display: inline-block;
        margin-inline: 16px;
        padding: 4px 0;
        font-size: 18px;
        font-weight: bold;

        @media (max-width: ${responsiveBoundaryWidth}px) {
          text-align: center;
          margin-block: 4px;
        }

        ${isActive
          ? css`
              border-bottom: 2px solid black;
            `
          : css`
              color: #4c4c4c;
              & a {
                :hover {
                  color: silver;
                }
              }
            `}
      `}
    >
      {isActive ? (
        name
      ) : (
        <a
          href={url}
          onClick={(event) => {
            event.preventDefault();
            Router.push(url);
          }}
        >
          {name}
        </a>
      )}
    </li>
  );
}

Page.getInitialProps = async function ({ query }: NextPageContext) {
  const data = await callFunction<WorkGetListRequest, WorkGetListResponse>("works-get", {
    tag: query.tag && String(query.tag),
    restrict: [Restrict.ALL, Restrict.LIMITED],
    limit: WORK_SCROLL_FETCH_LIMIT,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return { result: [], fetchedAll: false };
    });
  return { tag: query.tag && String(query.tag), items: data.result, fetchedAll: data.fetchedAll };
};

export default Page;
