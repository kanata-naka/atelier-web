import React, { FC } from "react";
import { BLOG_URL } from "../../../common/models";
import { BlogGetArticleListResponse } from "../../../types/api/blog";
import { formatDateFromIsoDate } from "../../../utils/dateUtil";

const LatestArticles: FC<{ items: BlogGetArticleListResponse.Article[] }> = ({
  items,
}) => {
  return (
    <section className="latest-articles">
      {items.map((item, index) => (
        <Article key={index} item={item} />
      ))}
      <Footer />
    </section>
  );
};

const Article: FC<{ item: BlogGetArticleListResponse.Article }> = ({
  item,
}) => {
  return (
    <article className="latest-articles-item">
      <a
        className="latest-articles-item__link"
        href={item.url}
        target="_blank"
        rel="noreferrer">
        <ArticleBackground item={item} />
        <div className="latest-articles-item-foreground">
          <ArticlePostedDate dateString={item.createdAt} />
          <ArticleTitle>{item.title}</ArticleTitle>
        </div>
      </a>
    </article>
  );
};

const ArticleBackground: FC<{
  item: BlogGetArticleListResponse.Article;
}> = ({ item }) => {
  return (
    <div
      className="latest-articles-item-background"
      style={{
        backgroundImage: `url(${
          (item.topImage && item.topImage.url) || "/images/no-image.png"
        })`,
        backgroundSize: item.topImage ? "cover" : "contain",
      }}></div>
  );
};

const ArticlePostedDate: FC<{ dateString: string }> = ({ dateString }) => {
  return (
    <div className="latest-articles-item-posted-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromIsoDate(dateString)}
    </div>
  );
};

const ArticleTitle: FC = ({ children }) => {
  return <h3 className="latest-articles-item-title">{children}</h3>;
};

const Footer: FC = () => {
  return (
    <footer className="latest-articles-footer">
      <a
        className="latest-articles-more"
        href={BLOG_URL}
        target="_blank"
        rel="noreferrer">
        {"more ＞"}
      </a>
    </footer>
  );
};

export default LatestArticles;
