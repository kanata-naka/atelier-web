import React, { FC, useState, useCallback } from "react";
import Link from "next/link";
import { BLOG_URL } from "../../constants";
import { useMediaQuery } from "../../hooks";

/**
 * グローバルナビゲーション
 */
const GlobalNavigation: FC = () => {
  const [isToggleMenuActive, setToggleMenuActive] = useState(false);

  // ウィンドウの幅が一定以下ならトグルメニューを有効にする
  const enableToggleMenu = useMediaQuery("(max-width: 834px)");

  const handleHamburgerButtonClick = useCallback(() => {
    // トグルメニューを切り替える
    setToggleMenuActive(!isToggleMenuActive);
  }, [isToggleMenuActive]);

  return (
    <nav className="global-navigation">
      {enableToggleMenu && (
        <HamburgerButton
          isActive={isToggleMenuActive}
          onClick={handleHamburgerButtonClick}
        />
      )}
      <ul
        className="global-navigation-list"
        role="navigation"
        style={{
          visibility:
            !enableToggleMenu || isToggleMenuActive ? "visible" : undefined,
        }}>
        <GlobalNavigationItem id="about" title="ABOUT" path="/#about" />
        <GlobalNavigationItem id="blog" title="BLOG" url={BLOG_URL} />
        <GlobalNavigationItem id="works" title="WORKS" path="/works" />
        <GlobalNavigationItem id="gallery" title="GALLERY" path="/gallery" />
        <GlobalNavigationItem id="contact" title="CONTACT" path="/contact" />
      </ul>
    </nav>
  );
};

/**
 * ハンバーガーボタン
 */
const HamburgerButton: FC<{
  isActive: boolean;
  onClick: () => void;
}> = ({ isActive, onClick }) => {
  return (
    <div
      className={`global-navigation-hamburger-button ${isActive && "active"}`}
      onClick={onClick}>
      <i className="fas fa-bars global-navigation-hamburger-button__icon"></i>
    </div>
  );
};

const GlobalNavigationItem: FC<{
  title: string;
  id: string;
  path?: string;
  url?: string;
}> = ({ title, id, path, url }) => {
  return (
    <li key={id} className="global-navigation-item">
      {path ? (
        <Link href={path}>
          <a className="global-navigation-item__link">{title}</a>
        </Link>
      ) : url ? (
        <a
          className="global-navigation-item__link"
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

export default GlobalNavigation;
