/**
 * Central content file for the portfolio.
 * Edit everything here — copy, links, skills, and projects — to make the site yours.
 */

export type NavItem = {
  /** Section id, also used to look up the translated label in i18n.ts. */
  id: "about" | "skills" | "projects" | "contact";
  href: string;
};

export type Skill = {
  name: string;
  /** Short category used purely for visual grouping/legend. */
  category: "Languages" | "Frontend" | "Backend" | "Tools & DevOps";
};

export type Project = {
  /** Stable id used to resolve the translated description in i18n.ts. */
  id: string;
  title: string;
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
  email: "denizugur.dev@gmail.com",
  location: "Remote · Worldwide",
  resumeUrl: "#",
};

export const navItems: NavItem[] = [
  { id: "about", href: "#about" },
  { id: "skills", href: "#skills" },
  { id: "projects", href: "#projects" },
  { id: "contact", href: "#contact" },
];

export const skills: Skill[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Cypress", category: "Frontend" },
  { name: "Jest", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "MySQL", category: "Backend" },
  { name: "Sequelize", category: "Backend" },
  { name: "Serverless Computing", category: "Backend" },
  { name: "CI/CD", category: "Tools & DevOps" },
  { name: "Docker", category: "Tools & DevOps" },
  { name: "AWS", category: "Tools & DevOps" },
  { name: "Git", category: "Tools & DevOps" },
  { name: "Vercel", category: "Tools & DevOps" },
  { name: "Scrum", category: "Tools & DevOps" },
  { name: "More +", category: "Tools & DevOps" },
];

export const projects: Project[] = [
  {
    id: "nimbus",
    title: "Nimbus Analytics",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    github: "#",
    demo: "#",
    accent: "from-violet-500/30 to-indigo-500/10",
  },
  {
    id: "orbit",
    title: "Orbit Commerce",
    tags: ["React", "Node.js", "Stripe", "GraphQL"],
    github: "#",
    demo: "#",
    accent: "from-sky-500/30 to-cyan-500/10",
  },
  {
    id: "lumen",
    title: "Lumen UI",
    tags: ["TypeScript", "Tailwind CSS", "Radix", "Storybook"],
    github: "#",
    demo: "#",
    accent: "from-emerald-500/30 to-teal-500/10",
  },
  {
    id: "pulse",
    title: "Pulse Chat",
    tags: ["Next.js", "Prisma", "Redis", "WebRTC"],
    github: "#",
    demo: "#",
    accent: "from-rose-500/30 to-pink-500/10",
  },
  {
    id: "atlas",
    title: "Atlas Maps",
    tags: ["React", "Mapbox", "Python", "FastAPI"],
    github: "#",
    demo: "#",
    accent: "from-amber-500/30 to-orange-500/10",
  },
  {
    id: "forge",
    title: "Forge CLI",
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
