import { heartline } from "../content";
import Reveal from "./Reveal";

/* One beat, in relative commands, ending exactly where it started —
   so repeating it draws a continuous trace. 100 units wide, net zero
   vertically. */
const BEAT = "h16 l4 -6 l4 6 h10 l3 5 l4 -34 l4 46 l3 -17 h8 l5 -12 l5 12 h34";
const TRACE = `M0 50 ${Array.from({ length: 4 }, () => BEAT).join(" ")}`;

/**
 * A dark band with a pulse running through it. Two copies of the same
 * 400-unit trace sit side by side and the pair slides left by half its
 * width, so the loop never shows a seam.
 */
export default function Heartline() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/15 blur-[130px]" />
      </div>

      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="font-body text-[0.56rem] tracking-[0.42em] text-blush/60 uppercase">
          {heartline.small}
        </p>
      </Reveal>

      {/* The trace */}
      <div className="relative mt-12 mb-12 overflow-hidden" aria-hidden="true">
        <div className="ecg-track flex w-[200%]">
          {[0, 1].map((i) => (
            <svg
              key={i}
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
              className="h-24 w-1/2 shrink-0 text-blush sm:h-32"
              fill="none"
            >
              <path
                d={TRACE}
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                style={{ filter: "drop-shadow(0 0 5px rgb(232 180 184 / 0.65))" }}
              />
            </svg>
          ))}
        </div>

        {/* The needle it runs under */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-rose/40 to-transparent" />
      </div>

      <Reveal delay={140} className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-[clamp(1.8rem,5vw,3.2rem)] leading-[1.2] font-light text-cream text-balance">
          {heartline.line}{" "}
          <span className="text-blush italic">{heartline.lineItalic}</span>
        </h2>

        <svg
          viewBox="0 0 24 24"
          className="animate-heartbeat mx-auto mt-10 h-6 w-6 text-rose"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 20.8S3.2 15.3 3.2 9.3A4.6 4.6 0 0 1 12 7.1a4.6 4.6 0 0 1 8.8 2.2c0 6-8.8 11.5-8.8 11.5Z" />
        </svg>
      </Reveal>
    </section>
  );
}
