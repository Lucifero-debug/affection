"use client";

import { useEffect, useRef } from "react";
import { her } from "../content";

/**
 * A full-bleed ribbon of her name, tilted and scrolling forever. Scroll
 * speed feeds the ribbon: fast scrolling drags it faster and skews it,
 * and scrolling up reverses it. The track is duplicated so the loop is
 * seamless either way.
 */
export default function Marquee() {
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let velocity = 0;
    let frame = 0;

    const tick = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      // Ease toward the live delta so the ribbon glides rather than snaps.
      velocity += (delta - velocity) * 0.12;
      const speed = Math.min(Math.abs(velocity) / 34, 1);

      if (trackRef.current) {
        trackRef.current.style.setProperty("--marquee-dur", `${44 - speed * 34}s`);
        trackRef.current.style.setProperty(
          "--marquee-dir",
          velocity < -0.6 ? "reverse" : "normal",
        );
      }
      if (shellRef.current) {
        shellRef.current.style.transform = `rotate(-2.2deg) skewX(${
          Math.max(Math.min(velocity, 26), -26) * 0.22
        }deg)`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const run = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="flex items-center gap-8 pr-8">
      <span className="font-display text-[clamp(2rem,5.5vw,4rem)] leading-none font-light whitespace-nowrap text-cream">
        {her.shortName}
      </span>
      <span className="text-[clamp(0.7rem,1.4vw,1rem)] text-blush/80" aria-hidden="true">
        ✦
      </span>
      <span className="font-deva text-[clamp(1.7rem,4.6vw,3.3rem)] leading-none whitespace-nowrap text-blush/50">
        {her.nameDevanagari}
      </span>
      <span className="text-[clamp(0.7rem,1.4vw,1rem)] text-blush/80" aria-hidden="true">
        ❤
      </span>
    </span>
  ));

  return (
    <div
      ref={shellRef}
      className="relative -my-6 -rotate-[2.2deg] overflow-hidden bg-plum py-5 shadow-lift transition-transform duration-300 ease-out will-change-transform sm:py-7"
      aria-hidden="true"
    >
      {/* Rose light bleeding through the ribbon */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-plum via-rose/25 to-plum"
        aria-hidden="true"
      />

      <div ref={trackRef} className="animate-marquee relative flex w-max motion-reduce:animate-none">
        {run}
        {run}
      </div>
    </div>
  );
}
