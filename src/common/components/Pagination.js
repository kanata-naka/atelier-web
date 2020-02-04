import React from "react"

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
      offset: pagination.perPage * (pageNumber - 1)
    })
  }

  /**
   * 各ページのボタンを描画する
   */
  renderItems() {
    const pages = []
    for (let pageNumber = 1; pageNumber <= this.lastPageNumber; pageNumber++) {
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
        <li className="pagination-item--prev">
          <a
            className="pagination-item__link"
            href={
              this.currentPageNumber > 1
                ? `?page=${this.currentPageNumber - 1}`
                : ""
            }
            onClick={e => {
              e.preventDefault()
              if (this.currentPageNumber === 1) {
                return
              }
              this.movePage(this.currentPageNumber - 1)
            }}>
            &lt;
          </a>
        </li>
        {this.renderItems()}
        <li className="pagination-item--next">
          <a
            className="pagination-item__link"
            href={
              this.currentPageNumber < this.lastPageNumber
                ? `?page=${this.currentPageNumber + 1}`
                : ""
            }
            onClick={e => {
              e.preventDefault()
              if (this.currentPageNumber === this.lastPageNumber) {
                return
              }
              this.movePage(this.currentPageNumber + 1)
            }}>
            &gt;
          </a>
        </li>
      </ul>
    )
  }
}
