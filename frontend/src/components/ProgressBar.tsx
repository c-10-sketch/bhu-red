import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-900/80 ring-1 ring-cyan-400/30">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-neon"
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;
