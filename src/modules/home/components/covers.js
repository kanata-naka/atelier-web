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
      <BackgroundList items={items} currentIndex={currentIndex} />
      <Navigation
        items={items}
        currentIndex={currentIndex}
        onSelect={handleNavItemClick}
      />
    </section>
  )
}

const BackgroundList = ({ items, currentIndex }) => {
  return (
    <ul className="cover-background-list">
      {items.map((item, index) => (
        <Background
          item={item}
          index={index}
          isActive={index === currentIndex}
        />
      ))}
    </ul>
  )
}

const Background = ({ item, index, isActive }) => {
  return (
    <li
      key={index}
      className="cover-background"
      style={{
        backgroundImage: `url(${item.imageUrl})`,
        ...(isActive ? { opacity: 1 } : {})
      }}></li>
  )
}

const Navigation = ({ items, currentIndex, onSelect }) => {
  return (
    <ul className="cover-nav">
      {items.map((item, index) => (
        <NavigationItem
          item={item}
          index={index}
          isActive={index === currentIndex}
          onClick={() => onSelect(index)}
        />
      ))}
    </ul>
  )
}

const NavigationItem = ({ item, index, isActive, onClick }) => {
  return (
    <li
      key={index}
      className={"cover-nav-item " + (isActive ? "active" : "")}
      onClick={onClick}
      style={{
        backgroundImage: `url(${item.thumbnailImageUrl})`
      }}></li>
  )
}
