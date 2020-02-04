import React from "react"
import Head from "next/head"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import basePageHoc from "../common/hocs/basePageHoc"
import WorkList from "../modules/works/components/WorkList"
import { fetchWorks } from "../modules/works/actions"
import { MODULE_NAME } from "../modules/works/models"
import reducer from "../modules/works/reducer"
import "../styles/works.scss"

class Component extends React.Component {
  static async getInitialProps({ store: { dispatch } }) {
    // WORKSの作品一覧を取得する
    const works = [
      {
        title: "Superstars! mini1+2",
        id: 6,
        createdAt: 1580823569,
        description: "てｓｔ\nhoge\nfuga",
        images: [
          {
            url:
              "https://pbs.twimg.com/media/EMcTvtrUUAAKCN4?format=jpg&name=large"
          }
        ]
      },
      {
        title: "Superstars! mini2",
        id: 5,
        createdAt: 1580823569,
        description: "てｓｔ\nhoge\nfuga",
        images: [
          {
            url:
              "https://pbs.twimg.com/media/EBfcFhOVUAAC1jU?format=jpg&name=large"
          }
        ]
      },
      {
        title: "Superstars!",
        id: 4,
        createdAt: 1580823569,
        description: "てｓｔ\nhoge\nfuga",
        images: [
          {
            url:
              "https://pbs.twimg.com/media/DvOFOTjUYAAgfHL?format=jpg&name=large"
          }
        ]
      },
      {
        title: "歳納京子 大物YouTubeｒになる 完全版",
        id: 3,
        createdAt: 1580823569,
        description: "てｓｔ\nhoge\nfuga",
        images: null
      },
      {
        title: "未完",
        id: 2,
        createdAt: 1580823569,
        description: "てｓｔ\nhoge\nfuga",
        images: [
          {
            url:
              "https://pbs.twimg.com/media/DR5OZTdUEAAK4BV?format=jpg&name=large"
          }
        ]
      },
      {
        title: "【寄稿】Bon Appetit",
        id: 1,
        createdAt: 1580823569,
        description: "てｓｔ\nhoge\nfuga",
        images: [
          {
            url:
              "https://pbs.twimg.com/media/DQ0v93fVQAAyFWd?format=jpg&name=large"
          }
        ]
      }
    ]
    dispatch(fetchWorks(works))
    return {
      works
    }
  }

  render() {
    const { works } = this.props

    return (
      <div>
        <Head>
          <title>カナタノアトリエ</title>
        </Head>
        <Header />
        <WorkList />
        <Footer />
      </div>
    )
  }
}

export default basePageHoc(Component, {
  [MODULE_NAME]: reducer
})
