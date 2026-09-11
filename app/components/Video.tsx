"use client";

import { useEffect, useRef, useState } from "react";

import { her } from "../content";
import { useReducedMotion } from "../lib/hooks";

/**
 * A clip that behaves the way the photographs do.
 *
 * It runs only while it is on screen, it starts silent so nothing
 * ambushes her, and a file that isn't there yet degrades into the same
 * warm frame `Photo` uses rather than a black box with a broken
 * control bar in it. If she has asked the OS for less motion it waits,
 * poster showing, until she presses play herself.
 */
export default function Video({
  src,
  poster = "",
  label,
  captions = "",
  className = "",
  videoClassName = "",
  contain = false,
  loop = true,
  autoPlay = true,
  controls = true,
  compact = false,
}: {
  src: string;
  poster?: string;
  /** Described for screen readers — what is happening in the clip. */
  label: string;
  /** Optional .vtt track. */
  captions?: string;
  className?: string;
  videoClassName?: string;
  contain?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  /** The little play / sound pair in the corner. */
  controls?: boolean;
  /** Icon-only controls, for cards too narrow to carry a word. */
  compact?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // What the clip is *trying* to do. Once she touches a control her
  // choice wins and nothing here overrides it again.
  const [wantsPlay, setWantsPlay] = useState(autoPlay);
  const touched = useRef(false);

  useEffect(() => {
    if (!touched.current) setWantsPlay(autoPlay && !reduced);
  }, [autoPlay, reduced]);

  // Play only while visible: a clip running in a section three screens
  // above her is just a battery drain.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    let inView = false;

    const sync = () => {
      if (inView && wantsPlay) {
        if (!el.paused) return;
        el.play().catch((err: DOMException) => {
          // AbortError only means a pause overtook the play — it happens
          // whenever this effect re-runs mid-request, and it is harmless.
          // A refusal is the one worth reacting to: fall back to the
          // play button rather than pretending it is running.
          if (err?.name === "AbortError") return;
          touched.current = true;
          setWantsPlay(false);
        });
      } else if (!el.paused) {
        el.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    sync();

    return () => observer.disconnect();
  }, [wantsPlay]);

  // The clip starts fetching as the HTML is parsed, so it can settle
  // before React hydrates — and a media event that has already fired is
  // never replayed. Left waiting for it the clip stays at `opacity-0`,
  // poster and all, which reads as a dead black card. Ask the element
  // where it actually got to. Metadata is enough to fade in: that is the
  // point at which the poster is on screen.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.error) setFailed(true);
    else if (el.readyState >= 1) setReady(true);
  }, []);

  // `muted` is a property, not an attribute — React's initial value can
  // be lost on rehydration, so keep it in sync by hand.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const frame = (children: React.ReactNode, aria: string) => (
    <div
      className={`flex min-h-56 flex-col items-center justify-center gap-3 bg-linen px-6 py-16 text-center ${className}`}
      role="img"
      aria-label={aria}
    >
      {children}
    </div>
  );

  const mark = (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 text-rose/45"
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
  );

  // Nothing was ever asked for: a quiet frame, on purpose.
  if (!src) {
    return frame(
      <>
        {mark}
        <p className="font-deva text-2xl leading-none text-rose/45">{her.nameDevanagari}</p>
      </>,
      label,
    );
  }

  // A src that won't load is a mistake, so name the exact file to add.
  if (failed) {
    return frame(
      <>
        {mark}
        <p className="font-display text-lg text-mulberry italic">{label}</p>
        <p className="font-body text-[10px] tracking-[0.18em] text-muted/70 uppercase">
          add public{src}
        </p>
      </>,
      `Placeholder for ${label}`,
    );
  }

  const toggle = (fn: () => void) => () => {
    touched.current = true;
    fn();
  };

  return (
    <div className={`group/clip relative overflow-hidden bg-ink ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster || undefined}
        aria-label={label}
        loop={loop}
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={() => setReady(true)}
        onError={(e) => {
          // `error` on a failed <track> is retargeted to the media element
          // by React, and a missing caption file is no reason to throw the
          // clip away. Only the video's own error counts.
          if (e.currentTarget.error) setFailed(true);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`h-full w-full ${contain ? "object-contain" : "object-cover"} transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          ready ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md"
        } ${videoClassName}`}
      >
        {captions && (
          <track src={captions} kind="captions" srcLang="en" label="English" default />
        )}
        This browser won&rsquo;t play the clip.
      </video>

      {controls && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/70 to-transparent p-3 sm:p-4">
          <button
            type="button"
            onClick={toggle(() => setWantsPlay((p) => !p))}
            aria-label={playing ? `Pause ${label}` : `Play ${label}`}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 bg-ink/45 text-cream/85 opacity-70 backdrop-blur-md transition duration-500 hover:border-blush/60 hover:text-cream focus-visible:opacity-100 group-hover/clip:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              {playing ? (
                <path d="M8.5 5.5h2.6v13H8.5v-13Zm4.4 0h2.6v13h-2.6v-13Z" />
              ) : (
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              )}
            </svg>
          </button>

          <button
            type="button"
            onClick={toggle(() => setMuted((m) => !m))}
            aria-pressed={!muted}
            aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
            className={`pointer-events-auto flex items-center justify-center border border-cream/25 bg-ink/45 text-cream/85 opacity-70 backdrop-blur-md transition duration-500 hover:border-blush/60 hover:text-cream focus-visible:opacity-100 group-hover/clip:opacity-100 ${
              compact ? "h-9 w-9 rounded-full" : "gap-2 rounded-full px-3.5 py-2"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 9.5h3.2L11.5 6v12L7.2 14.5H4v-5Z" />
              {muted ? (
                <path d="m15.5 9.8 4 4.4m0-4.4-4 4.4" />
              ) : (
                <path d="M15.2 9.2a4 4 0 0 1 0 5.6M17.8 6.8a7.5 7.5 0 0 1 0 10.4" />
              )}
            </svg>
            {!compact && (
              <span className="font-body text-[0.5rem] tracking-[0.3em] uppercase">
                {muted ? "sound off" : "sound on"}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
