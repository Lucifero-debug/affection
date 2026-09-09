"use client";

import { useRef } from "react";
import { timeline } from "../content";
import { useScrollProgress } from "../lib/hooks";
import ChapterMark from "./ChapterMark";
import Reveal from "./Reveal";
import Sparkles from "./Sparkles";

/**
 * Chapter II. A thread runs down the page and fills in as you scroll;
 * each milestone lights the moment the thread reaches it, and the node
 * beside it swells and takes on colour.
 */
export default function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useScrollProgress(
    trackRef,
    (p) => {
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${p})`;
      }

      // Light every milestone whose middle the playhead has passed.
      const line = window.innerHeight * 0.72;
      for (const step of stepRefs.current) {
        if (!step) continue;
        const rect = step.getBoundingClientRect();
        step.dataset.lit = String(rect.top + rect.height * 0.25 < line);
      }
    },
    "fill",
  );

  return (
    <section id="story" className="relative overflow-hidden bg-cream px-6 py-24 sm:py-32">
      <Sparkles count={22} className="-z-10" />

      <div className="mx-auto max-w-5xl">
        <ChapterMark numeral={timeline.chapter} label={timeline.label} align="center" />

        <Reveal delay={100} className="mx-auto mt-8 max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.08] font-light">
            <span className="shimmer">{timeline.heading}</span>
            <span className="block text-mulberry italic">{timeline.headingItalic}</span>
          </h2>
          <p className="mt-6 font-body text-[0.92rem] leading-relaxed text-muted">
            {timeline.sub}
          </p>
        </Reveal>

        {/* ── The thread ─────────────────────────────────────── */}
        <div ref={trackRef} className="relative mt-20 pl-10 sm:pl-0">
          {/* Rail — hard left on small screens, centred from sm up */}
          <div
            className="absolute top-2 bottom-2 left-[7px] w-px bg-rose/20 sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          >
            <div
              ref={fillRef}
              className="h-full w-full origin-top bg-gradient-to-b from-blush via-rose to-mulberry"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol className="space-y-16 sm:space-y-24">
            {timeline.milestones.map((moment, i) => (
              <li
                key={moment.title}
                ref={(node) => {
                  stepRefs.current[i] = node;
                }}
                data-lit="false"
                className="thread-step group relative sm:grid sm:grid-cols-2 sm:gap-14"
              >
                {/* Node on the rail */}
                <span
                  className="thread-node absolute top-1.5 -left-10 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-rose/50 bg-cream group-data-[lit=true]:scale-125 group-data-[lit=true]:border-rose group-data-[lit=true]:bg-rose group-data-[lit=true]:shadow-[0_0_0_6px_rgb(232_180_184_/_0.28)] sm:left-1/2 sm:-translate-x-1/2"
                  aria-hidden="true"
                />

                {/* Alternating sides from sm up */}
                <div
                  className={
                    i % 2 === 0
                      ? "sm:col-start-1 sm:pr-4 sm:text-right"
                      : "sm:col-start-2 sm:pl-4"
                  }
                >
                  <span className="font-body text-[0.58rem] tracking-[0.38em] text-mulberry/75 uppercase">
                    {moment.when}
                  </span>
                  <h3 className="mt-4 font-display text-[clamp(1.5rem,3.4vw,2.35rem)] leading-[1.15] font-light text-ink transition-colors duration-700 group-data-[lit=true]:text-plum">
                    {moment.title}
                  </h3>
                  <p className="mt-4 max-w-md font-body text-[0.93rem] leading-[1.85] text-muted sm:inline-block">
                    {moment.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* The thread doesn't end, it just goes out of frame */}
          <div
            className="relative mt-16 flex justify-center sm:mt-24"
            aria-hidden="true"
          >
            <span className="font-script text-[clamp(1.6rem,4vw,2.4rem)] leading-none text-rose/70">
              to be continued
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
