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
        imageUrl:
          "https://pbs.twimg.com/media/EPGJuZFUEAAJDVK?format=jpg&name=large",
        thumbnailImageUrl:
          "https://pbs.twimg.com/profile_images/1221035283619037184/nYXhsAoU_mini.jpg"
      },
      {
        description: "test2",
        imageUrl:
          "https://pbs.twimg.com/media/EPtXS7YUYAAez9K?format=jpg&name=large",
        thumbnailImageUrl:
          "https://pbs.twimg.com/profile_images/1222697781774573568/0yi1pzcD_mini.jpg"
      },
      {
        description: "test3",
        imageUrl:
          "https://pbs.twimg.com/media/EPsgjZ8UcAAot_V?format=jpg&name=large",
        thumbnailImageUrl:
          "https://pbs.twimg.com/profile_images/1076080213027483648/9LQV89R7_mini.jpg"
      }
    ]
    dispatch(showCovers(coverItems))
    // BLOGの記事を取得する
    const articles = [
      {
        title:
          "C95お品書きああああああああああああああああああああああああああ",
        createdAt: 1580823569,
        id: 3,
        topImageUrl:
          "https://pbs.twimg.com/media/EP1xJQdVAAEHViq?format=jpg&name=large"
      },
      {
        title:
          "C95お品書きああああああああああああああああああああああああああ",
        createdAt: 1580823569,
        id: 2,
        topImageUrl: null
      },
      {
        title:
          "C95お品書きああああああああああああああああああああああああああ",
        createdAt: 1580823569,
        id: 1,
        topImageUrl:
          "https://pbs.twimg.com/media/EP1xJQdVAAEHViq?format=jpg&name=large"
      }
    ]
    dispatch(showArticles(articles))
    // WORKSの作品一覧を取得する
    const workItems = [
      {
        title: "Superstars! mini1+2",
        id: 6,
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
        images: null
      },
      {
        title: "未完",
        id: 2,
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
        images: [
          {
            url:
              "https://pbs.twimg.com/media/DQ0v93fVQAAyFWd?format=jpg&name=large"
          }
        ]
      }
    ]
    dispatch(showWorks(workItems))
    // GALLERYの作品一覧を取得する
    const galleryItems = [
      {
        title: "羊肉ブーム....................？？？？？？？？？？",
        createdAt: 1580823569,
        id: 6,
        images: [
          {
            url:
              "https://pbs.twimg.com/media/EOoKFQXUUAEAYQd?format=jpg&name=large"
          },
          {
            url:
              "https://pbs.twimg.com/media/EPxk6DZU8AECdls?format=jpg&name=large"
          },
          {
            url:
              "https://pbs.twimg.com/media/EP7-A_hUUAAEah6?format=jpg&name=large"
          }
        ],
        description: "🎨2月5日～のパレプロEXスケジュールです🎨\n\nメンバーの配信曜日が変わってるのでご確認くださいませ！\n\n※暁月クララは都合によりお休みです🙇‍♀️\n振替日は追ってご連絡いたします🍮"
      },
      {
        title: "やっぱり猫やんけ！",
        createdAt: 1580823569,
        id: 5,
        images: [
          {
            url:
              "https://pbs.twimg.com/media/EP7tZYOU4AA3SJn?format=jpg&name=large"
          }
        ],
        description: "🏮【緊急事態】私たち、入れ替わってる！？愛の力で元に戻れ！！【白上フブキ/夏色まつり】\n🏮2月5日21:00〜\n\n1-2-Switchをやって負けたら罰ゲーム！\n\n待機場所\nyoutube.com/watch?v=TdVzrW…\n\nリスナーさんを満足させたらもとに戻れるんですか・・・？"
      },
      {
        title: "めっかわいい",
        createdAt: 1580823569,
        id: 4,
        images: [
          {
            url:
              "https://pbs.twimg.com/media/EOpCuukU8AU_gXq?format=jpg&name=large"
          }
        ],
        description:
          "畑できた！！！！！！！！\nあとは生えるのを待つだけ...！！！\n野菜大切！！！！！！！！\n楽しかった！！！！！！！！！\nまた次回の紫咲シオン、\nARK配信にご期待ください。"
      },
      {
        title: "忘れろビーーーーーーーーム🍬🍬🍬",
        createdAt: 1580823569,
        id: 3,
        images: [
          {
            url:
              "https://pbs.twimg.com/media/EOCwK6GVAAEPYB2?format=jpg&name=large"
          }
        ],
        description: "UNOでみんなで遊んでる"
      },
      {
        title: "やった～💓！はじめるじょ！",
        createdAt: 1580823569,
        id: 2,
        images: [
          {
            url:
              "https://pbs.twimg.com/media/EN3FWw0VUAAxvU7?format=jpg&name=large"
          }
        ],
        description: "いつか 素顔を見せる日がきたら そのときは笑顔でいたい♪の璃奈ちゃんの笑顔で全俺が泣いた😂"
      },
      {
        title: "大事なお知らせがある！！！！！！！２３時から！！！！！",
        createdAt: 1580823569,
        id: 1,
        images: [
          {
            url:
              "https://pbs.twimg.com/media/EN7QRNAVUAAy7RX?format=jpg&name=large"
          }
        ],
        description: "アニメやゲームに出てきそうな現在風忍者をイメージしました！ #ぽこピー新衣装"
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
