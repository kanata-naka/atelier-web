import React from "react";
import { css } from "@emotion/react";
import { COPYRIGHT } from "@/constants";

function Footer() {
  return (
    <footer
      css={css`
        &:before {
          display: block;
          width: 100%;
          height: 2px;
          content: "";
          background: linear-gradient(to right, lightgray, gray);
        }
      `}
    >
      <Copyright />
    </footer>
  );
}

function Copyright() {
  return (
    <div
      css={css`
        padding: 16px 0;
        color: gray;
        text-align: center;
      `}
    >
      {COPYRIGHT}
    </div>
  );
}

export default Footer;
