import { Request, Response } from "express";
import { z } from "zod";
import { SettingsModel } from "../models/Settings";

const updateSettingsSchema = z.object({
  chromeRedirect: z.string().url(),
  firefoxRedirect: z.string().url(),
  chromeExtensionUrl: z.string().url(),
  firefoxExtensionUrl: z.string().url(),
  redirectEnabled: z.boolean()
});

const getOrCreateSettings = async () => {
  let settings = await SettingsModel.findOne();
  if (!settings) {
    settings = await SettingsModel.create({});
  }
  return settings;
};

export const getSettings = async (_req: Request, res: Response): Promise<void> => {
  const settings = await getOrCreateSettings();
  res.json(settings);
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  const parsed = updateSettingsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid settings payload" });
    return;
  }

  const settings = await getOrCreateSettings();
  Object.assign(settings, parsed.data);
  await settings.save();
  res.json(settings);
};
