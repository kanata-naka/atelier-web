import { useState, useRef, useEffect, useCallback } from "react";
import {
  matchesMediaQuery,
  getOffsetScrolledToBottom,
  getCurrentScrollTop
} from "../utils/domUtil";

/**
 * ステートとそのRefを作成する
 * ※非同期処理（setTimeout、）から最新の値を参照できるようにする
 */
export const useStateRef = (initialValue = null) => {
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
export const useMediaQuery = mediaQuery => {
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
 * 無限スクロールを使用する
 */
export const useScroll = (callback, delay, finished, deps) => {
  const [offsetScrolledToBottom, setOffsetScrolledToBottom] = useState(null);
  const [currentScrollTop, setCurrentScrollTop] = useState(null);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const _callback = useCallback(async () => {
    setLoading(true);
    await callback();
    setTimeout(function() {
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
      timer && clearTimeout(timer);
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
    setTimer(setTimeout(_callback, delay));
  }, [offsetScrolledToBottom, currentScrollTop]);

  return [loading, setLoading];
};
