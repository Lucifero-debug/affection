"use client";

import { useRef } from "react";
import { her, heroPhoto, traits } from "../content";
import { useScrollProgress } from "../lib/hooks";
import Aurora from "./Aurora";
import Magnetic from "./Magnetic";
import Photo from "./Photo";
import PetalField from "./PetalField";
import Sparkles from "./Sparkles";
import SplitText from "./SplitText";
import TextCycle from "./TextCycle";

/** Hero animations wait for the overture curtain to finish. */
const AFTER_CURTAIN = 2900;

/** Seven hearts spaced evenly around the portrait, orbiting it. */
const ORBIT_SPIN = "38s";
const ORBIT = Array.from({ length: 7 }, (_, i) => {
  const angle = (i / 7) * Math.PI * 2;
  return {
    left: 50 + Math.cos(angle) * 50,
    top: 50 + Math.sin(angle) * 50,
    size: 9 + (i % 3) * 5,
  };
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  // Three depths moving at three speeds as you leave the hero.
  useScrollProgress(
    sectionRef,
    (p) => {
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(0, ${p * -90}px, 0) scale(${1 + p * 0.06})`;
      }
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(0, ${p * 150}px, 0)`;
      }
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(0, ${p * 60}px, 0)`;
        copyRef.current.style.opacity = `${Math.max(1 - p * 1.5, 0)}`;
      }
    },
    "through",
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20"
    >
      <Aurora tone="warm" opacity={0.42} className="-z-30" />
      <Sparkles count={30} className="-z-20" />

      {/* Light washes */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="animate-float-slow absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-blush/40 blur-[120px]" />
        <div
          className="animate-float-slow absolute top-1/4 -right-40 h-[34rem] w-[34rem] rounded-full bg-gold/25 blur-[130px]"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="animate-float-slow absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-rose/20 blur-[120px]"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      {/* Enormous ghost name, drifting the other way */}
      <div
        ref={ghostRef}
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="font-deva text-[24vw] leading-none whitespace-nowrap text-rose/[0.08] select-none">
          {her.nameDevanagari}
        </span>
      </div>

      <PetalField density={38} />

      <div ref={copyRef} className="relative flex flex-col items-center">
        {/* Kicker */}
        <p
          className="animate-fade-up flex items-center gap-3 font-body text-[0.66rem] tracking-[0.44em] text-mulberry/85 uppercase"
          style={{ animationDelay: `${AFTER_CURTAIN}ms` }}
        >
          <span aria-hidden="true">✦</span>
          {her.kicker}
          <span aria-hidden="true">✦</span>
        </p>

        {/* Her name, letter by letter */}
        <SplitText
          as="h1"
          text={her.name}
          delay={AFTER_CURTAIN + 180}
          stagger={62}
          className="mt-7 max-w-[16ch] text-center font-display text-[clamp(3.4rem,14vw,10rem)] leading-[0.9] font-light tracking-[-0.02em] text-ink text-balance"
        />

        <div
          className="animate-rule-grow mt-9 h-px w-44 bg-gradient-to-r from-transparent via-rose/70 to-transparent sm:w-72"
          style={{ animationDelay: `${AFTER_CURTAIN + 900}ms` }}
          aria-hidden="true"
        />

        <p
          className="animate-fade-up mt-8 max-w-xl text-center font-display text-[clamp(1.15rem,2.6vw,1.65rem)] leading-relaxed font-light text-muted italic text-balance"
          style={{ animationDelay: `${AFTER_CURTAIN + 1050}ms` }}
        >
          {her.tagline}
        </p>

        {/* One word at a time, and the last one is the point */}
        <p
          className="animate-fade-up mt-7 flex items-baseline gap-3 font-body text-[0.62rem] tracking-[0.36em] text-mulberry/70 uppercase"
          style={{ animationDelay: `${AFTER_CURTAIN + 1200}ms` }}
        >
          <span>she is</span>
          <TextCycle
            words={traits}
            startDelay={AFTER_CURTAIN + 1600}
            className="font-display text-[1.35rem] tracking-normal text-rose normal-case italic"
          />
        </p>
      </div>

      {/* Arched portrait */}
      <div
        ref={portraitRef}
        className="animate-fade-up group relative mt-14 w-full max-w-[17rem] will-change-transform sm:max-w-[20rem]"
        style={{ animationDelay: `${AFTER_CURTAIN + 1250}ms` }}
      >
        <div
          className="absolute -inset-3 rounded-t-full rounded-b-[1.75rem] border border-rose/30"
          aria-hidden="true"
        />

        {/* A slow ring of hearts going round her */}
        <div className="pointer-events-none absolute -inset-8 hidden sm:block" aria-hidden="true">
          <div className="orbit relative h-full w-full" style={{ ["--spin" as string]: ORBIT_SPIN }}>
            {ORBIT.map((heart, i) => (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${heart.left}%`, top: `${heart.top}%` }}
              >
                <span
                  className="orbit-counter block leading-none text-rose/45"
                  style={{ ["--spin" as string]: ORBIT_SPIN, fontSize: `${heart.size}px` }}
                >
                  ❤
                </span>
              </span>
            ))}
          </div>
        </div>
        <Photo
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          priority
          className="aspect-[3/4] rounded-t-full rounded-b-[1.75rem] shadow-deep"
          imgClassName="duration-[1.8s] group-hover:scale-[1.05]"
        />
      </div>

      {/* Scroll cue */}
      <Magnetic strength={0.4} className="mt-12">
      <a
        href="#statement"
        className="animate-fade-up flex flex-col items-center gap-2 text-muted/70 transition-colors hover:text-mulberry"
        style={{ animationDelay: `${AFTER_CURTAIN + 1450}ms` }}
      >
        <span className="font-body text-[0.58rem] tracking-[0.38em] uppercase">scroll</span>
        <svg
          viewBox="0 0 24 24"
          className="animate-nudge h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      </Magnetic>
    </section>
  );
}
