import React from "react"
import Head from "next/head"
import { callFunction } from "../common/firebase"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import TopCarousel from "../modules/home/components/TopCarousel"
import LatestArticles from "../modules/home/components/LatestArticles"
import About from "../modules/home/components/About"
import RecentWorks from "../modules/home/components/RecentWorks"
import RecentArts from "../modules/home/components/RecentArts"

export default class Component extends React.Component {
  static async getInitialProps({ globals }) {
    const result = await Promise.all([
      // トップ画像の一覧を取得する
      callFunction({
        name: "api-topImages-get",
        globals
      }).then(response => {
        return response.data
      })
      .catch(error => {
        console.error(error)
        return []
      }),
      // 最新記事の一覧を取得する
      // callFunction({
      //   name: "api-articles-get",
      //   globals
      // }).then(response => {
      //   return response.data
      // })
      // .catch(error => {
      //   console.error(error)
      //   return []
      // }),
      // 最近のイラスト一覧を取得する
      await callFunction({
        name: "api-arts-get",
        data: { limit: 6 },
        globals
      }).then(response => {
        return response.data.result
      })
      .catch(error => {
        console.error(error)
        return []
      }),
      // 最近の作品一覧を取得する
      await callFunction({
        name: "api-works-get",
        data: { limit: 6 },
        globals
      }).then(response => {
        return response.data.result
      })
      .catch(error => {
        console.error(error)
        return []
      })
    ])
    return {
      topImages: result[0],
      latestArticles: [], // result[1],
      recentArts: result[1],
      recentWorks: result[2]
    }
  }

  render() {
    const { topImages, latestArticles, recentWorks, recentArts } = this.props
    return (
      <div>
        <Head>
          <title>カナタノアトリエ</title>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />
        </Head>
        <Header />
        <TopCarousel items={topImages} />
        <div className="dashboard">
          <About />
          <LatestArticles items={latestArticles} />
        </div>
        <RecentArts items={recentArts} />
        <RecentWorks items={recentWorks} />
        <Footer />
      </div>
    )
  }
}
