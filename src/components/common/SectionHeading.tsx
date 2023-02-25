import React, { ReactNode } from "react";
import { css } from "@emotion/react";

export default function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      css={css`
        padding: 24px 0;
        font-size: 28px;
        line-height: 28px;
        color: #4c4c4c;
        text-align: center;
      `}
    >
      {children}
    </h2>
  );
}
