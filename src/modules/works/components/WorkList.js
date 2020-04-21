import { useState, useEffect } from "react"
import ShareButtons from "../../../common/components/ShareButtons"
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { createDescriptionHtml } from "../../../utils/domUtil"

export default ({ baseUrl, items }) => {
  return (
    <section className="work-list">
      {items.map((item, index) => (
        <WorkListItem key={index} baseUrl={baseUrl} item={item} />
      ))}
    </section>
  )
}

const WorkListItem = ({ baseUrl, item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [item])

  return (
    <article id={item.id} className="work-list-item">
      <WorkListItemTitle>{item.title}</WorkListItemTitle>
      <WorkListItemPostedDate timestamp={item.createdAt} />
      <div className="work-list-item-row">
        <div className="work-list-item-row__left-column">
          <WorkListItemDescription>
            <span
              dangerouslySetInnerHTML={{
                __html: createDescriptionHtml(item.description)
              }}
            />
          </WorkListItemDescription>
          <ShareButtons
            url={`${baseUrl}/works/${item.id}`}
            title={item.title}
            classPrefix="work-list-item-"
          />
        </div>
        <div className="work-list-item-row__right-column">
          <DiffList
            images={item.images}
            currentImageIndex={currentImageIndex}
            onSelect={index => setCurrentImageIndex(index)}
          />
          <WorkListItemImage
            image={item.images && item.images[currentImageIndex]}
          />
        </div>
      </div>
    </article>
  )
}

const WorkListItemTitle = ({ children }) => {
  return <h3 className="work-list-item-title">{children}</h3>
}

const WorkListItemPostedDate = ({ timestamp }) => {
  return (
    <div className="work-list-item-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  )
}

const WorkListItemDescription = ({ children }) => {
  return <p className="work-list-item-description">{children}</p>
}

const WorkListItemImage = ({ image }) => {
  return (
    <img
      className="work-list-item-image"
      src={image ? image.url : "/images/no-image.png"}
    />
  )
}

const DiffList = ({ images, currentImageIndex, onSelect }) => {
  if (!images || images.length <= 1) {
    // 画像が2つ以上なければ表示しない
    return null
  }
  return (
    <ul className="diff-list">
      {images.map((image, index) => (
        <DiffListItem
          key={index}
          image={image}
          isActive={index === currentImageIndex}
          onClick={e => {
            e.preventDefault()
            onSelect(index)
          }}
        />
      ))}
    </ul>
  )
}

const DiffListItem = ({ image, isActive, onClick }) => {
  return (
    <li
      className={`diff-list-item ${isActive ? "active" : ""}`}
      style={{
        backgroundImage: `url(${image.url})`
      }}>
      <a
        className="diff-list-item__link"
        href={image.url}
        onClick={onClick}></a>
    </li>
  )
}
