import { SectionHeading } from "../../../common/components/elements"

export default ({ items }) => {
  return (
    <section className="recent-works">
      <SectionHeading>RECENT WORKS</SectionHeading>
      <div className="recent-works-container">
        {items.map((item, index) => (
          <RecentWorkItem
            item={item}
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

const RecentWorkItem = ({ item, index, isLast }) => {
  return (
    <div key={index} className="recent-works-item">
      <RecentWorkItemBackground image={item.images && item.images[0]} />
      <RecentWorkItemForeground
        className={
          isLast
            ? "recent-works-item-foreground--more"
            : "recent-works-item-foreground"
        }
        url={isLast ? "/works" : `/works#${item.id}`}>
        {isLast ? (
          <div className="recent-works-more">{"more ＞"}</div>
        ) : (
          <RecentWorkItemTitle>{item.title}</RecentWorkItemTitle>
        )}
      </RecentWorkItemForeground>
    </div>
  )
}

const RecentWorkItemBackground = ({ image }) => {
  return (
    <div
      className="recent-works-item-background"
      style={{
        backgroundImage: `url(${image ? image.url : "/images/no-image.png"})`
      }}></div>
  )
}

const RecentWorkItemForeground = ({ url, children, ...props }) => {
  return (
    <a className="recent-works-item__link" href={url}>
      <div className="recent-works-item-foreground" {...props}>
        {children}
      </div>
    </a>
  )
}

const RecentWorkItemTitle = ({ children }) => {
  return <h3 className="recent-works-item-title">{children}</h3>
}
