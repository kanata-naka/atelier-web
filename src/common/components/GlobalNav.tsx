import React from "react";
import { useState, useCallback } from "react";
import Link from "next/link";
import { useMediaQuery } from "../hooks";
import { BLOG_URL } from "../models";

/** グローバルナビゲーション */
export default () => {
  const [isToggleMenuActive, setToggleMenuActive] = useState(false);

  // ウィンドウの幅が一定以下ならトグルメニューを有効にする
  const enableToggleMenu = useMediaQuery("(max-width: 834px)");

  const handleHamburgerButtonClick = useCallback(() => {
    // トグルメニューを切り替える
    setToggleMenuActive(!isToggleMenuActive);
  }, [isToggleMenuActive]);

  return (
    <nav className="global-nav">
      {enableToggleMenu && (
        <HamburgerButton
          isActive={isToggleMenuActive}
          onClick={handleHamburgerButtonClick}
        />
      )}
      <ul
        className="global-nav-list"
        role="navigation"
        style={{
          visibility:
            !enableToggleMenu || isToggleMenuActive ? "visible" : null,
        }}>
        <GlobalNavItem id="about" title="ABOUT" path="/#about" />
        <GlobalNavItem id="blog" title="BLOG" url={BLOG_URL} />
        <GlobalNavItem id="works" title="WORKS" path="/works" />
        <GlobalNavItem id="gallery" title="GALLERY" path="/gallery" />
        <GlobalNavItem id="contact" title="CONTACT" path="/contact" />
      </ul>
    </nav>
  );
};

/** ハンバーガーボタン */
const HamburgerButton = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`global-nav-hamburger-button ${isActive && "active"}`}
      onClick={onClick}>
      <i className="fas fa-bars global-nav-hamburger-button__icon"></i>
    </div>
  );
};

const GlobalNavItem = ({
  title,
  id,
  path,
  url,
}: {
  title: string;
  id: string;
  path?: string;
  url?: string;
}) => {
  return (
    <li key={id} className="global-nav-item">
      {path ? (
        <Link href={path}>
          <a className="global-nav-item__link">{title}</a>
        </Link>
      ) : url ? (
        <a
          className="global-nav-item__link"
          href={url}
          target="_blank"
          rel="noreferrer">
          {title}
        </a>
      ) : (
        { title }
      )}
    </li>
  );
};
