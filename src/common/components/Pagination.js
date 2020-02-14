import React from "react"
import Link from "next/link"
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

  render() {
    return (
      <ul className="pagination">
        <PagePrevButton
          pageNumber={this.currentPageNumber - 1}
          disabled={this.currentPageNumber === 1}
        />
        {this.renderPageNumberButtons()}
        <PageNextButton
          pageNumber={this.currentPageNumber + 1}
          disabled={this.currentPageNumber === this.lastPageNumber}
        />
      </ul>
    )
  }

  renderPageNumberButtons() {
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

    const pageNumberButtons = []
    for (let pageNumber = first; pageNumber <= last; pageNumber++) {
      pageNumberButtons.push(
        <PageNumberButton
          key={pageNumber}
          pageNumber={pageNumber}
          isActive={pageNumber === this.currentPageNumber}
        />
      )
    }
    return pageNumberButtons
  }
}

const PagePrevButton = ({ pageNumber, disabled }) => {
  return (
    <li className={`pagination-item--prev ${disabled && "disabled"}`}>
      {!disabled && (
        <Link href={`?page=${pageNumber}`}>
          <a className="pagination-item__link">
            &lt;
          </a>
        </Link>
      )}
    </li>
  )
}

const PageNextButton = ({ pageNumber, disabled }) => {
  return (
    <li className={`pagination-item--next ${disabled && "disabled"}`}>
      {!disabled && (
        <Link href={`?page=${pageNumber}`}>
          <a className="pagination-item__link">
            &gt;
          </a>
        </Link>
      )}
    </li>
  )
}

const PageNumberButton = ({ pageNumber, isActive }) => {
  return (
    <li className={`pagination-item ${isActive && "active"}`}>
      <Link href={`?page=${pageNumber}`}>
        <a className="pagination-item__link">
          {pageNumber}
        </a>
      </Link>
    </li>
  )
}
