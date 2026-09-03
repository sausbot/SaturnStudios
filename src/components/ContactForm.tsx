"use client";

import { useState, type FormEvent } from "react";
import { site, contactPage } from "@/content/site";

const field =
  "w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-[15.5px] outline-none transition-colors placeholder:text-ink-soft/70 focus:border-ink";
const label = "block text-[13px] font-medium text-ink-muted";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  /**
   * No backend yet: this composes a mailto: so the form is usable on day one.
   * Swap for a POST to /api/contact (or Formspree / Resend) when you have one.
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "—"}`,
      `Email: ${data.get("email")}`,
      `Budget: ${data.get("budget")}`,
      `Timeline: ${data.get("timeline")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `New project enquiry — ${data.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-paper-tint p-6 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={label} htmlFor="name">
            Your name *
          </label>
          <input id="name" name="name" required className={field} placeholder="Your name" />
        </div>

        <div className="space-y-2">
          <label className={label} htmlFor="company">
            Company
          </label>
          <input id="company" name="company" className={field} placeholder="Optional" />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className={label} htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={field}
            placeholder="you@company.com"
          />
        </div>

        <div className="space-y-2">
          <label className={label} htmlFor="budget">
            Budget
          </label>
          <select id="budget" name="budget" className={field} defaultValue={contactPage.budgets[5]}>
            {contactPage.budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className={label} htmlFor="timeline">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            className={field}
            defaultValue={contactPage.timelines[2]}
          >
            {contactPage.timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className={label} htmlFor="message">
            What are you building? *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={`${field} resize-y`}
            placeholder="A sentence or two is plenty to start."
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 w-full rounded-full bg-ink px-7 py-4 text-[14.5px] font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
      >
        Send enquiry
      </button>

      {sent && (
        <p role="status" className="mt-4 text-[14px] text-ink-muted">
          Your email client should have opened. If it didn&rsquo;t, write to us at{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
