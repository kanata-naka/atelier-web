import React, { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import ShareButtons from "@/components/common/ShareButtons";
import { WorkGetResponse } from "@/types/api/works";
import { formatDateFromUnixTimestamp } from "@/utils/dateUtil";
import { renderMarkdown } from "@/utils/domUtil";

function WorkList({ items }: { items: WorkGetResponse[] }) {
  return (
    <section className="work-list">
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
    <article id={item.id} className="work-list-item">
      <WorkListItemTitle>{item.title}</WorkListItemTitle>
      <WorkListItemPublishedDate timestamp={item.publishedDate} />
      <div className="work-list-item-row">
        <div className="work-list-item-row__left-column">
          <WorkListItemDescription>{renderMarkdown(item.description)}</WorkListItemDescription>
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
            <WorkListItemImage image={item.images[currentImageIndex]} title={item.title} />
          </div>
        )}
      </div>
    </article>
  );
}

function WorkListItemTitle({ children }: { children: ReactNode }) {
  return <h3 className="work-list-item-title">{children}</h3>;
}

function WorkListItemPublishedDate({ timestamp }: { timestamp: number }) {
  return (
    <div className="work-list-item-published-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  );
}

function WorkListItemDescription({ children }: { children: ReactNode }) {
  return <p className="work-list-item-description">{children}</p>;
}

function WorkListItemImage({ image, title }: { image: WorkGetResponse.Image; title: string }) {
  return <Image className="work-list-item-image" src={image.url} fill alt={title} />;
}

function DiffList({
  images,
  currentImageIndex,
  onSelect,
}: {
  images: WorkGetResponse.Image[];
  currentImageIndex: number;
  onSelect: (index: number) => void;
}) {
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
}

function DiffListItem({
  image,
  isActive,
  onClick,
}: {
  image: WorkGetResponse.Image;
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

export default WorkList;
