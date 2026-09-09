"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion, useSmoothPointer } from "../lib/hooks";

/**
 * A two-part cursor: a hard dot that tracks the pointer exactly, and a
 * soft blush ring that lags behind it and swells over anything
 * interactive. Mouse-only — touch devices never see it.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const active = !!fine && !reduced;

  useSmoothPointer((x, y, rawX, rawY) => {
    if (!active) return;
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${rawX}px, ${rawY}px, 0) translate(-50%, -50%)`;
    }
  });

  // Hide the native cursor, and swell the ring over interactive things.
  useEffect(() => {
    if (!active) return;

    document.body.dataset.cursor = "on";

    const INTERACTIVE = "a, button, [role='button'], input, label, summary";

    const setState = (state: string) => {
      ringRef.current?.setAttribute("data-state", state);
      dotRef.current?.setAttribute("data-state", state);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setState(target?.closest(INTERACTIVE) ? "active" : "idle");
    };

    const onDown = () => setState("down");
    const onUp = (e: PointerEvent) => onOver(e);
    const onLeave = () => setState("hidden");
    const onEnter = () => setState("idle");

    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      delete document.body.dataset.cursor;
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-100" aria-hidden="true">
      <div
        ref={ringRef}
        data-state="idle"
        className="absolute top-0 left-0 h-10 w-10 rounded-full border border-rose/60 bg-rose/5 backdrop-blur-[1px] transition-[width,height,background-color,border-color,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=active]:h-20 data-[state=active]:w-20 data-[state=active]:border-rose/80 data-[state=active]:bg-rose/12 data-[state=down]:h-8 data-[state=down]:w-8 data-[state=down]:bg-rose/25 data-[state=hidden]:opacity-0"
      />
      <div
        ref={dotRef}
        data-state="idle"
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-mulberry transition-[opacity,transform] duration-300 data-[state=active]:opacity-0 data-[state=hidden]:opacity-0"
      />
    </div>
  );
}
