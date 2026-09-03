import Link from "next/link";
import { Mark } from "./Logo";
import { site, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink-deep text-paper">
      <div className="shell py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <span className="inline-flex items-center gap-2.5">
              <Mark className="h-[22px] w-[22px]" />
              <span className="font-display text-[15px] font-semibold uppercase tracking-[0.09em]">
                {site.name}
              </span>
            </span>
            <p className="mt-4 text-[14.5px] leading-relaxed text-paper/55">
              {site.tagline}. {site.location}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper/40">
                Site
              </h3>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[14.5px] text-paper/70 transition-colors hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper/40">
                Elsewhere
              </h3>
              <ul className="mt-4 space-y-2.5">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[14.5px] text-paper/70 transition-colors hover:text-paper"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-7 text-[13px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-paper">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
