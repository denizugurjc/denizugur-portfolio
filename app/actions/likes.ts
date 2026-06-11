"use server";

import { changeLikeCount, readLikeCount } from "@/lib/likes";

/** Read the current global like count. */
export async function getLikeCount(): Promise<number> {
  return await readLikeCount();
}

/**
 * Record a like (`liked = true`) or remove it (`liked = false`) and return the
 * updated total. The visitor's own like state is remembered client-side in
 * localStorage; this action only adjusts the shared counter by ±1.
 */
export async function setLiked(liked: boolean): Promise<number> {
  return await changeLikeCount(liked ? 1 : -1);
}
