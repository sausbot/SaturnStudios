import { Reveal } from "./Reveal";
import { services } from "@/content/site";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-paper">
      <div className="shell py-24 md:py-32">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{services.eyebrow}</span>
            <h2 className="mt-6 font-display text-[32px] font-semibold leading-[1.1] tracking-tightest md:text-[44px]">
              {services.title}
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-ink-muted">{services.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20">
          {services.items.map((item, i) => (
            <Reveal key={item.no} delay={i * 60}>
              <article className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-12">
                <div className="md:col-span-2">
                  <span className="font-display text-[14px] font-medium tracking-[0.1em] text-ink-soft">
                    {item.no}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="font-display text-[24px] font-semibold leading-tight tracking-tightest md:text-[30px]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>

                <div className="md:col-span-4 md:col-start-9">
                  <ul className="space-y-2.5">
                    {item.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-baseline gap-3 text-[14.5px] text-ink-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 shrink-0 translate-y-[-3px] rounded-full bg-accent"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
