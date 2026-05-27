export type BrowserType = "chrome" | "firefox" | "unknown";

export const detectBrowser = (): BrowserType => {
  const ua = navigator.userAgent;
  const vendor = navigator.vendor;
  const hasFirefox = /Firefox|FxiOS/i.test(ua);
  const hasOpera = /OPR\//i.test(ua);
  const hasEdge = /Edg\//i.test(ua);
  const hasBrave = (navigator as Navigator & { brave?: { isBrave: () => Promise<boolean> } }).brave;
  const hasChromium = /Chrome|CriOS|Chromium/i.test(ua) || /Google/i.test(vendor);

  if (hasFirefox) return "firefox";
  if (hasOpera || hasEdge || hasChromium || typeof hasBrave !== "undefined") return "chrome";
  return "unknown";
};
