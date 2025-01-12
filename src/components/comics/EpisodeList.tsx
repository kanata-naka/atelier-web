import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { frameBorderColor, responsiveBoundaryWidth } from "@/styles";
import { Nullable } from "@/types";
import { ComicGetResponse } from "@/types/api/comics";
import { formatDateFromUnixTimestamp } from "@/utils/dateUtil";

function EpisodeList({ comicId, items }: { comicId: string; items: ComicGetResponse.Episode[] }) {
  return (
    <section
      css={css`
        display: flex;
        flex: 1;
        flex-direction: column;
        padding-bottom: 24px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          padding: 0 8px;
        `}
      >
        {items.map((item, index) => (
          <EpisodeItem key={index} comicId={comicId} item={item} />
        ))}
      </div>
    </section>
  );
}

function EpisodeItem({ comicId, item }: { comicId: string; item: ComicGetResponse.Episode }) {
  return (
    <div
      css={css`
        position: relative;
        flex: 0 1 calc(100% - 10px);
        height: auto;
        margin: 4px;
        overflow: hidden;
        border: 1px solid ${frameBorderColor};

        @media (min-width: ${responsiveBoundaryWidth + 201}px) {
          flex: 0 1 calc(50% - 10px);
        }

        &:before {
          display: block;
          content: "";
          padding-top: 50%;
        }

        &:hover {
          opacity: 0.8;
        }
      `}
    >
      <Link
        css={css`
          display: block;
        `}
        href={`/comics/${comicId}/${item.id}`}
      >
        <EpisodeItemImage image={item.image} alt={item.title} />
        <EpisodeItemForeground item={item} />
      </Link>
    </div>
  );
}

function EpisodeItemImage({ image, alt }: { image: Nullable<ComicGetResponse.Image>; alt: string }) {
  return (
    <Image
      src={image ? image.url : "/images/no-image.png"}
      fill
      alt={alt}
      css={css`
        object-fit: contain;
      `}
    />
  );
}

function EpisodeItemForeground({ item }: { item: ComicGetResponse.Episode }) {
  return (
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
      <PostedDate timestamp={item.createdAt} />
      <EpisodeItemTitle>{item.title}</EpisodeItemTitle>
    </div>
  );
}

function PostedDate({ timestamp }: { timestamp: number }) {
  return (
    <div
      css={css`
        white-space: nowrap;
      `}
    >
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  );
}

function EpisodeItemTitle({ children }: { children: ReactNode }) {
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

export default EpisodeList;
