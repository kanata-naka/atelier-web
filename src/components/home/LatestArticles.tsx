import React, { ReactNode } from "react";
import { BLOG_URL } from "@/constants";
import { BlogGetArticleListResponse } from "@/types/api/blog";
import { formatDateFromIsoDate } from "@/utils/dateUtil";

function LatestArticles({ items }: { items: BlogGetArticleListResponse.Article[] }) {
  return (
    <section className="latest-articles">
      {items.map((item, index) => (
        <Article key={index} item={item} />
      ))}
      <Footer />
    </section>
  );
}

function Article({ item }: { item: BlogGetArticleListResponse.Article }) {
  return (
    <article className="latest-articles-item">
      <a className="latest-articles-item__link" href={item.url} target="_blank" rel="noreferrer">
        <ArticleBackground item={item} />
        <div className="latest-articles-item-foreground">
          <ArticlePostedDate dateString={item.createdAt} />
          <ArticleTitle>{item.title}</ArticleTitle>
        </div>
      </a>
    </article>
  );
}

function ArticleBackground({ item }: { item: BlogGetArticleListResponse.Article }) {
  return (
    <div
      className="latest-articles-item-background"
      style={{
        backgroundImage: `url(${(item.topImage && item.topImage.url) || "/images/no-image.png"})`,
        backgroundSize: item.topImage ? "cover" : "contain",
      }}
    ></div>
  );
}

function ArticlePostedDate({ dateString }: { dateString: string }) {
  return (
    <div className="latest-articles-item-posted-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromIsoDate(dateString)}
    </div>
  );
}

function ArticleTitle({ children }: { children: ReactNode }) {
  return <h3 className="latest-articles-item-title">{children}</h3>;
}

function Footer() {
  return (
    <footer className="latest-articles-footer">
      <a className="latest-articles-more" href={BLOG_URL} target="_blank" rel="noreferrer">
        {"more ＞"}
      </a>
    </footer>
  );
}

export default LatestArticles;
