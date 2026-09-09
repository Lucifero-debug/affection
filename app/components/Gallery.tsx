"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "../content";
import ChapterMark from "./ChapterMark";
import Photo from "./Photo";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

const photos = gallery.photos;

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const touchStart = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [],
  );

  // Keyboard control, scroll lock, focus handling
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };

    document.body.dataset.locked = "true";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.dataset.locked = "false";
      window.removeEventListener("keydown", onKey);
      lastTrigger.current?.focus();
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <section id="gallery" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterMark numeral={gallery.chapter} label={gallery.label} align="center" />

        <Reveal delay={120} className="mx-auto mt-8 max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2.2rem,6vw,3.8rem)] leading-tight font-light text-ink">
            {gallery.heading}
            <span className="block text-mulberry italic">{gallery.headingItalic}</span>
          </h2>
          <p className="mt-6 font-body text-[0.92rem] leading-relaxed text-muted">
            {gallery.sub}
          </p>
        </Reveal>

        {/* Masonry */}
        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src + i}
              delay={(i % 3) * 120}
              className="break-inside-avoid"
            >
              <Tilt className="rounded-2xl">
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setOpenIndex(i);
                  }}
                  className="group relative block w-full overflow-hidden rounded-2xl shadow-soft transition-shadow duration-500 hover:shadow-lift"
                  aria-label={`Open photo: ${photo.alt}`}
                >
                  <Photo
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full"
                    imgClassName="duration-[1.4s] group-hover:scale-[1.05]"
                  />

                  {photo.caption && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-ink/75 via-ink/25 to-transparent p-5 pt-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="text-left font-display text-lg leading-snug font-light text-cream italic">
                        {photo.caption}
                      </span>
                    </span>
                  )}

                  {/* Corner ticks */}
                  <span
                    className="pointer-events-none absolute inset-3 rounded-xl border border-cream/0 transition-colors duration-500 group-hover:border-cream/25"
                    aria-hidden="true"
                  />
                </button>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption ?? active.alt}
          className="animate-fade-in fixed inset-0 z-90 flex flex-col items-center justify-center bg-ink/94 px-4 py-16 backdrop-blur-md"
          onClick={close}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(dx) > 55) step(dx < 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 rounded-full border border-cream/25 p-2.5 text-cream/80 transition hover:border-cream/60 hover:text-cream"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          {photos.length > 1 &&
            (
              [
                { dir: -1, label: "Previous photo", side: "left-3 sm:left-7", d: "m15 6-6 6 6 6" },
                { dir: 1, label: "Next photo", side: "right-3 sm:right-7", d: "m9 6 6 6-6 6" },
              ] as const
            ).map((btn) => (
              <button
                key={btn.label}
                type="button"
                aria-label={btn.label}
                onClick={(e) => {
                  e.stopPropagation();
                  step(btn.dir);
                }}
                className={`absolute ${btn.side} top-1/2 -translate-y-1/2 rounded-full border border-cream/20 p-3 text-cream/75 transition hover:border-cream/55 hover:text-cream`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d={btn.d} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}

          <figure
            key={active.src}
            className="animate-fade-up flex max-h-full min-h-0 w-full max-w-4xl flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <Photo
              src={active.src}
              alt={active.alt}
              priority
              contain
              className="max-h-[72svh] w-auto rounded-xl bg-transparent shadow-deep"
              imgClassName="max-h-[72svh] w-auto"
            />

            {active.caption && (
              <figcaption className="text-center font-display text-xl leading-snug font-light text-cream/90 italic">
                {active.caption}
              </figcaption>
            )}

            <span className="font-body text-[0.6rem] tracking-[0.34em] text-cream/40 uppercase tabular-nums">
              {(openIndex ?? 0) + 1} / {photos.length}
            </span>
          </figure>
        </div>
      )}
    </section>
  );
}
