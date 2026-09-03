import type { Project } from "@/content/site";

/**
 * Placeholder visual: a generated gradient + ring per project, keyed off
 * `hue`. Swap the <div> for a next/image once real photography exists.
 */
export function ProjectVisual({ hue, className = "" }: { hue: number; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(145deg, hsl(${hue} 32% 88%), hsl(${hue + 22} 26% 76%))`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        className="absolute inset-0 h-full w-full opacity-30"
        preserveAspectRatio="xMidYMid slice"
      >
        <ellipse
          cx="200"
          cy="150"
          rx="150"
          ry="50"
          stroke="#fff"
          strokeWidth="1.5"
          transform="rotate(-18 200 150)"
        />
        <circle cx="200" cy="150" r="62" fill="#fff" fillOpacity="0.5" />
      </svg>
    </div>
  );
}

/**
 * Non-interactive for now — there are no real case studies to link to yet.
 * To turn the cards back on, wrap the contents in:
 *   <Link href={`/work/${project.slug}`} className="group block">
 * The detail route at /work/[slug] is still built and ready.
 */
export function WorkCard({ project }: { project: Project }) {
  return (
    <article>
      <ProjectVisual hue={project.hue} className="aspect-[4/3] w-full rounded-2xl" />

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[20px] font-semibold leading-snug tracking-tightest md:text-[23px]">
          {project.client}
        </h3>
        <span className="shrink-0 text-[13px] text-ink-soft">{project.year}</span>
      </div>

      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-muted">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-line px-3 py-1 text-[12px] text-ink-soft">
          {project.category}
        </span>
        <span className="rounded-full border border-line px-3 py-1 text-[12px] text-ink-soft">
          {project.duration}
        </span>
      </div>
    </article>
  );
}
