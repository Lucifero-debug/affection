"use client";

import { useEffect, useState } from "react";
import { languages } from "../content";
import { useInView, useReducedMotion } from "../lib/hooks";
import Reveal from "./Reveal";
import Sparkles from "./Sparkles";

const DWELL_MS = 2000;

/**
 * The same sentence, sixteen times over. One is held up large while a
 * light travels through the rest of them; hovering a name jumps
 * straight to it.
 */
export default function InEveryLanguage() {
  const reduced = useReducedMotion();
  const [ref, visible] = useInView<HTMLElement>({ threshold: 0.3 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || !visible) return;
    const id = window.setInterval(
      () => setActive((v) => (v + 1) % languages.items.length),
      DWELL_MS,
    );
    return () => clearInterval(id);
  }, [reduced, visible]);

  const current = languages.items[active];

  return (
    <section ref={ref} className="relative overflow-hidden bg-linen px-6 py-14 sm:py-32">
      <Sparkles count={20} className="-z-10" />

      <div className="mx-auto max-w-4xl text-center">
        <p className="font-body text-[0.58rem] tracking-[0.4em] text-mulberry/75 uppercase">
          {languages.kicker}
        </p>

        {/* The one being said right now */}
        <div className="relative mt-8 flex min-h-[9rem] flex-col items-center justify-center sm:min-h-[11rem] sm:mt-14">
          <p
            key={reduced ? "static" : active}
            className={`font-display text-[clamp(2.2rem,7vw,4.4rem)] leading-[1.15] font-light text-plum text-balance ${
              reduced ? "" : "cycle-word"
            }`}
            lang={current.lang}
          >
            {current.phrase}
          </p>
          <span className="mt-4 font-body text-[0.56rem] tracking-[0.4em] text-mulberry/60 uppercase sm:mt-6">
            {current.lang}
          </span>
        </div>

        {/* All of them, always there */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-14">
          {languages.items.map((item, i) => (
            <li key={item.lang}>
              <button
                type="button"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                lang={item.lang}
                className={`lang-chip font-display text-[0.95rem] leading-none font-light whitespace-nowrap sm:text-[1.05rem] ${
                  i === active
                    ? "-translate-y-0.5 text-rose opacity-100"
                    : "text-muted opacity-45 hover:opacity-90"
                }`}
              >
                {item.phrase}
              </button>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <div
            className="mx-auto mt-9 h-px w-24 bg-gradient-to-r from-transparent via-rose/50 to-transparent sm:mt-16"
            aria-hidden="true"
          />
          <p className="mt-6 font-display text-[clamp(1.4rem,3.6vw,2.2rem)] leading-snug font-light text-ink text-balance sm:mt-10">
            {languages.line}{" "}
            <span className="text-mulberry italic">{languages.lineItalic}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
