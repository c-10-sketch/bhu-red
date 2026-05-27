import { motion } from "framer-motion";
import ScanLoader from "./ScanLoader";

const BrowserScanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-cyan-400/25 bg-slate-900/50 p-6 shadow-neon backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-cyan-200">Neural Browser Scan</p>
        <div className="h-8 w-8 animate-spin-slow rounded-full border border-violet-300/60 border-t-transparent" />
      </div>
      <ScanLoader />
    </motion.div>
  );
};

export default BrowserScanner;
