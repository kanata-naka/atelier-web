import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Link from 'next/link'
import { SectionHeading } from "../../../common/components/elements"
import { MODULE_NAME } from "../models"

const RecentWorks = ({ items }) => {
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
  )
}

const RecentWorkItem = ({ item, isLast }) => {
  return (
    <div className="recent-works-item">
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
    <Link href={url}>
      <a className="recent-works-item__link">
        <div className="recent-works-item-foreground" {...props}>
          {children}
        </div>
      </a>
    </Link>
  )
}

const RecentWorkItemTitle = ({ children }) => {
  return <h3 className="recent-works-item-title">{children}</h3>
}

const mapStateToProps = state => ({
  items: state[MODULE_NAME].recentWorks
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentWorks)
