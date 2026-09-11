"use client";

import { useEffect, useRef } from "react";

import { her, reel } from "../content";
import { useScrollProgress } from "../lib/hooks";
import Video from "./Video";

const ASPECT: Record<string, string> = {
  portrait: "aspect-[9/16]",
  landscape: "aspect-video",
  square: "aspect-square",
};

/**
 * A pinned reel. Scrolling down drags the clips sideways past a fixed
 * frame — the section holds still while the film runs through it.
 *
 * Each clip plays only while it is actually on screen, so at most two
 * or three are ever running, and they all start silent.
 */
export default function Reel() {
  const trackRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const travel = useRef(0);

  // Cache how far the rail has to move; recompute only on resize.
  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      travel.current = Math.max(rail.scrollWidth - window.innerWidth + 64, 0);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 600); // after fonts/posters settle
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  useScrollProgress(trackRef, (p) => {
    if (railRef.current) {
      railRef.current.style.transform = `translate3d(${-p * travel.current}px, 0, 0)`;
    }
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${p})`;
    }
  });

  return (
    <section ref={trackRef} id="reel" className="relative h-[240vh] bg-ink sm:h-[330vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* Warm glow so the dark room isn't flat */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/3 -left-32 h-[32rem] w-[32rem] rounded-full bg-rose/20 blur-[140px]" />
          <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold/15 blur-[140px]" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-end justify-between px-6 pb-10 sm:px-12 sm:pb-14">
          <div>
            <span className="font-body text-[0.58rem] tracking-[0.4em] text-blush/70 uppercase">
              {reel.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-none font-light text-cream">
              {her.shortName}, <span className="text-blush/80 italic">in motion</span>
            </h2>
          </div>
          <span
            className="hidden font-body text-[0.55rem] tracking-[0.34em] text-cream/40 uppercase sm:block"
            aria-hidden="true"
          >
            keep scrolling →
          </span>
        </div>

        {/* The rail */}
        <div
          ref={railRef}
          className="relative z-10 flex w-max items-start gap-4 pr-16 pl-6 will-change-transform sm:gap-10 sm:pl-12"
        >
          {reel.clips.map((clip, i) => (
            <figure
              key={clip.src}
              className="relative shrink-0"
              style={{ transform: `translateY(${i % 2 === 0 ? "-0.75rem" : "0.75rem"})` }}
            >
              <span
                className="absolute -top-7 left-0 font-display text-sm text-blush/50 tabular-nums"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <Video
                src={clip.src}
                poster={clip.poster}
                label={clip.label ?? `${her.shortName}, moving`}
                captions={clip.captions}
                compact
                className={`h-[46svh] sm:h-[52svh] ${ASPECT[clip.aspect ?? "portrait"]} rounded-xl shadow-deep ring-1 ring-cream/10`}
              />

              {clip.caption && (
                <figcaption className="mt-4 max-w-[26ch] font-display text-lg leading-snug font-light text-cream/75 italic">
                  {clip.caption}
                </figcaption>
              )}
            </figure>
          ))}

          {/* Tail card */}
          <div className="flex h-[46svh] w-[52vw] shrink-0 items-center sm:h-[52svh] sm:w-[26vw]">
            <p className="font-display text-[clamp(1.4rem,3vw,2.2rem)] leading-tight font-light text-blush/70 italic">
              {reel.tail}
            </p>
          </div>
        </div>

        {/* Reel progress */}
        <div className="relative z-10 mx-6 mt-6 h-px bg-cream/15 sm:mx-12 sm:mt-10" aria-hidden="true">
          <div ref={barRef} className="h-full origin-left bg-blush" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
