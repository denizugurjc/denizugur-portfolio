import { skills } from "@/data/portfolio";
import { Reveal } from "./ui/Reveal";
import { SectionWrapper } from "./ui/SectionWrapper";

export function Skills() {
  return (
    <SectionWrapper
      id="skills"
      eyebrow="What I work with"
      title="Skills & Technologies"
      description="A toolbox I've sharpened across years of building and shipping products end-to-end."
    >
      <Reveal>
        <ul className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, i) => (
            <li
              key={skill.name}
              className="reveal is-visible group flex items-center gap-2 rounded-xl border border-border-soft bg-card/60 px-4 py-3 text-sm font-medium backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_30px_-12px_var(--accent)]"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-accent-2 transition-transform group-hover:scale-125" />
              {skill.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </SectionWrapper>
  );
}
