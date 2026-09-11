"use client";

import { useEffect, useState } from "react";
import { confession } from "../content";
import { useInView, useReducedMotion } from "../lib/hooks";

const TYPE_MS = 38; // per character, going on
const ERASE_MS = 18; // per character, coming off
const HOLD_MS = 2400; // how long a finished line stands
const GAP_MS = 480; // beat before the next one starts

/**
 * An interlude that can't quite finish a sentence. Each line types
 * itself out, stands there long enough to be read, erases, and the
 * next one starts — and it only runs while it is actually on screen.
 */
export default function Confession() {
  const reduced = useReducedMotion();
  const [ref, visible] = useInView<HTMLElement>({ threshold: 0.35 });
  const [line, setLine] = useState(0);
  const [length, setLength] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (reduced || !visible) return;
    const full = confession.lines[line];

    // One timer per step; the effect re-runs as each one lands.
    const wait = erasing
      ? length > 0
        ? ERASE_MS
        : GAP_MS
      : length < full.length
        ? TYPE_MS
        : HOLD_MS;

    const timer = window.setTimeout(() => {
      if (erasing) {
        if (length > 0) return setLength(length - 1);
        setErasing(false);
        setLine((v) => (v + 1) % confession.lines.length);
      } else {
        if (length < full.length) return setLength(length + 1);
        setErasing(true);
      }
    }, wait);

    return () => clearTimeout(timer);
  }, [line, length, erasing, reduced, visible]);

  const typed = confession.lines[line].slice(0, length);

  return (
    <section
      ref={ref}
      data-visible={visible}
      className="relative overflow-hidden bg-linen px-6 py-14 sm:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-[0.58rem] tracking-[0.4em] text-mulberry/75 uppercase">
          {confession.kicker}
        </p>

        <div
          className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-rose/35 to-transparent sm:mt-12"
          aria-hidden="true"
        />

        {/* Sized to the longest line, so nothing below it ever jumps. */}
        <div className="relative mt-7 grid sm:mt-12">
          <p
            className="invisible col-start-1 row-start-1 font-display text-[clamp(1.4rem,3.6vw,2.5rem)] leading-[1.4] font-light text-balance"
            aria-hidden="true"
          >
            {confession.lines.reduce((a, b) => (b.length > a.length ? b : a), "")}
          </p>

          {reduced ? (
            <ul className="col-start-1 row-start-1 space-y-6">
              {confession.lines.map((item) => (
                <li
                  key={item}
                  className="font-display text-[clamp(1.4rem,3.6vw,2.5rem)] leading-[1.4] font-light text-ink text-balance"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="col-start-1 row-start-1 font-display text-[clamp(1.4rem,3.6vw,2.5rem)] leading-[1.4] font-light text-ink text-balance"
              aria-hidden="true"
            >
              {typed}
              <span className="animate-caret ml-1 inline-block h-[0.85em] w-px translate-y-[0.08em] bg-rose align-middle" />
            </p>
          )}
        </div>

        {/* Which one of them you're on */}
        {!reduced && (
          <div className="mt-8 flex justify-center gap-2 sm:mt-14" aria-hidden="true">
            {confession.lines.map((item, i) => (
              <span
                key={item}
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  i === line ? "w-8 bg-rose" : "w-1.5 bg-rose/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* The whole confession, for anyone reading it another way */}
      {!reduced && (
        <ul className="sr-only">
          {confession.lines.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
