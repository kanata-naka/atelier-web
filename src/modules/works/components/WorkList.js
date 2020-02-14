import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { decorateText } from "../../../utils/stringUtil"

export default ({ items }) => {
  return (
    <section className="works-list">
      {items.map((item, index) => (
        <WorkListItem key={index} item={item} />
      ))}
    </section>
  )
}

const WorkListItem = ({ item }) => {
  return (
    <article id={item.id} className="works-list-item">
      <WorkListItemTitle>{item.title}</WorkListItemTitle>
      <WorkListItemPostedDate timestamp={item.createdAt} />
      <div className="works-list-item-row">
        <div className="works-list-item-row__left-column">
          <WorkListItemDescription>
            <span
              dangerouslySetInnerHTML={{
                __html: decorateText(item.description)
              }}
            />
          </WorkListItemDescription>
        </div>
        <div className="works-list-item-row__right-column">
          <WorkListItemImage image={item.images && item.images[0]} />
        </div>
      </div>
    </article>
  )
}

const WorkListItemTitle = ({ children }) => {
  return <h3 className="works-list-item-title">{children}</h3>
}

const WorkListItemPostedDate = ({ timestamp }) => {
  return (
    <div className="works-list-item-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  )
}

const WorkListItemDescription = ({ children }) => {
  return <p className="works-list-item-description">{children}</p>
}

const WorkListItemImage = ({ image }) => {
  return (
    <img
      className="works-list-item-image"
      src={image ? image.url : "/images/no-image.png"}
    />
  )
}
