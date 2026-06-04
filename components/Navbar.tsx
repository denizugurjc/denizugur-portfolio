"use client";

import { navLinks, site } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useCallback, useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./ui/Icons";

const sectionIds = ["home", ...navLinks.map((l) => l.href.replace("#", ""))];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Shrink/blur the bar once the user scrolls past the hero fold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for whichever section is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between px-6 transition-all duration-300",
          scrolled &&
            "mt-2 max-w-5xl rounded-full border border-border-soft bg-background/70 px-5 shadow-lg shadow-black/5 backdrop-blur-xl",
        )}
      >
        <a
          href="#home"
          className="group flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white">
            {site.name.split(" ").map((w) => w[0]).join("")}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === id
                      ? "text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {active === id && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-card/80 ring-1 ring-border-soft" />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-card/60 text-foreground backdrop-blur md:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "mx-4 overflow-hidden rounded-2xl border border-border-soft bg-background/90 backdrop-blur-xl transition-all duration-300 md:hidden",
          menuOpen
            ? "mt-2 max-h-80 opacity-100 shadow-xl"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col p-2">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    active === id
                      ? "bg-card text-foreground"
                      : "text-muted hover:bg-card/60 hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
