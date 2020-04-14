import React from "react"
import Head from "next/head"
import { callFunction } from "../common/firebase"
import { PageHeading } from "../common/components/elements"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import Pagination from "../common/components/Pagination"
import { getOffsetByPage, createPagination } from "../common/models"
import WorkList from "../modules/works/components/WorkList"
import {
  PER_PAGE,
  PAGE_NUMBER_DISPLAY_MAX_RANGE
} from "../modules/works/models"

export default class Component extends React.Component {
  static async getInitialProps({ query, globals }) {
    if (query.id) {
      const response = await callFunction({
        name: "api-works-getById",
        data: {
          id: query.id
        },
        globals
      })
      return {
        id: query.id,
        items: [response.data]
      }
    } else {
      const page = +query.page || 1
      try {
        const response = await callFunction({
          name: "api-works-get",
          data: {
            offset: getOffsetByPage(page, PER_PAGE),
            limit: PER_PAGE
          },
          globals
        })
        // ページネーションを作成する
        const pagination = createPagination(page, PER_PAGE, response.data.total)
        return {
          items: response.data.result,
          pagination
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  render() {
    const { items, pagination } = this.props
    return (
      <div>
        <Head>
          <title>{"WORKS - カナタノアトリエ"}</title>
        </Head>
        <Header />
        <PageHeading>WORKS</PageHeading>
        <WorkList items={items} />
        {pagination && (
          <Pagination
            pagination={pagination}
            maxRange={PAGE_NUMBER_DISPLAY_MAX_RANGE}
          />
        )}
        <Footer />
      </div>
    )
  }
}
