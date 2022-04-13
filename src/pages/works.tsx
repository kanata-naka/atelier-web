import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { callFunction } from "../api/firebase";
import { PageHeading } from "../components/common/elements";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import OgpTags from "../components/common/OgpTags";
import Pagination from "../components/common/Pagination";
import WorkList from "../components/works/WorkList";
import { SITE_NAME } from "../constants";
import { PER_PAGE, PAGE_NUMBER_DISPLAY_MAX_RANGE } from "../constants/works";
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
    setItemsByPage(getItemsByPage(items, page, PER_PAGE));
    setPaginationState({
      page,
      perPage: PER_PAGE,
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
          maxRange={PAGE_NUMBER_DISPLAY_MAX_RANGE}
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
