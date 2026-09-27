"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export interface TapRipple {
  id: number;
  x: number;
  y: number;
}

interface TrailBead {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  kind: "bead" | "orb" | "spark";
}

export function AuroraBackground({
  variant = "full",
}: {
  variant?: "full" | "subtle";
  ripples?: TapRipple[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const particles: TrailBead[] = [];
    let lastX: number | null = null;
    let lastY: number | null = null;
    let rafId: number | null = null;

    // Smooth ambient background glow coordinates
    let glowTargetX = width * 0.7;
    let glowTargetY = height * 0.3;
    let glowCurrX = glowTargetX;
    let glowCurrY = glowTargetY;
    let glowVisible = false;
    let fadeTimer: number | null = null;

    const isDarkMode = () =>
      document.documentElement.classList.contains("dark");

    const addParticle = (p: TrailBead) => {
      if (particles.length > 260) {
        particles.shift();
      }
      particles.push(p);
    };

    // Spawn the exact 3-layer effect from the reference image:
    // 1) Tapering dotted S-curve trail ("bead")
    // 2) Glowing luminous bokeh spheres with soft outer halos ("orb")
    // 3) Fine drifting stardust specks ("spark")
    const emitAlongSegment = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy);
      const step = 8;
      const steps = Math.max(1, Math.min(18, Math.floor(dist / step)));

      for (let i = 0; i < steps; i++) {
        const t = (i + 1) / steps;
        const px = x1 + dx * t;
        const py = y1 + dy * t;

        // 1. Tapering curved trail bead (forms the continuous dotted line)
        addParticle({
          x: px + (Math.random() - 0.5) * 1.5,
          y: py + (Math.random() - 0.5) * 1.5,
          vx: dx * 0.012 + (Math.random() - 0.5) * 0.15,
          vy: dy * 0.012 + (Math.random() - 0.5) * 0.15,
          radius: 2.4 + Math.random() * 1.4,
          alpha: 0.85,
          decay: 0.022 + Math.random() * 0.008,
          kind: "bead",
        });

        // 2. Luminous glowing bokeh orb with soft radial halo
        if (Math.random() < 0.32) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.25 + Math.random() * 0.85;
          addParticle({
            x: px + (Math.random() - 0.5) * 10,
            y: py + (Math.random() - 0.5) * 10,
            vx: Math.cos(angle) * speed + dx * 0.02,
            vy: Math.sin(angle) * speed + 0.35,
            radius: 4.2 + Math.random() * 3.6,
            alpha: 0.95,
            decay: 0.013 + Math.random() * 0.007,
            kind: "orb",
          });
        }

        // 3. Fine scattered micro-sparks drifting downward
        if (Math.random() < 0.45) {
          addParticle({
            x: px + (Math.random() - 0.5) * 26,
            y: py + (Math.random() - 0.5) * 26,
            vx: (Math.random() - 0.5) * 0.9,
            vy: 0.35 + Math.random() * 1.15,
            radius: 0.9 + Math.random() * 1.2,
            alpha: 0.8,
            decay: 0.014 + Math.random() * 0.01,
            kind: "spark",
          });
        }
      }
    };

    const emitBurst = (x: number, y: number) => {
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.4;
        const speed = 0.5 + Math.random() * 1.6;
        addParticle({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.25,
          radius: 4.5 + Math.random() * 3.8,
          alpha: 0.98,
          decay: 0.014 + Math.random() * 0.006,
          kind: "orb",
        });
      }
      for (let i = 0; i < 16; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 2.2;
        addParticle({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.5,
          radius: 1.0 + Math.random() * 1.3,
          alpha: 0.85,
          decay: 0.016 + Math.random() * 0.008,
          kind: "spark",
        });
      }
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const dark = isDarkMode();

      // Update soft ambient glow position
      glowCurrX += (glowTargetX - glowCurrX) * 0.12;
      glowCurrY += (glowTargetY - glowCurrY) * 0.12;
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${(glowCurrX - 300).toFixed(1)}px, ${(glowCurrY - 300).toFixed(1)}px, 0)`;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.kind === "orb") {
          p.vx *= 0.985;
          p.vy = p.vy * 0.985 + 0.016; // gentle downward float like reference image
        } else if (p.kind === "spark") {
          p.vx *= 0.99;
          p.vy += 0.02;
        } else {
          p.vx *= 0.92;
          p.vy *= 0.92;
          p.radius *= 0.984; // tapering trail bead size
        }

        p.alpha -= p.decay;

        if (p.alpha <= 0.01 || p.radius <= 0.25) {
          particles.splice(i, 1);
          continue;
        }

        if (p.kind === "orb") {
          // Draw soft outer radial halo + bright luminous core (matching reference image)
          const haloRadius = p.radius * 4.2;
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            haloRadius
          );
          if (dark) {
            grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha})`);
            grad.addColorStop(0.22, `rgba(224, 242, 254, ${p.alpha * 0.85})`);
            grad.addColorStop(0.5, `rgba(56, 189, 248, ${p.alpha * 0.28})`);
            grad.addColorStop(1, "rgba(14, 165, 165, 0)");
          } else {
            grad.addColorStop(0, `rgba(2, 132, 199, ${p.alpha * 0.95})`);
            grad.addColorStop(0.25, `rgba(14, 165, 233, ${p.alpha * 0.65})`);
            grad.addColorStop(0.55, `rgba(56, 189, 248, ${p.alpha * 0.22})`);
            grad.addColorStop(1, "rgba(186, 230, 253, 0)");
          }
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();

          // Crisp inner pearl core
          ctx.fillStyle = dark
            ? `rgba(255, 255, 255, ${Math.min(1, p.alpha * 1.1)})`
            : `rgba(2, 132, 199, ${Math.min(1, p.alpha)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.72, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === "bead") {
          // Dotted curve trail bead
          ctx.fillStyle = dark
            ? `rgba(241, 245, 249, ${p.alpha * 0.78})`
            : `rgba(14, 165, 233, ${p.alpha * 0.68})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Fine micro-spark dot
          ctx.fillStyle = dark
            ? `rgba(224, 242, 254, ${p.alpha * 0.85})`
            : `rgba(2, 132, 199, ${p.alpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const stillMovingGlow =
        Math.abs(glowTargetX - glowCurrX) > 0.4 ||
        Math.abs(glowTargetY - glowCurrY) > 0.4;

      if (particles.length > 0 || stillMovingGlow) {
        rafId = window.requestAnimationFrame(renderFrame);
      } else {
        rafId = null;
      }
    };

    const wakeLoop = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    const handleMove = (x: number, y: number) => {
      glowTargetX = x;
      glowTargetY = y;
      if (!glowVisible && cursorGlowRef.current) {
        glowVisible = true;
        cursorGlowRef.current.style.opacity = "1";
      }
      if (fadeTimer !== null) {
        window.clearTimeout(fadeTimer);
        fadeTimer = null;
      }

      if (lastX !== null && lastY !== null) {
        emitAlongSegment(lastX, lastY, x, y);
      } else {
        emitAlongSegment(x, y, x + 1, y + 1);
      }
      lastX = x;
      lastY = y;
      wakeLoop();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      handleMove(e.clientX, e.clientY);
    };

    const onPointerDown = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      glowTargetX = e.clientX;
      glowTargetY = e.clientY;
      if (e.pointerType === "touch") {
        glowCurrX = e.clientX;
        glowCurrY = e.clientY;
      }
      if (cursorGlowRef.current) {
        glowVisible = true;
        cursorGlowRef.current.style.opacity = "1";
      }
      emitBurst(e.clientX, e.clientY);
      wakeLoop();
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      handleMove(touch.clientX, touch.clientY);
    };

    const resetTrailOrigin = () => {
      lastX = null;
      lastY = null;
      fadeTimer = window.setTimeout(() => {
        glowVisible = false;
        if (cursorGlowRef.current) {
          cursorGlowRef.current.style.opacity = "0";
        }
      }, 700);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", resetTrailOrigin, { passive: true });
    window.addEventListener("touchcancel", resetTrailOrigin, { passive: true });
    document.addEventListener("mouseleave", resetTrailOrigin);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", resetTrailOrigin);
      window.removeEventListener("touchcancel", resetTrailOrigin);
      document.removeEventListener("mouseleave", resetTrailOrigin);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (fadeTimer !== null) window.clearTimeout(fadeTimer);
    };
  }, [prefersReducedMotion]);

  if (variant === "subtle") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Stationary subtle ambient radial glow (keeps 85%+ of screen plain #07111F in dark / #FFFFFF in light) */}
      <div
        className="absolute inset-0 transition-opacity duration-600"
        style={{
          background:
            "radial-gradient(circle 680px at 74% 24%, var(--ambient-stationary-glow), transparent 72%)",
        }}
      />

      {/* Soft ambient radial backlight following cursor / touch */}
      {!prefersReducedMotion && (
        <div
          ref={cursorGlowRef}
          className="fixed left-0 top-0 h-[600px] w-[600px] rounded-full opacity-0 blur-[80px] transition-opacity duration-500 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, var(--cursor-glow-core) 0%, var(--cursor-glow-primary) 32%, transparent 72%)",
          }}
        />
      )}

      {/* 60fps Luminous Orb & Tapering Dotted Trail Canvas (matches reference image on cursor move & mobile touch) */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-10 block"
        />
      )}
    </div>
  );
}
