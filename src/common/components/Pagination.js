import React from "react"
import { getOffsetByPageNumber } from "../models"

/**
 * ページネーション
 */
export default class extends React.Component {
  /**
   * 現在のページ番号
   */
  get currentPageNumber() {
    const { pagination } = this.props
    return pagination.offset / pagination.perPage + 1
  }

  /**
   * 最後のページ番号
   */
  get lastPageNumber() {
    const { pagination } = this.props
    return Math.ceil(pagination.size / pagination.perPage)
  }

  /**
   * 指定したページに切り替える
   * @param pageNumber ページ番号
   */
  movePage(pageNumber) {
    const { pagination, onMovePage } = this.props
    onMovePage({
      ...pagination,
      offset: getOffsetByPageNumber(pageNumber, pagination.perPage)
    })
    // URLにページ番号のクエリを書き加える
    history && history.pushState("", "", `?page=${pageNumber}`)
  }

  /**
   * 各ページのボタンを描画する
   */
  renderItems() {
    const { maxRange } = this.props

    let first, last
    if (this.lastPageNumber < maxRange) {
      first = 1
      last = this.lastPageNumber
    } else if (this.currentPageNumber <= Math.floor(maxRange / 2) + 1) {
      first = 1
      last = Math.min(maxRange, this.lastPageNumber)
    } else if (
      this.currentPageNumber >=
      this.lastPageNumber - Math.floor(maxRange / 2)
    ) {
      first = Math.max(1, this.lastPageNumber - maxRange + 1)
      last = this.lastPageNumber
    } else {
      first = this.currentPageNumber - Math.floor(maxRange / 2)
      last = this.currentPageNumber + Math.floor(maxRange / 2)
    }

    const pages = []
    for (let pageNumber = first; pageNumber <= last; pageNumber++) {
      pages.push(
        <li
          key={pageNumber}
          className={
            "pagination-item " +
            (pageNumber === this.currentPageNumber ? "active" : "")
          }>
          <a
            className="pagination-item__link"
            href={`?page=${pageNumber}`}
            onClick={e => {
              e.preventDefault()
              this.movePage(pageNumber)
            }}>
            {pageNumber}
          </a>
        </li>
      )
    }
    return pages
  }

  render() {
    return (
      <ul className="pagination">
        <li
          className={
            "pagination-item--prev " +
            (this.currentPageNumber === 1 ? "disabled" : "")
          }>
          {this.currentPageNumber > 1 && (
            <a
              className="pagination-item__link"
              href={`?page=${this.currentPageNumber - 1}`}
              onClick={e => {
                e.preventDefault()
                this.movePage(this.currentPageNumber - 1)
              }}>
              &lt;
            </a>
          )}
        </li>
        {this.renderItems()}
        <li
          className={
            "pagination-item--next " +
            (this.currentPageNumber === this.lastPageNumber ? "disabled" : "")
          }>
          {this.currentPageNumber < this.lastPageNumber && (
            <a
              className="pagination-item__link"
              href={`?page=${this.currentPageNumber + 1}`}
              onClick={e => {
                e.preventDefault()
                this.movePage(this.currentPageNumber + 1)
              }}>
              &gt;
            </a>
          )}
        </li>
      </ul>
    )
  }
}
