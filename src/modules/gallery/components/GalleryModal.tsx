import React, {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  FC,
} from "react";
import Modal from "react-modal";
import Router from "next/router";
import getConfig from "next/config";
import { sendEvent } from "../../../common/gtag";
import { Image, ArtItem } from "../../../common/types";
import ShareButtons from "../../../common/components/ShareButtons";
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil";
import { renderMarkdown } from "../../../utils/domUtil";

// 環境設定を取得する
const { publicRuntimeConfig } = getConfig();

Modal.setAppElement("#__next");

const GalleryModal: {
  Component: (args: { onClose?: () => void }) => ReactElement | null;
  open: (item: ArtItem) => void;
  close: () => void;
} = {
  Component: ({ onClose }) => {
    const [isOpen, setOpen] = useState(false);
    const [item, setItem] = useState<ArtItem | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isForegroundActive, setForegroundActive] = useState(true);

    useEffect(() => {
      GalleryModal.open = (item) => {
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
      GalleryModal.close = () => setOpen(false);
    }, []);

    const handleClick = useCallback(() => {
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
              url={`${publicRuntimeConfig.BASE_URL}/gallery/${item.id}`}
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
  },
  open: () => {},
  close: () => {},
};

/** オーバーレイ */
const Overlay = ({ onClick }: { onClick: () => void }) => {
  return <div className="gallery-modal-overlay" onClick={onClick}></div>;
};

/** モーダルの背景 */
const Background = ({ image }: { image?: Image }) => {
  return (
    <div
      className="gallery-modal-background"
      style={{
        backgroundImage: image && `url(${image.url})`,
      }}></div>
  );
};

/** タイトル */
const Title: FC = ({ children }) => {
  return <h3 className="gallery-modal-title">{children}</h3>;
};

/** タグ一覧 */
const TagList = ({ tags = [] }: { tags: string[] }) => {
  return (
    <ul className="gallery-modal-tag-list">
      {tags.map((tag, index) => (
        <TagListItem key={index} tag={tag} />
      ))}
    </ul>
  );
};

const TagListItem = ({ tag }: { tag: string }) => {
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

/** 投稿日時 */
const PostedDate = ({ timestamp }: { timestamp: number }) => {
  return (
    <div className="gallery-modal-posted-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  );
};

/**
 * 差分リスト
 */
const DiffList = ({
  images,
  currentImageIndex,
  onSelect,
}: {
  images: Image[];
  currentImageIndex: number;
  onSelect: (index: number) => void;
}) => {
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

const DiffListItem = ({
  image,
  isActive,
  onClick,
}: {
  image: Image;
  isActive: boolean;
  onClick: (event: React.MouseEvent) => void;
}) => {
  return (
    <li
      className={`diff-list-item ${isActive ? "active" : ""}`}
      style={{
        backgroundImage: `url(${image.thumbnailUrl!.small})`,
      }}>
      <a
        className="diff-list-item__link"
        href={image.url}
        onClick={onClick}></a>
    </li>
  );
};

/**
 * 閉じるボタン
 */
const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="gallery-modal-close-button" onClick={onClick}>
      <i className="fas fa-times gallery-modal-close-button__icon"></i>
    </div>
  );
};

export default GalleryModal;
