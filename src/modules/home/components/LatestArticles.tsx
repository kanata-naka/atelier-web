import React, { FC } from "react";
import { BLOG_URL } from "../../../common/models";
import { ArticleItem } from "../../../common/types";
import { formatDateFromIsoDate } from "../../../utils/dateUtil";

export default ({ items }: { items: ArticleItem[] }) => {
  return (
    <section className="latest-articles">
      {items.map((item, index) => (
        <Article key={index} item={item} />
      ))}
      <Footer />
    </section>
  );
};

const Article = ({ item }: { item: ArticleItem }) => {
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

const ArticleBackground = ({ item }: { item: ArticleItem }) => {
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

const ArticlePostedDate = ({ dateString }: { dateString: string }) => {
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

const Footer = () => {
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
