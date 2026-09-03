"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav, banner } from "@/content/site";

// Simple beaker outline for the Lab link.
function FlaskIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6.4 1.8v4.1L2.9 12a1.6 1.6 0 0 0 1.4 2.4h7.4a1.6 1.6 0 0 0 1.4-2.4L9.6 5.9V1.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.6 1.8h4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M4.7 9.6h6.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      {banner.show && (
        <a
          href={banner.href}
          className="group flex h-9 items-center justify-center gap-2 bg-ink px-4 text-paper"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            {banner.label}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-paper/25" />
          <span className="truncate text-[12.5px] text-paper/70">{banner.note}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      )}

      <div className="shell flex h-[68px] items-center justify-between">
        <Link href="/" aria-label="Saturn Studios — home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 text-[14px] text-ink-muted transition-colors hover:text-ink"
            >
              {item.icon === "flask" && <FlaskIcon className="h-[15px] w-[15px]" />}
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                open ? "top-[5px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                open ? "top-[5px] -rotate-45" : "top-[10px]"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="shell flex flex-col py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 border-b border-line py-4 font-display text-[22px] tracking-tightest last:border-0"
              >
                {item.icon === "flask" && <FlaskIcon className="h-[19px] w-[19px]" />}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
