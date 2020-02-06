import { useState, useRef, useEffect } from "react"

// 画像を切り替える間隔（ミリ秒）
const SWITCH_ITEM_INTERVAL = 7000

export default ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const indexRef = useRef(currentIndex)
  useEffect(() => {
    indexRef.current = currentIndex
  }, [currentIndex])
  // 画像を切り替える処理
  const handleSwitchItem = () => {
    let nextIndex = indexRef.current + 1
    if (nextIndex === items.length) {
      // 最初に戻る
      nextIndex = 0
    }
    setCurrentIndex(nextIndex)
  }
  const currentIntervalIdRef = useRef(null)
  useEffect(() => {
    // 一定時間ごとに画像を切り替える
    currentIntervalIdRef.current = setInterval(
      handleSwitchItem,
      SWITCH_ITEM_INTERVAL
    )
  }, [])
  const handleNavItemClick = index => {
    if (currentIntervalIdRef.current) {
      clearInterval(currentIntervalIdRef.current)
    }
    setCurrentIndex(index)
    currentIntervalIdRef.current = setInterval(
      handleSwitchItem,
      SWITCH_ITEM_INTERVAL
    )
  }
  return (
    <section className="cover">
      <ul className="cover-background">
        {items.map((item, index) => (
          <li
            key={index}
            className="cover-background-item"
            style={{
              backgroundImage: `url(${item.imageUrl})`,
              ...(index === currentIndex ? { opacity: 1 } : {})
            }}></li>
        ))}
      </ul>
      <ul className="cover-nav">
        {items.map((item, index) => (
          <li
            key={index}
            className={
              "cover-nav-item " + (index === currentIndex ? "active" : "")
            }
            onClick={() => {
              handleNavItemClick(index)
            }}
            style={{
              backgroundImage: `url(${item.thumbnailImageUrl})`
            }}></li>
        ))}
      </ul>
    </section>
  )
}
