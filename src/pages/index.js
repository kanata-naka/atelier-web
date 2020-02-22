import React from "react"
import Head from "next/head"
import { fetchApi } from "../common/api"
import { callFunction } from "../common/firebase"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import basePage from "../common/hocs/basePage"
import Carousel from "../modules/home/components/Carousel"
import LatestArticles from "../modules/home/components/LatestArticles"
import About from "../modules/home/components/About"
import RecentWorks from "../modules/home/components/RecentWorks"
import RecentArts from "../modules/home/components/RecentArts"
import "../styles/index.scss"

class Component extends React.Component {
  static async getInitialProps({ store: { dispatch }, globals }) {
    const result = await Promise.all([
      // トップ画像の一覧を取得する
      callFunction({
        dispatch,
        name: "api-topImages-get",
        globals
      })
        .then(async result => {
          return result.data
        })
        .catch(error => {
          console.error(error)
          return []
        }),
      // 最新記事の一覧を取得する
      fetchApi(dispatch, {
        method: "get",
        url: `/articles`,
        params: { max: 3 }
      })
        .then(async response => {
          return response.data
        })
        .catch(error => {
          console.error(error)
          return []
        }),
      // 最近の作品一覧を取得する
      fetchApi(dispatch, {
        method: "get",
        url: `/works`,
        params: { max: 6 }
      })
        .then(async response => {
          return response.data
        })
        .catch(error => {
          console.error(error)
          return []
        }),
      // 最近のイラスト一覧を取得する
      callFunction({
        dispatch,
        name: "api-arts-get",
        data: { limit: 6 },
        globals
      })
        .then(async result => {
          return result.data
        })
        .catch(error => {
          console.error(error)
          return []
        })
    ])
    return {
      topImages: result[0],
      latestArticles: result[1],
      recentWorks: result[2],
      recentArts: result[3]
    }
  }

  render() {
    const { topImages, latestArticles, recentWorks, recentArts } = this.props
    return (
      <div>
        <Head>
          <title>カナタノアトリエ</title>
        </Head>
        <Header />
        <Carousel items={topImages} />
        <div className="dashboard">
          <About />
          <LatestArticles items={latestArticles} />
        </div>
        <RecentWorks items={recentWorks} />
        <RecentArts items={recentArts} />
        <Footer />
      </div>
    )
  }
}

export default basePage(Component, {})
