import Link from "next/link"
import { formatDateFromIsoDate } from "../../../utils/dateUtil"

export default ({ url, items }) => {
  return (
    <section className="latest-articles">
      {items.map((item, index) => (
        <Article key={index} item={item} />
      ))}
      <Footer url={url} />
    </section>
  )
}

const Article = ({ item }) => {
  return (
    <article className="latest-articles-item">
      <ArticleBackground item={item} />
      <a className="latest-articles-item__link" href={item.url}>
        <div className="latest-articles-item-foreground">
          <ArticlePostedDate timestamp={item.createdAt} />
          <ArticleTitle>{item.title}</ArticleTitle>
        </div>
      </a>
    </article>
  )
}

const ArticleBackground = ({ item }) => {
  return (
    <div
      className="latest-articles-item-background"
      style={{
        backgroundImage: `url(${(item.topImage && item.topImage.url) ||
          "/images/no-image.png"})`
      }}></div>
  )
}

const ArticlePostedDate = ({ timestamp }) => {
  return (
    <div className="latest-articles-item-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromIsoDate(timestamp)}
    </div>
  )
}

const ArticleTitle = ({ children }) => {
  return <h3 className="latest-articles-item-title">{children}</h3>
}

const Footer = ({ url }) => {
  return (
    <footer className="latest-articles-footer">
      <a className="latest-articles-more__link" href={url}>
        {"more ＞"}
      </a>
    </footer>
  )
}
