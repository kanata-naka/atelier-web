import { SectionHeading } from "../../../common/components/elements"

export default ({ items }) => {
  return (
    <section className="gallery works">
      <SectionHeading>WORKS</SectionHeading>
      <div className="gallery-container">
        {items.map((item, index) => (
          <WorkItem
            item={item}
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

const WorkItem = ({ item, index, isLast }) => {
  return (
    <div key={index} className="gallery-item">
      <WorkItemBackground image={item.images && item.images[0]} />
      <WorkItemForeground
        className={
          isLast ? "gallery-item-foreground--more" : "gallery-item-foreground"
        }
        url={isLast ? "/works" : `/works/${item.id}`}>
        {isLast ? (
          <div className="gallery-more">{"more ＞"}</div>
        ) : (
          <WorkItemTitle>{item.title}</WorkItemTitle>
        )}
      </WorkItemForeground>
    </div>
  )
}

const WorkItemBackground = ({ image }) => {
  return (
    <div
      className="gallery-item-background"
      style={{
        backgroundImage: `url(${image ? image.url : "/images/no-image.png"})`
      }}></div>
  )
}

const WorkItemForeground = ({ url, children, ...props }) => {
  return (
    <a className="gallery-item__link" href={url}>
      <div className="gallery-item-foreground" {...props}>
        {children}
      </div>
    </a>
  )
}

const WorkItemTitle = ({ children }) => {
  return <h3 className="gallery-item-title">{children}</h3>
}
