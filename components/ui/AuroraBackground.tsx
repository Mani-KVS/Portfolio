"use client";

export interface TapRipple {
  id: number;
  x: number;
  y: number;
}

const PARTICLES = [
  { top: "16%", left: "12%", size: 5, delay: "0s", duration: "15s", color: "bg-blue-500/30 dark:bg-blue-400/35", mobileHidden: false },
  { top: "28%", left: "44%", size: 4, delay: "2.5s", duration: "18s", color: "bg-teal-500/30 dark:bg-teal-400/35", mobileHidden: false },
  { top: "68%", left: "18%", size: 6, delay: "4s", duration: "16s", color: "bg-teal-500/25 dark:bg-teal-400/30", mobileHidden: false },
  { top: "22%", left: "78%", size: 5, delay: "1.2s", duration: "17s", color: "bg-blue-500/30 dark:bg-blue-400/35", mobileHidden: true },
  { top: "74%", left: "62%", size: 4, delay: "3.2s", duration: "19s", color: "bg-teal-500/25 dark:bg-teal-400/30", mobileHidden: true },
  { top: "52%", left: "88%", size: 5, delay: "5s", duration: "16s", color: "bg-blue-500/25 dark:bg-blue-400/30", mobileHidden: true },
];

export function AuroraBackground({
  variant = "full",
  ripples = [],
}: {
  variant?: "full" | "subtle";
  ripples?: TapRipple[];
}) {
  const opacity = variant === "full" ? 1 : 0.55;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      style={{ opacity }}
    >
      {/* 1. Slow ambient blue & teal radial gradients */}
      <div
        className="animate-float-slow absolute -left-28 -top-28 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, var(--hero-blue-glow), transparent)",
        }}
      />
      <div
        className="animate-float-slower absolute -right-24 top-1/4 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, var(--hero-teal-glow), transparent)",
        }}
      />
      <div
        className="animate-float-slow absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, var(--hero-blue-glow), transparent)",
        }}
      />

      {/* 2. Faint technical dot/grid pattern across the Hero */}
      <div className="hero-dot-grid absolute inset-0" />

      {/* 3. Interactive dot/grid highlight responding to cursor (desktop) or touch drag (mobile) */}
      <div
        className="hero-dot-grid-interactive absolute inset-0 transition-opacity duration-300"
        style={{ opacity: "var(--pointer-active, 0)" }}
      />

      {/* 4. Soft radial cursor / touch-drag glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--pointer-active, 0)",
          background:
            "radial-gradient(320px circle at var(--pointer-x, -999px) var(--pointer-y, -999px), var(--hero-teal-glow), var(--hero-blue-glow) 45%, transparent 75%)",
        }}
      />

      {/* 5. Very subtle translucent circular geometric shapes */}
      <div
        className="animate-float-slower absolute -left-16 top-1/3 h-64 w-64 rounded-full border"
        style={{ borderColor: "var(--hero-circle-border)" }}
      />
      <div
        className="animate-float-slow absolute right-[8%] top-[12%] hidden h-80 w-80 rounded-full border sm:block"
        style={{ borderColor: "var(--hero-circle-border)" }}
      />
      <div
        className="animate-float-slower absolute bottom-[10%] right-[28%] h-44 w-44 rounded-full border"
        style={{ borderColor: "var(--hero-circle-border)" }}
      />

      {/* 6. Thin flowing curved/wave lines moving very slowly */}
      <svg
        className="animate-hero-wave absolute inset-x-0 top-[18%] -left-[7%] h-64 w-[115%] opacity-80"
        viewBox="0 0 1440 320"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 C320,90 640,230 960,150 C1200,90 1340,170 1440,140"
          stroke="var(--hero-wave-primary)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M0,210 C360,260 720,110 1080,190 C1260,230 1360,180 1440,200"
          stroke="var(--hero-wave-secondary)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="animate-hero-wave-reverse absolute inset-x-0 bottom-[10%] -left-[5%] h-56 w-[115%] opacity-75"
        viewBox="0 0 1440 320"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C280,200 660,70 1020,160 C1220,210 1350,130 1440,155"
          stroke="var(--hero-wave-secondary)"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>

      {/* 7. Small blue/teal floating particles */}
      {PARTICLES.map((p, idx) => (
        <span
          key={idx}
          className={`animate-hero-particle absolute rounded-full ${p.color} ${
            p.mobileHidden ? "hidden sm:block" : ""
          }`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* 8. Touch tap expanding ripples (mobile/tablet touch devices) */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="animate-hero-ripple absolute h-24 w-24 rounded-full border border-teal-500/35 bg-blue-500/10 dark:border-teal-400/40 dark:bg-teal-400/10"
          style={{ left: `${r.x}px`, top: `${r.y}px` }}
        />
      ))}
    </div>
  );
}

