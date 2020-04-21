import Link from "next/link"
import GlobalNav from "./GlobalNav"

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
