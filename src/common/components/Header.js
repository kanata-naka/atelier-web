import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

/**
 * ヘッダー
 */
export default () => {
  return (
    <header className="site-header">
      <h1 className="title">
        <Link href="/">
          <a className="title__link"></a>
        </Link>
      </h1>
      <GlobalNav />
    </header>
  )
}

/**
 * グローバルナビゲーション
 */
const GlobalNav = () => {
  const [enableToggleMenu, setEnableToggleMenu] = useState(false)
  const [isToggleMenuActive, setToggleMenuActive] = useState(false)

  useEffect(() => {
    // componentDidMount と同じタイミングで実行する
    if (typeof window === "undefined") {
      return
    }
    ;(window.onresize = () => {
      // ウィンドウの幅が一定以下ならトグルメニューを有効にする
      setEnableToggleMenu(window.matchMedia("(max-width: 899px)").matches)
    })()
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
      {(!enableToggleMenu || isToggleMenuActive) && (
        <ul className="global-nav">
          <GlobalNavItem id="about" title="ABOUT" url="/#about" />
          <GlobalNavItem id="blog" title="BLOG" url="/blog" />
          <GlobalNavItem id="works" title="WORKS" url="/works" />
          <GlobalNavItem id="gallery" title="GALLERY" url="/gallery" />
        </ul>
      )}
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

const GlobalNavItem = ({ title, id, url }) => {
  return (
    <li key={id} className="global-nav-item">
      {url ? (
        <Link href={url}>
          <a className="global-nav-item__link">{title}</a>
        </Link>
      ) : (
        { title }
      )}
    </li>
  )
}
