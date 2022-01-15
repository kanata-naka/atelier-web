import React from "react";
import Link from "next/link";
import { Image, ArtItem } from "../../../common/types";
import { SectionHeading } from "../../../common/components/elements";
import GalleryModal from "../../gallery/components/GalleryModal";

export default ({ items }: { items: ArtItem[] }) => {
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

const RecentArtItem = ({
  item,
  isLast,
}: {
  item: ArtItem;
  isLast: boolean;
}) => {
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

const RecentArtItemBackground = ({ image }: { image: Image }) => {
  return (
    <div
      className="recent-arts-item-background"
      style={{
        backgroundImage: `url(${image.thumbnailUrl!.medium})`,
      }}></div>
  );
};

const RecentArtItemForeground = ({ isLast }: { isLast: boolean }) => {
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
