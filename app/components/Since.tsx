"use client";

import { useEffect, useState } from "react";
import { since } from "../content";
import Aurora from "./Aurora";
import Odometer from "./Odometer";
import Reveal from "./Reveal";
import Sparkles from "./Sparkles";

const START = new Date(since.start).getTime();
const BPM = 72;

type Elapsed = { days: number; hours: number; minutes: number; seconds: number; beats: number };

const ZERO: Elapsed = { days: 0, hours: 0, minutes: 0, seconds: 0, beats: 0 };

function elapsed(): Elapsed {
  const ms = Math.max(Date.now() - START, 0);
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
    beats: Math.floor((total / 60) * BPM),
  };
}

/**
 * The interlude: a clock that has been running since the day it
 * started. Every column begins at zero and rolls up to the real
 * figure on mount — which is both a nice entrance and the reason the
 * server-rendered markup and the first client render agree.
 */
export default function Since() {
  const [now, setNow] = useState<Elapsed>(ZERO);

  useEffect(() => {
    const tick = () => setNow(elapsed());
    // A beat's pause, so the roll from zero is something you watch.
    const first = window.setTimeout(tick, 420);
    const id = window.setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const columns = [
    { value: String(now.days).padStart(4, "0"), label: since.units.days },
    { value: String(now.hours).padStart(2, "0"), label: since.units.hours },
    { value: String(now.minutes).padStart(2, "0"), label: since.units.minutes },
    { value: String(now.seconds).padStart(2, "0"), label: since.units.seconds },
  ];

  return (
    <section id="since" className="relative isolate overflow-hidden bg-ink px-6 py-28 text-center sm:py-36">
      <Aurora tone="night" opacity={0.55} className="-z-10" />
      <Sparkles count={34} color="bg-blush/80" className="-z-10" />

      <Reveal className="relative mx-auto max-w-4xl">
        <p className="font-body text-[0.58rem] tracking-[0.42em] text-blush/70 uppercase">
          {since.kicker}{" "}
          <span className="text-cream/60">
            {/* A fixed locale — the server and the browser must agree. */}
            {new Date(since.start).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </p>

        <h2 className="mt-8 font-display text-[clamp(1.8rem,5vw,3rem)] leading-none font-light text-cream italic">
          {since.line}
        </h2>

        {/* The clock */}
        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-6 gap-y-10 sm:gap-x-12">
          {columns.map((column) => (
            <div key={column.label} className="flex items-start gap-6 sm:gap-12">
              <div className="flex flex-col items-center">
                <Odometer
                  value={column.value}
                  className="font-display text-[clamp(2.8rem,10vw,5.6rem)] leading-none font-light text-cream"
                />
                <span className="mt-4 font-body text-[0.55rem] tracking-[0.36em] text-blush/60 uppercase">
                  {column.label}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Heartbeats */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <svg
            viewBox="0 0 24 24"
            className="animate-heartbeat h-6 w-6 text-rose"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 20.8S3.2 15.3 3.2 9.3A4.6 4.6 0 0 1 12 7.1a4.6 4.6 0 0 1 8.8 2.2c0 6-8.8 11.5-8.8 11.5Z" />
          </svg>

          <p className="font-body text-[0.62rem] tracking-[0.3em] text-cream/55 uppercase">
            <Odometer
              value={now.beats.toLocaleString("en-US")}
              className="font-display text-xl tracking-normal text-blush normal-case"
            />{" "}
            {since.heartbeats}
          </p>
        </div>

        <p className="mt-12 font-script text-[clamp(1.7rem,4.5vw,2.6rem)] leading-none text-blush/90">
          {since.footnote}
        </p>
      </Reveal>
    </section>
  );
}
