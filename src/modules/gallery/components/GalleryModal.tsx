import React, { FC, useState, useCallback } from "react";
import Router from "next/router";
import Modal from "react-modal";
import ShareButtons from "../../../common/components/ShareButtons";
import { sendEvent } from "../../../common/gtag";
import { ArtGetResponse } from "../../../types/api/arts";
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil";
import { renderMarkdown } from "../../../utils/domUtil";

Modal.setAppElement("#__next");

const GalleryModal: FC<{ onClose?: () => void }> & {
  open: (item: ArtGetResponse) => void;
  close: () => void;
} = ({ onClose }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState<ArtGetResponse | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isForegroundActive, setForegroundActive] = useState(true);

  GalleryModal.open = (item) => {
    // モーダルを初期化する
    setItem(item);
    setCurrentImageIndex(0);
    setForegroundActive(true);
    setOpen(true);
    sendEvent({
      action: "open",
      category: "gallery_modal",
      label: {
        id: item.id,
        title: item.title,
      },
    });
  };

  GalleryModal.close = () => {
    setOpen(false);
  };

  const handleClick = useCallback(() => {
    // キャプションの表示・非表示を切り替える
    setForegroundActive(!isForegroundActive);
  }, [isForegroundActive]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setOpen(false);
  }, []);

  if (!item) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="gallery-modal"
      bodyOpenClassName="gallery-modal--open"
      style={{ overlay: { zIndex: 2 } }}>
      <Overlay onClick={handleClose} />
      <div className="gallery-modal-container" onClick={handleClick}>
        <Background image={item.images[currentImageIndex]} />
        <div
          className="gallery-modal-foreground"
          style={{ display: isForegroundActive ? "block" : "none" }}>
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
            sendEvent({
              action: "switch_diff",
              category: "gallery_modal",
              label: {
                id: item.id,
                title: item.title,
                index,
              },
            });
          }}
        />
      </div>
      <CloseButton onClick={handleClose} />
    </Modal>
  );
};

const Overlay: FC<{ onClick: () => void }> = ({ onClick }) => {
  return <div className="gallery-modal-overlay" onClick={onClick}></div>;
};

const Background: FC<{ image?: ArtGetResponse.Image }> = ({ image }) => {
  return (
    <div
      className="gallery-modal-background"
      style={{
        backgroundImage: image && `url(${image.url})`,
      }}></div>
  );
};

const Title: FC = ({ children }) => {
  return <h3 className="gallery-modal-title">{children}</h3>;
};

const TagList: FC<{ tags: string[] }> = ({ tags = [] }) => {
  return (
    <ul className="gallery-modal-tag-list">
      {tags.map((tag, index) => (
        <TagListItem key={index} tag={tag} />
      ))}
    </ul>
  );
};

const TagListItem: FC<{ tag: string }> = ({ tag }) => {
  return (
    <li className="gallery-modal-tag-list-item">
      <a
        className="gallery-modal-tag-list-item__link"
        href={`/gallery?tag=${tag}`}
        onClick={(event) => {
          event.preventDefault();
          // ※同一ページ間の遷移だとモーダルがそのままになってしまうため、
          //   手動でモーダルを閉じる
          GalleryModal.close();
          Router.push(`/gallery?tag=${tag}`);
        }}>
        {`#${tag}`}
      </a>
    </li>
  );
};

const Description: FC = ({ children }) => {
  return <p className="gallery-modal-description">{children}</p>;
};

const PostedDate: FC<{ timestamp: number }> = ({ timestamp }) => {
  return (
    <div className="gallery-modal-posted-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  );
};

const DiffList: FC<{
  images: ArtGetResponse.Image[];
  currentImageIndex: number;
  onSelect: (index: number) => void;
}> = ({ images, currentImageIndex, onSelect }) => {
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
};

const DiffListItem: FC<{
  image: ArtGetResponse.Image;
  isActive: boolean;
  onClick: (event: React.MouseEvent) => void;
}> = ({ image, isActive, onClick }) => {
  return (
    <li
      className={`diff-list-item ${isActive ? "active" : ""}`}
      style={{
        backgroundImage: `url(${image.thumbnailUrl.small})`,
      }}>
      <a
        className="diff-list-item__link"
        href={image.url}
        onClick={onClick}></a>
    </li>
  );
};

const CloseButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="gallery-modal-close-button" onClick={onClick}>
      <i className="fas fa-times gallery-modal-close-button__icon"></i>
    </div>
  );
};

GalleryModal.open = () => ({});
GalleryModal.close = () => ({});

export default GalleryModal;
