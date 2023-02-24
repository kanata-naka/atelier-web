import React from "react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import ArtModal from "@/components/gallery/ArtModal";
import { ArtGetResponse } from "@/types/api/arts";

function RecentArts({ items }: { items: ArtGetResponse[] }) {
  return (
    <section className="recent-arts">
      <SectionHeading>RECENT ARTS</SectionHeading>
      <div className="recent-arts-container">
        {items.map((item, index) => (
          <RecentArtItem key={index} item={item} isLast={index === items.length - 1} />
        ))}
      </div>
      <ArtModal.Component />
    </section>
  );
}

function RecentArtItem({ item, isLast }: { item: ArtGetResponse; isLast: boolean }) {
  return (
    <div className="recent-arts-item">
      <Link
        className="recent-arts-item__link"
        href={`/gallery${isLast ? "" : `/${item.id}`}`}
        onClick={(event) => {
          if (isLast) {
            return;
          }
          event.preventDefault();
          ArtModal.open(item);
        }}
      >
        <RecentArtItemBackground image={item.images[0]} />
        <RecentArtItemForeground isLast={isLast} />
      </Link>
    </div>
  );
}

function RecentArtItemBackground({ image }: { image: ArtGetResponse.Image }) {
  return (
    <div
      className="recent-arts-item-background"
      style={{
        backgroundImage: `url(${image.thumbnailUrl.medium})`,
      }}
    ></div>
  );
}

function RecentArtItemForeground({ isLast }: { isLast: boolean }) {
  return (
    <div className={isLast ? "recent-arts-item-foreground--more" : "recent-arts-item-foreground"}>
      {isLast && <div className="recent-arts-more">{"more ＞"}</div>}
    </div>
  );
}

export default RecentArts;
