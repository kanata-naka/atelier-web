import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { decorateText } from "../../../utils/stringUtil"

export default ({ items }) => {
  return (
    <section className="work-list">
      {items.map((item, index) => (
        <WorkListItem key={index} item={item} />
      ))}
    </section>
  )
}

const WorkListItem = ({ item }) => {
  return (
    <article id={item.id} className="work-list-item">
      <WorkListItemTitle>{item.title}</WorkListItemTitle>
      <WorkListItemPostedDate timestamp={item.createdAt} />
      <div className="work-list-item-row">
        <div className="work-list-item-row__left-column">
          <WorkListItemDescription>
            <span
              dangerouslySetInnerHTML={{
                __html: decorateText(item.description)
              }}
            />
          </WorkListItemDescription>
        </div>
        <div className="work-list-item-row__right-column">
          <WorkListItemImage image={item.images && item.images[0]} />
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
