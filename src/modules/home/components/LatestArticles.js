import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"

export default ({ items }) => {
  return (
    <section id="blog" className="blog">
      {items.map((item, index) => (
        <Article item={item} index={index} />
      ))}
      <Footer />
    </section>
  )
}

const Article = ({ item, index }) => {
  return (
    <article key={index} className="blog-article">
      <ArticleBackground item={item} />
      <a className="blog-article__link" href={`/blog/${item.id}`}>
        <div className="blog-article-foreground">
          <ArticlePublicationDate timestamp={item.createdAt} />
          <ArticleTitle>{item.title}</ArticleTitle>
        </div>
      </a>
    </article>
  )
}

const ArticleBackground = ({ item }) => {
  return (
    <div
      className="blog-article-background"
      style={{
        backgroundImage: `url(${item.topImageUrl || "/images/no-image.png"})`
      }}></div>
  )
}

const ArticlePublicationDate = ({ timestamp }) => {
  return (
    <div className="blog-article-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  )
}

const ArticleTitle = ({ children }) => {
  return <h3 className="blog-article-title">{children}</h3>
}

const Footer = () => {
  return (
    <footer className="blog-footer">
      <a className="blog-more__link" href="/blog">
        {"more ＞"}
      </a>
    </footer>
  )
}
