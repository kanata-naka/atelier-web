import React, { useState, useCallback, createContext, useContext } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import { FANBOX_URL } from "@/constants";
import { useMediaQuery } from "@/hooks";
import { responsiveBoundaryWidth } from "@/styles";

const ToggleMenuContext = createContext({
  enable: false,
  isActive: false,
});

function GlobalNavigation() {
  const [isToggleMenuActive, setToggleMenuActive] = useState(false);

  // ウィンドウの幅が一定以下ならトグルメニューを有効にする
  const enableToggleMenu = useMediaQuery(`(max-width: ${responsiveBoundaryWidth}px)`);

  const handleHamburgerButtonClick = useCallback(() => {
    setToggleMenuActive(!isToggleMenuActive);
  }, [isToggleMenuActive]);

  const additionalStyle = enableToggleMenu
    ? css`
        position: absolute;
        top: 100%;
        right: 0;
        flex-direction: column;
        visibility: ${isToggleMenuActive ? "visible" : "hidden"};
      `
    : css`
        align-items: center;
        visibility: visible;
      `;

  return (
    <nav className="global-navigation">
      <ToggleMenuContext.Provider value={{ enable: enableToggleMenu, isActive: isToggleMenuActive }}>
        <HamburgerButton onClick={handleHamburgerButtonClick} />
        <ul
          role="navigation"
          css={css`
            display: flex;
            visibility: hidden;
            user-select: none;
            ${additionalStyle}
          `}
        >
          <GlobalNavigationItem id="fanbox" title="FANBOX" url={FANBOX_URL} />
          <GlobalNavigationItem id="gallery" title="GALLERY" path="/gallery" />
          <GlobalNavigationItem id="works" title="WORKS" path="/works" />
          <GlobalNavigationItem id="comics" title="COMICS" path="/comics" />
          <GlobalNavigationItem id="contact" title="CONTACT" path="/contact" />
        </ul>
      </ToggleMenuContext.Provider>
    </nav>
  );
}

function HamburgerButton({ onClick }: { onClick: () => void }) {
  const { enable, isActive } = useContext(ToggleMenuContext);

  if (!enable) {
    return null;
  }

  const additionalStyle = isActive
    ? css`
        color: white;
        text-shadow:
          black 1px 1px 0,
          black -1px -1px 0,
          black -1px 1px 0,
          black 1px -1px 0,
          black 0px 1px 0,
          black 0 -1px 0,
          black -1px 0 0,
          black 1px 0 0;
      `
    : css`
        &:hover {
          color: #4c4c4c;
        }
      `;

  return (
    <div
      onClick={onClick}
      css={css`
        font-size: 24px;
        line-height: 24px;
        cursor: pointer;
        ${additionalStyle}
      `}
    >
      <i className="fas fa-bars"></i>
    </div>
  );
}

function GlobalNavigationItem({ title, id, path, url }: { title: string; id: string; path?: string; url?: string }) {
  const { enable } = useContext(ToggleMenuContext);

  const additionalStyle = enable
    ? css`
        width: 175px;
        padding: 10px 16px;
        overflow: hidden;
        text-align: right;
        background-color: white;

        &:not(:first-child) {
          margin-top: 1px;
        }

        & a {
          display: block;
        }
      `
    : css`
        &:not(:first-child) {
          margin-left: 18px;
        }
      `;

  return (
    <li
      key={id}
      css={css`
        font-size: 20px;
        font-weight: bold;
        line-height: 20px;
        color: #4c4c4c;
        transition: color 250ms;
        ${additionalStyle}

        & a {
          :hover {
            color: silver;
          }
        }
      `}
    >
      {path ? (
        <Link href={path}>{title}</Link>
      ) : url ? (
        <a href={url} target="_blank" rel="noreferrer">
          {title}
        </a>
      ) : (
        title
      )}
    </li>
  );
}

export default GlobalNavigation;
