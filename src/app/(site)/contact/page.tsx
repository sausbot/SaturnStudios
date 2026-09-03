import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site, contactPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Saturn Studios about your project.",
};

export default function ContactPage() {
  return (
    <section className="bg-paper pt-[104px]">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">{contactPage.eyebrow}</span>
              <h1 className="mt-6 font-display text-[38px] font-semibold leading-[1.06] tracking-tightest md:text-[52px]">
                {contactPage.title}
              </h1>
              <p className="mt-7 max-w-md text-[16.5px] leading-relaxed text-ink-muted">
                {contactPage.body}
              </p>

              <dl className="mt-12 space-y-7 border-t border-line pt-10">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[16px] underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                    Where we are
                  </dt>
                  <dd className="mt-2 text-[16px]">{site.location}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                    Elsewhere
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {site.socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[16px] text-ink-muted transition-colors hover:text-ink"
                      >
                        {s.label}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={80}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
