import Link from "next/link";
import { Reveal } from "./Reveal";
import { contactCta, site } from "@/content/site";

export function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper">
      <div className="shell pb-24 md:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-ink px-8 py-16 text-paper md:px-16 md:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-40 -right-24 h-[420px] w-[420px] opacity-[0.09]"
            >
              <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
                <ellipse cx="200" cy="200" rx="192" ry="64" stroke="#fff" strokeWidth="1.5" />
                <ellipse
                  cx="200"
                  cy="200"
                  rx="192"
                  ry="64"
                  stroke="#fff"
                  strokeWidth="1.5"
                  transform="rotate(50 200 200)"
                />
                <circle cx="200" cy="200" r="96" fill="#fff" />
              </svg>
            </div>

            <div className="relative max-w-2xl">
              <span className="eyebrow text-paper/50">{contactCta.eyebrow}</span>
              <h2 className="mt-6 font-display text-[34px] font-semibold leading-[1.05] tracking-tightest md:text-[54px]">
                {contactCta.title}
              </h2>
              <p className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-paper/65">
                {contactCta.body}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href={contactCta.cta.href}
                  className="rounded-full bg-paper px-7 py-3.5 text-[14.5px] font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {contactCta.cta.label}
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-full border border-paper/25 px-7 py-3.5 text-[14.5px] font-medium text-paper transition-colors duration-200 hover:border-paper/70"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
