import React from "react"
import Link from "next/link"

/**
 * ページネーション
 */
export default ({ pagination, maxRange }) => {
  // 現在のページ
  const currentPage = pagination.page
  // 最後のページ
  const lastPage = Math.ceil(pagination.total / pagination.perPage)

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
        />
      )
    }
    return pageNumberButtons
  }

  return (
    <ul className="pagination">
      <PagePrevButton page={currentPage - 1} disabled={currentPage === 1} />
      {renderPageNumberButtons()}
      <PageNextButton
        page={currentPage + 1}
        disabled={currentPage === lastPage}
      />
    </ul>
  )
}

const PagePrevButton = ({ page, disabled }) => {
  return (
    <li className={`pagination-item--prev ${disabled && "disabled"}`}>
      {!disabled && (
        <Link href={`?page=${page}`}>
          <a className="pagination-item__link">&lt;</a>
        </Link>
      )}
    </li>
  )
}

const PageNumberButton = ({ page, isActive }) => {
  return (
    <li className={`pagination-item ${isActive && "active"}`}>
      <Link href={`?page=${page}`}>
        <a className="pagination-item__link">{page}</a>
      </Link>
    </li>
  )
}

const PageNextButton = ({ page, disabled }) => {
  return (
    <li className={`pagination-item--next ${disabled && "disabled"}`}>
      {!disabled && (
        <Link href={`?page=${page}`}>
          <a className="pagination-item__link">&gt;</a>
        </Link>
      )}
    </li>
  )
}
