import { Link } from "react-router-dom";
import CyberCard from "../components/CyberCard";
import ParticleBackground from "../components/ParticleBackground";
import type { Settings } from "../utils/api";
import { defaultSettings } from "../utils/defaultSettings";
import {
  failureMessages,
  type VerificationFailureReason
} from "../utils/verification";

interface CompatibilityFailedProps {
  settings: Settings | null;
  reason?: VerificationFailureReason;
  loading?: boolean;
}

const CompatibilityFailed = ({
  settings,
  reason = "unsupported-browser",
  loading = false
}: CompatibilityFailedProps) => {
  const cfg = settings ?? defaultSettings;

  const chromeExtensionUrl = cfg.chromeExtensionUrl;
  const firefoxRedirectUrl = cfg.firefoxRedirect;
  const firefoxExtensionUrl = cfg.firefoxExtensionUrl;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <ParticleBackground />
      <section className="relative z-10 w-full max-w-4xl rounded-3xl border border-rose-400/30 bg-slate-900/60 p-8 shadow-neon backdrop-blur-xl">
        <h1 className="text-center text-3xl font-bold text-rose-100">
          Browser Verification Failed
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-300">
          {failureMessages[reason]}
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-rose-200/80">
          Use Chrome or Firefox below to continue.
        </p>

        {loading ? (
          <p className="mt-10 text-center text-slate-400">Loading options...</p>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <CyberCard
              title="Chrome"
              cta="Open Chrome Extension"
              href={chromeExtensionUrl}
            />
            <CyberCard
              title="Firefox"
              cta="Open Firefox Redirect"
              href={firefoxRedirectUrl}
              secondaryCta="Open Firefox Extension"
              secondaryHref={firefoxExtensionUrl}
            />
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block rounded-lg border border-cyan-400/40 bg-cyan-500/20 px-6 py-2.5 text-cyan-100 transition hover:bg-cyan-500/30"
          >
            Try again
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CompatibilityFailed;
