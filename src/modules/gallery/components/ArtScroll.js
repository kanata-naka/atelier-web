import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { callFunction } from "../../../common/firebase"
import { Globals } from "../../../common/models"
import GalleryModal from "./GalleryModal"
import { LIMIT } from "../models"

/**
 * ページの最後までスクロールされているかどうかを返す
 */
const hasScrolledToBottom = () => {
  // ページ全体の高さを取得する
  // ※ブラウザ間の差異をカバーする
  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  )
  // ページの最後までスクロールした際の位置
  const offsetScrolledToBottom = pageHeight - window.innerHeight
  // 現在のスクロール位置
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop
  // ※iOSのバウンドを考慮して「>=」にする
  return currentScrollTop >= offsetScrolledToBottom
}

export default ({
  tag,
  items: initinalItems,
  fetchedAll: initialFetchedAll
}) => {
  const [items, setItems] = useState([...initinalItems])
  const [loading, setLoading] = useState(false)
  const [fetchedAll, setFetchedAll] = useState(initialFetchedAll)

  useEffect(() => {
    // 同じページ間の遷移（例：タグのリンクを押下した）場合、ComponentやStateはリセットされない模様。
    // →データをリセットする
    setItems(initinalItems)
    setLoading(false)
    setFetchedAll(initialFetchedAll)
  }, [initinalItems])

  // 次の${LIMIT}件を取得する
  const load = async () => {
    if (fetchedAll || loading || !hasScrolledToBottom()) {
      return
    }
    setLoading(true)
    try {
      const response = await callFunction({
        name: "api-arts-get",
        data: {
          lastId: items[items.length - 1].id,
          limit: LIMIT,
          tag: tag
        },
        globals: Globals
      })
      setItems([...items, ...response.data.result])
      setFetchedAll(response.data.fetchedAll)
    } catch (error) {
      console.error(error)
    }
    setTimeout(function() {
      setLoading(false)
    }, 100)
  }

  // ※timerだけは変更頻度が多すぎるので別のエフェクトで管理する
  const [timer, setTimer] = useState(0)
  const timerRef = useRef(timer)
  useEffect(() => {
    timerRef.current = timer
  }, [timer])

  const handleScroll = () => {
    if (timerRef.current) {
      // スクロール（またはリサイズ）が完了するまで待機する
      clearTimeout(timerRef.current)
    }
    setTimer(setTimeout(load, 100))
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        console.log("ArtScroll: Fetch aborted")
      }
    }
  }, [items, loading, fetchedAll])

  return (
    <section className="art-scroll">
      <div className="art-scroll-container">
        {items.map((item, index) => (
          <ArtScrollItem key={index} item={item} />
        ))}
      </div>
      <div className="loading">
        {loading && <img className="loading-image" src="/images/loading.png" />}
      </div>
      <GalleryModal.Component />
    </section>
  )
}

const ArtScrollItem = ({ item }) => {
  return (
    <div className="art-scroll-item">
      <ArtScrollItemBackground image={item.images[0]} />
      <ArtScrollItemForeground
        className="art-scroll-item-foreground"
        id={item.id}
        onClick={e => {
          e.preventDefault()
          // モーダルを開く
          GalleryModal.open(item)
        }}></ArtScrollItemForeground>
    </div>
  )
}

const ArtScrollItemBackground = ({ image }) => {
  return (
    <div
      className="art-scroll-item-background"
      style={{
        backgroundImage: `url(${image.url})`
      }}></div>
  )
}

const ArtScrollItemForeground = ({ id, onClick, children, ...props }) => {
  return (
    <Link href={`/gallery?id=${id}`} as={`/gallery/${id}`}>
      <a className="art-scroll-item__link" onClick={onClick}>
        <div {...props}>{children}</div>
      </a>
    </Link>
  )
}
