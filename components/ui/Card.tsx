import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { GitHubIcon, ExternalLinkIcon } from "./Icons";

/**
 * Project card with a gradient preview, tech-stack tags, and hover glow.
 */
export function Card({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-24px_var(--accent)]">
      {/* Gradient preview header */}
      <div
        className={cn(
          "relative h-36 w-full bg-gradient-to-br",
          project.accent ?? "from-accent/30 to-accent-2/10",
        )}
      >
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-2xl font-semibold tracking-tight text-foreground/70">
            {project.title
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border-soft bg-background/50 px-2.5 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-4 border-t border-border-soft pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
            Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}
