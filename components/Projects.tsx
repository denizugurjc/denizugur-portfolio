import { projects } from "@/data/portfolio";
import { Card } from "./ui/Card";
import { Reveal } from "./ui/Reveal";
import { SectionWrapper } from "./ui/SectionWrapper";

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      eyebrow="Selected work"
      title="Featured Projects"
      description="A handful of projects that show how I think about product, performance, and polish."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 3) * 100} className="h-full">
            <Card project={project} />
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
