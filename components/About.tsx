"use client";

import { site } from "@/data/portfolio";
import { Reveal } from "./ui/Reveal";
import { SectionWrapper } from "./ui/SectionWrapper";
import { useDictionary } from "./language";
import { ExternalLinkIcon, GraduationCapIcon } from "./ui/Icons";
import Image from "next/image";

export function About() {
  const dict = useDictionary();
  return (
    <SectionWrapper id="about" eyebrow={dict.about.eyebrow} title={dict.about.title}>
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
        <Reveal className="mx-auto w-full max-w-sm">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border-soft bg-gradient-to-br from-accent/20 to-accent-2/10">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-7xl font-bold text-transparent">
                <Image src="/profilePic2.jpg" alt={site.name.split(" ")
                  .map((w) => w[0])
                  .join("")} width={400} height={300} />
              </span>
            </div>
            <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] truncate whitespace-nowrap rounded-full border border-border-soft bg-background/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
              {site.location}
            </div>
          </div>
        </Reveal>

        <div>
          {dict.about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="mb-4 text-pretty text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={dict.about.paragraphs.length * 80}>
            <a
              href={site.apprenticeshipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cred mt-2 inline-flex items-center gap-2.5 rounded-full border border-border-soft bg-card/60 py-1.5 pl-2 pr-4 text-sm font-medium text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-white">
                <GraduationCapIcon className="h-4 w-4" />
              </span>
              {dict.about.credential}
              <ExternalLinkIcon className="h-3.5 w-3.5 text-muted transition-colors group-hover/cred:text-accent" />
            </a>
          </Reveal>

          <Reveal delay={160}>
            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {dict.about.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border-soft bg-card/60 p-4 text-center backdrop-blur"
                >
                  <dt className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-3xl font-bold text-transparent">
                    {item.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
