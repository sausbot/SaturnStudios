import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { ContactCta } from "@/components/ContactCta";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Recent websites built by Saturn Studios for small businesses.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-paper pt-[104px]">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <span className="eyebrow">Selected work</span>
            <h1 className="mt-6 max-w-3xl font-display text-[40px] font-semibold leading-[1.05] tracking-tightest md:text-[64px]">
              Recent work.
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-muted">
              A look at the kind of sites we build for small businesses — what the owner needed,
              what we did about it, and what changed afterwards.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="shell pb-24 md:pb-32">
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 80}>
                <WorkCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
