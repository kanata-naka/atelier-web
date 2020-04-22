import { useState, useCallback } from "react"
import Link from "next/link"
import { useMediaQuery } from "../hooks"

/**
 * グローバルナビゲーション
 */
export default ({ blogUrl }) => {
  const [isToggleMenuActive, setToggleMenuActive] = useState(false)
  // ウィンドウの幅が一定以下ならトグルメニューを有効にする
  const enableToggleMenu = useMediaQuery("(max-width: 899px)")

  // ハンバーガーボタンを押下した際の処理
  const handleHamburgerButtonClick = useCallback(() => {
    setToggleMenuActive(!isToggleMenuActive)
  }, [isToggleMenuActive])

  return (
    <nav className="global-nav-container" role="navigation">
      {enableToggleMenu && (
        <HamburgerButton
          isActive={isToggleMenuActive}
          onClick={handleHamburgerButtonClick}
        />
      )}
      <ul
        className="global-nav"
        style={{
          visibility: (!enableToggleMenu || isToggleMenuActive) && "visible"
        }}>
        <GlobalNavItem id="about" title="ABOUT" path="/#about" />
        <GlobalNavItem id="blog" title="BLOG" url={blogUrl} />
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
    <div className="global-nav-hamburger-button" onClick={onClick}>
      <i
        className={`fas fa-bars global-nav-hamburger-button__icon ${isActive &&
          "active"}`}></i>
    </div>
  )
}

const GlobalNavItem = ({ title, id, url, path }) => {
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
