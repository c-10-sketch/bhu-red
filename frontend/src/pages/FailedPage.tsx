import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CompatibilityFailed from "./CompatibilityFailed";
import { api, type Settings } from "../utils/api";
import { defaultSettings } from "../utils/defaultSettings";
import type { VerificationFailureReason } from "../utils/verification";

const isFailureReason = (value: string | null): value is VerificationFailureReason =>
  value === "unsupported-browser" ||
  value === "redirect-disabled" ||
  value === "invalid-redirect";

const FailedPage = () => {
  const [searchParams] = useSearchParams();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const reasonParam = searchParams.get("reason");
  const reason: VerificationFailureReason = isFailureReason(reasonParam)
    ? reasonParam
    : "unsupported-browser";

  useEffect(() => {
    void api
      .getSettings()
      .then((config) => setSettings(config))
      .catch(() => setSettings(defaultSettings))
      .finally(() => setLoading(false));
  }, []);

  return <CompatibilityFailed settings={settings} reason={reason} loading={loading} />;
};

export default FailedPage;
