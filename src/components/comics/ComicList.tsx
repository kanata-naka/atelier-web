import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { ComicType } from "@/constants";
import { frameBorderColor, responsiveBoundaryWidth } from "@/styles";
import { Nullable } from "@/types";
import { ComicGetResponse } from "@/types/api/comics";
import { formatDateFromUnixTimestamp } from "@/utils/dateUtil";

function ComicList({ items }: { items: ComicGetResponse[] }) {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0 8px;
      `}
    >
      {items.map((item, index) => (
        <ComicItem key={index} item={item} />
      ))}
    </div>
  );
}

function ComicItem({ item }: { item: ComicGetResponse }) {
  return (
    <div
      css={css`
        position: relative;
        flex: 0 1 calc(50% - 10px);
        height: auto;
        margin: 4px;
        overflow: hidden;
        border: 1px solid ${frameBorderColor};

        @media (min-width: ${responsiveBoundaryWidth + 1}px) {
          flex: 0 1 calc(33.3% - 10px);
        }

        &:before {
          display: block;
          content: "";
          padding-top: 143%;
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
        href={`/comics/${item.id}`}
      >
        <ComicItemImage image={item.image} alt={item.title} />
        <ComicItemForeground item={item} />
      </Link>
    </div>
  );
}

function ComicItemImage({ image, alt }: { image: Nullable<ComicGetResponse.Image>; alt: string }) {
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

function ComicItemForeground({ item }: { item: ComicGetResponse }) {
  return (
    <>
      {item.type === ComicType.ONE_SHOT && <OneShotLabel />}
      {item.type === ComicType.SERIES && item.completed && <CompletedLabel />}
      {item.episodes && item.episodes.length && <UpdatedDate episode={item.episodes[0]} />}
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
        <ComicItemTitle>{item.title}</ComicItemTitle>
      </div>
    </>
  );
}

function OneShotLabel() {
  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        top: 0;
        padding: 8px;
        background-color: white;
      `}
    >
      読み切り
    </div>
  );
}

function CompletedLabel() {
  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        top: 0;
        padding: 8px;
        background-color: white;
      `}
    >
      完結
    </div>
  );
}

function UpdatedDate({ episode }: { episode: ComicGetResponse.Episode }) {
  return (
    <div
      css={css`
        position: absolute;
        right: 0;
        top: 0;
        padding: 8px;
        background-color: red;
        color: white;
      `}
    >
      {formatDateFromUnixTimestamp(episode.createdAt)} 更新
    </div>
  );
}

function ComicItemTitle({ children }: { children: ReactNode }) {
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

export default ComicList;
