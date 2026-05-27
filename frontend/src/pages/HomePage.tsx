import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrowserScanner from "../components/BrowserScanner";
import ParticleBackground from "../components/ParticleBackground";
import ProgressBar from "../components/ProgressBar";
import { api, type Settings } from "../utils/api";
import { detectBrowser } from "../utils/browserDetect";
import { getVerificationFailure } from "../utils/verification";

const checks = [
  "Checking browser security",
  "Detecting extension support",
  "Verifying compatibility",
  "Preparing redirect"
];

import { defaultSettings } from "../utils/defaultSettings";

const VERIFY_DURATION_MS = 4000;

const HomePage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [activeCheck, setActiveCheck] = useState(0);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    void api
      .getSettings()
      .then((config) => setSettings(config))
      .catch(() => setSettings(defaultSettings));
  }, []);

  useEffect(() => {
    let step = 0;
    const checkInterval = setInterval(() => {
      step += 1;
      setProgress(Math.min(step * 6, 100));
      setActiveCheck(Math.min(Math.floor(step / 4), checks.length - 1));
    }, 240);

    const verifyTimer = setTimeout(() => {
      clearInterval(checkInterval);
      setProgress(100);

      const browser = detectBrowser();
      const cfg = settings ?? defaultSettings;
      const failure = getVerificationFailure(browser, cfg);

      if (failure) {
        navigate(`/failed?reason=${failure}`, { replace: true });
        return;
      }

      const browserQuery = browser === "firefox" ? "firefox" : "chrome";
      navigate(`/checked?=${browserQuery}`, { replace: true });
    }, VERIFY_DURATION_MS);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(verifyTimer);
    };
  }, [navigate, settings]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <ParticleBackground />
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-3xl rounded-3xl border border-cyan-400/20 bg-slate-900/55 p-8 shadow-neon backdrop-blur-xl"
      >
        <h1 className="text-center text-4xl font-bold text-cyan-100">Verifying Your Browser</h1>
        <p className="mt-2 text-center text-slate-300">Checking browser compatibility...</p>

        <div className="mt-8">
          <BrowserScanner />
        </div>

        <div className="mt-6">
          <ProgressBar value={progress} />
          <p className="mt-2 text-right text-sm text-cyan-200">{progress}%</p>
        </div>

        <div className="mt-6 space-y-2 text-sm">
          {checks.map((check, idx) => (
            <motion.p
              key={check}
              animate={{ opacity: idx <= activeCheck ? 1 : 0.4 }}
              className="text-cyan-100"
            >
              ✓ {check}
            </motion.p>
          ))}
        </div>
      </motion.section>
    </main>
  );
};

export default HomePage;
