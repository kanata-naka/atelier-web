import React, { useState, useCallback, useRef, MouseEvent } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import { Transition, TransitionStatus } from "react-transition-group";
import { frameBorderColor } from "@/styles";
import { TagInfoGetResponse } from "@/types/api/tagInfo";

const transitionClasses: { [state in TransitionStatus]?: string } = {
  entering: "slide-entering",
  entered: "slide-entered",
  exiting: "slide-exiting",
  exited: "slide-exited",
};

function TagList({ info }: { info: TagInfoGetResponse.TagInfo[] }) {
  const [collasped, setCollasped] = useState(true);
  const [height, setHeight] = useState(48);
  const tagListRef = useRef<HTMLUListElement>(null);

  const handleClickToggleButton = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (tagListRef.current) {
        setHeight(tagListRef.current.clientHeight);
        setCollasped(!collasped);
      }
    },
    [collasped]
  );

  // タグの最大件数
  const maxCount = info.reduce((_maxCount, tag) => Math.max(_maxCount, tag.count), 1);

  return (
    <Transition in={!collasped} timeout={250}>
      {(state) => {
        const transitionStyle: {
          [state in TransitionStatus]?: React.CSSProperties;
        } = {
          entering: { height: `${height}px` },
          entered: { height: `${height}px` },
          exiting: { height: "48px" },
          exited: { height: "48px" },
        };
        return (
          <div
            className={transitionClasses[state] || ""}
            css={css`
              position: relative;
              height: 48px;
              margin: 12px;
              overflow: hidden;
              border: 1px solid ${frameBorderColor};
              transition: height 250ms;
            `}
            style={transitionStyle[state]}
          >
            <ul
              ref={tagListRef}
              css={css`
                position: relative;
                padding: 18px 10px 20px 18px;
              `}
            >
              {info.map((tag, index) => {
                const rate = tag.count / maxCount;
                return <TagListItem key={index} tag={tag.name} count={tag.count} rate={rate} />;
              })}
            </ul>
            {state !== "entered" && <TagInfoForeground />}
            <TagInfoSlideButton state={state} onClick={handleClickToggleButton} />
          </div>
        );
      }}
    </Transition>
  );
}

function TagListItem({ tag, count, rate }: { tag: string; count: number; rate: number }) {
  return (
    <li
      css={css`
        display: inline-block;
        margin: 0 8px 8px 0;
        transition: opacity 250ms;

        &:hover {
          opacity: 0.8;
        }
      `}
    >
      <Link className="tag-list-item__link" href={`/gallery?tag=${tag}`}>
        <span
          style={{
            fontSize: `${0.8 + rate}em`,
            // 件数が多いほど文字色を濃くする
            color: `rgba(${Math.max(0, 88 - 80 * rate)},${Math.max(0, 88 - 80 * rate)},${Math.max(
              0,
              221 - 140 * rate
            )},1)`,
          }}
        >
          {tag}
        </span>
        <span
          css={css`
            font-size: 0.7em;
            color: gray;
          `}
        >{`(${count})`}</span>
      </Link>
    </li>
  );
}

function TagInfoForeground() {
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      `}
    />
  );
}

function TagInfoSlideButton({ state, onClick }: { state: TransitionStatus; onClick: (event: MouseEvent) => void }) {
  return (
    <div
      onClick={onClick}
      css={css`
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-top: 12px;
        color: #5f569a;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        transition: opacity 250ms;

        &:hover {
          opacity: 0.7;
        }
      `}
    >
      {state === "entering" || state === "exited" ? (
        <i className="fas fa-chevron-down"></i>
      ) : (
        <i className="fas fa-chevron-up"></i>
      )}
    </div>
  );
}

export default TagList;
