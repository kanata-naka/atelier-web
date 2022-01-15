import React, { useRef, useEffect, useCallback } from "react";
import { useStateRef } from "../../../common/hooks";
import { TopImageItem } from "../../../common/types";

/**
 * カルーセル
 */
export default ({
  items,
  switchInterval,
}: {
  items: TopImageItem[];
  switchInterval: number;
}) => {
  const [preloading, preloadingRef, setPreloading] = useStateRef(true);
  const [currentIndex, currntIndexRef, setCurrentIndex] = useStateRef(0);
  const currentIntervalIdRef = useRef<number>(null);

  if (!items.length) {
    // トップ画像が1件もなければ表示しない
    return null;
  }

  // 画像を切り替える処理
  const handleSwitchItem = () => {
    if (preloadingRef.current) {
      setPreloading(false);
    }
    let nextIndex = currntIndexRef.current + 1;
    if (nextIndex === items.length) {
      // 最初に戻る
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    // 一定時間ごとに画像を切り替える
    currentIntervalIdRef.current = window.setInterval(
      handleSwitchItem,
      switchInterval
    );
    return () => {
      // componentWillUnmount と同じタイミングで実行する
      window.clearInterval(currentIntervalIdRef.current);
    };
  }, []);

  // ナビゲーションのアイコンをクリックした際の処理
  const handleNavItemClick = useCallback(
    (index: number) => {
      if (currentIntervalIdRef.current) {
        clearInterval(currentIntervalIdRef.current);
      }
      setPreloading(false);
      setCurrentIndex(index);
      currentIntervalIdRef.current = window.setInterval(
        handleSwitchItem,
        switchInterval
      );
    },
    [items]
  );

  // Chromeではページを読み込んだ際もtransitionが効いてしまうので、
  // DOMの読み込みが完了するまでtransitionを無効にする
  return (
    <section
      className={`top-carousel ${!preloading ? "enable-transition" : ""}`}>
      <TopCarouselList items={items} currentIndex={currentIndex} />
      <Navigation
        items={items}
        currentIndex={currentIndex}
        onSelect={handleNavItemClick}
      />
    </section>
  );
};

const TopCarouselList = ({
  items,
  currentIndex,
}: {
  items: TopImageItem[];
  currentIndex: number;
}) => {
  return (
    <ul className="top-carousel-list">
      {items.map((item, index) => (
        <TopCarouselItem
          key={index}
          item={item}
          isActive={index === currentIndex}
        />
      ))}
    </ul>
  );
};

const TopCarouselItem = ({
  item,
  isActive,
}: {
  item: TopImageItem;
  isActive: boolean;
}) => {
  return (
    <li
      className="top-carousel-item"
      style={{
        backgroundImage: `url(${item.image.url})`,
        ...(isActive ? { opacity: 1 } : {}),
      }}></li>
  );
};

const Navigation = ({
  items,
  currentIndex,
  onSelect,
}: {
  items: TopImageItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
}) => {
  return (
    <ul className="top-carousel-nav-list">
      {items.map((item, index) => (
        <NavigationItem
          key={index}
          item={item}
          isActive={index === currentIndex}
          onClick={() => onSelect(index)}
        />
      ))}
    </ul>
  );
};

const NavigationItem = ({
  item,
  isActive,
  onClick,
}: {
  item: TopImageItem;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <li
      className={"top-carousel-nav-item " + (isActive ? "active" : "")}
      onClick={onClick}
      style={{
        backgroundImage: `url(${item.thumbnailImage.url})`,
      }}></li>
  );
};
