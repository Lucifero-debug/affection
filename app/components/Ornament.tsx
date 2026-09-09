import Reveal from "./Reveal";

/**
 * A small flourish that draws itself, left and right, the first time it
 * comes into view. Used to breathe between chapters.
 */
export default function Ornament({
  tone = "warm",
  className = "",
}: {
  tone?: "warm" | "dark";
  className?: string;
}) {
  const stroke = tone === "dark" ? "rgb(232 180 184 / 0.7)" : "rgb(192 132 151 / 0.7)";
  const fill = tone === "dark" ? "rgb(232 180 184 / 0.9)" : "rgb(192 132 151 / 0.9)";

  return (
    <Reveal variant="mask" className={`flex justify-center ${className}`}>
      <svg
        viewBox="0 0 320 44"
        className="h-9 w-[min(20rem,72vw)]"
        fill="none"
        aria-hidden="true"
      >
        {/* Two mirrored vines */}
        <path
          className="draw-path"
          style={{ ["--len" as string]: 200 }}
          d="M6 22C46 22 74 8 104 14c22 4 26 16 40 16"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          className="draw-path"
          style={{ ["--len" as string]: 200, ["--d" as string]: "120ms" }}
          d="M314 22c-40 0-68-14-98-8-22 4-26 16-40 16"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Leaves */}
        <path
          className="draw-path"
          style={{ ["--len" as string]: 70, ["--d" as string]: "420ms" }}
          d="M104 14c-10-9-24-8-28-2 4 8 20 10 28 2Z"
          stroke={stroke}
          strokeWidth="0.9"
        />
        <path
          className="draw-path"
          style={{ ["--len" as string]: 70, ["--d" as string]: "520ms" }}
          d="M216 6c10-9 24-8 28-2-4 8-20 10-28 2Z"
          stroke={stroke}
          strokeWidth="0.9"
        />

        {/* The heart in the middle */}
        <path
          className="draw-path"
          style={{ ["--len" as string]: 60, ["--d" as string]: "760ms" }}
          d="M160 31c-6.4-4.6-10.5-8-10.5-12.2a4.9 4.9 0 0 1 10.5-2.6 4.9 4.9 0 0 1 10.5 2.6c0 4.2-4.1 7.6-10.5 12.2Z"
          stroke={fill}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    </Reveal>
  );
}
