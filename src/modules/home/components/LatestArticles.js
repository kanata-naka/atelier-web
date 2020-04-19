import Link from "next/link"

export default ({ baseUrl, items }) => {
  return (
    <section className="latest-articles">
      {items.map((item, index) => (
        <Article key={index} baseUrl={baseUrl} item={item} />
      ))}
      <Footer />
    </section>
  )
}

const Article = ({ baseUrl, item }) => {
  return (
    <article className="latest-articles-item">
      <ArticleBackground item={item} />
      <a className="latest-articles-item__link" href={`${baseUrl}${item.id}`}>
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
      {timestamp}
    </div>
  )
}

const ArticleTitle = ({ children }) => {
  return <h3 className="latest-articles-item-title">{children}</h3>
}

const Footer = () => {
  return (
    <footer className="latest-articles-footer">
      <Link href="/blog">
        <a className="latest-articles-more__link">{"more ＞"}</a>
      </Link>
    </footer>
  )
}
