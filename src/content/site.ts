// ─────────────────────────────────────────────────────────────
// All site copy lives here. Edit this file to change the site.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Saturn Studios",
  tagline: "Website design for small businesses",
  email: "hello@saturnstudios.com",
  location: "Remote — working with businesses anywhere",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

// Thin strip above the nav. Set `href` to wherever this should point,
// or set `show: false` to hide the bar entirely.
export const banner = {
  show: false,
  label: "Experimental",
  note: "Saturn Studios experimental art — coming soon.",
  href: "/experimental",
};

// The sticker page at /experimental, linked from the top banner.
export const experimental = {
  marquee: "Saturn Studios Experimental Art",
  hint: "Drag",
};

export const nav: { label: string; href: string; icon?: "flask" }[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/contact" },
  { label: "Lab", href: "/experimental", icon: "flask" },
];

export const hero = {
  eyebrow: "Taking on new projects",
  title: "Saturn Studios",
  lede: "Independent design studio for small brands.",
  body: "We build websites that make small brands look like the real thing.",
  primaryCta: { label: "Get a quote", href: "/contact" },
  secondaryCta: { label: "See our work", href: "/work" },
};

export const about = {
  eyebrow: "Who we are",
  title: "You run the business. We'll handle the website.",
  body: [
    "Most small businesses end up with one of two websites: something a relative built years ago, or something from a template service that never quite fits. Neither one brings in work.",
    "We're a small studio that builds proper websites for people who don't have time to think about websites. You tell us what you do and who you want to reach — we handle the rest, and explain everything in plain English.",
  ],
  metrics: [
    { value: "60", suffix: "+", label: "Sites launched" },
    { value: "3", suffix: " wks", label: "Typical build time" },
    { value: "12", suffix: "+", label: "Industries worked in" },
    { value: "1", suffix: "", label: "Point of contact throughout" },
  ],
};

export const services = {
  eyebrow: "What we do",
  title: "Four things, done properly.",
  body:
    "Most people come to us for the first one. If you only need a smaller piece of the puzzle, we'll tell you that instead of selling you the lot.",
  items: [
    {
      no: "01",
      title: "A new website",
      body:
        "Built from scratch around what your business actually does. Works on a phone, loads quickly, and tells people what they need to know without hunting for it.",
      points: [
        "Design and build",
        "Written for your customers",
        "Photography guidance",
        "Live in about three weeks",
      ],
    },
    {
      no: "02",
      title: "Fixing the one you have",
      body:
        "If your site works but looks its age, rebuilding from zero is often overkill. We can keep what's earning its place and replace what isn't.",
      points: [
        "Fresh design on existing content",
        "Mobile fixes",
        "Speed and accessibility",
        "New pages where you need them",
      ],
    },
    {
      no: "03",
      title: "Getting found",
      body:
        "A website nobody finds is just an expensive business card. We set up the basics that get you showing up when someone nearby searches for what you do.",
      points: [
        "Google Business Profile",
        "Local search setup",
        "Page titles and descriptions",
        "Reviews and map listings",
      ],
    },
    {
      no: "04",
      title: "Keeping it running",
      body:
        "A live site still needs looking after. We handle the hosting, the updates and the backups, so it stays fast and secure without you having to think about it.",
      points: [
        "Hosting and backups",
        "Content updates",
        "Security patches",
        "Someone to call when it breaks",
      ],
    },
  ],
};

export const contactCta = {
  eyebrow: "Get in touch",
  title: "Need a website that pulls its weight?",
  body:
    "Tell us what your business does and what's not working about your current site. We'll come back with a straight answer on cost and timing — usually within two working days.",
  cta: { label: "Get a quote", href: "/contact" },
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  duration: string;
  category: string;
  summary: string;
  hue: number;
  services: string[];
  overview: string[];
  outcomes: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "template-1",
    title: "Template 1",
    client: "Template 1",
    year: "2025",
    duration: "3 weeks",
    category: "New website",
    summary:
      "Placeholder project. Replace this with a real client once you have one to show.",
    hue: 210,
    services: ["New website", "Getting found"],
    overview: [
      "Placeholder copy. Describe what the business does, what was wrong with their old site, and who they were trying to reach.",
      "Then describe what you actually did about it, and why. Two or three short paragraphs is plenty.",
    ],
    outcomes: [
      { value: "0x", label: "Placeholder metric" },
      { value: "0s", label: "Placeholder metric" },
      { value: "0%", label: "Placeholder metric" },
    ],
  },
  {
    slug: "template-2",
    title: "Template 2",
    client: "Template 2",
    year: "2025",
    duration: "2 weeks",
    category: "New website",
    summary:
      "Placeholder project. Duplicate this block to add more once the work comes in.",
    hue: 28,
    services: ["New website", "Keeping it running"],
    overview: [
      "Placeholder copy. Describe what the business does, what was wrong with their old site, and who they were trying to reach.",
      "Then describe what you actually did about it, and why. Two or three short paragraphs is plenty.",
    ],
    outcomes: [
      { value: "0x", label: "Placeholder metric" },
      { value: "0s", label: "Placeholder metric" },
      { value: "0%", label: "Placeholder metric" },
    ],
  },
];

export const contactPage = {
  eyebrow: "Contact",
  title: "Tell us about your business.",
  body:
    "A few sentences is plenty to start. If you'd rather just pick up the phone or send an email, that works too — we don't insist on forms.",
  budgets: [
    "Under $1,500",
    "$1,500 – $3,000",
    "$3,000 – $6,000",
    "$6,000 – $10,000",
    "$10,000+",
    "Not sure yet",
  ],
  timelines: ["As soon as possible", "Within a month", "1 – 3 months", "Just exploring"],
};
