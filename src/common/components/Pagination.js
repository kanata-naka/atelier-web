import React from "react"
import Router from "next/router"

/**
 * ページネーション
 */
export default ({ pagination, maxRange }) => {
  // 現在のページ
  const currentPage = pagination.page
  // 最後のページ
  const lastPage = Math.ceil(pagination.total / pagination.perPage)

  const handlePageNumberButtonClick = (e, page) => {
    e.preventDefault()
    // ドキュメントの読み取り量を減らすため、shallow routingを使用する
    Router.push(`/works?page=${page}`, `/works?page=${page}`, {
      shallow: true
    })
  }

  const renderPageNumberButtons = () => {
    let first, last
    if (lastPage < maxRange) {
      first = 1
      last = lastPage
    } else if (currentPage <= Math.floor(maxRange / 2) + 1) {
      first = 1
      last = Math.min(maxRange, lastPage)
    } else if (currentPage >= lastPage - Math.floor(maxRange / 2)) {
      first = Math.max(1, lastPage - maxRange + 1)
      last = lastPage
    } else {
      first = currentPage - Math.floor(maxRange / 2)
      last = currentPage + Math.floor(maxRange / 2)
    }
    const pageNumberButtons = []
    for (let page = first; page <= last; page++) {
      pageNumberButtons.push(
        <PageNumberButton
          key={page}
          page={page}
          isActive={page === currentPage}
          onClick={handlePageNumberButtonClick}
        />
      )
    }
    return pageNumberButtons
  }

  return (
    <ul className="pagination">
      <PagePrevButton
        page={currentPage - 1}
        disabled={currentPage === 1}
        onClick={handlePageNumberButtonClick}
      />
      {renderPageNumberButtons()}
      <PageNextButton
        page={currentPage + 1}
        disabled={currentPage === lastPage}
        onClick={handlePageNumberButtonClick}
      />
    </ul>
  )
}

const PagePrevButton = ({ page, disabled, onClick }) => {
  return (
    <li className={`pagination-item--prev ${disabled ? "disabled" : ""}`}>
      {!disabled && (
        <a
          className="pagination-item__link"
          href={`/works?page=${page}`}
          onClick={e => onClick(e, page)}>
          &lt;
        </a>
      )}
    </li>
  )
}

const PageNumberButton = ({ page, isActive, onClick }) => {
  return (
    <li className={`pagination-item ${isActive ? "active" : ""}`}>
      <a
        className="pagination-item__link"
        href={`/works?page=${page}`}
        onClick={e => onClick(e, page)}>
        {page}
      </a>
    </li>
  )
}

const PageNextButton = ({ page, disabled, onClick }) => {
  return (
    <li className={`pagination-item--next ${disabled ? "disabled" : ""}`}>
      {!disabled && (
        <a
          className="pagination-item__link"
          href={`/works?page=${page}`}
          onClick={e => onClick(e, page)}>
          &gt;
        </a>
      )}
    </li>
  )
}
