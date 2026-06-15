"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gallery } from "@/data/portfolio";
import { useDictionary } from "./language";
import { Reveal } from "./ui/Reveal";
import { SectionWrapper } from "./ui/SectionWrapper";
import { ArrowIcon, CloseIcon, ExpandIcon } from "./ui/Icons";

/**
 * "Off the clock" — a personal photo gallery of life outside coding. Each tile
 * opens an accessible, keyboard-navigable lightbox (rendered through a portal
 * so blurred/ backdrop-filtered ancestors can't clip the fixed overlay).
 */
export function LifeGallery() {
  const t = useDictionary().life;

  // Index of the photo open in the lightbox, or null when closed.
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;
  const count = gallery.length;

  const close = useCallback(() => setActive(null), []);
  // Functional updates keep these stable, so the key handler never re-subscribes
  // while navigating (and we avoid calling setState inside the effect body).
  const step = useCallback(
    (dir: number) =>
      setActive((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  // Scroll lock + keyboard controls, only while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") step(-1);
      else if (event.key === "ArrowRight") step(1);
    }
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close, step]);

  return (
    null
    // <SectionWrapper
    //   id="life"
    //   eyebrow={t.eyebrow}
    //   title={t.title}
    //   description={t.description}
    // >
    //   <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
    //     {gallery.map((photo, i) => {
    //       const caption = t.captions[photo.id] ?? "";
    //       return (
    //         <Reveal key={photo.id} delay={(i % 3) * 90} className="h-full">
    //           <button
    //             type="button"
    //             onClick={() => setActive(i)}
    //             aria-label={`${t.enlarge} — ${caption}`}
    //             className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border-soft bg-card/40 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    //           >
    //             <Image
    //               src={photo.src}
    //               alt={caption}
    //               fill
    //               sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
    //               className="object-cover transition-transform duration-500 group-hover:scale-105"
    //             />

    //             {/* Scrim so the caption stays readable over any photo. */}
    //             <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

    //             {/* Hover affordance: an "expand" chip in the corner. */}
    //             <span className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
    //               <ExpandIcon className="h-4 w-4" />
    //             </span>

    //             {caption && (
    //               <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-left text-xs font-medium leading-snug text-white/95 sm:p-4 sm:text-sm">
    //                 {caption}
    //               </span>
    //             )}
    //           </button>
    //         </Reveal>
    //       );
    //     })}
    //   </div>

    //   {/* Lightbox */}
    //   {open &&
    //     typeof document !== "undefined" &&
    //     createPortal(
    //       <div
    //         className="animate-overlay-in fixed inset-0 z-[110] flex flex-col bg-black/90 backdrop-blur-sm"
    //         onClick={close}
    //         role="dialog"
    //         aria-modal="true"
    //         aria-label={t.title}
    //       >
    //         {/* Top bar: counter + close */}
    //         <div className="flex items-center justify-between p-4 sm:p-5">
    //           <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
    //             {active + 1} / {count}
    //           </span>
    //           <button
    //             type="button"
    //             onClick={close}
    //             aria-label={t.close}
    //             className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
    //           >
    //             <CloseIcon className="h-5 w-5" />
    //           </button>
    //         </div>

    //         {/* Image stage — clicks on the image itself don't close. */}
    //         <div
    //           className="relative flex-1"
    //           onClick={(event) => event.stopPropagation()}
    //         >
    //           <Image
    //             key={active}
    //             src={gallery[active].src}
    //             alt={t.captions[gallery[active].id] ?? ""}
    //             fill
    //             sizes="100vw"
    //             priority
    //             className="object-contain p-2 sm:p-6"
    //           />

    //           {count > 1 && (
    //             <>
    //               <button
    //                 type="button"
    //                 onClick={() => step(-1)}
    //                 aria-label={t.prev}
    //                 className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-5"
    //               >
    //                 <ArrowIcon className="h-5 w-5 rotate-180" />
    //               </button>
    //               <button
    //                 type="button"
    //                 onClick={() => step(1)}
    //                 aria-label={t.next}
    //                 className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5"
    //               >
    //                 <ArrowIcon className="h-5 w-5" />
    //               </button>
    //             </>
    //           )}
    //         </div>

    //         {/* Caption */}
    //         {t.captions[gallery[active].id] && (
    //           <div
    //             className="px-4 pb-6 pt-2 text-center sm:pb-8"
    //             onClick={(event) => event.stopPropagation()}
    //           >
    //             <p className="mx-auto max-w-xl text-sm text-white/85 sm:text-base">
    //               {t.captions[gallery[active].id]}
    //             </p>
    //           </div>
    //         )}
    //       </div>,
    //       document.body,
    //     )}
    // </SectionWrapper>
  );
}
