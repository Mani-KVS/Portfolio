export function AuroraBackground({ variant = "full" }: { variant?: "full" | "subtle" }) {
  const opacity = variant === "full" ? 1 : 0.45;
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ opacity }}>
      <div className="ambient-glow animate-float-slow absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full" />
      <div className="ambient-glow animate-float-slower absolute -right-32 top-1/3 h-[24rem] w-[24rem] rounded-full" />
      <div className="ambient-glow animate-float-slow absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full opacity-70" />
    </div>
  );
}
