import type { Lang } from "@/lib/languageStore";

/**
 * All translatable copy lives here. Non-translatable data (links, tech names,
 * project metadata) stays in `data/portfolio.ts`. Add a language by extending
 * the `dictionary` map below with the same shape.
 */
export interface Dictionary {
  nav: { about: string; skills: string; projects: string; contact: string };
  hero: {
    availability: string;
    greeting: string;
    role: string;
    intro: string;
    viewProjects: string;
    contactMe: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    highlights: { value: string; label: string }[];
  };
  skills: { eyebrow: string; title: string; description: string };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    /** Project descriptions keyed by the project `id` in portfolio.ts. */
    descriptions: Record<string, string>;
    code: string;
    liveDemo: string;
    construction: { badge: string; title: string; description: string };
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    detailsHeading: string;
    detailsText: string;
    emailMeAt: string;
    findMeOnline: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      successTitle: string;
      successText: string;
      sendAnother: string;
    };
  };
  footer: { rights: string };
  language: { label: string };
}

const en: Dictionary = {
  nav: { about: "About", skills: "Skills", projects: "Projects", contact: "Contact" },
  hero: {
    availability: "Available for new opportunities",
    greeting: "Hi, I'm",
    role: "Full-Stack Developer",
    intro:
      "From idea to production, I design and build fast, accessible products that turn complex problems into clear and simple user experiences.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
  },
  about: {
    eyebrow: "Who I am",
    title: "About me",
    paragraphs: [
      "I’m a full-stack developer who enjoys building software that feels simple and intuitive to use. I completed my apprenticeship as an Informatiker Applikationsentwicklung EFZ, where I was fully responsible for developing an internal application to manage the company’s parking system on my own. The app is still used daily by all employees who commute by car, and it gave me early hands-on experience owning a product from idea to production.",
      "I care about performance, accessibility, and good developer experience. Clean code and maintainable systems matter to me just as much as shipping features.",
      "Outside of coding, I’m very active in sports. I train almost every day and am currently preparing for a half marathon. It helps me stay consistent and clear-headed, which I also bring into my work as a developer."
    ],
    highlights: [
      { value: "4+", label: "Years building for the web" },
      { value: "Zurich", label: "Location" },
      { value: "∞", label: "Cups of coffee" },
    ],
  },
  skills: {
    eyebrow: "What I work with",
    title: "Skills & Technologies",
    description:
      "A toolbox I've sharpened across years of building and shipping products end-to-end.",
  },
  projects: {
    eyebrow: "Selected work",
    title: "Featured Projects",
    description:
      "A handful of projects that show how I think about product, performance, and polish.",
    descriptions: {
      nimbus:
        "A real-time analytics dashboard that visualizes millions of events with sub-second latency and a fully responsive UI.",
      orbit:
        "Headless e-commerce storefront with blazing-fast page loads, dynamic checkout, and a custom CMS integration.",
      lumen:
        "An open-source component library of accessible, themeable React primitives used by thousands of developers.",
      pulse:
        "End-to-end encrypted team messaging app with presence, threads, and offline-first sync across devices.",
      atlas:
        "Interactive geospatial explorer rendering custom map layers and routing on top of a vector tile pipeline.",
      forge:
        "A developer productivity CLI that scaffolds full-stack apps with sensible defaults and zero configuration.",
    },
    code: "Code",
    liveDemo: "Live Demo",
    construction: {
      badge: "Work in progress",
      title: "This section is under construction 🚧",
      description:
        "I'm currently curating and polishing my best work. They are landing here soon, check back shortly!",
    },
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Let's build something together",
    description:
      "Have a project in mind or just want to say hi? My inbox is always open.",
    detailsHeading: "Contact details",
    detailsText:
      "Prefer email or social? Reach me through any of these and I'll respond within a day or two.",
    emailMeAt: "Email me at",
    findMeOnline: "Find me online",
    form: {
      name: "Name",
      namePlaceholder: "Jane Doe",
      email: "Email",
      emailPlaceholder: "jane@example.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project...",
      send: "Send Message",
      successTitle: "Message sent!",
      successText:
        "Thanks for reaching out — I'll get back to you as soon as I can.",
      sendAnother: "Send another message",
    },
  },
  footer: { rights: "All rights reserved." },
  language: { label: "Language" },
};

const de: Dictionary = {
  nav: { about: "Über mich", skills: "Fähigkeiten", projects: "Projekte", contact: "Kontakt" },
  hero: {
    availability: "Verfügbar für neue Möglchkeiten",
    greeting: "Hi, ich bin",
    role: "Full-Stack-Entwickler",
    intro:
      "Von der Idee bis in die Produktion entwickle ich schnelle, barrierefreie Produkte und verwandle komplexe Probleme in klare und einfache Nutzererlebnisse.",
    viewProjects: "Projekte ansehen",
    contactMe: "Kontakt aufnehmen",
  },
  about: {
    eyebrow: "Wer ich bin",
    title: "Über mich",
    paragraphs: [
      "Ich bin Full-Stack-Entwickler und baue gerne Software, die sich einfach und intuitiv bedienen lässt. Meine Ausbildung als Informatiker Applikationsentwicklung EFZ habe ich mit dem Schwerpunkt abgeschlossen, dass ich eigenständig für die Entwicklung einer internen Anwendung zur Verwaltung des Parkplatzsystems des Unternehmens verantwortlich war. Diese App wird bis heute täglich von allen Mitarbeitenden genutzt, die mit dem Auto pendeln, und hat mir früh praktische Erfahrung gegeben, ein Produkt von der Idee bis in die Produktion vollständig selbst zu betreuen.",
      "Ich lege grossen Wert auf Performance, Accessibility und eine gute Developer Experience. Sauberer Code und wartbare Systeme sind mir genauso wichtig wie das schnelle Ausliefern von Features.",
      "Ausserhalb des Codings bin ich sehr sportlich aktiv. Ich trainiere fast jeden Tag und bereite mich aktuell auf einen Halbmarathon vor. Das hilft mir, konsequent und fokussiert zu bleiben, was ich auch in meine Arbeit als Entwickler einbringe.",
    ],
    highlights: [
      { value: "4+", label: "Jahre Web-Entwicklung" },
      { value: "Zürich", label: "Standort" },
      { value: "∞", label: "Tassen Kaffee" },
    ],
  },
  skills: {
    eyebrow: "Womit ich arbeite",
    title: "Fähigkeiten & Technologien",
    description:
      "Ein Werkzeugkasten, den ich über Jahre beim Entwickeln und Ausliefern von Produkten geschärft habe.",
  },
  projects: {
    eyebrow: "Ausgewählte Arbeiten",
    title: "Ausgewählte Projekte",
    description:
      "Einige Projekte, die zeigen, wie ich über Produkt, Performance und Feinschliff denke.",
    descriptions: {
      nimbus:
        "Ein Echtzeit-Analytics-Dashboard, das Millionen von Events mit Latenzen unter einer Sekunde und einer vollständig responsiven Oberfläche visualisiert.",
      orbit:
        "Headless-E-Commerce-Storefront mit blitzschnellen Ladezeiten, dynamischem Checkout und individueller CMS-Integration.",
      lumen:
        "Eine Open-Source-Komponentenbibliothek aus barrierefreien, thembaren React-Primitiven, die von tausenden Entwicklern genutzt wird.",
      pulse:
        "Ende-zu-Ende-verschlüsselte Team-Messaging-App mit Präsenz, Threads und Offline-First-Synchronisierung über alle Geräte.",
      atlas:
        "Interaktiver Geodaten-Explorer, der eigene Kartenebenen und Routing auf Basis einer Vector-Tile-Pipeline rendert.",
      forge:
        "Ein CLI für mehr Entwicklerproduktivität, das Full-Stack-Apps mit sinnvollen Voreinstellungen und ohne Konfiguration aufsetzt.",
    },
    code: "Code",
    liveDemo: "Live-Demo",
    construction: {
      badge: "In Arbeit",
      title: "Dieser Bereich ist noch im Aufbau 🚧",
      description:
        "Ich wähle und poliere gerade meine besten Arbeiten. Sie erscheinen hier in Kürze, schau bald wieder vorbei!",
    },
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Lass uns gemeinsam etwas bauen",
    description:
      "Hast du ein Projekt im Kopf oder möchtest einfach Hallo sagen? Mein Postfach ist immer offen.",
    detailsHeading: "Kontaktdaten",
    detailsText:
      "Lieber per E-Mail oder Social Media? Erreiche mich über einen dieser Wege und ich melde mich innerhalb von ein bis zwei Tagen.",
    emailMeAt: "Schreib mir an",
    findMeOnline: "Online findest du mich hier",
    form: {
      name: "Name",
      namePlaceholder: "Max Mustermann",
      email: "E-Mail",
      emailPlaceholder: "max@beispiel.de",
      message: "Nachricht",
      messagePlaceholder: "Erzähl mir von deinem Projekt...",
      send: "Nachricht senden",
      successTitle: "Nachricht gesendet!",
      successText:
        "Danke für deine Nachricht — ich melde mich so schnell wie möglich.",
      sendAnother: "Weitere Nachricht senden",
    },
  },
  footer: { rights: "Alle Rechte vorbehalten." },
  language: { label: "Sprache" },
};

export const dictionary: Record<Lang, Dictionary> = { en, de };
