import React, { FC } from "react";
import Link from "next/link";
import { ArtGetResponse } from "../../types/api/arts";
import { SectionHeading } from "../common/elements";
import ArtModal from "../gallery/ArtModal";

/**
 * 最近のイラスト一覧
 */
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
      <ArtModal />
    </section>
  );
};

const RecentArtItem: FC<{
  item: ArtGetResponse;
  isLast: boolean;
}> = ({ item, isLast }) => {
  return (
    <div className="recent-arts-item">
      <Link href={`/gallery${isLast ? "" : `/${item.id}`}`}>
        <a
          className="recent-arts-item__link"
          onClick={(event) => {
            if (isLast) {
              return;
            }
            event.preventDefault();
            // モーダルを開く
            ArtModal.open(item);
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
