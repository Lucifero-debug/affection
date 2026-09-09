import { drafts } from "../content";
import Reveal from "./Reveal";
import Sparkles from "./Sparkles";

/**
 * The messages that got typed and not sent. Shows the weight of the
 * three weeks by putting the evidence on the page rather than
 * describing it — the small ordinary ones land hardest, and none of
 * them ask her for anything.
 *
 * The thread ends on a typing indicator that never resolves.
 */
export default function Drafts() {
  return (
    <section id="drafts" className="relative overflow-hidden bg-ink px-6 py-24 sm:py-32">
      <Sparkles count={22} color="bg-blush/60" className="-z-10" />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 h-[30rem] w-[38rem] -translate-x-1/2 rounded-full bg-rose/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <Reveal className="text-center">
          <p className="font-body text-[0.56rem] tracking-[0.4em] text-blush/60 uppercase">
            {drafts.kicker}
          </p>
          <h2 className="mt-8 font-display text-[clamp(2rem,5.5vw,3.4rem)] leading-[1.1] font-light text-cream text-balance">
            {drafts.heading}
            <span className="block text-blush italic">{drafts.headingItalic}</span>
          </h2>
        </Reveal>

        {/* The thread */}
        <ol className="mt-16 space-y-5">
          {drafts.messages.map((message, i) => (
            <Reveal as="li" key={message.text} delay={(i % 3) * 90} className="flex flex-col items-end">
              <div className="max-w-[85%] rounded-[1.35rem] rounded-br-md border border-rose/25 bg-rose/12 px-5 py-3.5 text-left backdrop-blur-sm sm:max-w-[75%]">
                <p className="font-body text-[0.95rem] leading-[1.6] text-cream/90">
                  {message.text}
                </p>
              </div>
              <span className="mt-2 mr-1 font-body text-[0.52rem] tracking-[0.3em] text-cream/30 uppercase">
                {message.when} &nbsp;·&nbsp; not sent
              </span>
            </Reveal>
          ))}

          {/* Still typing, three weeks later */}
          <Reveal as="li" delay={160} className="flex justify-end pt-2">
            <div
              className="flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 px-5 py-3.5"
              aria-label="still typing"
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="typing-dot block h-1.5 w-1.5 rounded-full bg-blush"
                  style={{ ["--d" as string]: `${d * 180}ms` }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </Reveal>
        </ol>

        <Reveal delay={120} className="mt-16 text-center">
          <div
            className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-blush/50 to-transparent"
            aria-hidden="true"
          />
          <p className="mt-10 font-display text-[clamp(1.3rem,3.4vw,2rem)] leading-[1.5] font-light text-blush/85 italic text-balance">
            {drafts.footer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
