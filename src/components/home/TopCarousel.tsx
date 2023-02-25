import React, { useRef, useEffect, createContext, useContext } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import { useStateRef } from "@/hooks";
import { responsiveBoundaryWidth } from "@/styles";
import { TopImageGetResponse } from "@/types/api/topImages";

const TopCarouselContext = createContext({
  preloading: false,
});

function TopCarousel({ items, switchInterval }: { items: TopImageGetResponse[]; switchInterval: number }) {
  const [preloading, preloadingRef, setPreloading] = useStateRef(true);
  const [currentIndex, currntIndexRef, setCurrentIndex] = useStateRef(0);
  const currentIntervalIdRef = useRef(0);

  const handleSwitchItem = () => {
    if (preloadingRef.current) {
      setPreloading(false);
    }
    let nextIndex = currntIndexRef.current + 1;
    if (nextIndex === items.length) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
  };

  const handleNavItemClick = (index: number) => {
    if (currentIntervalIdRef.current) {
      clearInterval(currentIntervalIdRef.current);
    }
    setPreloading(false);
    setCurrentIndex(index);
    currentIntervalIdRef.current = window.setInterval(handleSwitchItem, switchInterval);
  };

  useEffect(() => {
    currentIntervalIdRef.current = window.setInterval(handleSwitchItem, switchInterval);
    return () => {
      window.clearInterval(currentIntervalIdRef.current);
    };
  }, []);

  if (!items.length) {
    return null;
  }

  // Chromeではページを読み込んだ際もtransitionが効いてしまうので、
  // DOMの読み込みが完了するまでtransitionを無効にする
  return (
    <TopCarouselContext.Provider value={{ preloading }}>
      <section
        css={css`
          position: relative;
          overflow: hidden;

          &:before {
            display: block;
            padding-top: 60%;
            content: "";
          }
        `}
      >
        <TopCarouselList items={items} currentIndex={currentIndex} />
        <Navigation items={items} currentIndex={currentIndex} onSelect={handleNavItemClick} />
      </section>
    </TopCarouselContext.Provider>
  );
}

function TopCarouselList({ items, currentIndex }: { items: TopImageGetResponse[]; currentIndex: number }) {
  return (
    <ul>
      {items.map((item, index) => (
        <TopCarouselItem key={index} item={item} isActive={index === currentIndex} />
      ))}
    </ul>
  );
}

function TopCarouselItem({ item, isActive }: { item: TopImageGetResponse; isActive: boolean }) {
  const { preloading } = useContext(TopCarouselContext);
  return (
    <li
      css={css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: ${isActive ? 1 : 0};
        z-index: ${isActive ? 0 : -1};
        ${!preloading &&
        css`
          transition: opacity 1s;
        `}
      `}
    >
      <Image
        src={item.image.url}
        fill
        alt={`${item.description}`}
        css={css`
          object-fit: cover;
        `}
      />
    </li>
  );
}

function Navigation({
  items,
  currentIndex,
  onSelect,
}: {
  items: TopImageGetResponse[];
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ul
      css={css`
        position: absolute;
        display: flex;
        align-items: center;

        @media (max-width: ${responsiveBoundaryWidth}px) {
          bottom: 9px;
          left: 9px;
        }

        @media (min-width: ${responsiveBoundaryWidth + 1}px) {
          bottom: 18px;
          left: 18px;
        }
      `}
    >
      {items.map((item, index) => (
        <NavigationItem key={index} item={item} isActive={index === currentIndex} onClick={() => onSelect(index)} />
      ))}
    </ul>
  );
}

function NavigationItem({
  item,
  isActive,
  onClick,
}: {
  item: TopImageGetResponse;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <li
      onClick={onClick}
      css={css`
        position: relative;
        padding: 2px;
        cursor: pointer;
        border: 1px solid white;
        border-radius: 5px;
        opacity: ${isActive ? 1 : 0.5};
        transition-duration: 250ms;
        transition-property: box-shadow, opacity;

        @media (max-width: ${responsiveBoundaryWidth}px) {
          width: 24px;
          height: 24px;
        }

        @media (min-width: ${responsiveBoundaryWidth + 1}px) {
          width: 32px;
          height: 32px;
        }

        &:not(:first-child) {
          margin-left: 5px;
        }

        &:hover {
          box-shadow: 0 0 5px white;
          opacity: 0.8;
        }
      `}
    >
      <Image src={item.thumbnailImage.url} fill alt={`${item.description}`} />
    </li>
  );
}

export default TopCarousel;
