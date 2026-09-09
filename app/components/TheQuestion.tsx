"use client";

import { useEffect, useMemo, useState } from "react";
import { her, question } from "../content";
import Aurora from "./Aurora";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import Sparkles from "./Sparkles";

const CONFETTI = ["❤", "❤", "✦", "❀", "❤", "✧", "❤"];
const CONFETTI_COLORS = ["text-rose", "text-blush", "text-gold", "text-mulberry"];

type Answer = "yes" | "no" | null;

/**
 * The ask. Both buttons work, and both answers get a real response —
 * a question she cannot decline is not a question, and a "no" that
 * runs away from the pointer is only charming between people who have
 * already said yes to each other once.
 */
export default function TheQuestion() {
  const [answer, setAnswer] = useState<Answer>(null);

  useEffect(() => {
    if (!answer) return;
    document.body.dataset.locked = "true";
    return () => {
      document.body.dataset.locked = "false";
    };
  }, [answer]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        glyph: CONFETTI[i % CONFETTI.length],
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        left: (i * 37) % 100,
        drift: ((i * 53) % 120) - 60,
        size: 12 + ((i * 17) % 26),
        life: 4 + ((i * 13) % 40) / 10,
        delay: ((i * 29) % 50) * 100,
        rot: 360 + ((i * 71) % 540),
      })),
    [],
  );

  return (
    <>
      <section
        id="the-question"
        className="relative isolate flex min-h-[92svh] flex-col items-center justify-center overflow-hidden bg-linen px-6 py-28 text-center"
      >
        <Aurora tone="warm" opacity={0.7} className="-z-10" />
        <Sparkles count={28} className="-z-10" />

        <Reveal className="relative flex w-full flex-col items-center">
          <p className="font-body text-[0.58rem] tracking-[0.42em] text-mulberry/80 uppercase">
            {question.kicker}
          </p>

          <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.3rem,7vw,4.6rem)] leading-[1.08] font-light text-balance">
            <span className="shimmer">{question.ask}</span>
          </h2>

          <p className="mt-7 max-w-md font-body text-[0.9rem] leading-relaxed text-muted">
            {question.aside}
          </p>

          {/* ── Two answers, both of them real ─────────────────── */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <Magnetic strength={0.28}>
              <button
                type="button"
                onClick={() => setAnswer("yes")}
                className="relative rounded-full bg-rose px-10 py-4 font-body text-[0.66rem] tracking-[0.32em] text-cream uppercase shadow-lift transition-colors duration-500 hover:bg-mulberry"
              >
                <span
                  className="animate-glow absolute -inset-4 -z-10 rounded-full bg-rose/40 blur-xl"
                  aria-hidden="true"
                />
                {question.yes}
              </button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setAnswer("no")}
              className="rounded-full border border-muted/40 bg-cream/70 px-9 py-4 font-body text-[0.62rem] tracking-[0.3em] text-muted uppercase backdrop-blur-sm transition-colors duration-500 hover:border-mulberry/50 hover:text-mulberry"
            >
              {question.no}
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── She said yes ─────────────────────────────────────────
          Outside the section on purpose: `isolate` above creates a
          stacking context, and a modal trapped inside it would paint
          underneath the fixed furniture. ── */}
      {answer === "yes" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={question.celebration.line}
          className="animate-fade-in fixed inset-0 z-90 flex flex-col items-center justify-center overflow-hidden bg-plum/96 px-6 text-center backdrop-blur-md"
        >
          <Aurora tone="night" opacity={0.5} />

          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {confetti.map((c, i) => (
              <span
                key={i}
                className={`confetti ${c.color}`}
                style={{
                  left: `${c.left}%`,
                  fontSize: `${c.size}px`,
                  ["--dx" as string]: `${c.drift}px`,
                  ["--rot" as string]: `${c.rot}deg`,
                  ["--life" as string]: `${c.life}s`,
                  ["--d" as string]: `${c.delay}ms`,
                }}
              >
                {c.glyph}
              </span>
            ))}
          </div>

          <div className="animate-fade-up relative z-10 flex flex-col items-center">
            <span
              className="animate-heartbeat font-display text-[clamp(3rem,12vw,7rem)] leading-none text-rose"
              aria-hidden="true"
            >
              ❤
            </span>

            <p className="mt-10 max-w-2xl font-display text-[clamp(1.9rem,6vw,3.6rem)] leading-[1.15] font-light text-cream text-balance">
              {question.celebration.line}
            </p>

            <p className="mt-6 font-script text-[clamp(2.4rem,8vw,4.4rem)] leading-none text-blush">
              {question.celebration.sub}
            </p>

            <p className="mt-10 font-deva text-[clamp(1.2rem,4vw,1.9rem)] leading-none text-cream/60">
              {her.nameDevanagari}
            </p>

            <button
              type="button"
              onClick={() => setAnswer(null)}
              className="mt-12 rounded-full border border-cream/30 px-7 py-3 font-body text-[0.56rem] tracking-[0.34em] text-cream/80 uppercase transition-colors hover:border-cream/70 hover:text-cream"
            >
              keep reading
            </button>
          </div>
        </div>
      )}

      {/* ── She said no ──────────────────────────────────────────
          Answered with the same care as the other one. No guilt, no
          second ask, no confetti. ── */}
      {answer === "no" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={question.declined.line}
          className="animate-fade-in fixed inset-0 z-90 flex flex-col items-center justify-center overflow-hidden bg-ink/97 px-6 text-center backdrop-blur-md"
        >
          <div className="animate-fade-up relative z-10 flex max-w-xl flex-col items-center">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-rose/60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              aria-hidden="true"
            >
              <path
                d="M12 20.5S3.5 15.2 3.5 9.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8.5 2.1c0 5.8-8.5 11.1-8.5 11.1Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="mt-10 font-display text-[clamp(1.7rem,5vw,2.9rem)] leading-[1.2] font-light text-cream text-balance">
              {question.declined.line}
            </p>

            <p className="mt-5 font-display text-[clamp(1.2rem,3.4vw,1.8rem)] leading-snug font-light text-blush/85 italic text-balance">
              {question.declined.sub}
            </p>

            <p className="mt-9 font-body text-[0.92rem] leading-[1.9] text-cream/60">
              {question.declined.body}
            </p>

            <button
              type="button"
              onClick={() => setAnswer(null)}
              className="mt-12 rounded-full border border-cream/25 px-7 py-3 font-body text-[0.56rem] tracking-[0.34em] text-cream/70 uppercase transition-colors hover:border-cream/60 hover:text-cream"
            >
              {question.declined.back}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
