import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

/**
 * ヘッダー
 */
export default ({ blogUrl }) => {
  return (
    <header className="site-header">
      <h1 className="title">
        <Link href="/">
          <a className="title__link"></a>
        </Link>
      </h1>
      <GlobalNav blogUrl={blogUrl} />
    </header>
  )
}

/**
 * グローバルナビゲーション
 */
const GlobalNav = ({ blogUrl }) => {
  const [enableToggleMenu, setEnableToggleMenu] = useState(false)
  const [isToggleMenuActive, setToggleMenuActive] = useState(false)

  const handleResize = () => {
    // ウィンドウの幅が一定以下ならトグルメニューを有効にする
    setEnableToggleMenu(window.matchMedia("(max-width: 899px)").matches)
  }

  useEffect(() => {
    // componentDidMount と同じタイミングで実行する
    if (typeof window === "undefined") {
      return
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // ハンバーガーボタンを押下した際の処理
  const handleHamburgerButtonClick = useCallback(() => {
    setToggleMenuActive(!isToggleMenuActive)
  })

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
        <a className="global-nav-item__link" href={url}>
          {title}
        </a>
      ) : (
        { title }
      )}
    </li>
  )
}
