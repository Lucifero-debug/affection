"use client";

import { useState } from "react";
import { letter } from "../content";
import ChapterMark from "./ChapterMark";
import Reveal from "./Reveal";

/**
 * Chapter IV. A sealed envelope. Breaking the wax swings the flap back
 * and the letter unfolds out of it.
 */
export default function Letter() {
  const [open, setOpen] = useState(false);

  return (
    <section id="letter" className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-float-slow absolute top-16 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blush/30 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-2xl">
        <ChapterMark numeral={letter.chapter} label={letter.label} align="center" />

        {/* ── The envelope ─────────────────────────────────── */}
        <div className="envelope-scene relative mt-12" data-open={open}>
          {/* Flap */}
          <div
            className="envelope-flap absolute inset-x-0 top-0 z-30 h-24 bg-linen sm:h-32"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            aria-hidden="true"
          >
            <span className="absolute inset-0 bg-gradient-to-b from-rose/10 to-transparent" />
          </div>

          {/* Body */}
          <div className="relative z-10 overflow-hidden rounded-[1.25rem] border border-rose/25 bg-paper shadow-deep">
            {/* The paper that shows above the fold */}
            <div className="h-24 bg-linen/60 sm:h-32" aria-hidden="true" />

            {/* The letter itself */}
            <div
              className={`grid transition-[grid-template-rows] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-7 pt-4 pb-14 transition-opacity duration-700 sm:px-14 sm:pb-16 ${
                    open ? "opacity-100 delay-500" : "opacity-0"
                  }`}
                >
                  <div
                    className="mx-auto mb-10 h-px w-full bg-gradient-to-r from-transparent via-rose/25 to-transparent"
                    aria-hidden="true"
                  />

                  {letter.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className={`font-display text-[1.24rem] leading-[1.9] font-light text-ink ${
                        i === 0
                          ? "first-letter:float-left first-letter:mt-2 first-letter:mr-3 first-letter:font-display first-letter:text-[4.4rem] first-letter:leading-[0.75] first-letter:font-light first-letter:text-rose"
                          : "mt-7"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}

                  <div
                    className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-rose/50 to-transparent"
                    aria-hidden="true"
                  />

                  <p className="mt-8 text-right font-script text-[2.5rem] leading-none text-mulberry">
                    {letter.signature}
                  </p>
                </div>
              </div>
            </div>

            {/* Closed-state prompt, tucked under the flap */}
            <div
              className={`flex items-center justify-center transition-opacity duration-500 ${
                open ? "pointer-events-none h-0 overflow-hidden opacity-0" : "pt-14 pb-12 opacity-100 sm:pt-20"
              }`}
            >
              <span className="font-body text-[0.58rem] tracking-[0.4em] text-muted/70 uppercase">
                {letter.prompt}
              </span>
            </div>
          </div>

          {/* Wax seal */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fold the letter away" : "Break the seal and read the letter"}
            className={`absolute left-1/2 z-40 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border border-rose/40 bg-rose text-cream shadow-lift transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-mulberry sm:h-20 sm:w-20 ${
              open
                ? "top-2 scale-75 opacity-0"
                : "top-[5.2rem] animate-seal sm:top-[7.2rem]"
            }`}
          >
            <span className="font-display text-2xl leading-none font-normal sm:text-3xl">
              {letter.sealInitial}
            </span>
          </button>
        </div>

        {/* Re-fold */}
        <Reveal className={`mt-10 text-center ${open ? "" : "invisible"}`}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-body text-[0.58rem] tracking-[0.4em] text-muted/70 uppercase transition-colors hover:text-mulberry"
          >
            fold it back
          </button>
        </Reveal>
      </div>
    </section>
  );
}
