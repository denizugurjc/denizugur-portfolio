"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useDictionary } from "./language";
import {
  ArrowIcon,
  CloseIcon,
  ExpandIcon,
  ExternalLinkIcon,
  GitHubIcon,
} from "./ui/Icons";

/**
 * Accessible, animated project detail modal. Rendered into `document.body` via
 * a portal so ancestors using `backdrop-filter`/`blur` (which create containing
 * blocks) can't clip the fixed overlay.
 *
 * Closes on Escape or backdrop click, locks body scroll, and restores focus to
 * the trigger when dismissed.
 */
export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dict = useDictionary();
  const t = dict.projects;
  const d = t.details;

  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  // Lightbox (full-size image) open state. A ref mirrors it so the global
  // keydown handler can read the latest value without re-subscribing.
  const [zoomed, setZoomed] = useState(false);
  const zoomedRef = useRef(false);
  useEffect(() => {
    zoomedRef.current = zoomed;
  }, [zoomed]);

  // Gallery = cover first, then any extra screenshots (de-duplicated).
  const gallery = [
    ...(project.cover ? [project.cover] : []),
    ...(project.screenshots ?? []),
  ].filter((src, i, all) => all.indexOf(src) === i);
  const shots = gallery.length ? gallery : null;
  const slideCount = shots ? shots.length : 3;
  const overview = t.overviews[project.id] ?? t.descriptions[project.id] ?? "";
  const features = t.features[project.id] ?? [];
  const hasGithub = Boolean(project.github && project.github !== "#");
  const hasDemo = Boolean(project.demo && project.demo !== "#");
  // "#" is the sentinel for "demo exists but isn't live yet" → coming soon.
  const demoComingSoon = project.demo === "#";
  const showLinks = hasGithub || hasDemo || demoComingSoon;
  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3);

  // Closure-safe navigation (functional updates keep it correct from the
  // global keydown handler too).
  const goTo = useCallback(
    (index: number) => setActive((index + slideCount) % slideCount),
    [slideCount],
  );
  const step = useCallback(
    (dir: number) => setActive((i) => (i + dir + slideCount) % slideCount),
    [slideCount],
  );

  // Scroll lock, Escape handling, arrow navigation, and focus management.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // Escape closes the lightbox first, then the dialog.
        if (zoomedRef.current) setZoomed(false);
        else onClose();
      } else if (event.key === "ArrowLeft") {
        step(-1);
      } else if (event.key === "ArrowRight") {
        step(1);
      }
    }
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose, step]);

  // Don't attempt to portal during SSR. The dialog only renders after a click.
  if (typeof document === "undefined") return null;

  const titleId = `project-dialog-${project.id}`;

  return (
    <>
      {createPortal(
        <div
          className="animate-overlay-in fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="presentation"
        >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        className="animate-modal-in relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border-soft bg-card shadow-2xl sm:max-h-[88vh] sm:rounded-3xl"
      >
        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={d.close}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-background/70 text-foreground backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          {/* Gallery */}
          <div className="relative">
            <div
              className={cn(
                "relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br",
                project.accent ?? "from-accent/30 to-accent-2/10",
              )}
            >
              {shots ? (
                <>
                  {/* Blurred fill so screenshots of any aspect ratio sit on a
                      premium backdrop instead of being cropped. */}
                  <Image
                    key={`bg-${active}`}
                    src={shots[active]}
                    alt=""
                    aria-hidden
                    fill
                    sizes="32px"
                    quality={50}
                    className="scale-110 object-cover blur-2xl"
                  />
                  <div className="absolute inset-0 bg-background/30" />
                  {/* The full, uncropped screenshot. Served unoptimized so the
                      optimizer's lossy AVIF/WebP re-encode can't soften UI
                      text; the browser downscales the original, staying crisp. */}
                  <Image
                    key={active}
                    src={shots[active]}
                    alt={`${project.title} — ${d.screenshots} ${active + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    unoptimized
                    className="object-contain"
                  />
                  {/* Click the image to open it full-size (rendered before the
                      arrows so prev/next stay clickable on top). */}
                  <button
                    type="button"
                    onClick={() => setZoomed(true)}
                    aria-label={d.enlarge}
                    title={d.enlarge}
                    className="group/zoom absolute inset-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  >
                    <span className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-1.5 rounded-full border border-border-soft bg-background/70 px-3 text-xs font-medium text-foreground opacity-0 backdrop-blur transition-opacity duration-200 group-hover/zoom:opacity-100">
                      <ExpandIcon className="h-4 w-4" />
                      {d.enlarge}
                    </span>
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <span className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text font-mono text-5xl font-bold text-transparent">
                      {initials}
                    </span>
                    <span className="rounded-full border border-border-soft bg-background/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
                      {d.placeholderNote}
                    </span>
                  </div>
                </div>
              )}

              {/* Prev / next controls */}
              {slideCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(active - 1)}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-soft bg-background/70 text-foreground backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <ArrowIcon className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(active + 1)}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-soft bg-background/70 text-foreground backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            {slideCount > 1 && (
              <div className="flex justify-center gap-2 py-3">
                {Array.from({ length: slideCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${d.screenshots} ${i + 1}`}
                    aria-current={i === active}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === active
                        ? "w-6 bg-accent"
                        : "w-2 bg-border-soft hover:bg-muted",
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 id={titleId} className="text-2xl font-bold tracking-tight">
                {project.title}
              </h2>
              {project.year && (
                <span className="rounded-full border border-border-soft bg-background/50 px-2.5 py-0.5 text-xs font-medium text-muted">
                  {project.year}
                </span>
              )}
            </div>

            {/* Overview */}
            <section className="mt-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {d.overview}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                {overview}
              </p>
            </section>

            {/* Key features */}
            {features.length > 0 && (
              <section className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {d.keyFeatures}
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tech stack */}
            <section className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {d.techStack}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border-soft bg-background/50 px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            {/* Links — hidden entirely when there's no repo, demo, or
                "coming soon" placeholder to show. */}
            {showLinks && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {hasGithub && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border-soft bg-background/50 px-5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    {d.viewCode}
                  </a>
                )}
                {hasDemo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white shadow-[0_8px_30px_-8px_var(--accent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_var(--accent)]"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    {d.viewDemo}
                  </a>
                ) : demoComingSoon ? (
                  <span
                    aria-disabled="true"
                    title={d.demoComingSoon}
                    className="inline-flex h-11 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-border-soft bg-background/40 px-5 text-sm font-medium text-muted"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    {d.demoComingSoon}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </div>
          </div>
        </div>,
        document.body,
      )}

      {/* Full-size image lightbox — opened by clicking a screenshot. Shows the
          original image at native resolution (object-contain) for maximum
          sharpness, on its own higher-stacked layer. */}
      {zoomed &&
        shots &&
        createPortal(
          <div
            className="animate-overlay-in fixed inset-0 z-[110] flex flex-col bg-black/90 backdrop-blur-sm"
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} — ${d.screenshots}`}
          >
            {/* Top bar: counter + close */}
            <div className="flex items-center justify-between p-4 sm:p-5">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                {active + 1} / {slideCount}
              </span>
              <button
                type="button"
                onClick={() => setZoomed(false)}
                aria-label={d.closeImage}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Image stage — clicks on the image itself don't close. */}
            <div
              className="relative flex-1"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                key={active}
                src={shots[active]}
                alt={`${project.title} — ${d.screenshots} ${active + 1}`}
                fill
                sizes="100vw"
                unoptimized
                priority
                className="object-contain p-2 sm:p-6"
              />

              {slideCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-5"
                  >
                    <ArrowIcon className="h-5 w-5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5"
                  >
                    <ArrowIcon className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
