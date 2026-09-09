import { promises } from "../content";
import ChapterMark from "./ChapterMark";
import Ornament from "./Ornament";
import Reveal from "./Reveal";

/**
 * Chapter VII. Eight things I intend to keep. Each one draws its own
 * tick as it arrives, and a rule fills in underneath it.
 */
export default function Promises() {
  return (
    <section id="promises" className="relative overflow-hidden bg-paper px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <ChapterMark numeral={promises.chapter} label={promises.label} align="center" />

        <Reveal delay={100} className="mx-auto mt-8 max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.08] font-light text-ink text-balance">
            {promises.heading}
            <span className="block text-mulberry italic">{promises.headingItalic}</span>
          </h2>
          <p className="mt-6 font-body text-[0.92rem] leading-relaxed text-muted">
            {promises.sub}
          </p>
        </Reveal>

        <ol className="mt-16">
          {promises.items.map((promise, i) => (
            <Reveal as="li" key={promise} className="group relative block py-7">
              <div className="flex items-start gap-5 sm:gap-8">
                {/* The tick, drawn */}
                <svg
                  viewBox="0 0 32 32"
                  className="mt-1 h-6 w-6 shrink-0 text-rose sm:h-7 sm:w-7"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="draw-path"
                    style={{ ["--len" as string]: 88, ["--d" as string]: "120ms" }}
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                  />
                  <path
                    className="draw-path"
                    style={{ ["--len" as string]: 24, ["--d" as string]: "520ms" }}
                    d="m10 16.5 4 4 8-9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="font-display text-[clamp(1.25rem,3vw,1.9rem)] leading-[1.4] font-light text-ink transition-colors duration-500 group-hover:text-plum">
                  <span
                    className="mr-3 font-body text-[0.56rem] tracking-[0.34em] text-mulberry/60 align-[0.35em] uppercase tabular-nums"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {promise}
                </p>
              </div>

              {/* Rule that fills in under each one */}
              <span
                className="vow-rule absolute inset-x-0 bottom-0 block h-px bg-gradient-to-r from-rose/45 via-rose/20 to-transparent"
                style={{ ["--d" as string]: "260ms" }}
                aria-hidden="true"
              />
            </Reveal>
          ))}
        </ol>

        <Ornament className="mt-16" />

        <Reveal delay={160} className="mt-12 text-center">
          <p className="font-script text-[clamp(2rem,5.5vw,3.2rem)] leading-none text-mulberry">
            signed, and meant
          </p>
        </Reveal>
      </div>
    </section>
  );
}
