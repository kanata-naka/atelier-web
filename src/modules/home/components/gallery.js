import { SectionHeading } from "../../../common/components/elements"
import GalleryModal from "../../gallery/components/GalleryModal"

export default ({ items }) => {
  return (
    <section className="gallery">
      <SectionHeading>GALLERY</SectionHeading>
      <div className="gallery-container">
        {items.map((item, index) => (
          <GalleryItem
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

const GalleryItem = ({ item, index, isLast }) => {
  return (
    <div key={index} className="gallery-item">
      <GalleryItemBackground image={item.images[0]} />
      <GalleryItemForeground
        className={isLast && "gallery-item-foreground--more"}
        url={isLast ? "/gallery" : `/gallery/${item.id}`}
        onClick={e => {
          if (isLast) {
            return
          }
          e.preventDefault()
          // モーダルを開く
          GalleryModal.open(item)
        }}>
        {isLast && <div className="gallery-more">{"more ＞"}</div>}
      </GalleryItemForeground>
    </div>
  )
}

const GalleryItemBackground = ({ image }) => {
  return (
    <div
      className="gallery-item-background"
      style={{
        backgroundImage: `url(${image.url})`
      }}></div>
  )
}

const GalleryItemForeground = ({ url, onClick, children, ...props }) => {
  return (
    <a className="gallery-item__link" href={url} onClick={onClick}>
      <div {...props}>{children}</div>
    </a>
  )
}
