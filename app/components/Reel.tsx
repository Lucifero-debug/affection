"use client";

import { useRef, useState } from "react";

import { her, reel } from "../content";
import { useReducedMotion, useScrollProgress } from "../lib/hooks";
import Video from "./Video";

const ASPECT: Record<string, string> = {
  portrait: "aspect-[9/16]",
  landscape: "aspect-video",
  square: "aspect-square",
};

/**
 * The reel — the one section where she moves.
 *
 * A dark room with a single frame held in the middle of it. The section
 * pins while the clip breathes very slightly larger, which is enough
 * motion for a page that is otherwise still: the video is doing the
 * moving, so nothing else should compete with it.
 */
export default function Reel() {
  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const clips = reel.clips;
  const clip = clips[active] ?? clips[0];

  useScrollProgress(trackRef, (p) => {
    if (!frameRef.current || reduced) return;
    // A hair under full size at the edges, full size in the middle.
    const eased = 1 - Math.abs(p - 0.5) * 2; // 0 → 1 → 0
    frameRef.current.style.transform = `scale(${0.94 + eased * 0.06})`;
  });

  if (!clip) return null;

  return (
    <section ref={trackRef} id="reel" className="relative h-[200vh] bg-ink">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden py-10 sm:py-14">
        {/* Warm glow so the dark room isn't flat */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 -left-32 h-[32rem] w-[32rem] rounded-full bg-rose/20 blur-[140px]" />
          <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold/15 blur-[140px]" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-end justify-between px-6 sm:px-12">
          <div>
            <span className="font-body text-[0.58rem] tracking-[0.4em] text-blush/70 uppercase">
              {reel.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-none font-light text-cream">
              {her.shortName}, <span className="text-blush/80 italic">in motion</span>
            </h2>
          </div>

          {clips.length > 1 && (
            <span
              className="hidden font-display text-sm text-cream/40 tabular-nums sm:block"
              aria-hidden="true"
            >
              {String(active + 1).padStart(2, "0")} / {String(clips.length).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* The frame */}
        <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-6 py-6 sm:px-12">
          <div
            ref={frameRef}
            className="h-full max-h-full will-change-transform"
            style={{ transform: "scale(0.94)" }}
          >
            <Video
              key={clip.src}
              src={clip.src}
              poster={clip.poster}
              label={clip.label ?? `${her.shortName}, moving`}
              captions={clip.captions}
              className={`h-full max-w-[92vw] ${ASPECT[clip.aspect ?? "portrait"]} rounded-xl shadow-deep ring-1 ring-cream/10`}
            />
          </div>
        </div>

        {/* Caption + the other clips */}
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 px-6 sm:px-12">
          <p className="max-w-md font-display text-[clamp(1.1rem,2.4vw,1.6rem)] leading-snug font-light text-cream/75 italic">
            {clip.caption ?? reel.tail}
          </p>

          {clips.length > 1 && (
            <div className="flex items-center gap-3">
              {clips.map((c, i) => (
                <button
                  key={c.src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  aria-label={`Clip ${i + 1}${c.caption ? `: ${c.caption}` : ""}`}
                  className={`font-display text-sm tabular-nums transition-colors duration-500 ${
                    i === active
                      ? "text-blush"
                      : "text-cream/35 hover:text-cream/70"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
