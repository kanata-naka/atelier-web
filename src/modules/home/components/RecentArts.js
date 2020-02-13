import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Link from 'next/link'
import { SectionHeading } from "../../../common/components/elements"
import GalleryModal from "../../gallery/components/GalleryModal"
import { MODULE_NAME } from "../models"

const RecentArts = ({ items }) => {
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
  )
}

const RecentArtItem = ({ item, isLast }) => {
  return (
    <div className="recent-arts-item">
      <RecentArtItemBackground image={item.images[0]} />
      <RecentArtItemForeground
        className={
          isLast
            ? "recent-arts-item-foreground--more"
            : "recent-arts-item-foreground"
        }
        url={isLast ? "/gallery" : `/gallery/${item.id}`}
        onClick={e => {
          if (isLast) {
            return
          }
          e.preventDefault()
          // モーダルを開く
          GalleryModal.open(item)
        }}>
        {isLast && <div className="recent-arts-more">{"more ＞"}</div>}
      </RecentArtItemForeground>
    </div>
  )
}

const RecentArtItemBackground = ({ image }) => {
  return (
    <div
      className="recent-arts-item-background"
      style={{
        backgroundImage: `url(${image.url})`
      }}></div>
  )
}

const RecentArtItemForeground = ({ url, onClick, children, ...props }) => {
  return (
    <Link href={url}>
      <a className="recent-arts-item__link" onClick={onClick}>
        <div {...props}>{children}</div>
      </a>
    </Link>
  )
}

const mapStateToProps = state => ({
  items: state[MODULE_NAME].recentArts
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentArts)
