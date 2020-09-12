import Link from "next/link"
import GlobalNav from "./GlobalNav"

/**
 * ヘッダー
 */
export default () => {
  return (
    <header className="site-header">
      <Link href="/">
        <a>
          <h1 className="site-logo"></h1>
        </a>
      </Link>
      <GlobalNav />
    </header>
  )
}
