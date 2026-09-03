import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { StickerBoard } from "@/components/StickerBoard";
import { site, experimental } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Lab`,
  description: "Saturn Studios — experimental art, coming soon.",
};

export default function ExperimentalPage() {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#f1efe9] text-ink">
      <header className="relative z-30 flex items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="inline-flex items-center gap-2.5 text-black">
          <Mark className="h-[19px] w-[19px]" weight={2} />
          <span className="font-display text-[14px] font-semibold uppercase tracking-[0.09em]">
            {site.name}
          </span>
        </Link>

        <a
          href={`mailto:${site.email}`}
          className="text-[13px] text-ink-muted underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          {site.email}
        </a>
      </header>

      {/* The type band. Stickers sit above it at z-20. */}
      <div className="relative z-10 flex flex-1 items-center">
        <Marquee text={experimental.marquee} />
      </div>

      <footer className="relative z-30 flex items-end justify-between px-6 py-6 md:px-10">
        <Link
          href="/"
          className="text-[13.5px] font-medium text-accent underline decoration-accent/40 underline-offset-[5px] transition-colors hover:decoration-accent"
        >
          See what the studio does
        </Link>
        <span className="text-[12px] uppercase tracking-[0.16em] text-ink-soft">
          ({experimental.hint})
        </span>
      </footer>

      <StickerBoard />
    </div>
  );
}
