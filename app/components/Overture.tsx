"use client";

import { useEffect, useState } from "react";
import { her, overture } from "../content";

const TYPE_MS = 1500; // line finishes typing
const HOLD_MS = 2050; // text fades
const PART_MS = 2350; // curtains part
const DONE_MS = 3450; // overlay removed, page unlocked

/**
 * The opening. A line types itself over a cream curtain, a counter runs
 * to 100, then the curtain splits and the page is underneath.
 *
 * Rendered server-side too, so there is never a flash of un-curtained
 * page; the <noscript> block in the layout removes it for anyone
 * without JavaScript.
 */
export default function Overture() {
  const [phase, setPhase] = useState<"typing" | "held" | "parting" | "gone">("typing");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / TYPE_MS, 1);
      // ease-out so it decelerates into 100
      setCount(Math.round((1 - Math.pow(1 - p, 2.4)) * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const timers = [
      window.setTimeout(() => setPhase("held"), HOLD_MS),
      window.setTimeout(() => setPhase("parting"), PART_MS),
      window.setTimeout(() => {
        setPhase("gone");
        document.documentElement.dataset.stage = "ready";
        document.body.dataset.locked = "false";
      }, DONE_MS),
    ];

    document.body.dataset.locked = "true";

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      document.body.dataset.locked = "false";
    };
  }, []);

  if (phase === "gone") return null;

  const parted = phase === "parting";
  const chars = [...overture.line];

  return (
    <div className="overture pointer-events-none fixed inset-0 z-100" aria-hidden="true">
      {/* Two halves of the curtain */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 origin-top bg-cream transition-transform duration-1100 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          parted ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-cream transition-transform duration-1100 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          parted ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Everything written on the curtain */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-8 transition-opacity duration-500 ${
          phase === "typing" ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="max-w-xl text-center font-display text-[clamp(1.3rem,4vw,2.1rem)] leading-snug font-light text-ink italic">
          {chars.map((char, i) => (
            <span
              key={i}
              className="animate-fade-in inline-block"
              style={{
                animationDelay: `${180 + i * 26}ms`,
                animationDuration: "420ms",
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char}
            </span>
          ))}
          <span className="animate-caret ml-1 inline-block h-[0.9em] w-px translate-y-[0.08em] bg-rose align-middle" />
        </p>
      </div>

      {/* Corner furniture */}
      <div
        className={`absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-6 transition-opacity duration-500 sm:px-10 sm:pb-9 ${
          phase === "typing" ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="flex items-baseline gap-3">
          <span className="font-body text-[0.6rem] tracking-[0.34em] text-muted/70 uppercase">
            {her.shortName}
          </span>
          <span className="font-deva text-base leading-none text-rose/60">
            {her.nameDevanagari}
          </span>
        </span>
        <span className="font-display text-4xl leading-none font-light text-rose/70 tabular-nums sm:text-5xl">
          {String(count).padStart(3, "0")}
        </span>
      </div>

      {/* Loading rule */}
      <div
        className={`absolute inset-x-0 bottom-0 h-px bg-rose/70 origin-left transition-opacity duration-500 ${
          phase === "typing" ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `scaleX(${count / 100})` }}
      />
    </div>
  );
}
