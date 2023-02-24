import React, { ReactNode } from "react";
import Image from "next/image";
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
        <ArticleImage item={item} title={item.title} />
        <div className="latest-articles-item-foreground">
          <ArticlePostedDate dateString={item.createdAt} />
          <ArticleTitle>{item.title}</ArticleTitle>
        </div>
      </a>
    </article>
  );
}

function ArticleImage({ item, title }: { item: BlogGetArticleListResponse.Article; title: string }) {
  return (
    <Image
      className="latest-articles-item__image"
      src={(item.topImage && item.topImage.url) || "/images/no-image.png"}
      fill
      alt={title}
      style={{
        objectFit: item.topImage ? "cover" : "contain",
      }}
    />
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
