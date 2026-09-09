"use client";

import { useMemo } from "react";
import { useReducedMotion } from "../lib/hooks";

type Point = { top: number; left: number; size: number; life: number; delay: number };

/**
 * Lays out `count` points from a fixed seed, so the server and the
 * client always agree on where they went — no Math.random, no
 * hydration drift.
 */
function scatter(count: number): Point[] {
  const points: Point[] = [];
  let seed = count * 9781 + 1013;

  const next = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  for (let i = 0; i < count; i++) {
    points.push({
      top: next() * 100,
      left: next() * 100,
      size: 1.5 + next() * 3.5,
      life: 2.4 + next() * 4,
      delay: next() * 4000,
    });
  }

  return points;
}

/** A scatter of tiny twinkling points behind a section. */
export default function Sparkles({
  count = 26,
  color = "bg-rose/70",
  className = "",
}: {
  count?: number;
  color?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const points = useMemo(() => scatter(count), [count]);

  if (reduced) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {points.map((p, i) => (
        <span
          key={i}
          className={`animate-twinkle absolute rounded-full ${color}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            ["--life" as string]: `${p.life}s`,
            ["--d" as string]: `${p.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}
