import { motion } from "framer-motion";

const ScanLoader = () => {
  return (
    <div className="relative h-36 w-full overflow-hidden rounded-xl border border-cyan-400/30 bg-slate-950/60">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-cyan-500/10" />
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
        animate={{ y: [0, 138, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default ScanLoader;
