"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  useTransition,
  type CSSProperties,
} from "react";
import { getLikeCount, setLiked } from "@/app/actions/likes";
import {
  getLikedServerSnapshot,
  getLikedSnapshot,
  setLikedFlag,
  subscribe,
} from "@/lib/likeStore";
import { useDictionary } from "./language";
import { Reveal } from "./ui/Reveal";
import { SectionWrapper } from "./ui/SectionWrapper";
import { HeartIcon } from "./ui/Icons";
import { cn } from "@/lib/cn";

/** Horizontal drift (px) for each floating heart in the burst. */
const BURST = [-26, -12, 0, 14, 28];

export function LikeSection() {
  const t = useDictionary().like;

  // Whether *this browser* has liked, read from a small external store so the
  // persisted value is adopted after hydration without setState-in-effect.
  const liked = useSyncExternalStore(
    subscribe,
    getLikedSnapshot,
    getLikedServerSnapshot,
  );
  // `count === null` means "still loading from the server".
  const [count, setCount] = useState<number | null>(null);
  // Bumped on every like to re-trigger the pop/ring/burst animations.
  const [pops, setPops] = useState(0);
  const [, startTransition] = useTransition();

  // Fetch the global count once on mount. Kept client-side (and off the initial
  // render) so the page stays statically prerendered; setState runs in the
  // promise callback, not synchronously in the effect body.
  useEffect(() => {
    let active = true;
    getLikeCount()
      .then((total) => {
        if (active) setCount(total);
      })
      .catch(() => {
        if (active) setCount(0);
      });
    return () => {
      active = false;
    };
  }, []);

  function toggle() {
    const next = !liked;

    // Optimistic UI: reflect the change instantly, reconcile with the server.
    setLikedFlag(next);
    setCount((c) => (c === null ? c : Math.max(0, c + (next ? 1 : -1))));
    if (next) setPops((p) => p + 1);

    startTransition(async () => {
      try {
        setCount(await setLiked(next));
      } catch {
        // Revert the optimistic change if the server call failed.
        setLikedFlag(!next);
        setCount((c) => (c === null ? c : Math.max(0, c + (next ? -1 : 1))));
      }
    });
  }

  const countLabel =
    count === null
      ? t.loading
      : (count === 1 ? t.countOne : t.countMany).replace(
          "{count}",
          new Intl.NumberFormat().format(count),
        );

  return (
    <SectionWrapper
      id="like"
      eyebrow={t.eyebrow}
      title={t.title}
      description={t.description}
    >
      <Reveal className="mx-auto flex max-w-md flex-col items-center gap-6">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={liked}
          aria-label={liked ? t.unlikeAction : t.likeAction}
          className={cn(
            "group relative grid h-24 w-24 place-items-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            liked
              ? "border-transparent bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_18px_50px_-12px_var(--accent)]"
              : "border-border-soft bg-card/60 text-muted backdrop-blur hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent",
          )}
        >
          {/* Expanding ring on like */}
          {liked && pops > 0 && (
            <span
              key={`ring-${pops}`}
              aria-hidden
              className="animate-like-ring pointer-events-none absolute inset-0 rounded-full border-2 border-accent"
            />
          )}

          <HeartIcon
            key={`heart-${pops}`}
            fill={liked ? "currentColor" : "none"}
            className={cn("h-10 w-10", pops > 0 && "animate-like-pop")}
          />

          {/* Floating hearts burst */}
          {liked && pops > 0 && (
            <span
              key={`burst-${pops}`}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2"
            >
              {BURST.map((dx, i) => (
                <HeartIcon
                  key={i}
                  fill="currentColor"
                  className="animate-heart-float absolute h-4 w-4 text-accent"
                  style={
                    {
                      "--dx": `${dx}px`,
                      marginLeft: "-0.5rem",
                      marginTop: "-0.5rem",
                      animationDelay: `${i * 70}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
          )}
        </button>

        <div
          aria-live="polite"
          className="flex flex-col items-center gap-1 text-center"
        >
          <span className="text-2xl font-bold tracking-tight">
            {countLabel}
          </span>
          {liked && (
            <span className="text-sm font-medium text-accent">{t.thanks}</span>
          )}
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
