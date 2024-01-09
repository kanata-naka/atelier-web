import React, { useState, useCallback, ReactNode } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Router from "next/router";
import Modal from "react-modal";
import { setDataLayer } from "@/api/gtm";
import ShareButtons from "@/components/common/ShareButtons";
import { frameBorderColor, galleryModalResponsiveBoundaryWidth } from "@/styles";
import { ArtGetResponse } from "@/types/api/arts";
import { formatDateFromUnixTimestamp } from "@/utils/dateUtil";
import { renderMarkdown } from "@/utils/domUtil";

// Next.jsのルート要素を指定する
Modal.setAppElement("#__next");

const ArtModal: { Component: typeof Component; open: (item: ArtGetResponse) => void; close: () => void } = {
  Component,
  open: () => ({}),
  close: () => ({}),
};

function Component({ onClose }: { onClose?: () => void }) {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState<ArtGetResponse | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isForegroundActive, setForegroundActive] = useState(true);

  ArtModal.open = (item: ArtGetResponse) => {
    setItem(item);
    setCurrentImageIndex(0);
    setForegroundActive(true);
    setOpen(true);
    setDataLayer({
      event: "art_modal_open",
      id: item.id,
      title: item.title,
      tags: item.tags,
      index: 0,
    });
  };

  ArtModal.close = () => {
    setOpen(false);
  };

  const handleClick = useCallback(() => {
    setForegroundActive(!isForegroundActive);
  }, [isForegroundActive]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setOpen(false);
  };

  if (!item) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      bodyOpenClassName="no-scroll"
      css={css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      `}
      style={{ overlay: { zIndex: 2 } }}
    >
      <Overlay onClick={handleClose} />
      <div
        onClick={handleClick}
        css={css`
          position: absolute;

          @media (max-width: ${galleryModalResponsiveBoundaryWidth}px) {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          @media (min-width: ${galleryModalResponsiveBoundaryWidth + 1}px) {
            top: 10%;
            left: 10%;
            width: 80%;
            height: 80%;
          }
        `}
      >
        <Image
          src={item.images[currentImageIndex].url}
          fill
          alt={item.title}
          css={css`
            object-fit: contain;
          `}
        />
        <div
          style={{ display: isForegroundActive ? "block" : "none" }}
          css={css`
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 36px 12px 12px;
            color: white;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          `}
        >
          <Title>{item.title}</Title>
          <TagList tags={item.tags} />
          <Description>{renderMarkdown(item.description)}</Description>
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/${item.id}`}
            title={item.title}
            style={css`
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;

              @media (max-width: ${galleryModalResponsiveBoundaryWidth}px) {
                padding-bottom: 8px;
              }

              @media (min-width: ${galleryModalResponsiveBoundaryWidth + 1}px) {
                float: left;
              }
            `}
            buttonStyle={css`
              margin: 0 5px;
            `}
          />
          <PostedDate timestamp={item.createdAt} />
        </div>
        <DiffList
          item={item}
          currentImageIndex={currentImageIndex}
          onSelect={(index: number) => {
            setCurrentImageIndex(index);
            setDataLayer({
              event: "art_modal_switch_diff",
              id: item.id,
              title: item.title,
              tags: item.tags,
              index,
            });
          }}
        />
      </div>
      <CloseButton onClick={handleClose} />
    </Modal>
  );
}

function Overlay({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      css={css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: black;
        opacity: 0.8;
      `}
    ></div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h3
      css={css`
        margin: 18px 0;
        font-size: 24px;
      `}
    >
      {children}
    </h3>
  );
}

function TagList({ tags = [] }: { tags: string[] }) {
  return (
    <ul>
      {tags.map((tag, index) => (
        <TagListItem key={index} tag={tag} />
      ))}
    </ul>
  );
}

function TagListItem({ tag }: { tag: string }) {
  return (
    <li
      css={css`
        display: inline-block;
        margin-right: 6px;
      `}
    >
      <a
        href={`/gallery?tag=${tag}`}
        onClick={(event) => {
          event.preventDefault();
          // ※同一ページ間の遷移だとモーダルがそのままになってしまうため、
          //   手動でモーダルを閉じる
          ArtModal.close();
          Router.push(`/gallery?tag=${tag}`);
        }}
        css={css`
          color: #3396f6;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        `}
      >
        {`#${tag}`}
      </a>
    </li>
  );
}

function Description({ children }: { children: ReactNode }) {
  return (
    <p
      css={css`
        padding: 18px 0;
      `}
    >
      {children}
    </p>
  );
}

function PostedDate({ timestamp }: { timestamp: number }) {
  return (
    <div
      css={css`
        text-align: right;
        white-space: nowrap;
      `}
    >
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  );
}

function DiffList({
  item,
  currentImageIndex,
  onSelect,
}: {
  item: ArtGetResponse;
  currentImageIndex: number;
  onSelect: (index: number) => void;
}) {
  if (!item.images || !item.images.length) {
    return null;
  }
  return (
    <ul
      className="diff-list"
      css={css`
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
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
            // 親要素のonclickイベントが実行されないようにする
            event.stopPropagation();
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
  image: ArtGetResponse.Image;
  alt: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <li
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
          box-shadow: 0 0 5px white;
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
          className="diff-list-item__image"
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

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      css={css`
        position: absolute;
        top: 24px;
        right: 24px;
        width: 32px;
        height: 32px;
        text-align: center;
        cursor: pointer;
        transition: text-shadow 250ms;

        &:hover {
          text-shadow: 0 0 5px white;
        }
      `}
    >
      <i
        className="fas fa-times"
        css={css`
          font-size: 32px;
          line-height: 32px;
          color: white;
        `}
      ></i>
    </div>
  );
}

export default ArtModal;
