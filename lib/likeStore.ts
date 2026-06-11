/**
 * Tiny external store for whether *this browser* has liked the site.
 *
 * Read through `useSyncExternalStore` so the client adopts the persisted value
 * after hydration without calling setState inside an effect (which the React
 * Compiler flags) and without a server/client hydration mismatch — the same
 * pattern used by `languageStore`.
 */

const STORAGE_KEY = "dz-portfolio-liked";

let current = false;
let initialized = false;
const listeners = new Set<() => void>();

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function subscribe(callback: () => void): () => void {
  // On the first client subscription, adopt the persisted value. This runs
  // after hydration, so React reconciles the change instead of erroring.
  if (!initialized) {
    initialized = true;
    current = readStored();
  }
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getLikedSnapshot(): boolean {
  return current;
}

export function getLikedServerSnapshot(): boolean {
  return false;
}

export function setLikedFlag(next: boolean): void {
  if (next === current) return;
  current = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch {
    /* ignore storage errors (e.g. private mode) */
  }
  listeners.forEach((listener) => listener());
}
