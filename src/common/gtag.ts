/**
 * ページビューを送信する
 */
export const sendPageview = (path: string) => {
  if (typeof window === "undefined") {
    return;
  }
  window.gtag(
    "config",
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID!,
    {
      page_path: path,
    }
  );
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
