import React, { FC } from "react";
import Link from "next/link";
import GlobalNavigation from "./GlobalNavigation";

/**
 * ヘッダー
 */
const Header: FC = () => {
  return (
    <header className="site-header">
      <Link href="/">
        <a>
          <h1 className="site-logo"></h1>
        </a>
      </Link>
      <GlobalNavigation />
    </header>
  );
};

export default Header;
