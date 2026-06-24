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
  category: "Languages" | "Frontend" | "Backend" | "Tools & DevOps" | "AI" | "";
};

export type Project = {
  /** Stable id used to resolve the translated description in i18n.ts. */
  id: string;
  title: string;
  tags: string[];
  /**
   * Optional link to the source code. Omit to hide the code button entirely.
   */
  github?: string;
  /**
   * Optional link to a live demo.
   * - A real URL renders the "Live Demo" button.
   * - "#" renders a non-clickable "coming soon" placeholder.
   * - Omitting it hides the demo button entirely.
   */
  demo?: string;
  /**
   * Whether the card opens a detail dialog (gallery, overview, features).
   * Defaults to `true`; set to `false` for a static teaser card.
   */
  details?: boolean;
  /** Optional accent gradient used as a fallback when no image is set. */
  accent?: string;
  /** Optional year/timeframe shown in the detail dialog. */
  year?: string;
  /**
   * Per-project images. Drop files into `public/projects/` and reference them
   * by their public path (starting at `/`), e.g. "/projects/my-app-1.png".
   *
   * Anything under `public/` is committed to the repo and copied into the
   * production build, so these paths resolve identically in dev and on the
   * deployed site. PNG, JPG, WebP, AVIF and SVG are all supported.
   *
   * - `cover`: thumbnail shown on the project card (and first gallery slide).
   * - `screenshots`: additional images shown in the detail dialog gallery.
   *
   * When both are omitted, the card and dialog fall back to a styled gradient
   * placeholder, so projects without images still look complete.
   */
  cover?: string;
  screenshots?: string[];
};

export type SocialLink = {
  label: string;
  href: string;
  /** Icon key resolved in the UI. */
  icon: "github" | "linkedin" | "mail" | "twitter";
};

export type GalleryPhoto = {
  /**
   * Image path under `/public`, e.g. "/life/running.jpg". Drop your own photos
   * into `public/life/` and point these at them — any aspect ratio works, the
   * grid crops to a tidy tile and the lightbox shows the full image.
   */
  src: string;
  /** Stable id used to resolve the translated caption in i18n.ts. */
  id: string;
};

export const site = {
  name: "Deniz Ugur",
  role: "Full-Stack Developer",
  tagline: "Full-stack developer building modern, performant web experiences.",
  email: "denizugur.dev@gmail.com",
  location: "Remote · Worldwide",
  resumeUrl: "#",
  /**
   * Portrait shown in the hero. Reuses the existing profile photo by default —
   * swap it for a candid shot of you to make the first impression more personal.
   */
  portrait: "/profilePic.png",
  /**
   * Full-bleed background image behind the hero. Starts as an on-brand scenic
   * placeholder — drop a photo of a great view into `public/` and point this at
   * it (e.g. "/hero-bg.jpg"). A theme-aware scrim keeps the text readable, so
   * any landscape works. Leave it as-is for the styled gradient/grid look.
   */
  heroBackground: "/hero-bg.jpg",
  /**
   * Official Swiss “Modulbaukasten” curriculum for the Informatiker EFZ
   * Applikationsentwicklung apprenticeship — the full list of modules covered.
   */
  apprenticeshipUrl:
    "https://www.modulbaukasten.ch/?d=13d8d40b-6d82-eb11-a812-0022486f6f83",
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
  { name: "React Native", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Cypress", category: "Frontend" },
  { name: "Jest", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "MySQL", category: "Backend" },
  { name: "Sequelize", category: "Backend" },
  { name: "Serverless Computing", category: "Backend" },
  { name: ".NET (C#)", category: "Backend" },
  { name: "CI/CD", category: "Tools & DevOps" },
  { name: "Docker", category: "Tools & DevOps" },
  { name: "AWS", category: "Tools & DevOps" },
  { name: "Git", category: "Tools & DevOps" },
  { name: "Scrum / Agile", category: "Tools & DevOps" },
  { name: "Claude code", category: "AI" },
  { name: "Github copilot", category: "AI" },
  { name: "Agentic coding", category: "AI" },
  { name: "More +", category: "" },
];

export const projects: Project[] = [
  {
    id: "user-awareness-page",
    title: "User Awareness phishing Page (my IPA) 2026",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "AWS", "Geo-blocking"],
    github: "https://github.com/DenizEfeUgur/User-Awareness-Phishing-Seite",
    demo: "https://user-awareness.deniz-ugur.dev/",
    accent: "from-violet-500/30 to-indigo-500/10",
    cover: "/projects/user-awareness/user-awareness-cover.png",
    screenshots: [
      "/projects/user-awareness/user-awareness-1.png",
      "/projects/user-awareness/user-awareness-2.png",
    ],
  },
  {
    id: "parkingapp",
    title: "Parking lot app (2023 - 2026)",
    tags: ["Next.js", "Tailwind CSS", "Ansible", "Serverless", "Jenkins (CI/CD)", "AWS"],
    accent: "from-sky-500/30 to-cyan-500/10",
    cover: "/projects/parkingapp/parkingapp-cover.png",
    screenshots: ["/projects/parkingapp/parkingapp-1.png",
      "/projects/parkingapp/parkingapp-2.png",
      "/projects/parkingapp/parkingapp-3.png",
      "/projects/parkingapp/parkingapp-4.png",
      "/projects/parkingapp/parkingapp-5.png",
      "/projects/parkingapp/parkingapp-6.png",
      "/projects/parkingapp/parkingapp-7.png"
    ],
  },
    {
    id: "ugurpack",
    title: "Ugurpack (2025)",
    tags: ["React Native", "TypeScript", "PokéAPI", "Mobile", "Gestures"],
    github: "https://github.com/DenizEfeUgur/ugurpack",
    demo: "https://ugurpack.deniz-ugur.dev/",
    accent: "from-amber-500/30 to-rose-500/10",
    cover: "/projects/ugurpack/ugurpack-coverr.png",
    screenshots: [
      "/projects/ugurpack/ugurpack-1.png",
      "/projects/ugurpack/ugurpack-2.png",
      "/projects/ugurpack/ugurpack-3.png",
      "/projects/ugurpack/ugurpack-4.png",
    ],
  },
  {
    id: "nat-quiz",
    title: "Nät Quiz (2023)",
    tags: ["React.js", "Special effects 🎉",],
    github: "https://github.com/DenizEfeUgur/NAT-Quiz",
    demo: "https://quiz.deniz-ugur.dev/",
    accent: "from-fuchsia-500/30 to-pink-500/10",
    cover: "/projects/nat-quiz/nat-quiz-cover.png",
    screenshots: [
      "/projects/nat-quiz/nat-quiz-1.png",
      "/projects/nat-quiz/nat-quiz-2.png",
      "/projects/nat-quiz/nat-quiz-3.png",
    ],
  },

  {
    id: "more-soon",
    title: "More projects coming soon",
    tags: [],
    details: false,
    accent: "from-emerald-500/30 to-teal-500/10",
  },
];

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/denizefeugur", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/deniz-efe-ugur/", icon: "linkedin" },
  { label: "Email", href: "mailto:denizugur.dev@gmail.com", icon: "mail" },
];

/**
 * “Off the clock” photo gallery — life outside the editor. These start as
 * styled placeholders in `public/life/`; replace each file (or repoint `src`)
 * with a real photo and edit its caption under `life.captions` in i18n.ts.
 */
export const gallery: GalleryPhoto[] = [
  { id: "running", src: "/life/running.svg" },
  { id: "race-day", src: "/life/race-day.svg" },
  { id: "travel", src: "/life/travel.svg" },
  { id: "gym", src: "/life/gym.jpg" },
  { id: "coffee", src: "/life/coffee.svg" },
  { id: "outdoors", src: "/life/outdoors.svg" },
];
