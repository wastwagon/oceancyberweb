"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import type { CreativeHubItem } from "@/lib/data/creative-hub-gallery";

type CreativeHubGalleryProps = {
  items: CreativeHubItem[];
};

export function CreativeHubGallery({ items }: CreativeHubGalleryProps) {
  const [activeItem, setActiveItem] = useState<CreativeHubItem | null>(null);

  const closeLightbox = useCallback(() => setActiveItem(null), []);

  useEffect(() => {
    if (!activeItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem, closeLightbox]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveItem(item)}
            className="sa-pressable group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-sa-surface text-left transition hover:border-sa-primary/40"
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <span className="mb-2 inline-block rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white/80">
                {item.category}
              </span>
              <p className="font-heading text-sm font-bold uppercase tracking-wide text-white md:text-base">
                {item.title}
              </p>
            </div>
            <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white opacity-100 md:opacity-0 md:transition md:group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" aria-hidden />
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={closeLightbox}
              aria-label="Close preview"
            />
            <motion.button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-[102] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-sa-surface/90 text-white transition hover:border-sa-primary hover:text-sa-primary md:right-8 md:top-8"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </motion.button>
            <motion.figure
              className="relative z-[101] w-full max-w-6xl overflow-hidden rounded-3xl border border-sa-border bg-sa-surface shadow-2xl shadow-black/50"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
                <Image
                  src={activeItem.image}
                  alt={activeItem.imageAlt}
                  fill
                  className="bg-black object-contain"
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  priority
                />
              </div>
              <figcaption className="border-t border-sa-border px-5 py-4 md:px-6 md:py-5">
                <p className="font-heading text-base font-bold uppercase tracking-widest text-sa-primary md:text-lg">
                  {activeItem.title}
                </p>
                <p className="mt-1 text-sm text-sa-muted/80">
                  Studio concept — illustrative work by OceanCyber, not a live client deployment.
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
