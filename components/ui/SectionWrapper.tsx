import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionWrapperProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Standard section shell: consistent vertical rhythm, centered container,
 * and an optional animated heading block.
 */
export function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-24 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
        {(eyebrow || title || description) && (
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
