import React from "react"
import Head from "next/head"
import Header from "../common/components/Header"
import basePageHoc from "../common/hocs/basePageHoc"
import GalleryModal from "../modules/gallery/components/GalleryModal"
import Cover from "../modules/home/components/Cover"
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
        images:
          ["https://pbs.twimg.com/media/EOoKFQXUUAEAYQd?format=jpg&name=small",
        "https://pbs.twimg.com/media/EPxk6DZU8AECdls?format=jpg&name=large"],
        description: "ああああああ\nああああああああああああああああああああ"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images:
          ["https://pbs.twimg.com/media/EOoKFQXUUAEAYQd?format=jpg&name=small"],
        description: "ああああああ\nああああああああああああああああああああ"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images:
          ["https://pbs.twimg.com/media/EOpCuukU8AU_gXq?format=jpg&name=900x900"],
        description: "ああああああ\nああああああああああああああああああああ\naaaa\n555555\nqfefaw"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images:
          ["https://pbs.twimg.com/media/EOCwK6GVAAEPYB2?format=jpg&name=900x900"],
        description: "ああああああ\nああああああああああああああああああああ"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images:
          ["https://pbs.twimg.com/media/EN3FWw0VUAAxvU7?format=jpg&name=900x900"],
        description: "ああああああ\nああああああああああああああああああああ"
      },
      {
        title: "test",
        createdAt: "2019.01.01",
        url: "/gallery#1",
        images:
          ["https://pbs.twimg.com/media/EN7QRNAVUAAy7RX?format=jpg&name=900x900"],
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
          <section id="blog" className="blog">
            {articles.map((item, index) => (
              <article key={index} className="blog-article">
                <div
                  className="blog-article-background"
                  style={{
                    backgroundImage: `url(${item.image})`
                  }}></div>
                <a className="blog-article__link" href={item.url}>
                  <div className="blog-article-foreground">
                    <div className="blog-article-date">
                      <i className="far fa-clock"></i>
                      {" " + item.createdAt}
                    </div>
                    <h3 className="blog-article-title">{item.title}</h3>
                  </div>
                </a>
              </article>
            ))}
            <footer className="blog-footer">
              <a className="blog-more__link" href="/blog">
                more ＞
              </a>
            </footer>
          </section>
          <section id="about" className="about">
            <h2 className="section-heading">ABOUT</h2>
            <p className="description">
              フリーのイラストレーター・漫画家「kanata（かなた）」のホームページです。
              <br />
              あああああああああああああああああああああ
            </p>
            <figure className="profile-image">
              <img
                className="profile-image__image"
                alt="プロフィール画像"
                src="/static/images/profile-image.png"
              />
            </figure>
            <h3 className="author-name">kanata（かなた）</h3>
            <ul className="social-icons">
              <li className="social-icons-item">
                <a
                  className="social-icons-item__link"
                  href="https://twitter.com/kanata_fabiko">
                  <img
                    className="social-icons-item__image"
                    alt="Twitter"
                    src="/static/images/twitter-icon.png"
                  />
                </a>
              </li>
            </ul>
            <p className="introduction">
              自己紹介あああああああああああああああああああああああああ
              <br />
              ああああああああああああああああああああああ
            </p>
            <div className="twitter-widgets">
              <a
                className="twitter-timeline"
                data-lang="ja"
                data-height="500"
                href="https://twitter.com/kanata_fabiko?ref_src=twsrc%5Etfw">
                Tweets by kanata_fabiko
              </a>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              />
            </div>
          </section>
        </div>
        <section className="gallery works">
          <h2 className="section-heading">WORKS</h2>
          <div className="gallery-container">
            {workItems.map((item, index) => {
              const isLast = index === workItems.length - 1
              return (
                <div className="gallery-item">
                  <div
                    className="gallery-item-background"
                    style={{
                      backgroundImage: `url(${item.image})`
                    }}></div>
                  <a
                    className="gallery-item__link"
                    href={isLast ? "/works" : item.url}>
                    {isLast ? (
                      <div className="gallery-item-foreground--more">
                        <div className="gallery-more">more ＞</div>
                      </div>
                    ) : (
                      <div className="gallery-item-foreground">
                        <h3 className="gallery-item-title">{item.title}</h3>
                      </div>
                    )}
                  </a>
                </div>
              )
            })}
          </div>
        </section>
        <section className="gallery">
          <h2 className="section-heading">GALLERY</h2>
          <div className="gallery-container">
            {galleryItems.map((item, index) => {
              const isLast = index === workItems.length - 1
              return (
                <div className="gallery-item">
                  <div
                    className="gallery-item-background"
                    style={{
                      backgroundImage: `url(${item.images[0]})`
                    }}></div>
                  <a
                    className="gallery-item__link"
                    href={isLast ? "/gallery" : item.url}
                    onClick={
                      (e) => {
                        if (isLast) return
                        e.preventDefault()
                        GalleryModal.open(item)
                      }
                    }>
                    {isLast && (
                      <div className="gallery-item-foreground--more">
                        <div className="gallery-more">more ＞</div>
                      </div>
                    )}
                  </a>
                </div>
              )
            })}
          </div>
          <GalleryModal.Component />
        </section>
        <footer className="site-footer">
          <div className="copyright">{"© 2020 kanata (かなた)."}</div>
        </footer>
      </div>
    )
  }
}

export default basePageHoc(IndexPage, {
  [MODULE_NAME]: reducer
})
