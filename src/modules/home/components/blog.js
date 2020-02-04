import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"

export default ({ items }) => {
  return (
    <section id="blog" className="blog">
      {items.map((item, index) => (
        <article key={index} className="blog-article">
          <div
            className="blog-article-background"
            style={{
              backgroundImage: `url(${item.topImageUrl ||
                "/images/no-image.png"})`
            }}></div>
          <a className="blog-article__link" href={`/blog/${item.id}`}>
            <div className="blog-article-foreground">
              <div className="blog-article-date">
                <i className="far fa-clock"></i>
                &nbsp;
                {formatDateFromUnixTimestamp(item.createdAt)}
              </div>
              <h3 className="blog-article-title">{item.title}</h3>
            </div>
          </a>
        </article>
      ))}
      <footer className="blog-footer">
        <a className="blog-more__link" href="/blog">
          {"more ＞"}
        </a>
      </footer>
    </section>
  )
}
