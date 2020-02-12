import { useState, useRef, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { MODULE_NAME } from "../models"

// 画像を切り替える間隔（ミリ秒）
const SWITCH_ITEM_INTERVAL = 7000

const Carousel = ({ items }) => {
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
    <section className="top-carousel">
      <CarouselList items={items} currentIndex={currentIndex} />
      <Navigation
        items={items}
        currentIndex={currentIndex}
        onSelect={handleNavItemClick}
      />
    </section>
  )
}

const CarouselList = ({ items, currentIndex }) => {
  return (
    <ul className="top-carousel-list">
      {items.map((item, index) => (
        <CarouselListItem
          item={item}
          index={index}
          isActive={index === currentIndex}
        />
      ))}
    </ul>
  )
}

const CarouselListItem = ({ item, index, isActive }) => {
  return (
    <li
      key={index}
      className="top-carousel-list-item"
      style={{
        backgroundImage: `url(${item.imageUrl})`,
        ...(isActive ? { opacity: 1 } : {})
      }}></li>
  )
}

const Navigation = ({ items, currentIndex, onSelect }) => {
  return (
    <ul className="top-carousel-nav">
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
      className={"top-carousel-nav-item " + (isActive ? "active" : "")}
      onClick={onClick}
      style={{
        backgroundImage: `url(${item.thumbnailImageUrl})`
      }}></li>
  )
}

const mapStateToProps = state => ({
  items: state[MODULE_NAME].topImages
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Carousel)
