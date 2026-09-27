"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function HelloCharacter() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLButtonElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isWavingOnce, setIsWavingOnce] = useState(false);
  const [rippleKey, setRippleKey] = useState<number | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number; rot: number }>({
    x: 0,
    y: 0,
    rot: 0,
  });

  const lastWaveTimeRef = useRef<number>(0);

  const triggerInteractiveWave = useCallback((withRipple: boolean) => {
    const now = Date.now();
    // Cooldown guard to prevent excessive repeated animations
    if (now - lastWaveTimeRef.current < 1450) {
      return;
    }
    lastWaveTimeRef.current = now;

    if (!prefersReducedMotion) {
      setIsWavingOnce(true);
      window.setTimeout(() => {
        setIsWavingOnce(false);
      }, 1350);
    }

    if (withRipple && !prefersReducedMotion) {
      setRippleKey(now);
      window.setTimeout(() => {
        setRippleKey((prev) => (prev === now ? null : prev));
      }, 720);
    }
  }, [prefersReducedMotion]);

  // Trigger one greeting wave when the character enters the viewport
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let hasGreetedOnScroll = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasGreetedOnScroll) {
          hasGreetedOnScroll = true;
          triggerInteractiveWave(false);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, triggerInteractiveWave]);

  const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    setIsHovered(true);
    triggerInteractiveWave(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    // Very small responsive movement/tilt (±3.5px, ±2deg)
    setTilt({
      x: Math.max(-3.5, Math.min(3.5, relX * 3.5)),
      y: Math.max(-2.5, Math.min(2.5, relY * 2.5)),
      rot: Math.max(-2, Math.min(2, relX * 2)),
    });
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    setIsHovered(false);
    setTilt({ x: 0, y: 0, rot: 0 });
  };

  const handleClick = () => {
    triggerInteractiveWave(true);
  };

  return (
    <div className="relative my-3 flex justify-center lg:justify-start">
      <button
        ref={containerRef}
        type="button"
        aria-label="Friendly developer assistant waving hello"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        className="group relative flex h-52 w-64 cursor-pointer touch-manipulation select-none items-center justify-center rounded-2xl border border-[var(--color-border)]/80 bg-[var(--color-surface)]/75 p-3 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent-solid)]/45 focus-visible:outline-2 focus-visible:outline-[var(--color-accent-solid)] sm:w-72"
      >
        {/* Subtle ambient accent glow behind the character */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-4 rounded-full transition-all duration-500 ${
            isHovered || isWavingOnce
              ? "scale-105 opacity-95 blur-2xl"
              : "scale-95 opacity-65 blur-xl"
          }`}
          style={{
            background:
              "radial-gradient(circle, var(--hero-blue-glow) 0%, var(--hero-teal-glow) 55%, transparent 80%)",
          }}
        />

        {/* Click / Tap expanding ripple */}
        {rippleKey !== null && !prefersReducedMotion && (
          <span
            key={rippleKey}
            aria-hidden="true"
            className="animate-hero-ripple pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 rounded-full border border-[var(--color-accent-solid)]/45 bg-[var(--color-accent-tint)]"
          />
        )}

        {/* Floating "Hello! 👋" speech pill */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-[var(--color-accent-solid)]/30 bg-[var(--color-surface)]/95 px-3 py-1 text-xs font-semibold text-[var(--color-ink)] shadow-sm transition-all duration-300 ${
            prefersReducedMotion
              ? "opacity-100"
              : isHovered || isWavingOnce
                ? "translate-y-0 scale-100 opacity-100"
                : "animate-contact-bot-speech"
          }`}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500" />
          <span>Hello!</span>
          <span role="img" aria-hidden="true">
            👋
          </span>
        </div>

        {/* Character SVG with subtle tilt wrapper */}
        <div
          className="relative z-10 transition-transform duration-200 ease-out"
          style={{
            transform: prefersReducedMotion
              ? undefined
              : `translate3d(${tilt.x}px, ${tilt.y}px, 0) rotate(${tilt.rot}deg)`,
          }}
        >
          <svg
            viewBox="0 0 240 205"
            className="h-44 w-56 overflow-visible"
            role="img"
            aria-label="Developer companion illustration saying Hello"
          >
            <defs>
              <linearGradient id="botShellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-surface)" />
                <stop offset="100%" stopColor="var(--color-bg-soft)" />
              </linearGradient>
              <linearGradient id="botAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-accent-from)" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
              <linearGradient id="botVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <filter id="botEyeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ground Hover Shadow */}
            <ellipse
              cx="120"
              cy="192"
              rx="36"
              ry="6"
              fill="var(--color-ink)"
              className={
                prefersReducedMotion ? "opacity-20" : "animate-contact-bot-shadow"
              }
            />

            {/* Main Animated Bot Body Group */}
            <g
              className={
                prefersReducedMotion ? "" : "animate-contact-bot-body"
              }
            >
              {/* Left Arm (Resting cleanly at side) */}
              <g>
                <path
                  d="M 80 118 C 65 122, 62 138, 66 150"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 118 C 65 122, 62 138, 66 150"
                  fill="none"
                  stroke="url(#botShellGrad)"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="66"
                  cy="152"
                  r="6"
                  fill="url(#botAccentGrad)"
                />
              </g>

              {/* Right Waving Arm + Hand (Pivots around shoulder 158, 116) */}
              <g
                className={
                  prefersReducedMotion
                    ? ""
                    : isWavingOnce
                      ? "animate-contact-bot-arm-once"
                      : "animate-contact-bot-arm"
                }
                style={
                  prefersReducedMotion
                    ? { transform: "rotate(-42deg)", transformOrigin: "158px 116px" }
                    : undefined
                }
              >
                {/* Arm segment */}
                <path
                  d="M 158 116 C 175 110, 184 96, 185 78"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="9.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 158 116 C 175 110, 184 96, 185 78"
                  fill="none"
                  stroke="url(#botShellGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                {/* Wrist cuff */}
                <circle
                  cx="185"
                  cy="76"
                  r="4.5"
                  fill="var(--color-accent-solid)"
                />
                {/* Friendly open waving hand */}
                <g transform="translate(185, 67)">
                  <rect
                    x="-7"
                    y="-7"
                    width="14"
                    height="13"
                    rx="6"
                    fill="url(#botAccentGrad)"
                  />
                  {/* Subtle motion lines near waving hand */}
                  <path
                    d="M 11 -9 A 10 10 0 0 1 14 2"
                    fill="none"
                    stroke="var(--color-accent-solid)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <path
                    d="M -12 -9 A 10 10 0 0 0 -15 2"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </g>
              </g>

              {/* Torso / Developer Chassis */}
              <rect
                x="80"
                y="106"
                width="80"
                height="64"
                rx="22"
                fill="url(#botShellGrad)"
                stroke="var(--color-border)"
                strokeWidth="2"
              />
              {/* Subtle accent trim along torso top */}
              <path
                d="M 98 107 L 142 107"
                stroke="url(#botAccentGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Chest Code Terminal Badge (>_) */}
              <rect
                x="95"
                y="121"
                width="50"
                height="32"
                rx="9"
                fill="url(#botVisorGrad)"
                stroke="var(--color-border)"
                strokeWidth="1.2"
              />
              {/* Terminal prompt symbol > _ */}
              <path
                d="M 105 133 L 111 137 L 105 141"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="115"
                y1="141"
                x2="124"
                y2="141"
                stroke="#2dd4bf"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="135" cy="131" r="2" fill="#60a5fa" opacity="0.8" />

              {/* Neck joint */}
              <rect
                x="111"
                y="97"
                width="18"
                height="11"
                rx="4"
                fill="var(--color-border)"
              />

              {/* Antenna */}
              <line
                x1="120"
                y1="38"
                x2="120"
                y2="25"
                stroke="var(--color-border)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle
                cx="120"
                cy="22"
                r="5"
                fill="url(#botAccentGrad)"
                filter="url(#botEyeGlow)"
              />

              {/* Head Shell */}
              <rect
                x="68"
                y="36"
                width="104"
                height="64"
                rx="26"
                fill="url(#botShellGrad)"
                stroke="var(--color-border)"
                strokeWidth="2"
              />

              {/* Side Audio/Sensor Nodes (Ears) */}
              <rect
                x="62"
                y="57"
                width="6"
                height="22"
                rx="3"
                fill="url(#botAccentGrad)"
              />
              <rect
                x="172"
                y="57"
                width="6"
                height="22"
                rx="3"
                fill="url(#botAccentGrad)"
              />

              {/* Visor Screen */}
              <rect
                x="79"
                y="46"
                width="82"
                height="44"
                rx="17"
                fill="url(#botVisorGrad)"
                stroke="rgba(96, 165, 250, 0.28)"
                strokeWidth="1.25"
              />

              {/* Friendly Glowing LED Eyes + Smile */}
              {isHovered || isWavingOnce ? (
                /* Happy Arc Eyes (^ ^) on hover/click wave */
                <g filter="url(#botEyeGlow)">
                  <path
                    d="M 96 68 Q 103 59 110 68"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 130 68 Q 137 59 144 68"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </g>
              ) : (
                /* Friendly Rounded Eyes */
                <g filter="url(#botEyeGlow)">
                  <rect
                    x="97"
                    y="58"
                    width="11"
                    height="14"
                    rx="5.5"
                    fill="#38bdf8"
                  />
                  <circle cx="100.5" cy="62" r="2" fill="#e0f2fe" />
                  <rect
                    x="132"
                    y="58"
                    width="11"
                    height="14"
                    rx="5.5"
                    fill="#2dd4bf"
                  />
                  <circle cx="135.5" cy="62" r="2" fill="#ccfbf1" />
                </g>
              )}

              {/* Subtle Happy LED Smile */}
              <path
                d="M 113 78 Q 120 83 127 78"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          </svg>
        </div>

        {/* Subtle interactive caption */}
        <span className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-wide text-[var(--color-ink-muted)] opacity-75 transition-opacity group-hover:opacity-100">
          Tap or hover to say hello
        </span>
      </button>
    </div>
  );
}
