import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Pagination from "../../../common/components/Pagination"
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { nl2br, createLinkFromUrl } from "../../../utils/stringUtil"
import { movePage } from "../actions"
import { MODULE_NAME, PAGE_NUMBER_DISPLAY_MAX_RANGE } from "../models"
import { getWorksByPage } from "../reducer"

const WorkList = ({ worksByPage, pagination, movePage }) => {
  return (
    <div>
      <h2 className="page-heading">WORKS</h2>
      <section className="works-list">
        {worksByPage.map((item, index) => (
          <article key={index} id={item.id} className="works-list-item">
            <h3 id="1" className="works-list-item-title">
              {item.title}
            </h3>
            <div className="works-list-item-date">
              <i className="far fa-clock"></i>
              &nbsp;
              {formatDateFromUnixTimestamp(item.createdAt)}
            </div>
            <div className="works-list-item-row">
              <div className="works-list-item-row__left-column">
                <p
                  className="works-list-item-description"
                  dangerouslySetInnerHTML={{
                    __html: createLinkFromUrl(nl2br(item.description))
                  }}
                />
              </div>
              <div className="works-list-item-row__right-column">
                <img
                  className="works-list-item-image"
                  src={
                    item.images && item.images.length
                      ? item.images[0].url
                      : "/images/no-image.png"
                  }
                />
              </div>
            </div>
          </article>
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
