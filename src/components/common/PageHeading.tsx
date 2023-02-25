import React, { ReactNode } from "react";
import { css } from "@emotion/react";

export default function PageHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      css={css`
        padding: 24px 0;
        font-size: 32px;
        font-weight: bold;
        line-height: 32px;
        color: #0f165a;
        text-align: center;
      `}
    >
      {children}
    </h2>
  );
}
