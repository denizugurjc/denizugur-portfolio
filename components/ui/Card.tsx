import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { GitHubIcon, ExternalLinkIcon, ArrowIcon, WrenchIcon } from "./Icons";

/**
 * Project card with a gradient preview, tech-stack tags, and hover glow.
 *
 * The whole card is clickable (a stretched, transparent button) to open the
 * detail dialog, while the GitHub/Demo links sit above it so they stay
 * independently clickable.
 */
export function Card({
  project,
  description,
  codeLabel,
  demoLabel,
  comingSoonLabel,
  detailsLabel,
  openAria,
  onOpen,
}: {
  project: Project;
  description: string;
  codeLabel: string;
  demoLabel: string;
  comingSoonLabel: string;
  detailsLabel: string;
  openAria: string;
  onOpen: () => void;
}) {
  const hasGithub = Boolean(project.github && project.github !== "#");
  const hasDemo = Boolean(project.demo && project.demo !== "#");
  // "#" is the sentinel for "demo exists but isn't live yet" → coming soon.
  const demoComingSoon = project.demo === "#";
  // Cards open a detail dialog by default; opt out with `details: false`.
  const hasDetails = project.details !== false;
  const showActions = hasDemo || demoComingSoon || hasGithub;
  const cover = project.cover ?? project.screenshots?.[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-24px_var(--accent)]">
      {/* Stretched, transparent button — makes the entire card open details.
          Only rendered when the project opts into a detail dialog. */}
      {hasDetails && (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${openAria} ${project.title}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      )}

      {/* Preview header — per-project image, or a styled gradient fallback. */}
      <div
        className={cn(
          "relative h-36 w-full overflow-hidden bg-gradient-to-br",
          project.accent ?? "from-accent/30 to-accent-2/10",
        )}
      >
        {cover ? (
          <>
            {/* Blurred fill keeps any aspect ratio looking intentional. */}
            <Image
              src={cover}
              alt=""
              aria-hidden
              fill
              sizes="32px"
              quality={50}
              className="scale-110 object-cover blur-2xl"
            />
            <div className="absolute inset-0 bg-background/20" />
            {/* The full screenshot, never cropped. Served unoptimized so the
                optimizer's lossy AVIF/WebP re-encode can't soften UI text;
                the browser downscales the original PNG, which stays crisp. */}
            <Image
              src={cover}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-2xl font-semibold tracking-tight text-foreground/70">
                {project.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">
            {project.title}
          </h3>
          {hasDetails && (
            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted transition-colors duration-300 group-hover:text-accent">
              <span className="hidden sm:inline">{detailsLabel}</span>
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {description}
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

        {/* Action buttons sit above the stretched overlay button (z-20) so
            they stay independently clickable. The whole row is hidden when a
            project has no demo, no "coming soon" placeholder, and no repo. */}
        {showActions && (
          <div className="relative z-20 mt-6 flex items-center gap-3 border-t border-border-soft pt-5">
            {hasDemo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-white shadow-[0_8px_30px_-10px_var(--accent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-10px_var(--accent)]"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                {demoLabel}
              </a>
            ) : demoComingSoon ? (
              <span
                aria-disabled="true"
                title={comingSoonLabel}
                className="inline-flex h-10 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-border-soft bg-background/40 px-4 text-sm font-medium text-muted"
              >
                <WrenchIcon className="h-4 w-4" />
                {comingSoonLabel}
              </span>
            ) : null}

            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={codeLabel}
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border-soft bg-background/50 px-4 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50",
                  // Stretch to fill when it's the only action in the row.
                  !hasDemo && !demoComingSoon && "flex-1",
                )}
              >
                <GitHubIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">{codeLabel}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
