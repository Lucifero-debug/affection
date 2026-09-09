"use client";

import { finale, footer, her } from "../content";
import Constellation from "./Constellation";
import { useInView } from "../lib/hooks";

/** The closing frame: a night sky, her name, and no full stop. */
export default function Finale() {
  const [ref, visible] = useInView<HTMLElement>({ threshold: 0.25 });

  return (
    <footer
      id="finale"
      ref={ref}
      data-visible={visible}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-28 text-center"
    >
      <Constellation />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-[-20%] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-rose/15 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-body text-[0.58rem] tracking-[0.42em] text-blush/70 uppercase">
          <span className="line-mask">
            <span className="line-inner">{finale.small}</span>
          </span>
        </p>

        <h2 className="mt-10 max-w-4xl font-display text-[clamp(2.2rem,6.5vw,4.6rem)] leading-[1.12] font-light text-cream">
          <span className="line-mask">
            <span className="line-inner" style={{ "--d": "150ms" } as React.CSSProperties}>
              {finale.line}
            </span>
          </span>
          <span className="line-mask">
            <span
              className="line-inner text-blush italic"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              {finale.lineItalic}
            </span>
          </span>
        </h2>

        <div
          className="mt-14 h-px w-40 origin-center scale-x-0 bg-gradient-to-r from-transparent via-blush/70 to-transparent transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [[data-visible='true']_&]:scale-x-100"
          style={{ transitionDelay: "700ms" }}
          aria-hidden="true"
        />

        <p className="mt-12 font-script text-[clamp(2.6rem,8vw,5rem)] leading-none text-blush">
          {her.name}
        </p>

        {/* The way she signs herself, down to the envelope. */}
        <p className="mt-6 flex items-center gap-3 font-deva text-[clamp(1.5rem,4.5vw,2.4rem)] leading-none text-blush/80">
          {her.nameDevanagari}
          <span aria-hidden="true">💌</span>
        </p>

        <svg
          viewBox="0 0 24 24"
          className="mt-14 h-5 w-5 text-rose/70"
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

        <p className="mt-8 font-body text-[0.58rem] tracking-[0.38em] text-cream/35 uppercase">
          {footer.line}
        </p>

        <p className="mt-3 font-body text-[0.52rem] tracking-[0.34em] text-cream/20 uppercase">
          for {her.fullName}
        </p>
      </div>
    </footer>
  );
}
