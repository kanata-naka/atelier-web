import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import { WorkGetResponse } from "@/types/api/works";

function RecentWorks({ items }: { items: WorkGetResponse[] }) {
  return (
    <section className="recent-works">
      <SectionHeading>RECENT WORKS</SectionHeading>
      <div className="recent-works-container">
        {items.map((item, index) => (
          <RecentWorkItem key={index} item={item} isLast={index === items.length - 1} />
        ))}
      </div>
    </section>
  );
}

function RecentWorkItem({ item, isLast }: { item: WorkGetResponse; isLast: boolean }) {
  return (
    <div className="recent-works-item">
      <Link className="recent-works-item__link" href={`/works${isLast ? "" : `/${item.id}`}`}>
        <RecentWorkItemImage image={item.images && item.images[0]} title={item.title} />
        <RecentWorkItemForeground isLast={isLast} title={item.title} />
      </Link>
    </div>
  );
}

function RecentWorkItemImage({ image, title }: { image?: WorkGetResponse.Image; title: string }) {
  return (
    <Image
      className="recent-works-item__image"
      src={image ? image.url : "/images/no-image.png"}
      fill
      alt={title}
      style={{
        objectFit: image ? "cover" : "contain",
      }}
    />
  );
}

function RecentWorkItemForeground({ isLast, title }: { isLast: boolean; title: string }) {
  return (
    <div className={isLast ? "recent-works-item-foreground--more" : "recent-works-item-foreground"}>
      {isLast ? (
        <div className="recent-works-more">{"more ＞"}</div>
      ) : (
        <RecentWorkItemTitle>{title}</RecentWorkItemTitle>
      )}
    </div>
  );
}

function RecentWorkItemTitle({ children }: { children: ReactNode }) {
  return <h3 className="recent-works-item-title">{children}</h3>;
}

export default RecentWorks;
