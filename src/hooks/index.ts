import React, { useState, useRef, useEffect, useCallback } from "react";
import Router from "next/router";
import { sendPageview } from "../api/gtag";
import {
  matchesMediaQuery,
  getOffsetScrolledToBottom,
  getCurrentScrollTop,
} from "../utils/domUtil";

/**
 * ステートとそのRefを作成する
 * ※非同期処理（setTimeoutなど）から最新の値を参照できるようにする
 */
export const useStateRef = <T>(
  initialValue: T
): [T, React.MutableRefObject<T>, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue);
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  return [value, valueRef, setValue];
};

/**
 * メディアクエリを使用する
 */
export const useMediaQuery = (mediaQuery: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMatches(matchesMediaQuery(mediaQuery));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return matches;
};

/**
 * ページビューを測定する
 */
export const usePageview = () => {
  useEffect(() => {
    const handleRouteChangeComplete = (path: string) => sendPageview(path);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [Router.events]);
};

/**
 * 無限スクロールを使用する
 */
export const useScroll = <T>(
  callback: () => Promise<void>,
  delay: number,
  finished: boolean,
  deps: T[][]
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [offsetScrolledToBottom, setOffsetScrolledToBottom] = useState<
    number | null
  >(null);
  const [currentScrollTop, setCurrentScrollTop] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const _callback = useCallback(async () => {
    setLoading(true);
    await callback();
    setTimeout(function () {
      setLoading(false);
    }, delay);
  }, [...deps]);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetScrolledToBottom(getOffsetScrolledToBottom());
      setCurrentScrollTop(getCurrentScrollTop());
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      timer && window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (
      finished ||
      loading ||
      offsetScrolledToBottom == null ||
      currentScrollTop == null ||
      currentScrollTop < offsetScrolledToBottom
    ) {
      return;
    }
    // ページの最後までスクロールされていればタイマーにcallbackをセットする
    // ※既にセットされていればタイマーをリセットする
    timer && clearTimeout(timer);
    setTimer(window.setTimeout(_callback, delay));
  }, [offsetScrolledToBottom, currentScrollTop]);

  return [loading, setLoading];
};
