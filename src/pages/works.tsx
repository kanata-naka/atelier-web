import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { callFunction } from "../common/api";
import { PageHeading } from "../common/components/elements";
import Footer from "../common/components/Footer";
import Header from "../common/components/Header";
import OgpTags from "../common/components/OgpTags";
import Pagination from "../common/components/Pagination";
import { SITE_NAME } from "../common/models";
import WorkList from "../modules/works/components/WorkList";
import {
  WORK_LIST_PER_PAGE,
  WORK_LIST_PAGE_NUMBER_DISPLAY_MAX_RANGE,
} from "../modules/works/models";
import { PaginationState, Restrict } from "../types";
import {
  WorkGetListRequest,
  WorkGetListResponse,
  WorkGetResponse,
} from "../types/api/works";
import { getItemsByPage } from "../utils/pageUtil";

const Page: NextPage<{
  items: WorkGetResponse[];
}> = ({ items }) => {
  const [itemsByPage, setItemsByPage] = useState<WorkGetResponse[]>([]);
  const [paginationState, setPaginationState] =
    useState<PaginationState | null>(null);
  const router = useRouter();

  useEffect(() => {
    const page = +Number(router.query.page) || 1;
    setItemsByPage(getItemsByPage(items, page, WORK_LIST_PER_PAGE));
    setPaginationState({
      page,
      perPage: WORK_LIST_PER_PAGE,
      total: items.length,
    });
    scrollTo(0, 0);
  }, [router.query.page]);

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
      <WorkList items={itemsByPage} />
      {paginationState && (
        <Pagination
          state={paginationState}
          maxRange={WORK_LIST_PAGE_NUMBER_DISPLAY_MAX_RANGE}
        />
      )}
      <Footer />
    </div>
  );
};

Page.getInitialProps = async () => {
  // 全件取得する
  // ※shallow routingで再読み込みを行わずにページングを実現するため
  const response = await callFunction<WorkGetListRequest, WorkGetListResponse>(
    "works-get",
    {
      restrict: [Restrict.ALL, Restrict.LIMITED],
      sort: {
        // 出版日の降順
        column: "publishedDate",
        order: "desc",
      },
    }
  );
  return { items: response.data.result };
};

export default Page;
