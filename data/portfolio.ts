/**
 * Central content file for the portfolio.
 * Edit everything here — copy, links, skills, and projects — to make the site yours.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type Skill = {
  name: string;
  /** Short category used purely for visual grouping/legend. */
  category: "Languages" | "Frontend" | "Backend" | "Tools & DevOps";
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  /** Optional accent gradient used for the card's preview. */
  accent?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  /** Icon key resolved in the UI. */
  icon: "github" | "linkedin" | "mail" | "twitter";
};

export const site = {
  name: "Deniz Ugur",
  role: "Full-Stack Developer",
  tagline: "Full-stack developer building modern, performant web experiences.",
  /** Short intro that appears under the hero headline. */
  intro:
    "I design and build fast, accessible products from idea to production — turning complex problems into clean, delightful interfaces.",
  email: "denizugur.dev@gmail.com",
  location: "Remote · Worldwide",
  resumeUrl: "#",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  heading: "About me",
  paragraphs: [
    "I'm a full-stack developer with a passion for crafting software that feels effortless to use. Over the years I've shipped products across startups and larger teams, owning features end-to-end — from database schema to pixel-perfect UI.",
    "I care deeply about performance, accessibility, and developer experience. When I'm not coding, you'll find me exploring new tools, contributing to open source, or sketching out the next side project.",
  ],
  highlights: [
    { value: "4+", label: "Years building for the web" },
    { value: "40+", label: "Projects shipped" },
    { value: "∞", label: "Cups of coffee" },
  ],
};

export const skills: Skill[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "Docker", category: "Tools & DevOps" },
  { name: "AWS", category: "Tools & DevOps" },
  { name: "Git", category: "Tools & DevOps" },
  { name: "Vercel", category: "Tools & DevOps" },
];

export const projects: Project[] = [
  {
    title: "Nimbus Analytics",
    description:
      "A real-time analytics dashboard that visualizes millions of events with sub-second latency and a fully responsive UI.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    github: "#",
    demo: "#",
    accent: "from-violet-500/30 to-indigo-500/10",
  },
  {
    title: "Orbit Commerce",
    description:
      "Headless e-commerce storefront with blazing-fast page loads, dynamic checkout, and a custom CMS integration.",
    tags: ["React", "Node.js", "Stripe", "GraphQL"],
    github: "#",
    demo: "#",
    accent: "from-sky-500/30 to-cyan-500/10",
  },
  {
    title: "Lumen UI",
    description:
      "An open-source component library of accessible, themeable React primitives used by thousands of developers.",
    tags: ["TypeScript", "Tailwind CSS", "Radix", "Storybook"],
    github: "#",
    demo: "#",
    accent: "from-emerald-500/30 to-teal-500/10",
  },
  {
    title: "Pulse Chat",
    description:
      "End-to-end encrypted team messaging app with presence, threads, and offline-first sync across devices.",
    tags: ["Next.js", "Prisma", "Redis", "WebRTC"],
    github: "#",
    demo: "#",
    accent: "from-rose-500/30 to-pink-500/10",
  },
  {
    title: "Atlas Maps",
    description:
      "Interactive geospatial explorer rendering custom map layers and routing on top of a vector tile pipeline.",
    tags: ["React", "Mapbox", "Python", "FastAPI"],
    github: "#",
    demo: "#",
    accent: "from-amber-500/30 to-orange-500/10",
  },
  {
    title: "Forge CLI",
    description:
      "A developer productivity CLI that scaffolds full-stack apps with sensible defaults and zero configuration.",
    tags: ["Node.js", "TypeScript", "ESBuild"],
    github: "#",
    demo: "#",
    accent: "from-fuchsia-500/30 to-purple-500/10",
  },
];

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/denizefeugur", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/deniz-efe-ugur/", icon: "linkedin" },
  { label: "Email", href: "mailto:denizugur.dev@gmail.com", icon: "mail" },
];
