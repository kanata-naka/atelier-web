import React, { useState, ReactNode } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Router from "next/router";
import Modal from "react-modal";
import { setDataLayer } from "@/api/gtm";
import ShareButtons from "@/components/common/ShareButtons";
import { frameBorderColor, modalResponsiveBoundaryWidth, responsiveBoundaryWidth } from "@/styles";
import { WorkGetResponse } from "@/types/api/works";
import { formatDateFromUnixTimestamp } from "@/utils/dateUtil";
import { renderMarkdown } from "@/utils/domUtil";

// Next.jsのルート要素を指定する
Modal.setAppElement("#__next");

const WorkModal: { Component: typeof Component; open: (item: WorkGetResponse) => void; close: () => void } = {
  Component,
  open: () => ({}),
  close: () => ({}),
};

function Component({ onClose }: { onClose?: () => void }) {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState<WorkGetResponse | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  WorkModal.open = (item: WorkGetResponse) => {
    setItem(item);
    setCurrentImageIndex(0);
    setOpen(true);
    setDataLayer({
      event: "work_modal_open",
      id: item.id,
      title: item.title,
      tags: [...item.tags],
      index: 0,
    });
  };

  WorkModal.close = () => {
    setOpen(false);
  };

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
        css={css`
          position: absolute;

          @media (max-width: ${modalResponsiveBoundaryWidth}px) {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          @media (min-width: ${modalResponsiveBoundaryWidth + 1}px) {
            top: 10%;
            left: 10%;
            width: 80%;
            height: 80%;
          }
        `}
      >
        <div
          css={css`
            display: grid;
            position: absolute;
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            padding: 12px 12px 12px;
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
            grid-template-rows: auto auto 100%;
            grid-template-columns: 100%;
            overflow-y: auto;

            @media (min-width: ${responsiveBoundaryWidth + 1}px) {
              grid-template-rows: auto 1fr;
              grid-template-columns: 50% 1fr;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              grid-row: 1 / 2;
              grid-column: 1 / 2;

              @media (min-width: ${responsiveBoundaryWidth + 1}px) {
                grid-column: 1 / 3;
              }
            `}
          >
            <Title>{item.title}</Title>
            <PostedDate timestamp={item.createdAt} />
          </div>
          <div
            css={css`
              grid-row: 2 / 3;
              grid-column: 1 / 2;

              @media (min-width: ${responsiveBoundaryWidth + 1}px) {
                grid-row: 2 / 3;
                padding-right: 24px;
              }
            `}
          >
            <TagList tags={item.tags} />
            <Description>{renderMarkdown(item.description)}</Description>
            <ShareButtons
              url={`${process.env.NEXT_PUBLIC_BASE_URL}/works/${item.id}`}
              title={item.title}
              style={css`
                display: flex;
                align-items: flex-stwork;
                justify-content: flex-stwork;

                @media (max-width: ${modalResponsiveBoundaryWidth}px) {
                  padding-bottom: 8px;
                }

                @media (min-width: ${modalResponsiveBoundaryWidth + 1}px) {
                  float: left;
                }
              `}
              buttonStyle={css`
                margin: 0 5px;
              `}
            />
          </div>
          <div
            css={css`
              position: relative;
              grid-row: 3 / 4;
              grid-column: 1 / 2;

              @media (min-width: ${responsiveBoundaryWidth + 1}px) {
                grid-row: 2 / 3;
                grid-column: 2 / 3;
              }
            `}
          >
            {item.images && item.images[currentImageIndex] && (
              <div
                css={css`
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
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
              </div>
            )}
            <DiffList
              item={item}
              currentImageIndex={currentImageIndex}
              onSelect={(index: number) => {
                setCurrentImageIndex(index);
                setDataLayer({
                  event: "work_modal_switch_diff",
                  id: item.id,
                  title: item.title,
                  tags: [...item.tags],
                  index,
                });
              }}
            />
          </div>
        </div>
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

function PostedDate({ timestamp }: { timestamp: number }) {
  return (
    <div
      css={css`
        white-space: nowrap;
        text-align: right;
        line-height: 32px;
      `}
    >
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
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
        href={`/works?tag=${tag}`}
        onClick={(event) => {
          event.preventDefault();
          // ※同一ページ間の遷移だとモーダルがそのままになってしまうため、
          //   手動でモーダルを閉じる
          WorkModal.close();
          Router.push(`/works?tag=${tag}`);
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

function DiffList({
  item,
  currentImageIndex,
  onSelect,
}: {
  item: WorkGetResponse;
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
  image: WorkGetResponse.Image;
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

export default WorkModal;
