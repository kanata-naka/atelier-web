import React from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import GlobalNavigation from "@/components/common/GlobalNavigation";
import { frameBorderColor, siteHeaderHeight } from "@/styles";

function Header() {
  return (
    <header
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: ${siteHeaderHeight}px;
        padding: 0 18px;
        overflow: visible;
        background-color: white;
        border-bottom: 1px solid ${frameBorderColor};
        opacity: 0.8;
      `}
    >
      <SiteLogo />
      <GlobalNavigation />
    </header>
  );
}

function SiteLogo() {
  return (
    <h1
      css={css`
        transition: opacity 250ms;

        &:hover {
          opacity: 0.8;
        }
      `}
    >
      <Link href="/">
        <Image
          src="/images/atelier-logo.svg"
          width={205}
          height={28}
          alt="カナタノアトリエ"
          css={css`
            display: block;
          `}
        />
      </Link>
    </h1>
  );
}

export default Header;
