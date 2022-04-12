import React, { FC } from "react";
import Link from "next/link";
import { SectionHeading } from "../../../common/components/elements";
import { ArtGetResponse } from "../../../types/api/arts";
import GalleryModal from "../../gallery/components/GalleryModal";

const RecentArts: FC<{ items: ArtGetResponse[] }> = ({ items }) => {
  return (
    <section className="recent-arts">
      <SectionHeading>RECENT ARTS</SectionHeading>
      <div className="recent-arts-container">
        {items.map((item, index) => (
          <RecentArtItem
            key={index}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
      <GalleryModal.Component />
    </section>
  );
};

const RecentArtItem: FC<{
  item: ArtGetResponse;
  isLast: boolean;
}> = ({ item, isLast }) => {
  return (
    <div className="recent-arts-item">
      <Link
        href={`/gallery${isLast ? "" : `?id=${item.id}`}`}
        as={`/gallery${isLast ? "" : `/${item.id}`}`}>
        <a
          className="recent-arts-item__link"
          onClick={(event) => {
            if (isLast) {
              return;
            }
            event.preventDefault();
            // モーダルを開く
            GalleryModal.open(item);
          }}>
          <RecentArtItemBackground image={item.images[0]} />
          <RecentArtItemForeground isLast={isLast} />
        </a>
      </Link>
    </div>
  );
};

const RecentArtItemBackground: FC<{
  image: ArtGetResponse.Image;
}> = ({ image }) => {
  return (
    <div
      className="recent-arts-item-background"
      style={{
        backgroundImage: `url(${image.thumbnailUrl.medium})`,
      }}></div>
  );
};

const RecentArtItemForeground: FC<{ isLast: boolean }> = ({ isLast }) => {
  return (
    <div
      className={
        isLast
          ? "recent-arts-item-foreground--more"
          : "recent-arts-item-foreground"
      }>
      {isLast && <div className="recent-arts-more">{"more ＞"}</div>}
    </div>
  );
};

export default RecentArts;
