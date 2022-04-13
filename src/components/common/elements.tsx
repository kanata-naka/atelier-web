import React, { FC } from "react";

export const PageHeading: FC = ({ children }) => {
  return <h2 className="page-heading">{children}</h2>;
};

export const SectionHeading: FC = ({ children }) => {
  return <h2 className="section-heading">{children}</h2>;
};
