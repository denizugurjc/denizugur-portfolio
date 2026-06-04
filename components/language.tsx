"use client";

import { useSyncExternalStore } from "react";
import { dictionary, type Dictionary } from "@/data/i18n";
import {
  getServerSnapshot,
  getSnapshot,
  setLang,
  subscribe,
  type Lang,
} from "@/lib/languageStore";
import { cn } from "@/lib/cn";

/** Returns the active language code (`en` | `de`). */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Returns the dictionary for the active language. */
export function useDictionary(): Dictionary {
  return dictionary[useLang()];
}

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

/** Segmented EN / DE toggle used in the navbar. */
export function LanguageSwitch() {
  const lang = useLang();

  return (
    <div
      role="group"
      aria-label="Select language"
      className="inline-flex h-10 items-center rounded-full border border-border-soft bg-card/60 p-0.5 text-sm font-semibold backdrop-blur"
    >
      {languages.map(({ code, label }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={cn(
              "inline-flex h-full items-center rounded-full px-3 transition-colors",
              active
                ? "bg-gradient-to-br from-accent to-accent-2 text-white"
                : "text-muted hover:text-foreground",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
