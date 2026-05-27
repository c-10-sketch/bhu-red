import { motion } from "framer-motion";

interface CyberCardProps {
  title: string;
  cta: string;
  href: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

const CyberCard = ({ title, cta, href, secondaryCta, secondaryHref }: CyberCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="group rounded-2xl border border-cyan-400/25 bg-slate-900/55 p-6 shadow-neon backdrop-blur-xl transition-all"
    >
      <h3 className="text-xl font-semibold text-cyan-100">{title}</h3>
      <div className="mt-5 flex flex-col gap-2">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-lg border border-violet-300/40 bg-violet-500/15 px-4 py-2 text-center text-sm font-medium text-violet-100 transition group-hover:bg-violet-400/25"
        >
          {cta}
        </a>
        {secondaryCta && secondaryHref ? (
          <a
            href={secondaryHref}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg border border-cyan-300/30 bg-cyan-500/10 px-4 py-2 text-center text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20"
          >
            {secondaryCta}
          </a>
        ) : null}
      </div>
    </motion.div>
  );
};

export default CyberCard;
