"use client";

import { useState } from "react";
import { openWhen } from "../content";
import { useReducedMotion } from "../lib/hooks";
import ChapterMark from "./ChapterMark";
import Reveal from "./Reveal";

/**
 * Chapter VI. The sealed notes people write on paper — "open when you
 * miss me" — except she can open these at three in the morning from
 * wherever she is. Each one turns over in place; any number can be
 * open at once.
 */
export default function OpenWhen() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpen((current) =>
      current.includes(i) ? current.filter((v) => v !== i) : [...current, i],
    );

  return (
    <section id="open-when" className="relative overflow-hidden bg-cream px-6 py-14 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-float-slow absolute top-1/4 -left-32 h-[28rem] w-[28rem] rounded-full bg-blush/30 blur-[130px]" />
        <div
          className="animate-float-slow absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-gold/20 blur-[130px]"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <ChapterMark numeral={openWhen.chapter} label={openWhen.label} align="center" />

        <Reveal delay={100} className="mx-auto mt-5 max-w-2xl text-center sm:mt-8">
          <h2 className="font-display text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.08] font-light text-ink text-balance">
            {openWhen.heading}
            <span className="block text-mulberry italic">{openWhen.headingItalic}</span>
          </h2>
          <p className="mt-4 font-body text-[0.56rem] tracking-[0.36em] text-muted/70 uppercase sm:mt-6">
            {openWhen.hint}
          </p>
        </Reveal>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16 sm:gap-6">
          {openWhen.notes.map((note, i) => {
            const isOpen = open.includes(i);

            return (
              <Reveal key={note.when} as="li" delay={(i % 3) * 110}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  data-open={isOpen}
                  className={`group block h-full w-full text-left ${reduced ? "" : "flip-scene"}`}
                >
                  <div
                    className={`min-h-[12rem] sm:min-h-[20rem] w-full ${reduced ? "" : "flip-inner"}`}
                  >
                    {/* Sealed */}
                    <div
                      hidden={reduced && isOpen}
                      className={`flex min-h-[12rem] sm:min-h-[20rem] flex-col items-center justify-center gap-3.5 rounded-[1.4rem] border border-rose/25 bg-paper px-7 py-7 text-center shadow-soft transition-shadow duration-500 group-hover:shadow-lift ${
                        reduced ? "" : "flip-face"
                      } sm:gap-5 sm:py-10`}
                    >
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-rose/90 font-display text-lg leading-none text-cream shadow-soft transition-transform duration-500 group-hover:scale-110"
                        aria-hidden="true"
                      >
                        ❤
                      </span>

                      <span className="font-body text-[0.54rem] tracking-[0.38em] text-mulberry/70 uppercase">
                        open when
                      </span>

                      <span className="font-display text-[1.5rem] leading-tight font-light text-ink">
                        {note.when}
                      </span>
                    </div>

                    {/* Unsealed */}
                    <div
                      hidden={reduced && !isOpen}
                      className={`flex min-h-[12rem] sm:min-h-[20rem] flex-col justify-between rounded-[1.4rem] border border-rose/30 bg-linen px-7 py-6 shadow-lift ${
                        reduced ? "mt-4" : "flip-face flip-back"
                      } sm:py-8`}
                    >
                      <span className="font-body text-[0.52rem] tracking-[0.36em] text-mulberry/70 uppercase">
                        {note.when}
                      </span>

                      <p className="mt-4 font-display text-[1rem] leading-[1.7] font-light text-ink">
                        {note.body}
                      </p>

                      <span
                        className="mt-3.5 self-end font-script text-[1.5rem] leading-none text-rose/75 sm:mt-5"
                        aria-hidden="true"
                      >
                        ❤
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
