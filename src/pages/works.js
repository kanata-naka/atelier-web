import React from "react"
import Head from "next/head"
import { fetchApi } from "../common/api"
import { PageHeading } from "../common/components/elements"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import basePage from "../common/hocs/basePage"
import { createPagination } from "../common/models"
import WorkList from "../modules/works/components/WorkList"
import { loadWorks, movePage } from "../modules/works/actions"
import { MODULE_NAME, PER_PAGE } from "../modules/works/models"
import reducer from "../modules/works/reducer"
import "../styles/works.scss"

class Component extends React.Component {
  static async getInitialProps({ store: { dispatch }, query }) {
    // WORKSの作品一覧を取得する
    try {
      const response = await fetchApi(dispatch, {
        method: "get",
        url: `/works`
      })
      dispatch(loadWorks(response.data))
      dispatch(movePage(createPagination(response.data, PER_PAGE, query.page)))
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>カナタノアトリエ</title>
        </Head>
        <Header />
        <PageHeading>WORKS</PageHeading>
        <WorkList />
        <Footer />
      </div>
    )
  }
}

export default basePage(Component, {
  [MODULE_NAME]: reducer
})
