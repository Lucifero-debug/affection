"use client";

import { useEffect, useRef, useState } from "react";
import { music } from "../content";

const BARS = [0, 0.22, 0.44, 0.14];
const TARGET_VOLUME = 0.42;

/**
 * A quiet, opt-in player. Nothing autoplays — she taps it — and the
 * volume eases in rather than arriving at full. If the mp3 isn't there
 * the button removes itself silently.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), []);

  if (!music.enabled || !music.src || !available) return null;

  const fade = (audio: HTMLAudioElement, to: number, done?: () => void) => {
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
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      setPlaying(false);
      fade(audio, 0, () => audio.pause());
      return;
    }

    try {
      audio.volume = 0;
      await audio.play();
      setPlaying(true);
      fade(audio, TARGET_VOLUME);
    } catch {
      setAvailable(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onError={() => setAvailable(false)}
        onEnded={() => setPlaying(false)}
      />

      <button
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
