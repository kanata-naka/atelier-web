import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { callFunction } from "@/api/firebase";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import PageHeading from "@/components/common/PageHeading";
import Pagination from "@/components/works/Pagination";
import WorkList from "@/components/works/WorkList";
import { SITE_NAME, WORK_LIST_PER_PAGE, WORK_LIST_PAGE_NUMBER_DISPLAY_MAX_RANGE } from "@/constants";
import { Restrict } from "@/constants";
import { PaginationState } from "@/types";
import { WorkGetListRequest, WorkGetListResponse, WorkGetResponse } from "@/types/api/works";
import { getItemsByPage } from "@/utils/pageUtil";

function Page({ items }: { items: WorkGetResponse[] }) {
  const [itemsByPage, setItemsByPage] = useState<WorkGetResponse[]>([]);
  const [paginationState, setPaginationState] = useState<PaginationState | null>(null);
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
      {paginationState && <Pagination state={paginationState} maxRange={WORK_LIST_PAGE_NUMBER_DISPLAY_MAX_RANGE} />}
      <Footer />
    </div>
  );
}

Page.getInitialProps = async function () {
  // 全件取得する
  // ※shallow routingで再読み込みを行わずにページングを実現するため
  const response = await callFunction<WorkGetListRequest, WorkGetListResponse>("works-get", {
    restrict: [Restrict.ALL, Restrict.LIMITED],
    sort: {
      // 出版日の降順
      column: "publishedDate",
      order: "desc",
    },
  });
  return { items: response.data.result };
};

export default Page;
