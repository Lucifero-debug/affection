"use client";

import { useEffect, useRef, useState } from "react";
import { facts, her } from "../content";
import ChapterMark from "./ChapterMark";
import Reveal from "./Reveal";

/**
 * Chapter II. A sticky title column on the left keeps count while the
 * facts pass on the right; the big numeral swaps to whichever one you
 * are currently reading.
 */
export default function Facts() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Whichever fact is nearest the middle of the screen wins.
        const middle = window.innerHeight / 2;
        let best = { index: -1, distance: Infinity };

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLLIElement);
          const rect = entry.boundingClientRect;
          const distance = Math.abs(rect.top + rect.height / 2 - middle);
          if (distance < best.distance) best = { index, distance };
        }

        if (best.index >= 0) setActive(best.index);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="facts" className="relative bg-paper px-6 py-14 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20 sm:gap-14">
        {/* Sticky title column */}
        <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
          <ChapterMark numeral={facts.chapter} label={facts.label} />

          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] font-light text-ink sm:mt-8">
              Things I know
              <span className="block text-mulberry italic">about {her.name}</span>
            </h2>
            <p className="mt-4 max-w-xs font-body text-[0.9rem] leading-relaxed text-muted sm:mt-6">
              Collected slowly, and on purpose.
            </p>
          </Reveal>

          {/* Counter */}
          <div className="mt-7 hidden items-baseline gap-3 lg:flex sm:mt-12" aria-hidden="true">
            <span className="relative block h-24 w-24 overflow-hidden">
              <span
                className="absolute inset-0 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateY(${active * -6}rem)` }}
              >
                {facts.items.map((fact, i) => (
                  <span
                    key={fact.title}
                    className={`flex h-24 shrink-0 items-center font-display text-[5rem] leading-none font-light transition-colors duration-500 ${
                      i === active ? "text-rose" : "text-rose/25"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </span>
            </span>
            <span className="font-body text-[0.6rem] tracking-[0.34em] text-muted/70 uppercase">
              / {String(facts.items.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* The facts */}
        <ul className="space-y-px">
          {facts.items.map((fact, i) => (
            <li
              key={fact.title}
              ref={(node) => {
                itemRefs.current[i] = node;
              }}
              data-active={i === active}
              className="group relative border-t border-rose/20 py-7 transition-colors duration-500 last:border-b sm:py-16"
            >
              {/* Rule that fills in on the active fact */}
              <span
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-rose transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[active=true]:scale-x-100"
                aria-hidden="true"
              />

              <Reveal>
                <span className="font-body text-[0.58rem] tracking-[0.38em] text-mulberry/70 uppercase">
                  {String(i + 1).padStart(2, "0")} &nbsp;·&nbsp; {fact.label}
                </span>

                <h3 className="mt-3.5 max-w-[20ch] font-display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.15] font-light text-ink transition-colors duration-500 group-data-[active=true]:text-plum sm:mt-5">
                  {fact.title}
                </h3>

                <p className="mt-3.5 max-w-xl font-body text-[0.95rem] leading-[1.85] text-muted transition-opacity duration-500 group-data-[active=false]:opacity-70 sm:mt-5">
                  {fact.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
