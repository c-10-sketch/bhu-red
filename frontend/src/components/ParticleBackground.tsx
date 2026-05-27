const particles = Array.from({ length: 30 }, (_, i) => i);

const ParticleBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p}
          className="absolute block h-1 w-1 animate-pulse rounded-full bg-cyan-300/60"
          style={{
            left: `${(p * 13) % 100}%`,
            top: `${(p * 17) % 100}%`,
            animationDelay: `${(p % 7) * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
