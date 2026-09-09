"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** True when the user has asked the OS for less motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/** True on devices with a precise pointer — i.e. a real mouse. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return fine;
}

/**
 * Fires `onProgress(p)` on every animation frame while `ref` is near the
 * viewport, where p goes 0 → 1 as the element travels through it.
 *
 * Deliberately callback-based rather than state-based: scroll-linked motion
 * must not re-render React on every frame.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
  mode: "through" | "cover" | "fill" = "through",
) {
  const cb = useRef(onProgress);

  // Keep the callback fresh without restarting the frame loop.
  useEffect(() => {
    cb.current = onProgress;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let active = false;
    let last = -1;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;

      // "through": pinned sections — 0 when the top hits the top of the
      // viewport, 1 when the bottom reaches the bottom.
      // "cover": 0 as the element enters from below, 1 as it exits above.
      // "fill": a playhead sitting 58% down the viewport travels from the
      // top of the element to its bottom — the one you want for a line
      // that draws itself alongside a column of content.
      const p =
        mode === "through"
          ? (-rect.top) / Math.max(rect.height - vh, 1)
          : mode === "cover"
            ? (vh - rect.top) / Math.max(vh + rect.height, 1)
            : (vh * 0.58 - rect.top) / Math.max(rect.height, 1);

      const clamped = Math.min(Math.max(p, 0), 1);
      if (Math.abs(clamped - last) > 0.0002) {
        last = clamped;
        cb.current(clamped);
      }

      if (active) frame = requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          frame = requestAnimationFrame(measure);
        } else if (!entry.isIntersecting && active) {
          active = false;
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "100px 0px" },
    );

    observer.observe(node);
    measure();

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ref, mode]);
}

/**
 * Reveals once, the first time the element approaches the viewport.
 * Returns [ref, visible].
 */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = {},
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible];
}

/**
 * Smoothed pointer position in viewport pixels, delivered via callback
 * on every frame. Never re-renders.
 */
export function useSmoothPointer(
  onMove: (x: number, y: number, rawX: number, rawY: number) => void,
  stiffness = 0.16,
) {
  const cb = useRef(onMove);

  useEffect(() => {
    cb.current = onMove;
  });

  useEffect(() => {
    let raw = { x: -100, y: -100 };
    let smooth = { x: -100, y: -100 };
    let frame = 0;
    let started = false;

    const onPointer = (e: PointerEvent) => {
      raw = { x: e.clientX, y: e.clientY };
      if (!started) {
        started = true;
        smooth = { ...raw };
      }
    };

    const tick = () => {
      smooth.x += (raw.x - smooth.x) * stiffness;
      smooth.y += (raw.y - smooth.y) * stiffness;
      cb.current(smooth.x, smooth.y, raw.x, raw.y);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(frame);
    };
  }, [stiffness]);
}
