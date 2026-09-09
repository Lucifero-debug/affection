"use client";

import { useRef, type ReactNode } from "react";
import { useFinePointer, useReducedMotion } from "../lib/hooks";

/**
 * Tips its children toward the pointer in 3D. Mouse only, and skipped
 * entirely when the user prefers reduced motion.
 */
export default function Tilt({
  children,
  className = "",
  max = 7,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(1100px) rotateX(${-py * max * 2}deg) rotateY(${
      px * max * 2
    }deg) scale(${scale})`;
  };

  return (
    <div
      ref={ref}
      onPointerMove={enabled ? onMove : undefined}
      onPointerLeave={enabled ? reset : undefined}
      className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
