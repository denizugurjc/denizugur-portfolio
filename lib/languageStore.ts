/**
 * Tiny external store for the active language (`en` | `de`).
 *
 * It's read through `useSyncExternalStore`, which keeps client rendering in
 * sync with the server snapshot (always `en`) during hydration and then updates
 * to the persisted preference — avoiding hydration mismatches without routing.
 */

export type Lang = "en" | "de";

const STORAGE_KEY = "lang";

let current: Lang = "en";
let initialized = false;
const listeners = new Set<() => void>();

function readStored(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "de" ? "de" : "en";
  } catch {
    return "en";
  }
}

export function subscribe(callback: () => void): () => void {
  // On the first client subscription, adopt the persisted preference. This runs
  // after hydration, so React reconciles the change instead of erroring.
  if (!initialized) {
    initialized = true;
    current = readStored();
    document.documentElement.lang = current;
  }
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getSnapshot(): Lang {
  return current;
}

export function getServerSnapshot(): Lang {
  return "en";
}

export function setLang(next: Lang): void {
  if (next === current) return;
  current = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore storage errors (e.g. private mode) */
  }
  document.documentElement.lang = next;
  listeners.forEach((listener) => listener());
}
