"use client";

import { useRef } from "react";
import { statement } from "../content";
import { useScrollProgress } from "../lib/hooks";
import ChapterMark from "./ChapterMark";
import Reveal from "./Reveal";

/**
 * A pinned paragraph that lights up one word at a time as you scroll
 * through it. Words wrapped in *asterisks* are set in rose italic.
 */
export default function Statement() {
  const trackRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const words = statement.words.split(/\s+/).filter(Boolean);

  useScrollProgress(trackRef, (p) => {
    // Spend the first and last tenth of the scroll idling, so the
    // sentence completes comfortably before the section leaves.
    const eased = Math.min(Math.max((p - 0.08) / 0.62, 0), 1);
    const lit = eased * words.length;
    wordRefs.current.forEach((node, i) => {
      if (node) node.dataset.lit = String(i < lit);
    });
  });

  return (
    <>
      <section id="statement" ref={trackRef} className="relative h-[230vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-6">
          <div className="mx-auto w-full max-w-4xl">
            <ChapterMark numeral={statement.chapter} label={statement.label} />

            <p className="mt-10 font-display text-[clamp(1.6rem,4.6vw,3.4rem)] leading-[1.32] font-light text-ink">
              {words.map((raw, i) => {
                const emphasised = raw.startsWith("*") || /^\W*\*/.test(raw);
                const clean = raw.replace(/\*/g, "");
                return (
                  <span
                    key={`${clean}-${i}`}
                    ref={(node) => {
                      wordRefs.current[i] = node;
                    }}
                    data-lit="false"
                    className={`word mr-[0.28em] ${
                      emphasised ? "text-rose italic" : ""
                    }`}
                  >
                    {clean}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="relative overflow-hidden px-6 py-28 sm:py-40">
        <div
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="font-display text-[34vw] leading-none text-rose/[0.06] select-none">
            &rdquo;
          </span>
        </div>

        <Reveal className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-[clamp(1.8rem,5vw,3.6rem)] leading-[1.22] font-light text-plum italic text-balance">
            {statement.pullQuote}
          </blockquote>
          <div
            className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-rose/60 to-transparent"
            aria-hidden="true"
          />
        </Reveal>
      </section>
    </>
  );
}
