import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Pagination from "../../../common/components/Pagination"
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { decorateText, createLinkFromUrl } from "../../../utils/stringUtil"
import { movePage } from "../actions"
import { MODULE_NAME, PAGE_NUMBER_DISPLAY_MAX_RANGE } from "../models"
import { getWorksByPage } from "../reducer"

const WorkList = ({ worksByPage, pagination, movePage }) => {
  return (
    <div>
      <section className="works-list">
        {worksByPage.map((item, index) => (
          <WorkListItem key={index} item={item} />
        ))}
      </section>
      <Pagination
        pagination={pagination}
        onMovePage={movePage}
        maxRange={PAGE_NUMBER_DISPLAY_MAX_RANGE}
      />
    </div>
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
  return (
    <h3 className="works-list-item-title">
      {children}
    </h3>
  )
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

const mapStateToProps = state => ({
  worksByPage: getWorksByPage(state[MODULE_NAME]),
  pagination: state[MODULE_NAME].pagination
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      movePage
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkList)
