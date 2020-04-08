import React from "react"
import Head from "next/head"
import { PageHeading } from "../common/components/elements"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import Pagination from "../common/components/Pagination"
import basePage from "../common/hocs/basePage"
import { createPagination } from "../common/models"
import WorkList from "../modules/works/components/WorkList"
import {
  PER_PAGE,
  PAGE_NUMBER_DISPLAY_MAX_RANGE,
  getWorksByPage
} from "../modules/works/models"
import "../styles/works.scss"

class Component extends React.Component {
  static async getInitialProps({ store: { dispatch }, query, globals }) {
    // 作品一覧を取得する
    try {
      const response = await callFunction({
        dispatch,
        name: "api-works-get",
        globals
      })
      const pagination = createPagination(response.data, PER_PAGE, query.page)
      return {
        works: getWorksByPage(response.data, pagination),
        pagination
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { works, pagination } = this.props
    return (
      <div>
        <Head>
          <title>{"WORKS - カナタノアトリエ"}</title>
        </Head>
        <Header />
        <PageHeading>WORKS</PageHeading>
        <WorkList items={works} />
        <Pagination
          pagination={pagination}
          maxRange={PAGE_NUMBER_DISPLAY_MAX_RANGE}
        />
        <Footer />
      </div>
    )
  }
}

export default basePage(Component, {})
