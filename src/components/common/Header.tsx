import React, { FC } from "react";
import Link from "next/link";
import GlobalNav from "./GlobalNav";

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
      <GlobalNav />
    </header>
  );
};

export default Header;
