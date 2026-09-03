import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ProjectVisual } from "@/components/WorkCard";
import { ContactCta } from "@/components/ContactCta";
import { projects } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.client, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <article className="bg-paper pt-[104px]">
        <div className="shell py-16 md:py-24">
          <Reveal>
            <Link
              href="/work"
              className="text-[14px] text-ink-soft transition-colors hover:text-ink"
            >
              ← All work
            </Link>

            <p className="eyebrow mt-8">{project.category}</p>
            <h1 className="mt-5 max-w-4xl font-display text-[36px] font-semibold leading-[1.06] tracking-tightest md:text-[60px]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <ProjectVisual hue={project.hue} className="mt-12 aspect-[16/9] w-full rounded-2xl" />
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
            <aside className="md:col-span-4">
              <Reveal>
                <dl className="space-y-7">
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                      Client
                    </dt>
                    <dd className="mt-2 text-[15.5px]">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                      Year
                    </dt>
                    <dd className="mt-2 text-[15.5px]">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                      Duration
                    </dt>
                    <dd className="mt-2 text-[15.5px]">{project.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                      Services
                    </dt>
                    <dd className="mt-2 space-y-1.5">
                      {project.services.map((s) => (
                        <p key={s} className="text-[15.5px]">
                          {s}
                        </p>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </aside>

            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={80}>
                <div className="space-y-6">
                  {project.overview.map((p, i) => (
                    <p key={i} className="text-[17px] leading-relaxed text-ink-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-3">
                  {project.outcomes.map((o) => (
                    <div key={o.label} className="bg-paper-tint px-6 py-8">
                      <p className="font-display text-[30px] font-semibold leading-none tracking-tightest">
                        {o.value}
                      </p>
                      <p className="mt-2.5 text-[13px] leading-snug text-ink-soft">{o.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="shell pb-20 md:pb-28">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-t border-line pt-10"
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                Next project
              </p>
              <p className="mt-3 font-display text-[26px] font-semibold tracking-tightest md:text-[36px]">
                {next.client}
              </p>
            </div>
            <span className="font-display text-[26px] transition-transform duration-300 group-hover:translate-x-1.5 md:text-[36px]">
              →
            </span>
          </Link>
        </div>
      </article>

      <ContactCta />
    </>
  );
}
