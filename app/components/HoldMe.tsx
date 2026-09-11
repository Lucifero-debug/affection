"use client";

import { useEffect, useRef, useState } from "react";
import { hold } from "../content";
import { useReducedMotion } from "../lib/hooks";
import Aurora from "./Aurora";
import Sparkles from "./Sparkles";

const HOLD_MS = 2400; // how long she has to mean it
const REWIND_MS = 600; // how fast it lets go if she does
const R = 54;
const CIRCUMFERENCE = 2 * Math.PI * R;

/**
 * The last thing on the page you have to work for. The ring fills only
 * while the heart is held down — let go early and it unwinds. Holding
 * it all the way opens the one thing that isn't written anywhere else.
 */
export default function HoldMe() {
  const reduced = useReducedMotion();
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);

  const ringRef = useRef<SVGCircleElement>(null);
  const frame = useRef(0);
  const progress = useRef(0);

  const paint = (p: number) => {
    progress.current = p;
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - p));
    }
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const press = () => {
    if (done) return;
    setHolding(true);
    cancelAnimationFrame(frame.current);

    // Resume from wherever the ring currently is, rather than restart.
    const startedAt = performance.now() - progress.current * HOLD_MS;

    const fill = (now: number) => {
      const p = Math.min((now - startedAt) / HOLD_MS, 1);
      paint(p);
      if (p < 1) {
        frame.current = requestAnimationFrame(fill);
      } else {
        setHolding(false);
        setDone(true);
      }
    };
    frame.current = requestAnimationFrame(fill);
  };

  const release = () => {
    if (done) return;
    setHolding(false);
    cancelAnimationFrame(frame.current);

    const from = progress.current;
    const startedAt = performance.now();

    const unwind = (now: number) => {
      const k = Math.min((now - startedAt) / REWIND_MS, 1);
      paint(from * (1 - k));
      if (k < 1) frame.current = requestAnimationFrame(unwind);
    };
    frame.current = requestAnimationFrame(unwind);
  };

  const label = done ? hold.secret.line : holding ? hold.holding : hold.prompt;

  return (
    <section
      id="hold"
      className="relative isolate flex min-h-[62svh] sm:min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-plum px-6 py-16 text-center sm:py-28"
    >
      <Aurora tone="night" opacity={0.55} className="-z-10" />
      <Sparkles count={26} color="bg-blush/70" className="-z-10" />

      <p className="max-w-lg font-body text-[0.58rem] tracking-[0.42em] text-blush/70 uppercase">
        {hold.kicker}
      </p>

      {/* ── The heart you have to hold ─────────────────────────── */}
      <div className="relative mt-8 sm:mt-14" data-holding={holding} data-done={done}>
        <button
          type="button"
          onPointerDown={reduced ? undefined : press}
          onPointerUp={reduced ? undefined : release}
          onPointerLeave={reduced ? undefined : release}
          onPointerCancel={reduced ? undefined : release}
          onClick={reduced ? () => setDone(true) : undefined}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              if (reduced) setDone(true);
              else press();
            }
          }}
          onKeyUp={(e) => {
            if ((e.key === " " || e.key === "Enter") && !reduced) release();
          }}
          aria-label={done ? "Held" : "Press and hold"}
          aria-pressed={done}
          className="relative flex h-36 w-36 touch-none items-center justify-center rounded-full select-none"
        >
          <svg viewBox="0 0 128 128" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="64" cy="64" r={R} fill="none" stroke="rgb(232 180 184 / 0.2)" strokeWidth="2" />
            <circle
              ref={ringRef}
              className="hold-ring"
              cx="64"
              cy="64"
              r={R}
              fill="none"
              stroke={done ? "rgb(232 180 184)" : "rgb(192 132 151)"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
            />
          </svg>

          {/* The pulse it lets off when it finally gives */}
          {done && (
            <span
              className="animate-ring-burst absolute inset-0 rounded-full border border-blush"
              aria-hidden="true"
            />
          )}

          <span
            className={`hold-core font-display leading-none text-rose transition-colors duration-700 ${
              done ? "animate-heartbeat text-blush" : ""
            }`}
            style={{ fontSize: "3.4rem" }}
            aria-hidden="true"
          >
            ❤
          </span>
        </button>
      </div>

      <p
        className={`mt-6 font-body text-[0.58rem] tracking-[0.4em] uppercase transition-colors duration-500 ${
          done ? "text-blush" : "text-cream/55"
        } sm:mt-10`}
        aria-live="polite"
      >
        {done ? "" : label}
      </p>

      {/* ── What it opens ──────────────────────────────────────── */}
      <div
        className={`grid w-full max-w-2xl transition-[grid-template-rows] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          done ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`transition-opacity duration-700 ${done ? "opacity-100 delay-300" : "opacity-0"}`}
          >
            <h2 className="mt-4 font-display text-[clamp(2rem,6vw,3.4rem)] leading-[1.12] font-light text-cream text-balance">
              {hold.secret.line}
            </h2>

            <p className="mx-auto mt-5 max-w-xl font-display text-[1.1rem] leading-[1.85] font-light text-blush/85 sm:mt-8">
              {hold.secret.body}
            </p>

            <p className="mt-6 font-script text-[clamp(1.9rem,5vw,2.8rem)] leading-none text-blush sm:mt-10">
              {hold.secret.sign}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
