declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const setDataLayer = (data: Record<string, unknown>) => {
  window.dataLayer.push(data);
};
