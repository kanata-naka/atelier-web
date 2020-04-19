import React from "react"
import Head from "next/head"
import { callFunction } from "../common/firebase"
import { useShareButtons } from "../common/hooks"
import { SITE_NAME, SITE_DESCRIPTION, Globals } from "../common/models"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import OgpTags from "../common/components/OgpTags"
import ShareButtons from "../common/components/ShareButtons"
import TopCarousel from "../modules/home/components/TopCarousel"
import LatestArticles from "../modules/home/components/LatestArticles"
import About from "../modules/home/components/About"
import RecentWorks from "../modules/home/components/RecentWorks"
import RecentArts from "../modules/home/components/RecentArts"

const Component = ({
  globals: { env },
  topImages,
  latestArticles,
  recentWorks,
  recentArts
}) => {
  useShareButtons()

  return (
    <div>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
      <OgpTags
        url={`${env.BASE_URL}/`}
        ogType="website"
        title={SITE_NAME}
        description={SITE_DESCRIPTION}
        ogImage="/images/ogp-image.png"
        twitterCard="summary_large_image"
        twitterImage="/images/ogp-twitter-image.png"
      />
      <Header blogUrl={env.BLOG_URL} />
      <TopCarousel items={topImages} />
      <div className="dashboard">
        <About />
        <LatestArticles
          baseUrl={env.BLOG_ARTICLES_BASE_URL}
          items={latestArticles}
        />
      </div>
      <RecentArts baseUrl={env.BASE_URL} items={recentArts} />
      <RecentWorks items={recentWorks} />
      <ShareButtons url={`${env.BASE_URL}/`} />
      <Footer />
    </div>
  )
}

Component.getInitialProps = async ({ globals }) => {
  const result = await Promise.all([
    // トップ画像の一覧を取得する
    callFunction({
      name: "api-topImages-get",
      globals
    })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error(error)
        return []
      }),
    // 最新記事の一覧を取得する
    callFunction({
      name: "api-blog-getArticles",
      data: { page: 1, limit: 3 },
      globals
    })
      .then(response => {
        return response.data.result
      })
      .catch(error => {
        console.error(error)
        return []
      }),
    // 最近のイラスト一覧を取得する
    callFunction({
      name: "api-arts-get",
      data: { limit: 6, pickupFlag: true },
      globals
    })
      .then(response => {
        return response.data.result
      })
      .catch(error => {
        console.error(error)
        return []
      }),
    // 最近の作品一覧を取得する
    callFunction({
      name: "api-works-get",
      data: { limit: 6, pickupFlag: true },
      globals
    })
      .then(response => {
        return response.data.result
      })
      .catch(error => {
        console.error(error)
        return []
      })
  ])
  return {
    topImages: result[0],
    latestArticles: result[1],
    recentArts: result[2],
    recentWorks: result[3]
  }
}

export default Component
