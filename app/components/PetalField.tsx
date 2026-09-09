"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../lib/hooks";

type Petal = {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  phase: number;
  spin: number;
  angle: number;
  alpha: number;
};

const COLORS = ["232,180,184", "192,132,151", "201,154,107"];

/**
 * Petals drifting upward on a canvas — sine sway, slow spin, and a soft
 * push away from the pointer. Pauses whenever it is off-screen or the
 * tab is hidden, so it costs nothing when you aren't looking at it.
 */
export default function PetalField({ density = 34 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let petals: Petal[] = [];
    let frame = 0;
    let running = false;
    let last = 0;
    const pointer = { x: -9999, y: -9999 };

    const seed = (petal: Petal, first: boolean): Petal => {
      petal.x = Math.random() * width;
      petal.y = first ? Math.random() * height : height + 40;
      petal.r = 2.5 + Math.random() * 6;
      petal.vy = 10 + Math.random() * 26; // px per second
      petal.sway = 14 + Math.random() * 42;
      petal.phase = Math.random() * Math.PI * 2;
      petal.spin = (Math.random() - 0.5) * 1.4;
      petal.angle = Math.random() * Math.PI * 2;
      petal.alpha = 0.18 + Math.random() * 0.4;
      return petal;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(density * Math.min(width / 1200, 1.15));
      petals = Array.from({ length: Math.max(count, 12) }, () =>
        seed({} as Petal, true),
      );
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        p.y -= p.vy * dt;
        p.phase += dt * 0.8;
        p.angle += p.spin * dt;

        let x = p.x + Math.sin(p.phase) * p.sway;

        // Gentle repulsion from the pointer
        const dx = x - pointer.x;
        const dy = p.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 26000) {
          const push = (1 - dist2 / 26000) * 26;
          const dist = Math.sqrt(dist2) || 1;
          x += (dx / dist) * push;
          p.y += (dy / dist) * push * 0.5;
        }

        if (p.y < -50) seed(p, false);

        const fade =
          p.y > height - 90 ? Math.max((height - p.y) / 90, 0) : Math.min(p.y / 120, 1);

        ctx.save();
        ctx.translate(x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha * fade;
        ctx.fillStyle = `rgb(${COLORS[Math.floor(p.r) % COLORS.length]})`;
        // A petal: two arcs meeting at a point
        ctx.beginPath();
        ctx.moveTo(0, -p.r);
        ctx.quadraticCurveTo(p.r, 0, 0, p.r);
        ctx.quadraticCurveTo(-p.r * 0.55, 0, 0, -p.r);
        ctx.fill();
        ctx.restore();
      }

      if (running) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { rootMargin: "120px" },
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
