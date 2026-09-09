"use client";

import { useEffect, useState } from "react";

const STOPS = [
  { id: "top", label: "her name" },
  { id: "statement", label: "chapter I" },
  { id: "story", label: "chapter II" },
  { id: "facts", label: "chapter III" },
  { id: "reasons", label: "chapter IV" },
  { id: "letter", label: "chapter V" },
  { id: "drafts", label: "the drafts" },
  { id: "open-when", label: "chapter VI" },
  { id: "promises", label: "chapter VII" },
  { id: "hold", label: "hold on" },
  { id: "the-question", label: "the question" },
  { id: "finale", label: "the end" },
];

/**
 * A hairline index down the left edge. The dot for whichever section
 * owns the middle of the screen stretches into a bar and names itself.
 * Hidden on small screens, where there simply isn't room.
 */
export default function ChapterRail() {
  const [active, setActive] = useState("top");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;

      // STOPS are in document order, so the active one is simply the
      // last section whose top has crossed the middle of the screen.
      let current = STOPS[0].id;
      for (const stop of STOPS) {
        const node = document.getElementById(stop.id);
        if (node && node.getBoundingClientRect().top <= middle) current = stop.id;
      }

      setActive(current);
      setShown(window.scrollY > window.innerHeight * 0.6);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Chapters"
      className={`fixed top-1/2 left-5 z-70 hidden -translate-y-1/2 flex-col gap-4 transition-opacity duration-700 lg:flex ${
        shown ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {STOPS.map((stop) => {
        const on = stop.id === active;
        return (
          <a
            key={stop.id}
            href={stop.id === "top" ? "#" : `#${stop.id}`}
            className="group flex items-center gap-3"
          >
            <span
              className={`block h-px origin-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                on ? "w-9 bg-rose" : "w-4 bg-muted/35 group-hover:w-7 group-hover:bg-rose/60"
              }`}
              aria-hidden="true"
            />
            <span
              className={`font-body text-[0.5rem] tracking-[0.32em] whitespace-nowrap uppercase transition-all duration-500 ${
                on
                  ? "translate-x-0 text-mulberry opacity-100"
                  : "-translate-x-1 text-muted/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {stop.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
