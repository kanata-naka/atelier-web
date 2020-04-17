import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { Transition } from "react-transition-group"

const transitionClasses = {
  entering: "slide-entering",
  entered: "slide-entered",
  exiting: "slide-exiting",
  exited: "slide-exited"
}

export default ({ tagInfo }) => {
  const [collasped, setCollasped] = useState(true)
  const [height, setHeight] = useState(48)
  const tagListRef = useRef(null)

  // トグルボタンを押下した際の処理
  const handleClickToggleButton = useCallback(() => {
    setHeight(tagListRef.current.clientHeight)
    setCollasped(!collasped)
  }, [collasped])

  // タグの最大件数
  const maxCount = tagInfo.reduce(
    (_maxCount, tag) => Math.max(_maxCount, tag.count),
    1
  )

  return (
    <Transition in={!collasped} timeout={500}>
      {state => {
        const transitionStyle = {
          entering: { height: `${height}px` },
          entered: { height: `${height}px` },
          exiting: { height: "48px" },
          exited: { height: "48px" }
        }
        return (
          <div
            className={`tag-info ${transitionClasses[state] || ""}`}
            style={transitionStyle[state]}>
            <ul className="tag-list" ref={tagListRef}>
              {tagInfo.map((tag, index) => {
                const rate = tag.count / maxCount
                return (
                  <TagInfo
                    key={index}
                    tag={tag.name}
                    count={tag.count}
                    rate={rate}
                  />
                )
              })}
            </ul>
            <div className="tag-info-foreground" />
            <div className="tag-info-slide-button">
              <a
                href="#"
                className="tag-info-slide-button__link"
                onClick={handleClickToggleButton}>
                <i className="fas fa-chevron-down tag-info-slide-button__down"></i>
                <i className="fas fa-chevron-up tag-info-slide-button__up"></i>
              </a>
            </div>
          </div>
        )
      }}
    </Transition>
  )
}

const TagInfo = ({ tag, count, rate }) => {
  return (
    <li className="tag-list-item">
      <Link href={`/gallery?tag=${tag}`}>
        <a className="tag-list-item__link">
          <span
            className="tag-name"
            style={{
              fontSize: `${0.8 + rate}em`,
              color: `rgba(${Math.max(0, 88 - 80 * rate)},${Math.max(
                0,
                88 - 80 * rate
              )},${Math.max(0, 221 - 140 * rate)},1)`
            }}>
            {tag}
          </span>
          <span className="tag-count">{`(${count})`}</span>
        </a>
      </Link>
    </li>
  )
}
