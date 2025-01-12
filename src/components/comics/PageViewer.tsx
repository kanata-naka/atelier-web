import React, { ReactNode, useRef, useState } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks";
import { responsiveBoundaryWidth } from "@/styles";
import { ComicGetResponse } from "@/types/api/comics";
import ShareButtons from "../common/ShareButtons";

const SWIPE_MINIMUM_DISTANCE = 30;

function PageViewer({ comic, episode }: { comic: ComicGetResponse; episode: ComicGetResponse.Episode }) {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [touchStartPos, setTouchStartPos] = useState<[number, number]>([0, 0]);
  const viewerRef = useRef<HTMLDivElement>(null);
  const confined = useMediaQuery(`(max-width: ${responsiveBoundaryWidth}px)`);

  const pageElements = episode.pages.map((item, index) => <PageItemImage key={index} image={item.image} />);
  pageElements.push(
    <>
      <img
        src="/images/empty-page.png"
        alt={""}
        css={css`
          max-width: 100%;
          height: 100%;
          object-fit: contain;
        `}
      />
      <div
        css={css`
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          width: 100%;
          height: 100%;
          margin: auto 0;
          text-align: center;
        `}
      >
        <Link
          href={`/comics/${comic.id}`}
          css={css`
            display: block;
            padding: 12px;
            margin: 0px 24px 24px;
            background-color: #424fca;
            color: white;

            :hover {
              opacity: 0.8;
            }
          `}
        >
          作品詳細に戻る
        </Link>
        <Link
          href={`/comics`}
          css={css`
            display: block;
            padding: 12px;
            margin: 0px 24px 24px;
            background-color: #424fca;
            color: white;

            :hover {
              opacity: 0.8;
            }
          `}
        >
          マンガ一覧に戻る
        </Link>
        <ShareButtons
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/comics/${comic.id}/${episode.id}`}
          title={`${comic.title} ${episode.title}`}
          style={css`
            display: flex;
            align-items: flex-start;
            padding: 16px 0;
            justify-content: center;
          `}
          buttonStyle={css`
            :not(:first-child) {
              margin-left: 10px;
            }
          `}
        />
      </div>
    </>,
  );

  const step = direction === "horizontal" && !confined ? 2 : 1;

  const handleBack = () => {
    setIndex(Math.max(0, index - (step === 2 && index % 2 === 1 ? 2 : 1)));
  };

  const handleForward = () => {
    if (index < pageElements.length - step) {
      setIndex(index + (step === 2 && index % 2 === 1 ? 2 : 1));
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY > 0) {
      handleForward();
    } else {
      handleBack();
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStartPos([event.touches[0].pageX, event.touches[0].pageY]);
    return false;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const distanceX = event.changedTouches[0].pageX - touchStartPos[0];
    const distanceY = event.changedTouches[0].pageY - touchStartPos[1];
    if (direction === "horizontal" && Math.abs(distanceX) > SWIPE_MINIMUM_DISTANCE) {
      if (distanceX > 0) {
        handleForward();
      } else {
        handleBack();
      }
    }
    if (direction === "vertical" && Math.abs(distanceY) > SWIPE_MINIMUM_DISTANCE) {
      if (distanceY > 0) {
        handleBack();
      } else {
        handleForward();
      }
    }
  };

  const handleFullscreenButtonClick = () => {
    if (viewerRef.current) {
      if (!document.fullscreenElement) {
        viewerRef.current.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleDirectionButtonClick = () => {
    if (index > 0 && direction === "vertical" && !confined && index % 2 === 0) {
      setIndex(index - 1);
    }
    setDirection(direction === "horizontal" ? "vertical" : "horizontal");
  };

  return (
    <>
      <div
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={viewerRef}
        css={css`
          position: fixed;
          top: 54px;
          bottom: 36px;
          left: 0;
          right: 0;
          padding: 0 8px;
          background-color: gray;
          display: grid;
          grid-template-columns: ${step === 2 ? "1fr 1fr" : "1fr"};
          grid-template-rows: 100%;
          justify-content: center;
        `}
      >
        {step === 2 ? (
          index === 0 ? (
            <PageItemLeft onClick={handleForward}>{pageElements[0]}</PageItemLeft>
          ) : (
            <>
              {index < pageElements.length - 1 ? (
                <PageItemLeft onClick={handleForward}>{pageElements[index + 1]}</PageItemLeft>
              ) : (
                <div />
              )}
              <PageItemRight onClick={handleBack}>{pageElements[index]}</PageItemRight>
            </>
          )
        ) : (
          <>
            <PageItem onClick={handleForward}>{pageElements[index]}</PageItem>
          </>
        )}
      </div>
      <div
        css={css`
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          height: 36px;
          line-height: 36px;
          background-color: black;
          color: white;
        `}
      >
        <button
          onClick={handleFullscreenButtonClick}
          css={css`
            position: absolute;
            top: 0;
            left: 10px;
            border: none;
            background-color: black;
            color: white;
            height: 36px;
            font-size: 20px;
            cursor: pointer;
          `}
        >
          <i className="fas fa-expand"></i>
        </button>
        <button
          onClick={handleDirectionButtonClick}
          css={css`
            position: absolute;
            top: 0;
            right: 10px;
            border: none;
            background-color: black;
            color: white;
            height: 36px;
            font-size: 20px;
            cursor: pointer;
          `}
        >
          {direction === "vertical" ? <i className="fas fa-arrows-alt-h"></i> : <i className="fas fa-arrows-alt-v"></i>}
        </button>
        {index + 1} / {pageElements.length}
      </div>
    </>
  );
}

function PageItem({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        onClick={onClick}
        css={css`
          position: relative;
          display: flex;
          justify-content: center;
        `}
      >
        {children}
      </div>
    </div>
  );
}

function PageItemLeft({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-end;
      `}
    >
      <div
        onClick={onClick}
        css={css`
          position: relative;
          display: flex;
          justify-content: flex-end;
        `}
      >
        {children}
      </div>
    </div>
  );
}

function PageItemRight({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-start;
      `}
    >
      <div
        onClick={onClick}
        css={css`
          position: relative;
          display: flex;
          justify-content: flex-start;
        `}
      >
        {children}
      </div>
    </div>
  );
}

function PageItemImage({ image }: { image: ComicGetResponse.Image }) {
  return (
    <img
      src={image.url}
      alt={image.name}
      css={css`
        max-width: 100%;
        height: 100%;
        object-fit: contain;
      `}
    />
  );
}

export default PageViewer;
