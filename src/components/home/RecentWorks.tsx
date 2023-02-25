import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import { frameBorderColor, responsiveBoundaryWidth } from "@/styles";
import { WorkGetResponse } from "@/types/api/works";

function RecentWorks({ items }: { items: WorkGetResponse[] }) {
  return (
    <section
      css={css`
        padding-bottom: 24px;

        &:before {
          display: block;
          width: 100%;
          height: 2px;
          content: "";
          background: linear-gradient(to right, lightgray, gray);
        }
      `}
    >
      <SectionHeading>RECENT WORKS</SectionHeading>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0 8px;
        `}
      >
        {items.map((item, index) => (
          <RecentWorkItem key={index} item={item} isLast={index === items.length - 1} />
        ))}
      </div>
    </section>
  );
}

function RecentWorkItem({ item, isLast }: { item: WorkGetResponse; isLast: boolean }) {
  return (
    <div
      css={css`
        position: relative;
        flex: 0 1 calc(50% - 10px);
        height: auto; // 正方形にする
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

        &:not(:last-child) {
          transition: opacity 250ms;

          &:hover {
            opacity: 0.8;
          }
        }
      `}
    >
      <Link
        css={css`
          display: block;
        `}
        href={`/works${isLast ? "" : `/${item.id}`}`}
      >
        <RecentWorkItemImage image={item.images && item.images[0]} alt={item.title} />
        <RecentWorkItemForeground isLast={isLast} title={item.title} />
      </Link>
    </div>
  );
}

function RecentWorkItemImage({ image, alt }: { image?: WorkGetResponse.Image; alt: string }) {
  return (
    <Image
      src={image ? image.url : "/images/no-image.png"}
      fill
      alt={alt}
      css={css`
        object-fit: ${image ? "cover" : "contain"};
      `}
    />
  );
}

function RecentWorkItemForeground({ isLast, title }: { isLast: boolean; title: string }) {
  const additionalStyle = isLast
    ? css`
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.8);
        transition: text-shadow 250ms;

        &:hover {
          text-shadow: 0 0 5px white;
        }
      `
    : css`
        padding: 36px 12px 12px;
        color: white;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(5, 0, 30, 1));
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
      {isLast ? (
        <div
          css={css`
            font-size: 24px;
            color: white;
          `}
        >
          {"more ＞"}
        </div>
      ) : (
        <RecentWorkItemTitle>{title}</RecentWorkItemTitle>
      )}
    </div>
  );
}

function RecentWorkItemTitle({ children }: { children: ReactNode }) {
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

export default RecentWorks;
