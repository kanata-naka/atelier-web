import React, { useEffect, useState } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { callFunction } from "../common/api";
import { SITE_NAME } from "../common/models";
import { Pagination, Restrict } from "../types";
import { GetByIdRequest } from "../types/api";
import {
  WorkGetListRequest,
  WorkGetListResponse,
  WorkGetResponse,
} from "../types/api/works";
import { getItemsByPage } from "../utils/pageUtil";
import { PageHeading } from "../common/components/elements";
import Header from "../common/components/Header";
import Footer from "../common/components/Footer";
import OgpTags from "../common/components/OgpTags";
import { default as PaginationComponent } from "../common/components/Pagination";
import WorkList from "../modules/works/components/WorkList";
import {
  PER_PAGE,
  PAGE_NUMBER_DISPLAY_MAX_RANGE,
} from "../modules/works/models";

const Component = ({
  id,
  items,
}: {
  id?: string;
  items: WorkGetResponse[];
}) => {
  const [itemsByPage, setItemsByPage] = useState<WorkGetResponse[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setItemsByPage([...items]);
      setPagination(null);
    } else {
      const page = +Number(router.query.page) || 1;
      setItemsByPage(getItemsByPage(items, page, PER_PAGE));
      setPagination({ page, perPage: PER_PAGE, total: items.length });
    }
    scrollTo(0, 0);
  }, [id, router.query.page]);

  return (
    <div>
      <Head>
        <title>{`WORKS - ${SITE_NAME}`}</title>
      </Head>
      {id ? (
        <OgpTags
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/works/${id}`}
          ogType="article"
          title={`${items[0].title} - ${SITE_NAME}`}
          description={items[0].description}
          ogImage={items[0].images?.length ? items[0].images[0].url : undefined}
          twitterCard={
            items[0].images?.length ? "summary_large_image" : "summary_card"
          }
          twitterImage={
            items[0].images?.length ? items[0].images[0].url : undefined
          }
        />
      ) : (
        <OgpTags
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/works`}
          ogType="blog"
          title={`WORKS - ${SITE_NAME}`}
          twitterCard="summary_card"
        />
      )}
      <Header />
      <PageHeading>WORKS</PageHeading>
      <WorkList items={itemsByPage} />
      {pagination && (
        <PaginationComponent
          pagination={pagination}
          maxRange={PAGE_NUMBER_DISPLAY_MAX_RANGE}
        />
      )}
      <Footer />
    </div>
  );
};

Component.getInitialProps = async ({ query }: NextPageContext) => {
  if (query.id) {
    const response = await callFunction<GetByIdRequest, WorkGetResponse>(
      "works-getById",
      {
        id: String(query.id),
      }
    );
    return {
      id: response.data.id,
      items: [response.data],
    };
  } else {
    try {
      // 全件取得する
      // ※shallow routingで再読み込みを行わずにページングを実現するため
      const response = await callFunction<
        WorkGetListRequest,
        WorkGetListResponse
      >("works-get", {
        restrict: [Restrict.ALL, Restrict.LIMITED],
        sort: {
          // 出版日の降順
          column: "publishedDate",
          order: "desc",
        },
      });
      return {
        items: response.data.result,
      };
    } catch (error) {
      console.error(error);
    }
  }
};

export default Component;
