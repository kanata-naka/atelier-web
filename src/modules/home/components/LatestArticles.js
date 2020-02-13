import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Link from 'next/link'
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { MODULE_NAME } from "../models"

const LatestArticles = ({ items }) => {
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
      <ArticleBackground item={item} />
      <Link href={`/blog/${item.id}`}>
        <a className="latest-articles-item__link">
          <div className="latest-articles-item-foreground">
            <ArticlePostedDate timestamp={item.createdAt} />
            <ArticleTitle>{item.title}</ArticleTitle>
          </div>
        </a>
      </Link>
    </article>
  )
}

const ArticleBackground = ({ item }) => {
  return (
    <div
      className="latest-articles-item-background"
      style={{
        backgroundImage: `url(${item.topImageUrl || "/images/no-image.png"})`
      }}></div>
  )
}

const ArticlePostedDate = ({ timestamp }) => {
  return (
    <div className="latest-articles-item-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
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
        <a className="latest-articles-more__link">
          {"more ＞"}
        </a>
      </Link>
    </footer>
  )
}

const mapStateToProps = state => ({
  items: state[MODULE_NAME].latestArticles
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LatestArticles)
