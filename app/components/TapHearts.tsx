"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../lib/hooks";

const GLYPHS = ["❤", "❤", "❤", "✦", "❀", "❤", "✧"];
const COLORS = [
  "var(--color-rose)",
  "var(--color-blush)",
  "var(--color-mulberry)",
  "var(--color-gold)",
];

/**
 * Every tap, anywhere on the page, throws a small handful of hearts.
 * Built out of raw DOM nodes that delete themselves when their
 * animation ends — React never re-renders for this.
 */
export default function TapHearts() {
  const layerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const layer = layerRef.current;
    if (!layer) return;

    let cooling = false;

    const burst = (x: number, y: number) => {
      const count = 9 + Math.floor(Math.random() * 5);

      for (let i = 0; i < count; i++) {
        const node = document.createElement("span");
        // Fan the hearts across a 200° arc pointing upward.
        const angle = (-Math.PI * 1.1) + (Math.PI * 1.2 * i) / (count - 1) + (Math.random() - 0.5) * 0.5;
        const reach = 55 + Math.random() * 130;

        node.className = "spark";
        node.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        node.style.fontSize = `${9 + Math.random() * 16}px`;
        node.style.setProperty("--dx", `${Math.cos(angle) * reach}px`);
        node.style.setProperty("--dy", `${Math.sin(angle) * reach - 30}px`);
        node.style.setProperty("--s", `${0.7 + Math.random() * 0.9}`);
        node.style.setProperty("--rot", `${(Math.random() - 0.5) * 260}deg`);
        node.style.setProperty("--life", `${900 + Math.random() * 700}ms`);

        node.addEventListener("animationend", () => node.remove(), { once: true });
        layer.appendChild(node);
      }
    };

    const onDown = (e: PointerEvent) => {
      // One burst per ~180ms, so a drag doesn't flood the page.
      if (cooling) return;
      cooling = true;
      window.setTimeout(() => (cooling = false), 180);
      burst(e.clientX, e.clientY);
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      layer.replaceChildren();
    };
  }, [reduced]);

  if (reduced) return null;

  return <div ref={layerRef} className="pointer-events-none fixed inset-0 z-95" aria-hidden="true" />;
}
