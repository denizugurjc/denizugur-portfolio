/**
 * Tiny SQLite-backed "likes" counter — small but efficient, and persistent.
 *
 * Two interchangeable backends, picked automatically at runtime:
 *
 * 1. **Turso / libSQL (production).** When `TURSO_DATABASE_URL` is set, the
 *    count lives in a hosted libSQL database over HTTP (`@libsql/client/web`,
 *    no native deps). This survives deploys and is shared across every
 *    serverless instance — so likes are **never reset on deploy**.
 *
 * 2. **Local SQLite file (development).** With no Turso env vars, it falls back
 *    to Node's built-in `node:sqlite`, writing to `data/likes.db`. Zero setup,
 *    no external service — perfect for `next dev`.
 *
 * Either way it's the same one-row schema and the same SQL. The code never
 * throws, so the UI degrades gracefully if the store is unavailable.
 *
 * This module is server-only: it's imported solely from a `"use server"` file.
 */

const CREATE_TABLE =
  "CREATE TABLE IF NOT EXISTS likes (id INTEGER PRIMARY KEY CHECK (id = 1), count INTEGER NOT NULL DEFAULT 0)";
const SEED_ROW = "INSERT OR IGNORE INTO likes (id, count) VALUES (1, 0)";
const SELECT_COUNT = "SELECT count FROM likes WHERE id = 1";
const UPDATE_COUNT =
  "UPDATE likes SET count = MAX(count + ?, 0) WHERE id = 1 RETURNING count";

/** Minimal backend contract shared by the Turso and local implementations. */
type Backend = {
  read: () => Promise<number>;
  /** `step` is already normalised to +1 or -1. */
  change: (step: number) => Promise<number>;
};

/**
 * Hosted libSQL/Turso backend. Uses the web client (fetch-based) so it works
 * on any serverless/edge runtime without native bindings.
 */
async function createTursoBackend(): Promise<Backend> {
  const { createClient } = await import("@libsql/client/web");
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  // Idempotent bootstrap — cheap and safe to run on each cold start.
  await client.execute(CREATE_TABLE);
  await client.execute(SEED_ROW);

  return {
    async read() {
      const rs = await client.execute(SELECT_COUNT);
      return Number(rs.rows[0]?.count ?? 0);
    },
    async change(step) {
      const rs = await client.execute({ sql: UPDATE_COUNT, args: [step] });
      return Number(rs.rows[0]?.count ?? 0);
    },
  };
}

/** Local file backend using Node's built-in synchronous SQLite. */
async function createLocalBackend(): Promise<Backend> {
  const { DatabaseSync } = await import("node:sqlite");
  const { mkdirSync } = await import("node:fs");
  const { dirname, join } = await import("node:path");

  const file =
    process.env.LIKES_DB_PATH ?? join(process.cwd(), "data", "likes.db");
  // Make sure the parent directory exists before opening the file.
  mkdirSync(dirname(file), { recursive: true });

  const db = new DatabaseSync(file);
  // WAL keeps reads fast and concurrent with the occasional write; the busy
  // timeout avoids "database is locked" errors under light contention.
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA busy_timeout = 5000;");
  db.exec(CREATE_TABLE);
  db.exec(SEED_ROW);

  const selectStmt = db.prepare(SELECT_COUNT);
  const updateStmt = db.prepare(UPDATE_COUNT);

  return {
    async read() {
      const row = selectStmt.get() as { count: number } | undefined;
      return row?.count ?? 0;
    },
    async change(step) {
      const row = updateStmt.get(step) as { count: number } | undefined;
      return row?.count ?? 0;
    },
  };
}

// Memoise the backend so the connection/client is created once and reused.
// On failure we clear the promise so the next call can retry instead of being
// permanently stuck on a transient cold-start error.
let backendPromise: Promise<Backend> | null = null;

function getBackend(): Promise<Backend> {
  if (!backendPromise) {
    const create = process.env.TURSO_DATABASE_URL
      ? createTursoBackend
      : createLocalBackend;
    backendPromise = create().catch((error) => {
      backendPromise = null;
      throw error;
    });
  }
  return backendPromise;
}

/** Current global like count. Returns 0 if the store can't be read. */
export async function readLikeCount(): Promise<number> {
  try {
    return await (await getBackend()).read();
  } catch (error) {
    console.error("[likes] Failed to read like count:", error);
    return 0;
  }
}

/**
 * Apply a delta to the counter (+1 to like, -1 to unlike), clamped at 0, and
 * return the new total. Falls back to a best-effort read on failure.
 */
export async function changeLikeCount(delta: number): Promise<number> {
  const step = delta >= 0 ? 1 : -1;
  try {
    return await (await getBackend()).change(step);
  } catch (error) {
    console.error("[likes] Failed to update like count:", error);
    return readLikeCount();
  }
}
