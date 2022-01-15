import React, { FC } from "react";
import Link from "next/link";
import { Image, WorkItem } from "../../../common/types";
import { SectionHeading } from "../../../common/components/elements";

export default ({ items }: { items: WorkItem[] }) => {
  return (
    <section className="recent-works">
      <SectionHeading>RECENT WORKS</SectionHeading>
      <div className="recent-works-container">
        {items.map((item, index) => (
          <RecentWorkItem
            key={index}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

const RecentWorkItem = ({
  item,
  isLast,
}: {
  item: WorkItem;
  isLast: boolean;
}) => {
  return (
    <div className="recent-works-item">
      <Link
        href={`/works${isLast ? "" : `?id=${item.id}`}`}
        as={`/works${isLast ? "" : `/${item.id}`}`}>
        <a className="recent-works-item__link">
          <RecentWorkItemBackground image={item.images && item.images[0]} />
          <RecentWorkItemForeground isLast={isLast} title={item.title} />
        </a>
      </Link>
    </div>
  );
};

const RecentWorkItemBackground = ({ image }: { image?: Image }) => {
  return (
    <div
      className="recent-works-item-background"
      style={{
        backgroundImage: `url(${image ? image.url : "/images/no-image.png"})`,
        backgroundSize: image ? "cover" : "contain",
      }}></div>
  );
};

const RecentWorkItemForeground = ({
  isLast,
  title,
}: {
  isLast: boolean;
  title: string;
}) => {
  return (
    <div
      className={
        isLast
          ? "recent-works-item-foreground--more"
          : "recent-works-item-foreground"
      }>
      {isLast ? (
        <div className="recent-works-more">{"more ＞"}</div>
      ) : (
        <RecentWorkItemTitle>{title}</RecentWorkItemTitle>
      )}
    </div>
  );
};

const RecentWorkItemTitle: FC = ({ children }) => {
  return <h3 className="recent-works-item-title">{children}</h3>;
};
