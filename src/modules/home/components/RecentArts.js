import { SectionHeading } from "../../../common/components/elements"
import GalleryModal from "../../gallery/components/GalleryModal"

export default ({ items }) => {
  return (
    <section className="recent-arts">
      <SectionHeading>RECENT ARTS</SectionHeading>
      <div className="recent-arts-container">
        {items.map((item, index) => (
          <RecentArtItem
            item={item}
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
      <GalleryModal.Component />
    </section>
  )
}

const RecentArtItem = ({ item, index, isLast }) => {
  return (
    <div key={index} className="recent-arts-item">
      <RecentArtItemBackground image={item.images[0]} />
      <RecentArtItemForeground
        className={isLast ? "recent-arts-item-foreground--more" : "recent-arts-item-foreground"}
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
    <a className="recent-arts-item__link" href={url} onClick={onClick}>
      <div {...props}>{children}</div>
    </a>
  )
}
