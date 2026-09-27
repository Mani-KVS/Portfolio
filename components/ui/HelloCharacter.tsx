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

  const triggerInteractiveWave = useCallback(
    (withRipple: boolean) => {
      const now = Date.now();
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
    },
    [prefersReducedMotion]
  );

  // Perform one greeting wave when the Contact section enters the viewport
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let hasGreeted = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasGreeted) {
          hasGreeted = true;
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
    setTilt({
      x: Math.max(-3.5, Math.min(3.5, relX * 3.5)),
      y: Math.max(-2.5, Math.min(2.5, relY * 2.5)),
      rot: Math.max(-1.8, Math.min(1.8, relX * 1.8)),
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
    <div className="relative my-4 flex w-full justify-center lg:justify-start">
      <button
        ref={containerRef}
        type="button"
        aria-label="Friendly developer robot waving hello"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        className="group relative flex h-60 w-68 cursor-pointer touch-manipulation select-none items-center justify-center rounded-3xl bg-transparent p-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-solid)] sm:h-64 sm:w-76"
      >
        {/* Soft blue/teal radial halo glow around the robot */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-2 rounded-full transition-all duration-500 ${
            isHovered || isWavingOnce
              ? "scale-110 opacity-100 blur-3xl"
              : "scale-95 opacity-75 blur-2xl"
          }`}
          style={{
            background:
              "radial-gradient(circle, var(--hero-blue-glow) 0%, var(--hero-teal-glow) 52%, transparent 78%)",
          }}
        />

        {/* Subtle circular tech ring behind robot */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute h-48 w-48 rounded-full border border-[var(--hero-circle-border)] transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        {/* Click / Tap expanding accent ripple */}
        {rippleKey !== null && !prefersReducedMotion && (
          <span
            key={rippleKey}
            aria-hidden="true"
            className="animate-hero-ripple pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 rounded-full border border-[var(--color-accent-solid)]/50 bg-[var(--color-accent-tint)]"
          />
        )}

        {/* Floating "Hello! 👋" speech bubble */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-2 top-3 z-20 flex items-center gap-1.5 rounded-2xl rounded-bl-xs border border-[var(--color-accent-solid)]/35 bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition-all duration-300 ${
            prefersReducedMotion
              ? "opacity-100"
              : isHovered || isWavingOnce
                ? "translate-y-0 scale-100 opacity-100"
                : "animate-contact-bot-speech"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
          <span>Hello!</span>
          <span role="img" aria-hidden="true">
            👋
          </span>
        </div>

        {/* Robot Character SVG */}
        <div
          className="relative z-10 transition-transform duration-200 ease-out"
          style={{
            transform: prefersReducedMotion
              ? undefined
              : `translate3d(${tilt.x}px, ${tilt.y}px, 0) rotate(${tilt.rot}deg)`,
          }}
        >
          <svg
            viewBox="0 0 260 225"
            className="h-54 w-64 overflow-visible sm:h-58 sm:w-70"
            role="img"
            aria-label="Friendly developer robot waving hello"
          >
            <defs>
              <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="55%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="robotAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-accent-from)" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
              <linearGradient id="robotVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#090d16" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <radialGradient id="pedestalGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.42" />
                <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <filter id="ledGlow" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing holographic hover pedestal */}
            <ellipse
              cx="130"
              cy="204"
              rx="58"
              ry="12"
              fill="url(#pedestalGlow)"
            />
            <ellipse
              cx="130"
              cy="204"
              rx="36"
              ry="5.5"
              fill="#0f172a"
              className={
                prefersReducedMotion ? "opacity-25" : "animate-contact-bot-shadow"
              }
            />

            {/* Robot Main Group */}
            <g
              className={
                prefersReducedMotion ? "" : "animate-contact-bot-body"
              }
            >
              {/* Left Arm (Resting cleanly by side) */}
              <g>
                <path
                  d="M 86 126 C 70 132, 66 148, 71 162"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                <path
                  d="M 86 126 C 70 132, 66 148, 71 162"
                  fill="none"
                  stroke="url(#robotBodyGrad)"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                />
                {/* Left Wrist & Hand */}
                <circle
                  cx="71"
                  cy="164"
                  r="6.5"
                  fill="url(#robotAccentGrad)"
                />
              </g>

              {/* Right Waving Arm + Hand (Shoulder Pivot at 174, 124) */}
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
                    ? { transform: "rotate(-44deg)", transformOrigin: "174px 124px" }
                    : { transformOrigin: "174px 124px" }
                }
              >
                <path
                  d="M 174 124 C 192 116, 202 100, 203 80"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                <path
                  d="M 174 124 C 192 116, 202 100, 203 80"
                  fill="none"
                  stroke="url(#robotBodyGrad)"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                />
                {/* Glowing teal wrist joint */}
                <circle
                  cx="203"
                  cy="78"
                  r="5"
                  fill="#14b8a6"
                />
                {/* Friendly Waving Hand + Fingers */}
                <g transform="translate(203, 68)">
                  <rect
                    x="-8"
                    y="-8"
                    width="16"
                    height="15"
                    rx="7"
                    fill="url(#robotAccentGrad)"
                  />
                  {/* Subtle wave motion arcs */}
                  <path
                    d="M 13 -10 A 11 11 0 0 1 16 2"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  <path
                    d="M -13 -10 A 11 11 0 0 0 -16 2"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </g>
              </g>

              {/* Robot Torso */}
              <rect
                x="84"
                y="112"
                width="92"
                height="72"
                rx="26"
                fill="url(#robotBodyGrad)"
                stroke="#94a3b8"
                strokeWidth="1.75"
              />
              {/* Accent collar line */}
              <path
                d="M 106 113.5 L 154 113.5"
                stroke="url(#robotAccentGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Chest Core Display (>_) */}
              <rect
                x="101"
                y="128"
                width="58"
                height="36"
                rx="11"
                fill="url(#robotVisorGrad)"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="1.25"
              />
              <path
                d="M 112 141 L 119 146 L 112 151"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="124"
                y1="151"
                x2="135"
                y2="151"
                stroke="#2dd4bf"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle cx="147" cy="139" r="2.4" fill="#2dd4bf" filter="url(#ledGlow)" />

              {/* Neck Joint */}
              <rect
                x="120"
                y="102"
                width="20"
                height="12"
                rx="5"
                fill="#64748b"
              />

              {/* Antenna with Glowing Node */}
              <line
                x1="130"
                y1="38"
                x2="130"
                y2="23"
                stroke="#94a3b8"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle
                cx="130"
                cy="19"
                r="5.5"
                fill="#2dd4bf"
                filter="url(#ledGlow)"
              />

              {/* Robot Head */}
              <rect
                x="72"
                y="36"
                width="116"
                height="68"
                rx="30"
                fill="url(#robotBodyGrad)"
                stroke="#94a3b8"
                strokeWidth="1.75"
              />

              {/* Side Sensor Ear Pods */}
              <rect
                x="65"
                y="58"
                width="7"
                height="24"
                rx="3.5"
                fill="url(#robotAccentGrad)"
              />
              <rect
                x="188"
                y="58"
                width="7"
                height="24"
                rx="3.5"
                fill="url(#robotAccentGrad)"
              />

              {/* Glossy Dark Visor Faceplate */}
              <rect
                x="84"
                y="46"
                width="92"
                height="48"
                rx="20"
                fill="url(#robotVisorGrad)"
                stroke="rgba(45, 212, 191, 0.35)"
                strokeWidth="1.4"
              />

              {/* Subtle Visor Highlight Reflection */}
              <path
                d="M 96 52 Q 130 49 164 52"
                fill="none"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Friendly Glowing Cyan/Teal LED Eyes */}
              {isHovered || isWavingOnce ? (
                <g filter="url(#ledGlow)">
                  <path
                    d="M 103 70 Q 111 60 119 70"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 141 70 Q 149 60 157 70"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                </g>
              ) : (
                <g filter="url(#ledGlow)">
                  <rect
                    x="104"
                    y="59"
                    width="12"
                    height="15"
                    rx="6"
                    fill="#38bdf8"
                  />
                  <circle cx="108" cy="63.5" r="2.2" fill="#e0f2fe" />
                  <rect
                    x="144"
                    y="59"
                    width="12"
                    height="15"
                    rx="6"
                    fill="#2dd4bf"
                  />
                  <circle cx="148" cy="63.5" r="2.2" fill="#ccfbf1" />
                </g>
              )}

              {/* Friendly LED Smile */}
              <path
                d="M 122 81 Q 130 87 138 81"
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#ledGlow)"
              />
            </g>
          </svg>
        </div>
      </button>
    </div>
  );
}
