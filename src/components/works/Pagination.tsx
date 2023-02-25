import React from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import { responsiveBoundaryWidth } from "@/styles";
import { PaginationState } from "@/types";
import { getPageNumberRange } from "@/utils/pageUtil";

function Pagination({ state, maxRange }: { state: PaginationState; maxRange: number }) {
  const currentPage = state.page;
  const lastPage = Math.ceil(state.total / state.perPage);

  const handlePageButtonClick = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    // ドキュメントの読み取り量を減らすため、shallow routingを使用する
    Router.push(`/works?page=${page}`, `/works?page=${page}`, {
      shallow: true,
    });
  };

  return (
    <ul
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 12px;
      `}
    >
      <PageArrowButton
        variant="prev"
        page={currentPage - 1}
        disabled={currentPage === 1}
        onClick={handlePageButtonClick}
      />
      {getPageNumberRange(currentPage, lastPage, maxRange).map((page) => (
        <PageNumberButton key={page} page={page} isActive={page === currentPage} onClick={handlePageButtonClick} />
      ))}
      <PageArrowButton
        variant="next"
        page={currentPage + 1}
        disabled={currentPage === lastPage}
        onClick={handlePageButtonClick}
      />
    </ul>
  );
}

const pageButtonStyle = css`
  width: 32px;
  font-weight: bold;
  color: #303138;
  text-align: center;
  user-select: none;
  transition: opacity 250ms;

  @media (max-width: ${responsiveBoundaryWidth}px) {
    flex-grow: 1;
    height: 48px;
    margin: 0;
    line-height: 48px;
  }

  @media (min-width: ${responsiveBoundaryWidth + 1}px) {
    height: 32px;
    line-height: 32px;

    &:not(:first-child) {
      margin-left: 12px;
    }
  }

  &:hover {
    opacity: 0.8;
  }
`;

function PageNumberButton({
  page,
  isActive,
  onClick,
}: {
  page: number;
  isActive: boolean;
  onClick: (e: React.MouseEvent, page: number) => void;
}) {
  return (
    <li
      css={css`
        ${pageButtonStyle}

        @media (max-width: ${responsiveBoundaryWidth}px) {
          display: ${isActive ? "block" : "none"};
        }

        @media (min-width: ${responsiveBoundaryWidth + 1}px) {
          ${isActive &&
          css`
            color: white;
            background-color: #babaff;
          `}
        }
      `}
    >
      <a
        css={css`
          display: block;
        `}
        href={`/works?page=${page}`}
        onClick={(e) => onClick(e, page)}
      >
        {page}
      </a>
    </li>
  );
}

function PageArrowButton({
  variant,
  page,
  disabled,
  onClick,
}: {
  variant: "prev" | "next";
  page: number;
  disabled: boolean;
  onClick: (e: React.MouseEvent, page: number) => void;
}) {
  return (
    <li
      css={css`
        ${pageButtonStyle}
        width: 48px;
        font-size: 1.2em;
        background-color: #eeeeff;
        visibility: ${disabled ? "hidden" : "visible"};

        @media (max-width: ${responsiveBoundaryWidth}px) {
          flex-grow: 2;
        }
      `}
    >
      {!disabled && (
        <a
          css={css`
            display: block;
          `}
          href={`/works?page=${page}`}
          onClick={(e) => onClick(e, page)}
        >
          {variant === "prev" ? "<" : ">"}
        </a>
      )}
    </li>
  );
}

export default Pagination;
