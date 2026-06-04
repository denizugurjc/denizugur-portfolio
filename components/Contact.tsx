"use client";

import { site, socials } from "@/data/portfolio";
import { ContactForm } from "./ContactForm";
import { socialIcons } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionWrapper } from "./ui/SectionWrapper";
import { useDictionary } from "./language";

export function Contact() {
  const dict = useDictionary();
  return (
    <SectionWrapper
      id="contact"
      eyebrow={dict.contact.eyebrow}
      title={dict.contact.title}
      description={dict.contact.description}
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                {dict.contact.detailsHeading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {dict.contact.detailsText}
              </p>

              <a
                href={`mailto:${site.email}`}
                className="group mt-6 flex items-center gap-4 rounded-2xl border border-border-soft bg-card/60 p-4 backdrop-blur transition-colors hover:border-accent/50"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white">
                  {(() => {
                    const Mail = socialIcons.mail;
                    return <Mail className="h-5 w-5" />;
                  })()}
                </span>
                <span>
                  <span className="block text-xs text-muted">
                    {dict.contact.emailMeAt}
                  </span>
                  <span className="block text-sm font-medium transition-colors group-hover:text-accent">
                    {site.email}
                  </span>
                </span>
              </a>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {dict.contact.findMeOnline}
              </p>
              <div className="flex gap-3">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border-soft bg-card/60 text-muted backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-foreground"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
