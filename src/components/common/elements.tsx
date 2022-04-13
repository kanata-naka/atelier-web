import React, { FC } from "react";

/**
 * ページの見出し
 */
export const PageHeading: FC = ({ children }) => {
  return <h2 className="page-heading">{children}</h2>;
};

/**
 * セクションの見出し
 */
export const SectionHeading: FC = ({ children }) => {
  return <h2 className="section-heading">{children}</h2>;
};
