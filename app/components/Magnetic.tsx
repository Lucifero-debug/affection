"use client";

import { useRef, type ReactNode } from "react";
import { useFinePointer, useReducedMotion } from "../lib/hooks";

/**
 * Pulls its child toward the pointer while the pointer is near, then
 * lets it spring back. Mouse only.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={enabled ? onMove : undefined}
      onPointerLeave={enabled ? reset : undefined}
      className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
