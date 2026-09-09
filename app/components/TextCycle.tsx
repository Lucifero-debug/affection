"use client";

import { useEffect, useState } from "react";

/**
 * Rotates through a list of words, flipping each one up out of the
 * line. Decorative — the full list is exposed to assistive tech as a
 * single label so nothing is lost.
 */
export default function TextCycle({
  words,
  interval = 2100,
  startDelay = 0,
  className = "",
}: {
  words: string[];
  interval?: number;
  startDelay?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [running, setRunning] = useState(startDelay === 0);

  useEffect(() => {
    if (startDelay === 0) return;
    const t = window.setTimeout(() => setRunning(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!running || words.length < 2) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [running, interval, words.length]);

  return (
    <span
      className={`relative inline-block [perspective:600px] ${className}`}
      aria-label={words.join(", ")}
    >
      {/* Reserves the width of the longest word so nothing jumps. */}
      <span className="invisible" aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span key={i} className="cycle-word whitespace-nowrap">
          {words[i]}
        </span>
      </span>
    </span>
  );
}
