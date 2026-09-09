"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "../lib/hooks";

/**
 * Reveals its children once, the first time they approach the viewport.
 * `variant` picks which CSS reveal to run — a lift-and-fade, a line mask,
 * or a bottom-up curtain for photographs.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "reveal",
  as: Tag = "div",
  threshold,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "reveal" | "curtain" | "mask";
  as?: ElementType;
  threshold?: number;
}) {
  const [ref, visible] = useInView<HTMLElement>(
    threshold === undefined ? {} : { threshold },
  );

  const base = variant === "mask" ? "" : variant;

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className={`${base} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
