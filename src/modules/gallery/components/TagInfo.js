import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Transition } from "react-transition-group";

const transitionClasses = {
  entering: "slide-entering",
  entered: "slide-entered",
  exiting: "slide-exiting",
  exited: "slide-exited"
};

/**
 * タグ一覧
 */
export default ({ tagInfo }) => {
  const [collasped, setCollasped] = useState(true);
  const [height, setHeight] = useState(48);
  const tagListRef = useRef(null);

  const handleClickToggleButton = useCallback(
    e => {
      e.preventDefault();
      setHeight(tagListRef.current.clientHeight);
      setCollasped(!collasped);
    },
    [collasped]
  );

  // タグの最大件数
  const maxCount = tagInfo.reduce(
    (_maxCount, tag) => Math.max(_maxCount, tag.count),
    1
  );

  return (
    <Transition in={!collasped} timeout={250}>
      {state => {
        const transitionStyle = {
          entering: { height: `${height}px` },
          entered: { height: `${height}px` },
          exiting: { height: "48px" },
          exited: { height: "48px" }
        };
        return (
          <div
            className={`tag-info ${transitionClasses[state] || ""}`}
            style={transitionStyle[state]}>
            <ul className="tag-list" ref={tagListRef}>
              {tagInfo.map((tag, index) => {
                const rate = tag.count / maxCount;
                return (
                  <TagListItem
                    key={index}
                    tag={tag.name}
                    count={tag.count}
                    rate={rate}
                  />
                );
              })}
            </ul>
            {state !== "entered" && <TagInfoForeground />}
            <TagInfoSlideButton
              state={state}
              onClick={handleClickToggleButton}
            />
          </div>
        );
      }}
    </Transition>
  );
};

const TagListItem = ({ tag, count, rate }) => {
  return (
    <li className="tag-list-item">
      <Link href={`/gallery?tag=${tag}`}>
        <a className="tag-list-item__link">
          <span
            className="tag-name"
            style={{
              fontSize: `${0.8 + rate}em`,
              // 件数が多いほど文字色を濃くする
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
  );
};

const TagInfoForeground = () => {
  return <div className="tag-info-foreground" />;
};

const TagInfoSlideButton = ({ state, onClick }) => {
  return (
    <div className="tag-info-slide-button" onClick={onClick}>
      {state === "entering" || state === "exited" ? (
        <i className="fas fa-chevron-down tag-info-slide-button__down"></i>
      ) : (
        <i className="fas fa-chevron-up tag-info-slide-button__up"></i>
      )}
    </div>
  );
};
