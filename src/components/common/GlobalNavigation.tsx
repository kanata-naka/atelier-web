import React, { useState, useCallback } from "react";
import Link from "next/link";
import { BLOG_URL } from "@/constants";
import { useMediaQuery } from "@/hooks";

function GlobalNavigation() {
  const [isToggleMenuActive, setToggleMenuActive] = useState(false);

  // ウィンドウの幅が一定以下ならトグルメニューを有効にする
  const enableToggleMenu = useMediaQuery("(max-width: 834px)");

  const handleHamburgerButtonClick = useCallback(() => {
    setToggleMenuActive(!isToggleMenuActive);
  }, [isToggleMenuActive]);

  return (
    <nav className="global-navigation">
      {enableToggleMenu && <HamburgerButton isActive={isToggleMenuActive} onClick={handleHamburgerButtonClick} />}
      <ul
        className="global-navigation-list"
        role="navigation"
        style={{
          visibility: !enableToggleMenu || isToggleMenuActive ? "visible" : undefined,
        }}
      >
        <GlobalNavigationItem id="about" title="ABOUT" path="/#about" />
        <GlobalNavigationItem id="blog" title="BLOG" url={BLOG_URL} />
        <GlobalNavigationItem id="works" title="WORKS" path="/works" />
        <GlobalNavigationItem id="gallery" title="GALLERY" path="/gallery" />
        <GlobalNavigationItem id="contact" title="CONTACT" path="/contact" />
      </ul>
    </nav>
  );
}

function HamburgerButton({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <div className={`global-navigation-hamburger-button ${isActive && "active"}`} onClick={onClick}>
      <i className="fas fa-bars global-navigation-hamburger-button__icon"></i>
    </div>
  );
}

function GlobalNavigationItem({ title, id, path, url }: { title: string; id: string; path?: string; url?: string }) {
  return (
    <li key={id} className="global-navigation-item">
      {path ? (
        <Link className="global-navigation-item__link" href={path}>
          {title}
        </Link>
      ) : url ? (
        <a className="global-navigation-item__link" href={url} target="_blank" rel="noreferrer">
          {title}
        </a>
      ) : (
        title
      )}
    </li>
  );
}

export default GlobalNavigation;
