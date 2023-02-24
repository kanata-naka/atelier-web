export function sendPageview(path: string) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID) {
    return;
  }
  window.gtag("config", process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID, {
    page_path: path,
  });
}

export function sendEvent(action: string, category: string, label: Record<string, unknown>, value?: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
}
