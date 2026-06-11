/**
 * Minimal ambient types for Node's built-in `node:sqlite` module.
 *
 * The project pins `@types/node@^20`, which predates the `node:sqlite`
 * definitions, so we declare just the small surface used by `lib/likes.ts`.
 * Remove this file once `@types/node` (>= 22.5) ships these types to avoid a
 * duplicate-declaration conflict.
 */
declare module "node:sqlite" {
  interface StatementSync {
    get(...params: unknown[]): unknown;
    all(...params: unknown[]): unknown[];
    run(...params: unknown[]): {
      changes: number | bigint;
      lastInsertRowid: number | bigint;
    };
  }

  interface DatabaseSyncOptions {
    open?: boolean;
    readOnly?: boolean;
  }

  export class DatabaseSync {
    constructor(path: string, options?: DatabaseSyncOptions);
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
