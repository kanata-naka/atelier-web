/* eslint-disable @typescript-eslint/no-explicit-any */

// グローバル変数を定義する
declare global {
  interface Window {
    twttr: any;
    FB: any;
    LineIt: any;
  }
}

export function reloadTwitterWidgets(element: Element) {
  try {
    if (typeof window?.twttr !== "undefined") {
      window.twttr.widgets.load(element);
      console.debug("Reloaded Twitter widgets.");
    }
  } catch (error) {
    console.error(error);
  }
}

export function reloadFacebookWidgets(element: Element) {
  try {
    if (typeof window?.FB !== "undefined") {
      window.FB.XFBML.parse(element);
      console.debug("Reloaded Facebook widgets.");
    }
  } catch (error) {
    console.error(error);
  }
}

export function reloadLINEItButtons() {
  try {
    if (typeof window?.LineIt !== "undefined") {
      window.LineIt.loadButton();
      console.debug("Reloaded LINE widgets.");
    }
  } catch (error) {
    console.error(error);
  }
}
