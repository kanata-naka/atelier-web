import React from "react";
import Link from "next/link";
import GlobalNavigation from "@/components/common/GlobalNavigation";

function Header() {
  return (
    <header className="site-header">
      <SiteLogo />
      <GlobalNavigation />
    </header>
  );
}

function SiteLogo() {
  return (
    <Link href="/">
      <h1 className="site-logo"></h1>
    </Link>
  );
}

export default Header;
