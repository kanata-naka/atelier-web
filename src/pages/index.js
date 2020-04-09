import React from "react"
import Head from "next/head"
import { callFunction } from "../common/firebase"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import basePage from "../common/hocs/basePage"
import TopCarousel from "../modules/home/components/TopCarousel"
import LatestArticles from "../modules/home/components/LatestArticles"
import About from "../modules/home/components/About"
import RecentWorks from "../modules/home/components/RecentWorks"
import RecentArts from "../modules/home/components/RecentArts"
import "../styles/index.scss"

class Component extends React.Component {
  static async getInitialProps({ store: { dispatch }, globals }) {
    // トップ画像の一覧を取得する
    let topImages = []
    try {
      const response = await callFunction({
        dispatch,
        name: "api-topImages-get",
        globals
      })
      topImages = response.data
    } catch (error) {
      console.error(error)
    }
    // 最新記事の一覧を取得する
    let latestArticles = []
    // try {
    //   const response = await callFunction({
    //     dispatch,
    //     name: "api-articles-get",
    //     data: { limit: 6 },
    //     globals
    //   })
    //   latestArticles = response.data
    // } catch (error) {
    //   console.error(error)
    // }
    // 最近の作品一覧を取得する
    let recentWorks = []
    try {
      const response = await callFunction({
        dispatch,
        name: "api-works-get",
        data: { limit: 6 },
        globals
      })
      recentWorks = response.data
    } catch (error) {
      console.error(error)
    }
    // 最近のアート一覧を取得する
    let recentArts = []
    try {
      const response = await callFunction({
        dispatch,
        name: "api-arts-get",
        data: { limit: 6 },
        globals
      })
      recentArts = response.data
    } catch (error) {
      console.error(error)
    }
    return {
      topImages,
      latestArticles,
      recentWorks,
      recentArts
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
        <TopCarousel items={topImages} />
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
