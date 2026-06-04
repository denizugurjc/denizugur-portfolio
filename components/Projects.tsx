"use client";

import { projects } from "@/data/portfolio";
import { Card } from "./ui/Card";
import { Reveal } from "./ui/Reveal";
import { SectionWrapper } from "./ui/SectionWrapper";
import { useDictionary } from "./language";

export function Projects() {
  const dict = useDictionary();
  return (
    <SectionWrapper
      id="projects"
      eyebrow={dict.projects.eyebrow}
      title={dict.projects.title}
      description={dict.projects.description}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 100} className="h-full">
            <Card
              project={project}
              description={dict.projects.descriptions[project.id]}
              codeLabel={dict.projects.code}
              demoLabel={dict.projects.liveDemo}
            />
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
