import React, { useState, useEffect, ReactNode } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import ShareButtons from "@/components/common/ShareButtons";
import { frameBorderColor, responsiveBoundaryWidth } from "@/styles";
import { WorkGetResponse } from "@/types/api/works";
import { formatDateFromUnixTimestamp } from "@/utils/dateUtil";
import { renderMarkdown } from "@/utils/domUtil";

function WorkList({ items }: { items: WorkGetResponse[] }) {
  return (
    <section>
      {items.map((item, index) => (
        <WorkListItem key={index} item={item} />
      ))}
    </section>
  );
}

function WorkListItem({ item }: { item: WorkGetResponse }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [item]);

  return (
    <article id={item.id}>
      <WorkListItemTitle>{item.title}</WorkListItemTitle>
      <div
        css={css`
          display: flex;
          padding: 18px 24px;

          @media (max-width: ${responsiveBoundaryWidth}px) {
            flex-direction: column-reverse;
          }
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          <WorkListItemDescription>{renderMarkdown(item.description)}</WorkListItemDescription>
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/works/${item.id}`}
            title={item.title}
            style={css`
              display: flex;
              align-items: flex-start;
              padding: 16px 0;

              @media (max-width: ${responsiveBoundaryWidth}px) {
                justify-content: center;
              }

              @media (min-width: ${responsiveBoundaryWidth + 1}px) {
                justify-content: flex-start;
                padding-left: 20px;
              }
            `}
            buttonStyle={css`
              :not(:first-child) {
                margin-left: 10px;
              }
            `}
          />
        </div>
        <div>
          <WorkListItemPublishedDate timestamp={item.publishedDate} />
          {!!item.images.length && (
            <div
              css={css`
                @media (min-width: ${responsiveBoundaryWidth + 1}px) {
                  width: 400px;
                }
              `}
            >
              <DiffList
                item={item}
                currentImageIndex={currentImageIndex}
                onSelect={(index) => setCurrentImageIndex(index)}
              />
              <WorkListItemImage image={item.images[currentImageIndex]} alt={item.title} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function WorkListItemTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      css={css`
        padding: 12px 24px;
        font-size: 24px;
        font-weight: bold;
        line-height: 24px;
        color: #0f165a;
        background-color: #eff0ff;
      `}
    >
      {children}
    </h3>
  );
}

function WorkListItemPublishedDate({ timestamp }: { timestamp: number }) {
  return (
    <div
      css={css`
        padding: 0 4px 18px;
        text-align: right;
      `}
    >
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  );
}

function WorkListItemDescription({ children }: { children: ReactNode }) {
  return (
    <p
      css={css`
        padding: 24px;
        word-wrap: break-word;
      `}
    >
      {children}
    </p>
  );
}

function WorkListItemImage({ image, alt }: { image: WorkGetResponse.Image; alt: string }) {
  return (
    <Image
      src={image.url}
      fill
      alt={alt}
      css={css`
        position: static !important;
        height: auto !important;
        border: 1px solid ${frameBorderColor};
      `}
    />
  );
}

function DiffList({
  item,
  currentImageIndex,
  onSelect,
}: {
  item: WorkGetResponse;
  currentImageIndex: number;
  onSelect: (index: number) => void;
}) {
  if (item.images.length < 2) {
    // 画像が2つ以上なければ表示しない
    return null;
  }

  return (
    <ul
      css={css`
        display: flex;
        padding: 8px 0;
      `}
    >
      {item.images.map((image, index) => (
        <DiffListItem
          key={index}
          image={image}
          alt={`${item.title} ${index + 1}`}
          isActive={index === currentImageIndex}
          onClick={(event) => {
            event.preventDefault();
            onSelect(index);
          }}
        />
      ))}
    </ul>
  );
}

function DiffListItem({
  image,
  alt,
  isActive,
  onClick,
}: {
  image: WorkGetResponse.Image;
  alt: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <li
      className={`diff-list-item ${isActive ? "active" : ""}`}
      css={css`
        position: relative;
        width: 64px;
        height: 64px;
        padding: 4px;
        margin-right: 6px;
        border: 1px solid ${frameBorderColor};
        opacity: 0.8;
        transition: opacity 250ms;
        ${isActive &&
        css`
          border-color: #a5a5bf;
          box-shadow: 0 0 2px #a5a5bf;
          opacity: 1;
        `}

        &:hover {
          opacity: 1;
        }
      `}
    >
      <a
        href={image.url}
        onClick={onClick}
        css={css`
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: block;
        `}
      >
        <Image
          src={image.thumbnailUrl.small}
          fill
          alt={alt}
          css={css`
            object-fit: contain;
          `}
        />
      </a>
    </li>
  );
}

export default WorkList;
