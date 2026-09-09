/**
 * Three conic washes turning at three speeds behind a section. Pure
 * CSS, no canvas — it costs one composited layer and nothing else.
 */
const PALETTES = {
  warm: [
    "conic-gradient(from 0deg, rgba(232,180,184,0.75), rgba(201,154,107,0.45), rgba(192,132,151,0.65), rgba(253,248,243,0), rgba(232,180,184,0.75))",
    "conic-gradient(from 140deg, rgba(192,132,151,0.5), rgba(253,248,243,0), rgba(201,154,107,0.5), rgba(232,180,184,0.4), rgba(192,132,151,0.5))",
    "conic-gradient(from 260deg, rgba(201,154,107,0.35), rgba(232,180,184,0.55), rgba(253,248,243,0), rgba(154,95,112,0.3), rgba(201,154,107,0.35))",
  ],
  night: [
    "conic-gradient(from 20deg, rgba(154,95,112,0.65), rgba(46,32,34,0), rgba(192,132,151,0.55), rgba(107,60,78,0.5), rgba(154,95,112,0.65))",
    "conic-gradient(from 170deg, rgba(201,154,107,0.35), rgba(46,32,34,0), rgba(232,180,184,0.4), rgba(107,60,78,0.6), rgba(201,154,107,0.35))",
    "conic-gradient(from 300deg, rgba(232,180,184,0.3), rgba(107,60,78,0.55), rgba(46,32,34,0), rgba(192,132,151,0.45), rgba(232,180,184,0.3))",
  ],
} as const;

const SPINS = ["46s", "67s", "89s"];

export default function Aurora({
  tone = "warm",
  opacity = 0.5,
  className = "",
}: {
  tone?: keyof typeof PALETTES;
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {PALETTES[tone].map((image, i) => (
        <div
          key={i}
          className="aurora"
          style={{
            backgroundImage: image,
            ["--spin" as string]: SPINS[i],
            animationDirection: i === 1 ? "reverse" : "normal",
            animationDelay: `${i * -13}s`,
            opacity: 0.65 - i * 0.13,
          }}
        />
      ))}
    </div>
  );
}
