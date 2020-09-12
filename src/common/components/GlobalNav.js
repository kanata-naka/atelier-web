import { useState, useCallback } from "react"
import Link from "next/link"
import { useMediaQuery } from "../hooks"
import { Globals } from "../models"

/**
 * グローバルナビゲーション
 */
export default () => {
  const [isToggleMenuActive, setToggleMenuActive] = useState(false)
  // ウィンドウの幅が一定以下ならトグルメニューを有効にする
  const enableToggleMenu = useMediaQuery("(max-width: 834px)")

  const handleHamburgerButtonClick = useCallback(() => {
    // トグルメニューを切り替える
    setToggleMenuActive(!isToggleMenuActive)
  }, [isToggleMenuActive])

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
          visibility: (!enableToggleMenu || isToggleMenuActive) && "visible"
        }}>
        <GlobalNavItem id="about" title="ABOUT" path="/#about" />
        <GlobalNavItem id="blog" title="BLOG" url={Globals.env.BLOG_URL} />
        <GlobalNavItem id="works" title="WORKS" path="/works" />
        <GlobalNavItem id="gallery" title="GALLERY" path="/gallery" />
        <GlobalNavItem id="contact" title="CONTACT" path="/contact" />
      </ul>
    </nav>
  )
}

/**
 * ハンバーガーボタン
 */
const HamburgerButton = ({ isActive, onClick }) => {
  return (
    <div
      className={`global-nav-hamburger-button ${isActive && "active"}`}
      onClick={onClick}>
      <i className="fas fa-bars global-nav-hamburger-button__icon"></i>
    </div>
  )
}

const GlobalNavItem = ({ title, id, path, url }) => {
  return (
    <li key={id} className="global-nav-item">
      {path ? (
        <Link href={path}>
          <a className="global-nav-item__link">{title}</a>
        </Link>
      ) : url ? (
        <a className="global-nav-item__link" href={url} target="_blank">
          {title}
        </a>
      ) : (
        { title }
      )}
    </li>
  )
}
