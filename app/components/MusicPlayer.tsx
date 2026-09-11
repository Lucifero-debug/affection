"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { music } from "../content";

const BARS = [0, 0.22, 0.44, 0.14];
const TARGET_VOLUME = 0.42;

/**
 * Gestures the browser's autoplay policy accepts as consent. Scrolling is
 * deliberately not one of them — no browser counts it — so listening for it
 * would only arm a handler that can never succeed.
 */
const GESTURES = ["pointerdown", "touchend", "keydown"] as const;

/**
 * The song lets itself in.
 *
 * Browsers refuse to play audible sound until a page has been given a
 * gesture, so this asks the moment it mounts and, when that is refused —
 * which is the ordinary answer on a first visit — waits and starts on her
 * first tap or keypress instead. Either way the volume eases in rather than
 * arriving at full, and the moment she uses the button herself her choice
 * outranks all of this. If the file isn't there the button removes itself.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fadeRef = useRef<number>(0);
  /** She has worked the button herself; stop trying to start it for her. */
  const decided = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), []);

  const fade = useCallback((audio: HTMLAudioElement, to: number, done?: () => void) => {
    cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / 700, 1);
      audio.volume = Math.min(Math.max(from + (to - from) * p, 0), 1);
      if (p < 1) fadeRef.current = requestAnimationFrame(tick);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(tick);
  }, []);

  /** Begin playing. False means the browser refused — not that it is broken. */
  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    if (!audio.paused) return true;

    try {
      audio.volume = 0;
      await audio.play(); // onPlay flips the button over
      fade(audio, TARGET_VOLUME);
      return true;
    } catch {
      // A refusal is a policy decision, not a missing file. Keep the button:
      // hiding it here would leave her no way to ever hear the song.
      return false;
    }
  }, [fade]);

  useEffect(() => {
    if (!music.enabled || !music.src || !music.autoplay) return;

    const ac = new AbortController();

    const onGesture = (event: Event) => {
      // A tap on the player itself is hers, and `toggle` already answers it.
      // Starting the song here as well would race her click, which would then
      // read the song as playing and turn it straight back off.
      const target = event.target;
      if (target instanceof Node && buttonRef.current?.contains(target)) return ac.abort();
      if (decided.current) return ac.abort();
      void start().then((ok) => ok && ac.abort());
    };

    void start().then((ok) => {
      if (ok || ac.signal.aborted || decided.current) return;
      GESTURES.forEach((event) =>
        window.addEventListener(event, onGesture, { passive: true, signal: ac.signal }),
      );
    });

    return () => ac.abort();
  }, [start]);

  if (!music.enabled || !music.src || !available) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    decided.current = true;

    if (playing) {
      setPlaying(false);
      fade(audio, 0, () => audio.pause());
      return;
    }

    await start();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="metadata"
        onError={() => setAvailable(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
        className="group animate-fade-up fixed right-5 bottom-5 z-70 flex items-center gap-0 rounded-full border border-rose/30 bg-cream/85 p-3.5 shadow-lift backdrop-blur-md transition-colors duration-500 hover:border-rose/60 hover:bg-cream sm:right-8 sm:bottom-8 sm:gap-3 sm:py-2.5 sm:pr-5 sm:pl-4"
        style={{ animationDelay: "3800ms" }}
      >
        <span className="flex h-4 w-4 items-end justify-center gap-[2.5px]" aria-hidden="true">
          {playing ? (
            BARS.map((delay, i) => (
              <span
                key={i}
                className="h-full w-[2.5px] origin-bottom rounded-full bg-mulberry"
                style={{ animation: `pulse-bar ${0.85 + i * 0.13}s ease-in-out ${delay}s infinite` }}
              />
            ))
          ) : (
            <svg viewBox="0 0 24 24" className="h-full w-full text-mulberry" fill="currentColor">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          )}
        </span>

        <span className="hidden font-body text-[0.6rem] tracking-[0.3em] text-mulberry uppercase sm:inline">
          {playing ? "playing" : music.title}
        </span>
      </button>
    </>
  );
}
