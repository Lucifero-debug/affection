"use client";

import { useRef, useState } from "react";
import { reasons } from "../content";
import ChapterMark from "./ChapterMark";
import Reveal from "./Reveal";

const VISIBLE = 4; // cards drawn behind the top one
const THROW = 90; // px of drag that counts as "send it away"

/**
 * Chapter IV. A deck of reasons. Drag the top card off in any
 * direction, tap it, or use the buttons — it spins away and the next
 * one rises. Wraps forever, because the list does too.
 */
export default function ReasonsDeck() {
  const items = reasons.items;
  const [top, setTop] = useState(0);
  const [flying, setFlying] = useState<-1 | 0 | 1>(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const origin = useRef({ x: 0, y: 0 });
  const flyTimer = useRef(0);

  const send = (direction: -1 | 1) => {
    if (flying) return;
    setDrag({ x: 0, y: 0, active: false });
    setFlying(direction);
    window.clearTimeout(flyTimer.current);
    flyTimer.current = window.setTimeout(() => {
      setTop((v) => (v + 1) % items.length);
      setFlying(0);
    }, 420);
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (flying) return;
    origin.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.active) return;
    setDrag({
      x: e.clientX - origin.current.x,
      y: e.clientY - origin.current.y,
      active: true,
    });
  };

  const onUp = () => {
    if (!drag.active) return;
    if (Math.abs(drag.x) > THROW || Math.abs(drag.y) > THROW) {
      send(drag.x < 0 ? -1 : 1);
    } else {
      setDrag({ x: 0, y: 0, active: false });
    }
  };

  return (
    <section id="reasons" className="relative overflow-hidden bg-paper px-6 py-14 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-float-slow absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-blush/35 blur-[120px]" />
        <div
          className="animate-float-slow absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-gold/25 blur-[120px]"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      <div className="mx-auto max-w-5xl">
        <ChapterMark numeral={reasons.chapter} label={reasons.label} align="center" />

        <Reveal delay={100} className="mx-auto mt-5 max-w-2xl text-center sm:mt-8">
          <h2 className="font-display text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.08] font-light text-ink text-balance">
            {reasons.heading}
            <span className="block text-mulberry italic">{reasons.headingItalic}</span>
          </h2>
        </Reveal>

        {/* ── The deck ───────────────────────────────────────── */}
        <Reveal delay={220} className="mt-9 flex flex-col items-center sm:mt-16">
          <div
            className="relative h-[19rem] w-full max-w-md [perspective:1400px] sm:h-[17rem]"
            role="group"
            aria-roledescription="card deck"
            aria-label={`Reason ${top + 1} of ${items.length}`}
          >
            {Array.from({ length: Math.min(VISIBLE, items.length) }, (_, k) => {
              const index = (top + k) % items.length;
              const isTop = k === 0;

              const held = isTop && drag.active;
              const thrown = isTop && flying !== 0;

              const transform = thrown
                ? `translate3d(${flying * 130}%, -18%, 0) rotate(${flying * 26}deg) scale(0.9)`
                : held
                  ? `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${drag.x * 0.045}deg)`
                  : `translate3d(0, ${k * 15}px, ${k * -40}px) scale(${1 - k * 0.045}) rotate(${
                      k % 2 === 0 ? k * 1.1 : k * -1.3
                    }deg)`;

              return (
                <div
                  key={`${index}-${k}`}
                  data-dragging={held}
                  onPointerDown={isTop ? onDown : undefined}
                  onPointerMove={isTop ? onMove : undefined}
                  onPointerUp={isTop ? onUp : undefined}
                  onPointerCancel={isTop ? onUp : undefined}
                  className={`deck-card absolute inset-0 flex flex-col justify-between rounded-[1.6rem] border border-rose/25 bg-cream p-8 sm:p-10 ${
                    isTop ? "cursor-grab shadow-deep" : "shadow-soft"
                  }`}
                  style={{
                    transform,
                    opacity: thrown ? 0 : 1,
                    zIndex: VISIBLE - k,
                  }}
                  aria-hidden={!isTop}
                >
                  <span className="font-body text-[0.56rem] tracking-[0.4em] text-mulberry/70 uppercase">
                    reason {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="font-display text-[clamp(1.35rem,3.4vw,1.95rem)] leading-[1.32] font-light text-ink text-balance">
                    {items[index]}
                  </p>

                  <span
                    className="self-end font-script text-[1.7rem] leading-none text-rose/70"
                    aria-hidden="true"
                  >
                    ❤
                  </span>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-4 sm:mt-10 sm:gap-6">
            <button
              type="button"
              onClick={() => send(-1)}
              className="rounded-full border border-rose/30 px-5 py-2 font-body text-[0.56rem] tracking-[0.34em] text-mulberry uppercase transition-colors hover:border-rose/70 hover:bg-rose/10"
            >
              another
            </button>

            <span className="flex items-center gap-1.5" aria-hidden="true">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === top ? "w-5 bg-rose" : "w-1.5 bg-rose/25"
                  }`}
                />
              ))}
            </span>
          </div>

          <p className="mt-4 font-body text-[0.56rem] tracking-[0.34em] text-muted/60 uppercase sm:mt-6">
            {reasons.hint}
          </p>
        </Reveal>

        {/* The whole list, for anyone not using a pointer */}
        <ul className="sr-only">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
