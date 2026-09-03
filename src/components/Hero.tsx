import Link from "next/link";
import { Reveal } from "./Reveal";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-[104px]">
      {/* Slow-orbiting ring, purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 h-[620px] w-[620px] animate-orbit opacity-[0.07]"
      >
        <svg viewBox="0 0 600 600" fill="none" className="h-full w-full">
          <ellipse cx="300" cy="300" rx="290" ry="96" stroke="#262a36" strokeWidth="1.5" />
          <ellipse
            cx="300"
            cy="300"
            rx="218"
            ry="72"
            stroke="#262a36"
            strokeWidth="1.5"
            transform="rotate(34 300 300)"
          />
          <circle cx="300" cy="300" r="140" stroke="#262a36" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="shell relative py-24 md:py-36">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 font-display text-[48px] font-semibold uppercase leading-[1.0] tracking-[-0.015em] sm:text-[70px] md:text-[96px]">
            {hero.title}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl font-display text-[21px] leading-[1.35] tracking-tight md:text-[27px]">
            {hero.lede}{" "}
            <span className="text-ink-soft">{hero.body}</span>
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-11 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primaryCta.href}
              className="rounded-full bg-ink px-7 py-3.5 text-[14.5px] font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-full border border-line px-7 py-3.5 text-[14.5px] font-medium text-ink transition-colors duration-200 hover:border-ink"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
