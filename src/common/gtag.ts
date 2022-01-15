import getConfig from "next/config";

// 環境設定を取得する
const { publicRuntimeConfig } = getConfig();

export const MEASUREMENT_ID = publicRuntimeConfig.FIREBASE_CONFIG.measurementId;

/**
 * ページビューを送信する
 */
export const sendPageview = (path: string) => {
  if (typeof window === "undefined") {
    return;
  }
  window.gtag("config", MEASUREMENT_ID, {
    page_path: path,
  });
};

/**
 * イベントを送信する
 */
export const sendEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: Record<string, unknown>;
  value?: string;
}) => {
  if (typeof window === "undefined") {
    return;
  }
  window.gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
