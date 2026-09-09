/**
 * Splits a string into per-character spans so each letter can fly in
 * on its own delay. Words never break across lines, and the whole
 * string stays readable to screen readers as one label.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 55,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const words = text.split(" ");
  let index = 0;

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} className="inline-block whitespace-nowrap" aria-hidden="true">
          {[...word].map((char, c) => (
            <span
              key={`${char}-${c}`}
              className="char"
              style={{ "--d": `${delay + index++ * stagger}ms` } as React.CSSProperties}
            >
              {char}
            </span>
          ))}
          {w < words.length - 1 && <span className="char inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
