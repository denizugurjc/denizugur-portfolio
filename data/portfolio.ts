export type NavItem = {
  id: "about" | "skills" | "projects" | "contact";
  href: string;
};

export type Skill = {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Tools & DevOps" | "AI" | "";
};

export type Project = {
  id: string;
  title: string;
  tags: string[];
  github?: string;
  demo?: string;
  details?: boolean;
  accent?: string;
  year?: string;
  cover?: string;
  screenshots?: string[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "twitter";
};

export type GalleryPhoto = {
  src: string;
  id: string;
};

export const site = {
  name: "Deniz Ugur",
  role: "Full-Stack Developer",
  tagline: "Full-stack developer building modern, performant web experiences.",
  email: "denizugur.dev@gmail.com",
  location: "Remote · Worldwide",
  resumeUrl: "#",
  portrait: "/profilePicture.png",
  heroBackground: "/hero-bg.jpg",
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
  { name: "React Query / TanStack Query", category: "Frontend" },
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
    id: "run-and-grow",
    title: "Run & Grow (2026)",
    tags: ["Angular", "TypeScript", "Angular Signals", "Reactive Forms", "SCSS", "localStorage"],
    github: "https://github.com/DenizEfeUgur/Run-and-Grow",
    demo: "https://run-and-grow.deniz-ugur.dev/dashboard",
    year: "2026",
    accent: "from-green-500/30 to-amber-500/10",
    cover: "/projects/run-and-grow/run-and-grow-cover.png",
    screenshots: [
      "/projects/run-and-grow/run-and-grow-1.png",
      "/projects/run-and-grow/run-and-grow-2.png",
      "/projects/run-and-grow/run-and-grow-3.png",
      "/projects/run-and-grow/run-and-grow-4.png",
    ],
  },
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

export const gallery: GalleryPhoto[] = [
  { id: "running", src: "/life/running.svg" },
  { id: "race-day", src: "/life/race-day.svg" },
  { id: "travel", src: "/life/travel.svg" },
  { id: "gym", src: "/life/gym.jpg" },
  { id: "coffee", src: "/life/coffee.svg" },
  { id: "outdoors", src: "/life/outdoors.svg" },
];
