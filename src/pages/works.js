import React from "react"
import Head from "next/head"
import { callFunction } from "../common/firebase"
import { PageHeading } from "../common/components/elements"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import Pagination from "../common/components/Pagination"
import basePage from "../common/hocs/basePage"
import { getItemsByPage } from "../common/models"
import WorkList from "../modules/works/components/WorkList"
import {
  PER_PAGE,
  PAGE_NUMBER_DISPLAY_MAX_RANGE
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
      // ページネーションを作成する
      const pagination = {
        page: query.page,
        perPage: PER_PAGE,
        total: response.data.length
      }
      return {
        items: getItemsByPage(response.data, query.page, PER_PAGE),
        pagination
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { items, pagination } = this.props
    console.log(this.props)
    return (
      <div>
        <Head>
          <title>{"WORKS - カナタノアトリエ"}</title>
        </Head>
        <Header />
        <PageHeading>WORKS</PageHeading>
        <WorkList items={items} />
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
