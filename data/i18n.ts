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
    /** Link label for the apprenticeship curriculum (Modulbaukasten). */
    credential: string;
    highlights: { value: string; label: string }[];
  };
  skills: { eyebrow: string; title: string; description: string };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    /** Short project descriptions keyed by the project `id` in portfolio.ts. */
    descriptions: Record<string, string>;
    /** Long-form explanation shown in the detail dialog, keyed by project id. */
    overviews: Record<string, string>;
    /** Key-feature bullet points shown in the detail dialog, keyed by project id. */
    features: Record<string, string[]>;
    code: string;
    liveDemo: string;
    construction: { badge: string; title: string; description: string };
    details: {
      overview: string;
      keyFeatures: string;
      techStack: string;
      screenshots: string;
      placeholderNote: string;
      viewCode: string;
      viewDemo: string;
      /** Shown when a project has no live demo URL yet. */
      demoComingSoon: string;
      close: string;
      viewDetails: string;
      /** Prefix for the card's aria-label, e.g. `${openAria} Orbit Commerce`. */
      openAria: string;
      /** Lightbox: open full-size image. */
      enlarge: string;
      /** Lightbox: close the enlarged image. */
      closeImage: string;
    };
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
      sending: string;
      successTitle: string;
      successText: string;
      sendAnother: string;
      errorValidation: string;
      errorGeneric: string;
    };
  };
  like: {
    eyebrow: string;
    title: string;
    description: string;
    /** Accessible label for the like action. */
    likeAction: string;
    /** Accessible label for removing a like. */
    unlikeAction: string;
    /** Shown under the count once the visitor has liked. */
    thanks: string;
    /** Count labels; `{count}` is replaced with the formatted number. */
    countOne: string;
    countMany: string;
    /** Placeholder shown while the count loads. */
    loading: string;
  };
  life: {
    eyebrow: string;
    title: string;
    description: string;
    /** Photo captions keyed by the gallery photo `id` in portfolio.ts. */
    captions: Record<string, string>;
    /** Accessible label to open a photo full-size. */
    enlarge: string;
    /** Accessible label to close the lightbox. */
    close: string;
    /** Accessible labels for lightbox navigation. */
    prev: string;
    next: string;
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
    credential: "Explore my apprenticeship curriculum",
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
      "user-awareness-page":
        "A phishing-awareness web app built as my IPA — it runs a realistic, safe simulation and teaches users how to spot and avoid such attacks.",
      parkingapp:
        "An internal parking-management app I built solo during my apprenticeship to fairly share the company's limited parking spaces. It's still used daily by hundreds of employees who commute by car.",
      "nat-quiz":
        "A playful, interactive quiz game built with React — packed with snappy animations and celebratory special effects that make answering questions genuinely fun.",
      ugurpack:
        "A React Native mobile app where you tear open Pokémon booster packs — shake or swipe your phone to reveal a creature pulled live from the PokéAPI, then add it to your growing collection.",
      "run-and-grow":
        "An Angular training journal I use for my half-marathon prep where every run you log grows a virtual garden. Built with standalone components, Angular Signals and Reactive Forms, it runs fully offline and saves everything to localStorage.",
      "more-soon":
        "More projects are on the way. I'm putting the finishing touches on a few so they show my work at its best, check back soon!",
    },
    overviews: {
      "user-awareness-page":
        "Developed as my IPA — the final practical exam of my apprenticeship — this user-awareness platform guides people through a realistic but completely safe phishing simulation. Once they interact with the simulated attack, they reach an educational debrief that explains exactly what happened and how to recognise the warning signs next time. I built the project end to end, from the React + TypeScript frontend to the AWS deployment.",
      parkingapp:
        "I designed and built this parking-management tool end to end during my apprenticeship, because the company had no fair way to share its limited parking spaces among commuting employees. Staff can reserve and release spots and see real-time availability, while administrators keep an overview of usage. I owned everything from the Next.js frontend to the serverless backend on AWS, with automated provisioning through Ansible and a Jenkins CI/CD pipeline for deployments. It's still in daily use today.",
      "nat-quiz":
        "Nät Quiz is a fun side project I built in 2023 to sharpen my React skills and experiment with motion and interactivity. Players work through a series of questions in a clean, responsive interface, while playful animations and celebratory special effects — think confetti and lively transitions — reward correct answers and keep the experience engaging from start to finish. The quiz is deployed and playable live in the browser.",
      ugurpack:
        "Ugurpack is a playful React Native app for iPhone and Android that turns opening Pokémon booster packs into a tactile, hands-on experience. Each pack is opened with real phone gestures — give it a shake or swipe across the screen — and the reveal is powered by live data from the PokéAPI, so every pull is a genuine creature with its own artwork, types and stats. Caught Pokémon are saved to your personal collection, where you can browse everything you've found and tap into each one for the full details. I built it to dive into mobile development, native device sensors, gesture handling and smooth reveal animations.",
      "run-and-grow":
        "Run & Grow is a backend-free single-page app that makes half-marathon training feel rewarding: every workout you log grows a calm, natural garden. The dashboard tracks your weekly distance goal, current streak, longest run and a countdown to race day, while a reactive form captures each run's distance, duration, type and how it felt. The garden is derived straight from your runs — easy runs sprout flowers, intervals add shrubs, tempo runs bloom special flowers, long runs grow trees, hitting the weekly goal earns a butterfly and training three days in a week brings a bird. All state lives in Angular Signals with computed() values and persists in localStorage, so the garden updates instantly and survives a refresh — no login, no server, no external APIs. I built it as a polished, mobile-first demo to explore modern standalone Angular with signals.",
      "more-soon":
        "More projects are on the way. I'm putting the finishing touches on a few so they show my work at its best, check back soon!",
    },
    features: {
      "user-awareness-page": [
        "Realistic yet completely safe phishing simulation",
        "Geo-blocking to ensure only selected countries can access the demo",
        "Responsive UI built with React, TypeScript & Tailwind CSS",
        "Developed and hosted end-to-end on AWS",
      ],
      parkingapp: [
        "Real-time overview of available and occupied spaces",
        "Self-service reservations and releases for employees",
        "Admin view for managing spaces and usage",
        "Serverless backend on AWS, provisioned with Ansible",
        "Automated deployments via a Jenkins CI/CD pipeline",
        "Responsive UI built with Next.js & Tailwind CSS",
      ],
      "nat-quiz": [
        "Interactive quiz flow with instant feedback",
        "Playful animations and celebratory special effects 🎉",
        "Clean, responsive UI built with React",
        "Deployed and playable live in the browser",
      ],
      ugurpack: [
        "Open packs with real gestures — shake or swipe your phone",
        "Live Pokémon data pulled from the PokéAPI",
        "Personal collection that stores every creature you catch",
        "Detail view with artwork, types and stats for each catch",
        "Satisfying pack-opening and reveal animations",
        "Cross-platform mobile app built with React Native",
      ],
      "run-and-grow": [
        "Weekly km goal with an animated progress bar and live stats",
        "A garden that grows from your runs — flowers, shrubs, trees, butterflies & birds",
        "Reactive form with validation for distance, duration, type and feeling",
        "Computed weekly km, longest run and current streak via Angular Signals",
        "Run history with pace (min/km), type filters and confirm-to-delete",
        "Fully offline & instant — state persists in localStorage, no backend",
      ],
    },
    code: "Code",
    liveDemo: "Live Demo",
    construction: {
      badge: "Work in progress",
      title: "This section is still under construction 🚧",
      description:
        "I'm curating and polishing my best work so each project shows what I can really do. New work is landing here soon so check back shortly!",
    },
    details: {
      overview: "Overview",
      keyFeatures: "Key features",
      techStack: "Tech stack",
      screenshots: "Screenshots",
      placeholderNote: "Preview coming soon",
      viewCode: "View code",
      viewDemo: "View live demo",
      demoComingSoon: "Demo coming soon",
      close: "Close",
      viewDetails: "View details",
      openAria: "View details for",
      enlarge: "Click to view full size",
      closeImage: "Close image",
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
      sending: "Sending…",
      successTitle: "Message sent!",
      successText:
        "Thanks for reaching out — I'll get back to you as soon as I can.",
      sendAnother: "Send another message",
      errorValidation:
        "Please add your name, a valid email, and a short message (10+ characters).",
      errorGeneric:
        "Something went wrong while sending. Please try again, or email me directly at denizugur.dev@gmail.com.",
    },
  },
  like: {
    eyebrow: "Enjoyed it?",
    title: "Did you like my website?",
    description:
      "If this portfolio brought a smile to your face, tap the heart. It genuinely makes my day :)",
    likeAction: "Like this website",
    unlikeAction: "Remove your like",
    thanks: "Thanks for the love!",
    countOne: "{count} like",
    countMany: "{count} likes",
    loading: "Loading…",
  },
  life: {
    eyebrow: "Beyond the code",
    title: "Off the clock",
    description:
      "A look at life outside the editor — training, travel, and the little things that keep me balanced.",
    captions: {
      running: "Early-morning long run before work",
      "race-day": "Race day — chasing a new personal best",
      travel: "Exploring somewhere new",
      gym: "Strength session to balance the miles",
      coffee: "Where the best ideas happen ☕",
      outdoors: "Fresh air and a good trail",
    },
    enlarge: "Open photo",
    close: "Close photo",
    prev: "Previous photo",
    next: "Next photo",
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
    credential: "Lehrplan meiner Ausbildung entdecken",
    highlights: [
      { value: "4+", label: "Jahre Web-Entwicklung" },
      { value: "Zürich", label: "Standort" },
      { value: "∞", label: "Kaffee" },
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
      "user-awareness-page":
        "Eine Phishing-Awareness-Web-App, entwickelt als meine IPA — sie führt eine realistische, sichere Simulation durch und zeigt Nutzenden, wie sie solche Angriffe erkennen und vermeiden.",
      parkingapp:
        "Eine interne Parkplatz-Verwaltungs-App, die ich während meiner Lehre eigenständig entwickelt habe, um die begrenzten Firmenparkplätze fair zu verteilen. Sie wird bis heute täglich von pendelnden Mitarbeitenden genutzt.",
      "nat-quiz":
        "Ein verspieltes, interaktives Quiz-Game, gebaut mit React — voller flotter Animationen und feierlicher Spezialeffekte, die das Beantworten von Fragen richtig Spass machen.",
      ugurpack:
        "Eine React-Native-Mobile-App, in der du Pokémon-Booster-Packs aufreisst — schüttle dein Handy oder wische über den Bildschirm, um ein Pokémon zu enthüllen, das live aus der PokéAPI kommt, und füge es deiner wachsenden Sammlung hinzu.",
      "run-and-grow":
        "Ein Angular-Trainingstagebuch für die Halbmarathon-Vorbereitung, bei dem jeder erfasste Lauf einen virtuellen Garten wachsen lässt. Gebaut mit Standalone Components, Angular Signals und Reactive Forms — läuft komplett offline und speichert alles im localStorage.",
      "more-soon":
        "Weitere Projekte sind unterwegs. Ich gebe gerade einigen den letzten Schliff, damit sie meine Arbeit bestmöglich zeigen, schau bald wieder vorbei!",
    },
    overviews: {
      "user-awareness-page":
        "Entwickelt als meine IPA — die praktische Abschlussprüfung meiner Lehre — führt diese Awareness-Plattform Nutzende durch eine realistische, aber vollkommen sichere Phishing-Simulation. Nach der Interaktion mit dem simulierten Angriff gelangen sie zu einer Lernseite, die genau erklärt, was passiert ist und wie man die Warnsignale künftig erkennt. Ich habe das Projekt von A bis Z umgesetzt — vom React-+-TypeScript-Frontend bis zum Deployment auf AWS.",
      parkingapp:
        "Diese Parkplatz-Verwaltung habe ich während meiner Lehre von A bis Z entworfen und umgesetzt, da das Unternehmen keine faire Möglichkeit hatte, seine begrenzten Parkplätze unter den pendelnden Mitarbeitenden aufzuteilen. Mitarbeitende können Plätze reservieren und wieder freigeben und sehen die Verfügbarkeit in Echtzeit, während Administratoren den Überblick über die Nutzung behalten. Ich war für alles verantwortlich — vom Next.js-Frontend bis zum Serverless-Backend auf AWS, mit automatisiertem Provisioning via Ansible und einer Jenkins-CI/CD-Pipeline für die Deployments. Sie ist bis heute täglich im Einsatz.",
      "nat-quiz":
        "Nät Quiz ist ein Fun-Side-Project, das ich 2023 gebaut habe, um meine React-Skills zu schärfen und mit Animationen und Interaktivität zu experimentieren. Spielende beantworten eine Reihe von Fragen in einer aufgeräumten, responsiven Oberfläche, während verspielte Animationen und feierliche Spezialeffekte — etwa Konfetti und lebendige Übergänge — richtige Antworten belohnen und das Erlebnis von Anfang bis Ende unterhaltsam halten. Das Quiz ist live im Browser spielbar.",
      ugurpack:
        "Ugurpack ist eine verspielte React-Native-App für iPhone und Android, die das Öffnen von Pokémon-Booster-Packs in ein haptisches, greifbares Erlebnis verwandelt. Jedes Pack wird mit echten Handy-Gesten geöffnet — einmal schütteln oder über den Bildschirm wischen — und die Enthüllung wird von Live-Daten aus der PokéAPI gespeist, sodass jeder Zug ein echtes Wesen mit eigenem Artwork, Typen und Werten ist. Gefangene Pokémon landen in deiner persönlichen Sammlung, in der du alles Gefundene durchstöbern und für die vollen Details antippen kannst. Ich habe sie gebaut, um in die Mobile-Entwicklung, native Gerätesensoren, Gesten-Handling und flüssige Enthüllungs-Animationen einzutauchen.",
      "run-and-grow":
        "Run & Grow ist eine backendfreie Single-Page-App, die das Halbmarathon-Training belohnend macht: Jede dokumentierte Einheit lässt einen ruhigen, natürlichen Garten wachsen. Das Dashboard verfolgt dein Wochenkilometer-Ziel, die aktuelle Streak, den längsten Lauf und einen Countdown bis zum Renntag, während ein Reactive Form Distanz, Dauer, Trainingstyp und Gefühl jeder Einheit erfasst. Der Garten wird direkt aus den Läufen abgeleitet — lockere Läufe lassen Blumen spriessen, Intervalle bringen Sträucher, Tempoläufe besondere Blüten, Long Runs wachsen zu Bäumen, das erreichte Wochenziel bringt einen Schmetterling und drei Trainingstage pro Woche einen Vogel. Der gesamte State liegt in Angular Signals mit computed()-Werten und wird im localStorage gespeichert, sodass sich der Garten sofort aktualisiert und einen Reload übersteht — ohne Login, ohne Server, ohne externe APIs. Ich habe sie als ausgefeilte, Mobile-first-Demo gebaut, um modernes Standalone-Angular mit Signals auszuloten.",
      "more-soon":
        "Weitere Projekte sind unterwegs. Ich gebe gerade einigen den letzten Schliff, damit sie meine Arbeit bestmöglich zeigen, schau bald wieder vorbei!",
    },
    features: {
      "user-awareness-page": [
        "Realistische, aber völlig sichere Phishing-Simulation",
        "Lern-Debrief, der die Warnsignale erklärt",
        "Responsive UI mit React, TypeScript & Tailwind CSS",
        "End-to-end auf AWS entwickelt und gehostet",
      ],
      parkingapp: [
        "Echtzeit-Übersicht über freie und belegte Parkplätze",
        "Self-Service-Reservierung und -Freigabe für Mitarbeitende",
        "Admin-Ansicht zur Verwaltung von Plätzen und Nutzung",
        "Serverless-Backend auf AWS, provisioniert mit Ansible",
        "Automatisierte Deployments über eine Jenkins-CI/CD-Pipeline",
        "Responsive UI mit Next.js & Tailwind CSS",
      ],
      "nat-quiz": [
        "Interaktiver Quiz-Ablauf mit sofortigem Feedback",
        "Verspielte Animationen und feierliche Spezialeffekte 🎉",
        "Aufgeräumte, responsive UI mit React",
        "Live im Browser spielbar",
      ],
      ugurpack: [
        "Packs mit echten Gesten öffnen — Handy schütteln oder wischen",
        "Live-Pokémon-Daten aus der PokéAPI",
        "Persönliche Sammlung, die jedes gefangene Wesen speichert",
        "Detailansicht mit Artwork, Typen und Werten pro Fang",
        "Befriedigende Pack-Öffnungs- und Enthüllungs-Animationen",
        "Plattformübergreifende Mobile-App mit React Native",
      ],
      "run-and-grow": [
        "Wochenkilometer-Ziel mit animiertem Fortschrittsbalken und Live-Kennzahlen",
        "Ein Garten, der aus deinen Läufen wächst — Blumen, Sträucher, Bäume, Schmetterlinge & Vögel",
        "Reactive Form mit Validierung für Distanz, Dauer, Typ und Gefühl",
        "Berechnete Wochenkilometer, längster Lauf und Streak via Angular Signals",
        "Lauf-Historie mit Pace (min/km), Typ-Filtern und Löschen mit Bestätigung",
        "Komplett offline & sofort — State bleibt im localStorage, kein Backend",
      ],
    },
    code: "Code",
    liveDemo: "Live-Demo",
    construction: {
      badge: "In Arbeit",
      title: "Dieser Bereich ist noch im Aufbau 🚧",
      description:
        "Ich wähle und poliere gerade meine besten Arbeiten, damit jedes Projekt zeigt, was ich wirklich kann. Neue Arbeiten erscheinen hier in Kürze — schau bald wieder vorbei!",
    },
    details: {
      overview: "Überblick",
      keyFeatures: "Wichtigste Funktionen",
      techStack: "Tech-Stack",
      screenshots: "Screenshots",
      placeholderNote: "Vorschau folgt in Kürze",
      viewCode: "Code ansehen",
      viewDemo: "Live-Demo ansehen",
      demoComingSoon: "Demo folgt in Kürze",
      close: "Schliessen",
      viewDetails: "Details ansehen",
      openAria: "Details ansehen für",
      enlarge: "Zum Vergrössern klicken",
      closeImage: "Bild schliessen",
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
      sending: "Wird gesendet…",
      successTitle: "Nachricht gesendet!",
      successText:
        "Danke für deine Nachricht — ich melde mich so schnell wie möglich.",
      sendAnother: "Weitere Nachricht senden",
      errorValidation:
        "Bitte gib deinen Namen, eine gültige E-Mail und eine kurze Nachricht (mind. 10 Zeichen) an.",
      errorGeneric:
        "Beim Senden ist etwas schiefgelaufen. Bitte versuche es erneut oder schreib mir direkt an denizugur.dev@gmail.com.",
    },
  },
  like: {
    eyebrow: "Hat's gefallen?",
    title: "Hat dir meine Website gefallen?",
    description:
      "Wenn dir dieses Portfolio ein Lächeln entlockt hat, klick aufs Herz. Das freut mich riesig :)",
    likeAction: "Diese Website liken",
    unlikeAction: "Like entfernen",
    thanks: "Danke für die Liebe!",
    countOne: "{count} Like",
    countMany: "{count} Likes",
    loading: "Lädt…",
  },
  life: {
    eyebrow: "Abseits vom Code",
    title: "Wenn ich nicht code",
    description:
      "Ein Blick auf mein Leben ausserhalb des Editors — Training, Reisen und die kleinen Dinge, die mich im Gleichgewicht halten.",
    captions: {
      running: "Frühe Long Runs vor der Arbeit",
      "race-day": "Wettkampftag — auf der Jagd nach einer neuen Bestzeit",
      travel: "Etwas Neues entdecken",
      gym: "Krafttraining als Ausgleich zu den Kilometern",
      coffee: "Wo die besten Ideen entstehen ☕",
      outdoors: "Frische Luft und ein guter Trail",
    },
    enlarge: "Foto öffnen",
    close: "Foto schliessen",
    prev: "Vorheriges Foto",
    next: "Nächstes Foto",
  },
  footer: { rights: "Alle Rechte vorbehalten." },
  language: { label: "Sprache" },
};

export const dictionary: Record<Lang, Dictionary> = { en, de };
