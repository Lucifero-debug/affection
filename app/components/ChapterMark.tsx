import Reveal from "./Reveal";

/** A numeral and a label with a rule between — the chapter heading. */
export default function ChapterMark({
  numeral,
  label,
  align = "left",
  tone = "warm",
}: {
  numeral: string;
  label: string;
  align?: "left" | "center";
  tone?: "warm" | "dark";
}) {
  const text = tone === "dark" ? "text-blush/80" : "text-mulberry/85";
  const rule = tone === "dark" ? "bg-blush/40" : "bg-rose/45";

  return (
    <Reveal
      className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
    >
      <span className={`font-display text-lg leading-none font-normal ${text}`}>
        {numeral}
      </span>
      <span className={`h-px w-10 ${rule}`} aria-hidden="true" />
      <span className={`font-body text-[0.6rem] tracking-[0.4em] uppercase ${text}`}>
        {label}
      </span>
    </Reveal>
  );
}
