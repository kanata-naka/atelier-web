import React, { useState, useEffect, useCallback } from "react"

export default () => {
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
    <header className="site-header">
      <h1 className="title">
        <a className="title__link" href="/"></a>
      </h1>
      <nav className="global-nav-container" role="navigation">
        {enableToggleMenu && (
          <div
            className="global-nav-hamburger-button"
            onClick={handleHamburgerButtonClick}>
            <i
              className={
                "fas fa-bars global-nav-hamburger-button__icon " +
                (isToggleMenuActive ? "active" : "")
              }></i>
          </div>
        )}
        {(!enableToggleMenu || isToggleMenuActive) && (
          <ul className="global-nav">
            <GlobalNavItem href="/#about" id="about" title="ABOUT" />
            <GlobalNavItem href="/blog" id="blog" title="BLOG" />
            <GlobalNavItem href="/works" id="works" title="WORKS" />
            <GlobalNavItem href="/gallery" id="gallery" title="GALLERY" />
          </ul>
        )}
      </nav>
    </header>
  )
}

const GlobalNavItem = ({ href, title }) => {
  return (
    <li className="global-nav-item">
      {href ? (
        <a className="global-nav-item__link" href={href}>
          {title}
        </a>
      ) : (
        { title }
      )}
    </li>
  )
}
