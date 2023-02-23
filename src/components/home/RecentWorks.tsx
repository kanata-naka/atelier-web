import React, { ReactNode } from "react";
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
        <RecentWorkItemBackground image={item.images && item.images[0]} />
        <RecentWorkItemForeground isLast={isLast} title={item.title} />
      </Link>
    </div>
  );
}

function RecentWorkItemBackground({ image }: { image?: WorkGetResponse.Image }) {
  return (
    <div
      className="recent-works-item-background"
      style={{
        backgroundImage: `url(${image ? image.url : "/images/no-image.png"})`,
        backgroundSize: image ? "cover" : "contain",
      }}
    ></div>
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
