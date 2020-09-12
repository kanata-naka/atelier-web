import { Globals } from "../../../common/models"
import { formatDateFromIsoDate } from "../../../utils/dateUtil"

export default ({ items }) => {
  return (
    <section className="latest-articles">
      {items.map((item, index) => (
        <Article key={index} item={item} />
      ))}
      <Footer />
    </section>
  )
}

const Article = ({ item }) => {
  return (
    <article className="latest-articles-item">
      <a className="latest-articles-item__link" href={item.url} target="_blank">
        <ArticleBackground item={item} />
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
          "/images/no-image.png"})`,
        backgroundSize: item.topImage ? "cover" : "contain"
      }}></div>
  )
}

const ArticlePostedDate = ({ timestamp }) => {
  return (
    <div className="latest-articles-item-posted-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromIsoDate(timestamp)}
    </div>
  )
}

const ArticleTitle = ({ children }) => {
  return <h3 className="latest-articles-item-title">{children}</h3>
}

const Footer = () => {
  return (
    <footer className="latest-articles-footer">
      <a
        className="latest-articles-more"
        href={Globals.env.BLOG_URL}
        target="_blank">
        {"more ＞"}
      </a>
    </footer>
  )
}
