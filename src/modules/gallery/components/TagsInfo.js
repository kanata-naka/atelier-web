import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"

export default ({ tagsInfo }) => {
  const [collasped, setCollasped] = useState(true)

  // トグルボタンを押下した際の処理
  const handleClickToggleButton = useCallback(
    e => {
      setCollasped(!collasped)
    },
    [collasped]
  )

  // タグの最大件数
  const maxCount = Object.keys(tagsInfo).reduce(
    (a, b) => Math.max(a, tagsInfo[b]),
    1
  )

  return (
    <div className={`tags-info ${!collasped ? "expanded" : ""}`}>
      <ul className="tag-list">
        {Object.keys(tagsInfo).map((tag, index) => {
          const rate = tagsInfo[tag] / maxCount
          return (
            <TagInfo key={index} tag={tag} count={tagsInfo[tag]} rate={rate} />
          )
        })}
      </ul>
      <div className="tags-info-foreground" />
      <div className="tags-info-slide-button">
        <a
          href="#"
          className="tags-info-slide-button__link"
          onClick={handleClickToggleButton}>
          {collasped ? (
            <i className="fas fa-chevron-down"></i>
          ) : (
            <i className="fas fa-chevron-up"></i>
          )}
        </a>
      </div>
    </div>
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
