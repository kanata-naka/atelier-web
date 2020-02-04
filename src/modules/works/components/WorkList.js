import React, { useState, useEffect, useCallback } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Pagination from "../../../common/components/Pagination"
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { nl2br } from "../../../utils/stringUtil"
import { movePage } from "../actions"
import { MODULE_NAME } from "../models"
import { getItemsByPage } from "../reducer"

const WorkList = ({ items, pagination, movePage }) => {
  return (
    <div>
      <h2 class="page-heading">WORKS</h2>
      <section class="works-list">
      {
        items.map((item, index) => (
          <article key={index} id={item.id} class="works-list-item">
            <h3 id="1" class="works-list-item-title">{item.title}</h3>
            <div class="works-list-item-date"><i class="far fa-clock"></i>
              &nbsp;
              {formatDateFromUnixTimestamp(item.createdAt)}
            </div>
            <div class="works-list-item-row">
              <div class="works-list-item-row__left-column">
                <p class="works-list-item-description" dangerouslySetInnerHTML={{ __html: nl2br(item.description) }} />
              </div>
              <div class="works-list-item-row__right-column">
                <img class="works-list-item-image" src={item.images && item.images.length ? item.images[0].url : "/images/no-image.png"} />
              </div>
            </div>
          </article>
        ))
      }
      </section>
      <Pagination pagination={pagination} items={items} onMovePage={movePage} />
    </div>
  )
}

const mapStateToProps = state => ({
  items: getItemsByPage(state[MODULE_NAME]),
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
