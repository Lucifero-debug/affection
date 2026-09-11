"use client";

import { useCallback, useState } from "react";

import { her } from "../content";

/**
 * A photograph that degrades gracefully, two different ways.
 *
 * A src that was given but won't load is a mistake, so the placeholder
 * names the exact filename to drop in. No src at all is a decision —
 * so that renders as a deliberate empty frame with nothing in it that
 * looks like an unfinished build.
 */
export default function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
  contain = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  contain?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // An eager image starts downloading while the HTML is still being
  // parsed, so it is usually decoded before React hydrates and attaches
  // `onLoad` — and a load event that has already fired is never replayed.
  // Waiting for it would leave the photograph at `opacity-0` for good, so
  // ask the element what happened instead of waiting to be told.
  const attach = useCallback((el: HTMLImageElement | null) => {
    if (!el || !el.complete) return;
    if (el.naturalWidth > 0) setLoaded(true);
    else setFailed(true);
  }, []);

  // Nothing was ever asked for: an empty frame, on purpose.
  if (!src) {
    return (
      <div
        className={`flex min-h-56 flex-col items-center justify-center gap-4 bg-linen px-6 py-16 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-rose/35"
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
        <p className="font-deva text-2xl leading-none text-rose/45">{her.nameDevanagari}</p>
      </div>
    );
  }

  if (failed) {
    return (
      <div
        className={`flex min-h-56 flex-col items-center justify-center gap-3 bg-linen px-6 py-16 text-center ${className}`}
        role="img"
        aria-label={`Placeholder for ${alt}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-rose/50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path
            d="M12 20.5S3.5 15.2 3.5 9.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8.5 2.1c0 5.8-8.5 11.1-8.5 11.1Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="font-display text-lg text-mulberry italic">{alt}</p>
        <p className="font-body text-[10px] tracking-[0.18em] text-muted/70 uppercase">
          add public{src || "/photos/…"}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-linen ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={attach}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full ${contain ? "object-contain" : "object-cover"} transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md"
        } ${imgClassName}`}
      />
    </div>
  );
}
