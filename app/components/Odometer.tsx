"use client";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Mechanical digits. Each column holds 0–9 and slides to the one it
 * should be showing, so a changing number rolls rather than swaps.
 */
export default function Odometer({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex tabular-nums ${className}`} aria-label={value}>
      {[...value].map((char, i) => {
        const digit = DIGITS.indexOf(char);

        if (digit < 0) {
          return (
            <span key={i} aria-hidden="true">
              {char}
            </span>
          );
        }

        return (
          <span key={i} className="odometer" aria-hidden="true">
            <span
              className="odometer-track"
              style={{ transform: `translateY(-${digit}em)` }}
            >
              {DIGITS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
