# Saturn Studios

Marketing site for Saturn Studios — Next.js 15 (App Router) + TypeScript + Tailwind CSS.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
src/
  app/
    layout.tsx            Root layout, fonts, nav + footer
    page.tsx              Homepage: hero, about, services, contact CTA
    work/page.tsx         Project index
    work/[slug]/page.tsx  Project detail (statically generated)
    contact/page.tsx      Contact page + form
    globals.css           Tailwind layers, reveal animation
  components/             Nav, Footer, Hero, About, Services, ContactCta,
                          WorkCard, ContactForm, Logo, Reveal
  content/site.ts         ← ALL COPY LIVES HERE
```

## Editing content

`src/content/site.ts` holds every string on the site: nav, hero, about copy,
metrics, services, projects, and contact-page options. Change it there and the
whole site updates — you shouldn't need to open a component to change wording.

To add a project, append an object to the `projects` array. The route and the
static page are generated from the `slug` automatically.

## Things still to wire up

- **Project imagery.** `ProjectVisual` in `src/components/WorkCard.tsx` draws a
  generated gradient keyed off each project's `hue`. Replace it with
  `next/image` once real photography exists.
- **The contact form.** It currently composes a `mailto:` link, so it works with
  no backend. Swap `handleSubmit` in `src/components/ContactForm.tsx` for a POST
  to Formspree, Resend, or your own `/api/contact` route when you're ready.
- **Real copy.** Everything in `site.ts` is written placeholder — plausible, but
  invented. The projects and metrics are not real.
- **Social links** in `site.ts` point at bare domains.
- **Domain** is hardcoded as `saturnstudios.com` in `layout.tsx` (`metadataBase`).

## Deploying

**Vercel** — push to GitHub, import the repo, accept the defaults. The Hobby
tier is free but licensed for non-commercial use only.

**Cloudflare Pages** — free and permits commercial use. Build command
`npm run build`, and add the `@cloudflare/next-on-pages` adapter.

## Design

- Type: Inter (body) and Inter Tight (display), both via `next/font`.
- Colour: near-white grounds (`paper`, `paper-tint`) against dark ink
  (`#262a36`), with a single warm accent (`#c96a3f`) used sparingly.
- Motion: sections fade up on scroll via `Reveal`, an IntersectionObserver
  wrapper. All motion is disabled under `prefers-reduced-motion`.
