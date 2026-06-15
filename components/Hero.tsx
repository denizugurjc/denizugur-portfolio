"use client";

import Image from "next/image";
import { site, socials } from "@/data/portfolio";
import { Button } from "./ui/Button";
import { ArrowIcon, socialIcons } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { useDictionary } from "./language";

export function Hero() {
  const dict = useDictionary();
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background: scenic photo with a theme-aware scrim for readability,
          plus the subtle brand grid + animated glows layered on top. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={site.heroBackground}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* Vertical blend: keep the view visible through the middle, then melt
            into the page background at the top and bottom. */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/35 to-background" />
        {/* Side scrim strengthens text contrast, more so on desktop where the
            copy sits on the left. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent lg:from-background/85" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="animate-float-glow absolute -top-24 left-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[120px]" />
        <div
          className="animate-float-glow absolute -right-20 top-1/3 h-[24rem] w-[24rem] rounded-full bg-accent-2/15 blur-[120px]"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Text column */}
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-card/60 px-4 py-1.5 text-sm font-medium text-muted backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {dict.hero.availability}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl">
                {dict.hero.greeting} {site.name.split(" ")[0]}
                <br />
                <span className="animate-gradient-text bg-gradient-to-r from-accent via-accent-2 to-accent bg-clip-text text-transparent">
                  {dict.hero.role}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted lg:mx-0">
                {dict.hero.intro}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Button href="#projects" size="lg" className="group">
                  {dict.hero.viewProjects}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="#contact" variant="secondary" size="lg">
                  {dict.hero.contactMe}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-12 flex items-center justify-center gap-3 lg:justify-start">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-card/60 text-muted backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-foreground"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Portrait column */}
          <Reveal delay={140} className="order-first mx-auto w-full max-w-xs sm:max-w-sm lg:order-last lg:max-w-md">
            <div className="relative">
              {/* Soft brand glow behind the photo */}
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/30 to-accent-2/20 blur-3xl" />
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-border-soft bg-card/60 shadow-2xl backdrop-blur">
                <Image
                  src={site.portrait}
                  alt={site.name}
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover"
                  priority
                />
                {/* Subtle inner ring for depth */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-border-soft p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-muted" />
        </div>
      </div>
    </section>
  );
}
