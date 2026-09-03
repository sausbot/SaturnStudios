import { Reveal } from "./Reveal";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-paper-tint">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">{about.eyebrow}</span>
              <h2 className="mt-6 font-display text-[32px] font-semibold leading-[1.1] tracking-tightest md:text-[44px]">
                {about.title}
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={80}>
              <div className="space-y-6">
                {about.body.map((p, i) => (
                  <p key={i} className="text-[16.5px] leading-relaxed text-ink-muted">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:mt-24 md:grid-cols-4">
          {about.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 70}>
              <div className="h-full bg-paper px-6 py-9 md:px-8 md:py-11">
                <p className="font-display text-[38px] font-semibold leading-none tracking-tightest md:text-[52px]">
                  {m.value}
                  <span className="text-accent">{m.suffix}</span>
                </p>
                <p className="mt-3 text-[13.5px] leading-snug text-ink-soft">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
