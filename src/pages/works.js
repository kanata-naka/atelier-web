import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { callFunction } from "../common/firebase";
import { SITE_NAME, RESTRICT_ALL, RESTRICT_LIMITED } from "../common/models";
import { PageHeading } from "../common/components/elements";
import Header from "../common/components/Header";
import Footer from "../common/components/Footer";
import OgpTags from "../common/components/OgpTags";
import Pagination from "../common/components/Pagination";
import { createPagination, getItemsByPage } from "../common/models";
import WorkList from "../modules/works/components/WorkList";
import {
  PER_PAGE,
  PAGE_NUMBER_DISPLAY_MAX_RANGE,
} from "../modules/works/models";

// 環境設定を読み込む
const { publicRuntimeConfig } = getConfig();

const Component = ({ id, items }) => {
  const [itemsByPage, setItemsByPage] = useState([]);
  const [pagination, setPagination] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setItemsByPage([...items]);
      setPagination(null);
    } else {
      const page = +router.query.page || 1;
      setItemsByPage(getItemsByPage(items, page, PER_PAGE));
      setPagination(createPagination(page, PER_PAGE, items.length));
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
          url={`${publicRuntimeConfig.BASE_URL}/works/${id}`}
          ogType="article"
          title={`${items[0].title} - ${SITE_NAME}`}
          description={items[0].description}
          ogImage={items[0].images[0] && items[0].images[0].url}
          twitterCard={
            items[0].images[0] ? "summary_large_image" : "summary_card"
          }
          twitterImage={items[0].images[0] && items[0].images[0].url}
        />
      ) : (
        <OgpTags
          url={`${publicRuntimeConfig.BASE_URL}/works`}
          ogType="blog"
          title={`WORKS - ${SITE_NAME}`}
          twitterCard="summary_card"
        />
      )}
      <Header />
      <PageHeading>WORKS</PageHeading>
      <WorkList items={itemsByPage} />
      {pagination && (
        <Pagination
          pagination={pagination}
          maxRange={PAGE_NUMBER_DISPLAY_MAX_RANGE}
        />
      )}
      <Footer />
    </div>
  );
};

Component.getInitialProps = async ({ query }) => {
  if (query.id) {
    const response = await callFunction("works-getById", {
      id: query.id,
    });
    return {
      id: query.id,
      items: [response.data],
    };
  } else {
    try {
      // 全件取得する
      // ※shallow routingで再読み込みを行わずにページングを実現するため
      const response = await callFunction("works-get", {
        restrict: [RESTRICT_ALL, RESTRICT_LIMITED],
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
