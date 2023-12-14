import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import { FANBOX_URL } from "@/constants";
import { frameBorderColor, responsiveBoundaryWidth } from "@/styles";
import { BlogGetArticleListResponse } from "@/types/api/blog";
import { formatDateFromIsoDate } from "@/utils/dateUtil";

function LatestArticles({ items }: { items: BlogGetArticleListResponse.Article[] }) {
  return (
    <section
      css={css`
        display: flex;
        flex: 1;
        flex-direction: column;
      `}
    >
      {items.map((item, index) => (
        <Article key={index} item={item} />
      ))}
      <Footer />
    </section>
  );
}

function Article({ item }: { item: BlogGetArticleListResponse.Article }) {
  return (
    <article
      css={css`
        position: relative;
        flex-grow: 1;
        margin-top: 6px;
        overflow: hidden;
        transition: opacity 250ms;

        &:hover {
          opacity: 0.8;
        }

        &:not(:first-child) {
          flex-grow: 0.5;
          border-top: 1px solid ${frameBorderColor};
        }

        @media (max-width: ${responsiveBoundaryWidth}px) {
          &:before {
            display: block;
            padding-top: 50%;
            content: "";
          }
        }
      `}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        css={css`
          display: block;
        `}
      >
        <ArticleImage item={item} alt={item.title} />
        <div
          css={css`
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 36px 12px 12px;
            color: white;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(5, 0, 30, 1));
          `}
        >
          <ArticlePostedDate dateString={item.createdAt} />
          <ArticleTitle>{item.title}</ArticleTitle>
        </div>
      </a>
    </article>
  );
}

function ArticleImage({ item, alt }: { item: BlogGetArticleListResponse.Article; alt: string }) {
  return (
    <Image
      src={(item.topImage && item.topImage.url) || "/images/no-image.png"}
      fill
      alt={alt}
      css={css`
        object-fit: ${item.topImage ? "cover" : "contain"};
      `}
    />
  );
}

function ArticlePostedDate({ dateString }: { dateString: string }) {
  return (
    <div>
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromIsoDate(dateString)}
    </div>
  );
}

function ArticleTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      css={css`
        padding: 12px 0;
        font-size: 18px;
        font-weight: bold;
      `}
    >
      {children}
    </h3>
  );
}

function Footer() {
  return (
    <footer
      css={css`
        height: 48px;
        padding-right: 24px;
        text-align: right;
        background-color: black;
      `}
    >
      <a
        href={FANBOX_URL}
        target="_blank"
        rel="noreferrer"
        css={css`
          font-size: 18px;
          line-height: 48px;
          color: white;
          transition: text-shadow 250ms;

          &:hover {
            text-shadow: 0 0 5px white;
          }
        `}
      >
        {"more ＞"}
      </a>
    </footer>
  );
}

export default LatestArticles;
