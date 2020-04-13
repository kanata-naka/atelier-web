import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { Transition } from "react-transition-group"

const transitionClasses = {
  entering: "slide-entering",
  entered: "slide-entered",
  exiting: "slide-exiting",
  exited: "slide-exited"
}

export default ({ tagsInfo }) => {
  const [collasped, setCollasped] = useState(true)
  const [height, setHeight] = useState(48)
  const tagListRef = useRef(null)

  // トグルボタンを押下した際の処理
  const handleClickToggleButton = useCallback(() => {
    setHeight(tagListRef.current.clientHeight)
    setCollasped(!collasped)
  }, [collasped])

  // タグの最大件数
  const maxCount = Object.keys(tagsInfo).reduce(
    (a, b) => Math.max(a, tagsInfo[b]),
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
            className={`tags-info ${transitionClasses[state] || ""}`}
            style={transitionStyle[state]}>
            <ul className="tag-list" ref={tagListRef}>
              {Object.keys(tagsInfo).map((tag, index) => {
                const rate = tagsInfo[tag] / maxCount
                return (
                  <TagInfo
                    key={index}
                    tag={tag}
                    count={tagsInfo[tag]}
                    rate={rate}
                  />
                )
              })}
            </ul>
            <div className="tags-info-foreground" />
            <div className="tags-info-slide-button">
              <a
                href="#"
                className="tags-info-slide-button__link"
                onClick={handleClickToggleButton}>
                <i className="fas fa-chevron-down tags-info-slide-button__down"></i>
                <i className="fas fa-chevron-up tags-info-slide-button__up"></i>
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
