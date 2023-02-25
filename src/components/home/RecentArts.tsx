import React from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import ArtModal from "@/components/gallery/ArtModal";
import { frameBorderColor, responsiveBoundaryWidth } from "@/styles";
import { ArtGetResponse } from "@/types/api/arts";

function RecentArts({ items }: { items: ArtGetResponse[] }) {
  return (
    <section
      css={css`
        display: flex;
        flex: 1;
        flex-direction: column;
        padding-bottom: 24px;

        @media (max-width: ${responsiveBoundaryWidth}px) {
          &:before {
            display: block;
            width: 100%;
            height: 2px;
            content: "";
            background: linear-gradient(to right, lightgray, gray);
          }
        }
      `}
    >
      <SectionHeading>RECENT ARTS</SectionHeading>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0 8px;
        `}
      >
        {items.map((item, index) => (
          <RecentArtItem key={index} item={item} isLast={index === items.length - 1} />
        ))}
      </div>
      <ArtModal.Component />
    </section>
  );
}

function RecentArtItem({ item, isLast }: { item: ArtGetResponse; isLast: boolean }) {
  return (
    <div
      css={css`
        position: relative;
        flex: 0 1 calc(50% - 10px);
        height: auto;
        margin: 4px;
        overflow: hidden;
        border: 1px solid ${frameBorderColor};

        &:before {
          display: block;
          content: "";
          padding-top: 100%;
        }

        &:not(:last-child) {
          transition: opacity 250ms;

          &:hover {
            opacity: 0.8;
          }
        }
      `}
    >
      <Link
        href={`/gallery${isLast ? "" : `/${item.id}`}`}
        onClick={(event) => {
          if (isLast) {
            return;
          }
          event.preventDefault();
          ArtModal.open(item);
        }}
        css={css`
          display: block;
        `}
      >
        <Image
          src={item.images[0].thumbnailUrl.medium}
          fill
          alt={item.title}
          css={css`
            object-fit: contain;
          `}
        />
        <RecentArtItemForeground isLast={isLast} />
      </Link>
    </div>
  );
}

function RecentArtItemForeground({ isLast }: { isLast: boolean }) {
  const additionalStyle =
    isLast &&
    css`
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.8);
      transition: text-shadow 250ms;

      &:hover {
        text-shadow: 0 0 5px white;
      }
    `;

  return (
    <div
      css={css`
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        ${additionalStyle}
      `}
    >
      {isLast && (
        <div
          css={css`
            font-size: 24px;
            color: white;
          `}
        >
          {"more ＞"}
        </div>
      )}
    </div>
  );
}

export default RecentArts;
