import React, { useState, useCallback, ReactNode } from "react";
import Router from "next/router";
import Modal from "react-modal";
import { sendEvent } from "@/api/gtag";
import ShareButtons from "@/components/common/ShareButtons";
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
    sendEvent("open", "gallery_modal", {
      id: item.id,
      title: item.title,
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
      className="gallery-modal"
      bodyOpenClassName="gallery-modal--open"
      style={{ overlay: { zIndex: 2 } }}
    >
      <Overlay onClick={handleClose} />
      <div className="gallery-modal-container" onClick={handleClick}>
        <Background image={item.images[currentImageIndex]} />
        <div className="gallery-modal-foreground" style={{ display: isForegroundActive ? "block" : "none" }}>
          <Title>{item.title}</Title>
          {item.tags && <TagList tags={item.tags} />}
          <Description>{renderMarkdown(item.description)}</Description>
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/${item.id}`}
            title={item.title}
            classPrefix="gallery-modal-"
          />
          <PostedDate timestamp={item.createdAt} />
        </div>
        <DiffList
          images={item.images}
          currentImageIndex={currentImageIndex}
          onSelect={(index: number) => {
            setCurrentImageIndex(index);
            sendEvent("switch_diff", "gallery_modal", {
              id: item.id,
              title: item.title,
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
  return <div className="gallery-modal-overlay" onClick={onClick}></div>;
}

function Background({ image }: { image?: ArtGetResponse.Image }) {
  return (
    <div
      className="gallery-modal-background"
      style={{
        backgroundImage: image && `url(${image.url})`,
      }}
    ></div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return <h3 className="gallery-modal-title">{children}</h3>;
}

function TagList({ tags = [] }: { tags: string[] }) {
  return (
    <ul className="gallery-modal-tag-list">
      {tags.map((tag, index) => (
        <TagListItem key={index} tag={tag} />
      ))}
    </ul>
  );
}

function TagListItem({ tag }: { tag: string }) {
  return (
    <li className="gallery-modal-tag-list-item">
      <a
        className="gallery-modal-tag-list-item__link"
        href={`/gallery?tag=${tag}`}
        onClick={(event) => {
          event.preventDefault();
          // ※同一ページ間の遷移だとモーダルがそのままになってしまうため、
          //   手動でモーダルを閉じる
          ArtModal.close();
          Router.push(`/gallery?tag=${tag}`);
        }}
      >
        {`#${tag}`}
      </a>
    </li>
  );
}

function Description({ children }: { children: ReactNode }) {
  return <p className="gallery-modal-description">{children}</p>;
}

function PostedDate({ timestamp }: { timestamp: number }) {
  return (
    <div className="gallery-modal-posted-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  );
}

function DiffList({
  images,
  currentImageIndex,
  onSelect,
}: {
  images: ArtGetResponse.Image[];
  currentImageIndex: number;
  onSelect: (index: number) => void;
}) {
  if (!images || !images.length) {
    return null;
  }
  return (
    <ul className="diff-list">
      {images.map((image, index) => (
        <DiffListItem
          key={index}
          image={image}
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
  isActive,
  onClick,
}: {
  image: ArtGetResponse.Image;
  isActive: boolean;
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <li
      className={`diff-list-item ${isActive ? "active" : ""}`}
      style={{
        backgroundImage: `url(${image.thumbnailUrl.small})`,
      }}
    >
      <a className="diff-list-item__link" href={image.url} onClick={onClick}></a>
    </li>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="gallery-modal-close-button" onClick={onClick}>
      <i className="fas fa-times gallery-modal-close-button__icon"></i>
    </div>
  );
}

export default ArtModal;
