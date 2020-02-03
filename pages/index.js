import React from "react"
import Head from "next/head"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import basePageHoc from "../common/hocs/basePageHoc"
import Cover from "../modules/home/components/cover"
import Blog from "../modules/home/components/blog"
import About from "../modules/home/components/about"
import Works from "../modules/home/components/works"
import Gallery from "../modules/home/components/gallery"
import {
  showCovers,
  showArticles,
  showWorks,
  showGallery
} from "../modules/home/actions"
import { MODULE_NAME } from "../modules/home/models"
import reducer from "../modules/home/reducer"
import "../styles/index.scss"

class IndexPage extends React.Component {
  static async getInitialProps({ store: { dispatch } }) {
    // カバー画像の一覧を取得する
    const coverItems = [
      {
        description: "test",
        image:
          "https://pbs.twimg.com/media/EPGJuZFUEAAJDVK?format=jpg&name=large",
        thumbnailImage:
          "https://pbs.twimg.com/profile_images/1221035283619037184/nYXhsAoU_mini.jpg"
      },
      {
        description: "test2",
        image:
          "https://pbs.twimg.com/media/EPtXS7YUYAAez9K?format=jpg&name=large",
        thumbnailImage:
          "https://pbs.twimg.com/profile_images/1222697781774573568/0yi1pzcD_mini.jpg"
      },
      {
        description: "test3",
        image:
          "https://pbs.twimg.com/media/EPsgjZ8UcAAot_V?format=jpg&name=large",
        thumbnailImage:
          "https://pbs.twimg.com/profile_images/1076080213027483648/9LQV89R7_mini.jpg"
      }
    ]
    dispatch(showCovers(coverItems))
    // BLOGの記事を取得する
    const articles = [
      {
        title:
          "C95お品書きああああああああああああああああああああああああああ",
        createdAt: "2019.01.01",
        url: "/blog/1",
        image:
          "https://pbs.twimg.com/media/EP1xJQdVAAEHViq?format=jpg&name=large"
      },
      {
        title:
          "C95お品書きああああああああああああああああああああああああああ",
        createdAt: "2019.01.01",
        url: "/blog/2",
        image:
          "https://pbs.twimg.com/media/EP1xJQdVAAEHViq?format=jpg&name=large"
      },
      {
        title:
          "C95お品書きああああああああああああああああああああああああああ",
        createdAt: "2019.01.01",
        url: "/blog/3",
        image:
          "https://pbs.twimg.com/media/EP1xJQdVAAEHViq?format=jpg&name=large"
      }
    ]
    dispatch(showArticles(articles))
    // WORKSの作品一覧を取得する
    const workItems = [
      {
        title: "Superstars! mini1+2",
        url: "/works#1",
        image:
          "https://pbs.twimg.com/media/EMcTvtrUUAAKCN4?format=jpg&name=900x900"
      },
      {
        title: "Superstars! mini2",
        url: "/works#1",
        image:
          "https://pbs.twimg.com/media/EBfcFhOVUAAC1jU?format=jpg&name=900x900"
      },
      {
        title: "Superstars!",
        url: "/works#1",
        image:
          "https://pbs.twimg.com/media/DvOFOTjUYAAgfHL?format=jpg&name=900x900"
      },
      {
        title: "歳納京子 大物YouTubeｒになる 完全版",
        url: "/works#1",
        image:
          "https://pbs.twimg.com/media/DkOBeJcV4AAAoQ8?format=jpg&name=small"
      },
      {
        title: "未完",
        url: "/works#1",
        image:
          "https://pbs.twimg.com/media/DR5OZTdUEAAK4BV?format=jpg&name=360x360"
      },
      {
        title: "【寄稿】Bon Appetit",
        url: "/works#1",
        image:
          "https://pbs.twimg.com/media/DQ0v93fVQAAyFWd?format=jpg&name=small"
      }
    ]
    dispatch(showWorks(workItems))
    // GALLERYの作品一覧を取得する
    const galleryItems = [
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images: [
          "https://pbs.twimg.com/media/EOoKFQXUUAEAYQd?format=jpg&name=small",
          "https://pbs.twimg.com/media/EPxk6DZU8AECdls?format=jpg&name=large"
        ],
        description: "ああああああ\nああああああああああああああああああああ"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images: [
          "https://pbs.twimg.com/media/EOoKFQXUUAEAYQd?format=jpg&name=small"
        ],
        description: "ああああああ\nああああああああああああああああああああ"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images: [
          "https://pbs.twimg.com/media/EOpCuukU8AU_gXq?format=jpg&name=900x900"
        ],
        description:
          "ああああああ\nああああああああああああああああああああ\naaaa\n555555\nqfefaw"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images: [
          "https://pbs.twimg.com/media/EOCwK6GVAAEPYB2?format=jpg&name=900x900"
        ],
        description: "ああああああ\nああああああああああああああああああああ"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images: [
          "https://pbs.twimg.com/media/EN3FWw0VUAAxvU7?format=jpg&name=900x900"
        ],
        description: "ああああああ\nああああああああああああああああああああ"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images: [
          "https://pbs.twimg.com/media/EN7QRNAVUAAy7RX?format=jpg&name=900x900"
        ],
        description: "ああああああ\nああああああああああああああああああああ"
      }
    ]
    dispatch(showGallery(galleryItems))
    return {
      coverItems,
      articles,
      workItems,
      galleryItems
    }
  }

  render() {
    const { coverItems, articles, workItems, galleryItems } = this.props

    return (
      <div>
        <Head>
          <title>カナタノアトリエ</title>
        </Head>
        <Header />
        <Cover items={coverItems} />
        <div className="dashboard">
          <Blog items={articles} />
          <About />
        </div>
        <Works items={workItems} />
        <Gallery items={galleryItems} />
        <Footer />
      </div>
    )
  }
}

export default basePageHoc(IndexPage, {
  [MODULE_NAME]: reducer
})
