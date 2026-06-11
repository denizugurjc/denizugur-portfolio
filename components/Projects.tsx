"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { Card } from "./ui/Card";
import { Reveal } from "./ui/Reveal";
import { SectionWrapper } from "./ui/SectionWrapper";
import { useDictionary } from "./language";
import { ProjectDialog } from "./ProjectDialog";
import { WrenchIcon } from "./ui/Icons";

export function Projects() {
  const dict = useDictionary();
  const wip = dict.projects.construction;
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <SectionWrapper
      id="projects"
      eyebrow={dict.projects.eyebrow}
      title={dict.projects.title}
      description={dict.projects.description}
    >
      {/* Under-construction notice */}
      <Reveal className="mx-auto mb-12 max-w-xl">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-accent/40 bg-card/60 px-6 py-10 text-center backdrop-blur">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_12px_30px_-10px_var(--accent)]">
            <WrenchIcon className="h-8 w-8 animate-pulse" />
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {wip.badge}
          </span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {wip.title}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              {wip.description}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Project grid — click a card to open its details */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 100} className="h-full">
            <Card
              project={project}
              description={dict.projects.descriptions[project.id]}
              codeLabel={dict.projects.code}
              demoLabel={dict.projects.liveDemo}
              comingSoonLabel={dict.projects.details.demoComingSoon}
              detailsLabel={dict.projects.details.viewDetails}
              openAria={dict.projects.details.openAria}
              onOpen={() => setSelected(project)}
            />
          </Reveal>
        ))}
      </div>

      {selected && (
        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </SectionWrapper>
  );
}
