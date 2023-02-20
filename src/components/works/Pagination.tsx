import React, { FC } from "react";
import Router from "next/router";
import { PaginationState } from "../../types";
import { getPageNumberRange } from "../../utils/pageUtil";

/**
 * ページネーション
 */
const Pagination: FC<{
  state: PaginationState;
  maxRange: number;
}> = ({ state, maxRange }) => {
  // 現在のページ
  const currentPage = state.page;
  // 最後のページ
  const lastPage = Math.ceil(state.total / state.perPage);

  const handlePageNumberButtonClick = (
    event: React.MouseEvent,
    page: number
  ) => {
    event.preventDefault();
    // ドキュメントの読み取り量を減らすため、shallow routingを使用する
    Router.push(`/works?page=${page}`, `/works?page=${page}`, {
      shallow: true,
    });
  };

  return (
    <ul className="pagination">
      <PagePrevButton
        page={currentPage - 1}
        disabled={currentPage === 1}
        onClick={handlePageNumberButtonClick}
      />
      {getPageNumberRange(currentPage, lastPage, maxRange).map((page) => (
        <PageNumberButton
          key={page}
          page={page}
          isActive={page === currentPage}
          onClick={handlePageNumberButtonClick}
        />
      ))}
      <PageNextButton
        page={currentPage + 1}
        disabled={currentPage === lastPage}
        onClick={handlePageNumberButtonClick}
      />
    </ul>
  );
};

const PagePrevButton: FC<{
  page: number;
  disabled: boolean;
  onClick: (e: React.MouseEvent, page: number) => void;
}> = ({ page, disabled, onClick }) => {
  return (
    <li className={`pagination-item--prev ${disabled ? "disabled" : ""}`}>
      {!disabled && (
        <a
          className="pagination-item__link"
          href={`/works?page=${page}`}
          onClick={(e) => onClick(e, page)}>
          &lt;
        </a>
      )}
    </li>
  );
};

const PageNumberButton: FC<{
  page: number;
  isActive: boolean;
  onClick: (e: React.MouseEvent, page: number) => void;
}> = ({ page, isActive, onClick }) => {
  return (
    <li className={`pagination-item ${isActive ? "active" : ""}`}>
      <a
        className="pagination-item__link"
        href={`/works?page=${page}`}
        onClick={(e) => onClick(e, page)}>
        {page}
      </a>
    </li>
  );
};

const PageNextButton: FC<{
  page: number;
  disabled: boolean;
  onClick: (e: React.MouseEvent, page: number) => void;
}> = ({ page, disabled, onClick }) => {
  return (
    <li className={`pagination-item--next ${disabled ? "disabled" : ""}`}>
      {!disabled && (
        <a
          className="pagination-item__link"
          href={`/works?page=${page}`}
          onClick={(e) => onClick(e, page)}>
          &gt;
        </a>
      )}
    </li>
  );
};

export default Pagination;
