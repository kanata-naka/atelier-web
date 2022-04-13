import React, { FC } from "react";
import { useState, useEffect } from "react";
import { WorkGetResponse } from "../../types/api/works";
import { formatDateFromUnixTimestamp } from "../../utils/dateUtil";
import { renderMarkdown } from "../../utils/domUtil";
import ShareButtons from "../common/ShareButtons";

/**
 * 作品一覧
 */
const WorkList: FC<{ items: WorkGetResponse[] }> = ({ items }) => {
  return (
    <section className="work-list">
      {items.map((item, index) => (
        <WorkListItem key={index} item={item} />
      ))}
    </section>
  );
};

const WorkListItem: FC<{ item: WorkGetResponse }> = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [item]);

  return (
    <article id={item.id} className="work-list-item">
      <WorkListItemTitle>{item.title}</WorkListItemTitle>
      <WorkListItemPublishedDate timestamp={item.publishedDate} />
      <div className="work-list-item-row">
        <div className="work-list-item-row__left-column">
          <WorkListItemDescription>
            {renderMarkdown(item.description)}
          </WorkListItemDescription>
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/works/${item.id}`}
            title={item.title}
            classPrefix="work-list-item-"
          />
        </div>
        {item.images && !!item.images.length && (
          <div className="work-list-item-row__right-column">
            <DiffList
              images={item.images}
              currentImageIndex={currentImageIndex}
              onSelect={(index) => setCurrentImageIndex(index)}
            />
            <WorkListItemImage image={item.images[currentImageIndex]} />
          </div>
        )}
      </div>
    </article>
  );
};

const WorkListItemTitle: FC = ({ children }) => {
  return <h3 className="work-list-item-title">{children}</h3>;
};

const WorkListItemPublishedDate: FC<{ timestamp: number }> = ({
  timestamp,
}) => {
  return (
    <div className="work-list-item-published-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  );
};

const WorkListItemDescription: FC = ({ children }) => {
  return <p className="work-list-item-description">{children}</p>;
};

const WorkListItemImage: FC<{ image: WorkGetResponse.Image }> = ({ image }) => {
  return <img className="work-list-item-image" src={image.url} />;
};

const DiffList: FC<{
  images: WorkGetResponse.Image[];
  currentImageIndex: number;
  onSelect: (index: number) => void;
}> = ({ images, currentImageIndex, onSelect }) => {
  if (images.length < 2) {
    // 画像が2つ以上なければ表示しない
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
            onSelect(index);
          }}
        />
      ))}
    </ul>
  );
};

const DiffListItem: FC<{
  image: WorkGetResponse.Image;
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

export default WorkList;
