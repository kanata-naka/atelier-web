import React from "react"
import Head from "next/head"
import { fetchApi } from "../common/api"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import basePage from "../common/hocs/basePage"
import Carousel from "../modules/home/components/Carousel"
import LatestArticles from "../modules/home/components/LatestArticles"
import About from "../modules/home/components/About"
import RecentWorks from "../modules/home/components/RecentWorks"
import RecentArts from "../modules/home/components/RecentArts"
import {
  loadTopImages,
  loadLatestArticles,
  loadRecentWorks,
  loadRecentArts
} from "../modules/home/actions"
import { MODULE_NAME } from "../modules/home/models"
import reducer from "../modules/home/reducer"
import "../styles/index.scss"

class Component extends React.Component {
  static async getInitialProps({ store: { dispatch } }) {
    await Promise.all([
      // トップ画像の一覧を取得する
      fetchApi(dispatch, {
        method: "get",
        url: `/top_images`
      })
        .then(async response => {
          dispatch(loadTopImages(response.data))
        })
        .catch(error => {
          console.error(error)
          dispatch(loadTopImages([]))
        }),
      // 最新記事の一覧を取得する
      fetchApi(dispatch, {
        method: "get",
        url: `/articles`,
        params: { max: 3 }
      })
        .then(async response => {
          dispatch(loadLatestArticles(response.data))
        })
        .catch(error => {
          console.error(error)
          dispatch(loadLatestArticles([]))
        }),
      // 最近の作品一覧を取得する
      fetchApi(dispatch, {
        method: "get",
        url: `/works`,
        params: { max: 6 }
      })
        .then(async response => {
          dispatch(loadRecentWorks(response.data))
        })
        .catch(error => {
          console.error(error)
          dispatch(loadRecentWorks([]))
        }),
      // 最近のイラスト一覧を取得する
      fetchApi(dispatch, {
        method: "get",
        url: `/arts`,
        params: { max: 6 }
      })
        .then(async response => {
          dispatch(loadRecentArts(response.data))
        })
        .catch(error => {
          console.error(error)
          dispatch(loadRecentArts([]))
        })
    ])
  }

  render() {
    return (
      <div>
        <Head>
          <title>カナタノアトリエ</title>
        </Head>
        <Header />
        <Carousel />
        <div className="dashboard">
          <About />
          <LatestArticles />
        </div>
        <RecentWorks />
        <RecentArts />
        <Footer />
      </div>
    )
  }
}

export default basePage(Component, {
  [MODULE_NAME]: reducer
})
