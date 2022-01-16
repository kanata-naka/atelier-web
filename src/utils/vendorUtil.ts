// グローバル変数を定義する
declare global {
  interface Window {
    // Twitter
    twttr: any;
    // Facebook
    FB: any;
    // LINE
    LineIt: any;
  }
}

/**
 * Twitterのウィジェットを初期化する
 */
export const reloadTwitterWidgets = (element: Element) => {
  try {
    if (typeof window?.twttr !== "undefined") {
      window.twttr.widgets.load(element);
      console.debug("Reloaded Twitter widgets.");
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Facebookのウィジェットを初期化する
 */
export const reloadFacebookWidgets = (element: Element) => {
  try {
    if (typeof window?.FB !== "undefined") {
      window.FB.XFBML.parse(element);
      console.debug("Reloaded Facebook widgets.");
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * LINEのシェアボタンを初期化する
 */
export const reloadLINEItButtons = () => {
  try {
    if (typeof window?.LineIt !== "undefined") {
      window.LineIt.loadButton();
      console.debug("Reloaded LINE widgets.");
    }
  } catch (error) {
    console.error(error);
  }
};
