import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import { api, type Settings } from "../utils/api";
import { getVerificationFailure } from "../utils/verification";
import { defaultSettings } from "../utils/defaultSettings";

const COUNTDOWN_SECONDS = 5;

const CheckedPage = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const { redirectParam, browserFromUrl } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      redirectParam: params.get("redirect"),
      browserFromUrl: params.get("browser") || params.get("")
    };
  }, []);

  useEffect(() => {
    void api
      .getSettings()
      .then((config) => setSettings(config))
      .catch(() => setSettings(defaultSettings));
  }, []);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (redirecting) {
      return;
    }

    setRedirecting(true);

    const browser =
      browserFromUrl === "firefox" || browserFromUrl === "chrome"
        ? browserFromUrl
        : null;

    if (!browser) {
      navigate("/failed?reason=unsupported-browser", { replace: true });
      return;
    }

    const cfg = settings ?? defaultSettings;

    const failure = getVerificationFailure(browser, cfg);
    if (failure) {
      navigate(`/failed?reason=${failure}`, { replace: true });
      return;
    }

    const browserQuery = browser === "firefox" ? "firefox" : "chrome";
    const fallbackDestination =
      browser === "firefox" ? cfg.firefoxRedirect : cfg.chromeRedirect;
    const destination = redirectParam || fallbackDestination;

    try {
      const url = new URL(destination);
      url.searchParams.set("browser", browserQuery);
      window.location.href = url.toString();
    } catch {
      navigate("/failed?reason=invalid-redirect", { replace: true });
    }
  }, [browserFromUrl, navigate, redirectParam, redirecting, secondsLeft, settings]);

  const progress = ((COUNTDOWN_SECONDS - secondsLeft) / COUNTDOWN_SECONDS) * 100;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <ParticleBackground />
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg rounded-3xl border border-cyan-400/20 bg-slate-900/55 p-10 text-center shadow-neon backdrop-blur-xl"
      >
        <h1 className="text-3xl font-bold text-cyan-100">Redirecting</h1>
        <p className="mt-2 text-slate-300">Taking you to your content shortly...</p>

        <motion.p
          key={secondsLeft}
          initial={{ scale: 0.85, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-10 text-7xl font-bold tabular-nums text-cyan-300"
        >
          {secondsLeft > 0 ? secondsLeft : 0}
        </motion.p>

        <p className="mt-4 text-sm text-cyan-200/80">
          Redirecting in {secondsLeft > 0 ? secondsLeft : 0} second
          {secondsLeft === 1 ? "" : "s"}...
        </p>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.section>
    </main>
  );
};

export default CheckedPage;
