import { Schema, model, models } from "mongoose";

export interface SettingsDocument {
  chromeRedirect: string;
  firefoxRedirect: string;
  chromeExtensionUrl: string;
  firefoxExtensionUrl: string;
  redirectEnabled: boolean;
}

const settingsSchema = new Schema<SettingsDocument>(
  {
    chromeRedirect: { type: String, required: true, default: "https://example.com/chrome" },
    firefoxRedirect: { type: String, required: true, default: "https://example.com/firefox" },
    chromeExtensionUrl: {
      type: String,
      required: true,
      default: "https://chrome.google.com/webstore"
    },
    firefoxExtensionUrl: {
      type: String,
      required: true,
      default: "https://addons.mozilla.org/en-US/firefox/addon/bhumi-tool-pro-beta"
    },
    redirectEnabled: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

export const SettingsModel =
  models.Settings || model<SettingsDocument>("Settings", settingsSchema);
