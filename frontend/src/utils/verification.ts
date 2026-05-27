import type { Settings } from "./api";
import type { BrowserType } from "./browserDetect";

export type VerificationFailureReason =
  | "unsupported-browser"
  | "redirect-disabled"
  | "invalid-redirect";

export const failureMessages: Record<VerificationFailureReason, string> = {
  "unsupported-browser":
    "We could not detect a supported browser. Please use Chrome or Firefox with the required extension.",
  "redirect-disabled": "Redirects are temporarily disabled. Please try again later or contact support.",
  "invalid-redirect":
    "The redirect destination is not configured correctly. Please contact the administrator."
};

export const getVerificationFailure = (
  browser: BrowserType,
  settings: Settings
): VerificationFailureReason | null => {
  if (browser === "unknown") {
    return "unsupported-browser";
  }
  if (!settings.redirectEnabled) {
    return "redirect-disabled";
  }
  return null;
};
